import nltk
nltk.download('wordnet')
import random
import numpy as np
import json
import pickle
from nltk.stem import WordNetLemmatizer
from tensorflow.keras.models import load_model
nltk.download('punkt')
nltk.download('omw-1.4')

lemmatizer=WordNetLemmatizer()
lemmatizer.lemmatize('cats')

with open('intents.json') as json_file:
    intents = json.load(json_file)

