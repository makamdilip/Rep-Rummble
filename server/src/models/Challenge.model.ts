import mongoose, { Document, Schema } from "mongoose";

export interface IChallenge extends Document {
  creator: string;
  title: string;
  description: string;
  challengeType:
    | "workout"
    | "nutrition"
    | "steps"
    | "weight_loss"
    | "calories"
    | "streak";
  targetValue: number;
  targetUnit: string; // 'workouts', 'calories', 'steps', 'kg', 'days'
  duration: number; // days
  startDate: Date;
  endDate: Date;
  isPublic: boolean;
  maxParticipants?: number;
  participants: string[]; // User IDs
  status: "active" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const ChallengeSchema = new Schema<IChallenge>(
  {
    creator: {
      type: String,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    challengeType: {
      type: String,
      enum: [
        "workout",
        "nutrition",
        "steps",
        "weight_loss",
        "calories",
        "streak",
      ],
      required: true,
    },
    targetValue: {
      type: Number,
      required: true,
      min: 1,
    },
    targetUnit: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      min: 1,
      max: 365,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    maxParticipants: {
      type: Number,
      min: 2,
      max: 100,
    },
    participants: [
      {
        type: String,
        ref: "User",
      },
    ],
    status: {
      type: String,
      enum: ["active", "completed", "cancelled"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

// Index for efficient queries
ChallengeSchema.index({ status: 1, isPublic: 1, startDate: -1 });
ChallengeSchema.index({ participants: 1 });

export const Challenge = mongoose.model<IChallenge>(
  "Challenge",
  ChallengeSchema,
);
