from fastapi import APIRouter

from app.services.user_service import get_user

router = APIRouter()

@router.get("/users")

async def read_users():
    return get_user()