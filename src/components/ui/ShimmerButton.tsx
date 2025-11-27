import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface ShimmerButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export function ShimmerButton({
  className,
  children,
  onClick,
  disabled,
  type = "button",
}: ShimmerButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative overflow-hidden px-6 py-3 font-semibold text-white transition-all duration-300 rounded-lg",
        className
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-13deg)_translateX(100%)] animate-shimmer">
        <div className="relative h-full w-10 shimmer-blob" />
      </div>
    </motion.button>
  );
}
