import React from 'react';
import Navbar from '../Navbar/Navbar';
import { useAuth } from '../../context/AuthContext';
import '../Header/Header.css';  

const Header = ({ showSearch }) => {
  const { loginWithGoogle, currentUser } = useAuth();

  return (
    <div className="header-holder">
      <header className="header-container">
        <Navbar />
        <div className="header-content-wrapper flex flex-c text-center text-white">
          <h2 className="header-main-title text-capitalize">Find your book of choice.</h2>
          <p className="header-subtext fs-18 fw-3">Among 1000's of books and novels.</p>
          {!currentUser && (
            <button className="header-login-btn" onClick={loginWithGoogle}>
              Login with Google !
            </button>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
