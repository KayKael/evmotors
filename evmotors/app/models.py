from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "mysql+pymysql://evmotorsusr:evmotors123@db:3306/evmotors"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Car(Base):
    __tablename__ = "cars"
    id = Column(Integer, primary_key=True, index=True)
    brand = Column(String(50), index=True)
    model = Column(String(50), index=True)
    name = Column(String(50), index=True)
    price = Column(Float)
    power = Column(Float)

def init_db():
    Base.metadata.create_all(bind=engine)
