import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
  email: string;
  password: string;
  displayName?: string;
  streak: number;
  xp: number;
  level: number;
  healthMetrics?: {
    steps: number;
    calories: number;
    heartRate?: number;
    sleepHours: number;
    hrv?: number;
    restingHR?: number;
    weight?: number;
    bodyFat?: number;
    lastSync?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    displayName: {
      type: String,
      trim: true,
    },
    streak: {
      type: Number,
      default: 0,
      min: 0,
    },
    xp: {
      type: Number,
      default: 0,
      min: 0,
    },
    level: {
      type: Number,
      default: 1,
      min: 1,
    },
    healthMetrics: {
      steps: { type: Number, default: 0 },
      calories: { type: Number, default: 0 },
      heartRate: { type: Number },
      sleepHours: { type: Number, default: 0 },
      hrv: { type: Number },
      restingHR: { type: Number },
      weight: { type: Number },
      bodyFat: { type: Number },
      lastSync: { type: Date },
    },
  },
  {
    timestamps: true,
  },
);

// Hash password before saving
UserSchema.pre('save', async function (this: IUser, next: any) {
  // `this` is typed as IUser here
  if (!this.isModified('password')) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error: any) {
    next(error)
  }
})

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

export const User = mongoose.model<IUser>('User', UserSchema)
