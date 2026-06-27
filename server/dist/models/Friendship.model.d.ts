import mongoose, { Document } from "mongoose";
export interface IFriendship extends Document {
    requester: string;
    recipient: string;
    status: "pending" | "accepted" | "declined" | "blocked";
    createdAt: Date;
    updatedAt: Date;
}
export declare const Friendship: mongoose.Model<IFriendship, {}, {}, {}, mongoose.Document<unknown, {}, IFriendship, {}, mongoose.DefaultSchemaOptions> & IFriendship & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, IFriendship>;
//# sourceMappingURL=Friendship.model.d.ts.map