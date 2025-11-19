

import React, { useState, useEffect, useCallback } from 'react';
import { FormField } from '../molecules/FormField';
import { Button } from '../atoms/Button';
import { transportService } from '../../services/transport.service';
import { normalizeError, logError } from '../../utils/errorHandler';
import { ERROR_MESSAGES, UI_CONFIG } from '../../config/constants';
import type { ViajeCreate, Carro, Ciudad } from '../../types';
import { MapPin, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { cn } from '../../utils/cn';
import type { AxiosError } from 'axios';

interface ViajeFormProps {
  
  onSuccess: () => void;
}

export const ViajeForm: React.FC<ViajeFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<ViajeCreate>({
    carro: 0,
    ciudad_origen: 0,
    ciudad_destino: 0,
    tiempo_horas: 0,
    fecha: '',
  });
  const [carros, setCarros] = useState<Carro[]>([]);
  const [ciudades, setCiudades] = useState<Ciudad[]>([]);

  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState('');

  const loadDependencies = useCallback(async () => {
    setDataLoading(true);
    try {
      const [carrosData, ciudadesData] = await Promise.all([
        transportService.getCarros(),
        transportService.getCiudades(),
      ]);
      setCarros(carrosData);
      setCiudades(ciudadesData.filter((c) => c.activo)); // Solo ciudades activas
    } catch (err) {
      logError('ViajeForm.loadDependencies', err);
      setError(ERROR_MESSAGES.NETWORK_ERROR);
      toast.error('Error al cargar datos', {
        description: 'No se pudieron cargar carros o ciudades',
      });
    } finally {
      setDataLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDependencies();
  }, [loadDependencies]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      // Si el campo es numérico, lo convertimos
      [name]:
        name === 'tiempo_horas' ||
        name === 'carro' ||
        name.includes('ciudad')
          ? Number(value)
          : value,
    });
    setError(''); // Limpiar error al cambiar valores
  };

  const validateCities = (): boolean => {
    if (formData.ciudad_origen === formData.ciudad_destino) {
      setError(ERROR_MESSAGES.SAME_ORIGIN_DESTINATION);
      toast.error('Ciudades inválidas', {
        description: 'El origen y destino no pueden ser iguales',
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!validateCities()) {
        setLoading(false);
        return;
      }

      await transportService.createViaje(formData);

      setFormData({
        carro: 0,
        ciudad_origen: 0,
        ciudad_destino: 0,
        tiempo_horas: 0,
        fecha: '',
      });
      
      toast.success('¡Viaje registrado exitosamente!', {
        description: 'El viaje se ha añadido al sistema',
      });
      onSuccess();
    } catch (err) {
      logError('ViajeForm.handleSubmit', err);
      const axiosError = err as AxiosError<Record<string, any>>;
      const normalizedError = normalizeError(
        err,
        ERROR_MESSAGES.UNKNOWN_ERROR
      );

      if (axiosError.response?.data?.tiempo_horas) {
        setError(`Validación: ${axiosError.response.data.tiempo_horas[0]}`);
      } else if (
        axiosError.response?.data?.carro ||
        axiosError.response?.data?.ciudad_origen
      ) {
        setError(ERROR_MESSAGES.VALIDATION_ERROR);
      } else {
        setError(normalizedError.message);
      }

      toast.error('Error al registrar viaje', {
        description: error || normalizedError.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // Estado de carga inicial
  if (dataLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-2" />
          <p className="text-muted-foreground font-medium">{UI_CONFIG.LOADING_DATA_TEXT}</p>
        </div>
      </div>
    );
  }

  // Validación de datos disponibles
  if (ciudades.length === 0 || carros.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-warning/10 border border-warning/30 rounded-lg p-6 flex gap-4"
      >
        <AlertCircle className="w-6 h-6 text-warning flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-warning">Datos insuficientes</h3>
          <p className="text-sm text-warning/90 mt-1">
            {ERROR_MESSAGES.REQUIRED_DATA}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card border border-border rounded-xl shadow-sm p-6 mb-8"
    >
      {}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <MapPin className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Registrar Nuevo Viaje</h2>
          <p className="text-sm text-muted-foreground">
            Crea un viaje entre dos ciudades
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30"
          >
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-destructive">Error</h3>
              <p className="text-sm text-destructive/90 mt-0.5">{error}</p>
            </div>
          </motion.div>
        )}

        {}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-foreground">
              Carro <span className="text-destructive">*</span>
            </label>
            <select
              name="carro"
              value={formData.carro}
              onChange={handleChange}
              required
              disabled={loading}
              className={cn(
                'w-full px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200',
                'border-input focus:border-primary bg-background',
                'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
                'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-muted'
              )}
            >
              <option value={0}>Seleccione un carro</option>
              {carros.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.placa} ({c.color})
                </option>
              ))}
            </select>
          </div>

          {}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-foreground">
              Origen <span className="text-destructive">*</span>
            </label>
            <select
              name="ciudad_origen"
              value={formData.ciudad_origen}
              onChange={handleChange}
              required
              disabled={loading}
              className={cn(
                'w-full px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200',
                'border-input focus:border-primary bg-background',
                'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
                'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-muted'
              )}
            >
              <option value={0}>Seleccione ciudad origen</option>
              {ciudades.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>

          {}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-foreground">
              Destino <span className="text-destructive">*</span>
            </label>
            <select
              name="ciudad_destino"
              value={formData.ciudad_destino}
              onChange={handleChange}
              required
              disabled={loading}
              className={cn(
                'w-full px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200',
                'border-input focus:border-primary bg-background',
                'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
                'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-muted'
              )}
            >
              <option value={0}>Seleccione ciudad destino</option>
              {ciudades.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>

          {}
          <FormField
            label="Tiempo (Horas)"
            name="tiempo_horas"
            type="number"
            min={1}
            value={formData.tiempo_horas === 0 ? '' : formData.tiempo_horas}
            onChange={handleChange}
            disabled={loading}
            required
            hint="Duración del viaje en horas"
            autoComplete="off"
          />

          {}
          <FormField
            label="Fecha"
            name="fecha"
            type="date"
            value={formData.fecha}
            onChange={handleChange}
            disabled={loading}
            required
            hint="Fecha del viaje"
          />
        </div>

        {}
        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            onClick={() =>
              setFormData({
                carro: 0,
                ciudad_origen: 0,
                ciudad_destino: 0,
                tiempo_horas: 0,
                fecha: '',
              })
            }
          >
            Limpiar
          </Button>
          <Button type="submit" isLoading={loading} size="lg" className="gap-2">
            <MapPin className="w-4 h-4" />
            Registrar Viaje
          </Button>
        </div>
      </form>
    </motion.div>
  );
};