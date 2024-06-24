from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class InsuranceRequest(BaseModel):
    price: float
    power: float
    age: int
    duration: int

@app.post("/insurance_quote")
async def insurance_quote(request: InsuranceRequest):
    base_cost = (0.001 * request.price) + (0.005 * request.power)
    if 18 <= request.age <= 25:
        penalty = 0.25
    elif 25 < request.age <= 50:
        penalty = 0.10
    else:
        penalty = 0.15
    cost = (base_cost + penalty) * request.duration
    return {"cost": cost}
