from fastapi import FastAPI
from pydantic import BaseModel
from textblob import TextBlob
import spacy
from sentence_transformers import SentenceTransformer, util

app = FastAPI()
nlp = spacy.load("en_core_web_sm")
sbert_model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

class AnswerRequest(BaseModel):
    question: str
    answer: str

@app.post("/analyze")
def analyze_answer(data: AnswerRequest):
    question_embedding = sbert_model.encode(data.question, convert_to_tensor=True)
    answer_embedding = sbert_model.encode(data.answer, convert_to_tensor=True)
    similarity_score = util.pytorch_cos_sim(question_embedding, answer_embedding).item()
    correctness = int(similarity_score * 100)

    polarity = TextBlob(data.answer).sentiment.polarity
    sentiment = (
        "Positive" if polarity > 0 else
        "Negative" if polarity < 0 else
        "Neutral"
    )

    keywords = list({
        token.lemma_.lower() for token in nlp(data.answer)
        if token.is_alpha and not token.is_stop
    })

    return {
        "correctness_score": correctness,
        "sentiment": sentiment,
        "keywords": keywords
    }
