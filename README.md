## AI-DRIVE — Scam Detection App

AI-DRIVE is an AI-powered system designed to detect scams before you click, pay, or respond. It gives real-time warnings to protect users from phishing, UPI scams, fake job offers, OTP scams, and more.

## Features

Real-time scam detection for text, URLs, or images (via OCR)

Risk Score (0–100) indicating scam likelihood

Scam Type Classification: e.g., Phishing, UPI Scam, Fake Job Offer

Explanation & Advice in simple language

Detected signals like urgency words, suspicious links, money requests

Optional OpenAI integration for improved accuracy

Frontend: React + Tailwind CSS

Backend: FastAPI (Python) with /analyze endpoint

## Folder Structure
ai-drive-scam-detection/
├─ frontend/           # React + Tailwind frontend
├─ backend/            # FastAPI backend
├─ README.md           # This file
└─ Dockerfile          # Optional for backend containerization

## Installation & Setup
Backend

Navigate to the backend folder:

cd backend


Create a virtual environment and install dependencies:

python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt


Set environment variables (optional):

export OPENAI_API_KEY="sk-..."   # For OpenAI integration


Run the backend server:

uvicorn main:app --reload --host 0.0.0.0 --port 8000


Backend will run at: http://localhost:8000

## Frontend

Navigate to the frontend folder:

cd frontend


Install dependencies:

npm install


Start development server:

npm run dev


## Frontend will run at: http://localhost:5173

Note: If frontend and backend are on different ports, you may need to configure a proxy or update fetch endpoints.

## How to Use

Open the frontend in your browser.

Paste the suspicious text, URL, or image.

Click Analyze Now.

View:

Risk Score

Scam Type

Explanation

Safety Advice

Detected signals

API Endpoint

POST /analyze

Request body:

{
  "input": "Your account is suspended. Click http://bit.ly/fake to verify OTP",
  "isUrl": false
}


Response:

{
  "riskScore": 75,
  "scamType": "Phishing / Account takeover",
  "explanation": "Detected suspicious signals: urgency, url_suspicious, money_request",
  "advice": "Do not click links or share OTPs. Verify sender using official channels. Block and report if necessary.",
  "flags": ["urgency", "url_suspicious", "money_request"]
}

## Deployment
### Frontend (Netlify)

Connect frontend repo to Netlify.

Build command: npm run build

Publish directory: dist

Set up proxy or use full backend URL for /api/analyze requests.

### Backend (Render / Railway / Vercel)

Deploy backend folder as a web service.

Start command: uvicorn main:app --host 0.0.0.0 --port $PORT

Set environment variables as needed (OPENAI_API_KEY).

## Optional Features

OCR for images: Extract text from screenshots using pytesseract

URL reputation check: Integrate with VirusTotal or Google Safe Browsing APIs

Browser extension: Real-time link scanning in web pages

Conversation scanning: Scan WhatsApp, Telegram, or Email messages

## Security & Privacy

No sensitive data is stored. Analysis is ephemeral.

Always use HTTPS for frontend and backend.

Rate-limit API to prevent abuse.

Follow OpenAI terms if using AI integration.

## Sample Test Cases

Obvious Scam

Input: "Your account will be closed. Click https://bit.ly/fake to verify OTP"

Output:

riskScore: 75–90

scamType: Phishing / Account takeover

flags: urgency, url_suspicious, otp

Safe Content

Input: "Hey, let's meet tomorrow at the cafe."

Output:

riskScore: 5–10

scamType: Unknown / Safe

flags: none