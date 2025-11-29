import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/Card'
import { Camera, Upload, Check, Loader2, Sparkles } from 'lucide-react'
import { Button } from '../../ui/Button'
import { analyzeFoodImage, type NutritionInfo } from '../../../services/external/aiVisionService'
import { DetailedNutrition, NutritionCard } from './NutritionCard'

interface MealData extends NutritionInfo {
  timestamp: string
  imageUrl?: string
}

export default function SnapTab() {
  const [analyzing, setAnalyzing] = useState(false)
  const [selectedFood, setSelectedFood] = useState<MealData | null>(null)
  const [meals, setMeals] = useState<MealData[]>(() => {
    if (typeof window === 'undefined') return []
    const saved = localStorage.getItem('rep_rumble_meals')
    return saved ? JSON.parse(saved) : []
  })
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (file: File) => {
    if (!file) return

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Analyze image
    setAnalyzing(true)
    setSelectedFood(null)

    try {
      const result = await analyzeFoodImage(file)

      if (result.success && result.data) {
        const mealData: MealData = {
          ...result.data,
          timestamp: new Date().toISOString(),
          imageUrl: URL.createObjectURL(file),
        }

        setSelectedFood(mealData)

        // Auto-save after 3 seconds
        setTimeout(() => {
          handleSaveMeal(mealData)
        }, 3000)
      }
    } catch (error) {
      console.error('Error analyzing image:', error)
    } finally {
      setAnalyzing(false)
    }
  }

  const handleSaveMeal = (meal: MealData) => {
    const newMeals = [...meals, meal]
    setMeals(newMeals)
    localStorage.setItem('rep_rumble_meals', JSON.stringify(newMeals))
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      setSelectedFood(null)
      setPreviewImage(null)
    }, 2000)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageUpload(file)
    }
  }

  const totalNutrition = meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      carbs: acc.carbs + meal.carbs,
      protein: acc.protein + meal.protein,
      fat: acc.fat + meal.fat,
    }),
    { calories: 0, carbs: 0, protein: 0, fat: 0 }
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold text-app flex items-center gap-3"
        >
          <Camera className="text-primary" size={32} />
          AI Food Scanner
          <Sparkles className="text-accent animate-pulse" size={24} />
        </motion.h2>
      </div>

      {/* Today's Total Summary */}
      {meals.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-glass p-6"
        >
          <h3 className="text-lg font-semibold text-gray-300 mb-4">
            Today's Nutrition
          </h3>
          <NutritionCard
            calories={totalNutrition.calories}
            carbs={totalNutrition.carbs}
            protein={totalNutrition.protein}
            fat={totalNutrition.fat}
          />
        </motion.div>
      )}

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card variant="glass">
          <CardContent className="p-8">
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-xl font-bold text-app mb-2">
                  Snap or Upload Your Meal
                </h3>
                <p className="text-gray-400 text-sm">
                  AI will analyze your food and calculate calories & carbs
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  size="lg"
                  className="w-full h-24 text-lg"
                  onClick={() => cameraInputRef.current?.click()}
                  disabled={analyzing}
                >
                  <Camera size={24} className="mr-2" />
                  Take Photo
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full h-24 text-lg"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={analyzing}
                >
                  <Upload size={24} className="mr-2" />
                  Upload Image
                </Button>
              </div>

              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                aria-label="Capture food photo"
              />

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                aria-label="Upload food image"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Analysis Section */}
      <AnimatePresence mode="wait">
        {analyzing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card-glass p-8"
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader2 className="text-primary animate-spin" size={48} />
              <div className="text-center">
                <h3 className="text-xl font-semibold text-app mb-2">
                  Analyzing your food...
                </h3>
                <p className="text-gray-400">
                  AI is calculating nutrition values
                </p>
              </div>
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Food preview"
                  className="mt-4 rounded-xl max-w-md w-full object-cover shadow-glass border border-card"
                />
              )}
            </div>
          </motion.div>
        )}

        {selectedFood && !analyzing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-primary/20 border border-primary rounded-xl p-4 flex items-center gap-3"
              >
                <Check className="text-primary" size={24} />
                <div>
                  <p className="text-app font-semibold">
                    Meal logged successfully!
                  </p>
                  <p className="text-sm text-gray-300">
                    {selectedFood.calories} kcal added to your daily intake
                  </p>
                </div>
              </motion.div>
            )}

            {previewImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                <img
                  src={previewImage}
                  alt="Analyzed food"
                  className="w-full h-64 object-cover rounded-xl shadow-glass border border-card"
                />
                <div className="absolute top-4 right-4 bg-primary/90 text-black px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
                  {selectedFood.confidence}% Match
                </div>
              </motion.div>
            )}

            <DetailedNutrition {...selectedFood} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Meals History */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>📋</span>
              Today's Meals ({meals.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {meals.length > 0 ? (
              <div className="space-y-3">
                {meals
                  .slice()
                  .reverse()
                  .map((meal, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex gap-4 p-4 card-glass rounded-xl border border-card hover:border-primary/30 transition-all"
                    >
                      {meal.imageUrl && (
                        <img
                          src={meal.imageUrl}
                          alt={meal.foodName}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-app">
                              {meal.foodName}
                            </p>
                            <p className="text-xs text-gray-400">
                              {new Date(meal.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                          <span className="text-primary font-bold">
                            {meal.calories} kcal
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="text-amber-400">
                            <span className="text-gray-500">Carbs: </span>
                            {meal.carbs}g
                          </div>
                          <div className="text-primary">
                            <span className="text-gray-500">Protein: </span>
                            {meal.protein}g
                          </div>
                          <div className="text-blue-400">
                            <span className="text-gray-500">Fat: </span>
                            {meal.fat}g
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Camera className="mx-auto text-gray-600 mb-4" size={48} />
                <p className="text-gray-400">No meals logged yet</p>
                <p className="text-sm text-gray-500 mt-2">
                  Start by taking a photo of your food!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
