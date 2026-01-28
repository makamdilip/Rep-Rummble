import mongoose, { Document, Schema } from 'mongoose'

export interface ILead extends Document {
  email: string
  source?: string
  createdAt: Date
  updatedAt: Date
}

const LeadSchema = new Schema<ILead>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true
    },
    source: {
      type: String,
      default: 'web'
    }
  },
  {
    timestamps: true
  }
)

LeadSchema.index({ email: 1 }, { unique: true })

export const Lead = mongoose.model<ILead>('Lead', LeadSchema)
