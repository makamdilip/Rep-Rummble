import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';
import chatSocket, { ChatMessage } from '../services/chatSocket';

export default function ChatScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const flatListRef = useRef<FlatList>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('active');
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    initializeChat();
    return () => {
      chatSocket.disconnect();
    };
  }, []);

  const initializeChat = async () => {
    try {
      // Start a new conversation
      const response = await api.post('/chat/start', {
        platform: Platform.OS,
        userName: user?.displayName || user?.email?.split('@')[0],
        userEmail: user?.email,
      });

      const { conversation, sessionId: newSessionId, welcomeMessage } = response.data.data;

      setConversationId(conversation._id);
      setSessionId(newSessionId);
      setStatus(conversation.status);

      if (welcomeMessage) {
        setMessages([welcomeMessage]);
      }

      // Connect socket
      chatSocket.connect();
      chatSocket.joinConversation(newSessionId, conversation._id);

      // Set up socket listeners
      chatSocket.onMessage((message) => {
        setMessages((prev) => [...prev, message]);
        // Update status if system message about agent
        if (message.senderType === 'system') {
          if (message.content.includes('Connecting you with')) {
            setStatus('waiting_agent');
          } else if (message.content.includes("You're now connected with")) {
            setStatus('with_agent');
          } else if (message.content.includes('resolved')) {
            setStatus('resolved');
          }
        }
      });

      chatSocket.onTyping((data) => {
        setIsTyping(true);
        setTypingUser(data.agentName || data.userName || 'Someone');
      });

      chatSocket.onStopTyping(() => {
        setIsTyping(false);
        setTypingUser(null);
      });

      chatSocket.onAgentAssigned((data) => {
        setStatus('with_agent');
      });

      chatSocket.onConversationResolved(() => {
        setStatus('resolved');
      });
    } catch (error) {
      console.error('Error initializing chat:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!inputText.trim() || isSending) return;

    const messageText = inputText.trim();
    setInputText('');
    setIsSending(true);

    // Optimistically add user message
    const tempMessage: ChatMessage = {
      _id: `temp-${Date.now()}`,
      conversationId: conversationId || '',
      senderType: 'user',
      senderName: user?.displayName || 'You',
      content: messageText,
      contentType: 'text',
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempMessage]);

    // Send via socket
    chatSocket.sendMessage(
      messageText,
      user?.displayName || user?.email?.split('@')[0],
      user?.email
    );

    setIsSending(false);
  };

  const handleQuickReply = (text: string) => {
    setInputText(text);
    handleSend();
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isUser = item.senderType === 'user';
    const isSystem = item.senderType === 'system';
    const isAI = item.senderType === 'ai';

    if (isSystem) {
      return (
        <View style={styles.systemMessageContainer}>
          <Text style={styles.systemMessage}>{item.content}</Text>
        </View>
      );
    }

    return (
      <View
        style={[
          styles.messageContainer,
          isUser ? styles.userMessageContainer : styles.otherMessageContainer,
        ]}
      >
        {!isUser && (
          <View style={styles.avatarContainer}>
            <View style={[styles.avatar, isAI ? styles.aiAvatar : styles.agentAvatar]}>
              <Ionicons
                name={isAI ? 'sparkles' : 'person'}
                size={16}
                color="#fff"
              />
            </View>
          </View>
        )}
        <View
          style={[
            styles.messageBubble,
            isUser ? styles.userBubble : styles.otherBubble,
          ]}
        >
          {!isUser && (
            <Text style={styles.senderName}>
              {item.senderName || (isAI ? 'AI Assistant' : 'Agent')}
            </Text>
          )}
          <Text style={[styles.messageText, isUser && styles.userMessageText]}>
            {item.content}
          </Text>
        </View>
      </View>
    );
  };

  const renderQuickReplies = () => {
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage?.quickReplies?.length || lastMessage.senderType === 'user') {
      return null;
    }

    return (
      <View style={styles.quickRepliesContainer}>
        {lastMessage.quickReplies.map((reply, index) => (
          <TouchableOpacity
            key={index}
            style={styles.quickReplyButton}
            onPress={() => handleQuickReply(reply.text)}
          >
            <Text style={styles.quickReplyText}>{reply.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
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

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#22c55e" />
        <Text style={styles.loadingText}>Starting chat...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Support</Text>
          <View style={styles.statusContainer}>
            <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
            <Text style={styles.statusText}>{getStatusText()}</Text>
          </View>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
          ListFooterComponent={
            isTyping ? (
              <View style={styles.typingContainer}>
                <Text style={styles.typingText}>{typingUser} is typing...</Text>
              </View>
            ) : null
          }
        />

        {/* Quick Replies */}
        {renderQuickReplies()}

        {/* Input */}
        {status !== 'resolved' && status !== 'closed' && (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              placeholderTextColor="#6b7280"
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={1000}
              onSubmitEditing={handleSend}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                !inputText.trim() && styles.sendButtonDisabled,
              ]}
              onPress={handleSend}
              disabled={!inputText.trim() || isSending}
            >
              {isSending ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Ionicons name="send" size={20} color="#fff" />
              )}
            </TouchableOpacity>
          </View>
        )}

        {(status === 'resolved' || status === 'closed') && (
          <View style={styles.closedBanner}>
            <Text style={styles.closedText}>
              This conversation has been resolved. Start a new chat if you need more help.
            </Text>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#9ca3af',
    marginTop: 12,
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2d2d2d',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  content: {
    flex: 1,
  },
  messagesList: {
    padding: 16,
    paddingBottom: 8,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    maxWidth: '80%',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
  },
  otherMessageContainer: {
    alignSelf: 'flex-start',
  },
  avatarContainer: {
    marginRight: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiAvatar: {
    backgroundColor: '#8b5cf6',
  },
  agentAvatar: {
    backgroundColor: '#3b82f6',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    maxWidth: '100%',
  },
  userBubble: {
    backgroundColor: '#22c55e',
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: '#2d2d2d',
    borderBottomLeftRadius: 4,
  },
  senderName: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 22,
  },
  userMessageText: {
    color: '#fff',
  },
  systemMessageContainer: {
    alignItems: 'center',
    marginVertical: 12,
  },
  systemMessage: {
    fontSize: 13,
    color: '#6b7280',
    backgroundColor: '#2d2d2d',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    textAlign: 'center',
  },
  typingContainer: {
    padding: 8,
  },
  typingText: {
    fontSize: 13,
    color: '#6b7280',
    fontStyle: 'italic',
  },
  quickRepliesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 8,
  },
  quickReplyButton: {
    backgroundColor: '#2d2d2d',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#22c55e',
  },
  quickReplyText: {
    fontSize: 14,
    color: '#22c55e',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#2d2d2d',
    backgroundColor: '#1e1e1e',
  },
  input: {
    flex: 1,
    backgroundColor: '#2d2d2d',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingRight: 48,
    fontSize: 16,
    color: '#fff',
    maxHeight: 120,
    marginRight: 8,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#22c55e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#3d3d3d',
  },
  closedBanner: {
    padding: 16,
    backgroundColor: '#2d2d2d',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  closedText: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
});
