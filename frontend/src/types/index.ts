

export interface Ciudad {
  id: number;
  nombre: string;
  activo: boolean;
}

export interface Carro {
  id: number;
  placa: string;
  color: string;
  fecha_ingreso: string;
}

export interface Viaje {
  id: number;
  carro: number;
  ciudad_origen: number;
  ciudad_destino: number;
  tiempo_horas: number;
  fecha: string;
}

export type CarroCreate = Omit<Carro, 'id'>;

export type ViajeCreate = Omit<Viaje, 'id'>;

export interface LoginResponse {
  token: string;
}

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export type ApiResult<T> = 
  | { status: 'success'; data: T }
  | { status: 'error'; error: ApiError };

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}