import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card'
import { StatCard } from './ui/StatCard'
import { Flame, Utensils, Dumbbell, Zap, TrendingUp, Target } from 'lucide-react'
import { NutritionCard } from './NutritionCard'

interface Meal {
  name?: string
  foodName?: string
  calories: number
  carbs?: number
  protein?: number
  fat?: number
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
  const totalCarbs = meals.reduce((sum, meal) => sum + (meal.carbs || 0), 0)
  const totalProtein = meals.reduce((sum, meal) => sum + (meal.protein || 0), 0)
  const totalFat = meals.reduce((sum, meal) => sum + (meal.fat || 0), 0)

  const dailyGoals = {
    calories: 2200,
    carbs: 275,
    protein: 138,
    workouts: 1,
  }

  const calorieProgress = Math.min((totalCalories / dailyGoals.calories) * 100, 100)
  const workoutProgress = Math.min((workouts.length / dailyGoals.workouts) * 100, 100)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <span className="text-4xl">📊</span>
            <span className="text-gradient">Daily Dashboard</span>
          </h2>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="px-4 py-2 bg-primary/10 border border-primary rounded-full"
          >
            <span className="text-primary font-bold">{streak} Day Streak 🔥</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Flame size={24} />}
          label="Current Streak"
          value={streak}
          trend="up"
        />
        <StatCard icon={<Utensils size={24} />} label="Meals Logged" value={meals.length} />
        <StatCard icon={<Dumbbell size={24} />} label="Workouts" value={workouts.length} />
        <StatCard icon={<Zap size={24} />} label="Total Calories" value={totalCalories} />
      </motion.div>

      {/* Nutrition Summary */}
      {meals.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="text-primary" size={20} />
                Today's Nutrition Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <NutritionCard
                calories={totalCalories}
                carbs={totalCarbs}
                protein={totalProtein}
                fat={totalFat}
              />

              {/* Progress Bars */}
              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Calorie Goal</span>
                    <span className="text-white font-semibold">
                      {totalCalories} / {dailyGoals.calories} kcal
                    </span>
                  </div>
                  <div className="h-3 bg-dark rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${calorieProgress}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Workout Goal</span>
                    <span className="text-white font-semibold">
                      {workouts.length} / {dailyGoals.workouts} completed
                    </span>
                  </div>
                  <div className="h-3 bg-dark rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${workoutProgress}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-secondary to-primary rounded-full"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Recent Activity Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Meals */}
        <motion.div variants={itemVariants}>
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="text-primary" size={20} />
                Recent Meals
                {meals.length > 0 && (
                  <span className="ml-auto text-xs text-gray-500">
                    <TrendingUp size={14} className="inline mr-1" />
                    {meals.length} today
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {meals.length > 0 ? (
                <div className="space-y-3">
                  {meals
                    .slice(-3)
                    .reverse()
                    .map((meal, idx) => {
                      const mealName = meal.foodName || meal.name || 'Unknown Meal'
                      return (
                        <motion.div
                          key={idx}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          className="p-4 bg-dark-glass rounded-xl border border-white/5 hover:border-primary/30 transition-all"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium text-white">{mealName}</p>
                              {meal.timestamp && (
                                <p className="text-xs text-gray-400">
                                  {new Date(meal.timestamp).toLocaleTimeString()}
                                </p>
                              )}
                            </div>
                            <span className="text-primary font-semibold">
                              {meal.calories} kcal
                            </span>
                          </div>
                          {(meal.carbs || meal.protein || meal.fat) && (
                            <div className="flex gap-3 text-xs">
                              {meal.carbs && (
                                <span className="text-amber-400">
                                  Carbs: {meal.carbs}g
                                </span>
                              )}
                              {meal.protein && (
                                <span className="text-primary">
                                  Protein: {meal.protein}g
                                </span>
                              )}
                              {meal.fat && (
                                <span className="text-blue-400">Fat: {meal.fat}g</span>
                              )}
                            </div>
                          )}
                        </motion.div>
                      )
                    })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Utensils className="mx-auto text-gray-600 mb-3" size={40} />
                  <p className="text-gray-400 mb-2">No meals logged yet</p>
                  <p className="text-sm text-gray-500">
                    Start by taking a photo of your food! 📸
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Workouts */}
        <motion.div variants={itemVariants}>
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dumbbell className="text-secondary" size={20} />
                Recent Workouts
                {workouts.length > 0 && (
                  <span className="ml-auto text-xs text-gray-500">
                    <TrendingUp size={14} className="inline mr-1" />
                    {workouts.length} today
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {workouts.length > 0 ? (
                <div className="space-y-3">
                  {workouts
                    .slice(-3)
                    .reverse()
                    .map((workout, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-4 bg-dark-glass rounded-xl border border-white/5 hover:border-secondary/30 transition-all"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-white">{workout.exercise}</p>
                            {workout.timestamp && (
                              <p className="text-xs text-gray-400">
                                {new Date(workout.timestamp).toLocaleTimeString()}
                              </p>
                            )}
                          </div>
                          <span className="text-secondary font-semibold">
                            {workout.duration} min
                          </span>
                        </div>
                      </motion.div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Dumbbell className="mx-auto text-gray-600 mb-3" size={40} />
                  <p className="text-gray-400 mb-2">No workouts logged yet</p>
                  <p className="text-sm text-gray-500">Start tracking your fitness! 💪</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Motivational Message */}
      {meals.length === 0 && workouts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card-glass p-8 text-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="text-6xl mb-4"
          >
            💪
          </motion.div>
          <h3 className="text-2xl font-bold text-gradient mb-2">
            Ready to start your fitness journey?
          </h3>
          <p className="text-gray-400 mb-6">
            Log your first meal or workout to see your progress here!
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg">
              📸 Snap a meal photo
            </div>
            <div className="px-4 py-2 bg-secondary/10 border border-secondary/30 rounded-lg">
              🏃 Log a workout
            </div>
            <div className="px-4 py-2 bg-accent/10 border border-accent/30 rounded-lg">
              🏆 Challenge friends
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
