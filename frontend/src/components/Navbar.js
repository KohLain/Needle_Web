import React, { useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Navbar.css';
import logo from '../assets/Logo Needle.png';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Gérer l'état du menu

  const handleLogout = () => {
    logout();
    toggleMenu();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Ouvre ou ferme le menu
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="left">
          <Link to="/" className="logo">
            <img src={logo} alt="" />
          </Link>
        </div>

        <div className='middle'>
          <ul className="nav-links">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/shops" className="nav-link">Shops</Link>
            </li>
            <li className="nav-item">
              <Link to="/artists" className="nav-link">Artists</Link>
            </li>
            <li className="nav-item">
              <Link to="/flashs" className="nav-link">Flashs</Link>
            </li>
          </ul>
        </div>

        <div className="right">
          <div className={`burger-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
        </div>
      </div>

      {/* Menu glissant */}
      <div className={`slide-menu ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
          <li><Link to="/shops" onClick={toggleMenu}>Shops</Link></li>
          <li><Link to="/artists" onClick={toggleMenu}>Artists</Link></li>
          <li><Link to="/flashs" onClick={toggleMenu}>Flashs</Link></li>
          {user ? (
            <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
          ) : (
            <li><Link to="/login" onClick={toggleMenu}>Login</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;