import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, fitnessAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('fitforge_token') || null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, my-plan, workout, nutrition, progress, ai-coach, checkin, profile, settings
  const [units, setUnits] = useState({ weight: 'kg', height: 'cm' });
  const [theme, setTheme] = useState(localStorage.getItem('fitforge_theme') || 'dark');

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const userData = await authAPI.getMe();
          setUser(userData);
          if (userData.weightUnit) setUnits(prev => ({ ...prev, weight: userData.weightUnit }));
          if (userData.heightUnit) setUnits(prev => ({ ...prev, height: userData.heightUnit }));
        } catch (error) {
          console.error('Auto login failed:', error);
          localStorage.removeItem('fitforge_token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, [token]);

  const login = async (email, password) => {
    const data = await authAPI.login({ email, password });
    localStorage.setItem('fitforge_token', data.token);
    setToken(data.token);
    setUser(data);
    return data;
  };

  const googleLogin = async () => {
    const data = await authAPI.googleLogin();
    localStorage.setItem('fitforge_token', data.token);
    setToken(data.token);
    setUser(data);
    return data;
  };

  const register = async (userData) => {
    const data = await authAPI.register(userData);
    localStorage.setItem('fitforge_token', data.token);
    setToken(data.token);
    setUser(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('fitforge_token');
    setToken(null);
    setUser(null);
    setActiveTab('dashboard');
  };

  const updateUser = (updatedUser) => {
    setUser(prev => ({ ...prev, ...updatedUser }));
  };

  const toggleUnitWeight = () => {
    setUnits(prev => ({ ...prev, weight: prev.weight === 'kg' ? 'lbs' : 'kg' }));
  };

  const toggleUnitHeight = () => {
    setUnits(prev => ({ ...prev, height: prev.height === 'cm' ? 'ft' : 'cm' }));
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('fitforge_theme', nextTheme);
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      googleLogin,
      register,
      logout,
      updateUser,
      activeTab,
      setActiveTab,
      units,
      toggleUnitWeight,
      toggleUnitHeight,
      theme,
      toggleTheme
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
