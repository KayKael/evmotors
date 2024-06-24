import React, { useState } from 'react';
import axios from 'axios';

function LoanCalculation({ carId }) {
  const [age, setAge] = useState(25);
  const [duration, setDuration] = useState(12);
  const [downPayment, setDownPayment] = useState(10);
  const [insurance, setInsurance] = useState(null);
  const [loan, setLoan] = useState(null);

  const getInsuranceQuote = async () => {
    if (carId) {
      const response = await axios.post('http://localhost:8080/api/EVMotors/insurance_quote/', { car_id: carId, age, duration });
      setInsurance(response.data);
    } else {
      alert("Please select a car first.");
    }
  };

  const getLoanPayment = async () => {
    if (carId) {
      const response = await axios.post('http://localhost:8080/api/EVMotors/loan_payment/', { car_id: carId, down_payment_percentage: downPayment, loan_duration: duration });
      setLoan(response.data);
    } else {
      alert("Please select a car first.");
    }
  };

  return (
    <div>
      <h2>Calculate Loan Payment</h2>
      <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Your Age" />
      <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration (months)" />
      <input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} placeholder="Down Payment (%)" />
      <button onClick={getInsuranceQuote}>Get Insurance Quote</button>
      <button onClick={getLoanPayment}>Get Loan Payment</button>
      {insurance && <div>Insurance Cost: {insurance.cost}</div>}
      {loan && <div>Monthly Payment: {loan.monthly_payment}</div>}
    </div>
  );
}

export default LoanCalculation;
