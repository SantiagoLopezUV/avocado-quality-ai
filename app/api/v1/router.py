from fastapi import APIRouter
from app.api.v1.routes import analysis, auth, health, users
from app.api.v1.routes import batches

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(health.router, tags=["Health"])
api_router.include_router(analysis.router, tags=["Analysis"])
api_router.include_router(users.router, tags=["Users"])
api_router.include_router(auth.router, tags=["Auth"])
api_router.include_router(batches.router,   prefix="/batches", tags=["Batches"])