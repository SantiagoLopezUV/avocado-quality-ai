from app.services.image_processing import ImageProcessor
from ultralytics import YOLO
import os 


class PredictorService:
    def __init__(self, damage_model_name: str = "best_v2.pt", ripeness_model_name: str = "avocado_ripeness_v2.pt"):

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


    # def load_model(self, model_name: str):# Alias para compatibilidad con código existente, para no romper lo creado
    #     return self.load_model(model_name)

    def predict_image(self, image_path: str):
            # Realizar la predicción en la imagen dada
            #conf = 0.5 asegura que solo se consideren predicciones con una confianza del 50% o más
        try:
            
            #Se cargan los modelos

            #modelo de roña 
            # se carga el modelo de daños para detectar manchas o daños en el aguacate, se realiza la predicción con el método predict del modelo, se pasa la ruta de la imagen y el umbral de confianza, se obtiene el resultado de la predicción y se verifica si hay manchas o daños detectados contando el número de cajas detectadas en el resultado
            results_damage = self.model_damage.predict(source=image_path, conf = 0.5)
            res_d = results_damage[0]

            #modelo de madurez
            results_ripeness = self.model_ripeness.predict(source=image_path, conf = 0.5)
            res_r = results_ripeness[0]

            print(f"Debug | daño boxes    : {len(res_d.boxes)}")
            print(f"Debug | madurez boxes : {len(res_r.boxes)}")

            if len(res_r.boxes) > 0:
                for i, box in enumerate(res_r.boxes):
                    clase = res_r.names[int(box.cls[0].item())]
                    conf  = round(float(box.conf[0].item()) * 100, 2)
                    print(f"Debug | madurez box[{i}]: clase={clase} conf={conf}%")

            no_detections = len(res_d.boxes) == 0
            minimum_threshold = 0.60 #Umbral minimo de detección

            low_confidence = (
                len(res_r.boxes) > 0 and float(res_r.boxes[0].conf[0].item()) < minimum_threshold
            )

            #Si detecta algo pero con una confianza por debajo del umbral, se puede decir que es otra fruta o no es un aguacate, o que el modelo no está seguro de la madurez, por lo que se considera como no detectado para evitar falsos positivos

            if no_detections or low_confidence:
                cause = "Sin detecciones" if no_detections else f"Baja confianza en detección de madurez({float(res_r.boxes[0].conf[0].item())*100:.1f}%)"
                return {"avocado_detected": False, "cause": cause}


            if len(res_r.boxes) == 0:
                cause = "Modelo de madurez no detectó ningún objeto en la imagen"
                print(f"Debug | imagen rechazada — {cause}")
                return {"avocado_detected": False , "cause": cause}
            #En este punto, es un aguacate valido
            #tiene manchas si el número de cajas detectadas es mayor a 0
            spots = len(res_d.boxes) > 0

            # max_confidence = float(result.boxes.conf.max()) if spots else 1.0      #resultado de la confianza mas alta entre las detecciones, si no hay detecciones se asigna 1.0, lo que significa el 100% de confianza en que el aguacate está sano

            detections = [] #daños detectados, con su clase y confianza, se itera sobre las cajas detectadas en el resultado y se extrae la clase y la confianza de cada una, se devuelve una lista de diccionarios con esta información para cada daño detectado
            damage_confidences = [] #confianzas de los daños detectados, se extrae la confianza de cada caja detectada y se almacena en una lista para calcular el promedio de confianza de los daños detectados

            for box in res_d.boxes:  #mostrar el resultado de la roña
                conf_value = round(float(box.conf[0].item()) * 100, 2) #calcula la confianza de la detección actual, se multiplica por 100 para convertirla a porcentaje y se redondea a 2 decimales
                detections.append({
                    "class": res_d.names[int(box.cls[0].item())],
                    "conf": conf_value
                })
                damage_confidences.append(conf_value) #se agrega la confianza de la detección actual a la lista de confianzas de daños detectados

            if damage_confidences:
                damage_avg_conf = round(sum(damage_confidences) / len(damage_confidences), 2) #calcula el promedio de confianza de los daños detectados, se suma todas las confianzas y se divide entre el número de detecciones para obtener el promedio, se redondea a 2 decimales
            else:
                damage_avg_conf = 100.0  # Si no hay detecciones, se asigna una confianza del 100% en que el aguacate está sano, ya que el modelo no detectó ningún daño

            #Obtener categoría y confianza de madurez 
            ripeness_category = "Unknown"
            ripeness_confidence = 0.0

            if len(res_r.boxes) > 0:
                top_box = res_r.boxes[0]  # Obtener la caja con la mayor confianza
                ripeness_category = res_r.names[int(top_box.cls[0].item())]
                ripeness_confidence = round(float(top_box.conf[0].item()) * 100, 2)

            #Dibujar las cajas sobre la imagen original
            plotted_image = res_d.plot()
            base64_image = ImageProcessor.encode_image_to_base64(plotted_image)


            return {
                "avocado_detected": True, #si se detecta un aguacate válido en la imagen, se devuelve True junto con el reporte de análisis, si no se detecta un aguacate válido, se devuelve False con una causa para que el endpoint pueda manejarlo adecuadamente
                "analysis_report": {
                    "health":{
                        "status": "Affected" if spots else "Healthy",
                        "spots_count": len(res_d.boxes),
                        "detections": detections,
                        "damage_confidence": damage_avg_conf, 
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
    
