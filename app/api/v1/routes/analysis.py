from fastapi import APIRouter, File, UploadFile
# Importamos la función de análisis de aguacate desde el archivo analysis_service.py
from app.services import predictor_service
from app.services.analysis_service import AnalysisService
import shutil
import os

router = APIRouter()


analysis_service = AnalysisService()

@router.post("/analyze")
#definimos la funcion asiconcrona para analizar la imagen del aguacate
async def analyze_image(file: UploadFile = File(...)):

    #Se guarda la imagen recibida temporalmente en la carpeta data/raw, para luego ser procesada por el predictor
    os.makedirs("data/raw", exist_ok=True)  # Crear la carpeta si no existe
    temp_path = f"data/raw/{file.filename}"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    report = await analysis_service.analyze_avocado(temp_path)

    # Eliminar la imagen temporal después de procesarla
    if os.path.exists(temp_path):
        os.remove(temp_path)

    return{
        "filename": file.filename,
        "analysis_report": report,
        "message": "Analisis completado"
    }