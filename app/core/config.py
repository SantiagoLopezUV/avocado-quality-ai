from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    UPLOAD_DIR: str = "uploads"
    allow_origins: list[str] = ["http://localhost:5173"]  # Permitir todas las URLs por defecto, se puede configurar en .env

    class Config:
        env_file = ".env"
        
settings = Settings()

