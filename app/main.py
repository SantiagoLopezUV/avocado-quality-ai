from fastapi import FastAPI
from app.api.v1 import api_router
from app.core.config import settings
from app.core.database import engine
from sqlalchemy import text

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Avocado Quality AI",
    version="0.1.0"
    
)
# Configuración de CORS para permitir solicitudes desde frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOW_ORIGINS,  # Se puede configurar en .env
    #allow_origins=["*"],  # El asterisco deja que cualquier React se conecte
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuración de CORS para permitir solicitudes desde frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], #se cambia por URL del frontend 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)



# #-----------------------------------------------------#

@app.get("/")
async def root():
    return {
        "message": "Bienvenido a Avocado Quality AI ",
        "docs": "/docs",
        "status": "Running"
    }


# Endpoint de prueba para verificar la conexión a la base de datos

# @app.get("/test-db")
# def test_db():
#     try:
#         with engine.connect() as conn:
#             conn.execute(text("SELECT 1"))
#         return {"status": "Conexión exitosa"}
#     except Exception as e:
#         return {"status": "Error", "detail": str(e)}