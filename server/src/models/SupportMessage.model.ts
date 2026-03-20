import mongoose, { Document, Schema } from 'mongoose'

export interface IAttachment {
  type: 'image' | 'file'
  url: string
  name: string
  size?: number
}

export interface IQuickReply {
  text: string
  payload: string
}

export interface ISupportMessage extends Document {
  conversationId: mongoose.Types.ObjectId
  senderType: 'user' | 'ai' | 'agent' | 'system'
  senderId?: mongoose.Types.ObjectId
  senderName?: string
  content: string
  contentType: 'text' | 'image' | 'file' | 'quick_reply'
  attachments?: IAttachment[]
  quickReplies?: IQuickReply[]
  isRead: boolean
  readAt?: Date
  deliveredAt?: Date
  aiConfidence?: number
  aiSuggestedEscalation?: boolean
  createdAt: Date
}

const AttachmentSchema = new Schema<IAttachment>({
  type: { type: String, enum: ['image', 'file'], required: true },
  url: { type: String, required: true },
  name: { type: String, required: true },
  size: { type: Number }
}, { _id: false })

const QuickReplySchema = new Schema<IQuickReply>({
  text: { type: String, required: true },
  payload: { type: String, required: true }
}, { _id: false })

const SupportMessageSchema = new Schema<ISupportMessage>(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: 'SupportConversation',
      required: true,
      index: true
    },
    senderType: {
      type: String,
      enum: ['user', 'ai', 'agent', 'system'],
      required: true
    },
    senderId: { type: Schema.Types.ObjectId },
    senderName: { type: String },
    content: { type: String, required: true },
    contentType: {
      type: String,
      enum: ['text', 'image', 'file', 'quick_reply'],
      default: 'text'
    },
    attachments: [AttachmentSchema],
    quickReplies: [QuickReplySchema],
    isRead: { type: Boolean, default: false },
    readAt: { type: Date },
    deliveredAt: { type: Date, default: Date.now },
    aiConfidence: { type: Number, min: 0, max: 1 },
    aiSuggestedEscalation: { type: Boolean, default: false }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
)

// Index for fetching messages in a conversation
SupportMessageSchema.index({ conversationId: 1, createdAt: 1 })

export const SupportMessage = mongoose.model<ISupportMessage>(
  'SupportMessage',
  SupportMessageSchema
)
