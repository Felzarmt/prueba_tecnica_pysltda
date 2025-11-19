import React, { useState } from 'react';
import { FormField } from '../molecules/FormField';
import { Button } from '../atoms/Button';
import { transportService } from '../../services/transport.service';
import { CarroCreate } from '../../types';
import { normalizeError, logError } from '../../utils/errorHandler';
import { ERROR_MESSAGES } from '../../config/constants';
import { Car, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';

interface CarroFormProps {
  onSuccess: () => void;
}

export const CarroForm: React.FC<CarroFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<CarroCreate>({
    placa: '',
    color: '',
    fecha_ingreso: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await transportService.createCarro(formData);
      setFormData({ placa: '', color: '', fecha_ingreso: '' });
      toast.success('¡Carro creado exitosamente!', {
        description: `Placa: ${formData.placa}`,
      });
      onSuccess();
    } catch (err) {
      logError('CarroForm.handleSubmit', err);
      const axiosError = err as AxiosError<Record<string, any>>;
      const normalizedError = normalizeError(
        err,
        ERROR_MESSAGES.UNKNOWN_ERROR
      );

      // Si es error de placa duplicada
      if (axiosError.response?.data?.placa) {
        const errorMsg = `${ERROR_MESSAGES.DUPLICATE_PLATE} ${axiosError.response.data.placa[0]}`;
        setError(errorMsg);
        toast.error('Placa duplicada', { description: errorMsg });
      } else {
        setError(normalizedError.message);
        toast.error('Error al crear carro', {
          description: normalizedError.message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

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
          <Car className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Crear Nuevo Carro</h2>
          <p className="text-sm text-muted-foreground">
            Registra un nuevo vehículo en el sistema
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            label="Placa"
            name="placa"
            type="text"
            value={formData.placa}
            onChange={handleChange}
            placeholder="Ej: ABC-1234"
            maxLength={10}
            disabled={loading}
            required
            hint="Identificador único del vehículo"
            autoComplete="off"
          />

          <FormField
            label="Color"
            name="color"
            type="text"
            value={formData.color}
            onChange={handleChange}
            placeholder="Ej: Rojo"
            disabled={loading}
            required
            hint="Color del vehículo"
            autoComplete="off"
          />

          <FormField
            label="Fecha de Ingreso"
            name="fecha_ingreso"
            type="date"
            value={formData.fecha_ingreso}
            onChange={handleChange}
            disabled={loading}
            required
            hint="Cuándo se registró el vehículo"
          />
        </div>

        {}
        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            onClick={() =>
              setFormData({ placa: '', color: '', fecha_ingreso: '' })
            }
          >
            Limpiar
          </Button>
          <Button
            type="submit"
            isLoading={loading}
            size="lg"
            className="gap-2"
          >
            <Car className="w-4 h-4" />
            Guardar Carro
          </Button>
        </div>
      </form>
    </motion.div>
  );
};