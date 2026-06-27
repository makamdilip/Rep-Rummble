import mongoose, { Document, Schema } from "mongoose";

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

const ChallengeParticipantSchema = new Schema<IChallengeParticipant>(
  {
    challenge: {
      type: String,
      required: true,
      ref: "Challenge",
    },
    user: {
      type: String,
      required: true,
      ref: "User",
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
    currentProgress: {
      type: Number,
      default: 0,
      min: 0,
    },
    targetProgress: {
      type: Number,
      required: true,
      min: 1,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

// Compound index for efficient queries
ChallengeParticipantSchema.index({ challenge: 1, user: 1 }, { unique: true });
ChallengeParticipantSchema.index({ user: 1, completed: 1 });

export const ChallengeParticipant = mongoose.model<IChallengeParticipant>(
  "ChallengeParticipant",
  ChallengeParticipantSchema,
);
