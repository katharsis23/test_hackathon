from sqlalchemy.ext.asyncio import AsyncSession,create_async_engine
from sqlalchemy.orm import sessionmaker
from typing import AsyncGenerator
from dotenv import load_dotenv
import os


load_dotenv(dotenv_path=r"C:\Users\ivank\Desktop\Quizi\test_hackathon\database\.env")
DB_NAME=os.getenv("DATABASE_NAME")
DB_USER=os.getenv("DATABASE_USER")
DB_PASSWORD=os.getenv("DATABASE_PASSWORD")
DB_PORT=os.getenv("DATABASE_PORT")
DB_HOST=os.getenv("DATABASE_HOST")


DATABASE_URL=f"mysql+aiomysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

ENGINE=create_async_engine(
    url=DATABASE_URL,
#   echo=False  #for development    
    echo=True
)



async_session=sessionmaker(
    bind=ENGINE,
    class_=AsyncSession,
    expire_on_commit=False
)



async def get_db() -> AsyncGenerator[AsyncSession, None]:
    try:  
        async with async_session() as session:
            yield session
    except Exception as e:
        raise Exception("An error occured", e)
    

    