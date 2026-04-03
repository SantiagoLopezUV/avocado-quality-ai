#prueba de analisis de imagen del aguacate
from app.services.predictor_service import PredictorService


class AnalysisService:
    
    def __init__(self):
        self.predictor = PredictorService()

    async def analyze_avocado(self, file_path: str):   
    # Aquí la lógica para guardar la imagen, preprocesarla, etc.
    # Funcionamiento sin IA
        prediction = self.predictor.predict_image(file_path)
        report = prediction["analysis_report"]
        health = report["health"]
        ripeness = report["ripeness"]

        ###tambien se puede agregar calcular el precio sugerido basado en la calidad del aguacate, se agrega en el return, para devolver el precio sugerido según la calidad del agucate

        return {         # Retornar un resultado simulado para hacer las pruebas
            "fruit": "avocado",
            "analysis_results": {
                "health_status": health["status"],
                "spots_found": health["spots_count"],
                "ripeness_level": ripeness["level"],
                "ripeness_conf": ripeness["confidence"],
                "damage_conf": health["damage_confidence"],
            },
            "business_logic": {
                # Este será calculado por PriceCalculator en analyze.py
                "market_destination": report["market_suggestion"],
                "currency": "COP"
            },
            "visuals": {
                "image_base64": report["image_base64"],
                "detections": health["detections"]
            },
            "confidence_summary": {
                "damage_model": {
                    "label": "Detección de Roña",
                    "value": health["damage_confidence"],
                    "display": f"{health['damage_confidence']:.1f}% de certeza"
                },
                "ripeness_model": {
                    "label": "Nivel de Madurez",
                    "value": ripeness["confidence"],
                    "display": f"{ripeness['confidence']:.1f}% de certeza"
                }
            }
        }
                                                                                                                                                    
        