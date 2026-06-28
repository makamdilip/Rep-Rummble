import mongoose, { Document, Schema } from "mongoose";

export interface IFriendship extends Document {
  requester: string; // User ID who sent the request
  recipient: string; // User ID who received the request
  status: "pending" | "accepted" | "declined" | "blocked";
  createdAt: Date;
  updatedAt: Date;
}

const FriendshipSchema = new Schema<IFriendship>(
  {
    requester: {
      type: String,
      required: true,
      ref: "User",
    },
    recipient: {
      type: String,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined", "blocked"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

// Prevent duplicate friendship requests
FriendshipSchema.index({ requester: 1, recipient: 1 }, { unique: true });

export const Friendship = mongoose.model<IFriendship>(
  "Friendship",
  FriendshipSchema,
);
