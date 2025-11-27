import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card'
import { Camera, Check } from 'lucide-react'

const SAMPLE_FOODS = [
  { name: 'Biryani', calories: 450, image: '🍚' },
  { name: 'Dosa', calories: 300, image: '🥞' },
  { name: 'Paneer Butter Masala', calories: 350, image: '🍲' },
  { name: 'Chicken Tikka', calories: 280, image: '🍗' },
  { name: 'Samosa', calories: 200, image: '🥟' },
  { name: 'Dal Makhani', calories: 320, image: '🍛' },
]

interface Food {
  name: string
  calories: number
  image: string
  timestamp?: string
}

export default function SnapTab() {
  const [selectedFood, setSelectedFood] = useState<Food | null>(null)
  const [meals, setMeals] = useState<Food[]>(() => {
    const saved = localStorage.getItem('rep_rumble_meals')
    return saved ? JSON.parse(saved) : []
  })

  const handleSelectFood = (food: Food) => {
    setSelectedFood(food)
    const newMeals = [...meals, { ...food, timestamp: new Date().toISOString() }]
    setMeals(newMeals)
    localStorage.setItem('rep_rumble_meals', JSON.stringify(newMeals))
    setTimeout(() => setSelectedFood(null), 2500)
  }

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white flex items-center gap-2">
          <Camera className="text-primary" size={32} />
          Snap & Log Meal
        </h2>
        {meals.length > 0 && (
          <div className="text-right">
            <p className="text-sm text-gray-400">Today's Total</p>
            <p className="text-2xl font-bold text-primary">{totalCalories} kcal</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedFood && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-primary/20 border border-primary rounded-lg p-4 flex items-center gap-3"
          >
            <Check className="text-primary" size={24} />
            <div>
              <p className="text-white font-semibold">
                {selectedFood.image} {selectedFood.name} logged!
              </p>
              <p className="text-sm text-gray-300">{selectedFood.calories} kcal added</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {SAMPLE_FOODS.map((food, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelectFood(food)}
            className="card p-6 cursor-pointer text-center hover:shadow-primary/30 transition-all"
          >
            <div className="text-6xl mb-3">{food.image}</div>
            <h3 className="text-lg font-semibold text-white mb-1">{food.name}</h3>
            <p className="text-primary font-medium">{food.calories} kcal</p>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>📋 Today's Meals ({meals.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {meals.length > 0 ? (
            <div className="space-y-3">
              {meals.map((meal, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex justify-between items-center p-3 bg-dark rounded-lg border border-dark-border"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{meal.image}</span>
                    <div>
                      <p className="font-medium text-white">{meal.name}</p>
                      {meal.timestamp && (
                        <p className="text-xs text-gray-400">
                          {new Date(meal.timestamp).toLocaleTimeString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="text-primary font-semibold">{meal.calories} kcal</span>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">Click a food to log it! 📸</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
