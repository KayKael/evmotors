import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const CarSelection = () => {
  const dispatch = useDispatch();
  const carSelection = useSelector(state => state.carSelection);
  const [insurance, setInsurance] = useState(null);

  const handleCarSelection = () => {
    // Lógica para definir carId com base na marca e modelo selecionados
    const cars = [
      { id: 1, brand: 'Tesla', model: 'Model S' },
      { id: 2, brand: 'Tesla', model: 'Model 3' },
      { id: 3, brand: 'BMW', model: 'i3' },
      { id: 4, brand: 'Nissan', model: 'Leaf' },
      { id: 5, brand: 'Chevrolet', model: 'Bolt EV' }
    ];

    const selectedCar = cars.find(car => car.brand === carSelection.brand && car.model === carSelection.model);

    if (selectedCar) {
      dispatch({ type: 'SET_CAR_SELECTION', payload: { carId: selectedCar.id } });
    } else {
      alert("Car not found. Please check the brand and model.");
    }
  };

  const getInsuranceQuote = async () => {
    const response = await axios.post('http://localhost:8080/api/EVMotors/insurance_quote/', carSelection);
    setInsurance(response.data);
  };

  return (
    <div className="container">
      <h2>Select Car and Get Insurance Quote</h2>
      <input
        type="text"
        value={carSelection.brand}
        onChange={(e) => dispatch({ type: 'SET_CAR_SELECTION', payload: { brand: e.target.value } })}
        placeholder="Brand"
      />
      <input
        type="text"
        value={carSelection.model}
        onChange={(e) => dispatch({ type: 'SET_CAR_SELECTION', payload: { model: e.target.value } })}
        placeholder="Model"
      />
      <input
        type="number"
        value={carSelection.age}
        onChange={(e) => dispatch({ type: 'SET_CAR_SELECTION', payload: { age: e.target.value } })}
        placeholder="Your Age"
      />
      <input
        type="number"
        value={carSelection.duration}
        onChange={(e) => dispatch({ type: 'SET_CAR_SELECTION', payload: { duration: e.target.value } })}
        placeholder="Duration (months)"
      />
      <button onClick={handleCarSelection}>Select Car</button>
      <button onClick={getInsuranceQuote}>Get Insurance Quote</button>
      {insurance && <div>Insurance Cost: {insurance.cost}</div>}
    </div>
  );
};

export default CarSelection;
