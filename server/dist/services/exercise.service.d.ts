import { IExercise } from '../models/Exercise.model';
import { IWorkoutPlan } from '../models/WorkoutPlan.model';
export interface GenerateExerciseParams {
    name: string;
    category: string;
    difficulty: string;
    muscleGroups: string[];
    equipment?: string[];
}
export interface GenerateWorkoutPlanParams {
    userId: string;
    goal: string;
    fitnessLevel: string;
    durationWeeks: number;
    daysPerWeek: number;
    minutesPerWorkout: number;
    availableEquipment: string[];
    focusAreas?: string[];
    injuries?: string[];
}
/**
 * Generate exercise details using AI
 */
export declare function generateExerciseWithAI(params: GenerateExerciseParams): Promise<Partial<IExercise>>;
/**
 * Generate a complete workout plan using AI
 */
export declare function generateWorkoutPlan(params: GenerateWorkoutPlanParams): Promise<IWorkoutPlan>;
/**
 * Seed initial exercises into the database
 */
export declare function seedExercises(): Promise<void>;
declare const _default: {
    generateExerciseWithAI: typeof generateExerciseWithAI;
    generateWorkoutPlan: typeof generateWorkoutPlan;
    seedExercises: typeof seedExercises;
};
export default _default;
//# sourceMappingURL=exercise.service.d.ts.map