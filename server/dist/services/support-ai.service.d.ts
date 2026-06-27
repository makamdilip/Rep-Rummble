export interface ChatHistoryMessage {
    role: 'user' | 'assistant';
    content: string;
}
export interface AIChatResponse {
    reply: string;
    quickReplies: string[];
}
export declare function generateAIChatResponse(message: string, history: ChatHistoryMessage[]): Promise<AIChatResponse>;
export interface ChatMessage {
    role: string;
    content: string;
}
export interface SupportResponse {
    response: string;
    confidence: number;
    suggestedQuickReplies: string[];
    shouldEscalate: boolean;
    escalationReason?: string;
    priority?: string;
    category?: string;
    sentiment: 'positive' | 'neutral' | 'negative' | 'frustrated';
}
export declare function generateSupportResponse(query: string, history: ChatMessage[], _ctx?: {
    name?: string;
    email?: string;
}): Promise<SupportResponse>;
export declare function generateHandoffSummary(conversationHistory: ChatMessage[]): Promise<string>;
declare const _default: {
    generateAIChatResponse: typeof generateAIChatResponse;
    generateSupportResponse: typeof generateSupportResponse;
    generateHandoffSummary: typeof generateHandoffSummary;
};
export default _default;
//# sourceMappingURL=support-ai.service.d.ts.map