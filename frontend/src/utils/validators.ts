

import { VALIDATION_PATTERNS } from '../config/constants';

export const isValidPlate = (plate: string): boolean => {
  return VALIDATION_PATTERNS.PLATE.test(plate.trim().toUpperCase());
};

export const isValidDate = (date: string): boolean => {
  return VALIDATION_PATTERNS.DATE_FORMAT.test(date);
};

export const isNotEmpty = (value: string): boolean => {
  return value.trim().length > 0;
};

export const isPositive = (value: number): boolean => {
  return value > 0;
};

export const areDifferentCities = (origin: number, destination: number): boolean => {
  return origin !== destination && origin > 0 && destination > 0;
};

export const validateCarroForm = (
  plate: string,
  color: string,
  date: string
): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!isNotEmpty(plate)) {
    errors.plate = 'La placa es requerida';
  } else if (!isValidPlate(plate)) {
    errors.plate = 'La placa debe contener solo letras mayúsculas y números';
  }

  if (!isNotEmpty(color)) {
    errors.color = 'El color es requerido';
  }

  if (!isNotEmpty(date)) {
    errors.date = 'La fecha es requerida';
  } else if (!isValidDate(date)) {
    errors.date = 'Formato de fecha inválido (use YYYY-MM-DD)';
  }

  return errors;
};

export const validateViajeForm = (
  carro: number,
  origin: number,
  destination: number,
  hours: number,
  date: string
): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!isPositive(carro)) {
    errors.carro = 'Debes seleccionar un carro';
  }

  if (!areDifferentCities(origin, destination)) {
    errors.destination = 'El origen y destino deben ser diferentes';
  }

  if (!isPositive(hours)) {
    errors.hours = 'El tiempo debe ser mayor a 0 horas';
  }

  if (!isNotEmpty(date)) {
    errors.date = 'La fecha es requerida';
  } else if (!isValidDate(date)) {
    errors.date = 'Formato de fecha inválido';
  }

  return errors;
};
