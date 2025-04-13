from fastapi import Depends, status, APIRouter
from models import *
from database import get_db, AsyncSession, ENGINE
from fastapi.responses import JSONResponse
import json
from pydantic import BaseModel
from sqlalchemy.future import select
from httpx import AsyncClient

shelter_router=APIRouter()


class Post_Comment(BaseModel):
    volunteer_id: str
    shelter_id: str
    description: str

@shelter_router.post("/leave_comment")
async def leave_comment(request_: Post_Comment, db: AsyncSession = Depends(get_db)):
    try:

        new_comment = Comments(
            volunteer_id=request_.volunteer_id,
            shelter_id=request_.shelter_id,
            description=request_.description
        )

        db.add(new_comment)
        await db.commit()
        await db.refresh(new_comment)

        return JSONResponse(
            content={"msg": "Comment posted successfully"},
            status_code=200
        )
    except Exception as e:
        return JSONResponse(
            content={"msg": "Failed to post comment", "detail": str(e)},
            status_code=500
        )

class Get_Comments(BaseModel):
    shelter_id: str

@shelter_router.post("/fetch_comments")
async def fetch_comment(request_: Get_Comments, db: AsyncSession = Depends(get_db)):
    try:
        result = await db.execute(
            select(Comments).where(Comments.shelter_id == request_.shelter_id)
        )
        comments = result.scalars().all()

        if not comments:
            return JSONResponse(
                content={"comments": []},
                status_code=200
            )
        response=[]
        for comment in comments:
            author_name=""
            async with AsyncClient() as client:
                request_to_get_name=await client.post(
                    url="http://localhost:8000/auth/get_user_info",
                    json={
                        "id": comment.volunteer_id,
                        "user_type": "volunteer"
                    }
                )
                vol_data=request_to_get_name.json()
                author_name=vol_data["name"]
            response.append({
                "shelter_id": comment.shelter_id,
                "comment_id": comment.comment_id,
                "volunteer_id": comment.volunteer_id,
                "description": comment.description,
                "author_name": author_name
            })

        return JSONResponse(
            content={"comments": response},
            status_code=200
        )

    except Exception as e:
        return JSONResponse(
            content={"msg": "Failed to fetch comments", "detail": str(e)},
            status_code=500
        )



