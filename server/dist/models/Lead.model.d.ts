import mongoose, { Document } from 'mongoose';
export interface ILead extends Document {
    email: string;
    source?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Lead: mongoose.Model<ILead, {}, {}, {}, mongoose.Document<unknown, {}, ILead, {}, mongoose.DefaultSchemaOptions> & ILead & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, ILead>;
//# sourceMappingURL=Lead.model.d.ts.map