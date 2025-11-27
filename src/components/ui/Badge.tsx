import React from 'react'
import { cn } from '../../lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'success' | 'warning' | 'info' | 'default'
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className
}) => {
  const variants = {
    success: "badge-success",
    warning: "badge-warning",
    info: "badge-info",
    default: "badge surface text-app",
  };

  return (
    <span className={cn(variants[variant], className)}>
      {children}
    </span>
  )
}
