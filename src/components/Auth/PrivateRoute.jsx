/* src/components/Auth/PrivateRoute.jsx */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/" />;
};

export default PrivateRoute;
