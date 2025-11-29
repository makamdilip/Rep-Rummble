import React from 'react'
import { cn } from '../../lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const baseStyles =
    "font-semibold rounded-lg transition-all duration-200 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  // Use the legacy CSS component classes defined in global styles so
  // they pick up theme variables (var(--...)) and dark mode.
  const variants: Record<string, string> = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    outline: "btn-outline",
    ghost: "btn-ghost",
  };

  const sizes: Record<string, string> = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant] ?? variants.primary,
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
