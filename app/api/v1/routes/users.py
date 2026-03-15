from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.user import UserCreate, UserLogin, UserResponse
from app.services.user_service import UserService
from app.core.database import get_db

router = APIRouter(prefix="/users", tags=["Users"])

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
    
    return {
        "message": "Login Exitoso",
        "user_id": str(authenticated_user.id),
        "name": authenticated_user.name
    }
