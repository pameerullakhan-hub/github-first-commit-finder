from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "GitHub First Commit Finder"
    
    # GitHub configuration
    GITHUB_TOKEN: str = ""
    
    # CORS configuration
    CORS_ORIGINS: List[str] = ["*"]
    
    # Server configuration
    HOST: str = "0.0.0.0"
    PORT: int = 8000

settings = Settings()
