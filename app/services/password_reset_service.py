import bcrypt
import secrets
from datetime import datetime, timezone, timedelta
from sqlalchemy.orm import Session
from app.models.password_reset_token import PasswordResetToken
from app.repositories.password_reset_repository import PasswordResetRepository
from app.repositories.user_repository import UserRepository


class PasswordResetService:
    def __init__(self, db: Session):
        self.db = db
        self.reset_repository = PasswordResetRepository(db)
        self.user_repository = UserRepository(db)

    def request_reset(self, email: str) -> dict:
        user = self.user_repository.get_user_by_email(email)
        if not user:
            return {"message": "Si el email está registrado, un link de reset se enviará."}

        self.reset_repository.mark_token_as_used(user.id)
        token = secrets.token_urlsafe(48)
        
        expires_at = datetime.now(timezone.utc) + timedelta(minutes=5)
        
        reset_token = PasswordResetToken(
            user_id=user.id,
            token=token,
            expires_at=expires_at
        )
        self.reset_repository.create_token(reset_token)
        #Envio de correo con el token (simulado)
        return {"message":"Token generado exitosamente", 
                #Enviamos el token, pero no se debe devolver
                "token": token,
                "expires_at": expires_at.isoformat()
                }

    def reset_password(self, token: str, new_password: str) -> dict:
        reset_token = self.reset_repository.get_valid_token(token)
        if not reset_token:
            raise ValueError("Token inválido o expirado")
        
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), salt).decode('utf-8')
        
        user = self.user_repository.get_user_by_id(reset_token.user_id)
        user.password_hash = hashed_password
        self.db.commit()
        
        self.reset_repository.invalidate_tokens(reset_token)
        
        return {"message": "Contraseña restablecida exitosamente"}
    