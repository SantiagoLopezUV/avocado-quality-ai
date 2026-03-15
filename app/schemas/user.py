# Define que datos entran y salen (Pydantic))
# Define que datos acepta y deVuelve la API (Pydantic)
from pydantic import BaseModel, EmailStr
from uuid import UUID
from datetime import datetime
from typing import Optional


class UserCreate(BaseModel):
    document_number: Optional[str] = None
    name: str
    email: EmailStr
    phone: Optional[str] = None
    location: Optional[str] = None
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: UUID
    document_number: Optional[str]
    name: str
    email: str
    phone: Optional[str]
    location: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True