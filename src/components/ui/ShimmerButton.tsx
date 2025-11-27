import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface ShimmerButtonProps {
  shimmerColor?: string
  shimmerSize?: string
  borderRadius?: string
  shimmerDuration?: string
  background?: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export function ShimmerButton({
  shimmerColor = '#ffffff',
  borderRadius = '100px',
  shimmerDuration = '2s',
  background = 'linear-gradient(135deg, #54a2d2 0%, #3d8ab8 100%)',
  className,
  children,
  onClick,
  disabled,
  type = 'button',
}: ShimmerButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        background,
        borderRadius,
      }}
      className={cn(
        'group relative overflow-hidden px-6 py-3 font-semibold text-white transition-all duration-300',
        className
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <div
        className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-13deg)_translateX(100%)]"
        style={{
          animation: `shimmer ${shimmerDuration} infinite`,
        }}
      >
        <div
          className="relative h-full w-10 bg-white/30"
          style={{
            boxShadow: `0 0 30px 15px ${shimmerColor}`,
            filter: 'blur(8px)',
          }}
        />
      </div>
    </motion.button>
  )
}
