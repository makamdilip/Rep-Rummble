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
exports.SupportAgent = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const WorkingScheduleSchema = new mongoose_1.Schema({
    day: { type: Number, required: true, min: 0, max: 6 },
    start: { type: String, required: true },
    end: { type: String, required: true }
}, { _id: false });
const WorkingHoursSchema = new mongoose_1.Schema({
    timezone: { type: String, default: 'UTC' },
    schedule: [WorkingScheduleSchema]
}, { _id: false });
const SupportAgentSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    timestamps: true
});
// Index for finding available agents
SupportAgentSchema.index({ isAvailable: 1, status: 1, currentChatCount: 1 });
exports.SupportAgent = mongoose_1.default.model('SupportAgent', SupportAgentSchema);
//# sourceMappingURL=SupportAgent.model.js.map