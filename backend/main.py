import requests
import tweepy as tw
from pymongo import MongoClient
from flask import Flask
from flask_restful import Api, Resource
from flask_cors import CORS
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from config import MONGO_CONNECT, TW_API_KEY, TW_API_SECRET, TW_ACCESS_TOKEN, TW_TOKEN_SECRET

app = Flask(__name__)
api = Api(app)
CORS(app)

# PyMongo Setup --------------------------------------------------------------------
mongo = MongoClient(MONGO_CONNECT)
db = mongo.get_database("feel-the-tweet")
#tweets = db.tweets
scores = db.scores

# Twitter API ----------------------------------------------------------------------
auth = tw.OAuthHandler(consumer_key=TW_API_KEY, consumer_secret=TW_API_SECRET)
auth.set_access_token(TW_ACCESS_TOKEN, TW_TOKEN_SECRET)
twitter_api = tw.API(auth)

# Sentiment Analysis ---------------------------------------------------------------
reader = SentimentIntensityAnalyzer()

def get_sentiment_score(input):
    return reader.polarity_scores(input)['compound'] 
    # returns 'compound' numeric value which represents a sentiment score from -1 (negative) to 1 (positive)
    
def avg_sentiment(items):
    count = 0
    total = 0
    for item in items:
       total += get_sentiment_score(item)
       count += 1
    return total/count
    # returns average sentiment score of a list of strings

def sentiment_name(score): 
    if -1 <= score < -0.55:
        return 'Very Negative'
    elif -0.55 <= score < -0.1:
        return 'Negative'
    elif - 0.1 <= score <= 0.1:
        return 'Neutral'
    elif 0.1 < score <= 0.55:
        return 'Positive'
    elif 0.55 < score <= 1:
        return 'Very Positive'
    # returns a label describing the results of the sentiment score

# CRUD Functions -------------------------------------------------------------------
def add_new(keyword, quantity, since):
    global twitter_api
    cursor = tw.Cursor(twitter_api.search, q=keyword, tweet_mode='extended', lang='en', since=since).items(quantity)
    tweet_list = []
     
    for i in cursor:
        tweet_list.append(i.full_text)

    score = avg_sentiment(tweet_list)
    score_name = sentiment_name(score)

    check = scores.find_one({"keyword":keyword})
    if check == None or len(check) == 0:
        scores.insert_one({"keyword":keyword, "score":score, "score-name":score_name, "quantity":quantity, "since":since})

def remove_record(keyword):
    #tweets.delete_many({"keyword":keyword})
    scores.delete_one({"keyword":keyword})

# Flask REST API -------------------------------------------------------------------
class AddKeyword(Resource):
    def get(self, keyword, since, quantity=10):
        if keyword != None or keyword != "":
            try:
                add_new(keyword, quantity, since)
                return {"status":"200"}
            except:
                return {"status":"404"}
        else:
            return {"status":"400"}

class RemoveKeyword(Resource):
    def get(self, keyword):
        if keyword != None or keyword != "":
            try:
                remove_record(keyword)
                return {"status":"200"}
            except:
                return {"status":"404"}
        else:
            return {"status":"400"}

class GetAll(Resource):
    def get(self):
        try:
            scores_db = scores.find()
            output = []
            for i in scores_db:
                output.append({"keyword":i["keyword"], "score":i["score"], "score-name":i["score-name"], "quantity":i["quantity"], "since":i["since"]})
            return {"status":"200", "data":output}
        except:
            return {"status":"400"}

class GetOne(Resource):
    def get(self, keyword):
        try:
            output = scores.find_one({"keyword":keyword})
            return {"status":"200", "data":{"keyword":output["keyword"], "score":output["score"], "score-name":output["score-name"], "quantity":output["quantity"], "since":output["since"]}}
        except:
            return {"status":"400"}

api.add_resource(AddKeyword, "/add/<string:keyword>/<string:since>/<int:quantity>")
api.add_resource(RemoveKeyword, "/remove/<string:keyword>")
api.add_resource(GetAll, "/all")
api.add_resource(GetOne, "/get/<string:keyword>")

if __name__ == "__main__":
    app.run(debug=True)