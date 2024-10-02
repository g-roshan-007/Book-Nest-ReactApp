/* src/components/Header/Header.jsx */
import React from 'react';
import Navbar from '../Navbar/Navbar';
import { useAuth } from '../../context/AuthContext';
import '../Header/LandingHeader.css';

const Header = ({ showSearch }) => {
  const { loginWithGoogle, currentUser } = useAuth();

  return (
    <div className="holder">
      <header className="header">
        <Navbar />
        <div className="header-content flex flex-c text-center text-white">
          <h2 className="header-title text-capitalize">Find your book of choice.</h2>
          <p className="header-text fs-18 fw-3">Among 1000's of books and novels.</p>
          {!currentUser && (
            <button className="login-btn" onClick={loginWithGoogle}>
              Login with Google !
            </button>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
