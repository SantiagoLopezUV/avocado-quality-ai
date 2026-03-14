from fastapi import FastAPI
from app.api.v1 import api_router
from app.core.config import settings
#Prueba de conexión a la base de datos
from sqlalchemy import text
from app.core.database import engine

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Avocado Quality AI",
    version="0.1.0"
    
)
# # Configuración de CORS para permitir solicitudes desde frontend
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=settings.ALLOW_ORIGINS,  # Se puede configurar en .env
#     #allow_origins=["*"],  # El asterisco deja que cualquier React se conecte
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Configuración de CORS para permitir solicitudes desde frontend
# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=["*"], #se cambia por URL del frontend 
# #     allow_credentials=True,
# #     allow_methods=["*"],
# #     allow_headers=["*"],
# # )

app.include_router(api_router)



# #-----------------------------------------------------#

# @app.get("/")
# async def root():
#     return {
#         "message": "Bienvenido a Avocado Quality AI ",
#         "docs": "/docs",
#         "status": "Running"
#     }



@app.get("/test-db")
def test_db():
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        return {"message": "Conexión a la base de datos exitosa"}
    except Exception as e:
        return {"message": "Error al conectar a la base de datos", "error": str(e)}