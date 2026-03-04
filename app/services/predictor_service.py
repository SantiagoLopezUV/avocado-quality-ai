from ultralytics import YOLO
import os 


class PredictorService:
    def __init__(self, model_name: str = "best_v2.pt"):
        #Cargar el modelo entrenado, desde la carpeta data
        self.model_path = os.path.join("data", "trained_models", model_name)
        if os.path.exists(self.model_path):
            try:
                self.model = YOLO(self.model_path)
                print(f"Modelo cargado desde {self.model_path}")
            except Exception as e:
                print(f"Error al cargar el modelo: {e}")
                self.model = YOLO("yolov8n.pt")  # Cargar un modelo preentrenado como fallback
        else:
            print(f"Modelo no encontrado en {self.model_path}")
            self.model = YOLO("yolov8n.pt")  # por si no carga el modelo personalizado, se carga un modelo preentrenado como fallback

    def predict_image(self, image_path: str):
        # Realizar la predicción en la imagen dada
        #conf = 0.5 asegura que solo se consideren predicciones con una confianza del 50% o más
        results = self.model.predict(source=image_path, conf = 0.5)
        result = results[0]

        #tiene manchas si el número de cajas detectadas es mayor a 0
        spots = len(result.boxes) > 0

        max_confidence = float(result.boxes.conf.max()) if spots else 1.0      #resultado de la confianza mas alta entre las detecciones, si no hay detecciones se asigna 1.0, lo que significa el 100% de confianza en que el aguacate está sano

        return {
            "quality": "Affected" if spots else "Healthy",
            "confidence": round(max_confidence  , 2),
            "spots_count": len(result.boxes),
            "detections": [
                {
                    "class": result.names[int(box.cls[0])],
                    "conf": float(box.conf[0])
                } for box in result.boxes
            ]
        }

        