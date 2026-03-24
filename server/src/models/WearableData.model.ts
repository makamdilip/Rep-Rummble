import mongoose, { Document, Schema } from 'mongoose'

export interface IWearableData extends Document {
  userId: string
  date: string // YYYY-MM-DD format
  steps: number
  calories: number
  heartRate?: number
  sleepHours: number
  hrv?: number
  restingHR?: number
  weight?: number
  bodyFat?: number
  syncedAt: Date
}

const WearableDataSchema = new Schema<IWearableData>({
  userId: {
    type: String,
    required: true,
    index: true
  },
  date: {
    type: String,
    required: true,
    index: true
  },
  steps: {
    type: Number,
    default: 0,
    min: 0
  },
  calories: {
    type: Number,
    default: 0,
    min: 0
  },
  heartRate: {
    type: Number,
    min: 0
  },
  sleepHours: {
    type: Number,
    default: 0,
    min: 0
  },
  hrv: {
    type: Number,
    min: 0
  },
  restingHR: {
    type: Number,
    min: 0
  },
  weight: {
    type: Number,
    min: 0
  },
  bodyFat: {
    type: Number,
    min: 0,
    max: 100
  },
  syncedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

// Compound index for efficient queries
WearableDataSchema.index({ userId: 1, date: -1 })

export const WearableData = mongoose.model<IWearableData>('WearableData', WearableDataSchema)