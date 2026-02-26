"""
Tests para los servicios de procesamiento de imágenes y predicción.
"""
import pytest
import numpy as np
from PIL import Image
import io
import sys
from pathlib import Path

# Agregar el directorio raíz al path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.services.image_processing import ImageProcessor
from app.services.predictor_service import AvocadoQualityPredictor


class TestImageProcessor:
    """Tests para el procesador de imágenes."""
    
    @pytest.fixture
    def processor(self):
        """Fixture que retorna un procesador de imágenes."""
        return ImageProcessor(target_size=(224, 224))
    
    @pytest.fixture
    def sample_image(self):
        """Fixture que crea una imagen de prueba."""
        # Crear imagen RGB de prueba
        img = Image.new('RGB', (300, 300), color='green')
        return img
    
    @pytest.fixture
    def sample_image_bytes(self, sample_image):
        """Fixture que retorna una imagen en bytes."""
        img_bytes = io.BytesIO()
        sample_image.save(img_bytes, format='PNG')
        return img_bytes.getvalue()
    
    def test_preprocess_image_from_bytes(self, processor, sample_image_bytes):
        """Test de preprocesamiento desde bytes."""
        result = processor.preprocess_image(sample_image_bytes)
        
        assert isinstance(result, np.ndarray)
        assert result.shape == (1, 224, 224, 3)
        assert result.dtype == np.float32
        assert result.min() >= 0.0 and result.max() <= 1.0
    
    def test_preprocess_image_from_pil(self, processor, sample_image):
        """Test de preprocesamiento desde PIL Image."""
        result = processor.preprocess_image(sample_image)
        
        assert isinstance(result, np.ndarray)
        assert result.shape == (1, 224, 224, 3)
        assert result.dtype == np.float32
    
    def test_preprocess_grayscale_image(self, processor):
        """Test de conversión de imagen en escala de grises a RGB."""
        gray_img = Image.new('L', (300, 300), color=128)
        result = processor.preprocess_image(gray_img)
        
        assert result.shape == (1, 224, 224, 3)
    
    def test_preprocess_batch(self, processor, sample_image):
        """Test de preprocesamiento de lote de imágenes."""
        images = [sample_image, sample_image, sample_image]
        result = processor.preprocess_batch(images)
        
        assert isinstance(result, np.ndarray)
        assert result.shape == (3, 224, 224, 3)
    
    def test_validate_valid_image(self, processor, sample_image_bytes):
        """Test de validación de imagen válida."""
        assert processor.validate_image(sample_image_bytes) is True
    
    def test_validate_invalid_image(self, processor):
        """Test de validación de imagen inválida."""
        invalid_data = b"esto no es una imagen"
        assert processor.validate_image(invalid_data) is False
    
    def test_normalization_range(self, processor, sample_image):
        """Test de que la normalización está en el rango correcto."""
        result = processor.preprocess_image(sample_image)
        
        assert np.all(result >= 0.0)
        assert np.all(result <= 1.0)


class TestAvocadoQualityPredictor:
    """Tests para el predictor de calidad."""
    
    @pytest.fixture
    def predictor(self):
        """Fixture que retorna un predictor."""
        return AvocadoQualityPredictor()
    
    @pytest.fixture
    def sample_processed_image(self):
        """Fixture que retorna una imagen procesada de prueba."""
        return np.random.rand(1, 224, 224, 3).astype('float32')
    
    def test_predictor_initialization(self, predictor):
        """Test de inicialización del predictor."""
        assert predictor is not None
        assert predictor.model_loaded is False
        assert predictor.QUALITY_CLASSES == {0: "Baja", 1: "Media", 2: "Alta"}
    
    def test_get_model_info_not_loaded(self, predictor):
        """Test de obtener info cuando el modelo no está cargado."""
        info = predictor.get_model_info()
        
        assert info['loaded'] is False
        assert 'path' in info
        assert 'exists' in info
    
    def test_predict_without_model(self, predictor, sample_processed_image):
        """Test de predicción cuando no hay modelo disponible."""
        result = predictor.predict(sample_processed_image)
        
        assert 'quality' in result
        assert 'confidence' in result
        # Sin modelo, debe retornar error o valores por defecto
        assert result['quality'] in ['Desconocida', 'Error'] or 'error' in result
    
    def test_quality_classes_mapping(self, predictor):
        """Test de que el mapeo de clases es correcto."""
        assert len(predictor.QUALITY_CLASSES) == 3
        assert all(isinstance(k, int) for k in predictor.QUALITY_CLASSES.keys())
        assert all(isinstance(v, str) for v in predictor.QUALITY_CLASSES.values())
    
    def test_default_model_path(self, predictor):
        """Test de que la ruta por defecto del modelo es correcta."""
        assert 'avocado_classifier.h5' in predictor.model_path
        assert 'data/models' in predictor.model_path


class TestIntegration:
    """Tests de integración entre componentes."""
    
    @pytest.fixture
    def processor(self):
        return ImageProcessor()
    
    @pytest.fixture
    def predictor(self):
        return AvocadoQualityPredictor()
    
    @pytest.fixture
    def sample_image(self):
        return Image.new('RGB', (300, 300), color='green')
    
    def test_full_pipeline(self, processor, predictor, sample_image):
        """Test del pipeline completo: imagen -> procesamiento -> predicción."""
        # Procesar imagen
        processed = processor.preprocess_image(sample_image)
        
        assert processed.shape == (1, 224, 224, 3)
        
        # Intentar predicción (puede fallar si no hay modelo, pero no debe crashear)
        result = predictor.predict(processed)
        
        assert isinstance(result, dict)
        assert 'quality' in result
        assert 'confidence' in result


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
