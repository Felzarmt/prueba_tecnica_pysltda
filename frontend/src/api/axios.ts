

import axios, { AxiosError } from 'axios';
import { API_CONFIG, STORAGE_KEYS, HTTP_HEADERS } from '../config/constants';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': HTTP_HEADERS.CONTENT_TYPE,
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  if (token) {
    config.headers.Authorization = `${HTTP_HEADERS.AUTHORIZATION_PREFIX} ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Si es error 401 (no autorizado), podrías hacer logout automático aquí
    if (error.response?.status === 401) {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      // Aquí podrías disparar un evento para hacer logout
    }
    return Promise.reject(error);
  }
);

export default api;