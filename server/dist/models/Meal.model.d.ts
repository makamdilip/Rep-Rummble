import mongoose, { Document } from 'mongoose';
export interface IDetectedFood {
    name: string;
    confidence: number;
    portion: 'small' | 'medium' | 'large' | 'xl';
    boundingBox?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}
export interface IFoodAlternative {
    name: string;
    calories: number;
    reason: string;
}
export interface IMeal extends Document {
    userId: mongoose.Types.ObjectId;
    foodName: string;
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
    fiber?: number;
    sugar?: number;
    sodium?: number;
    imageUrl?: string;
    confidence?: number;
    servingSize?: string;
    timestamp: Date;
    createdAt: Date;
    updatedAt: Date;
    isAIGenerated?: boolean;
    detectedFoods?: IDetectedFood[];
    mealType?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    healthScore?: number;
    aiSuggestions?: string[];
    alternatives?: IFoodAlternative[];
}
export declare const Meal: mongoose.Model<IMeal, {}, {}, {}, mongoose.Document<unknown, {}, IMeal, {}, mongoose.DefaultSchemaOptions> & IMeal & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, IMeal>;
//# sourceMappingURL=Meal.model.d.ts.map