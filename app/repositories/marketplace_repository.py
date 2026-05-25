import uuid
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

    def list_active(self, limit: int = 50) -> list[MarketplaceListing]:
        return (
            self.db.query(MarketplaceListing)
            .filter(MarketplaceListing.status == "active")
            .order_by(MarketplaceListing.created_at.desc())
            .limit(limit)
            .all()
        )

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
