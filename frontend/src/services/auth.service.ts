

import api from '../api/axios';
import { LoginResponse } from '../types';

export const authService = {
  
  login: async (username: string, password: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/login/', { username, password });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};