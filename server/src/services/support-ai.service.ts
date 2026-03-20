import { GoogleGenerativeAI } from '@google/generative-ai'

// Types
export interface ChatMessage {
  role: string
  content: string
}

export interface SupportResponse {
  response: string
  confidence: number
  suggestedQuickReplies: string[]
  shouldEscalate: boolean
  escalationReason?: string
  priority?: 'low' | 'medium' | 'high' | 'urgent'
  category?: string
  sentiment: 'positive' | 'neutral' | 'negative' | 'frustrated'
}

export interface UserContext {
  name?: string
  email?: string
  subscription?: string
  userId?: string
}

// Initialize Gemini client
let genAI: GoogleGenerativeAI | null = null

if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
}

const SUPPORT_SYSTEM_PROMPT = `You are a helpful customer support assistant for Reprummble, a fitness and nutrition tracking app.

About Reprummble:
- Mobile app for tracking meals, workouts, and recovery
- Features: AI-powered meal logging with photo analysis, workout tracking, daily streaks, leaderboards
- Subscription plans: Free trial (7 days), Monthly ($9.99), Annual ($79.99)
- Integrations: Wearable devices, health reports for doctors

Your role:
1. Answer questions about app features and how to use them
2. Help with account issues (login, profile, settings)
3. Explain subscription plans and billing
4. Provide basic fitness and nutrition guidance within the app context
5. Troubleshoot common technical issues (sync, notifications, camera)

Guidelines:
- Be friendly, concise, and helpful
- Keep responses under 150 words
- If you cannot help with something, indicate that a human agent can assist
- Detect user frustration and recommend human escalation when appropriate
- Never make up information about features that don't exist

Escalation triggers (set shouldEscalate to true):
- User explicitly requests human/agent ("talk to human", "real person", "agent please")
- Billing disputes or refund requests
- Account security issues (hacked, unauthorized access)
- Technical bugs you cannot troubleshoot
- User expresses frustration repeatedly
- Questions about legal/privacy matters

Categories: billing, technical, account, general, feedback`

/**
 * Generate AI response for customer support query
 */
export async function generateSupportResponse(
  query: string,
  conversationHistory: ChatMessage[],
  userContext?: UserContext
): Promise<SupportResponse> {
  try {
    if (!genAI) {
      return getMockSupportResponse(query)
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    // Build conversation context
    const historyContext = conversationHistory
      .slice(-10) // Last 10 messages for context
      .map(m => `${m.role}: ${m.content}`)
      .join('\n')

    const userInfo = userContext?.name
      ? `\nUser Info: Name: ${userContext.name}${userContext.email ? `, Email: ${userContext.email}` : ''}${userContext.subscription ? `, Plan: ${userContext.subscription}` : ''}`
      : ''

    const prompt = `${SUPPORT_SYSTEM_PROMPT}
${userInfo}

Conversation history:
${historyContext}

User's current message: "${query}"

Respond with ONLY a valid JSON object (no markdown, no code blocks):
{
  "response": "your helpful response to the user",
  "confidence": 0.0-1.0,
  "suggestedQuickReplies": ["option 1", "option 2", "option 3"],
  "shouldEscalate": false,
  "escalationReason": "reason if escalating",
  "priority": "low|medium|high|urgent",
  "category": "billing|technical|account|general|feedback",
  "sentiment": "positive|neutral|negative|frustrated"
}`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Parse JSON from response
    let jsonStr = text.trim()
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
    if (jsonMatch) {
      jsonStr = jsonMatch[1]
    }

    const data = JSON.parse(jsonStr)

    return {
      response: data.response || "I'm here to help! Could you please tell me more about your question?",
      confidence: data.confidence || 0.7,
      suggestedQuickReplies: data.suggestedQuickReplies || [],
      shouldEscalate: data.shouldEscalate || false,
      escalationReason: data.escalationReason,
      priority: data.priority || 'medium',
      category: data.category || 'general',
      sentiment: data.sentiment || 'neutral'
    }
  } catch (error) {
    console.error('Support AI Error:', error)
    return getMockSupportResponse(query)
  }
}

/**
 * Analyze if escalation to human agent is needed
 */
export async function analyzeEscalationNeed(
  _conversationHistory: ChatMessage[],
  currentQuery: string
): Promise<{
  shouldEscalate: boolean
  reason: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
}> {
  // Quick keyword check for explicit escalation requests
  const escalationKeywords = [
    'human', 'agent', 'real person', 'talk to someone', 'supervisor',
    'manager', 'support team', 'speak to', 'connect me'
  ]

  const lowerQuery = currentQuery.toLowerCase()
  if (escalationKeywords.some(kw => lowerQuery.includes(kw))) {
    return {
      shouldEscalate: true,
      reason: 'User requested human agent',
      priority: 'medium'
    }
  }

  // Check for billing/refund keywords
  const billingKeywords = ['refund', 'charge', 'cancel subscription', 'billing issue', 'unauthorized charge']
  if (billingKeywords.some(kw => lowerQuery.includes(kw))) {
    return {
      shouldEscalate: true,
      reason: 'Billing or refund request',
      priority: 'high'
    }
  }

  // Check for security keywords
  const securityKeywords = ['hacked', 'unauthorized', 'someone accessed', 'security', 'password stolen']
  if (securityKeywords.some(kw => lowerQuery.includes(kw))) {
    return {
      shouldEscalate: true,
      reason: 'Account security concern',
      priority: 'urgent'
    }
  }

  // Check for frustration indicators
  const frustrationKeywords = ['frustrated', 'annoyed', 'angry', 'useless', 'terrible', 'worst', 'hate']
  if (frustrationKeywords.some(kw => lowerQuery.includes(kw))) {
    return {
      shouldEscalate: true,
      reason: 'User expressing frustration',
      priority: 'high'
    }
  }

  return {
    shouldEscalate: false,
    reason: '',
    priority: 'low'
  }
}

/**
 * Generate a summary of the conversation for agent handoff
 */
export async function generateHandoffSummary(
  conversationHistory: ChatMessage[]
): Promise<string> {
  try {
    if (!genAI || conversationHistory.length === 0) {
      return 'User needs assistance. Please review the conversation.'
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const historyText = conversationHistory
      .map(m => `${m.role}: ${m.content}`)
      .join('\n')

    const prompt = `Summarize this customer support conversation in 2-3 sentences for the human agent taking over. Focus on:
1. What the user needs help with
2. What has already been attempted
3. Any important context

Conversation:
${historyText}

Provide only the summary, no JSON or formatting.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text().trim()
  } catch (error) {
    console.error('Handoff summary error:', error)
    return 'User requires assistance. Please review the conversation history.'
  }
}

/**
 * Mock response when AI is not available
 */
function getMockSupportResponse(query: string): SupportResponse {
  // Check for common patterns
  const lowerQuery = query.toLowerCase()

  // Greeting
  if (lowerQuery.match(/^(hi|hello|hey|good morning|good evening)/)) {
    return {
      response: "Hello! Welcome to Reprummble support. I'm here to help you with any questions about the app. What can I assist you with today?",
      confidence: 0.9,
      suggestedQuickReplies: ['How do I log meals?', 'Subscription plans', 'Technical issue'],
      shouldEscalate: false,
      category: 'general',
      sentiment: 'positive'
    }
  }

  // Escalation request
  if (lowerQuery.includes('human') || lowerQuery.includes('agent') || lowerQuery.includes('real person')) {
    return {
      response: "I understand you'd like to speak with a human agent. Let me connect you right away.",
      confidence: 0.95,
      suggestedQuickReplies: [],
      shouldEscalate: true,
      escalationReason: 'User requested human agent',
      priority: 'medium',
      category: 'general',
      sentiment: 'neutral'
    }
  }

  // Default response
  return {
    response: "Thanks for reaching out! I'm currently in limited mode, but I can still help with basic questions. For the best experience, a human agent will be with you shortly.",
    confidence: 0.5,
    suggestedQuickReplies: ['Talk to human', 'Try again later'],
    shouldEscalate: true,
    escalationReason: 'AI service in fallback mode',
    priority: 'medium',
    category: 'general',
    sentiment: 'neutral'
  }
}

export default {
  generateSupportResponse,
  analyzeEscalationNeed,
  generateHandoffSummary
}
