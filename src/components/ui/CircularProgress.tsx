import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface CircularProgressProps {
  value: number
  max?: number
  size?: number
  strokeWidth?: number
  className?: string
  showValue?: boolean
  color?: string
  label?: string
}

export function CircularProgress({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  className,
  showValue = true,
  color = '#00FF88',
  label,
}: CircularProgressProps) {
  const percentage = Math.min((value / max) * 100, 100)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        className
      )}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            strokeDasharray: circumference,
            filter: `drop-shadow(0 0 8px ${color}40)`,
          }}
        />
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="text-2xl font-bold text-app"
          >
            {Math.round(percentage)}%
          </motion.span>
          {label && <span className="text-xs text-gray-400 mt-1">{label}</span>}
        </div>
      )}
    </div>
  );
}
