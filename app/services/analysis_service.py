#prueba de analisis de imagen del aguacate
from app.services.predictor_service import predict

async def analyze_avocado(file):
    # Aquí la lógica para guardar la imagen, preprocesarla, etc.
    # Funcionamiento sin IA
    
    prediction = predict()
    return {
        "fruit": "avocado",
        "prediction": prediction["quality"],
        "confidence": prediction["confidence"]
    }