import { Request, Response } from 'express';
import { ISupportAgent } from '../models/SupportAgent.model';
interface AgentRequest extends Request {
    user?: {
        id: string;
        email?: string;
    };
    agent?: ISupportAgent;
}
/**
 * @route   GET /api/agent/dashboard
 * @desc    Get agent dashboard statistics
 * @access  Agent only
 */
export declare const getDashboard: (req: AgentRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * @route   GET /api/agent/queue
 * @desc    Get conversations waiting for an agent
 * @access  Agent only
 */
export declare const getQueue: (_req: AgentRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * @route   GET /api/agent/active
 * @desc    Get agent's active conversations
 * @access  Agent only
 */
export declare const getActiveChats: (req: AgentRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * @route   POST /api/agent/claim/:conversationId
 * @desc    Claim a conversation from the queue
 * @access  Agent only
 */
export declare const claimConversation: (req: AgentRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * @route   POST /api/agent/transfer/:conversationId
 * @desc    Transfer conversation to another agent or back to queue
 * @access  Agent only
 */
export declare const transferConversation: (req: AgentRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * @route   PUT /api/agent/status
 * @desc    Update agent availability status
 * @access  Agent only
 */
export declare const updateStatus: (req: AgentRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * @route   GET /api/agent/analytics
 * @desc    Get agent performance analytics
 * @access  Agent only
 */
export declare const getAnalytics: (req: AgentRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * @route   GET /api/agent/conversation/:id
 * @desc    Get a specific conversation with messages (for agent view)
 * @access  Agent only
 */
export declare const getAgentConversation: (req: AgentRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export {};
//# sourceMappingURL=agent.controller.d.ts.map