
from fastapi import Depends, status, APIRouter, Request
from models import *
from database import get_db, AsyncSession, ENGINE
from fastapi.responses import JSONResponse
import json
from pydantic import BaseModel
from sqlalchemy.future import select


article_router=APIRouter()




class Post_Article(BaseModel):
    photo_url: str
    name: str
    age: int
    health_status: str
    description: str=None
    animal_type: str
    volunteer_id: str=None
    shelter_id: str=None
    sex: str

@article_router.post("/post_article")
async def post_article(request_:Post_Article, db: AsyncSession=Depends(get_db)):
    try:
        if not request_.shelter_id and not request_.volunteer_id:
            return JSONResponse(
                content={
                    "msg":"no author of article"
                },
                status_code=400
            )
        if request_.shelter_id and request_.volunteer_id:
            return JSONResponse(
                content={
                    "msg": "Double authority i forbidden"
                },
                status_code=400
            )
        new_article=Article(
            photo_url=request_.photo_url,
            name=request_.name,
            age=request_.age,
            health_status=request_.health_status,
            sex=request_.sex,
            description=request_.description,
            animal_type=request_.animal_type,
            shelter_id=request_.shelter_id,
            volunteer_id=request_.volunteer_id
            )
        db.add(new_article)
        await db.commit()
        return JSONResponse(
            content={
                "msg": "article posted succesfully"
            },
            status_code=200
        )
    except Exception as e:
        return JSONResponse(
            content={
                "msg":"this is bad :(",
                "detail:": e
            },
            status_code=500
        )




@article_router.get("/fetch_article_homepage")
async def fetch_article_homepage(request_:Request, db: AsyncSession=Depends(get_db)):
    try:
        query=await db.execute(select(Article).limit(4))
        articles=query.scalars().all()
        article_list=[]
        for article in articles:
            article_list.append(
                {
                    "photo_url": article.photo_url,
                    "name": article.name,
                    "age": article.age,
                    "sex": article.sex,
                    "health_status": article.health_status,
                    "animal_type": article.animal_type,
                    "description": article.description,
                    "shelter_id": article.shelter_id,
                    #"volunteer_id": article.volunteer_id
                }
            )
        return JSONResponse(
            content={
                "array_of_article": article_list
            },
            status_code=200
        )
    except Exception as e:
        return JSONResponse(
            content={
                "msg":"this is bad :(",
                "detail:": e
            },
            status_code=500
        )
    

