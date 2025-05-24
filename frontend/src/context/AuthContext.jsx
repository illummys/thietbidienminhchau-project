import React, { createContext, useContext, useState } from 'react';
import api from '../api/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('ADMIN_TOKEN'));

  // Trả về true/false để login component dễ xử lý
  const login = async (username, password) => {
    try {
      const { data } = await api.post('/admin/auth/login', { username, password });
      localStorage.setItem('ADMIN_TOKEN', data.token);
      setToken(data.token);
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('ADMIN_TOKEN');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);