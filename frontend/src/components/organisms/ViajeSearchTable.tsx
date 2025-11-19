

import React, { useState } from 'react';
import { Button } from '../atoms/Button';
import { FormField } from '../molecules/FormField';
import { transportService } from '../../services/transport.service';
import type { Viaje } from '../../types';
import {
  Search,
  AlertCircle,
  MapPin,
  Clock,
  Calendar,
  Loader2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface ViajeSearchTableProps {
  
  refreshKey: number;
}

export const ViajeSearchTable: React.FC<ViajeSearchTableProps> = ({
  refreshKey,
}) => {
  const [placa, setPlaca] = useState('');
  const [viajes, setViajes] = useState<Viaje[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  // useEffect para resetear la búsqueda al crear un nuevo viaje
  React.useEffect(() => {
    setViajes([]);
    setPlaca('');
    setSearched(false);
    setError(null);
  }, [refreshKey]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!placa.trim()) {
      toast.error('Campo requerido', { description: 'Ingresa una placa' });
      return;
    }

    setLoading(true);
    setError(null);
    setSearched(true);
    setViajes([]);

    try {
      const data = await transportService.getViajesPorPlaca(placa);
      setViajes(data);
      
      if (data.length > 0) {
        toast.success(`${data.length} viaje(s) encontrado(s)`, {
          description: `Placa: ${placa}`,
        });
      } else {
        toast.info('Sin resultados', {
          description: `No hay viajes registrados para la placa ${placa}`,
        });
      }
    } catch (err: any) {
      const errorMsg =
        'Error al realizar la búsqueda. Asegúrate de que el token esté activo.';
      setError(errorMsg);
      toast.error('Error en búsqueda', { description: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card border border-border rounded-xl shadow-sm p-6 mt-8"
    >
      {}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Search className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Buscar Viajes</h2>
          <p className="text-sm text-muted-foreground">
            Filtra viajes por placa de carro
          </p>
        </div>
      </div>

      {}
      <form onSubmit={handleSearch} className="space-y-4 mb-6">
        <div className="flex gap-4 flex-col md:flex-row">
          <div className="flex-1">
            <FormField
              label="Placa a Buscar"
              type="text"
              value={placa}
              onChange={(e) => setPlaca(e.target.value.toUpperCase())}
              placeholder="Ej: ABC-1234"
              disabled={loading}
              required
              hint="Ingresa la placa para buscar viajes"
              autoComplete="off"
            />
          </div>
          <div className="flex items-end gap-2">
            <Button
              type="submit"
              isLoading={loading}
              size="lg"
              className="gap-2"
            >
              <Search className="w-4 h-4" />
              Buscar
            </Button>
          </div>
        </div>
      </form>

      {}
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30 mb-6"
        >
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-destructive">Error</h3>
            <p className="text-sm text-destructive/90 mt-0.5">{error}</p>
          </div>
        </motion.div>
      )}

      {}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-2" />
            <p className="text-muted-foreground font-medium">
              Buscando viajes...
            </p>
          </div>
        </div>
      )}

      {}
      {!loading && searched && viajes.length === 0 && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="inline-block p-3 bg-muted rounded-lg mb-3">
            <MapPin className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground font-medium">
            No se encontraron viajes
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            No hay viajes registrados para la placa <strong>{placa}</strong>
          </p>
        </motion.div>
      )}

      {}
      {viajes.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="overflow-x-auto rounded-lg border border-border"
        >
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
                  Origen
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Destino
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Duración
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Fecha
                </th>
              </tr>
            </thead>

            {}
            <tbody className="divide-y divide-border">
              {viajes.map((viaje: Viaje, index: number) => (
                <motion.tr
                  key={viaje.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    #{viaje.id}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                      {viaje.carro}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>Ciudad {viaje.ciudad_origen}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>Ciudad {viaje.ciudad_destino}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{viaje.tiempo_horas}h</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(viaje.fecha).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </motion.div>
  );
};