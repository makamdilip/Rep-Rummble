import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Dashboard from './pages/Dashboard'
import { AuthProvider } from './context/AuthContext'
import { ShimmerButton } from './components/ui/ShimmerButton'
import { Input } from './components/ui/Input'
import { Card } from './components/ui/Card'
import { GradientMesh } from './components/ui/GradientMesh'
import { OnboardingFlow } from './components/OnboardingFlow'
import { Toaster } from './components/ui/Toast'
import { Sparkles } from 'lucide-react'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem('rep_rumble_user')
    const hasSeenOnboarding = localStorage.getItem('rep_rumble_onboarding')

    if (savedUser) {
      setIsLoggedIn(true)
      setUserEmail(JSON.parse(savedUser).email)
    }

    if (!hasSeenOnboarding) {
      setShowOnboarding(true)
    }

    setLoading(false)
  }, [])

  const handleLogin = (email: string) => {
    const userData = {
      uid: Math.random().toString(36).substring(2, 11),
      email,
      displayName: email.split('@')[0],
      createdAt: new Date().toISOString(),
      streak: 0,
      totalXP: 0,
    }
    localStorage.setItem('rep_rumble_user', JSON.stringify(userData))
    setUserEmail(email)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('rep_rumble_user')
    localStorage.removeItem('rep_rumble_meals')
    localStorage.removeItem('rep_rumble_workouts')
    localStorage.removeItem('rep_rumble_challenges')
    setIsLoggedIn(false)
    setUserEmail('')
  }

  const handleOnboardingComplete = () => {
    localStorage.setItem('rep_rumble_onboarding', 'true')
    setShowOnboarding(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <GradientMesh />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10"
        >
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
              scale: { duration: 1.5, repeat: Infinity }
            }}
            className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
          />
          <p className="text-primary text-xl font-bold mt-4 animate-pulse">
            Loading Rep Rumble...
          </p>
        </motion.div>
      </div>
    )
  }

  if (showOnboarding && !isLoggedIn) {
    return (
      <>
        <GradientMesh />
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      </>
    )
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />
  }

  return (
    <AuthProvider>
      <div className="app min-h-screen bg-white relative">
        <GradientMesh />
        <Dashboard userEmail={userEmail} onLogout={handleLogout} />
        <Toaster position="top-right" />
      </div>
    </AuthProvider>
  )
}

function LoginScreen({ onLogin }: { onLogin: (email: string) => void }) {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      onLogin(email)
    }
  }

  const demoLogin = () => {
    onLogin('demo@reprumble.com')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 relative overflow-hidden">
      <GradientMesh />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card variant="glass" className="p-8 shadow-glass border-2 border-blue-grotto/20">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="text-center mb-8"
          >
            {/* Animated logo */}
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
              }}
              className="inline-block mb-4"
            >
              <div className="relative">
                <h1 className="text-6xl font-bold">
                  <span className="text-gradient bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-gradient">
                    Rep Rumble
                  </span>
                </h1>
                <motion.div
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [0.9, 1.1, 0.9],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 blur-xl -z-10 rounded-full"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-4xl mb-4 flex justify-center gap-2"
            >
              {['🍽️', '💪', '✨'].map((emoji, i) => (
                <motion.span
                  key={i}
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-navy text-base leading-relaxed"
            >
              AI-powered food tracking. Smart nutrition analysis.
              <br />
              <span className="text-primary font-semibold">
                Achieve your fitness goals faster.
              </span>
            </motion.p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
            <ShimmerButton
              type="submit"
              className="w-full h-12 text-base"
              shimmerDuration="3s"
            >
              Sign In
              <Sparkles size={18} />
            </ShimmerButton>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-navy/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-baby-blue text-navy">OR</span>
            </div>
          </div>

          <ShimmerButton
            onClick={demoLogin}
            className="w-full h-12 text-base"
            background="linear-gradient(135deg, #003a64 0%, #002844 100%)"
            shimmerDuration="2.5s"
          >
            <span className="mr-2">🎯</span>
            Try Demo (No Setup!)
          </ShimmerButton>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 space-y-3"
          >
            <div className="flex flex-wrap justify-center gap-3 text-xs">
              {[
                { icon: '🤖', text: 'AI Recognition' },
                { icon: '📊', text: 'Macro Tracking' },
                { icon: '📸', text: 'Photo Analysis' },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="px-3 py-2 bg-primary/10 border border-primary/30 rounded-full text-navy font-semibold"
                >
                  {feature.icon} {feature.text}
                </motion.div>
              ))}
            </div>
            <p className="text-center text-xs text-navy/60">
              Demo mode included - try it instantly!
            </p>
          </motion.div>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center text-navy/60 text-xs"
        >
          <p>Built for Gen Z fitness enthusiasts 💪</p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default App
