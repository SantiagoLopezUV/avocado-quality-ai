import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.marketplace import MarketplaceListingCreate, MarketplaceListingOut, ListingAnalysisOut
from app.repositories.marketplace_repository import MarketplaceRepository
from app.repositories.user_repository import UserRepository
from app.api.v1.routes.batches import require_user

router = APIRouter()


@router.get(
    "",
    response_model=list[MarketplaceListingOut],
    summary="Listar publicaciones activas en La Plazita (público)",
)
def list_listings(
    limit: int = 50,
    db: Session = Depends(get_db),
):
    return MarketplaceRepository(db).list_active(limit=limit)


@router.post(
    "",
    response_model=MarketplaceListingOut,
    status_code=status.HTTP_201_CREATED,
    summary="Publicar un lote en La Plazita",
)
def create_listing(
    body: MarketplaceListingCreate,
    user_id: uuid.UUID = Depends(require_user),
    db: Session = Depends(get_db),
):
    user = UserRepository(db).get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado.")

    return MarketplaceRepository(db).create(
        user_id=user_id,
        farmer_name=user.name,
        location=user.location,
        contact_phone=user.phone,
        **body.model_dump(),
    )


@router.get(
    "/{listing_id}/analyses",
    response_model=list[ListingAnalysisOut],
    summary="Ver análisis del lote de una publicación (público)",
)
def get_listing_analyses(
    listing_id: uuid.UUID,
    db: Session = Depends(get_db),
):
    return MarketplaceRepository(db).get_listing_analyses(listing_id)


@router.delete(
    "/{listing_id}",
    status_code=status.HTTP_200_OK,
    summary="Eliminar una publicación propia",
)
def delete_listing(
    listing_id: uuid.UUID,
    user_id: uuid.UUID = Depends(require_user),
    db: Session = Depends(get_db),
):
    ok = MarketplaceRepository(db).delete(listing_id, user_id)
    if not ok:
        raise HTTPException(
            status_code=404,
            detail="Publicación no encontrada o sin permiso para eliminarla.",
        )
    return {"message": "Publicación eliminada correctamente."}
