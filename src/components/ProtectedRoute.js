import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from '../contexts/storeContext';

const ProtectedRoute = ({ children, admin = false }) => {
  const { user } = useStore();
  const location = useLocation();
  if (!user || (admin && user.role !== 'admin')) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
};

export default ProtectedRoute;
