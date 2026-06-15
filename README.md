# 🎉 DreamParty

**DreamParty** is a premium AI-powered birthday celebration and invitation planning web application.

It helps users create personalized birthday celebration plans, discover elegant themes, generate invitation text, and turn simple party details into a beautiful celebration concept using AI.

---

## ✨ Overview

DreamParty is designed as a luxury birthday planning experience, combining:

* AI-powered celebration recommendations
* personalized invitation ideas
* theme and color palette generation
* party schedule planning
* decor, food, drink and music suggestions
* elegant invitation preview flow

The goal is to create a fullstack AI portfolio project that feels polished, creative and product-focused — not just a technical demo.

---

## 🌹 Visual Identity

DreamParty has a premium celebration atelier style:

* dark wine / soft black background
* dusty pink
* rose gold
* champagne gold
* blush tones
* elegant serif typography
* luxury invitation studio feeling

The design is inspired by premium event brands, boutique invitation studios and romantic celebration planning.

---

## 🚀 Features

### 🎂 AI Celebration Planner

Users can enter birthday details such as:

* name
* age
* birthday date
* zodiac sign
* party style
* interests
* city
* budget
* guest count

The AI then generates a personalized celebration plan.

---

### 🤖 Gemini AI Integration

DreamParty uses Google Gemini through a FastAPI backend.

The AI can generate:

* celebration title
* theme idea
* color palette
* invitation text
* decoration ideas
* food and drink ideas
* music vibe
* party schedule
* personal touch
* AI summary

A mock fallback is also included so the app can still respond safely if the AI service is temporarily unavailable.

---

### 💌 Invitation Atelier

Generated AI results can be sent into the Invitation Atelier, where the app creates an invitation-style preview based on the celebration plan.

---

### 🎨 Theme & Style Inspiration

The app includes curated visual directions such as:

* romantic blush
* champagne elegance
* rose quartz
* midnight velvet
* luxury rose gold
* ocean pearl dinner concepts

---

## 🛠 Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Custom CSS
* Responsive UI

### Backend

* Python
* FastAPI
* Pydantic
* Uvicorn

### AI

* Google Gemini API
* `google-genai` SDK
* Environment-variable based API key handling
* Safe mock fallback

---

## 📁 Project Structure

```text
dreamparty/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   └── services/
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   └── services/
│   ├── package.json
│   └── .env.example
│
└── README.md
```

---

## 🔐 Environment Variables

### Backend

Create a local `.env` file inside the `backend/` folder:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

The real `.env` file should never be committed.

---

### Frontend

Create a local `.env.local` file inside the `frontend/` folder:

```env
VITE_API_BASE_URL=http://127.0.0.1:8010
```

The API URL can be changed depending on which port the backend is running on.

---

## ▶️ Run Locally

### 1. Start Backend

```bash
cd backend
source .venv/Scripts/activate
uvicorn app.main:app --host 127.0.0.1 --port 8010
```

Check backend health:

```bash
curl http://127.0.0.1:8010/health
```

Expected response:

```json
{
  "status": "healthy",
  "service": "DreamParty Backend",
  "gemini_api_configured": true
}
```

---

### 2. Start Frontend

Open a new terminal:

```bash
cd frontend
npm run dev
```

Then open the local Vite URL in the browser.

---

## 🧠 AI Flow

```text
User fills birthday details
        ↓
Frontend sends request to FastAPI
        ↓
Backend calls Gemini API
        ↓
Gemini returns structured celebration plan
        ↓
Frontend displays the result in a luxury UI
        ↓
User can send the result to Invitation Atelier
```

---

## ✅ Current Status

DreamParty currently includes:

* premium frontend design
* FastAPI backend
* Gemini AI integration
* fallback response handling
* frontend-backend connection
* generated celebration plan UI
* Send to Invitation Atelier flow

---

## 🔮 Future Improvements

Planned next steps:

* improve Gemini retry logic for temporary API errors
* polish AI output and remove placeholder text
* improve invitation grammar and formatting
* implement real Save & Download functionality
* add authentication in a later version
* add saved parties and user dashboard
* deploy frontend and backend

---

## 👩‍💻 My Role

I designed and built DreamParty as a fullstack AI portfolio project, including:

* product idea and feature planning
* premium UI direction
* React frontend structure
* FastAPI backend architecture
* Gemini API integration
* frontend-backend connection
* AI response rendering
* secure environment variable handling

---

## 🌟 Project Goal

DreamParty demonstrates how AI can be used in a creative, human-centered product experience — combining design, personalization, backend development and real AI integration in one polished portfolio project.
