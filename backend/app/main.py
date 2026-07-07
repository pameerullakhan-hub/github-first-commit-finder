from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.errors import setup_exception_handlers
from app.api.v1.router import api_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend service for finding the first commit of a GitHub repository",
    version="1.0.0",
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set up CORS
if settings.CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Set up custom exception handlers
setup_exception_handlers(app)

# Include APIs
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    return {
        "status": "healthy",
        "project": settings.PROJECT_NAME,
        "api_docs": f"{settings.API_V1_STR}/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host=settings.HOST, port=settings.PORT, reload=True)
