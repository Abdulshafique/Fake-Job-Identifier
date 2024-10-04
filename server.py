import pandas as pd
import joblib
import nltk
from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS

# Download necessary NLTK data
nltk.download('punkt')
nltk.download('stopwords')

# Define helper functions
def tokenize(text):
    return nltk.word_tokenize(text)

def to_strings(X):
    return X.astype(str).flatten()

stops = set(nltk.corpus.stopwords.words("english"))
stemmer = nltk.stem.porter.PorterStemmer()

# Load the saved model and preprocessor
loaded_model = joblib.load('best_model.joblib')
loaded_preprocessor = joblib.load('preprocessor.joblib')

# Initialize Flask application
app = Flask(__name__)
CORS(app)
api = Api(app)

# Preprocess input data for prediction
def preprocess_input_data(input_data):
    # Ensure input data is a DataFrame
    if isinstance(input_data, dict):
        input_data = pd.DataFrame([input_data])
    elif isinstance(input_data, pd.Series):
        input_data = pd.DataFrame([input_data])
    elif isinstance(input_data, pd.DataFrame):
        input_data = input_data.copy()
    else:
        raise ValueError("Input data should be a dictionary, Pandas Series, or Pandas DataFrame.")
        
    text_features = ['Title', 'location', 'department', 'company_name', 'description', 'requirenment', 'benefits', 'required_experience', 'required_equcation', 'industry', 'Function']
    
    # Fill NaN values in text features
    input_data[text_features] = input_data[text_features].fillna(method='ffill')
    
    # Combine text features into a single column
    input_data['all_text'] = input_data['Title'] + ' ' + input_data['location'] + ' ' + input_data['department'] + ' ' + input_data['company_name'] + ' ' + input_data['description'] + ' ' + input_data['requirenment'] + ' ' + input_data['benefits'] + ' ' + input_data['required_experience'] + ' ' + input_data['required_equcation'] + ' ' + input_data['industry'] + ' ' + input_data['Function']
    
    # Tokenization
    input_data['tokenized'] = input_data['all_text'].apply(tokenize)
    
    # Remove stopwords
    input_data['stopwords_removed'] = input_data['tokenized'].apply(lambda tokens: [word for word in tokens if word not in stops])
    
    # Stemming
    input_data['porter_stemmed'] = input_data['stopwords_removed'].apply(lambda tokens: [stemmer.stem(word) for word in tokens])
    
    # Rejoin words into a single string
    input_data['rejoined'] = input_data['porter_stemmed'].apply(lambda tokens: ' '.join(tokens))
    
    # Select relevant columns for preprocessing
    input_data = input_data[['job_id', 'telecommunication', 'has_company', 'has_question', 'all_text', 'rejoined']]
    
    # Apply preprocessing
    preprocessed_data = loaded_preprocessor.transform(input_data)
    
    return preprocessed_data

# Function to predict using the loaded model
def predict(input_data):
    preprocessed_data = preprocess_input_data(input_data)
    predictions = loaded_model.predict(preprocessed_data)
    return predictions

# Define the API resource for prediction
class PredictJob(Resource):
    def post(self):
        input_data = request.json
        prediction = predict(input_data)
        return jsonify({"prediction": prediction.tolist()})

# Add the resource to the API
api.add_resource(PredictJob, '/predict')

if __name__ == '__main__':
    app.run(debug=True)
