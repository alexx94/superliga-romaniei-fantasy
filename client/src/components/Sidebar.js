import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import LogoSuperliga from '../assets/Superliga.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faShirt, faPencil, faUser } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
    const [showNav, setShowNav] = useState(false);

    return (
        <div className='nav-bar'>
            <Link to="/">
                <img src = {LogoSuperliga} alt="logo" />
                <h1>Ro Fantasy Club</h1>
            </Link>

            <nav className={showNav ? 'mobile-show' : ''}>
                <NavLink exact="true" activeclassname="active" to="/">
                    <FontAwesomeIcon icon = {faHome} onClick={() => setShowNav(false)} />
                </NavLink>

            </nav>

        </div>
    );
};

export default Sidebar;