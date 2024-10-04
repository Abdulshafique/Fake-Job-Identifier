#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import pandas as pd
import nltk
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer


# In[ ]:


# Assuming your dataset is in a CSV file
df = pd.read_csv('merge.csv', encoding='ISO-8859-1')


# In[ ]:


df.head(10000)


# In[ ]:


text_features = ['Title', 'location', 'company_name', 'description', 'requirenment', 'benefits', 'department', 'required_experience','required_equcation','industry','Function']


# In[ ]:


df[text_features] = df[text_features].fillna(method='ffill')


# In[ ]:


df['all_text'] = df['Title'] + df['location'] + df['department']  + df['company_name'] + df['description'] + df['requirenment'] + df['benefits']
+ df['required_experience'] + df['required_equcation'] + df['industry'] + df['Function']


# In[ ]:


nltk.download('punkt')


# In[ ]:


def tokenize(column):
    if isinstance(column, str):
     tokens = nltk.word_tokenize(column)
     return [w for w in tokens if w.isalpha()]
    else:
        return []  # Return an empty list for non-string values


# In[ ]:


df['tokenized'] = df.apply(lambda x: tokenize(x['all_text']), axis=1)
df[['Title', 'tokenized']].head(100)


# In[ ]:


nltk.download('stopwords')


# In[ ]:


def remove_stopwords(tokenized_column):
    """Return a list of tokens with English stopwords removed. 

    Args:
        column: Pandas dataframe column of tokenized data from tokenize()

    Returns:
        tokens (list): Tokenized list with stopwords removed.

    """
    stops = set(stopwords.words("english"))
    return [word for word in tokenized_column if not word in stops]


# In[ ]:


df['stopwords_removed'] = df.apply(lambda x: remove_stopwords(x['tokenized']), axis=1)
df[['Title', 'stopwords_removed']].head(1000)


# In[ ]:


def apply_stemming(tokenized_column):
    """Return a list of tokens with Porter stemming applied.

    Args:
        column: Pandas dataframe column of tokenized data with stopwords removed.

    Returns:
        tokens (list): Tokenized list with words Porter stemmed.

    """

    stemmer = PorterStemmer() 
    return [stemmer.stem(word) for word in tokenized_column]


# In[ ]:


df['porter_stemmed'] = df.apply(lambda x: apply_stemming(x['stopwords_removed']), axis=1)
df[['Title', 'porter_stemmed']].head(1000)


# In[ ]:


def rejoin_words(tokenized_column):
    """Rejoins a tokenized word list into a single string. 
    
    Args:
        tokenized_column (list): Tokenized column of words. 
        
    Returns:
        string: Single string of untokenized words. 
    """
    
    return ( " ".join(tokenized_column))


# In[ ]:


df['rejoined'] = df.apply(lambda x: rejoin_words(x['porter_stemmed']), axis=1)
df[['Title', 'rejoined']].head(100)


# In[ ]:


df.to_csv('mergenlpdata.csv')


# In[ ]:




