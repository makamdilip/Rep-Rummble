import React from 'react'
import { cn } from '../../lib/utils'
import { motion } from 'framer-motion'

interface StatCardProps {
  label: string
  value: string | number
  icon?: React.ReactNode
  trend?: 'up' | 'down' | 'neutral'
  className?: string
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  trend,
  className
}) => {
  const trendColors = {
    up: 'text-primary',
    down: 'text-red-500',
    neutral: 'text-gray-400'
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn('stat-box', className)}
    >
      {icon && (
        <div className="flex justify-center mb-2 text-primary">
          {icon}
        </div>
      )}
      <p className="text-xs text-gray-400 mb-2">{label}</p>
      <p className={cn(
        'text-2xl font-bold',
        trend ? trendColors[trend] : 'text-primary'
      )}>
        {value}
      </p>
    </motion.div>
  )
}
