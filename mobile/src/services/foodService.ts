import api from '../config/api';
import { FoodAnalysisResponse, Meal, NutritionSearchItem } from '../types';

/**
 * Analyze food image using AI
 */
export const analyzeFoodImage = async (
  imageBase64: string,
  mealType?: 'breakfast' | 'lunch' | 'dinner' | 'snack'
): Promise<FoodAnalysisResponse> => {
  const response = await api.post<FoodAnalysisResponse>('/ai/analyze-food', {
    imageBase64,
    mealType,
  });
  return response.data;
};

/**
 * Save a meal entry
 */
export const saveMeal = async (mealData: Partial<Meal>): Promise<Meal> => {
  const response = await api.post('/meals', mealData);
  return response.data.data;
};

/**
 * Get all meals for the current user
 */
export const getMeals = async (): Promise<Meal[]> => {
  const response = await api.get('/meals');
  return response.data.data;
};

/**
 * Get a specific meal by ID
 */
export const getMealById = async (id: string): Promise<Meal> => {
  const response = await api.get(`/meals/${id}`);
  return response.data.data;
};

/**
 * Delete a meal
 */
export const deleteMeal = async (id: string): Promise<void> => {
  await api.delete(`/meals/${id}`);
};

/**
 * Get today's meals summary
 */
export const getTodaysSummary = async () => {
  const meals = await getMeals();
  const today = new Date().toDateString();
  const todayMeals = meals.filter(
    (m) => new Date(m.timestamp).toDateString() === today
  );

  return {
    meals: todayMeals,
    totalCalories: todayMeals.reduce((sum, m) => sum + m.calories, 0),
    totalProtein: todayMeals.reduce((sum, m) => sum + m.protein, 0),
    totalCarbs: todayMeals.reduce((sum, m) => sum + m.carbs, 0),
    totalFat: todayMeals.reduce((sum, m) => sum + m.fat, 0),
    mealCount: todayMeals.length,
  };
};

/**
 * Search nutrition database (USDA) via backend
 */
export const searchNutrition = async (query: string, limit = 12): Promise<NutritionSearchItem[]> => {
  const response = await api.get('/ai/nutrition', {
    params: { query, limit },
  });

  return response.data.data?.results || [];
};

export default {
  analyzeFoodImage,
  saveMeal,
  getMeals,
  getMealById,
  deleteMeal,
  getTodaysSummary,
  searchNutrition,
};
