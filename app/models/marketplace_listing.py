import uuid
from sqlalchemy import Column, String, Text, Float, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from app.core.database import Base
from datetime import datetime, timezone


class MarketplaceListing(Base):
    __tablename__ = "marketplace_listings"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), nullable=False)
    analysis_id = Column(UUID(as_uuid=True), nullable=True)
    batch_id = Column(UUID(as_uuid=True), nullable=True)  # FK a batches gestionada a nivel DB
    farmer_name = Column(String(100), nullable=False)
    title = Column(String(200), nullable=False)
    quantity_kg = Column(Float, nullable=False)
    price_per_kg = Column(Float, nullable=False)
    quality_score = Column(Float, nullable=True)
    ripeness_level = Column(String(50), nullable=True)
    damage_level = Column(String(50), nullable=True)
    location = Column(Text, nullable=True)
    contact_phone = Column(String(20), nullable=True)
    description = Column(Text, nullable=True)
    status = Column(String(20), default="active", nullable=False)
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )
