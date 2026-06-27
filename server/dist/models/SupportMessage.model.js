"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportMessage = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const AttachmentSchema = new mongoose_1.Schema({
    type: { type: String, enum: ['image', 'file'], required: true },
    url: { type: String, required: true },
    name: { type: String, required: true },
    size: { type: Number }
}, { _id: false });
const QuickReplySchema = new mongoose_1.Schema({
    text: { type: String, required: true },
    payload: { type: String, required: true }
}, { _id: false });
const SupportMessageSchema = new mongoose_1.Schema({
    conversationId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'SupportConversation',
        required: true,
        index: true
    },
    senderType: {
        type: String,
        enum: ['user', 'ai', 'agent', 'system'],
        required: true
    },
    senderId: { type: mongoose_1.Schema.Types.ObjectId },
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
}, {
    timestamps: { createdAt: true, updatedAt: false }
});
// Index for fetching messages in a conversation
SupportMessageSchema.index({ conversationId: 1, createdAt: 1 });
exports.SupportMessage = mongoose_1.default.model('SupportMessage', SupportMessageSchema);
//# sourceMappingURL=SupportMessage.model.js.map