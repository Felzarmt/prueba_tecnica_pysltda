

import React from 'react';
import type { Carro } from '../../types';
import { Button } from '../atoms/Button';
import { RefreshCw, Car, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface CarroTableProps {
  
  carros: Carro[];
  
  loading: boolean;
  
  error: string | null;
  
  onRefresh: () => void;
}

export const CarroTable: React.FC<CarroTableProps> = ({
  carros,
  loading,
  error,
  onRefresh,
}) => {
  // Estado de carga
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block p-3 bg-primary/10 rounded-lg mb-3">
            <RefreshCw className="w-8 h-8 text-primary animate-spin" />
          </div>
          <p className="text-muted-foreground font-medium">
            Cargando lista de carros...
          </p>
        </div>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-destructive/10 border border-destructive/30 rounded-lg p-6 flex gap-4"
      >
        <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-destructive">Error al cargar</h3>
          <p className="text-sm text-destructive/90 mt-1">{error}</p>
        </div>
      </motion.div>
    );
  }

  // Estado vacío
  if (carros.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="inline-block p-3 bg-muted rounded-lg mb-3">
          <Car className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground font-medium">
          No hay carros registrados
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Crea el primer carro para comenzar
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Car className="w-6 h-6 text-primary" />
            Listado de Carros
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Total: <span className="font-semibold text-foreground">{carros.length}</span> vehículos
          </p>
        </div>
        <Button
          onClick={onRefresh}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Recargar
        </Button>
      </div>

      {}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full">
          {}
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                Placa
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                Color
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                Fecha Ingreso
              </th>
            </tr>
          </thead>

          {}
          <tbody className="divide-y divide-border">
            {carros.map((carro: Carro, index: number) => (
              <motion.tr
                key={carro.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-muted/30 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-medium text-foreground">
                  #{carro.id}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                    <Car className="w-4 h-4" />
                    {carro.placa}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full border-2 border-border"
                      style={{
                        backgroundColor:
                          carro.color.toLowerCase() === 'rojo'
                            ? '#dc3545'
                            : carro.color.toLowerCase() === 'azul'
                              ? '#0056b3'
                              : carro.color.toLowerCase() === 'verde'
                                ? '#28a745'
                                : '#cccccc',
                      }}
                      title={carro.color}
                    />
                    <span className="font-medium">{carro.color}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {new Date(carro.fecha_ingreso).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};