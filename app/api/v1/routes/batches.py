import uuid
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.batch import BatchCreate, BatchOut, BatchDetailOut
from app.repositories.batch_repository import BatchRepository
from app.api.v1.routes.analysis import get_optional_user_id  # reutilizamos el helper

router = APIRouter()


def require_user(
    user_id: Optional[uuid.UUID] = Depends(get_optional_user_id),
) -> uuid.UUID:
    """Dependencia que exige usuario autenticado."""
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Debes iniciar sesión para gestionar lotes.",
        )
    return user_id


# ── Crear lote ────────────────────────────────────────────────────────────────
@router.post(
    "",
    response_model=BatchOut,
    status_code=status.HTTP_201_CREATED,
    summary="Crear un nuevo lote",
)
def create_batch(
    body: BatchCreate,
    user_id: uuid.UUID = Depends(require_user),
    db: Session = Depends(get_db),
):
    repo = BatchRepository(db)
    return repo.create(user_id=user_id, name=body.name)


# ── Listar lotes del usuario ──────────────────────────────────────────────────
@router.get(
    "",
    response_model=list[BatchOut],
    summary="Listar todos los lotes del usuario",
)
def list_batches(
    user_id: uuid.UUID = Depends(require_user),
    db: Session = Depends(get_db),
):
    repo = BatchRepository(db)
    return repo.list_by_user(user_id)


# ── Detalle de un lote ────────────────────────────────────────────────────────
@router.get(
    "/{batch_id}",
    response_model=BatchDetailOut,
    summary="Ver detalle de un lote y sus análisis",
)
def get_batch_detail(
    batch_id: uuid.UUID,
    user_id: uuid.UUID = Depends(require_user),
    db: Session = Depends(get_db),
):
    repo = BatchRepository(db)
    detail = repo.get_detail(batch_id, user_id)

    if detail is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lote no encontrado o no tienes permiso para verlo.",
        )
    return detail


# ── Asignar un análisis a un lote ─────────────────────────────────────────────
@router.post(
    "/{batch_id}/analyses/{analysis_id}",
    status_code=status.HTTP_200_OK,
    summary="Asignar un análisis existente a este lote",
)
def assign_analysis_to_batch(
    batch_id: uuid.UUID,
    analysis_id: uuid.UUID,
    user_id: uuid.UUID = Depends(require_user),
    db: Session = Depends(get_db),
):
    repo = BatchRepository(db)
    ok = repo.assign_analysis(batch_id, analysis_id, user_id)

    if not ok:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lote no encontrado o no tienes permiso.",
        )
    return {"message": "Análisis asignado al lote correctamente."}


# ── Eliminar lote ─────────────────────────────────────────────────────────────
@router.delete(
    "/{batch_id}",
    status_code=status.HTTP_200_OK,
    summary="Eliminar un lote (los análisis no se eliminan)",
)
def delete_batch(
    batch_id: uuid.UUID,
    user_id: uuid.UUID = Depends(require_user),
    db: Session = Depends(get_db),
):
    repo = BatchRepository(db)
    ok = repo.delete(batch_id, user_id)

    if not ok:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lote no encontrado o no tienes permiso para eliminarlo.",
        )
    return {"message": "Lote eliminado. Los análisis quedaron sin lote asignado."}