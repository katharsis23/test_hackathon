
from fastapi import Depends, status, APIRouter, Request
from models import *
from database import get_db, AsyncSession, ENGINE
from fastapi.responses import JSONResponse
import json
from pydantic import BaseModel
from sqlalchemy.future import select
from sqlalchemy.orm import joinedload
from sqlalchemy import join
from httpx import AsyncClient


article_router = APIRouter()


class Post_Article(BaseModel):
    photo_url: str
    name: str
    age: int
    health_status: str
    description: str = None
    animal_type: str
    volunteer_id: str = None
    shelter_id: str = None
    sex: str


@article_router.post("/post_article")
async def post_article(request_: Post_Article, db: AsyncSession = Depends(get_db)):
    try:
        if not request_.shelter_id and not request_.volunteer_id:
            return JSONResponse(
                content={
                    "msg": "no author of article"
                },
                status_code=400
            )
        if request_.shelter_id and request_.volunteer_id:
            return JSONResponse(
                content={
                    "msg": "Double authority is forbidden"
                },
                status_code=400
            )
        new_article = Article(
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

        if request_.volunteer_id:
            new_article_id = new_article.article_id
            va = Volunteer_Article(
                volunteer_id=request_.volunteer_id, article_id=new_article_id)
            db.add(va)
            await db.commit()

        return JSONResponse(
            content={
                "msg": "article posted succesfully"
            },
            status_code=200
        )
    except Exception as e:
        print("Error:", str(e))
        return JSONResponse(
            content={"msg": "Internal Server Error", "detail": str(e)},
            status_code=500
        )


@article_router.get("/fetch_article_homepage")
async def fetch_article_homepage(request_: Request, db: AsyncSession = Depends(get_db)):
    try:
        query = await db.execute(select(Article).limit(4))
        articles = query.scalars().all()
        article_list = []
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
                    # "volunteer_id": article.volunteer_id
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
                "msg": "this is bad :(",
                "detail:": str(e)
            },
            status_code=500
        )


class Fetch_Article_Shelter(BaseModel):
    shelter_id: str


@article_router.post("/fetch_article_shelter")
async def fetch_article_shelter(request_: Fetch_Article_Shelter, db: AsyncSession = Depends(get_db)):
    try:
        query = await db.execute(select(Article).where(Article.shelter_id == request_.shelter_id).limit(3))
        articles = query.scalars().all()
        if articles is None:
            return JSONResponse(
                content={
                    "msg": "fetching is succesfull, but no articles found"
                },
                status_code=204
            )
        response = []
        for article in articles:
            response.append(
                {
                    "photo_url": article.photo_url,
                    "name": article.name,
                    "age": article.age,
                    "sex": article.sex,
                    "health_status": article.health_status,
                    "animal_type": article.animal_type,
                    "description": article.description,
                    "shelter_id": article.shelter_id,
                    "volunteer_id": article.volunteer_id  
                }
            )
        return JSONResponse(
            content={
                "array_of_article": response
            },
            status_code=200
        )
    except Exception as e:
        return JSONResponse(
            content={
                "msg": "this is bad :(",
                "detail:": str(e)
            },
            status_code=500
        )
    


@article_router.get("/fetch_article_volunteer")
async def fetch_article_volunteer(request_: Request, db: AsyncSession = Depends(get_db)):
    try:
        query = await db.execute(
            select(Article).where(Article.volunteer_id.isnot(None))
        )
        articles = query.scalars().all()

        if not articles:
            return JSONResponse(
                content={
                    "msg": "Fetching is successful, but no articles found"
                },
                status_code=204
            )

        response = []
        url = "http://localhost:8000/auth/get_user_info"

        async with AsyncClient() as client:
            for article in articles:
                try:
                    request_to_fetch_data = await client.post(url, json={
                        "id": article.volunteer_id,
                        "user_type": "volunteer"
                    })
                    vol_data = request_to_fetch_data.json()
                    vol_username = vol_data["name"]
                except Exception as inner_e:
                    vol_username = "Unavailable"
                    # Optional: log error if needed

                response.append({
                    "photo_url": article.photo_url,
                    "name": article.name,
                    "age": article.age,
                    "sex": article.sex,
                    "health_status": article.health_status,
                    "animal_type": article.animal_type,
                    "description": article.description,
                    "shelter_id": article.shelter_id,
                    "volunteer_id": article.volunteer_id,
                    "volunteer_name": vol_username
                })

        return JSONResponse(
            content={"array_of_article": response},
            status_code=200
        )

    except Exception as e:
        return JSONResponse(
            content={
                "msg": "this is bad :(",
                "detail": str(e)  # fixed typo
            },
            status_code=500
        )

        


class Add_to_Favourite(BaseModel):
    volunteer_id: str
    article_id: str


@article_router.post("/add_to_favourite")
async def add_to_favourite(request_: Add_to_Favourite, db: AsyncSession = Depends(get_db)):
    try:
        # look_for_existing_article=await db.execute(select(Article).where(Article.article_id==request_.article_id))
        # if not look_for_existing_article:
        #     return JSONResponse(
        #         content={
        #             "msg": "no article found"
        #         },
        #         status_code=400
        #     )
        new_volunteer_article = Volunteer_Article(
            volunteer_id=request_.volunteer_id,
            article_id=request_.article_id
        )
        db.add(new_volunteer_article)
        await db.commit()
        return JSONResponse(
            content={
                "msg": "article added to favourite"
            },
            status_code=200
        )
    except Exception as e:
        return JSONResponse(
            content={
                "msg": "This is bad :(",
                "detail:": str(e)
            },
            status_code=500
        )


class Fetch_Favourites(BaseModel):
    user_id: str


@article_router.post("/fetch_favourite_articles")
async def fetching_favourite_article(request_: Fetch_Favourites, db: AsyncSession = Depends(get_db)):
    try:
        # JOIN Volunteer_Article with Article on article_id
        stmt = (
            select(Article)
            .join(Volunteer_Article, Volunteer_Article.article_id == Article.article_id)
            .where(Volunteer_Article.volunteer_id == request_.user_id)
        )

        result = await db.execute(stmt)
        articles = result.scalars().all()

        if not articles:
            return JSONResponse(
                content={"array_of_favourites": []},
                status_code=200
            )

        response = [
            {
                "photo_url": article.photo_url,
                "name": article.name,
                "age": article.age,
                "sex": article.sex,
                "health_status": article.health_status,
                "animal_type": article.animal_type,
                "description": article.description,
                "shelter_id": article.shelter_id,
                "volunteer_id": article.volunteer_id,
            }
            for article in articles
        ]

        return JSONResponse(
            content={"array_of_favourites": response},
            status_code=200
        )

    except Exception as e:
        return JSONResponse(
            content={
                "msg": "This is bad :(",
                "detail": str(e)
            },
            status_code=500
        )


class Edit_Article(BaseModel):
    article_id: str
    photo_url: str = None
    name: str = None
    age: int = None
    health_status: str
    description: str = None
    animal_type: str
    volunteer_id: str = None
    shelter_id: str = None
    sex: str = None


@article_router.put("/edit_article")
async def edit_article(request_: Edit_Article, db: AsyncSession = Depends(get_db)):
    try:
        # Find the article by ID
        find_the_article = await db.execute(select(Article).where(Article.article_id == request_.article_id))
        article = find_the_article.scalar_one_or_none()

        if not article:
            return JSONResponse(
                content={
                    "msg": "no article found"
                },
                status_code=404
            )

        # Update only fields that are not None
        for field, value in request_.dict(exclude_unset=True).items():
            setattr(article, field, value)

        await db.commit()
        await db.refresh(article)

        return JSONResponse(
            content={"msg": "Article updated successfully"},
            status_code=200
        )

    except Exception as e:
        return JSONResponse(
            content={"msg": "Failed to update article", "detail": str(e)},
            status_code=500
        )
