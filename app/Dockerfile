# Usa una imagen de Python
FROM python:3.12-slim

# Dependencias para OpenCV y YOLO
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copiamos los requerimientos y el código
COPY requirements.txt . 
RUN pip install --no-cache-dir -r requirements.txt

# Copiamos el contenido de la carpeta app y el modelo .pt
COPY . .
#Copiamos la carpeta data completa con los modelos cargados
#COPY ../data/ ./data/

EXPOSE 8000

CMD ["uvicorn", "app:main:app", "--host", "0.0.0.0", "--port", "8000"]
