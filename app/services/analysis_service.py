#prueba de analisis de imagen del aguacate
from app.services.predictor_service import PredictorService


class AnalysisService:
    
    def __init__(self):
        self.predictor = PredictorService()

    async def analyze_avocado(self, file_path: str):   
    # Aquí la lógica para guardar la imagen, preprocesarla, etc.
    # Funcionamiento sin IA
        prediction = self.predictor.predict_image(file_path)

        ###tambien se puede agregar calcular el precio sugerido basado en la calidad del aguacate###

        return {         # Retornar un resultado simulado para hacer las pruebas
            "fruit": "avocado",
            "prediction": prediction["quality"],
            "confidence": prediction["confidence"]
        }