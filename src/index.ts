/**
 * Central export file for Rep Rumble frontend
 * Re-exports all components, types, and utilities
 */

// Types
export type {
  UserProfile,
  NutritionData,
  Meal,
  DailyNutritionGoals,
  Workout,
  WorkoutTemplate,
  LeaderboardEntry,
  Achievement,
  FoodAnalysisResult,
  FoodAnalysisError,
  ThemeMode,
  ApiResponse,
} from './types/index'

// UI Components
export {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Badge,
  StatCard,
} from './components/ui/index'

// Feature Components - Dashboard
export { default as HomeTab } from './components/features/dashboard/HomeTab'

// Feature Components - Nutrition
export { default as SnapTab } from './components/features/nutrition/SnapTab'
export { NutritionCard } from './components/features/nutrition/NutritionCard'
export { NutritionChart } from './components/features/nutrition/NutritionChart'

// Feature Components - Workout
export { default as StreakTab } from './components/features/workout/StreakTab'

// Feature Components - Leaderboard
export { default as LeaderboardTab } from './components/features/leaderboard/LeaderboardTab'
