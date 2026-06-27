import { Request, Response } from 'express';
/**
 * @route   GET /api/exercises
 * @desc    Get all exercises with optional filters
 * @access  Private
 */
export declare const getExercises: (req: Request, res: Response) => Promise<void>;
/**
 * @route   GET /api/exercises/:id
 * @desc    Get single exercise with full details
 * @access  Private
 */
export declare const getExercise: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * @route   POST /api/exercises/generate
 * @desc    Generate a new exercise using AI
 * @access  Private (Admin)
 */
export declare const generateExercise: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * @route   POST /api/exercises/seed
 * @desc    Seed default exercises into database
 * @access  Private (Admin)
 */
export declare const seedDefaultExercises: (_req: Request, res: Response) => Promise<void>;
/**
 * @route   GET /api/workout-plans
 * @desc    Get user's workout plans
 * @access  Private
 */
export declare const getWorkoutPlans: (req: Request, res: Response) => Promise<void>;
/**
 * @route   GET /api/workout-plans/:id
 * @desc    Get single workout plan with full details
 * @access  Private
 */
export declare const getWorkoutPlan: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * @route   POST /api/workout-plans/generate
 * @desc    Generate a personalized workout plan using AI
 * @access  Private
 */
export declare const generateWorkoutPlanController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * @route   DELETE /api/workout-plans/:id
 * @desc    Delete a workout plan
 * @access  Private
 */
export declare const deleteWorkoutPlan: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * @route   POST /api/workout-sessions
 * @desc    Start a new workout session
 * @access  Private
 */
export declare const startWorkoutSession: (req: Request, res: Response) => Promise<void>;
/**
 * @route   PUT /api/workout-sessions/:id
 * @desc    Update workout session (add exercise, complete session)
 * @access  Private
 */
export declare const updateWorkoutSession: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * @route   GET /api/workout-sessions
 * @desc    Get user's workout session history
 * @access  Private
 */
export declare const getWorkoutSessions: (req: Request, res: Response) => Promise<void>;
/**
 * @route   POST /api/exercises/analyze-form
 * @desc    Analyze exercise form from pose keypoints
 * @access  Private
 */
export declare const analyzeExerciseForm: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * @route   POST /api/exercises/form-feedback
 * @desc    Generate form feedback summary from multiple rep analyses
 * @access  Private
 */
export declare const getFormFeedback: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=exercise.controller.d.ts.map