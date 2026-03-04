from fastapi import FastAPI
from app.api.v1 import api_router

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Avocado Quality AI",
    version="0.1.0"
)

# Configuración de CORS para permitir solicitudes desde frontend
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"], #se cambia por URL del frontend 
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

app.include_router(api_router)



#-----------------------------------------------------#

@app.get("/")
async def root():
    return {
        "message": "Bienvenido a Avocado Quality AI ",
        # "docs": "/docs",
        # "status": "Running"
    }


