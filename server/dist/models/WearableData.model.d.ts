import mongoose, { Document } from 'mongoose';
export interface IWearableData extends Document {
    userId: string;
    date: string;
    steps: number;
    calories: number;
    heartRate?: number;
    sleepHours: number;
    hrv?: number;
    restingHR?: number;
    weight?: number;
    bodyFat?: number;
    syncedAt: Date;
}
export declare const WearableData: mongoose.Model<IWearableData, {}, {}, {}, mongoose.Document<unknown, {}, IWearableData, {}, mongoose.DefaultSchemaOptions> & IWearableData & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, IWearableData>;
//# sourceMappingURL=WearableData.model.d.ts.map