import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import EVMotors from './pages/EVMotors';
import CarSelectionPage from './pages/CarSelectionPage';
import LoanCalculationPage from './pages/LoanCalculationPage';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<EVMotors />} />
          <Route path="/car-selection" element={<CarSelectionPage />} />
          <Route path="/loan-calculation" element={<LoanCalculationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
