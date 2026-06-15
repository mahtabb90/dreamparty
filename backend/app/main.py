import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.schemas.party import PartyIdeaRequest, PartyIdeaResponse
from app.services.gemini import generate_party_idea

# Setup logging configuration
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("dreamparty")

app = FastAPI(
    title="DreamParty API",
    description="Backend API services for the DreamParty birthday planning platform.",
    version="1.0.0"
)

# CORS Middleware configuration
# Allows requests from Vite development server and other defined clients
origins = settings.get_cors_origins()
logger.info(f"Configuring CORS with allowed origins: {origins}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", response_model=dict, tags=["System"])
def health_check():
    """
    Performs a system health check.
    Returns status: healthy if the API server is operational.
    """
    logger.debug("Health check requested")
    return {
        "status": "healthy",
        "service": "DreamParty Backend",
        "gemini_api_configured": bool(settings.gemini_api_key)
    }


@app.get("/api/health", response_model=dict, tags=["System"])
def api_health_check():
    """
    Alias endpoint for the system health check under the API prefix.
    """
    return health_check()


@app.post("/api/generate-party-idea", response_model=PartyIdeaResponse, tags=["AI Generator"])
def api_generate_party_idea(request: PartyIdeaRequest):
    """
    Accepts birthday details and returns a structured, personalized party plan.
    Enforces inputs and outputs via Pydantic schemas. Uses Google Gemini API
    if configured, or falls back to a custom mock generator.
    """
    try:
        logger.info(f"Received party generation request for name: '{request.name}', age: {request.age}")
        response = generate_party_idea(request)
        return response
    except ValueError as val_err:
        logger.error(f"Validation or data processing error: {val_err}")
        raise HTTPException(
            status_code=422,
            detail=str(val_err)
        )
    except Exception as exc:
        logger.error(f"Unexpected backend error during generation: {exc}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected error occurred: {str(exc)}"
        )
