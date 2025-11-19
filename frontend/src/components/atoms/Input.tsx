import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  hasError?: boolean;
  helperText?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  hasError = false,
  helperText,
  prefix,
  suffix,
  className,
  ...props
}) => {
  const inputClasses = cn(
    'w-full px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200',
    hasError
      ? 'border-destructive focus:border-destructive bg-destructive/5'
      : 'border-input focus:border-primary bg-background',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    hasError ? 'focus:ring-destructive' : 'focus:ring-primary',
    'placeholder:text-muted-foreground',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-muted',
    prefix && 'pl-10',
    suffix && 'pr-10',
    className
  );

  return (
    <div className="relative w-full">
      {prefix && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
          {prefix}
        </div>
      )}

      <input className={inputClasses} {...props} />

      {suffix && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {suffix}
        </div>
      )}

      {helperText && (
        <p
          className={cn(
            'mt-1.5 text-sm font-medium',
            hasError ? 'text-destructive' : 'text-muted-foreground'
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};