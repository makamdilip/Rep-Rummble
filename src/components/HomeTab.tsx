import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card'
import { StatCard } from './ui/StatCard'
import { Flame, Utensils, Dumbbell, Zap } from 'lucide-react'

interface Meal {
  name: string
  calories: number
  timestamp?: string
}

interface Workout {
  exercise: string
  duration: number
  timestamp?: string
}

export default function HomeTab() {
  const [meals, setMeals] = useState<Meal[]>([])
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    const savedMeals = localStorage.getItem('rep_rumble_meals')
    const savedWorkouts = localStorage.getItem('rep_rumble_workouts')
    const userStr = localStorage.getItem('rep_rumble_user')

    setMeals(savedMeals ? JSON.parse(savedMeals) : [])
    setWorkouts(savedWorkouts ? JSON.parse(savedWorkouts) : [])
    if (userStr) {
      const user = JSON.parse(userStr)
      setStreak(user.streak || 0)
    }
  }, [])

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="text-primary">📊</span>
          Daily Summary
        </h2>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard
          icon={<Flame size={24} />}
          label="Current Streak"
          value={streak}
          trend="up"
        />
        <StatCard
          icon={<Utensils size={24} />}
          label="Meals Logged"
          value={meals.length}
        />
        <StatCard
          icon={<Dumbbell size={24} />}
          label="Workouts"
          value={workouts.length}
        />
        <StatCard
          icon={<Zap size={24} />}
          label="Total Calories"
          value={totalCalories}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Utensils className="text-primary" size={20} />
              Recent Meals
            </CardTitle>
          </CardHeader>
          <CardContent>
            {meals.length > 0 ? (
              <div className="space-y-3">
                {meals.slice(-3).reverse().map((meal, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex justify-between items-center p-3 bg-dark rounded-lg border border-dark-border hover:border-primary transition-colors"
                  >
                    <div>
                      <p className="font-medium text-white">{meal.name}</p>
                      {meal.timestamp && (
                        <p className="text-xs text-gray-400">
                          {new Date(meal.timestamp).toLocaleTimeString()}
                        </p>
                      )}
                    </div>
                    <span className="text-primary font-semibold">
                      {meal.calories} kcal
                    </span>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">
                No meals logged yet. Start by snapping a photo! 📸
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Dumbbell className="text-primary" size={20} />
              Recent Workouts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {workouts.length > 0 ? (
              <div className="space-y-3">
                {workouts.slice(-3).reverse().map((workout, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex justify-between items-center p-3 bg-dark rounded-lg border border-dark-border hover:border-primary transition-colors"
                  >
                    <div>
                      <p className="font-medium text-white">{workout.exercise}</p>
                      {workout.timestamp && (
                        <p className="text-xs text-gray-400">
                          {new Date(workout.timestamp).toLocaleTimeString()}
                        </p>
                      )}
                    </div>
                    <span className="text-primary font-semibold">
                      {workout.duration} min
                    </span>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">
                No workouts logged yet. Start tracking! 💪
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
