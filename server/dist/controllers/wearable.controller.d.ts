import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
export declare const syncWearableData: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getWearableData: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getLatestHealthMetrics: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=wearable.controller.d.ts.map