

import { useState } from 'react';
import { ViajeForm } from '../components/organisms/ViajeForm';
import { ViajeSearchTable } from '../components/organisms/ViajeSearchTable';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export const ViajesPage = () => {
  // Usamos una clave para forzar la limpieza del componente de búsqueda
  // después de crear un nuevo viaje, lo que es una buena práctica Mid-Level.
  const [searchKey, setSearchKey] = useState(0);

  const handleViajeSuccess = () => {
    // Al crear un viaje, incrementamos la clave para resetear la tabla de búsqueda
    setSearchKey((prev) => prev + 1);
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
            <MapPin className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Gestión de Viajes
            </h1>
            <p className="text-muted-foreground mt-1">
              Registra nuevos viajes o busca viajes por placa de vehículo
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
        <ViajeForm onSuccess={handleViajeSuccess} />

        {}
        <ViajeSearchTable refreshKey={searchKey} />
      </motion.div>
    </motion.div>
  );
};