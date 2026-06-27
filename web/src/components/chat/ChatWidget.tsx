import React, { useState, useRef, useEffect, useCallback } from 'react'
import './ChatWidget.css'

const API_BASE = import.meta.env.VITE_API_URL || ''

interface Message {
  id: string
  role: 'user' | 'assistant'
  text: string
  quickReplies?: string[]
  ts: number
}

const WELCOME: Message = {
  id: 'welcome',
  role: 'assistant',
  text: "Hey! 👋 I'm **Rumi**, your Reprummble support assistant. I can help with features, billing, workouts, nutrition, or technical issues.\n\nWhat can I help you with today?",
  quickReplies: ['How do I log a meal?', 'Pricing & plans', 'Connect my wearable', 'Technical issue'],
  ts: Date.now(),
}

function renderText(text: string) {
  // Bold **text** and newlines
  return text.split('\n').map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g)
    return (
      <React.Fragment key={i}>
        {parts.map((p, j) =>
          p.startsWith('**') && p.endsWith('**')
            ? <strong key={j}>{p.slice(2, -2)}</strong>
            : p
        )}
        {i < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    )
  })
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [unread, setUnread] = useState(0)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (isOpen) {
      setUnread(0)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', text: trimmed, ts: Date.now() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      // Build history from current messages (exclude welcome)
      const history = messages
        .filter(m => m.id !== 'welcome')
        .map(m => ({ role: m.role, content: m.text }))

      const res = await fetch(`${API_BASE}/api/chat/ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history }),
      })

      if (!res.ok) throw new Error('Server error')
      const data = await res.json()

      const aiMsg: Message = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        text: data.data?.reply || "I'm having trouble responding right now. Please email **support@reprummble.com** and we'll help shortly.",
        quickReplies: data.data?.quickReplies || [],
        ts: Date.now(),
      }

      setMessages(prev => [...prev, aiMsg])
      if (!isOpen) setUnread(u => u + 1)
    } catch {
      const errorMsg: Message = {
        id: `e-${Date.now()}`,
        role: 'assistant',
        text: "Sorry, I couldn't connect right now. Please try again or email **support@reprummble.com** — we respond within 24 hours.",
        quickReplies: ['Try again', 'Email support'],
        ts: Date.now(),
      }
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setLoading(false)
    }
  }, [messages, loading, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleQuickReply = (text: string) => {
    if (text === 'Email support') {
      window.location.href = 'mailto:support@reprummble.com'
      return
    }
    sendMessage(text)
  }

  const lastMsg = messages[messages.length - 1]
  const showQuickReplies = lastMsg?.role === 'assistant' && lastMsg.quickReplies?.length

  return (
    <div className="chat-widget">
      {/* Chat window */}
      {isOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">✨</div>
              <div>
                <div className="chat-header-title">Reprummble Support</div>
                <div className="chat-status">
                  <span className="chat-status-dot" style={{ backgroundColor: '#22d3bb' }} />
                  Rumi · AI Assistant
                </div>
              </div>
            </div>
            <button className="chat-close-btn" onClick={() => setIsOpen(false)} aria-label="Close chat">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`chat-message ${msg.role === 'user' ? 'user' : 'other'}`}>
                {msg.role === 'assistant' && (
                  <div className="chat-message-avatar ai">✨</div>
                )}
                <div className={`chat-bubble ${msg.role === 'user' ? 'user' : 'other'}`}>
                  {msg.role === 'assistant' && (
                    <div className="chat-sender-name">Rumi</div>
                  )}
                  <div className="chat-message-text">{renderText(msg.text)}</div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="chat-message other">
                <div className="chat-message-avatar ai">✨</div>
                <div className="chat-bubble other">
                  <div className="chat-sender-name">Rumi</div>
                  <div className="chat-typing-dots">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          {showQuickReplies && !loading && (
            <div className="chat-quick-replies">
              {lastMsg.quickReplies!.map((r, i) => (
                <button key={i} className="chat-quick-reply" onClick={() => handleQuickReply(r)}>
                  {r}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form className="chat-input-area" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              className="chat-input"
              placeholder="Ask me anything..."
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              className="chat-send-btn"
              disabled={!input.trim() || loading}
              aria-label="Send"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* FAB */}
      <button className="chat-fab" onClick={() => setIsOpen(o => !o)} aria-label="Open support chat">
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {unread > 0 && <span className="chat-unread-badge">{unread}</span>}
          </>
        )}
      </button>
    </div>
  )
}
