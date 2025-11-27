import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface SkeletonProps {
  className?: string
  variant?: 'default' | 'circular' | 'rectangular' | 'text'
  animation?: 'pulse' | 'wave' | 'shimmer'
}

export function Skeleton({
  className,
  variant = 'default',
  animation = 'shimmer',
}: SkeletonProps) {
  const baseStyles = 'bg-dark-lighter/50 backdrop-blur-sm'

  const variantStyles = {
    default: 'rounded-lg',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    text: 'rounded h-4',
  }

  return (
    <motion.div
      className={cn(
        baseStyles,
        variantStyles[variant],
        animation === 'shimmer' && 'relative overflow-hidden',
        className
      )}
      animate={
        animation === 'pulse'
          ? { opacity: [0.5, 1, 0.5] }
          : animation === 'wave'
          ? { backgroundPosition: ['200% 0', '-200% 0'] }
          : undefined
      }
      transition={
        animation === 'pulse'
          ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
          : animation === 'wave'
          ? { duration: 2, repeat: Infinity, ease: 'linear' }
          : undefined
      }
    >
      {animation === 'shimmer' && (
        <motion.div
          className="absolute inset-0 -translate-x-full"
          animate={{
            translateX: ['100%', '100%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(0, 255, 136, 0.1), transparent)',
          }}
        />
      )}
    </motion.div>
  )
}

export function MealCardSkeleton() {
  return (
    <div className="p-4 bg-dark-glass rounded-xl border border-white/5 space-y-3">
      <div className="flex gap-4">
        <Skeleton variant="circular" className="w-20 h-20" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" className="w-3/4" />
          <Skeleton variant="text" className="w-1/2" />
          <div className="flex gap-2">
            <Skeleton variant="text" className="w-20" />
            <Skeleton variant="text" className="w-20" />
            <Skeleton variant="text" className="w-20" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function StatCardSkeleton() {
  return (
    <div className="card-glass p-6 space-y-3">
      <Skeleton variant="circular" className="w-12 h-12" />
      <Skeleton variant="text" className="w-24" />
      <Skeleton variant="text" className="w-16 h-8" />
    </div>
  )
}
