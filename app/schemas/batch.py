import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class BatchCreate(BaseModel):
    """Body para crear un lote."""
    name: str = Field(..., min_length=1, max_length=100, example="Cosecha Abril")


class BatchOut(BaseModel):
    """Respuesta al listar o crear un lote."""
    id: uuid.UUID
    name: str
    total_count: int
    created_at: datetime

    class Config:
        from_attributes = True


class BatchDetailOut(BaseModel):
    """Respuesta al abrir un lote: info + lista de análisis."""
    id: uuid.UUID
    name: str
    total_count: int
    created_at: datetime
    analyses: list[dict]

    class Config:
        from_attributes = True