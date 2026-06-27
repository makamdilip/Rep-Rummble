import mongoose, { Document } from 'mongoose';
export interface IWorkout extends Document {
    userId: mongoose.Types.ObjectId;
    exercise: string;
    duration: number;
    calories?: number;
    completed: boolean;
    timestamp: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Workout: mongoose.Model<IWorkout, {}, {}, {}, mongoose.Document<unknown, {}, IWorkout, {}, mongoose.DefaultSchemaOptions> & IWorkout & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, IWorkout>;
//# sourceMappingURL=Workout.model.d.ts.map