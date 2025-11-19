

import { useState, useEffect, useCallback } from 'react';
import { CarroForm } from '../components/organisms/CarroForm';
import { CarroTable } from '../components/organisms/CarroTable';
import { transportService } from '../services/transport.service';
import type { Carro } from '../types';
import { motion } from 'framer-motion';
import { Car } from 'lucide-react';

export const CarrosPage = () => {
  const [carros, setCarros] = useState<Carro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCarros = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await transportService.getCarros();
      setCarros(data);
    } catch (err: any) {
      setError('Error al cargar la lista. ¿Token expirado?');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCarros();
  }, [fetchCarros]);

  const handleRefetch = () => {
    fetchCarros();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Car className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Gestión de Carros
            </h1>
            <p className="text-muted-foreground mt-1">
              Crea, visualiza y administra todos los vehículos del sistema
            </p>
          </div>
        </div>
      </motion.div>

      {}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        {}
        <CarroForm onSuccess={handleRefetch} />

        {}
        <CarroTable
          carros={carros}
          loading={loading}
          error={error}
          onRefresh={handleRefetch}
        />
      </motion.div>
    </motion.div>
  );
};