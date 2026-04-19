from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timedelta, timezone
from jose import jwt
from app.schemas.user import UserCreate, UserLogin, UserResponse
from app.services.user_service import UserService
from app.core.database import get_db
from app.core.config import settings

router = APIRouter(prefix="/users", tags=["Users"])

def create_access_token(user_id: str, name: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(hours=24)
    payload = {
        "sub": user_id,
        "name": name,
        "exp": expire,
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

@router.post("/register",
            response_model=UserResponse,
            status_code=status.HTTP_201_CREATED)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    service = UserService(db)
    try:
        new_user = service.create_user(user)
        return new_user
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@router.post("/login")
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    service = UserService(db)
    authenticated_user = service.authenticate_user(user.email, user.password)

    if not authenticated_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas"
        )

    # Generar JWT
    token = create_access_token(
        user_id=str(authenticated_user.id),
        name=authenticated_user.name
    )

    return {
        "message": "Login Exitoso",
        "user_id": str(authenticated_user.id),
        "name": authenticated_user.name,
        "access_token": token,       # ← nuevo
        "token_type": "bearer",      # ← nuevo
    }