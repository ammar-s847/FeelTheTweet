
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

testing_array = ['Awful company!', 'Great values and decision-making!', 'Awesome!', 'Outrageous service!']

reader = SentimentIntensityAnalyzer()

def get_sentiment_score(input):
    return reader.polarity_scores(input)['compound'] # returns 'compound' numeric value which represents a sentiment score from -1 (negative) to 1 (positive)
    
def avg_sentiment(items):
    count=0
    total=0
    for item in items:
       total += get_sentiment_score(item)
       count+=1
    return total/count
    # returns average sentiment score of a list of strings

def sentiment(score): 
    if -1 <= score < -0.55:
        return 'Very Negative'
    elif -0.55 <= score < -0.1:
        return 'Negative'
    elif - 0.1 <= score <= 0.1:
        return 'Neutral'
    elif 0.1 < score <= 0.55:
        return "Positive"
    elif 0.55 < score < 1:
        return "Very Positive"
    #  returns a label describing the results of the sentiment score

print(sentiment(avg_sentiment(testing_array)))

