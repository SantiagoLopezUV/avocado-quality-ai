from fastapi import APIRouter, Depends, HTTPException, status, Header
from sqlalchemy.orm import Session
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from app.schemas.user import UserCreate, UserLogin, UserResponse, ChangePasswordRequest
from app.services.user_service import UserService
from app.core.database import get_db
from app.core.config import settings
from typing import Optional
import uuid

router = APIRouter(prefix="/users", tags=["Users"])

def get_current_user_id(authorization: Optional[str] = Header(default=None)) -> uuid.UUID:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token requerido")
    token = authorization.split(" ", 1)[1]
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido")
        return uuid.UUID(user_id)
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido o expirado")

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
        "access_token": token,
        "token_type": "bearer",
    }

@router.post("/change-password")
def change_password(
    data: ChangePasswordRequest,
    db: Session = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id),
):
    if data.new_password != data.confirm_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La nueva contraseña y su confirmación no coinciden",
        )
    service = UserService(db)
    try:
        service.change_password(user_id, data.current_password, data.new_password)
        return {"message": "Contraseña actualizada correctamente"}
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))