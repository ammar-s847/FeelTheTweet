import requests
from pymongo import MongoClient
from flask import Flask
from flask_restful import Api, Resource
from config import MONGO_CONNECT

app = Flask(__name__)
api = Api(app)

mongo = MongoClient(MONGO_CONNECT)
db = mongo.get_database('feel-the-tweet')
stock_data = db.tweets

class backend(Resource):
    def get(self, function, f_input=None):
        return {"status":"400", "output":"status-400"}

api.add_resource(backend, "/<string:function>")

if __name__ == "__main__":
    app.run(debug=True)