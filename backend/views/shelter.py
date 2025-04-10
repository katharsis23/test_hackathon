from fastapi import Depends, status, APIRouter
from ..models import *
from ..database import get_db, AsyncSession, ENGINE
from fastapi.responses import JSONResponse
import json
from pydantic import BaseModel
from sqlalchemy.future import select




shelter_router=APIRouter()