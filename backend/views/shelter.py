from fastapi import Depends, status, APIRouter
from models import *
from database import get_db, AsyncSession, ENGINE
from fastapi.responses import JSONResponse
import json
from pydantic import BaseModel
from sqlalchemy.future import select




shelter_router=APIRouter()


@shelter_router.post("/get_shelter_info")
async def get_shelter_info():
    pass

@shelter_router.post("/leave_comment")
async def leave_comment():
    pass

@shelter_router.post("/fetch_comments")
async def fetch_comment():
    pass


