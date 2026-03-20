import mongoose, { Document, Schema } from 'mongoose'

export interface IWorkingSchedule {
  day: 0 | 1 | 2 | 3 | 4 | 5 | 6
  start: string
  end: string
}

export interface IWorkingHours {
  timezone: string
  schedule: IWorkingSchedule[]
}

export interface ISupportAgent extends Document {
  userId: mongoose.Types.ObjectId
  email: string
  displayName: string
  avatar?: string
  status: 'online' | 'away' | 'busy' | 'offline'
  isAvailable: boolean
  maxConcurrentChats: number
  currentChatCount: number
  specializations: ('billing' | 'technical' | 'account' | 'general')[]
  totalChatsHandled: number
  averageRating: number
  averageResponseTime: number
  workingHours?: IWorkingHours
  lastActiveAt: Date
  createdAt: Date
  updatedAt: Date
}

const WorkingScheduleSchema = new Schema<IWorkingSchedule>({
  day: { type: Number, required: true, min: 0, max: 6 },
  start: { type: String, required: true },
  end: { type: String, required: true }
}, { _id: false })

const WorkingHoursSchema = new Schema<IWorkingHours>({
  timezone: { type: String, default: 'UTC' },
  schedule: [WorkingScheduleSchema]
}, { _id: false })

const SupportAgentSchema = new Schema<ISupportAgent>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    displayName: { type: String, required: true, trim: true },
    avatar: { type: String },
    status: {
      type: String,
      enum: ['online', 'away', 'busy', 'offline'],
      default: 'offline'
    },
    isAvailable: { type: Boolean, default: false },
    maxConcurrentChats: { type: Number, default: 5, min: 1, max: 20 },
    currentChatCount: { type: Number, default: 0, min: 0 },
    specializations: [{
      type: String,
      enum: ['billing', 'technical', 'account', 'general']
    }],
    totalChatsHandled: { type: Number, default: 0, min: 0 },
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    averageResponseTime: { type: Number, default: 0, min: 0 },
    workingHours: WorkingHoursSchema,
    lastActiveAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true
  }
)

// Index for finding available agents
SupportAgentSchema.index({ isAvailable: 1, status: 1, currentChatCount: 1 })

export const SupportAgent = mongoose.model<ISupportAgent>(
  'SupportAgent',
  SupportAgentSchema
)
