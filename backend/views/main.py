from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .auth import auth_router
from .article import article_router
from .shelter import shelter_router
from models import Base
from database import ENGINE

animal_shelter = FastAPI()

animal_shelter.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

# Route includes
animal_shelter.include_router(auth_router, prefix="/auth")
animal_shelter.include_router(article_router, prefix="/article")
animal_shelter.include_router(shelter_router, prefix="/shelter")

# Create tables on startup
@animal_shelter.on_event("startup")
async def create_tables():
    async with ENGINE.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

