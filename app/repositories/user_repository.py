# Habla con la Base de Datos (CRUD)
from sqlalchemy.orm import Session
from app.models.user import User
from typing import Optional
import uuid


class UserRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_user(self, user: User) -> User:
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user

    def get_user_by_email(self, email: str) -> Optional[User]:
        return self.db.query(User).filter(User.email == email).first()

    def get_user_by_id(self, user_id: uuid.UUID) -> Optional[User]:
        return self.db.query(User).filter(User.id == user_id).first()

    def get_user_by_document_number(self, document_number: str) -> Optional[User]:
        return self.db.query(User).filter(User.document_number == document_number).first()

    def email_exists(self, email: str) -> bool:
        return self.db.query(User).filter(User.email == email).first() is not None

    def update_password(self, user_id: uuid.UUID, new_hashed_password: str) -> bool:
        user = self.get_user_by_id(user_id)
        if not user:
            return False
        user.password_hash = new_hashed_password
        self.db.commit()
        return True