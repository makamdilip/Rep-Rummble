import mongoose, { Document } from "mongoose";
export interface ISocialPost extends Document {
    author: mongoose.Types.ObjectId;
    postType: "achievement" | "workout" | "meal" | "challenge" | "milestone" | "general";
    content: string;
    mediaUrls?: string[];
    workoutId?: mongoose.Types.ObjectId;
    challengeId?: mongoose.Types.ObjectId;
    isPublic?: boolean;
    likes: mongoose.Types.ObjectId[];
    comments: {
        author: mongoose.Types.ObjectId;
        content: string;
        createdAt: Date;
    }[];
    tags?: string[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const SocialPost: mongoose.Model<ISocialPost, {}, {}, {}, mongoose.Document<unknown, {}, ISocialPost, {}, mongoose.DefaultSchemaOptions> & ISocialPost & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, ISocialPost>;
//# sourceMappingURL=SocialPost.model.d.ts.map