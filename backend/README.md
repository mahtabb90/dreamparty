# DreamParty Backend

This is the FastAPI-based backend foundation for DreamParty. It includes a health check endpoint and an AI-powered birthday party recommendation service that integrates with the Google Gemini API (with a smart fallback mock generator for local development).

## Setup & Running Locally

### Prerequisites
- Python 3.10 or higher (Python 3.13.14 is verified and recommended)

### 1. Create a Virtual Environment
From the `backend/` directory, run:
```bash
python -m venv .venv
```

Activate the virtual environment:
- **Windows (PowerShell)**:
  ```powershell
  .venv\Scripts\Activate.ps1
  ```
- **Windows (CMD)**:
  ```cmd
  .venv\Scripts\activate.bat
  ```
- **macOS / Linux**:
  ```bash
  source .venv/bin/activate
  ```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Open `.env` and configure your `GEMINI_API_KEY` (if you have one). If you leave this empty, the backend will automatically generate highly customized, dynamic mock responses for local testing.

### 4. Start the Server
Run the FastAPI development server:
```bash
python -m uvicorn app.main:app --reload
```

The API will be running locally at: [http://127.0.0.1:8000](http://127.0.0.1:8000)

## API Documentation
Once the server is running, interactive API docs are available at:
- **Swagger UI**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **ReDoc**: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

## Core Endpoints
- **GET** `/health` - Service health status check.
- **GET** `/api/health` - Alias for the health status check.
- **POST** `/api/generate-party-idea` - Main generation endpoint. Accepts the customer details and returns the curated birthday party recommendation plan.
