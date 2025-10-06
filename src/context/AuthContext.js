import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, authFetch } from '../services/api';

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

  // ✅ Add this computed property
  const isAuthenticated = !!user;

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await authFetch(api.auth.me);
        if (response.ok) {
          const result = await response.json();
          console.log('🔐 Auth check response:', result);
          
          // ✅ FIX: Set user data properly
          setUser(result.data || result.user || result);
        } else {
          console.log('❌ Auth check failed, clearing token');
          localStorage.removeItem('token');
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      console.log('🔐 Attempting login for:', email);
      
      const response = await fetch(api.auth.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      console.log('🔐 Login response:', result);

      if (!response.ok) {
        throw new Error(result.message || 'Login failed');
      }

      // ✅ FIX: Handle different response structures
      const token = result.token || result.data?.token;
      const userData = result.user || result.data?.user || result.data;

      if (!token || !userData) {
        throw new Error('Invalid response from server');
      }

      localStorage.setItem('token', token);
      setUser(userData);
      
      console.log('✅ Login successful, user set:', userData);
      return { success: true, user: userData };
      
    } catch (error) {
      console.error('❌ Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const signup = async (userData) => {
    try {
      console.log('👤 Attempting signup for:', userData.email);
      
      const response = await fetch(api.auth.signup, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      console.log('👤 Signup response:', result);

      if (!response.ok) {
        throw new Error(result.message || 'Signup failed');
      }

      // ✅ FIX: Handle different response structures
      const token = result.token || result.data?.token;
      const userDataResponse = result.user || result.data?.user || result.data;

      if (!token || !userDataResponse) {
        throw new Error('Invalid response from server');
      }

      localStorage.setItem('token', token);
      setUser(userDataResponse);
      
      console.log('✅ Signup successful, user set:', userDataResponse);
      return { success: true, user: userDataResponse };
      
    } catch (error) {
      console.error('❌ Signup error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    console.log('🚪 Logging out user');
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    isAuthenticated // ✅ Add this
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};