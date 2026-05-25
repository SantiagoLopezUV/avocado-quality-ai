from fastapi import APIRouter, Depends, HTTPException, status, Header, UploadFile, File
from sqlalchemy.orm import Session
from sqlalchemy import text
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from app.schemas.user import UserCreate, UserLogin, UserResponse, ChangePasswordRequest, UserUpdate
from app.services.user_service import UserService
from app.repositories.user_repository import UserRepository
from app.core.database import get_db
from app.core.config import settings
from pathlib import Path
from typing import Optional
import uuid

router = APIRouter(prefix="/users", tags=["Users"])

def get_current_user_id(authorization: Optional[str] = Header(default=None)) -> uuid.UUID:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token requerido")
    token = authorization.split(" ", 1)[1]
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido")
        return uuid.UUID(user_id)
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido o expirado")

def create_access_token(user_id: str, name: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(hours=24)
    payload = {
        "sub": user_id,
        "name": name,
        "exp": expire,
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

@router.post("/register",
            response_model=UserResponse,
            status_code=status.HTTP_201_CREATED)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    service = UserService(db)
    try:
        new_user = service.create_user(user)
        return new_user
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@router.post("/login")
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    service = UserService(db)
    authenticated_user = service.authenticate_user(user.email, user.password)

    if not authenticated_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas"
        )

    # Generar JWT
    token = create_access_token(
        user_id=str(authenticated_user.id),
        name=authenticated_user.name
    )

    return {
        "message": "Login Exitoso",
        "user_id": str(authenticated_user.id),
        "name": authenticated_user.name,
        "email": authenticated_user.email,
        "phone": authenticated_user.phone,
        "location": authenticated_user.location,
        "document_number": authenticated_user.document_number,
        "profile_picture": authenticated_user.profile_picture,
        "access_token": token,
        "token_type": "bearer",
    }

@router.put("/me", response_model=UserResponse)
def update_profile(
    data: UserUpdate,
    db: Session = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id),
):
    service = UserService(db)
    try:
        updated = service.update_user(user_id, data)
        return updated
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@router.post("/me/photo")
async def upload_profile_photo(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id),
):
    ALLOWED_TYPES = {"image/jpeg", "image/png", "image/webp"}
    MAX_BYTES = 5 * 1024 * 1024  # 5 MB

    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Tipo de archivo no permitido. Usa JPEG, PNG o WEBP.",
        )

    content = await file.read()
    if len(content) > MAX_BYTES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La imagen supera el límite de 5 MB. Usa una imagen más pequeña.",
        )

    ext = {"image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp"}[file.content_type]
    filename = f"{uuid.uuid4().hex}{ext}"

    profile_dir = Path(settings.UPLOAD_DIR) / "profiles"
    profile_dir.mkdir(parents=True, exist_ok=True)
    (profile_dir / filename).write_bytes(content)

    relative_path = f"profiles/{filename}"
    UserRepository(db).update_user(user_id, {"profile_picture": relative_path})

    return {"profile_picture": relative_path, "message": "Foto de perfil actualizada correctamente."}


@router.get("/me/notifications", summary="Notificaciones reales del usuario autenticado")
def get_my_notifications(
    db: Session = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id),
):
    ratings = db.execute(
        text("""
            SELECT
                lr.id::text      AS id,
                lr.stars,
                ml.title         AS listing_title,
                lr.updated_at    AS created_at
            FROM listing_ratings lr
            JOIN marketplace_listings ml ON ml.id = lr.listing_id
            WHERE ml.user_id = :user_id
            ORDER BY lr.updated_at DESC
            LIMIT 20
        """),
        {"user_id": user_id},
    ).fetchall()

    listings = db.execute(
        text("""
            SELECT
                id::text   AS id,
                title,
                created_at
            FROM marketplace_listings
            WHERE user_id = :user_id
            ORDER BY created_at DESC
            LIMIT 10
        """),
        {"user_id": user_id},
    ).fetchall()

    notifications = []

    for r in ratings:
        stars_word = "estrella" if r.stars == 1 else "estrellas"
        notifications.append({
            "id": f"rating_{r.id}",
            "type": "rating",
            "icon": "⭐",
            "title": "Nueva calificación",
            "message": f"Tu lote '{r.listing_title}' recibió {r.stars} {stars_word}",
            "time": r.created_at.isoformat(),
        })

    for l in listings:
        notifications.append({
            "id": f"lot_{l.id}",
            "type": "lot",
            "icon": "📦",
            "title": "Lote publicado",
            "message": f"Tu lote '{l.title}' fue publicado en La Plazita",
            "time": l.created_at.isoformat(),
        })

    notifications.sort(key=lambda n: n["time"], reverse=True)
    return notifications[:20]


@router.post("/change-password")
def change_password(
    data: ChangePasswordRequest,
    db: Session = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id),
):
    if data.new_password != data.confirm_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La nueva contraseña y su confirmación no coinciden",
        )
    service = UserService(db)
    try:
        service.change_password(user_id, data.current_password, data.new_password)
        return {"message": "Contraseña actualizada correctamente"}
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))