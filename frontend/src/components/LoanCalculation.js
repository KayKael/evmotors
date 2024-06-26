import React, { useState } from 'react';
import axios from 'axios';

const LoanCalculation = () => {
  const [carPrice, setCarPrice] = useState(''); // Estado para o preço do carro
  const [downPaymentPercentage, setDownPaymentPercentage] = useState(''); // Estado para a porcentagem de entrada
  const [loanDuration, setLoanDuration] = useState(''); // Estado para a duração do empréstimo
  const [monthlyPayment, setMonthlyPayment] = useState(null); // Estado para o pagamento mensal do empréstimo
  const [error, setError] = useState(null); // Estado para armazenar erros

  const calculateLoan = async () => {
    try {
      const response = await axios.post('http://localhost:5002/loan_payment', {
        price: parseFloat(carPrice),
        down_payment_percentage: parseFloat(downPaymentPercentage),
        loan_duration: parseInt(loanDuration)
      });
      setMonthlyPayment(response.data.monthly_payment);
      setError(null); // Limpa o erro se a solicitação for bem-sucedida
      console.log('Loan payment response:', response.data);
    } catch (error) {
      console.error('Error calculating loan payment:', error);
      setError('Error calculating loan payment');
    }
  };

  return (
    <div>
      <label>
        Car Price:
        <input 
          type="number"
          value={carPrice}
          onChange={(e) => setCarPrice(e.target.value)}
        />
      </label>
      <label>
        Down Payment Percentage:
        <input 
          type="number"
          value={downPaymentPercentage}
          onChange={(e) => setDownPaymentPercentage(e.target.value)}
        />
      </label>
      <label>
        Loan Duration (months):
        <input 
          type="number"
          value={loanDuration}
          onChange={(e) => setLoanDuration(e.target.value)}
        />
      </label>
      <button onClick={calculateLoan}>Calculate Loan</button>
      {monthlyPayment !== null && (
        <div>
          <h2>Loan Payment</h2>
          <p><strong>Monthly Payment:</strong> {monthlyPayment}</p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoanCalculation;
