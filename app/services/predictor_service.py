"""
Servicio de predicción para clasificar la calidad de aguacates.
"""
import os
import numpy as np
from pathlib import Path
from typing import Dict, List, Tuple
import logging

logger = logging.getLogger(__name__)


class AvocadoQualityPredictor:
    """Predictor de calidad de aguacates usando modelo CNN."""
    
    # Mapeo de clases
    QUALITY_CLASSES = {
        0: "Baja",
        1: "Media",
        2: "Alta"
    }
    
    def __init__(self, model_path: str = None):
        """
        Inicializa el predictor.
        
        Args:
            model_path: Ruta al archivo .h5 del modelo entrenado
        """
        self.model = None
        self.model_path = model_path or self._get_default_model_path()
        self.model_loaded = False
        
    def _get_default_model_path(self) -> str:
        """Obtiene la ruta por defecto del modelo."""
        base_dir = Path(__file__).resolve().parent.parent.parent
        return str(base_dir / "data" / "models" / "avocado_classifier.h5")
    
    def load_model(self) -> bool:
        """
        Carga el modelo desde el archivo .h5
        
        Returns:
            True si el modelo se cargó correctamente
        """
        try:
            # Importación lazy para evitar cargar TensorFlow si no se usa
            import tensorflow as tf
            
            if not os.path.exists(self.model_path):
                logger.warning(f"Modelo no encontrado en: {self.model_path}")
                return False
            
            self.model = tf.keras.models.load_model(self.model_path)
            self.model_loaded = True
            logger.info(f"Modelo cargado exitosamente desde: {self.model_path}")
            return True
            
        except Exception as e:
            logger.error(f"Error al cargar el modelo: {str(e)}")
            return False
    
    def predict(self, processed_image: np.ndarray) -> Dict[str, any]:
        """
        Realiza la predicción de calidad para una imagen preprocesada.
        
        Args:
            processed_image: Imagen preprocesada (numpy array)
            
        Returns:
            Diccionario con predicción y confianza
        """
        if not self.model_loaded:
            if not self.load_model():
                return {
                    "error": "Modelo no disponible",
                    "quality": "Desconocida",
                    "confidence": 0.0
                }
        
        try:
            # Realizar predicción
            predictions = self.model.predict(processed_image, verbose=0)
            
            # Obtener clase con mayor probabilidad
            predicted_class = int(np.argmax(predictions[0]))
            confidence = float(predictions[0][predicted_class])
            
            # Obtener todas las probabilidades
            probabilities = {
                self.QUALITY_CLASSES[i]: float(predictions[0][i])
                for i in range(len(self.QUALITY_CLASSES))
            }
            
            return {
                "quality": self.QUALITY_CLASSES[predicted_class],
                "confidence": confidence,
                "probabilities": probabilities
            }
            
        except Exception as e:
            logger.error(f"Error durante la predicción: {str(e)}")
            return {
                "error": str(e),
                "quality": "Error",
                "confidence": 0.0
            }
    
    def predict_batch(self, processed_images: np.ndarray) -> List[Dict[str, any]]:
        """
        Realiza predicciones para múltiples imágenes.
        
        Args:
            processed_images: Lote de imágenes preprocesadas
            
        Returns:
            Lista de predicciones
        """
        if not self.model_loaded:
            if not self.load_model():
                return [{"error": "Modelo no disponible"}] * len(processed_images)
        
        try:
            predictions = self.model.predict(processed_images, verbose=0)
            results = []
            
            for pred in predictions:
                predicted_class = int(np.argmax(pred))
                confidence = float(pred[predicted_class])
                
                probabilities = {
                    self.QUALITY_CLASSES[i]: float(pred[i])
                    for i in range(len(self.QUALITY_CLASSES))
                }
                
                results.append({
                    "quality": self.QUALITY_CLASSES[predicted_class],
                    "confidence": confidence,
                    "probabilities": probabilities
                })
            
            return results
            
        except Exception as e:
            logger.error(f"Error durante predicción batch: {str(e)}")
            return [{"error": str(e)}] * len(processed_images)
    
    def get_model_info(self) -> Dict[str, any]:
        """
        Obtiene información sobre el modelo cargado.
        
        Returns:
            Diccionario con información del modelo
        """
        if not self.model_loaded:
            return {
                "loaded": False,
                "path": self.model_path,
                "exists": os.path.exists(self.model_path)
            }
        
        return {
            "loaded": True,
            "path": self.model_path,
            "input_shape": self.model.input_shape,
            "output_shape": self.model.output_shape,
            "classes": self.QUALITY_CLASSES
        }
