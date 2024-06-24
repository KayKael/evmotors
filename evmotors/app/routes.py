from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .models import Car, SessionLocal, init_db
import requests

router = APIRouter()

@router.on_event("startup")
async def startup():
    init_db()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/EVMotors/insurance_quote/")
async def insurance_quote(car_id: int, age: int, duration: int, db: Session = Depends(get_db)):
    car = db.query(Car).filter(Car.id == car_id).first()
    if car:
        insurance_response = requests.post("http://insurance:5001/insurance_quote", json={"price": car.price, "power": car.power, "age": age, "duration": duration})
        insurance_data = insurance_response.json()
        return insurance_data
    return {"error": "Car not found"}

@router.post("/EVMotors/loan_payment/")
async def loan_payment(car_id: int, down_payment_percentage: float, loan_duration: int, db: Session = Depends(get_db)):
    car = db.query(Car).filter(Car.id == car_id).first()
    if car:
        loan_response = requests.post("http://loan:5002/loan_payment", json={"price": car.price, "down_payment_percentage": down_payment_percentage, "loan_duration": loan_duration})
        loan_data = loan_response.json()
        return loan_data
    return {"error": "Car not found"}
