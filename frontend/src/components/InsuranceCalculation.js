import React, { useState } from 'react';
import axios from 'axios';

const InsuranceCalculation = () => {
  const [age, setAge] = useState(''); // Estado para a idade do usuário
  const [loanDuration, setLoanDuration] = useState(''); // Estado para a duração do empréstimo
  const [carPrice, setCarPrice] = useState(''); // Estado para o preço do carro
  const [insuranceCost, setInsuranceCost] = useState(null); // Estado para o custo do seguro
  const [error, setError] = useState(null); // Estado para armazenar erros

  const calculateInsurance = async () => {
    if (!carPrice || !age || !loanDuration) {
      setError('Car price, age, and loan duration are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/insurance_quote', {
        price: parseFloat(carPrice),
        power: 0,  // Adicione a potência do carro aqui, se necessário
        age: parseInt(age),
        duration: parseInt(loanDuration)
      });
      setInsuranceCost(response.data.cost);
      setError(null); // Limpa o erro se a solicitação for bem-sucedida
      console.log('Insurance quote response:', response.data);
    } catch (error) {
      console.error('Error calculating insurance quote:', error);
      setError('Error calculating insurance quote');
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
        Age:
        <input 
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
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
      <button onClick={calculateInsurance}>Calculate Insurance</button>
      {insuranceCost !== null && (
        <div>
          <h2>Insurance Quote</h2>
          <p><strong>Cost:</strong> {insuranceCost}</p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default InsuranceCalculation;
