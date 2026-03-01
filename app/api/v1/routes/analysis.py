from fastapi import APIRouter
# Importamos la función de análisis de aguacate desde el archivo analysis_service.py
from app.services.analysis_service import analyze_avocado

router = APIRouter()

#@router.post("/analyze")
# definimos la funcion asiconcrona para analizar la imagen del aguacate
#async def analyze_image(file: uploadFile = File(...)):
#    result = await analyze_avocado(file)
#    return result