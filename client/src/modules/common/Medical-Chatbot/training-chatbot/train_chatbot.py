
import random
import json
import pickle
import numpy as np
import pandas as pd

import nltk
nltk.download('punkt')
nltk.download('wordnet')
from nltk.stem import WordNetLemmatizer
import tensorflow
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense,Activation,Dropout
from tensorflow.keras.optimizers import SGD


lemmatizer=WordNetLemmatizer()

with open('intents.json') as json_file:
    intents = json.load(json_file)


words=[]
classes=[]
documents=[]
ignore_letters=['?','!','.',',']

for intent in intents['intents']:
  for pattern in intent['patterns']:
    word_list=nltk.word_tokenize(pattern)
    words.extend(word_list)
    documents.append((word_list,intent['tag']))
    if intent['tag'] not in classes:
      classes.append(intent['tag'])


