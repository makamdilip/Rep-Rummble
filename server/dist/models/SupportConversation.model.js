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
exports.SupportConversation = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const AIContextSchema = new mongoose_1.Schema({
    messageCount: { type: Number, default: 0 },
    failedAttempts: { type: Number, default: 0 },
    topics: [{ type: String }],
    sentiment: {
        type: String,
        enum: ['positive', 'neutral', 'negative', 'frustrated'],
        default: 'neutral'
    }
}, { _id: false });
const SupportConversationSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    userEmail: { type: String, trim: true, lowercase: true },
    userName: { type: String, trim: true },
    sessionId: { type: String, required: true, unique: true, index: true },
    status: {
        type: String,
        enum: ['active', 'waiting_agent', 'with_agent', 'resolved', 'closed'],
        default: 'active',
        index: true
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'medium'
    },
    category: {
        type: String,
        enum: ['billing', 'technical', 'account', 'general', 'feedback']
    },
    assignedAgentId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'SupportAgent' },
    assignedAt: { type: Date },
    escalatedFromAI: { type: Boolean, default: false },
    escalationReason: { type: String },
    escalationTimestamp: { type: Date },
    aiContext: { type: AIContextSchema, default: () => ({}) },
    platform: {
        type: String,
        enum: ['web', 'ios', 'android'],
        required: true
    },
    userAgent: { type: String },
    lastActivityAt: { type: Date, default: Date.now },
    closedAt: { type: Date },
    satisfactionRating: { type: Number, min: 1, max: 5 },
    feedbackComment: { type: String }
}, {
    timestamps: true
});
// Index for finding conversations waiting for agents
SupportConversationSchema.index({ status: 1, priority: -1, createdAt: 1 });
// Index for finding user's conversations
SupportConversationSchema.index({ userId: 1, createdAt: -1 });
exports.SupportConversation = mongoose_1.default.model('SupportConversation', SupportConversationSchema);
//# sourceMappingURL=SupportConversation.model.js.map