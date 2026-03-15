from sqlalchemy.orm import Session
from app.models.password_reset_token import PasswordResetToken
from typing import Optional
from datetime import datetime, timezone


class PasswordResetRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_token(self, token: PasswordResetToken) -> PasswordResetToken:
        self.db.add(token)
        self.db.commit()
        self.db.refresh(token)
        return token

    def get_valid_token(self, token: str) -> Optional[PasswordResetToken]:
        return self.db.query(PasswordResetToken).filter(
            PasswordResetToken.token == token,
            PasswordResetToken.used == False,
            PasswordResetToken.expires_at > datetime.now(timezone.utc)
        ).first()

    def invalidate_tokens(self, token: PasswordResetToken) -> None:
        token.used = True
        self.db.commit()

    def mark_token_as_used(self, user_id) -> None:
        self.db.query(PasswordResetToken).filter(
            PasswordResetToken.user_id == user_id,
            PasswordResetToken.used == False
        ).update({"used": True})
        self.db.commit()