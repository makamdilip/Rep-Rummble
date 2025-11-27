import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, Camera, Dumbbell, Trophy } from 'lucide-react'
import { useState } from 'react'

interface FABAction {
  icon: React.ReactNode
  label: string
  onClick: () => void
  color: string
}

interface FloatingActionButtonProps {
  onSnapPhoto?: () => void
  onLogWorkout?: () => void
  onViewLeaderboard?: () => void
}

export function FloatingActionButton({
  onSnapPhoto,
  onLogWorkout,
  onViewLeaderboard,
}: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const actions: FABAction[] = [
    {
      icon: <Camera size={20} />,
      label: 'Snap Meal',
      onClick: () => {
        onSnapPhoto?.()
        setIsOpen(false)
      },
      color: 'bg-primary hover:bg-primary-dark',
    },
    {
      icon: <Dumbbell size={20} />,
      label: 'Log Workout',
      onClick: () => {
        onLogWorkout?.()
        setIsOpen(false)
      },
      color: 'bg-secondary hover:bg-secondary-dark',
    },
    {
      icon: <Trophy size={20} />,
      label: 'Leaderboard',
      onClick: () => {
        onViewLeaderboard?.()
        setIsOpen(false)
      },
      color: 'bg-accent hover:bg-accent-dark',
    },
  ]

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-20 right-0 flex flex-col-reverse gap-4"
          >
            {actions.map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, y: 20, scale: 0 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={action.onClick}
                className={`group flex items-center gap-3 ${action.color} text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-glow-primary transition-all`}
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                {action.icon}
                <motion.span
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  className="font-semibold whitespace-nowrap overflow-hidden"
                >
                  {action.label}
                </motion.span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-16 h-16 bg-gradient-to-br from-primary via-accent to-secondary rounded-full shadow-2xl flex items-center justify-center text-white overflow-hidden group"
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 135 : 0 }}
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <Plus size={28} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Pulse ring effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-4 border-primary pointer-events-none"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeOut',
        }}
      />
    </div>
  )
}
