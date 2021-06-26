import requests
from pymongo import MongoClient
from flask import Flask
from flask_restful import Api, Resource
from config import MONGO_CONNECT

app = Flask(__name__)
api = Api(app)

mongo = MongoClient(MONGO_CONNECT)
db = mongo.get_database("feel-the-tweet")
tweets = db.tweets
scores = db.scores

def find_score():
    pass

def obtain_tweets():
    output = []
    return output

def add_new(input):
    score = find_score(input)
    scores.insert_one({"keyword":"input", "score name":score})

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