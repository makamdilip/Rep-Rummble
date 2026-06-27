import { Request, Response } from 'express';
interface AuthRequest extends Request {
    user?: {
        id: string;
        email?: string;
        displayName?: string;
    };
}
/**
 * @route   POST /api/chat/start
 * @desc    Start a new support conversation
 * @access  Public (optional auth)
 */
export declare const startConversation: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * @route   GET /api/chat/conversation/:id
 * @desc    Get a conversation with its messages
 * @access  Public (with sessionId) or Private
 */
export declare const getConversation: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * @route   GET /api/chat/history
 * @desc    Get user's conversation history
 * @access  Private
 */
export declare const getChatHistory: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * @route   POST /api/chat/message
 * @desc    Send a message (REST fallback for non-WebSocket)
 * @access  Public (with sessionId) or Private
 */
export declare const sendMessage: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * @route   POST /api/chat/rate/:conversationId
 * @desc    Submit satisfaction rating for a conversation
 * @access  Public (with sessionId) or Private
 */
export declare const rateConversation: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * @route   POST /api/chat/close/:conversationId
 * @desc    Close a conversation
 * @access  Public (with sessionId) or Private
 */
export declare const closeConversation: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export {};
//# sourceMappingURL=chat.controller.d.ts.map