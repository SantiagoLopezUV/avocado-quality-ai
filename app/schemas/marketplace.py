import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class MarketplaceListingCreate(BaseModel):
    analysis_id: Optional[uuid.UUID] = None
    batch_id: Optional[uuid.UUID] = None
    title: str = Field(..., min_length=3, max_length=200)
    quantity_kg: float = Field(..., gt=0)
    price_per_kg: float = Field(..., gt=0)
    quality_score: Optional[float] = None
    ripeness_level: Optional[str] = None
    damage_level: Optional[str] = None
    description: Optional[str] = None


class MarketplaceListingOut(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    analysis_id: Optional[uuid.UUID] = None
    batch_id: Optional[uuid.UUID] = None
    farmer_name: str
    title: str
    quantity_kg: float
    price_per_kg: float
    quality_score: Optional[float] = None
    ripeness_level: Optional[str] = None
    damage_level: Optional[str] = None
    location: Optional[str] = None
    contact_phone: Optional[str] = None
    description: Optional[str] = None
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


class ListingAnalysisOut(BaseModel):
    analysis_id: uuid.UUID
    ripeness_level: Optional[str] = None
    damage_level: Optional[str] = None
    confidence: Optional[float] = None
    price_sale: Optional[float] = None
    message: Optional[str] = None
    created_at: datetime
    file_path: Optional[str] = None
