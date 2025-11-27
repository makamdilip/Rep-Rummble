import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Dumbbell, Trophy, Sparkles, ArrowRight, Check } from 'lucide-react'
import { ShimmerButton } from './ui/ShimmerButton'

interface OnboardingFlowProps {
  onComplete: () => void
}

const steps = [
  {
    title: 'AI-Powered Food Tracking',
    description: 'Snap a photo of your meal and let AI calculate calories, carbs, protein & fat instantly',
    icon: Camera,
    gradient: 'from-primary to-accent',
    features: ['📸 Instant photo analysis', '🤖 AI nutrition calculation', '📊 Complete macro breakdown'],
  },
  {
    title: 'Smart Workout Logging',
    description: 'Track your exercises, build streaks, and watch your progress soar',
    icon: Dumbbell,
    gradient: 'from-secondary to-primary',
    features: ['💪 Multiple workout types', '🔥 Streak counter', '📈 Progress tracking'],
  },
  {
    title: 'Compete & Achieve',
    description: 'Join leaderboards, earn achievements, and dominate with friends',
    icon: Trophy,
    gradient: 'from-accent to-secondary',
    features: ['🏆 Weekly leaderboards', '🎖️ Achievement badges', '👥 Social challenges'],
  },
]

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [direction, setDirection] = useState(0)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1)
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const step = steps[currentStep]
  const Icon = step.icon

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-app/95 backdrop-blur-xl">
      <div className="max-w-2xl w-full px-8">
        {/* Progress indicators */}
        <div className="flex justify-center gap-2 mb-12">
          {steps.map((_, index) => (
            <motion.div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? "w-12 bg-primary"
                  : index < currentStep
                  ? "w-8 bg-primary/50"
                  : "w-8 muted"
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative h-[500px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute inset-0"
            >
              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className={`mb-8 relative`}
                >
                  <div
                    className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-2xl`}
                  >
                    <Icon size={48} className="text-white" />
                  </div>
                  <motion.div
                    className={`absolute -inset-4 rounded-3xl bg-gradient-to-br ${step.gradient} opacity-20 blur-2xl -z-10`}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl font-bold text-app mb-4 flex items-center gap-3"
                >
                  {step.title}
                  <Sparkles className="text-primary" size={24} />
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-gray-300 mb-8 max-w-md"
                >
                  {step.description}
                </motion.p>

                {/* Features */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-3 mb-12"
                >
                  {step.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-3 text-gray-200"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <Check size={14} className="text-primary" />
                      </div>
                      {feature}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mt-12">
          <button
            onClick={handleSkip}
            className="text-gray-400 hover:text-app transition-colors"
          >
            Skip
          </button>

          <ShimmerButton onClick={handleNext} className="min-w-[140px]">
            {currentStep === steps.length - 1 ? (
              <>
                Get Started
                <Sparkles size={18} />
              </>
            ) : (
              <>
                Next
                <ArrowRight size={18} />
              </>
            )}
          </ShimmerButton>
        </div>
      </div>
    </div>
  );
}
