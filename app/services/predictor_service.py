from app.services.image_processing import ImageProcessor
from ultralytics import YOLO
import os 


class PredictorService:
    def __init__(self, damage_model_name: str = "best_v2.pt", ripeness_model_name: str = "avocado_ripeness.pt"):

        #Cargar el modelo entrenado, desde la carpeta data
        self.model_path = os.path.join("data", "trained_models")
        #cargar modelos unificados de daño y madurez
        self.model_damage = self.laod_model(damage_model_name)
        self.model_ripeness = self.laod_model(ripeness_model_name)

    def laod_model(self, model_name: str):
        path = os.path.join(self.model_path, model_name)
        if os.path.exists(path):
            try:
                model = YOLO(path)
                print(f"Modelo cargado desde {path}")
                return model
            except Exception as e:
                print(f"Error al cargar el modelo: {e}")
                return YOLO("yolov8n.pt")  # Cargar un modelo preentrenado como fallback
        else:
            print(f"Modelo no encontrado en {self.model_path}")
            return YOLO("yolov8n.pt")  # por si no carga el modelo personalizado, se carga un modelo preentrenado como fallback

    def predict_image(self, image_path: str):
            # Realizar la predicción en la imagen dada
            #conf = 0.5 asegura que solo se consideren predicciones con una confianza del 50% o más
        try:
            
            #Se cargan los modelos

            #modelo de roña se carga el modelo de daños para detectar manchas o daños en el aguacate, se realiza la predicción con el método predict del modelo, se pasa la ruta de la imagen y el umbral de confianza, se obtiene el resultado de la predicción y se verifica si hay manchas o daños detectados contando el número de cajas detectadas en el resultado
            results_damage = self.model_damage.predict(source=image_path, conf = 0.5)
            res_d = results_damage[0]
            #tiene manchas si el número de cajas detectadas es mayor a 0
            spots = len(res_d.boxes) > 0

            #modelo de madurez
            results_ripeness = self.model_ripeness.predict(source=image_path, conf = 0.5)
            res_r = results_ripeness[0]

            ripeness_category = "Unknown"
            ripeness_confidence = 0.0
            if len(res_r.boxes) > 0:
                top_box = res_r.boxes[0]  # Obtener la caja con la mayor confianza
                ripeness_category = res_r.names[int(res_r.boxes[0].cls[0].item())]
                ripeness_confidence = round(float(res_r.boxes[0].conf[0].item()) * 100, 2)


            # max_confidence = float(result.boxes.conf.max()) if spots else 1.0      #resultado de la confianza mas alta entre las detecciones, si no hay detecciones se asigna 1.0, lo que significa el 100% de confianza en que el aguacate está sano

            detections = [] #daños detectados, con su clase y confianza, se itera sobre las cajas detectadas en el resultado y se extrae la clase y la confianza de cada una, se devuelve una lista de diccionarios con esta información para cada daño detectado
            for box in res_d.boxes:  #mostrar el resultado de la roña
                detections.append({
                    "class": res_d.names[int(box.cls[0].item())],
                    "conf": round(float(box.conf[0].item()) * 100, 2)
                })
            
            #Dibujar las cajas sobre la imagen original
            plotted_image = res_d.plot()
            base64_image = ImageProcessor.encode_image_to_base64(plotted_image)


            return {
                "analysis_report": {
                    "health":{
                        "status": "Affected" if spots else "Healthy",
                        "spots_count": len(res_d.boxes),
                        "detections": detections
                    },
                    "ripeness": {
                        "level": ripeness_category,
                        "confidence": ripeness_confidence
                    },
                    "market_suggestion": self._get_market_suggestion(spots, ripeness_category),
                    "image_base64": base64_image
                }
            }
        except Exception as e:
            print(f"Error durante la predicción: {e}")
            import traceback
            traceback.print_exc() 
            raise e


    def _get_market_suggestion(self, has_spots, maturity):
    # Calidad de exportación: Sano y aún Verde
        if not has_spots and maturity == "Underripe":
            return "Calidad Exportación (Viaje largo)"
        
        # Consumo inmediato: Maduro (aunque tenga manchas leves, sirve para guacamole)
        if maturity == "Ripe":
            return "Mercado Nacional / Procesamiento (Guacamole)"
        
        # Desecho: Si ya se pasó
        if maturity == "Overripe":
            return "Rechazo / Desecho"
            
        # Default: Si es "Ripening" o "Unknown", va para venta local
        return "Mercado Nacional (Venta local)" 