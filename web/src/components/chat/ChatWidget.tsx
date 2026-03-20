import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../../hooks/useChat';
import './ChatWidget.css';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    status,
    isLoading,
    isSending,
    isTyping,
    typingUser,
    startChat,
    sendMessage,
    closeChat,
  } = useChat({
    userName: 'Guest',
    autoConnect: false,
  });

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      startChat();
    }
  }, [isOpen, messages.length, startChat]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    sendMessage(inputValue);
    setInputValue('');
  };

  const handleQuickReply = (text: string) => {
    sendMessage(text);
  };

  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return '#22c55e';
      case 'waiting_agent':
        return '#eab308';
      case 'with_agent':
        return '#3b82f6';
      case 'resolved':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'active':
        return 'AI Assistant';
      case 'waiting_agent':
        return 'Connecting to agent...';
      case 'with_agent':
        return 'Live Agent';
      case 'resolved':
        return 'Resolved';
      default:
        return 'Support';
    }
  };

  const lastMessage = messages[messages.length - 1];
  const showQuickReplies =
    lastMessage?.quickReplies?.length &&
    lastMessage.senderType !== 'user' &&
    status !== 'resolved';

  return (
    <div className="chat-widget">
      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div>
                <div className="chat-header-title">Reprummble Support</div>
                <div className="chat-status">
                  <span
                    className="chat-status-dot"
                    style={{ backgroundColor: getStatusColor() }}
                  />
                  {getStatusText()}
                </div>
              </div>
            </div>
            <button className="chat-close-btn" onClick={handleClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {isLoading ? (
              <div className="chat-loading">
                <div className="chat-loading-spinner" />
                <span>Starting chat...</span>
              </div>
            ) : (
              <>
                {messages.map((message) => {
                  const isUser = message.senderType === 'user';
                  const isSystem = message.senderType === 'system';
                  const isAI = message.senderType === 'ai';

                  if (isSystem) {
                    return (
                      <div key={message._id} className="chat-system-message">
                        {message.content}
                      </div>
                    );
                  }

                  return (
                    <div
                      key={message._id}
                      className={`chat-message ${isUser ? 'user' : 'other'}`}
                    >
                      {!isUser && (
                        <div className={`chat-message-avatar ${isAI ? 'ai' : 'agent'}`}>
                          {isAI ? '✨' : '👤'}
                        </div>
                      )}
                      <div className={`chat-bubble ${isUser ? 'user' : 'other'}`}>
                        {!isUser && (
                          <div className="chat-sender-name">
                            {message.senderName || (isAI ? 'AI Assistant' : 'Agent')}
                          </div>
                        )}
                        <div className="chat-message-text">{message.content}</div>
                      </div>
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="chat-typing">
                    <span>{typingUser} is typing</span>
                    <span className="chat-typing-dots">
                      <span>.</span>
                      <span>.</span>
                      <span>.</span>
                    </span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Quick Replies */}
          {showQuickReplies && (
            <div className="chat-quick-replies">
              {lastMessage.quickReplies!.map((reply, index) => (
                <button
                  key={index}
                  className="chat-quick-reply"
                  onClick={() => handleQuickReply(reply.text)}
                >
                  {reply.text}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          {status !== 'resolved' && status !== 'closed' && (
            <form className="chat-input-area" onSubmit={handleSend}>
              <input
                type="text"
                className="chat-input"
                placeholder="Type a message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading || isSending}
              />
              <button
                type="submit"
                className="chat-send-btn"
                disabled={!inputValue.trim() || isLoading || isSending}
              >
                {isSending ? (
                  <div className="chat-send-spinner" />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                )}
              </button>
            </form>
          )}

          {(status === 'resolved' || status === 'closed') && (
            <div className="chat-resolved-banner">
              This conversation has been resolved. Start a new chat if you need more help.
            </div>
          )}
        </div>
      )}

      {/* FAB Button */}
      <button className="chat-fab" onClick={handleToggle}>
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
