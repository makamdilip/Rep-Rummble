import mongoose, { Document, Schema } from 'mongoose'

export interface IMeal extends Document {
  userId: mongoose.Types.ObjectId
  foodName: string
  calories: number
  carbs: number
  protein: number
  fat: number
  fiber?: number
  sugar?: number
  sodium?: number
  imageUrl?: string
  confidence?: number
  servingSize?: string
  timestamp: Date
  createdAt: Date
  updatedAt: Date
}

const MealSchema = new Schema<IMeal>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  foodName: {
    type: String,
    required: [true, 'Food name is required'],
    trim: true
  },
  calories: {
    type: Number,
    required: [true, 'Calories are required'],
    min: 0
  },
  carbs: {
    type: Number,
    required: [true, 'Carbs are required'],
    min: 0
  },
  protein: {
    type: Number,
    required: [true, 'Protein is required'],
    min: 0
  },
  fat: {
    type: Number,
    required: [true, 'Fat is required'],
    min: 0
  },
  fiber: {
    type: Number,
    min: 0
  },
  sugar: {
    type: Number,
    min: 0
  },
  sodium: {
    type: Number,
    min: 0
  },
  imageUrl: String,
  confidence: {
    type: Number,
    min: 0,
    max: 1
  },
  servingSize: String,
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true
})

// Compound index for user meals by date
MealSchema.index({ userId: 1, timestamp: -1 })

export const Meal = mongoose.model<IMeal>('Meal', MealSchema)
