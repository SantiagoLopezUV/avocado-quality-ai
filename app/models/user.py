# Define la Tabla en la Base de Datos (SQLAlchemy)

import uuid
from sqlalchemy import Column, String, Text, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from app.core.database import Base 
from datetime import datetime, timezone


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    document_number = Column(String(20), unique=True, nullable=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    phone = Column(String(20), nullable=True)
    location = Column(Text, nullable=True)
    password_hash = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True),
                        server_default=func.now(),
                        default=lambda: datetime.now(timezone.utc),
                        nullable=False)
    updated_at = Column(DateTime(timezone=True),
                        server_default=func.now(),
                        default=lambda: datetime.now(timezone.utc),
                        onupdate=lambda: datetime.now(timezone.utc),
                        nullable=False)