/**
 * Type definitions for Rep Rumble application
 */

// User related types
export interface UserProfile {
  uid: string
  email: string
  displayName?: string
  streak: number
  xp: number
  level: number
  createdAt: string
}

// Nutrition related types
export interface NutritionData {
  calories: number
  carbs: number
  protein: number
  fat: number
  fiber?: number
  sugar?: number
  sodium?: number
}

export interface Meal extends NutritionData {
  id?: string
  name?: string
  foodName?: string
  timestamp: string
  imageUrl?: string
  confidence?: number
  userId?: string
}

export interface DailyNutritionGoals {
  calories: number
  carbs: number
  protein: number
  fat: number
  workouts: number
}

// Workout related types
export interface Workout {
  id?: string
  exercise: string
  duration: number
  calories?: number
  timestamp: string
  userId?: string
  completed?: boolean
}

export interface WorkoutTemplate {
  id: string
  name: string
  icon: string
  description?: string
  defaultDuration?: number
}

// Leaderboard related types
export interface LeaderboardEntry {
  rank: number
  userId: string
  userName: string
  xp: number
  streak: number
  avatar?: string
  level: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt?: string
  progress?: number
  maxProgress?: number
}

// AI Vision Service types
export interface FoodAnalysisResult {
  foodName: string
  nutrition: NutritionData
  confidence: number
  servingSize?: string
}

export interface FoodAnalysisError {
  error: string
  message: string
}

// Theme types
export type ThemeMode = 'light' | 'dark' | 'system'

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
