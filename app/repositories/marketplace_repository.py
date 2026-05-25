import uuid
from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.models.marketplace_listing import MarketplaceListing


class MarketplaceRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, user_id: uuid.UUID, farmer_name: str, location: str | None,
               contact_phone: str | None, **kwargs) -> MarketplaceListing:
        listing = MarketplaceListing(
            user_id=user_id,
            farmer_name=farmer_name,
            location=location,
            contact_phone=contact_phone,
            **kwargs,
        )
        self.db.add(listing)
        self.db.commit()
        self.db.refresh(listing)
        return listing

    def list_active(self, limit: int = 50) -> list[dict]:
        rows = self.db.execute(
            text("""
                SELECT
                    ml.id, ml.user_id, ml.analysis_id, ml.batch_id,
                    ml.farmer_name, ml.title, ml.quantity_kg, ml.price_per_kg,
                    ml.quality_score, ml.ripeness_level, ml.damage_level,
                    ml.location, ml.contact_phone, ml.description,
                    ml.status, ml.created_at,
                    ROUND(AVG(lr.stars)::numeric, 1)::float AS avg_rating,
                    COUNT(lr.id)::int AS rating_count
                FROM marketplace_listings ml
                LEFT JOIN listing_ratings lr ON lr.listing_id = ml.id
                WHERE ml.status = 'active'
                GROUP BY ml.id
                ORDER BY ml.created_at DESC
                LIMIT :limit
            """),
            {"limit": limit},
        ).fetchall()
        return [dict(r._mapping) for r in rows]

    def upsert_rating(self, listing_id: uuid.UUID, user_id: uuid.UUID, stars: int) -> dict:
        self.db.execute(
            text("""
                INSERT INTO listing_ratings (listing_id, user_id, stars)
                VALUES (:listing_id, :user_id, :stars)
                ON CONFLICT (listing_id, user_id)
                DO UPDATE SET stars = EXCLUDED.stars, updated_at = NOW()
            """),
            {"listing_id": listing_id, "user_id": user_id, "stars": stars},
        )
        self.db.commit()
        stats = self._get_rating_stats(listing_id)
        return {
            "listing_id": listing_id,
            "user_id": user_id,
            "stars": stars,
            **stats,
        }

    def get_my_rating(self, listing_id: uuid.UUID, user_id: uuid.UUID) -> Optional[int]:
        row = self.db.execute(
            text("SELECT stars FROM listing_ratings WHERE listing_id = :lid AND user_id = :uid"),
            {"lid": listing_id, "uid": user_id},
        ).fetchone()
        return row.stars if row else None

    def _get_rating_stats(self, listing_id: uuid.UUID) -> dict:
        row = self.db.execute(
            text("""
                SELECT ROUND(AVG(stars)::numeric, 1)::float AS avg_rating,
                       COUNT(*)::int AS rating_count
                FROM listing_ratings
                WHERE listing_id = :lid
            """),
            {"lid": listing_id},
        ).fetchone()
        return {
            "avg_rating": row.avg_rating if row else None,
            "rating_count": row.rating_count if row else 0,
        }

    def get_listing_analyses(self, listing_id: uuid.UUID) -> list[dict]:
        rows = self.db.execute(
            text(
                """
                SELECT
                    a.id            AS analysis_id,
                    ar.ripeness_level,
                    ar.damage_level,
                    ar.confidence,
                    ar.price_sale,
                    ar.message,
                    a.created_at,
                    i.file_path
                FROM marketplace_listings ml
                JOIN analyses a          ON a.batch_id = ml.batch_id
                JOIN analysis_results ar ON ar.analysis_id = a.id
                JOIN images i            ON i.id = a.image_id
                WHERE ml.id = :listing_id
                  AND ml.status = 'active'
                  AND ml.batch_id IS NOT NULL
                ORDER BY a.created_at DESC
                """
            ),
            {"listing_id": listing_id},
        ).fetchall()
        return [dict(r._mapping) for r in rows]

    def delete(self, listing_id: uuid.UUID, user_id: uuid.UUID) -> bool:
        listing = (
            self.db.query(MarketplaceListing)
            .filter(
                MarketplaceListing.id == listing_id,
                MarketplaceListing.user_id == user_id,
            )
            .first()
        )
        if not listing:
            return False
        self.db.delete(listing)
        self.db.commit()
        return True
