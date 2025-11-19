

// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://127.0.0.1:8000/api/',
  TIMEOUT: 10000, // ms
} as const;

// LocalStorage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
} as const;

// HTTP Headers
export const HTTP_HEADERS = {
  CONTENT_TYPE: 'application/json',
  AUTHORIZATION_PREFIX: 'Token',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Usuario o contraseña incorrectos',
  TOKEN_EXPIRED: '¿Token expirado?',
  NETWORK_ERROR: 'Error de conexión. Intenta más tarde.',
  VALIDATION_ERROR: 'Error de validación. Revisa los datos.',
  DUPLICATE_PLATE: 'La placa ya existe en el sistema.',
  SAME_ORIGIN_DESTINATION: 'El origen y destino no pueden ser la misma ciudad.',
  REQUIRED_DATA: 'Se necesita al menos un carro y dos ciudades en el Backend.',
  UNKNOWN_ERROR: 'Error desconocido. Por favor intenta de nuevo.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Bienvenido al sistema',
  CARRO_CREATED: 'Carro registrado exitosamente',
  VIAJE_CREATED: 'Viaje registrado exitosamente',
  LOGOUT: 'Sesión cerrada correctamente',
} as const;

// Validation Patterns
export const VALIDATION_PATTERNS = {
  PLATE: /^[A-Z0-9]{1,10}$/, // Placa: Mayúsculas y números, máximo 10 caracteres
  DATE_FORMAT: /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD
} as const;

// Route Paths
export const ROUTES = {
  LOGIN: '/login',
  CARROS: '/carros',
  VIAJES: '/viajes',
  HOME: '/',
} as const;

// UI Configuration
export const UI_CONFIG = {
  LOADING_TEXT: 'Cargando...',
  LOADING_APP_TEXT: 'Cargando app...',
  LOADING_DATA_TEXT: 'Cargando datos base para el formulario de Viaje...',
  LOADING_CARROS_TEXT: 'Cargando lista de carros...',
  LOADING_VIAJES_TEXT: 'Buscando viajes...',
  NO_RECORDS: 'No hay registros',
  NO_VIAJES: 'No se encontraron viajes',
} as const;

// Time Configuration
export const TIME_CONFIG = {
  DEBOUNCE_MS: 300,
  THROTTLE_MS: 500,
} as const;
