# importing necessary libraries
import pandas as pd
import json
import os

from pymongo import MongoClient

from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

is_heroku = False
if 'IS_HEROKU' in os.environ:
    is_heroku = True

# Import your config file(s) and variable(s)
if is_heroku == False:
    from config import mongoURL
    API_Key = "Hello!"
else:
    mongoURL = os.environ.get('mongoURL')
    API_Key = os.environ.get('API_Key')


from flask_pymongo import PyMongo
#from config import mongoURL 
from pymongo import MongoClient
#from flask_caching import Cache

#cache_config = {
#    "DEBUG": True,          # some Flask specific configs
#    "CACHE_TYPE": "simple", # Flask-Caching related configs
#    "CACHE_DEFAULT_TIMEOUT": 18000
#}

app = Flask(__name__)

# tell Flask to use the above defined config
#app.config.from_mapping(cache_config)
#cache = Cache(app)

# client = MongoClient('localhost', 27017)
client = MongoClient(mongoURL)

app.config['MONGO_URI'] = mongoURL
mongo = PyMongo(app)



@app.route("/")
#@cache.cached(timeout=18000)
def home():
    return render_template("index.html")
    

@app.route("/about")
#@cache.cached(timeout=18000)
def about():
    return render_template("about.html")



@app.route("/data/fatal")
#@cache.cached(timeout=18000)
def fatal():
    db = client['fatal_db']
    collection= db['accident_data']
    documents=collection.find()
    df =  pd.DataFrame(list(documents))
    df_json = df.to_json(default_handler=str,orient='records')
    
    client.close()

    return df_json



#@app.route("/api_get_key")
#@cache.cached()
#def key():

    #return json.dumps({"key":API_Key})


if __name__ == "__main__":
    app.run(debug=True)