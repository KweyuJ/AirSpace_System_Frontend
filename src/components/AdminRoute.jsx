import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const isAuthenticated = !!localStorage.getItem('access_token');
  const userRole = localStorage.getItem('role');
  const location = useLocation();

  if (!isAuthenticated || userRole !== 'admin') {
    // Redirect to login page if not authenticated or not an admin
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render child routes if authenticated and admin
  return <Outlet />;
};

export default AdminRoute;
