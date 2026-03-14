from fastapi import APIRouter, File, UploadFile
from app.services import predictor_service
# Importamos la función de análisis de aguacate desde el archivo analysis_service.py
from app.services.analysis_service import AnalysisService
import shutil
import os

router = APIRouter()

################################################################################


#   Este endpoint es de prueba para verificar que el servicio de análisis de imágenes funciona correctamente.
# @router.post("/analyze")
# async def analyze_image(file: UploadFile = File(...)):
#     # Placeholder for image analysis logic
#     return {"message": "Endpoint de analisis - modelo de IA no implementado"}

################################################################################

#   Se comenta porque no se tiene el modelo de IA entrenado aun, 
# pero se deja la estructura para cuando se implemente el modelo.

analysis_service = AnalysisService()

@router.post("/analyze")
#definimos la funcion asiconcrona para analizar la imagen del aguacate
async def analyze_image(file: UploadFile = File(...)):
    #SE COMENTA PORQUE NO SE TIENE EL MODELO DE IA ENTRENADO AUN

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
