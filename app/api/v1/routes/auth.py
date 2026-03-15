from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from app.schemas.password_reset import ForgotPasswordRequest, ResetPasswordRequest
from app.services.password_reset_service import PasswordResetService
from app.core.database import get_db

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/forgot-password")
def forgot_password(data: ForgotPasswordRequest, db: Session = Depends(get_db)):
    service = PasswordResetService(db)
    result = service.request_reset(data.email)
    return result

@router.post("/reset-password")
def reset_password(data: ResetPasswordRequest, db: Session = Depends(get_db)):
    service = PasswordResetService(db)
    try:
        result = service.reset_password(data.token, data.new_password)
        return result
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
            )