import { Request, Response } from 'express';
/**
 * @route   POST /api/ai/analyze-food
 * @desc    Analyze food image using AI
 * @access  Private
 */
export declare const analyzeFood: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * @route   POST /api/ai/quick-log
 * @desc    Quick log a meal from text description
 * @access  Private
 */
export declare const quickLogMeal: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * @route   GET /api/ai/nutrition/:foodName
 * @desc    Get nutrition info for a specific food
 * @access  Private
 */
export declare const getNutritionInfo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * @route   GET /api/ai/nutrition
 * @desc    Search nutrition database with query param
 * @access  Private
 */
export declare const searchNutrition: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=ai.controller.d.ts.map