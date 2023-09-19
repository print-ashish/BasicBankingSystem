import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

function Navbar() {
  return (
    <nav>
      <ul> 
    
        <li>
          <Link to="/"><h1>ABC Bank of India</h1></Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        
        <li>
          <Link to="/customers">Customers</Link>
        </li>
        <li>
          <Link to="/payments">Payments</Link>
        </li>
        <li>
          <Link to="/services">Services</Link>
        </li>
        <li>
          <Link to="/contact">Contact Us</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
