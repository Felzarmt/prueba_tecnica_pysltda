

import { AxiosError } from 'axios';
import { ERROR_MESSAGES } from '../config/constants';

export interface NormalizedError {
  message: string;
  field?: string;
  status?: number;
}

export const normalizeError = (
  error: unknown,
  fallbackMessage: string = ERROR_MESSAGES.UNKNOWN_ERROR
): NormalizedError => {
  // Manejar AxiosError (respuestas HTTP)
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const data = error.response?.data as Record<string, any>;

    // Errores de validación del backend (400)
    if (status === 400 && data) {
      const firstErrorKey = Object.keys(data)[0];
      const firstErrorValue = data[firstErrorKey];
      
      // Si es un array de errores, tomar el primero
      const message = Array.isArray(firstErrorValue)
        ? firstErrorValue[0]
        : firstErrorValue;

      return {
        message,
        field: firstErrorKey,
        status,
      };
    }

    // Errores de autenticación (401)
    if (status === 401) {
      return {
        message: ERROR_MESSAGES.INVALID_CREDENTIALS,
        status,
      };
    }

    // Errores genéricos del servidor
    if (status && status >= 500) {
      return {
        message: 'Error del servidor. Por favor intenta más tarde.',
        status,
      };
    }

    // Error de conexión
    if (error.code === 'ERR_NETWORK') {
      return {
        message: ERROR_MESSAGES.NETWORK_ERROR,
      };
    }
  }

  // Manejar errores regulares de JavaScript
  if (error instanceof Error) {
    return {
      message: error.message || fallbackMessage,
    };
  }

  // Manejar errores genéricos
  return {
    message: String(error) || fallbackMessage,
  };
};

export const getFieldError = (error: AxiosError, field: string): string | null => {
  const data = error.response?.data as Record<string, any>;
  if (!data || !data[field]) return null;

  const fieldError = data[field];
  return Array.isArray(fieldError) ? fieldError[0] : fieldError;
};

export const logError = (context: string, error: unknown): void => {
  // En ambiente de desarrollo, mostrar errores en consola
  const isDev = import.meta.env.MODE === 'development';
  if (isDev) {
    console.error(`[${context}]`, error);
  }
};

export const isValidationError = (error: AxiosError): boolean => {
  return error.response?.status === 400;
};

export const isAuthError = (error: AxiosError): boolean => {
  return error.response?.status === 401;
};
