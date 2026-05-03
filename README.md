# Avocado Quality AI🥑
# 🥑 AgroData Valle: Inteligencia Artificial para el Agro
API to analyze avocado quality from images using AI.
######

Proyecto académico de desarrollo de software.

# Descripción
API desarrollada en Python con FastAPI que permite analizar la calidad de frutas,
inicialmente enfocada en aguacates, a partir de imágenes usando técnicas de
inteligencia artificial.

AgroData Valle es una plataforma integral diseñada para empoderar a los pequeños y medianos productores de aguacate en el Valle del Cauca. Mediante el uso de Visión Artificial (YOLOv8), la aplicación permite clasificar la calidad del fruto, detección de roña, de manera objetiva, eliminando la subjetividad en los procesos de compra y venta.

# Descripción del Problema
Los agricultores locales enfrentan pérdidas económicas debido a criterios de calidad subjetivos por parte de intermediarios. AgroData Valle actúa como un auditor imparcial que:
1. Analiza imágenes en tiempo real.
2. Identifica niveles de afectación por roña.
3. Genera reportes de evidencia para negociaciones justas.

# Objetivo
Clasificar la calidad de la fruta (Alta, Media, Baja) basándose en características
visuales comparadas con criterios de calidad.

# Estado del proyecto
Sprint 0 – Configuración inicial y definición del MVP.
Sprint 1 - Construir un MVP funcional donde un agricultor pueda crear una cuenta, subir la foto de su aguacate desde el celular o computador y recibir un diagnóstico de calidad con un precio sugerido calculado automáticamente.

## Tecnologías previstas
- Backend: Python 3.12, FastAPI, Uvicorn.
- Frontend: React.js, Tailwind CSS.
- IA/ML: YOLOv8 (Ultralytics), OpenCV.
- Entorno: WSL 2 (Ubuntu 22.04).
- Gestión: Jira, Confluence

# Estructura del proyecto
avocado-quality-ai/
├── .github/
│   └── ISSUE_TEMPLATE.md
├── app/                          # Backend (FastAPI)
│   ├── api/
│   │   └── v1/
│   │       ├── router.py
│   │       └── routes/
│   │           ├── analysis.py
│   │           ├── health.py
│   │           └── users.py
│   ├── core/
│   │   ├── config.py
│   │   └── database.py
│   ├── models/
│   │   ├── avocado_analysis.py
│   │   ├── price_estimation.py
│   │   └── user.py
│   ├── repositories/
│   │   ├── analysis_repository.py
│   │   └── user_repository.py
│   ├── schemas/
│   │   ├── analysis.py
│   │   ├── price.py
│   │   └── user.py
│   ├── services/
│   │   ├── analysis_service.py
│   │   ├── image_processing.py
│   │   ├── predictor_service.py
│   │   ├── price_service.py
│   │   └── user_service.py
│   └── main.py
├── data/
│   ├── processed/
│   ├── raw/
│   ├── sample/
│   └── trained_models/
│       ├── avocado_ripeness.pt
│       └── best_v2.pt
├── docs/
│   ├── colab-training-guide.md
│   └── mvp-definition.md
├── frontend/                     # Frontend (React + Vite + JaveScript)
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── ui/           # Componentes shadcn/ui
│   │   │   │   ├── Logo.jsx
│   │   │   │   └── ThemeToggle.jsx
│   │   │   ├── contexts/
│   │   │   │   └── ThemeContext.jsx
│   │   │   ├── pages/
│   │   │   │   ├── DashboardPage.jsx
│   │   │   │   ├── HelpPage.jsx
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   ├── MarketplacePage.jsx
│   │   │   │   ├── ProfilePage.jsx
│   │   │   │   └── Root.jsx
│   │   │   ├── App.jsx / App.tsx
│   │   │   └── routes.js
│   │   ├── assets/               # Imágenes y recursos
│   │   ├── imports/              # Componentes importados (Figma/diseño)
│   │   │   ├── AiDiagnosisDashboard.tsx
│   │   │   ├── AvocadoMarketplaceGallery.tsx
│   │   │   ├── FarmerProfileAndManagement.tsx
│   │   │   └── LoginAndRegistrationPage.tsx
│   │   ├── styles/
│   │   │   ├── fonts.css
│   │   │   ├── index.css
│   │   │   ├── tailwind.css
│   │   │   └── theme.css
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
├── notebooks/                    # Jupyter Notebooks (entrenamiento)
│   ├── v_2 cnn_avocado_damage.ipynb
│   └── avocado_ripeness.ipynb
├── tests/
│   ├── test_analysis.py
│   └── test_model.py
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── requirements-colab.txt
└── yolov8n.pt                    # Modelo YOLOv8 base

•  Backend: FastAPI con arquitectura en capas (routes → services → repositories → models)
•  Frontend: React + JavaScript + Vite + Tailwind CSS + shadcn/ui
•  ML: YOLOv8 para detección/clasificación de aguacates, con modelos entrenados en data/trained_models/
•  Notebooks: Entrenamiento en Google Colab y pruebas locales