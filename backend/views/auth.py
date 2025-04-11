
from fastapi import Depends, status, APIRouter
from models import *
from database import get_db, AsyncSession, ENGINE
from fastapi.responses import JSONResponse
import json
from pydantic import BaseModel
from sqlalchemy.future import select






auth_router=APIRouter()


class Get_Shelter_Info(BaseModel):
    id: str

@auth_router.post("/get_shelter_info")
async def get_shelter_info(request_: Get_Shelter_Info, db: AsyncSession=Depends(get_db)):
    try:
        query=await db.execute(select(Shelter).where(Shelter.shelter_id==request_.id))
        shelter=query.scalar_one_or_none()
        if shelter is None:
            return JSONResponse(
                content={
                    "msg":"No shelter found"
                },
                status_code=404
            )
        return JSONResponse(
            content={
                "name": shelter.name,
                "email": shelter.email,
                "address":shelter.shelter_address,
                "bank_info":shelter.bank_info,
                "shelter_category":shelter.shelter_category
            },
            status_code=200
        )
    except Exception as e:
        return JSONResponse(
            content={"msg": "Failed to update article", "detail": str(e)},
            status_code=500
        )