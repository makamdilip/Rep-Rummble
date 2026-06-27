import mongoose, { Document, Schema } from "mongoose";

export interface ISocialPost extends Document {
  author: mongoose.Types.ObjectId;
  postType:
    | "achievement"
    | "workout"
    | "meal"
    | "challenge"
    | "milestone"
    | "general";
  content: string;
  mediaUrls?: string[]; // Array of image/video URLs
  workoutId?: mongoose.Types.ObjectId;
  challengeId?: mongoose.Types.ObjectId;
  isPublic?: boolean;
  likes: mongoose.Types.ObjectId[]; // User IDs who liked
  comments: {
    author: mongoose.Types.ObjectId;
    content: string;
    createdAt: Date;
  }[];
  tags?: string[]; // hashtags or categories
  createdAt: Date;
  updatedAt: Date;
}

const SocialPostSchema = new Schema<ISocialPost>(
  {
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    postType: {
      type: String,
      enum: [
        "achievement",
        "workout",
        "meal",
        "challenge",
        "milestone",
        "general",
      ],
      default: "general",
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    mediaUrls: [
      {
        type: String,
        trim: true,
      },
    ],
    workoutId: {
      type: Schema.Types.ObjectId,
      ref: "Workout",
    },
    challengeId: {
      type: Schema.Types.ObjectId,
      ref: "Challenge",
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        author: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        content: {
          type: String,
          required: true,
          trim: true,
          maxlength: 500,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
  },
  {
    timestamps: true,
  },
);

// Indexes for efficient queries
SocialPostSchema.index({ author: 1, createdAt: -1 });
SocialPostSchema.index({ isPublic: 1, createdAt: -1 });
SocialPostSchema.index({ postType: 1, createdAt: -1 });

export const SocialPost = mongoose.model<ISocialPost>(
  "SocialPost",
  SocialPostSchema,
);
