import { Request, Response, NextFunction } from 'express';
export interface AuthUser {
    id: string;
    email?: string;
    displayName?: string;
}
export interface AuthRequest extends Request {
    user?: AuthUser;
}
export declare const protect: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const optionalAuth: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const adminOnly: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const agentOnly: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.middleware.d.ts.map