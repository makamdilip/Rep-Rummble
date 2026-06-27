export interface DetectedFood {
    name: string;
    confidence: number;
    portion: 'small' | 'medium' | 'large' | 'xl';
    estimatedCalories?: number;
    estimatedProtein?: number;
    estimatedCarbs?: number;
    estimatedFat?: number;
}
export interface NutritionData {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber?: number;
    sugar?: number;
    sodium?: number;
}
export interface FoodAnalysisResult {
    detectedFoods: DetectedFood[];
    totalNutrition: NutritionData;
    healthScore: number;
    suggestions: string[];
    alternatives: {
        name: string;
        calories: number;
        reason: string;
    }[];
    confidence: number;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}
/**
 * Analyze food image using Google Gemini Vision
 * FREE: 1500 requests/day, 60 requests/minute
 */
export declare function analyzeFoodImageWithGemini(imageBase64: string, mealType?: 'breakfast' | 'lunch' | 'dinner' | 'snack'): Promise<FoodAnalysisResult>;
/**
 * Quick log meal from text description using Gemini
 */
export declare function quickLogMealWithGemini(description: string): Promise<FoodAnalysisResult>;
/**
 * Generate workout plan using Gemini
 */
export declare function generateWorkoutPlanWithGemini(goal: string, fitnessLevel: string, daysPerWeek: number): Promise<any>;
/**
 * Get nutrition info for a food item
 */
export declare function getNutritionInfoWithGemini(foodName: string): Promise<NutritionData>;
declare const _default: {
    analyzeFoodImageWithGemini: typeof analyzeFoodImageWithGemini;
    quickLogMealWithGemini: typeof quickLogMealWithGemini;
    generateWorkoutPlanWithGemini: typeof generateWorkoutPlanWithGemini;
    getNutritionInfoWithGemini: typeof getNutritionInfoWithGemini;
};
export default _default;
//# sourceMappingURL=gemini.service.d.ts.map