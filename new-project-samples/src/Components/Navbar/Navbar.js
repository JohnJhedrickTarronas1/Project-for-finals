import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <header className="header">
      <div className="nav-logo">
        <Link to="/">Travel Buddy</Link>
      </div>
      <ul className="nav">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/discoveries">Discoveries</Link></li>
        <li><Link to="/weather">Weather</Link></li>
        <li><Link to="/converter">Converter</Link></li>
      </ul>
    </header>
  );
}

export default Navbar;