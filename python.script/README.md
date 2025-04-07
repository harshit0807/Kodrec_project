#  Answer Analyzer

This is a full-stack AI-powered web application that analyzes candidate interview answers based on:

-  **Correctness** – Uses semantic similarity via SBERT (MiniLM)
-  **Sentiment Analysis** – Using TextBlob
-  **Keyword Extraction** – Using spaCy


---

##  Project Structure

ai-interview-analyzer/ ├── ai-engine/ # FastAPI Backend │ ├── python_script.py │ ├── backend/ # Node.js Server │ └── server.js │ ├── frontend/ # Angular App │ ├── app.component.ts │ ├── app.component.html │ └── ... (other Angular files) │ └── README.md


##  Tech Stack

- **Frontend**: Angular (Standalone components, HttpClient)
- **Backend**: Node.js + Express (acts as a bridge)
- **AI Engine**: FastAPI (Python) + spaCy + TextBlob + SentenceTransformers (SBERT)

---

##  Setup Instructions



1. cd interview-analyzer


2. FastAPI python_script Setup
cd python.script
python -m venv venv
source venv/bin/activate        
pip install -r requirements
python -m spacy download en_core_web_sm
python -m textblob.download_corpora
uvicorn main:app --reload --port 8000
API will be available at: http://localhost:8000/analyze

3. Node.js Server Setup

cd ../backend
npm install
node server.js
Runs on http://localhost:3000 and forwards requests to FastAPI.

4. Angular Frontend Setup

cd ../frontend
npm install
ng serve
Visit the app at: http://localhost:4200

 How It Works
User enters a question and answer in Angular UI.

Angular sends a POST request to Node.js backend (/api/analyze).

Node.js forwards data to FastAPI AI engine (/analyze).

FastAPI:

Calculates similarity using SBERT.

Analyzes sentiment with TextBlob.

Extracts keywords via spaCy.

The result is returned and displayed in the frontend.

📬 Sample API Usage
POST /analyze
Request:
{
  "question": "What is supervised learning?",
  "answer": "Supervised learning uses labeled data to train a model."
}
Response:

{
  "correctness_score": 91,
  "sentiment": "Positive",
  "keywords": ["supervise", "learn", "model", "label", "data"]
}
 FastAPI Dependencies (requirements.txt)
fastapi
uvicorn
spacy
textblob
sentence-transformers
torch
Install with:


pip install -r requirements.txt
 Node.js Dependencies
Install in backend/:

npm install express axios cors
 Angular Notes
HttpClient is used to send requests to Node backend

Standalone component (app.component.ts) is used

Results are displayed after analysis

 Author
Made with  by [Harshit]