import requests
import tweepy as tw
from pymongo import MongoClient
from flask import Flask
from flask_restful import Api, Resource
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from config import MONGO_CONNECT, TW_API_KEY, TW_API_SECRET, TW_ACCESS_TOKEN, TW_TOKEN_SECRET

app = Flask(__name__)
api = Api(app)

# PyMongo Setup
mongo = MongoClient(MONGO_CONNECT)
db = mongo.get_database("feel-the-tweet")
#tweets = db.tweets
scores = db.scores

# Twitter API
auth = tw.OAuthHandler(consumer_key=TW_API_KEY, consumer_secret=TW_API_SECRET)
auth.set_access_token(TW_ACCESS_TOKEN, TW_TOKEN_SECRET)
twitter_api = tw.API(auth)

reader = SentimentIntensityAnalyzer()

def get_sentiment_score(input):
    return reader.polarity_scores(input)['compound'] # returns 'compound' numeric value which represents a sentiment score from -1 (negative) to 1 (positive)
    
def avg_sentiment(items):
    count=0
    total=0
    for item in items:
       total += get_sentiment_score(item)
       count+=1
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
        return "Positive"
    elif 0.55 < score < 1:
        return "Very Positive"
    # returns a label describing the results of the sentiment score

def add_new(keyword, quantity, since):
    cursor = tw.Cursor(twitter_api.search, q=keyword, tweet_mode='extended', lang='en', since=since).items(quantity)
    tweet_list = []
    for i in cursor:
        tweet_list.append(i.full_text)
    score = avg_sentiment(tweet_list)
    score_name = sentiment_name(score)
    # add: check for if keyword already exists
    scores.insert_one({"keyword":keyword, "score":score, "score-name":score_name, "quantity":quantity, "since":since})

def remove_record(input):
    #tweets.delete_many({"keyword":input})
    scores.delete_one({"keyword":input})

class Backend(Resource):
    def get(self, function, f_input=None):
        # Add new set of tweets
        if function == "new":
            if f_input != None or f_input != "":
                add_new(f_input)
                return {"status":"200"}
            else:
                return {"status":"400"}
        # remove tweets
        elif function == "remove":
            if f_input != None or f_input != "":
                remove_record(f_input)
                return {"status":"200"}
            else:
                return {"status":"400"}

class GetAll(Resource):
    def get(self):
        pass

class GetOne(Resource):
    def get(self, word):
        pass

api.add_resource(Backend, "/function/<string:function>/<string:f_input>")
api.add_resource(GetAll, "/get-all")
api.add_resource(GetOne, "/get/<string:word>")

if __name__ == "__main__":
    app.run(debug=True)