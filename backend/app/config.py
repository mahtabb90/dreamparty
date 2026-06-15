import json
from typing import List, Union
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Application settings loaded from environment variables and/or .env files.
    """
    # Gemini API settings
    gemini_api_key: Union[str, None] = Field(default=None, validation_alias="GEMINI_API_KEY")

    # FastAPI Server configuration
    port: int = Field(default=8000, validation_alias="PORT")
    host: str = Field(default="127.0.0.1", validation_alias="HOST")
    
    # CORS Configuration
    cors_origins: Union[str, List[str]] = Field(
        default=["http://localhost:5173", "http://localhost:3000"],
        validation_alias="CORS_ORIGINS"
    )

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

    def get_cors_origins(self) -> List[str]:
        """
        Parses the CORS origins configured. If it is a JSON string (like in env),
        it parses it into a Python list. Otherwise, returns it as-is.
        """
        if isinstance(self.cors_origins, str):
            try:
                parsed = json.loads(self.cors_origins)
                if isinstance(parsed, list):
                    return parsed
                return [self.cors_origins]
            except json.JSONDecodeError:
                # Fallback in case it's a comma-separated list or single string
                if "," in self.cors_origins:
                    return [origin.strip() for origin in self.cors_origins.split(",")]
                return [self.cors_origins]
        return self.cors_origins


settings = Settings()
