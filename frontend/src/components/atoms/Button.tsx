import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  isLoading = false,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center gap-2';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const variantStyles = {
    primary:
      'bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-primary/50 focus:ring-primary dark:hover:bg-primary/80',
    secondary:
      'bg-secondary text-secondary-foreground hover:bg-secondary/90 disabled:bg-secondary/50 focus:ring-secondary',
    destructive:
      'bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:bg-destructive/50 focus:ring-destructive',
    outline:
      'border-2 border-primary text-primary hover:bg-primary/10 disabled:opacity-50 focus:ring-primary',
    ghost:
      'text-primary hover:bg-primary/10 disabled:opacity-50 focus:ring-primary',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const isDisabled = isLoading || disabled;

  return (
    <button
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        widthClass,
        isDisabled && 'cursor-not-allowed opacity-60',
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      <span>{children}</span>
    </button>
  );
};