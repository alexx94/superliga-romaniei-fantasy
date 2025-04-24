import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import LogoSuperliga from '../../assets/Superliga.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faShirt, faPencil, faUser } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = () => {
  const [showNav, setShowNav] = useState(false);
  
  const toggleNav = () => {
    setShowNav(!showNav);
  };
  
  const closeNav = () => {
    setShowNav(false);
  };

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="mobile-header">
        <Link to="/" className="mobile-logo" onClick={closeNav}>
          <img src={LogoSuperliga} alt="logo" />
          <span>Ro Fantasy Club</span>
        </Link>
        <button className="hamburger" onClick={toggleNav}>
          ☰
        </button>
      </div>
      
      {/* Main Sidebar Navigation */}
      <div className={`nav-bar ${showNav ? 'mobile-show' : ''}`}>
        <div className="logo-area">
          <Link to="/" className="logo-link" onClick={closeNav}>
            <img src={LogoSuperliga} alt="logo" className="logo" />
            <h1>Ro Fantasy Club</h1>
          </Link>
        </div>

        <nav>
          <NavLink exact="true" activeclassname="active" to="/" onClick={closeNav}>
            <FontAwesomeIcon icon={faHome} />
            <span className="nav-text">Home</span>
          </NavLink>

          <NavLink exact="true" activeclassname="active" to="/search" onClick={closeNav}>
            <FontAwesomeIcon icon={faSearch} />
            <span className="nav-text">Search</span>
          </NavLink>

          <NavLink exact="true" activeclassname="active" to="/teams" onClick={closeNav}>
            <FontAwesomeIcon icon={faShirt} />
            <span className="nav-text">Teams</span>
          </NavLink>

          <NavLink exact="true" activeclassname="active" to="/edit" onClick={closeNav}>
            <FontAwesomeIcon icon={faPencil} />
            <span className="nav-text">Edit</span>
          </NavLink>

          <NavLink exact="true" activeclassname="active" to="/login" onClick={closeNav}>
            <FontAwesomeIcon icon={faUser} />
            <span className="nav-text">Login</span>
          </NavLink>
        </nav>

        <div className="overlay" onClick={closeNav}></div>
      </div>
    </>
  );
};

export default Sidebar;