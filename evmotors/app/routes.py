from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .models import Car, SessionLocal, init_db
import logging
import requests

router = APIRouter()
logger = logging.getLogger(__name__)

@router.on_event("startup")
async def startup():
    init_db()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/list_cars")
def list_cars(db: Session = Depends(get_db)):
    return db.query(Car).all()

@router.get("/cars")
def read_cars(brand: str = None, model: str = None, db: Session = Depends(get_db)):
    logger.info(f"Fetching cars with brand '{brand}' and model '{model}'")
    
    query = db.query(Car)
    if brand:
        logger.debug(f"Filtering by brand: {brand}")
        query = query.filter(Car.brand == brand)
    if model:
        logger.debug(f"Filtering by model: {model}")
        query = query.filter(Car.model == model)
    
    cars = query.all()
    logger.info(f"Found {len(cars)} cars matching the criteria")
    
    return cars

@router.post("/EVMotors/insurance_quote/")
async def insurance_quote(insurance_request: dict, db: Session = Depends(get_db)):
    car_id = insurance_request.get("car_id")
    age = insurance_request.get("age")
    duration = insurance_request.get("duration")

    car = db.query(Car).filter(Car.id == car_id).first()
    if car:
        insurance_response = requests.post("http://insurance:5001/insurance_quote", json={
            "price": car.price,
            "power": car.power,
            "age": age,
            "duration": duration
        })
        return insurance_response.json()
    raise HTTPException(status_code=404, detail="Car not found")

@router.post("/EVMotors/loan_payment/")
async def loan_payment(loan_request: dict, db: Session = Depends(get_db)):
    car_id = loan_request.get("car_id")
    down_payment_percentage = loan_request.get("down_payment_percentage")
    loan_duration = loan_request.get("loan_duration")

    car = db.query(Car).filter(Car.id == car_id).first()
    if car:
        loan_response = requests.post("http://loan:5002/loan_payment", json={
            "price": car.price,
            "down_payment_percentage": down_payment_percentage,
            "loan_duration": loan_duration
        })
        return loan_response.json()
    raise HTTPException(status_code=404, detail="Car not found")
