{
    "intents": [
          {
             "tag": "greetings",
             "patterns": [ "hello", "hey", "hi", "good day", "greetings", "what's up?", "how is it going" ],
             "responses": [ "hello", "hey!", "what can i do for you?" ],
             "context": [ "" ]
          },
          {
             "context": [ "" ],
             "patterns": [ "cya", "see you later", "goodbye", "have a good day", "bye", "ciao", "see ya" ],
             "responses": [ "have a nice day", "goodbye" ],
             "tag": "goodbye"
          },
          {
             "context": [ "" ],
             "patterns": [ "how old", "how old are you?", "what is your age", "how old are you", "age?" ],
             "responses": [ "I get reborn after every compilation", "hey!", "my owners are averagely 20 years!" ],
             "tag": "age"
          },
          {
             "context": [ "" ],
             "patterns": [ "what is your name", "what should i call you", "what's your name?", "who are you?", "can you tell me your name" ],
             "responses": [ "you can call me Medbot!", "i am Medbot!", "i am Medbot your medical assistant" ],
             "tag": "name"
          },
  
          {
             "context": [ "" ],
             "patterns": [ "I want treatment", "please help", "treatment", "please give me treatment", "need treatment" ],
             "responses": [ "Please tell me what you need treatment for." ],
             "tag": "treatment"
          },
  
          {"tag": "What is a coronavirus?",
           "patterns": ["What is a coronavirus"],
           "responses": ["Coronaviruses are a large family of viruses which may cause illness in animals or humans.  In humans, several coronaviruses are known to cause respiratory infections ranging from the common cold to more severe diseases such as Middle East Respiratory Syndrome (MERS) and Severe Acute Respiratory Syndrome (SARS). The most recently discovered coronavirus causes coronavirus disease COVID-19."],
           "context": [ "" ]
          },
   
  
          {"tag": "What is COVID-19?",
           "patterns": ["What is covid 19"],
           "responses": ["COVID-19 is the infectious disease caused by the most recently discovered coronavirus. This new virus and disease were unknown before the outbreak began in Wuhan, China, in December 2019."],
           "context": [ "" ]
          },
          {"tag": "What are the symptoms of COVID 19?",
           "patterns": ["symptoms of covid 19", "symptoms of coronavirus", "covid 19 symptoms", "coronavirus symptoms"],
           "responses": ["The most common symptoms of COVID-19 are fever, tiredness, and dry cough. Some patients may have aches and pains, nasal congestion, runny nose, sore throat or diarrhea. These symptoms are usually mild and begin gradually. Some people become infected but donâ€™t develop any symptoms and don't feel unwell. Most people (about 80%) recover from the disease without needing special treatment. Around 1 out of every 6 people who gets COVID-19 becomes seriously ill and develops difficulty breathing. Older people, and those with underlying medical problems like high blood pressure, heart problems or diabetes, are more likely to develop serious illness. People with fever, cough and difficulty breathing should seek medical attention."],
           "context": [ "" ]
          },
    