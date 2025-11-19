import React from 'react';
import { Input } from '../atoms/Input';
import { AlertCircle } from 'lucide-react';

interface FormFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  hint,
  required,
  ...props
}) => {
  return (
    <div className="w-full space-y-2">
      <label className="block text-sm font-semibold text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>

      {hint && !error && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}

      <Input
        hasError={!!error}
        helperText={error}
        aria-invalid={!!error}
        aria-describedby={error ? `error-${label}` : undefined}
        {...props}
      />

      {error && (
        <div
          id={`error-${label}`}
          className="flex items-center gap-1.5 text-sm text-destructive font-medium animate-slide-up"
        >
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};