#  *Avocado Quality AI🥑*
API to analyze avocado quality from images using AI.
# 🥑 AgroData Valle: Inteligencia Artificial para el Agro

Proyecto académico de desarrollo de software.
AgroData Valle es una plataforma integral diseñada para empoderar a los pequeños y medianos productores de aguacate en el Valle del Cauca. Mediante el uso de Visión Artificial (YOLOv8), la aplicación permite clasificar la calidad del fruto,detección de roña de manera objetiva, eliminando la subjetividad en los procesos de compra y venta.

## Descripción
API desarrollada en Python con FastAPI que permite analizar la calidad de frutas, inicialmente enfocada en aguacates, a partir de imágenes usando técnicas de inteligencia artificial.

Los agricultores locales enfrentan pérdidas económicas debido a criterios de calidad subjetivos por parte de intermediarios. AgroData Valle actúa como un auditor imparcial que:
1. Analiza imágenes en tiempo real.
2. Identifica niveles de afectación por roña.
3. Genera reportes de evidencia para negociaciones justas.

# *Objetivo*
Establecer la viabilidad del proyecto mediante la identificación del usuario y el prototipado de la solución Web App + YOLOv8

## Estado del proyecto
Sprint 0 – Configuración inicial y definición del MVP.
Sprint 1 - Desarrollo de la arquitectura base del proyecto: implementación del sistema de autenticación (Login/Registro), integración de la base de datos PostgreSQL, y contenerización completa (Frontend, Backend, DB) mediante Docker

# Estructura del Proyecto
```
avocado-quality-ai/
├── .env
├── .github/
│   └── ISSUE_TEMPLATE.md
├── .gitignore
├── .vscode/
│   └── settings.json
│
├── app/                          # Backend (FastAPI)
│   ├── main.py
│   ├── Dockerfile
│   ├── api/v1/
│   │   ├── router.py
│   │   └── routes/
│   │       ├── analysis.py
│   │       ├── auth.py
│   │       ├── health.py
│   │       └── users.py
│   ├── core/
│   │   ├── config.py
│   │   └── database.py
│   ├── database/
│   │   └── session.py
│   ├── models/
│   │   ├── avocado_analysis.py
│   │   ├── password_reset_token.py
│   │   ├── price_estimation.py
│   │   └── user.py
│   ├── repositories/
│   │   ├── analysis_repository.py
│   │   ├── password_reset_repository.py
│   │   └── user_repository.py
│   ├── schemas/
│   │   ├── analysis.py
│   │   ├── password_reset.py
│   │   ├── price.py
│   │   └── user.py
│   └── services/
│       ├── analysis_service.py
│       ├── image_processing.py
│       ├── password_reset_service.py
│       ├── predictor_service.py
│       ├── price_service.py
│       └── user_service.py
│
├── data/
│   ├── processed/                     
│   ├── raw/
│   ├── sample/
│   └── trained_models/
│       ├── avocado_ripeness.pt
│       └── best_v2.pt
│
├── docs/
│   ├── colab-training-guide.md
│   └── mvp-definition.md
│
├── frontend/                       # Frontend (React/Vite/JavaScript)
│   ├── Dockerfile
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── src/
│   │   ├── main.tsx
│   │   ├── app/
│   │   │   ├── App.tsx / App.jsx
│   │   │   ├── routes.js
│   │   │   ├── components/
│   │   │   │   ├── Logo.jsx
│   │   │   │   ├── ThemeToggle.jsx
│   │   │   │   ├── figma/
│   │   │   │   └── ui/           (shadcn/ui components)
│   │   │   ├── contexts/
│   │   │   │   ├── AuthContext.jsx
│   │   │   │   └── ThemeContext.jsx
│   │   │   ├── pages/
│   │   │   │   ├── DashboardPage.jsx
│   │   │   │   ├── HelpPage.jsx
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   ├── MarketplacePage.jsx
│   │   │   │   ├── ProfilePage.jsx
│   │   │   │   └── Root.jsx
│   │   │   └── services/
│   │   │       └── api.js
│   │   ├── assets/
│   │   ├── imports/              (Figma-imported components)
│   │   └── styles/
│   └── guidelines/
│
├── notebooks/
│   ├── avocado_ripeness.ipynb
│   └── v_2 cnn_avocado_damage.ipynb
│
├── tests/
│   ├── test_analysis.py
│   └── test_model.py
│
├── docker-compose.yml
├── requirements.txt
├── requirements-colab.txt
└── README.md
```

Resumen de la estructura:
• Backend: Python/FastAPI con una arquitectura por capas (routes → services → repositories → models)
• Frontend: React, JavaScript, con componentes shadcn/ui y Tailwind CSS
• ML: Dos modelos PyTorch entrenados (aguacate ripeness.pt, best v2.pt) con cuadernos de entrenamiento
• Infraestructura: Docker componer ambos servicios


## *Tecnologías previstas*
# Backend
- Python
- FastAPI
- Uvicorn

# Frontend
- React.js
- Tailwind CSS
- Figma

# IA/ML
- YOLOv8 (Ultralytics)
- OpenCV

# Entorno
- WSL 2 (Ubuntu 22.04).
- Docker Desktop

# Gestión 
- Jira
- Confluence

# Instalación y Configuración
Requisitos Previos:
- Python 3.12+
- Node.js (v20+)


# http://localhost:8000/docs correr la app inicialmente


# CONTENERIZACIÓN DEL PROYECTO

*¿Qué problema soluciona Docker?*

Docker soluciona el problema de "en mi máquina sí funciona". Docker empaqueta el código junto con todas sus dependencias, configuraciones y el sistema operativo base en un contenedor estándar, garantizando que el software se ejecute exactamente igual en cualquier entorno

# ¿Qué ventajas aporta frente a instalar dependencias manualmente?

1. Aislamiento: Las dependencias del proyecto no interfieren con las del sistema operativo anfitrión ni con las de otros proyectos.
2. Portabilidad: Un contenedor de Docker puede ejecutarse en Windows, macOS o Linux sin modificar el código.
3. Rapidez de despliegue: Levantar el entorno completo (Base de datos + API) toma segundos usando comandos predefinidos
4. Facilidad de limpieza: Si el entorno se daña, basta con borrar el contenedor y volverlo a crear desde la imagen, dejándolo como nuevo.


*Comandos utilizados*
# Creación de las imágenes y ejecución de contenedores

# Archivo Dockerfile
Para este proyecto (Backend con FastAPI), utilizamos un Dockerfileque define el entorno necesario para ejecutar nuestra aplicación.

#### Estructura de la imagen para el backend + IA: ####
Dockerfile
# Usa una imagen oficial de Python como base
FROM python:3.12-slim

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de requerimientos e instala las dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto que usará FastAPI
EXPOSE 8000

# Comando para ejecutar la aplicación
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

### Estructura para imagen de Frontend ####
# Usa una imagen de Node.js
FROM node:20-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración de dependencias
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código fuente
COPY . .

# Expone el puerto
EXPOSE 5173

# Comando para levantar el servidor de desarrollo exponiéndolo a la red de Docker
CMD ["npm", "run", "dev", "--", "--host"]


*Imagen para base de datos:*

Para la base de datos no necesitamos un Dockerfile personalizado. En su lugar, utilizamos la imagen oficial de PostgreSQL (versión 17) directamente en el archivo docker-compose.yml

# Ejecución de los contenedores

# Gestión de contenedores
- docker compose up -d --build -> --build fuerza la recreación de la imagen leyendo el Dockerfile, y -d (detached) ejecuta los contenedores en segundo plano dejando la terminal libre
- docker compose down -> Detener y eliminar los contenedores

# Monitoreo
- docker images ->Muestra un listado de todas las imágenes base y construidas que están almacenadas localmente, junto con su peso y etiquetas
- docker ps -> Lista todos los contenedores activos, mostrando sus nombres (ej. agrodata-api, agrodata-db) y los puertos mapeados.
- docker logs -f agrodata-api -> Permite ver los mensajes de la aplicación, como la carga de modelos y las peticiones HTTP
- docker logs -f agrodata-web -> Muestra los registros del servidor del frontend, útil para confirmar que la web compiló sin errores y está escuchando en el puerto 5173

# Verificación y gestión de la base de datos
Para confirmar que las migraciones se ejecutaron correctamente y que nuestra base de datos PostgreSQL estaba recibiendo la información:

# Verificación por Consola
Utilizamos comandos interactivos de Docker para entrar directamente al contenedor de la base de datos y ejecutar consultas SQL:

Entrar al cliente de PostgreSQL dentro del contenedor:
- docker exec -it agrodata-db psql -U usuario -d nombre_base_de_datos
- \dt -> Lista todas las tablas creadas en la base de datos, para verificar que la tabla users u otras existan.
- SELECT * FROM users; -> Ejecuta una consulta SQL para confirmar que los datos enviados desde el frontend se guardaron exitosamente.
- \q -> Sale de la consola de PostgreSQL y regresa a la terminal local.


## Creación del archivo `.dockerignore`

Para garantizar que nuestras imágenes de Docker se construyan de manera rápida y segura y ligera, implementamos archivos `.dockerignore` en la raíz de nuestros servicios, tanto en el backend como en el frontend. 

*¿Qué problema soluciona?*
Al ejecutar el comando `COPY . .` dentro del `Dockerfile`, Docker intenta copiar absolutamente todo el directorio de trabajo local hacia el contenedor. Sin `.dockerignore`, se copiarían archivos innecesarios.

*Ventajas de utilizarlo:*
1. **Optimización de tamaño y tiempo:** Evita copiar carpetas pesadas que se instalarán desde cero dentro del contenedor, como `node_modules` en el frontend o el entorno virtual `venv` en el backend. Esto hace que la construcción de la imagen sea mucho más rápida.
2. **Seguridad:** Evita que archivos con credenciales locales o configuraciones secretas, como el archivo `.env` se queden dentro de la imagen pública.
3. **Prevención de conflictos:** Evita copiar archivos cacheados del sistema operativo local como `__pycache__` en Python, que podrían causar incompatibilidades en el entorno Linux del contenedor.


