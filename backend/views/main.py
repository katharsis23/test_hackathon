from fastapi import FastAPI
from auth import auth_router
from article import article_router
from shelter import shelter_router
from fastapi.middleware.cors import CORSMiddleware

animal_shelter=FastAPI()

animal_shelter.add_middleware(
    CORSMiddleware,
#    allow_origins=["http://localhost:3000"] possibly for docker
    allow_origins=["*"],
    allow_methods=["'POST', 'GET "],
    allow_headers=["*"],
    allow_credentials=True
)


animal_shelter.include_router(auth_router, prefix="/auth")
animal_shelter.include_router(article_router, prefix="/article")
animal_shelter.include_router()