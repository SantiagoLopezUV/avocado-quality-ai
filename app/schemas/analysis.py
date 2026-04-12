import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class AnalysisResultOut(BaseModel):
    """Schema de respuesta del endpoint /analyze para el cliente."""

    # IDs (solo presentes si el usuario está autenticado)
    analysis_id: Optional[uuid.UUID] = None
    image_id: Optional[uuid.UUID] = None

    # Clasificaciones del modelo IA
    ripeness_level: str        # verde | maduro | sobremaduro
    damage_level: str          # ninguno | leve | moderado | severo
    ripeness_confidence: float
    damage_confidence: float

    # Precios
    price_sale: float
    price_purchase: float
    currency: str = "COP"

    # Visual
    image_base64: Optional[str] = None
    detections: Optional[list] = None

    # Mensaje y metadatos
    message: str
    market_destination: str
    analyzed_at: datetime
    user_id: Optional[uuid.UUID] = None
    saved_to_history: bool = False

    class Config:
        from_attributes = True