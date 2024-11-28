import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar({ setIsAuthenticated, isSuperAdmin }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('access');
    setIsAuthenticated(false);
  };

  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <img
            src="https://login.samtuit.uz/home/admins/django/static/img/illustrations/Logo.png"
            alt="SAMTUIT"
          />
          <h1>SamTUIT</h1>
        </div>
        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/timefield">Vaqt sohasi</Link>
          </li>
          {isSuperAdmin && (
            <>
              <li>
                <Link to="/classification">Classification</Link>
              </li>
              <li>
                <Link to="/resultsClassification">Result-Classification</Link>
              </li>
            </>
          )}
          <li>
            <Link to="/preprocess">Preprocess</Link>
          </li>
          <li>
            <Link to="/frequency">Chastota sohasi</Link>
          </li>
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
        <div className={`hamburger ${isOpen ? 'hamburger-active' : ''}`} onClick={toggleMenu}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
