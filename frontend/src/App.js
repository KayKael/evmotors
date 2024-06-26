import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import EVMotors from './pages/EVMotors';
import CarInsurancePage from './pages/CarInsurancePage';
import LoanCalculationPage from './pages/LoanCalculationPage';



function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/EVMotors" element={<EVMotors />} />
          <Route path="/insurance-calculation" element={<CarInsurancePage />} />
          <Route path="/loan-calculation" element={<LoanCalculationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
