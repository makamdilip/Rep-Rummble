import mongoose, { Document } from "mongoose";
export interface IChallengeParticipant extends Document {
    challenge: string;
    user: string;
    joinedAt: Date;
    currentProgress: number;
    targetProgress: number;
    completed: boolean;
    completedAt?: Date;
    lastUpdated: Date;
}
export declare const ChallengeParticipant: mongoose.Model<IChallengeParticipant, {}, {}, {}, mongoose.Document<unknown, {}, IChallengeParticipant, {}, mongoose.DefaultSchemaOptions> & IChallengeParticipant & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, IChallengeParticipant>;
//# sourceMappingURL=ChallengeParticipant.model.d.ts.map