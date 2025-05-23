// src/hocs/withAuthRedirect.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';

export const withAuthRedirect = (Component) => {
  return (props) => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
      return <Navigate to="/auth" replace />;
    }

    return <Component {...props} />;
  };
};