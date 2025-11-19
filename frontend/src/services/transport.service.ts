

import api from '../api/axios';
import { Carro, Viaje, Ciudad, CarroCreate, ViajeCreate } from '../types';

export const transportService = {
  
  getCarros: async (): Promise<Carro[]> => {
    const response = await api.get<Carro[]>('/carros/');
    return response.data;
  },

  createCarro: async (data: CarroCreate): Promise<Carro> => {
    const response = await api.post<Carro>('/carros/', data);
    return response.data;
  },

  getViajesPorPlaca: async (placa: string): Promise<Viaje[]> => {
    const response = await api.get<Viaje[]>(`/viajes/?placa=${placa}`);
    return response.data;
  },

  createViaje: async (data: ViajeCreate): Promise<Viaje> => {
    const response = await api.post<Viaje>('/viajes/', data);
    return response.data;
  },

  getCiudades: async (): Promise<Ciudad[]> => {
    const response = await api.get<Ciudad[]>('/ciudades/');
    return response.data;
  },
};