## 📁 Estructura del Proyecto
```
avocado-quality-ai/
├── app/
│   ├── api/
│   │   └── v1/
│   │       ├── routes/          # Endpoints HTTP (reciben y responden peticiones)
│   │       │   ├── analysis.py  # Análisis de imágenes
│   │       │   ├── auth.py      # Recuperación de contraseña
│   │       │   ├── health.py    # Estado del servidor
│   │       │   └── users.py     # Registro y login
│   │       └── router.py        # Agrupa todos los routers bajo /api/v1
│   ├── core/
│   │   ├── config.py            # Lee variables de entorno (.env)
│   │   └── database.py          # Conexión a PostgreSQL
|   ├── database/
|   |   └── session.py           # Sesiones Base de datos
│   ├── models/                  # Tablas de la BD (SQLAlchemy)
│   │   ├── avocado_analysis.py
│   │   ├── password_reset_token.py
│   │   ├── price_estimation.py
│   │   └── user.py
│   ├── repositories/            # Operaciones directas con la BD (CRUD)
│   │   ├── analysis_repository.py
│   │   ├── password_reset_repository.py
│   │   └── user_repository.py
│   ├── schemas/                 # Validación de datos de entrada y salida (Pydantic)
│   │   ├── analysis.py
│   │   ├── password_reset.py
│   │   ├── price.py
│   │   └── user.py
│   ├── services/                # Lógica del negocio
│   │   ├── analysis_service.py  # Procesamiento con modelo de IA
│   │   ├── password_reset_service.py
│   │   └── user_service.py      # Encriptación y autenticación
│   └── main.py                  # Punto de entrada, configuración FastAPI
├── data/
│   ├── raw/                     # Imágenes temporales durante análisis
│   ├── processed/               # Imágenes procesadas
│   └── trained_models/          # Modelos de IA entrenados (.pt)
├── frontend/                    # Interfaz React + Vite
├── notebooks/                   # Entrenamiento del modelo (Google Colab)
├── tests/                       # Pruebas automatizadas
├── .env                         # Variables de entorno (NO subir a Git)
├── requirements.txt             # Dependencias Python
└── docker-compose.yml           # Configuración Docker
```

---

## ⚙️ Instalación y Configuración

### Requisitos previos
- Python 3.12+
- PostgreSQL 14+
- Javascript (para el frontend)
- Git

### 1. Clonar el repositorio
```bash
git clone <git@github.com:SantiagoLopezUV/avocado-quality-ai.git>
cd avocado-quality-ai
```

### 2. Crear y activar el entorno virtual
```bash
# Crear
python -m venv venv

# Activar en Windows
.\venv\Scripts\Activate.ps1

# Activar en Mac/Linux
source venv/bin/activate
```

### 3. Instalar dependencias
```bash
pip install -r requirements.txt
```

### 4. Configurar variables de entorno
Crear un archivo `.env` en la raíz del proyecto:
```
DATABASE_URL=postgresql://usuario:password@localhost:5432/avocado-quality-ai
ALLOWED_ORIGINS=["http://localhost:5173"]
```

> ⚠️ Nunca subas el archivo `.env` a Git. Ya está en `.gitignore`.

### 5. Crear la base de datos
En pgAdmin o psql, ejecutar el script SQL en `docs/database.sql`.

### 6. Correr el servidor
```bash
uvicorn app.main:app --reload
```

El servidor queda disponible en:
- API: `http://localhost:8000`
- Documentación interactiva: `http://localhost:8000/docs`

### 7. Correr el frontend (terminal separada)
```bash
cd frontend
npm install
npm run dev
```

Frontend disponible en: `http://localhost:5173`

---

## 🗄️ Base de Datos

### Decisiones de diseño

**UUID como Primary Key** en todas las tablas en lugar de enteros secuenciales. Razón: evita exponer el volumen de registros y es más seguro en APIs públicas.

**Contraseñas con bcrypt** — nunca se guarda la contraseña en texto plano. Se guarda un hash irreversible. El campo `password_hash` en la tabla `users` contiene algo como `$2b$12$...`, nunca la contraseña real.

**Usuarios opcionales en análisis** — la tabla `analyses` permite `user_id` nulo para que usuarios no registrados puedan hacer análisis sin crear cuenta.

**ENUMs para niveles** — `ripeness_level` y `damage_level` usan tipos ENUM de PostgreSQL para evitar valores inconsistentes como `"maduro"`, `"Maduro"`, `"MADURO"` en la misma columna.

**Trazabilidad de modelos** — `analysis_results` referencia `model_versions` para saber qué versión del modelo de IA generó cada resultado.

### Tablas

| Tabla | Descripción |
|---|---|
| `users` | Usuarios registrados del sistema |
| `refresh_tokens` | Tokens de sesión activos |
| `images` | Rutas de imágenes subidas |
| `analyses` | Registro de cada análisis realizado |
| `analysis_results` | Resultados del modelo de IA |
| `model_versions` | Control de versiones del modelo |
| `password_reset_tokens` | Tokens temporales para recuperación de contraseña |

---

## 🔌 Endpoints de la API

Base URL: `http://localhost:8000/api/v1`

### Auth
| Método | Endpoint | Descripción | Body requerido |
|---|---|---|---|
| POST | `/auth/forgot-password` | Solicita token de recuperación | `{ "email": "..." }` |
| POST | `/auth/reset-password` | Cambia contraseña con token | `{ "token": "...", "new_password": "..." }` |

### Users
| Método | Endpoint | Descripción | Body requerido |
|---|---|---|---|
| POST | `/users/register` | Registra un nuevo usuario | `{ "name", "email", "password", "document_number" }` |
| POST | `/users/login` | Inicia sesión | `{ "email", "password" }` |

### Analysis
| Método | Endpoint | Descripción | Body requerido |
|---|---|---|---|
| POST | `/analysis/analyze` | Analiza imagen de aguacate | `file: imagen` |

### Health
| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/health` | Verifica que el servidor esté corriendo |

> Para probar todos los endpoints interactivamente: `http://localhost:8000/docs`

---

## 🔐 Seguridad

- Contraseñas encriptadas con **bcrypt** (nunca texto plano)
- Tokens de recuperación de contraseña expiran en **5 minutos**
- Los tokens se invalidan después de usarse una vez
- El endpoint de recuperación no revela si un email existe o no en el sistema
- Variables de entorno para todas las credenciales

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Backend | Python 3.12 + FastAPI |
| Base de datos | PostgreSQL 14 |
| ORM | SQLAlchemy 2.0 |
| Validación | Pydantic v2 |
| Encriptación | bcrypt |
| IA | PyTorch + Ultralytics (YOLO) |
| Frontend | React + Vite + TypeScript |
| Contenedores | Docker + Docker Compose |

---

## 👥 Equipo

Proyecto universitario — Ingeniería de Sistemas, Semestre 6.
Gestión del proyecto con **Jira** usando metodología **Scrum**.