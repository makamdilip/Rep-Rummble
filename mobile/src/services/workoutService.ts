import api from '../config/api';
import { Workout } from '../types';

/**
 * Log a new workout
 */
export const logWorkout = async (workoutData: {
  exercise: string;
  duration: number;
  calories?: number;
  completed?: boolean;
}): Promise<Workout> => {
  const response = await api.post('/workouts', workoutData);
  return response.data.data;
};

/**
 * Get all workouts for the current user
 */
export const getWorkouts = async (): Promise<Workout[]> => {
  const response = await api.get('/workouts');
  return response.data.data;
};

/**
 * Get a specific workout by ID
 */
export const getWorkoutById = async (id: string): Promise<Workout> => {
  const response = await api.get(`/workouts/${id}`);
  return response.data.data;
};

/**
 * Delete a workout
 */
export const deleteWorkout = async (id: string): Promise<void> => {
  await api.delete(`/workouts/${id}`);
};

/**
 * Get today's workout summary
 */
export const getTodaysSummary = async () => {
  const workouts = await getWorkouts();
  const today = new Date().toDateString();
  const todayWorkouts = workouts.filter(
    (w) => new Date(w.timestamp).toDateString() === today
  );

  return {
    workouts: todayWorkouts,
    totalMinutes: todayWorkouts.reduce((sum, w) => sum + w.duration, 0),
    totalCalories: todayWorkouts.reduce((sum, w) => sum + (w.calories || 0), 0),
    workoutCount: todayWorkouts.length,
  };
};

export default {
  logWorkout,
  getWorkouts,
  getWorkoutById,
  deleteWorkout,
  getTodaysSummary,
};
