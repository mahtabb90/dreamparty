# 🎉 DreamParty

**DreamParty** is a premium AI-powered birthday celebration and invitation planning web application.

It helps users generate personalized birthday celebration concepts, elegant invitation text, theme ideas, color palettes, party schedules, food and drink suggestions, music vibes, and downloadable invitation previews using AI.

DreamParty is designed as a polished fullstack AI portfolio project that combines product design, frontend development, backend architecture, and real AI integration.

---

## ✨ Overview

DreamParty turns simple celebration details into a refined birthday planning experience.

Users can enter details such as name, age, celebration date, zodiac sign, party style, interests, location, budget, and guest count. The app then generates a personalized celebration plan using Gemini AI through a FastAPI backend.

The generated result can be sent into the **Invitation Atelier**, where users can preview and download a styled birthday invitation.

The goal of this project is not only to demonstrate technical implementation, but also to show how AI can be integrated into a creative, human-centered product experience.

---

## 🌹 Visual Identity

DreamParty uses a luxury celebration atelier style:

* dark wine and soft black backgrounds
* dusty pink
* rose gold
* champagne gold
* blush tones
* elegant serif typography
* premium invitation studio feeling
* romantic and boutique-inspired product experience

The design direction is inspired by premium event brands, luxury invitation studios, and elegant celebration planning.

DreamParty is intentionally designed to feel different from a generic AI dashboard. The product experience is elegant, emotional, visual, and celebration-focused.

---

## 🚀 Key Features

### 🌹 Luxury Landing Experience

DreamParty starts with a premium landing page designed to feel like a boutique celebration atelier.

The landing experience includes:

* custom DreamParty visual branding
* luxury dark wine and blush color palette
* invitation mockup hero illustration
* clear call-to-action buttons
* elegant event-focused product storytelling

---

### 🧭 How It Works

The app includes a simplified product journey that explains the user flow:

1. Enter celebration details
2. Discover theme vibes
3. Generate party ideas with AI
4. Create and download a personalized invitation

This section helps the project feel like a real product, not only a technical demo.

---

### 🎂 Celebration Planner Suite

DreamParty includes an interactive planning suite with multiple product areas:

* Invitation Atelier
* Theme Curator
* Celestial Inspiration
* Celebration Planner
* Party Magic

This gives the app a complete celebration-planning experience from idea generation to final invitation creation.

---

### 💌 Invitation Atelier

The Invitation Atelier lets users create a luxury birthday invitation preview.

It includes:

* honoree name
* age with correct birthday grammar
* celebration date
* venue/location
* celebration vibe
* styled invitation card preview
* PNG download functionality

Generated AI results can be transferred directly into the Invitation Atelier.

---

### 🎨 Theme Curator

The Theme Curator helps users explore luxury party aesthetics.

It includes:

* curated theme concepts
* color palettes
* decor suggestions
* music and soundscape ideas
* copyable color inspiration

This feature supports the visual and creative direction of the celebration.

---

### ✨ Celestial Inspiration

DreamParty includes a zodiac-inspired planning feature where users can explore constellation-based celebration ideas.

The feature includes:

* zodiac sign selection
* date-based zodiac alignment
* celestial theme proposal
* aesthetic vibe
* signature cocktail idea
* key celebration activity
* option to send the idea into the invitation creator

This adds a magical and personalized layer to the product experience.

---

### ✅ Checklist Party Planner

The app includes a party planning checklist where users can:

* check and uncheck planning tasks
* add custom tasks
* remove tasks
* reset progress
* track planning progress visually

This makes DreamParty feel more like a useful planning tool, not only an AI generator.

---

### 🤖 Party Magic — AI Celebration Generator

The Party Magic section uses Gemini AI through a FastAPI backend to generate personalized celebration plans.

Users can enter:

* honoree name
* age
* celebration date
* zodiac sign
* party style
* location
* budget
* guest count
* interests and hobbies

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

The result is rendered in the frontend and can be sent into the Invitation Atelier.

---

### 🖼️ Premium Design Gallery

DreamParty includes a design gallery with sample invitation layouts.

Users can browse polished invitation examples and load selected designs into the editor.

This gives the app a stronger product feeling and shows attention to visual design and user experience.

---

### 📥 Save & Download

Users can download their invitation as a PNG image.

The export is created using an HTML5 canvas-based solution, allowing the app to generate a polished invitation file directly in the browser without relying on external export services.

---

### 🪄 One-Click Dream Atmospheres

The app includes one-click atmosphere presets that can pre-fill the AI planner with curated celebration ideas.

Examples include:

* cozy glamping campfire
* velvet jazz lounge
* blush sunset oasis

This makes the planning flow faster, more visual, and more inspiring for users.

---

## 🤖 AI Integration

DreamParty uses **Google Gemini** through a secure FastAPI backend.

The frontend never receives or exposes the Gemini API key. All AI requests are handled through the backend.

The backend is responsible for:

* receiving the frontend request
* validating the request with Pydantic
* calling Gemini AI
* validating and shaping the AI response
* returning structured data to the frontend
* using fallback handling if the AI service is temporarily unavailable

---

## 🛡️ AI Reliability & Fallback Handling

The backend includes reliability handling for temporary Gemini API issues.

If Gemini is temporarily unavailable, overloaded, or returns a temporary error, the backend can safely fall back to a curated mock response so the user experience does not break.

This improves the stability of the application and demonstrates production-aware AI integration.

---

## 🛠 Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Custom CSS
* Responsive UI
* HTML5 Canvas for PNG export

### Backend

* Python
* FastAPI
* Pydantic
* Uvicorn

### AI

* Google Gemini API
* `google-genai` SDK
* Environment-variable based API key handling
* Structured AI response validation
* Safe fallback response handling

### Development Tools

* Git
* GitHub
* VS Code / Antigravity IDE
* Local environment variables
* Vite development server
* FastAPI local server

---

## 📁 Project Structure

```text
dreamparty/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   └── services/
│   │       └── gemini.py
│   ├── requirements.txt
│   ├── .env.example
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── PlannerSuite.tsx
│   │   └── services/
│   │       └── partyApi.ts
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

The real `.env` file must never be committed.

---

### Frontend

Create a local `.env.local` file inside the `frontend/` folder:

```env
VITE_API_BASE_URL=http://127.0.0.1:8010
```

The API URL should match the backend port used locally.

For production deployment, this value should point to the deployed backend URL.

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

Expected response when Gemini is configured:

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

## 🧪 Build Check

To verify the frontend production build:

```bash
cd frontend
npm run build
```

---

## 🧠 AI Flow

```text
User enters celebration details
        ↓
Frontend sends request to FastAPI backend
        ↓
Backend validates request with Pydantic
        ↓
Backend calls Gemini API
        ↓
Gemini returns a structured celebration plan
        ↓
Backend validates and returns the response
        ↓
Frontend displays the AI result in a premium UI
        ↓
User sends result to Invitation Atelier
        ↓
User previews and downloads the invitation
```

---

## ✅ Current Status

DreamParty currently includes:

* premium React + TypeScript frontend
* custom luxury visual design
* responsive landing page structure
* Celebration Planner Suite with multiple interactive tabs
* Invitation Atelier
* Theme Curator
* Celestial Inspiration zodiac feature
* Party Planner checklist with custom tasks
* One-click dream atmosphere presets
* Design Gallery with invitation examples
* FastAPI backend
* Pydantic request and response schemas
* Gemini AI integration
* AI fallback handling
* frontend-backend API connection
* structured AI celebration plan rendering
* transfer from AI result to Invitation Atelier
* PNG invitation download
* secure environment variable handling

The project is currently in a polished MVP / pre-deployment stage.

---

## 🔮 Future Improvements

Planned next improvements:

* deploy backend on Render
* deploy frontend on Vercel
* connect production frontend to production backend
* test the full live AI flow in production
* improve mobile responsiveness further
* add saved celebration history
* add user authentication in a later version
* add user dashboard for saved parties
* add more invitation templates
* add more advanced AI personalization
* create a public portfolio case study

---

## 👩‍💻 My Role

I designed and built DreamParty as a fullstack AI portfolio project.

My work included:

* product idea and feature planning
* UX and premium visual direction
* React and TypeScript frontend development
* custom CSS styling
* FastAPI backend architecture
* Pydantic request and response schemas
* Gemini API integration
* AI prompt refinement
* frontend-backend API connection
* fallback handling for AI availability issues
* invitation preview and PNG download functionality
* checklist planner functionality
* secure environment variable handling
* local testing and pre-deployment preparation

---

## 🌟 Project Goal

DreamParty demonstrates how AI can be used in a creative and emotionally engaging product experience.

The project combines:

* AI integration
* fullstack development
* backend API design
* frontend product design
* user experience thinking
* secure configuration handling
* premium visual presentation

DreamParty is built to show how an AI-powered product can feel polished, personal, and useful — not only technically functional.
