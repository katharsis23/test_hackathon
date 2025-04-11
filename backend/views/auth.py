from fastapi import Depends, status, APIRouter, Request
from models import *
from database import get_db, AsyncSession
from fastapi.responses import JSONResponse
import json
from pydantic import BaseModel
from sqlalchemy.future import select
from typing import Literal
from .utils import send_code_via_gmail, generate_code
import logging

logging.basicConfig(level=logging.DEBUG)

auth_router = APIRouter()

temp_user = {}


class SignupUser(BaseModel):
    username: str
    password: str
    email: str
    shelter_address: str = None
    shelter_category: str = None
    user_type: Literal["volunteer", "shelter"]


@auth_router.post("/signup")
async def signup(data: SignupUser, db: AsyncSession = Depends(get_db)):
    if data.user_type == "volunteer":
        query = await db.execute(select(Volunteer).where(Volunteer.username == data.username))
        result = query.scalar_one_or_none()
        if result is not None:

            return JSONResponse(
                content={"message": "Username taken."},
                status_code=status.HTTP_400_BAD_REQUEST
            )
        else:
            verification_code = generate_code()
            temp_user[verification_code] = {
                "data": data,
                "code": verification_code,
                "user type": data.user_type,
            }
            logging.debug(f"Temporary users: {temp_user}")

            send_code_via_gmail(data.email, verification_code)
            return JSONResponse(
                content={"message": "Verification code sent."},
                status_code=status.HTTP_200_OK
            )

    elif data.user_type == "shelter":
        query = await db.execute(select(Shelter).where(Shelter.name == data.username))
        result = query.scalar_one_or_none()
        if result is not None:

            return JSONResponse(
                content={"message": "Username taken."},
                status_code=status.HTTP_400_BAD_REQUEST
            )
        else:
            verification_code = generate_code()
            temp_user[verification_code] = {
                "data": data,
                "code": verification_code,
                "user type": data.user_type,
            }
            logging.debug(f"Temporary users: {temp_user}")

            send_code_via_gmail(data.email, verification_code)
            return JSONResponse(
                content={"message": "Verification code sent."},
                status_code=status.HTTP_200_OK
            )


class LoginUser(BaseModel):
    username: str
    password: str
    user_type: Literal["volunteer", "shelter"]


@auth_router.post("/login")
async def login(data: LoginUser, db: AsyncSession = Depends(get_db)):
    if data.user_type == "volunteer":
        query = await db.execute(select(Volunteer).where(Volunteer.username == data.username))
        result = query.scalar_one_or_none()
        if result is not None:

            if result.verify_password(data.password):
                return JSONResponse(
                    content={"message": "Login successful."},
                    status_code=status.HTTP_200_OK
                )
            else:
                return JSONResponse(
                    content={"message": "Wrong password."},
                    status_code=status.HTTP_400_BAD_REQUEST
                )
        else:
            return JSONResponse(
                content={"message": "User doesn't exist."},
                status_code=status.HTTP_400_BAD_REQUEST
            )
    elif data.user_type == "shelter":
        query = await db.execute(select(Shelter).where(Shelter.name == data.username))
        result = query.scalar_one_or_none()
        if result is None:
            return JSONResponse(
                content={"message": "User doesn't exist."},
                status_code=status.HTTP_400_BAD_REQUEST
            )
        else:
            if result.verify_password(data.password):
                return JSONResponse(
                    content={"message": "Login successful."},
                    status_code=status.HTTP_200_OK
                )
            else:
                return JSONResponse(
                    content={"message": "Wrong password"},
                    status_code=status.HTTP_400_BAD_REQUEST
                )


class Get_Shelter_Info(BaseModel):
    id: str


@auth_router.post("/get_shelter_info")
async def get_shelter_info(request_: Get_Shelter_Info, db: AsyncSession = Depends(get_db)):
    try:
        query = await db.execute(select(Shelter).where(Shelter.shelter_id == request_.id))
        shelter = query.scalar_one_or_none()
        if shelter is None:
            return JSONResponse(
                content={
                    "msg": "No shelter found"
                },
                status_code=404
            )
        return JSONResponse(
            content={
                "name": shelter.name,
                "email": shelter.email,
                "address": shelter.shelter_address,
                "bank_info": shelter.bank_info,
                "shelter_category": shelter.shelter_category
            },
            status_code=200
        )
    except Exception as e:
        return JSONResponse(
            content={"msg": "Failed to update article", "detail": str(e)},
            status_code=500
        )


@auth_router.post("/verify-code")
async def verify_code(code: str, db: AsyncSession = Depends(get_db)):
    try:
        code = code.strip()

        if int(code) in temp_user:
            user_data = temp_user[int(code)]
            data = user_data["data"]
            user_type = user_data["user type"]

            if user_type == "volunteer":
                new_user = Volunteer(
                    username=data.username,
                    email=data.email
                )
                new_user.hash_password(data.password)

                db.add(new_user)
                await db.flush()
                await db.commit()

                del temp_user[int(code)]

                return JSONResponse(
                    content={"message": "User created",
                             "volunteer_id": new_user.volunteer_id},
                    status_code=status.HTTP_201_CREATED
                )
            elif user_type == "shelter":
                new_shelter = Shelter(
                    name=data.username,
                    email=data.email,
                    shelter_address=data.shelter_address,
                    shelter_category=data.shelter_category
                )
                new_shelter.hash_password(data.password)

                db.add(new_shelter)
                await db.flush()
                await db.commit()

                del temp_user[int(code)]

                return JSONResponse(
                    content={"message": "Shelter created",
                             "shelter_id": new_shelter.shelter_id},
                    status_code=status.HTTP_201_CREATED
                )

        else:
            return JSONResponse(
                content={"message": "Invalid or expired code."},
                status_code=status.HTTP_400_BAD_REQUEST
            )

    except Exception as e:
        logging.error(f"Error occurred: {e}")
        return JSONResponse(
            content={"message": f"An error occurred: {e}"},
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
