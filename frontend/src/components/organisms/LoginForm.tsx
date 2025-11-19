import React, { useState } from 'react';
import { FormField } from '../molecules/FormField';
import { Button } from '../atoms/Button';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { normalizeError, logError } from '../../utils/errorHandler';
import { ERROR_MESSAGES, ROUTES } from '../../config/constants';
import { LogIn, AlertCircle, Car } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await authService.login(username, password);
      login(data.token);
      toast.success('¡Bienvenido! Iniciando sesión...', {
        description: 'Redirigiendo al dashboard',
      });
      navigate(ROUTES.CARROS);
    } catch (err) {
      logError('LoginForm', err);
      const normalizedError = normalizeError(
        err,
        ERROR_MESSAGES.INVALID_CREDENTIALS
      );
      setError(normalizedError.message);
      toast.error('Error al iniciar sesión', {
        description: normalizedError.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        {}
        <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
          {}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 px-6 py-8 border-b border-border">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-primary/20 rounded-xl">
                <Car className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-center text-2xl font-bold text-foreground">
              TransportApp
            </h1>
            <p className="text-center text-sm text-muted-foreground mt-1">
              Gestión de transporte y viajes
            </p>
          </div>

          {}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30"
              >
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-destructive">Error de autenticación</h3>
                  <p className="text-sm text-destructive/90 mt-0.5">{error}</p>
                </div>
              </motion.div>
            )}

            {}
            <FormField
              label="Usuario"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu usuario"
              disabled={loading}
              required
              hint="Tu nombre de usuario para acceder"
              autoComplete="username"
            />

            {}
            <FormField
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              disabled={loading}
              required
              hint="Tu contraseña segura"
              autoComplete="current-password"
            />

            {}
            <Button
              type="submit"
              isLoading={loading}
              fullWidth
              size="lg"
              variant="primary"
              className="gap-2 mt-8"
            >
              <LogIn className="w-5 h-5" />
              Iniciar Sesión
            </Button>

            {}
            <p className="text-center text-xs text-muted-foreground">
              Credenciales demo: admin / admin
            </p>
          </form>
        </div>

        {}
        <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border">
          <p className="text-sm text-muted-foreground text-center">
            Tu sesión es segura. Los datos se comunican de forma encriptada.
          </p>
        </div>
      </motion.div>
    </div>
  );
};