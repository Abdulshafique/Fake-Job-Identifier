import pandas as pd
import numpy as np
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder, FunctionTransformer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.ensemble import AdaBoostClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from imblearn.over_sampling import SMOTE
import joblib
import nltk
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer

# Download necessary NLTK data
nltk.download('punkt')
nltk.download('stopwords')

# Define helper functions
def tokenize(text):
    return nltk.word_tokenize(text)

stops = set(stopwords.words("english"))
stemmer = PorterStemmer()

def to_strings(X):
    return X.astype(str).flatten()

# Load the dataset
df = pd.read_csv('mergenlpdata.csv', encoding='ISO-8859-1')

# Assuming 'telecommunication', 'has_company', 'has_question' are categorical features
categorical_columns = ['telecommunication', 'has_company', 'has_question']

X = df[['job_id', 'telecommunication', 'has_company', 'has_question', 'rejoined']]
y = df['Fraudulent']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Separate numeric and non-numeric features
numeric_features = ['job_id']
text_features = ['rejoined']
categorical_features = ['telecommunication', 'has_company', 'has_question']

# Numeric transformer
numeric_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

# Text transformer
text_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='constant', fill_value='')),
    ('to_strings', FunctionTransformer(to_strings, validate=False)),
    ('vectorizer', CountVectorizer())
])

# Categorical transformer
categorical_transformer = OneHotEncoder(drop='first')

# Create preprocessor
preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numeric_features),
        ('text', text_transformer, text_features),
        ('cat', categorical_transformer, categorical_features)
    ])

# Apply preprocessing to X_train and X_test
X_train_preprocessed = preprocessor.fit_transform(X_train)
X_test_preprocessed = preprocessor.transform(X_test)

# Apply SMOTE to address class imbalance
smote = SMOTE(random_state=42)
X_train_resampled, y_train_resampled = smote.fit_resample(X_train_preprocessed, y_train)

# Define the final pipeline with the classifier
pipeline = Pipeline(steps=[
    ('classifier', AdaBoostClassifier())
])

# Fit the model
pipeline.fit(X_train_resampled, y_train_resampled)

# Make predictions
y_pred = pipeline.predict(X_test_preprocessed)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
classification_rep = classification_report(y_test, y_pred)

print("Accuracy:", accuracy)
print("\nClassification Report:\n", classification_rep)

# Save the trained model and preprocessor
joblib.dump(pipeline, 'best_model.joblib')
joblib.dump(preprocessor, 'preprocessor.joblib')
