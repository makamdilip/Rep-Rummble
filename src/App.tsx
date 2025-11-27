import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Dashboard from './pages/Dashboard'
import { AuthProvider } from './context/AuthContext'
import { Button } from './components/ui/Button'
import { Input } from './components/ui/Input'
import { Card } from './components/ui/Card'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('rep_rumble_user')
    if (savedUser) {
      setIsLoggedIn(true)
      setUserEmail(JSON.parse(savedUser).email)
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-primary text-2xl font-bold"
        >
          Loading Rep Rumble...
        </motion.div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />
  }

  return (
    <AuthProvider>
      <div className="app min-h-screen bg-dark">
        <Dashboard userEmail={userEmail} onLogout={handleLogout} />
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
    <div className="min-h-screen flex items-center justify-center bg-dark px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card variant="glass" className="p-8 shadow-glass">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl font-bold mb-2">
              <span className="text-gradient">Rep Rumble</span>
            </h1>
            <div className="text-4xl mb-4">🍽️💪✨</div>
            <p className="text-gray-400 text-sm leading-relaxed">
              AI-powered food tracking. Smart nutrition analysis.
              <br />
              Achieve your fitness goals faster.
            </p>
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
            <Button type="submit" className="w-full" size="lg">
              Sign In
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dark-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-dark-lighter text-gray-400">OR</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            size="lg"
            onClick={demoLogin}
          >
            <span className="mr-2">🎯</span>
            Try Demo (No Setup Needed!)
          </Button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 space-y-2"
          >
            <p className="text-center text-sm text-primary font-semibold">
              ✨ AI Food Recognition ✅ Calorie & Carb Tracking
            </p>
            <p className="text-center text-xs text-gray-500">
              Demo mode included - try it instantly!
            </p>
          </motion.div>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-center text-gray-500 text-xs"
        >
          <p>Built for Gen Z fitness enthusiasts</p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default App
