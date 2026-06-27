import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
export declare const getWorkouts: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createWorkout: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getWorkout: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteWorkout: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getWorkoutStats: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=workout.controller.d.ts.map