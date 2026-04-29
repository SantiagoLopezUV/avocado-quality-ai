from http.client import HTTPException

# from fastapi import APIRouter, File, UploadFile, HTTPException
# from app.services.price_calculator import PriceCalculator
# from app.services import predictor_service 
# # Importamos la función de análisis de aguacate desde el archivo analysis_service.py
# from app.services.analysis_service import AnalysisService
# import shutil
# import os

# router = APIRouter()

# ################################################################################


# #   Este endpoint es de prueba para verificar que el servicio de análisis de imágenes funciona correctamente.
# # @router.post("/analyze")
# # async def analyze_image(file: UploadFile = File(...)):
# #     # Placeholder for image analysis logic
# #     return {"message": "Endpoint de analisis - modelo de IA no implementado"}

# ################################################################################

# #   Se comenta porque no se tiene el modelo de IA entrenado aun, 
# # pero se deja la estructura para cuando se implemente el modelo.

# analysis_service = AnalysisService()
# @router.post("/analyze")


# async def analyze_image(file: UploadFile = File(...)):
#     """
#     Analiza una imagen de aguacate y calcula su precio sugerido
#     """
#     # 1. Guardar imagen temporal
#     os.makedirs("data/raw", exist_ok=True)
#     temp_path = f"data/raw/{file.filename}"
    
#     with open(temp_path, "wb") as buffer:
#         shutil.copyfileobj(file.file, buffer)
    
#     try:
#         # 2. Analizar con IA
#         report = await analysis_service.analyze_avocado(temp_path)

#         if report is None:
#             raise HTTPException(
#                 status_code=422, 
#                 detail={"Error": "imagen no válida o modelo no pudo analizarla",
#                     "Mensaje": "No se detectó ningún aguacate en la imagen. Por favor suba una foto clara de su aguacate."
#                 }
#             )
        
#         # 3. EXTRAER analysis_results
#         analysis_results = report.get("analysis_results", {})
        
#         # 4. ✨ CALCULAR PRECIO CON PriceCalculator ✨
#         business_logic = PriceCalculator.calculate(analysis_results)
        
#         # 5. ACTUALIZAR el business_logic en el reporte
#         report["business_logic"] = business_logic
        
#         return {
#             "filename": file.filename,
#             "analysis_report": report,
#             "confidence_summary": report.get("confidence_summary", {}), #elevar confidence_summary al nivel raíz del response para acceso directo desde el frontend
#             "message": "Análisis completado"
#         }
    
#     finally:
#         # 6. Eliminar imagen temporal
#         if os.path.exists(temp_path):
#             os.remove(temp_path)



##########
#########################
##########################################
##############################################################

# NUEVO SCRIPT

#########################################################################################
#####################################################################################################################
import uuid
import logging
import os
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.core.config import settings
from app.database.session import get_db
from app.schemas.analysis import AnalysisResultOut
from app.services.analysis_service import AnalysisService
from app.services.price_calculator import PriceCalculator
from app.repositories.analysis_repository import AnalysisRepository

logger = logging.getLogger(__name__)
router = APIRouter()

# ── Auth opcional (no lanza error si no hay token) ──────────────────────────
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login", auto_error=False)

analysis_service = AnalysisService()

ALLOWED_TYPES = {"image/jpeg", "image/png", "image/webp"}
MAX_MB = 10


# ── Helper: leer user_id del JWT (None si anónimo) ──────────────────────────
def get_optional_user_id(token: Optional[str] = Depends(oauth2_scheme)) -> Optional[uuid.UUID]:
    if not token:
        return None
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        sub = payload.get("sub")
        return uuid.UUID(sub) if sub else None
    except (JWTError, ValueError):
        return None


# ── Helper: guardar imagen en disco con nombre UUID ──────────────────────────
def save_image_to_disk(upload_file: UploadFile) -> tuple[Path, str]:
    content_type = upload_file.content_type or ""
    if content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Tipo no permitido: '{content_type}'. Usa JPEG, PNG o WEBP.",
        )

    ext = {"image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp"}[content_type]
    filename = f"{uuid.uuid4().hex}{ext}"

    upload_dir = Path(settings.UPLOAD_DIR)
    upload_dir.mkdir(parents=True, exist_ok=True)
    file_path = upload_dir / filename

    max_bytes = MAX_MB * 1024 * 1024
    written = 0
    try:
        with file_path.open("wb") as f:
            while chunk := upload_file.file.read(65536):
                written += len(chunk)
                if written > max_bytes:
                    file_path.unlink(missing_ok=True)
                    raise HTTPException(
                        status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                        detail=f"Imagen supera el límite de {MAX_MB} MB.",
                    )
                f.write(chunk)
    except HTTPException:
        raise
    except Exception as e:
        file_path.unlink(missing_ok=True)
        raise HTTPException(status_code=500, detail="Error guardando imagen.") from e

    return file_path, filename


# ── Helper: mensaje amigable ─────────────────────────────────────────────────
def build_message(ripeness_level: str, damage_level: str, confidence: float) -> str:
    ripeness_msgs = {
        "verde":       "El aguacate está verde, aún no está listo para la venta.",
        "maduro":      "¡El aguacate está en su punto óptimo de madurez!",
        "sobremaduro": "El aguacate está sobremaduro; venderlo cuanto antes.",
    }
    damage_msgs = {
        "ninguno":  "No presenta daños ni roña.",
        "leve":     "Daño leve; puede comercializarse normalmente.",
        "moderado": "Daño moderado; considere una categoría de precio inferior.",
        "severo":   "Daño severo; no apto para venta en fresco.",
    }
    return (
        f"{ripeness_msgs.get(ripeness_level, 'Madurez desconocida.')} "
        f"{damage_msgs.get(damage_level, 'Estado de daño desconocido.')} "
        f"(Confianza: {round(confidence, 1)}%)"
    )


# ── Endpoint principal ───────────────────────────────────────────────────────
@router.post(
    "/analyze",
    response_model=AnalysisResultOut,
    status_code=status.HTTP_201_CREATED,
    summary="Analizar calidad de aguacate",
)
async def analyze_image(
    file: UploadFile = File(..., description="Foto del aguacate (JPEG, PNG o WEBP)"),
    user_id: Optional[uuid.UUID] = Depends(get_optional_user_id),
    db: Session = Depends(get_db),
):
    """
    - **Anónimo** → analiza y devuelve resultado. No guarda historial.
    - **Autenticado** → analiza, guarda en BD y asocia al usuario.
    """

    # 1. Guardar imagen en disco
    file_path, filename = save_image_to_disk(file)

    try:
        # 2. Correr modelo IA (tu lógica actual intacta)
        report = await analysis_service.analyze_avocado(str(file_path))

        if report is None:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail={
                    "error": "Imagen no válida",
                    "mensaje": "No se detectó ningún aguacate. Sube una foto clara.",
                },
            )

        # 3. Extraer resultados del modelo 
        analysis_results = report.get("analysis_results", {})
        business_logic = PriceCalculator.calculate(analysis_results)
        visuals = report.get("visuals", {})

        # Mapeo inglés → español para los ENUMs de la BD
        RIPENESS_MAP = {
            "Underripe":  "verde",
            "Ripening":   "verde",
            "Ripe":       "maduro",
            "Overripe":   "sobremaduro",
            "Unknown":    "verde",
        }
        DAMAGE_MAP = {
            "Healthy":  "ninguno",
            "Affected": "moderado",
        }

        # Valores originales en inglés — para el response al frontend
        ripeness_level_raw: str = analysis_results.get("ripeness_level", "Unknown")
        damage_level_raw: str   = analysis_results.get("health_status", "Healthy")

        # Valores traducidos al español — para guardar en la BD
        ripeness_level_db: str = RIPENESS_MAP.get(ripeness_level_raw, "verde")
        damage_level_db: str   = DAMAGE_MAP.get(damage_level_raw, "ninguno")

        # ripeness_level: str = analysis_results.get("ripeness_level", "desconocido")
        # damage_level: str   = analysis_results.get("health_status", "desconocido")

        ripeness_conf: float = float(analysis_results.get("ripeness_conf", 0))
        damage_conf: float   = float(analysis_results.get("damage_conf", 0))
        price_sale: float     = float(business_logic.get("suggested_price", 0))
        price_purchase: float = float(business_logic.get("base_price", 0))
        market_dest: str     = business_logic.get("market_destination", report.get("business_logic", {}).get("market_destination", ""))

        avg_confidence = (ripeness_conf + damage_conf) / 2
        message = build_message(ripeness_level_db, damage_level_db, avg_confidence)
        now = datetime.now(timezone.utc)

        # 4. Si es anónimo → respuesta directa sin persistir en BD
        if user_id is None:
            return AnalysisResultOut(
                ripeness_level=ripeness_level_raw,
                damage_level=damage_level_raw,
                ripeness_confidence=ripeness_conf,
                damage_confidence=damage_conf,
                price_sale=price_sale,
                price_purchase=price_purchase,
                image_base64=visuals.get("image_base64"),
                detections=visuals.get("detections"),
                message=message,
                market_destination=market_dest,
                analyzed_at=now,
                saved_to_history=False,
            )

        # 5. Usuario autenticado → persistir en BD
        try:
            repo = AnalysisRepository(db)
            analysis_id, image_id = repo.persist_full_analysis(
                user_id=user_id,
                file_path=f"{settings.UPLOAD_DIR}/{filename}",
                ripeness_level=ripeness_level_db,
                damage_level=damage_level_db,
                confidence=avg_confidence,
                price_sale=price_sale,
                price_purchase=price_purchase,
                message=message,
            )
        except ValueError as e:
            # model_versions sin registro activo
            raise HTTPException(status_code=500, detail=str(e))
        except Exception as e:
            db.rollback()
            logger.exception("Error persistiendo análisis en BD: %s", e)
            raise HTTPException(status_code=500, detail="Error guardando análisis en base de datos.")

        # 6. Respuesta con IDs reales
        return AnalysisResultOut(
            analysis_id=analysis_id,
            image_id=image_id,
            ripeness_level=ripeness_level_raw,
            damage_level=damage_level_raw,
            ripeness_confidence=ripeness_conf,
            damage_confidence=damage_conf,
            price_sale=price_sale,
            price_purchase=price_purchase,
            image_base64=visuals.get("image_base64"),
            detections=visuals.get("detections"),
            message=message,
            market_destination=market_dest,
            analyzed_at=now,
            user_id=user_id,
            saved_to_history=True,
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Error inesperado en /analyze: %s", e)
        raise HTTPException(status_code=500, detail="Error interno del servidor.")
    finally:
        # Anónimo: borrar imagen del disco (no hay historial que referenciarla)
        if user_id is None and file_path.exists():
            file_path.unlink(missing_ok=True)


# ── Historial (solo usuarios autenticados) ───────────────────────────────────
@router.get(
    "/history",
    summary="Historial de análisis del usuario autenticado",
)
def get_history(
    limit: int = 20,
    user_id: Optional[uuid.UUID] = Depends(get_optional_user_id),
    db: Session = Depends(get_db),
):
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Debes iniciar sesión para ver tu historial.",
        )
    repo = AnalysisRepository(db)
    return {"history": repo.get_history(user_id, limit=limit)}

