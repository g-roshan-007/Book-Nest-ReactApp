/* src/components/Navbar/Navbar.jsx */
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SearchForm from '../SearchForm/SearchForm';
import './Navbar.css';
import logoImg from '../../images/logo.png';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleNavbar = () => setToggleMenu(!toggleMenu);
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      
    } catch {
      toast.error("Failed to log out", {
        toastId: 'logoutErrorToast' 
      });
    }
  };

  const handleSavedBooksClick = () => {
    if (!currentUser) {
      toast.error("Login to display the saved books", {
        toastId: 'savedBooksToast' // Ensure unique ID for the toast
      });
      return;
    }
  };

  return (
    <nav className="navbar" id="navbar">
      <div className="container navbar-content flex">
        <div className="brand-and-toggler flex flex-sb">
          <Link to="/" className="navbar-brand flex">
            <img src={logoImg} alt="site logo" />
            <span className="text-uppercase fw-7 fs-24 ls-1">Book-Nest</span>
          </Link>
          <button type="button" className="navbar-toggler-btn" onClick={handleNavbar}>
            <HiOutlineMenuAlt3 size={35} style={{ color: `${toggleMenu ? '#fff' : '#010101'}` }} />
          </button>
        </div>

        <div className={toggleMenu ? 'navbar-collapse show-navbar-collapse' : 'navbar-collapse'}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink exact to="/" className="nav-link" activeClassName="active">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link" activeClassName="active">About</NavLink>
            </li>
            <SearchForm />
            <li className="nav-item">
              <NavLink to="/home/saved-books" className="nav-link" activeClassName="active" onClick={handleSavedBooksClick}>
                <FontAwesomeIcon icon={faBook} />
              </NavLink>
            </li>
            {currentUser && (
              <li className="nav-item">
                <button className="nav-link logout-btn" onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
