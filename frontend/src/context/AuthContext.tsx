

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { AuthContextType } from '../types';
import { STORAGE_KEYS, UI_CONFIG } from '../config/constants';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Evita parpadeos al cargar

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (token: string) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    setIsAuthenticated(false);
  };

  // Mostrar pantalla de carga mientras se verifica autenticación
  if (loading) return <div>{UI_CONFIG.LOADING_APP_TEXT}</div>;

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};