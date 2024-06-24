import requests

def get_insurance_quote(price, power, age, duration):
    response = requests.post("http://insurance:5001/insurance_quote", json={"price": price, "power": power, "age": age, "duration": duration})
    return response.json()

def get_loan_payment(price, down_payment_percentage, loan_duration):
    response = requests.post("http://loan:5002/loan_payment", json={"price": price, "down_payment_percentage": down_payment_percentage, "loan_duration": loan_duration})
    return response.json()
