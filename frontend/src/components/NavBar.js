import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <div className="navbar">
      <Link to="/EVMotors">EV Motors</Link>
      <Link to="/insurance-calculation">Insurance Calculation</Link>
      <Link to="/loan-calculation">Loan Calculation</Link>
    </div>
  );
};

export default NavBar;
