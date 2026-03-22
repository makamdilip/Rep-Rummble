import { GoogleGenerativeAI } from '@google/generative-ai'

export interface ChatHistoryMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface AIChatResponse {
  reply: string
  quickReplies: string[]
}

// ── Gemini client (uses existing GEMINI_API_KEY from Render) ─
const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null

const SYSTEM_PROMPT = `You are Rumi, a friendly support assistant for Reprummble — an all-in-one fitness and wellness platform.

About Reprummble:
- Plans: Starter (Free forever), Pro ($9/mo - AI + wearables + analytics), Elite ($19/mo - everything + coach access). All start with a free trial, no card needed.
- Features: AI meal logging (photo or text), workout tracking, recovery readiness score, wearable sync, 30-day challenges, leaderboards, weekly analytics
- Wearables: Apple Watch, Oura Ring, Garmin, Whoop, Fitbit, Polar
- Support email: support@reprummble.com (24hr response weekdays)

Guidelines:
- Be warm, concise (under 120 words), friendly but not corporate
- Use bullet points for steps
- End with an offer to help further
- For billing disputes, refunds, security issues: direct to support@reprummble.com
- Never make up features that do not exist`

// ── Pre-written answer bank (rule-based fallback) ────────────
const ANSWER_BANK: Array<{ patterns: RegExp[]; reply: string; quickReplies: string[] }> = [
  {
    patterns: [/^(hi|hello|hey|good morning|good evening|sup)\b/i],
    reply: "Hey! 👋 I'm Rumi, your Reprummble support assistant. I can help with features, billing, workouts, nutrition, or technical issues.\n\nWhat can I help you with today?",
    quickReplies: ['How do I log a meal?', 'Pricing & plans', 'Connect my wearable', 'Technical issue'],
  },
  {
    patterns: [/\b(price|plan|cost|subscription|how much|free trial|upgrade|monthly|annual|paid)\b/i],
    reply: "Reprummble has 3 plans:\n\n• **Starter** — Free forever (basic tracking)\n• **Pro** — $9/month (AI features + wearable sync + full analytics)\n• **Elite** — $19/month (everything + personal coach access)\n\nAll plans start with a **free trial** — no card needed. Cancel anytime.",
    quickReplies: ['Start free trial', 'What does Pro include?', 'How do I cancel?'],
  },
  {
    patterns: [/\b(cancel|refund|money back|unsubscribe|stop subscription)\b/i],
    reply: "To cancel:\n\n1. Go to **Settings → Account → Subscription**\n2. Tap **Cancel Plan**\n3. You keep access until your billing period ends\n\nFor refunds, email **support@reprummble.com** — handled within 24 hours.",
    quickReplies: ['Contact support', 'Will I lose my data?', 'Switch to free plan'],
  },
  {
    patterns: [/\b(log meal|track food|calorie|nutrition|macro|log food|add meal|what did i eat)\b/i],
    reply: "Logging meals is quick!\n\n**Photo logging** (fastest):\n1. Tap **+** on your dashboard\n2. Take a photo — AI fills in the macros automatically\n\n**Text logging**:\n1. Type what you ate (e.g. \"2 eggs and toast\")\n2. Review & save\n\nYour macros update instantly. 🥗",
    quickReplies: ['Edit a logged meal', 'Set my macro goals', 'Photo logging tips'],
  },
  {
    patterns: [/\b(workout|exercise|training|log workout|strength|gym|run|cardio)\b/i],
    reply: "To track a workout:\n\n1. Tap **Start Session** on your dashboard\n2. Log sets/reps or duration for each exercise\n3. Tap **Complete Session** when done\n\nYour AI training plan adapts weekly based on performance and recovery. Customise in **Profile → Goals**.",
    quickReplies: ['My recovery score', 'Add a custom exercise', 'How does my plan adapt?'],
  },
  {
    patterns: [/\b(recovery|readiness|hrv|sleep score|resting heart|rest day|readiness score)\b/i],
    reply: "Your **Readiness Score** (0–100) is calculated from:\n• Sleep quality & duration\n• Resting heart rate\n• HRV\n• Recent training load\n\n**80–100**: Train hard 💪 | **50–79**: Moderate | **Below 50**: Rest 😴\n\nConnect a wearable for the most accurate score.",
    quickReplies: ['Connect my wearable', 'Why is my score low?', 'What is HRV?'],
  },
  {
    patterns: [/\b(wearable|apple watch|garmin|oura|whoop|fitbit|polar|sync device|connect device)\b/i],
    reply: "Reprummble syncs with 6 wearables:\n⌚ Apple Watch · 💍 Oura Ring · 🗺️ Garmin · 📟 Whoop · Fitbit · Polar\n\nTo connect:\n1. Go to **Settings → Devices**\n2. Select your device\n3. Follow pairing instructions\n\nData syncs automatically on app open. 🔄",
    quickReplies: ["Why isn't my device syncing?", 'Remove a device', 'Supported devices list'],
  },
  {
    patterns: [/\b(challenge|leaderboard|streak|community|rank|points|badge)\b/i],
    reply: "Community features:\n\n• **30-day challenges** — Join from the Explore tab\n• **Leaderboard** — Your weekly rank vs. all members\n• **Streaks** — Log daily to keep yours going 🔥\n\nChallenges reset monthly and earn you XP for the global leaderboard.",
    quickReplies: ['Join a challenge', 'Leaderboard location', 'I lost my streak'],
  },
  {
    patterns: [/\b(login|sign in|forgot password|locked out|can.t access|password reset)\b/i],
    reply: "Account access fix:\n\n**Forgot password?**\n1. Tap **Forgot Password** on the login page\n2. Check your email (and spam!) for the reset link\n\n**Still locked out?**\nEmail **support@reprummble.com** — we'll get you in within a few hours.",
    quickReplies: ['Reset my password', 'Change my email', 'Delete my account'],
  },
  {
    patterns: [/\b(delete account|close account|remove my data|gdpr|data export)\b/i],
    reply: "To delete your account: **Settings → Delete Account**\n\nThis permanently removes all your data and cannot be undone.\n\nFor a **data export** (GDPR), email **support@reprummble.com** — we'll send your archive within 7 days.",
    quickReplies: ['Export my data', 'What data do you store?', 'Cancel subscription first'],
  },
  {
    patterns: [/\b(not working|bug|crash|error|broken|glitch|slow|blank|loading|issue|problem)\b/i],
    reply: "Let's troubleshoot:\n\n1. **Force-close** the app and reopen it\n2. Check your internet connection\n3. Make sure the app is **up to date**\n4. Try **signing out and back in**\n\nStill broken? Email **support@reprummble.com** — we investigate within 24 hours.",
    quickReplies: ['Clear app cache', 'Report a bug', "It's still not working"],
  },
  {
    patterns: [/\b(notification|reminder|alert|push notification|turn off|stop email)\b/i],
    reply: "Manage all notifications in **Settings → Notifications**:\n\n• Workout reminders\n• Weekly progress reports\n• Challenge alerts\n• Recovery alerts\n• Tips & news\n\nFor push notifications, also check your phone's notification settings for Reprummble.",
    quickReplies: ['Turn off all emails', 'Set reminder time', "I'm not getting notifications"],
  },
  {
    patterns: [/\b(contact|email support|human|agent|real person|speak to|talk to)\b/i],
    reply: "Reach our team at:\n\n📧 **support@reprummble.com**\n\nWe respond within **24 hours** on weekdays. Add \"URGENT\" for billing or security issues.\n\nAnything else I can help with first?",
    quickReplies: ['Billing issue', 'Technical problem', 'Account question'],
  },
]

function getRuleBasedResponse(message: string): AIChatResponse {
  const lower = message.toLowerCase().trim()
  for (const item of ANSWER_BANK) {
    if (item.patterns.some((p) => p.test(lower))) {
      return { reply: item.reply, quickReplies: item.quickReplies }
    }
  }
  return {
    reply: "Thanks for reaching out! Could you tell me more about what you need help with?\n\n• A feature question\n• Billing or subscription\n• A technical issue\n• Account access\n\nOr email us at **support@reprummble.com** 📧",
    quickReplies: ['How to log meals', 'Pricing & plans', 'Technical issue', 'Contact support'],
  }
}

function getContextualQuickReplies(msg: string, reply: string): string[] {
  const t = (msg + ' ' + reply).toLowerCase()
  if (/meal|food|nutrition|calorie|macro/.test(t)) return ['Edit a logged meal', 'Set macro goals', 'Photo tips']
  if (/workout|exercise|training/.test(t)) return ['Log a workout', 'My recovery score', 'Adjust plan']
  if (/plan|price|subscription/.test(t)) return ['Start free trial', 'Compare plans', 'How to cancel']
  if (/wearable|device|sync/.test(t)) return ['Supported devices', 'Sync issues', 'Remove device']
  if (/account|password|login/.test(t)) return ['Reset password', 'Change email', 'Delete account']
  return ['Log a meal', 'Pricing & plans', 'Technical help']
}

export async function generateAIChatResponse(
  message: string,
  history: ChatHistoryMessage[]
): Promise<AIChatResponse> {
  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        systemInstruction: SYSTEM_PROMPT,
      })

      // Build Gemini chat history (must alternate user/model)
      const geminiHistory = history.map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }))

      const chat = model.startChat({ history: geminiHistory })
      const result = await chat.sendMessage(message)
      const text = result.response.text()
      return { reply: text, quickReplies: getContextualQuickReplies(message, text) }
    } catch (err) {
      console.error('Gemini API error — using rule-based fallback:', err)
    }
  }
  return getRuleBasedResponse(message)
}

// ── Legacy compatibility kept for socket.ts / agent controller ─
export interface ChatMessage { role: string; content: string }
export interface SupportResponse {
  response: string; confidence: number; suggestedQuickReplies: string[]
  shouldEscalate: boolean; escalationReason?: string; priority?: string
  category?: string; sentiment: 'positive' | 'neutral' | 'negative' | 'frustrated'
}
export async function generateSupportResponse(
  query: string,
  history: ChatMessage[],
  _ctx?: { name?: string; email?: string }
): Promise<SupportResponse> {
  const mapped = history
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }))
  const result = await generateAIChatResponse(query, mapped)
  return { response: result.reply, confidence: 0.9, suggestedQuickReplies: result.quickReplies, shouldEscalate: false, sentiment: 'neutral' }
}

export async function generateHandoffSummary(conversationHistory: ChatMessage[]): Promise<string> {
  if (!conversationHistory.length) return 'User needs assistance. Please review the conversation.'
  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
      const text = conversationHistory.slice(-5).map(m => `${m.role}: ${m.content}`).join('\n')
      const result = await model.generateContent(`Summarize this support conversation in 2 sentences for a human agent:\n${text}`)
      return result.response.text().trim()
    } catch { /* fall through */ }
  }
  return 'User requires assistance. Please review the conversation history.'
}

export default { generateAIChatResponse, generateSupportResponse, generateHandoffSummary }
