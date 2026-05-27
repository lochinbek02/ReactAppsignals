import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar({ setIsAuthenticated, isSuperAdmin }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('isSuperAdmin');
    setIsAuthenticated(false);
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="navbar-header">
      <nav className="navbar container">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <span className="navbar-logo" aria-hidden="true">🧠</span>
          <span className="navbar-name">Biosignal</span>
        </Link>

        <ul className={`navbar-links ${isOpen ? 'is-open' : ''}`}>
          <li>
            <NavLink to="/" end onClick={closeMenu} className={({ isActive }) => isActive ? 'is-active' : ''}>
              Bosh sahifa
            </NavLink>
          </li>
          <li>
            <NavLink to="/timefield" onClick={closeMenu} className={({ isActive }) => isActive ? 'is-active' : ''}>
              Vaqt sohasi
            </NavLink>
          </li>
          <li>
            <NavLink to="/preprocess" onClick={closeMenu} className={({ isActive }) => isActive ? 'is-active' : ''}>
              Preprocess
            </NavLink>
          </li>
          <li>
            <NavLink to="/frequency" onClick={closeMenu} className={({ isActive }) => isActive ? 'is-active' : ''}>
              Chastota
            </NavLink>
          </li>
          {isSuperAdmin && (
            <>
              <li>
                <NavLink to="/classification" onClick={closeMenu} className={({ isActive }) => isActive ? 'is-active' : ''}>
                  Classification
                </NavLink>
              </li>
              <li>
                <NavLink to="/resultsClassification" onClick={closeMenu} className={({ isActive }) => isActive ? 'is-active' : ''}>
                  Natijalar
                </NavLink>
              </li>
            </>
          )}
          <li className="navbar-actions">
            <button type="button" className="navbar-logout" onClick={handleLogout}>
              Chiqish
            </button>
          </li>
        </ul>

        <button
          type="button"
          className={`navbar-hamburger ${isOpen ? 'is-open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menyu"
          aria-expanded={isOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
