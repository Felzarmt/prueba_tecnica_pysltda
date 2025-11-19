

import { LoginForm } from '../components/organisms/LoginForm';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export const LoginPage = () => {
  const { isAuthenticated } = useAuth();

  // Si ya estoy logueado, no debo ver el login, me manda directo a carros
  if (isAuthenticated) {
    return <Navigate to="/carros" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center">
      <LoginForm />
    </div>
  );
};