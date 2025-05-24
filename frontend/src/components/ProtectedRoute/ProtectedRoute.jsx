import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    // chưa login → redirect tới login, lưu lại đường dẫn hiện tại
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
