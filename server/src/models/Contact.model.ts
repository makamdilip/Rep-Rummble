import mongoose, { Document, Schema } from 'mongoose'

export interface IContact extends Document {
  name: string
  email: string
  message: string
  createdAt: Date
  updatedAt: Date
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, required: true, trim: true }
  },
  {
    timestamps: true
  }
)

export const Contact = mongoose.model<IContact>('Contact', ContactSchema)
