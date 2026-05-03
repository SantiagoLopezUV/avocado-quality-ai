import uuid
import logging
from datetime import datetime, timezone
from typing import Optional
from pathlib import Path

from sqlalchemy.orm import Session
from sqlalchemy import text

logger = logging.getLogger(__name__)


class BatchRepository:

    def __init__(self, db: Session):
        self.db = db

    # ── Crear lote ────────────────────────────────────────────────────────────
    def create(self, user_id: uuid.UUID, name: str) -> dict:
        now = datetime.now(timezone.utc)
        batch_id = uuid.uuid4()

        self.db.execute(
            text(
                """
                INSERT INTO batches (id, user_id, name, total_count, created_at, updated_at)
                VALUES (:id, :user_id, :name, 0, :created_at, :updated_at)
                """
            ),
            {"id": batch_id, "user_id": user_id, "name": name,
            "created_at": now, "updated_at": now},
        )
        self.db.commit()
        return {"id": batch_id, "name": name, "total_count": 0, "created_at": now}

    # ── Listar lotes del usuario ──────────────────────────────────────────────
    def list_by_user(self, user_id: uuid.UUID) -> list:
        rows = self.db.execute(
            text(
                """
                SELECT id, name, total_count, created_at
                FROM batches
                WHERE user_id = :user_id
                ORDER BY created_at DESC
                """
            ),
            {"user_id": user_id},
        ).fetchall()
        return [dict(r._mapping) for r in rows]

    # ── Detalle de un lote + sus análisis ─────────────────────────────────────
    def get_detail(self, batch_id: uuid.UUID, user_id: uuid.UUID) -> Optional[dict]:
        # Verificar que el lote pertenece al usuario
        batch_row = self.db.execute(
            text(
                """
                SELECT id, name, total_count, created_at
                FROM batches
                WHERE id = :batch_id AND user_id = :user_id
                """
            ),
            {"batch_id": batch_id, "user_id": user_id},
        ).fetchone()

        if batch_row is None:
            return None

        # Análisis del lote
        analyses = self.db.execute(
            text(
                """
                SELECT
                    a.id            AS analysis_id,
                    a.ripeness_level,
                    a.damage_level,
                    a.confidence,
                    ar.price_sale,
                    ar.price_purchase,
                    ar.message,
                    a.created_at,
                    i.file_path
                FROM analyses a
                JOIN analysis_results ar ON ar.analysis_id = a.id
                JOIN images i            ON i.id = a.image_id
                WHERE a.batch_id = :batch_id
                ORDER BY a.created_at DESC
                """
            ),
            {"batch_id": batch_id},
        ).fetchall()

        return {
            **dict(batch_row._mapping),
            "analyses": [dict(r._mapping) for r in analyses],
        }

    # ── Asignar análisis a lote (y sumar total_count) ─────────────────────────
    def assign_analysis(
        self, batch_id: uuid.UUID, analysis_id: uuid.UUID, user_id: uuid.UUID
    ) -> bool:
        # Verificar que el lote pertenece al usuario
        exists = self.db.execute(
            text(
                "SELECT id FROM batches WHERE id = :bid AND user_id = :uid"
            ),
            {"bid": batch_id, "uid": user_id},
        ).fetchone()

        if exists is None:
            return False

        # Asignar batch_id al análisis
        self.db.execute(
            text(
                "UPDATE analyses SET batch_id = :batch_id WHERE id = :analysis_id"
            ),
            {"batch_id": batch_id, "analysis_id": analysis_id},
        )

        # Incrementar contador del lote
        self.db.execute(
            text(
                """
                UPDATE batches
                SET total_count = total_count + 1,
                    updated_at  = :now
                WHERE id = :batch_id
                """
            ),
            {"batch_id": batch_id, "now": datetime.now(timezone.utc)},
        )

        self.db.commit()
        return True

    # ── Eliminar lote (y desasociar análisis) ─────────────────────────────────
    def delete(self, batch_id: uuid.UUID, user_id: uuid.UUID) -> bool:
        exists = self.db.execute(
            text(
                "SELECT id FROM batches WHERE id = :bid AND user_id = :uid"
            ),
            {"bid": batch_id, "uid": user_id},
        ).fetchone()

        if exists is None:
            return False

        # ON DELETE SET NULL ya desasocia los análisis automáticamente
        self.db.execute(
            text("DELETE FROM batches WHERE id = :bid"),
            {"bid": batch_id},
        )
        self.db.commit()
        return True
    
    # ── Renombrar lote ────────────────────────────────────────────────────────────
    def rename(self, batch_id: uuid.UUID, user_id: uuid.UUID, new_name: str) -> Optional[dict]:
        """
        Renombra un lote. Verifica que pertenezca al usuario.
        Devuelve el lote actualizado o None si no existe.
        """
        exists = self.db.execute(
            text("SELECT id FROM batches WHERE id = :bid AND user_id = :uid"),
            {"bid": batch_id, "uid": user_id},
        ).fetchone()

        if exists is None:
            return None

        now = datetime.now(timezone.utc)
        self.db.execute(
            text(
                """
                UPDATE batches
                SET name = :name, updated_at = :now
                WHERE id = :bid
                """
            ),
            {"name": new_name, "bid": batch_id, "now": now},
        )
        self.db.commit()

        return {"id": batch_id, "name": new_name, "updated_at": now}