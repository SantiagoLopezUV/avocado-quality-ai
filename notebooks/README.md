# Arquitectura y Flujo de Trabajo: Módulo de Inteligencia Artificial (CNN)(YOLOv8)

Este documento describe la estructura, el propósito y el flujo de trabajo del módulo de Inteligencia Artificial implementado para el proyecto AgroData Valle.

## 1. Estructura de Carpetas

La arquitectura del proyecto está diseñada para separar el entorno de experimentación y entrenamiento basado en la nube del entorno de producción y despliegue servidor local con FastAPI. Utilizando programación orientada a objetos.

 notebooks/: Entorno de experimentación. Contiene los archivos .ipynb (Google Colab) utilizados para el preprocesamiento de datos, el entrenamiento de la red neuronal convolucional (CNN) y la evaluación de métricas. Esta red es un modelo de detección de objetos YOLOv8 el cual es mas fuerte y ocupa menmos recursos computacionales y ofrece mejoras en la velocidad.

 data/raw/: Directorio local temporal para el almacenamiento de conjuntos de datos en su estado original. Este directorio está ignorado por Git, conservando únicamente un .gitkeep, para evitar la carga accidental de grandes imágenes al repositorio.

 data/sample/: Directorio destinado a almacenar un conjunto pequeño de imágenes de prueba. Este directorio sí se versiona en Git y permite al backend realizar pruebas de los endpoints de la API sin requerir la descarga del dataset completo.

 data/trained_models/: Directorio destinado a almacenar los modelos finales exportados tras el entrenamiento ,archivos en formato .pt Está ignorado por Git mediante un archivo .gitkeep.

 app/services/: Capa de integración. Contiene los scripts, como image_processing.py y predictor_service.py encargados de pre-procesar las peticiones y conectar el modelo entrenado con el backend de FastAPI.

## 2. Flujo de Trabajo (De Entrenamiento a Producción)

1. Entrenamiento: El modelado se realiza en Google Colab, importando el dataset desde Roboflow. Se utiliza la arquitectura YOLOv8n (Ultralytics) aprovechando los recursos de procesamiento GPU de la plataforma.

2. Exportación: Una vez que el modelo alcanza las métricas de rendimiento esperadas, se exporta la red neuronal entrenada y sus pesos en formato .pt

3. Despliegue Local: El archivo resultante se descarga y se ubica de forma local en el directorio data/trained_models/ del repositorio.

4. Predicción: Al inicializar FastAPI, la clase `PredictorService` carga el modelo `.pt` en memoria una sola vez, habilitando al sistema para procesar imágenes, dibujar *bounding boxes* que son las cajas delimitadoras o poligonos y clasificar el nivel de afectación, roña, a través de la API.

## 3. Políticas de Control de Versiones 

Para mantener la estabilidad del repositorio, se deben seguir las siguientes instrucciones:

 No realizar commits de imágenes masivas o datasets ubicados en el directorio data/raw/.
 No realizar commits de los archivos binarios de los modelos(extensiones .pt, .onnx`, etc.).
 Cualquier nueva dependencia técnica requerida para el entorno de experimentación en Colab debe ser documentada de manera explícita en el archivo requirements-colab.txt ubicado en la raíz del proyecto.

##Las dependencias del servidor local (FastAPI, Ultralytics, etc.) deben mantenerse actualizadas en el archivo "requirements.txt".