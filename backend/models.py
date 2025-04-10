from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import Column, String, Text, Integer, ForeignKey
import uuid
from passlib.hash import bcrypt

Base=declarative_base()


def generate_unique_id():
    return str(uuid.uuid4()).replace("-", "")[:10]



class Volunteer(Base):
    __tablename__="volunteer"

    volunteer_id=Column(
        String(10),
        primary_key=True,
        default=generate_unique_id
    )

    username=Column(
        String(100),
        nullable=False,
        unique=True
    )

    email=Column(
        Text,
        nullable=False
    )

    volunteer_password=Column(
        String(255),
        nullable=False
    )

#    @staticmethod
    def hash_password(self, initial_password:str):
        self.volunteer_password=bcrypt.hash(initial_password)
    
    def verify_password(self, checking_password: str):
        if not self.volunteer_password:
            return False
        return bcrypt.verify(checking_password,self.volunteer_password)
    

class Shelter(Base):
    __tablename__="shelter"
    shelter_id=Column(
        String(10),
        primary_key=True,
        default=generate_unique_id
    )

    name=Column(
        String(100),
        nullable=False,
        unique=True
    )

    email=Column(
        String(255),
        nullable=False
    )

    shelter_addresss=Column(
        String(255),
        unique=True
    )

    shelter_category=Column(
        String(100)
    )

    bank_info=Column(
        String(255)
    )

    shelter_password=Column(
        String(255),
        nullable=False
    )

    #@staticmethod
    def hash_password(self, initial_password):
        self.shelter_password=bcrypt.hash(initial_password)

    def verify_password(self, checking_password: str):
        if not self.shelter_password:
            return False
        return bcrypt.verify(checking_password, self.shelter_password)



class Article(Base):
    __tablename__="article"

    article_id=Column(
        String(10),
        primary_key=True,
        default=generate_unique_id
    )

    photo_url=Column(Text)

    age=Column(Integer)

    name=Column( String(100) )

    health_status=Column(Text)

    sex=Column(String(10))

    description=Column( String(10) )

    shelter_id=Column()

    volunteer_id=Column()

    def checking_sex_values(self):
        allowed_values=("Хлопчик", "Дівчинка")
        if self.sex not in allowed_values:
            return False
        return True


class Comments(Base):
    __tablename__="comments"

    comment_id=Column(
        String(10),
        primary_key=True,
        default=generate_unique_id
    )

    description=Column(
        Text,
        nullable=False
    )

    shelter_id=Column()

    volunteer_id=Column()


class Volunteer_Article(Base):
    __tablename__="volunteer_article"

    volunteer_article_id=Column(
        String(10),
        primary_key=True,
        default=generate_unique_id
    )

    volunteer_id=Column()

    article_id=Column()


