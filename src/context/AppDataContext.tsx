import React, { createContext, useContext, useState, type ReactNode } from 'react'

// Types
export interface Meal {
  name?: string
  foodName?: string
  calories: number
  carbs?: number
  protein?: number
  fat?: number
  timestamp?: string
  imageUrl?: string
  confidence?: number
}

export interface Workout {
  name: string
  icon: string
  duration?: number
  reps?: number
  sets?: number
  timestamp?: string
  exercise?: string
}

interface AppDataContextType {
  // Meals
  meals: Meal[]
  addMeal: (meal: Meal) => void
  clearMeals: () => void

  // Workouts
  workouts: Workout[]
  addWorkout: (workout: Workout) => void
  clearWorkouts: () => void

  // Streak
  streak: number
  incrementStreak: () => void
  resetStreak: () => void

  // Onboarding
  hasSeenOnboarding: boolean
  completeOnboarding: () => void

  // Clear all data (for logout)
  clearAllData: () => void
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined)

export const AppDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State
  const [meals, setMeals] = useState<Meal[]>([])
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [streak, setStreak] = useState<number>(0)
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean>(false)

  // Meal operations
  const addMeal = (meal: Meal) => {
    setMeals(prev => [...prev, meal])
  }

  const clearMeals = () => {
    setMeals([])
  }

  // Workout operations
  const addWorkout = (workout: Workout) => {
    setWorkouts(prev => [...prev, workout])
  }

  const clearWorkouts = () => {
    setWorkouts([])
  }

  // Streak operations
  const incrementStreak = () => {
    setStreak(prev => prev + 1)
  }

  const resetStreak = () => {
    setStreak(0)
  }

  // Onboarding
  const completeOnboarding = () => {
    setHasSeenOnboarding(true)
  }

  // Clear all data (e.g., on logout)
  const clearAllData = () => {
    setMeals([])
    setWorkouts([])
    setStreak(0)
    setHasSeenOnboarding(false)
  }

  const value: AppDataContextType = {
    meals,
    addMeal,
    clearMeals,
    workouts,
    addWorkout,
    clearWorkouts,
    streak,
    incrementStreak,
    resetStreak,
    hasSeenOnboarding,
    completeOnboarding,
    clearAllData,
  }

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
}

export const useAppData = () => {
  const context = useContext(AppDataContext)
  if (!context) {
    throw new Error('useAppData must be used within AppDataProvider')
  }
  return context
}
