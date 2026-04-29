# Logica del Negocio mas Encriptacion
import bcrypt
from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate
from app.repositories.user_repository import UserRepository
from typing import Optional
import uuid


class UserService:
    def __init__(self, db: Session):
        self.user_repository = UserRepository(db)

    def hash_password(self, password: str) -> str:
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
        return hashed.decode('utf-8')

    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        return bcrypt.checkpw(
            plain_password.encode('utf-8'),
            hashed_password.encode('utf-8')
            )




    def create_user(self, user_create: UserCreate) -> User:
        if self.user_repository.email_exists(user_create.email):
            raise ValueError("Email already registered")
        if self.user_repository.get_user_by_document_number(user_create.document_number):
            raise ValueError("Número de documento ya registrado")

        hashed_password = self.hash_password(user_create.password)
        user = User(
            document_number=user_create.document_number,
            name=user_create.name,
            email=user_create.email,
            phone=user_create.phone,
            location=user_create.location,
            password_hash=hashed_password
        )
        return self.user_repository.create_user(user)

    def authenticate_user(self, email: str, password: str) -> Optional[User]:
        user = self.user_repository.get_user_by_email(email)
        if user and self.verify_password(password, user.password_hash):
            return user
        return None

    def get_user_by_id(self, user_id: uuid.UUID) -> Optional[User]:
        return self.user_repository.get_user_by_id(user_id)