import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header/Header';
import LandingHeader from '../../components/Header/LandingHeader';

import './LandingPage.css';

const LandingPage = () => {
  const { currentUser } = useAuth();

  return (
    <div className="landing-page">
      {currentUser ? <Header /> : <LandingHeader />}
      <div className="landing-content">
        
      </div>
    </div>
  );
};

export default LandingPage;
