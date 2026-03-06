import base64
import cv2
import numpy as np

class ImageProcessor: # Clase para procesar imágenes, se puede agregar funciones para convertir la imagen a diferentes formatos, redimensionar la imagen, aplicar filtros, etc. Esta clase puede ser utilizada por el predictor para preparar las imágenes antes de hacer las predicciones
    
    @staticmethod
    def encode_image_to_base64(image_array: np.ndarray) -> str:
        # Leer la imagen y convertirla a base64

        # Codificar la imagen a formato JPEG
        success, buffer, image = cv2.imencode('.jpg', image_array)

        if not success:
            raise ValueError("No se pudo codificar la imagen")
        #Se pasan los bytes de la imagen a base64 
        #y se pasa a un string pcon utf-8 para poder enviarlo en el response de la API con el .json
        base64_image = base64.b64encode(buffer)
        base64_string = base64_image.decode('utf-8')

        return base64_string
