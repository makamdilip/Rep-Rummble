import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/Card'
import { Flame, Check } from 'lucide-react'

const SAMPLE_WORKOUTS = [
  { name: 'Push-ups', reps: 20, sets: 3, icon: '💪', duration: 10 },
  { name: 'Running', duration: 30, icon: '🏃' },
  { name: 'Plank', duration: 60, icon: '🧘' },
  { name: 'Squats', reps: 30, sets: 4, icon: '🦵', duration: 15 },
  { name: 'Cycling', duration: 45, icon: '🚴' },
  { name: 'Yoga', duration: 25, icon: '🧘‍♀️' },
]

interface Workout {
  name: string
  icon: string
  duration?: number
  reps?: number
  sets?: number
  timestamp?: string
  exercise?: string
}

export default function StreakTab() {
  const [loggedWorkout, setLoggedWorkout] = useState<Workout | null>(null)
  const [workouts, setWorkouts] = useState<Workout[]>(() => {
    const saved = localStorage.getItem('rep_rumble_workouts')
    return saved ? JSON.parse(saved) : []
  })
  const [streak, setStreak] = useState(() => {
    const userStr = localStorage.getItem('rep_rumble_user')
    if (userStr) {
      const user = JSON.parse(userStr)
      return user.streak || 0
    }
    return 0
  })

  const handleLogWorkout = (workout: Workout) => {
    setLoggedWorkout(workout)

    // Update streak
    const userStr = localStorage.getItem('rep_rumble_user')
    if (userStr) {
      const user = JSON.parse(userStr)
      user.streak = (user.streak || 0) + 1
      localStorage.setItem('rep_rumble_user', JSON.stringify(user))
      setStreak(user.streak)
    }

    const newWorkout = { ...workout, timestamp: new Date().toISOString(), exercise: workout.name }
    const newWorkouts = [...workouts, newWorkout]
    setWorkouts(newWorkouts)
    localStorage.setItem('rep_rumble_workouts', JSON.stringify(newWorkouts))
    setTimeout(() => setLoggedWorkout(null), 2500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-app flex items-center gap-2">
          <Flame className="text-secondary" size={32} />
          Workout Tracker
        </h2>
        <div className="text-center px-6 py-3 bg-secondary/20 border border-secondary rounded-lg">
          <p className="text-sm text-gray-400">Current Streak</p>
          <p className="text-3xl font-bold text-secondary flex items-center gap-1">
            {streak} <Flame size={24} />
          </p>
        </div>
      </div>

      <AnimatePresence>
        {loggedWorkout && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-secondary/20 border border-secondary rounded-lg p-4 flex items-center gap-3"
          >
            <Check className="text-secondary" size={24} />
            <div>
              <p className="text-app font-semibold">
                {loggedWorkout.icon} {loggedWorkout.name} logged!
              </p>
              <p className="text-sm text-gray-300">
                Streak increased! Keep it up! 🔥
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {SAMPLE_WORKOUTS.map((workout, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleLogWorkout(workout)}
            className="card p-6 cursor-pointer text-center hover:shadow-secondary/30 transition-all border-l-secondary"
          >
            <div className="text-6xl mb-3">{workout.icon}</div>
            <h3 className="text-lg font-semibold text-app mb-1">
              {workout.name}
            </h3>
            <p className="text-secondary font-medium">
              {workout.reps
                ? `${workout.reps} reps × ${workout.sets} sets`
                : `${workout.duration} min`}
            </p>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>📋 Today's Workouts ({workouts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {workouts.length > 0 ? (
            <div className="space-y-3">
              {workouts.map((workout, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex justify-between items-center p-3 surface rounded-lg border border-card"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{workout.icon}</span>
                    <div>
                      <p className="font-medium text-app">{workout.name}</p>
                      {workout.timestamp && (
                        <p className="text-xs text-gray-400">
                          {new Date(workout.timestamp).toLocaleTimeString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="text-secondary font-semibold">
                    {workout.reps
                      ? `${workout.reps}×${workout.sets}`
                      : `${workout.duration}min`}
                  </span>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">
              Click a workout to log it! 💪
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
