import mongoose, { Document } from 'mongoose';
export interface IUser extends Document {
    email: string;
    password: string;
    displayName?: string;
    streak: number;
    xp: number;
    level: number;
    friends: mongoose.Types.ObjectId[];
    healthMetrics?: {
        steps: number;
        calories: number;
        heartRate?: number;
        sleepHours: number;
        hrv?: number;
        restingHR?: number;
        weight?: number;
        bodyFat?: number;
        lastSync?: Date;
    };
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
export declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, IUser>;
//# sourceMappingURL=User.model.d.ts.map