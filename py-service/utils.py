import pymongo

def get_mongo_connection():
    client = pymongo.MongoClient("mongodb://mongo:27017/")
    db_name = client["admin"]
    return db_name
