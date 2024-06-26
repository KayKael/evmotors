import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EVMotors = () => {
  const [cars, setCars] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null); // Estado para o carro selecionado
  const [age, setAge] = useState(''); // Estado para a idade do usuário
  const [loanDuration, setLoanDuration] = useState(''); // Estado para a duração do empréstimo
  const [insuranceData, setInsuranceData] = useState(null); // Estado para os dados do seguro
  const [downPayment, setDownPayment] = useState(''); // Estado para a entrada inicial
  const [monthlyPayment, setMonthlyPayment] = useState(null); // Estado para o valor da prestação mensal
  const [error, setError] = useState(null); // Estado para armazenar erros

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/cars');
        setCars(response.data);
        setFilteredCars(response.data); // Inicialmente mostrar todos os carros
      } catch (error) {
        console.error('Error fetching cars data:', error);
      }
    };
    
    fetchCars();
  }, []);

  const filterCars = () => {
    const filtered = cars.filter(car => 
      car.brand.toLowerCase().includes(selectedBrand.toLowerCase()) && 
      car.model.toLowerCase().includes(selectedModel.toLowerCase())
    );
    setFilteredCars(filtered);
  };

  const selectCar = (car) => {
    setSelectedCar(car); // Atualiza o carro selecionado
    setInsuranceData(null); // Limpa os dados do seguro ao selecionar um novo carro
    setMonthlyPayment(null); // Limpa o valor da prestação mensal ao selecionar um novo carro
  };

  const calculateInsurance = async () => {
    if (!selectedCar || !age || !loanDuration) {
      setError('Car, age, and loan duration must be selected');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/EVMotors/insurance_quote/', {
        car_id: selectedCar.id,
        age: parseInt(age),
        duration: parseInt(loanDuration)
      });
      setInsuranceData(response.data);
      setError(null); // Limpa o erro se a solicitação for bem-sucedida
      console.log('Insurance quote response:', response.data);
    } catch (error) {
      console.error('Error calculating insurance quote:', error);
      setError('Error calculating insurance quote');
    }
  };

  const calculateLoan = () => {
    if (!selectedCar || !downPayment || !loanDuration) {
      setError('Car, down payment, and loan duration must be selected');
      return;
    }

    const price = selectedCar.price;
    const loanAmount = price - downPayment;
    const monthlyInterestRate = 0.005; // Taxa de juros mensal (0.5%)
    const totalInterestRate = monthlyInterestRate * loanDuration;
    const monthlyPaymentValue = (loanAmount * (1 + totalInterestRate)) / loanDuration;
    setMonthlyPayment(monthlyPaymentValue.toFixed(2));
    setError(null); // Limpa o erro se o cálculo for bem-sucedido
  };

  return (
    <div className="container">
      <h1>Welcome to EV Motors</h1>
      <p>Select a car and calculate your insurance and loan payments easily.</p>
      <div>
        <label>
          Brand:
          <input 
            type="text" 
            value={selectedBrand} 
            onChange={(e) => setSelectedBrand(e.target.value)} 
          />
        </label>
        <label>
          Model:
          <input 
            type="text" 
            value={selectedModel} 
            onChange={(e) => setSelectedModel(e.target.value)} 
          />
        </label>
        <button onClick={filterCars}>Search</button>
      </div>
      {filteredCars.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Brand</th>
              <th>Model</th>
              <th>Name</th>
              <th>Price</th>
              <th>Power</th>
              <th>Select</th> {/* Coluna para selecionar um carro */}
            </tr>
          </thead>
          <tbody>
            {filteredCars.map(car => (
              <tr key={car.id}>
                <td>{car.brand}</td>
                <td>{car.model}</td>
                <td>{car.name}</td>
                <td>{car.price}</td>
                <td>{car.power}</td>
                <td>
                  <button onClick={() => selectCar(car)}>Select</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {selectedCar && (
        <div>
          <h2>Selected Car</h2>
          <p><strong>Brand:</strong> {selectedCar.brand}</p>
          <p><strong>Model:</strong> {selectedCar.model}</p>
          <p><strong>Name:</strong> {selectedCar.name}</p>
          <p><strong>Price:</strong> {selectedCar.price}</p>
          <p><strong>Power:</strong> {selectedCar.power}</p>
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
          <br />
          <label>
            Down Payment:
            <input 
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
            />
          </label>
          <button onClick={calculateLoan}>Calculate Loan</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
      {insuranceData && (
        <div>
          <h2>Insurance Quote</h2>
          <p><strong>Cost:</strong> {insuranceData.cost}</p>
        </div>
      )}
      {monthlyPayment && (
        <div>
          <h2>Loan Calculation</h2>
          <p><strong>Monthly Payment:</strong> {monthlyPayment}</p>
        </div>
      )}
    </div>
  );
};

export default EVMotors;
