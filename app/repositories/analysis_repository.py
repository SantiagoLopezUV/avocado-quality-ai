import uuid
from datetime import datetime, timezone
from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy import text


class AnalysisRepository:
    """
    Encapsula todas las queries SQL relacionadas con análisis.
    Usa SQL nativo (text()) para respetar tu esquema PostgreSQL existente.
    """

    def __init__(self, db: Session):
        self.db = db

    def get_active_model_version_id(self) -> Optional[uuid.UUID]:
        """Obtiene el ID de la versión de modelo activa más reciente."""
        result = self.db.execute(
            text(
                """
                SELECT id FROM model_versions
                WHERE is_active = TRUE
                ORDER BY created_at DESC
                LIMIT 1
                """
            )
        ).fetchone()
        return result[0] if result else None

    def save_image(
        self,
        image_id: uuid.UUID,
        file_path: str,
        now: datetime,
    ) -> None:
        """Inserta un registro en la tabla images."""
        self.db.execute(
            text(
                """
                INSERT INTO images (id, file_path, uploaded_at)
                VALUES (:id, :file_path, :uploaded_at)
                """
            ),
            {
                "id": image_id,
                "file_path": file_path,
                "uploaded_at": now,
            },
        )

    def save_analysis(
        self,
        analysis_id: uuid.UUID,
        user_id: uuid.UUID,
        image_id: uuid.UUID,
        now: datetime,
    ) -> None:
        """Inserta un registro en la tabla analyses."""
        self.db.execute(
            text(
                """
                INSERT INTO analyses (id, user_id, image_id, created_at)
                VALUES (:id, :user_id, :image_id, :created_at)
                """
            ),
            {
                "id": analysis_id,
                "user_id": user_id,
                "image_id": image_id,
                "created_at": now,
            },
        )
    def save_analysis_result(
        self,
        result_id: uuid.UUID,
        analysis_id: uuid.UUID,
        model_version_id: uuid.UUID,
        ripeness_level: str,
        damage_level: str,
        confidence: float,
        price_sale: float,
        price_purchase: float,
        message: str,
        now: datetime,
    ) -> None:
        """Inserta un registro en la tabla analysis_results."""
        self.db.execute(
            text(
                """
                INSERT INTO analysis_results (
                    id, analysis_id, model_version_id,
                    ripeness_level, damage_level, confidence,
                    price_sale, price_purchase, message, created_at
                )
                VALUES (
                    :id, :analysis_id, :model_version_id,
                    CAST(:ripeness_level AS ripeness_enum), CAST(:damage_level AS damage_enum),
                    :confidence, :price_sale, :price_purchase,
                    :message, :created_at
                )
                """
            ),
            {
                "id": result_id,
                "analysis_id": analysis_id,
                "model_version_id": model_version_id,
                "ripeness_level": ripeness_level,
                "damage_level": damage_level,
                "confidence": confidence / 100,  # BD guarda 0-1, modelo retorna 0-100
                "price_sale": price_sale,
                "price_purchase": price_purchase,
                "message": message,
                "created_at": now,
            },
        )

    def persist_full_analysis(
        self,
        *,
        user_id: uuid.UUID,
        file_path: str,
        ripeness_level: str,
        damage_level: str,
        confidence: float,
        price_sale: float,
        price_purchase: float,
        message: str,
    ) -> tuple[uuid.UUID, uuid.UUID]:
        """
        Ejecuta las 3 inserciones en una sola transacción atómica.
        Devuelve (analysis_id, image_id).
        """
        now = datetime.now(timezone.utc)

        # 1. Verificar model_version activa
        model_version_id = self.get_active_model_version_id()
        if model_version_id is None:
            raise ValueError("No hay una versión de modelo activa en la BD.")

        image_id = uuid.uuid4()
        analysis_id = uuid.uuid4()
        result_id = uuid.uuid4()

        self.save_image(image_id, file_path, now)
        self.save_analysis(analysis_id, user_id, image_id, now)
        self.save_analysis_result(
            result_id, analysis_id, model_version_id,
            ripeness_level, damage_level, confidence,
            price_sale, price_purchase, message, now,
        )

        self.db.commit()
        return analysis_id, image_id

    def get_history(self, user_id: uuid.UUID, limit: int = 20) -> list:
        rows = self.db.execute(
            text(
                """
                SELECT
                    a.id              AS analysis_id,
                    ar.ripeness_level,
                    ar.damage_level,
                    ar.confidence,
                    ar.price_sale,
                    ar.price_purchase,
                    ar.message,
                    a.created_at,
                    i.file_path
                FROM analyses a
                JOIN analysis_results ar ON ar.analysis_id = a.id
                JOIN images i            ON i.id = a.image_id
                WHERE a.user_id = :user_id
                ORDER BY a.created_at DESC
                LIMIT :limit
                """
            ),
            {"user_id": user_id, "limit": limit},
        ).fetchall()
        return [dict(r._mapping) for r in rows]

    def get_history_paginated(self, user_id: uuid.UUID,
                                page: int = 1, page_size: int = 10) -> dict:
        """Historial paginado de análisis de un usuario."""
        offset = (page - 1) * page_size
        
        # Total de registros del usuario
        total = self.db.execute(
            text("SELECT COUNT(*) FROM analyses WHERE user_id = :uid"),
            {"uid": user_id},).scalar()

        rows = self.db.execute(
            text(
                """
                SELECT
                    a.id              AS analysis_id,
                    ar.ripeness_level,
                    ar.damage_level,
                    ar.confidence,
                    ar.price_sale,
                    ar.price_purchase,
                    ar.message,
                    a.created_at,
                    i.file_path
                FROM analyses a
                JOIN analysis_results ar ON ar.analysis_id = a.id
                JOIN images i            ON i.id = a.image_id
                WHERE a.user_id = :uid
                ORDER BY a.created_at DESC
                LIMIT :limit OFFSET :offset
                """
            ),
            {"uid": user_id, "limit": page_size, "offset": offset},
            ).fetchall()

        return {
            "total": total,
            "page": page,
            "page_size": page_size,
            "total_pages": -(-total // page_size),  # ceil sin importar math
            "items": [dict(r._mapping) for r in rows],
        }

    def get_analysis_detail(self, analysis_id: uuid.UUID,
                            user_id: uuid.UUID) -> Optional[dict]:
        """
        Detalle de un análisis específico.
        Verifica que pertenezca al usuario que lo solicita.
        """
        row = self.db.execute(
            text(
                """
                SELECT
                    a.id              AS analysis_id,
                    a.user_id,
                    ar.ripeness_level,
                    ar.damage_level,
                    ar.confidence,
                    ar.price_sale,
                    ar.price_purchase,
                    ar.message,
                    a.created_at,
                    i.file_path,
                    i.filename
                FROM analyses a
                JOIN analysis_results ar ON ar.analysis_id = a.id
                JOIN images i            ON i.id = a.image_id
                WHERE a.id = :analysis_id
                AND a.user_id = :user_id
                """
            ),
            {"analysis_id": analysis_id, "user_id": user_id},
        ).fetchone()

        return dict(row._mapping) if row else None