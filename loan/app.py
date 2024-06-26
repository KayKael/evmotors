from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configuração do CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todas as origens, ajuste conforme necessário
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos os métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permitir todos os headers
)

class LoanRequest(BaseModel):
    price: float
    down_payment_percentage: float
    loan_duration: int

@app.post("/loan_payment")
async def loan_payment(request: LoanRequest):
    loan_amount = request.price * (1 - request.down_payment_percentage / 100)
    monthly_interest_rate = 0.005
    monthly_payment = (loan_amount * monthly_interest_rate) / (1 - (1 + monthly_interest_rate) ** -request.loan_duration)
    return {"monthly_payment": monthly_payment}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5002)

