from fastapi import APIRouter
from app.api.v1.endpoints import first_commit

api_router = APIRouter()
api_router.include_router(first_commit.router, tags=["first-commit"])
