import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
export declare const getMeals: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createMeal: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getMeal: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteMeal: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getMealStats: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=meal.controller.d.ts.map