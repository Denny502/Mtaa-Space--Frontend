import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const result = await api.login({ email, password });
    
    if (result.success) {
      const userData = result.data?.user || result.user;
      setUser(userData);
      return { success: true, user: userData };
    } else {
      return { success: false, error: result.error };
    }
  };

  const signup = async (userData) => {
    const result = await api.signup(userData);
    
    if (result.success) {
      const userData = result.data?.user || result.user;
      setUser(userData);
      return { success: true, user: userData };
    } else {
      return { success: false, error: result.error };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};