---
id: 147
category: React LLD
priority: null
tags: [websocket, real-time, chat, state-management]
---

# How would you implement a live chat feature in React?

## Quick Answer

Use WebSocket for real-time bidirectional communication, maintain message state with useRef to prevent re-renders on every message, implement auto-scrolling to latest messages, show typing indicators using presence events, handle connection states (connecting, connected, disconnected), and implement reconnection logic with exponential backoff.

## Detailed Explanation

### WebSocket vs Polling

**WebSocket (Recommended):**
- ✅ Real-time, instant delivery
- ✅ Bidirectional communication
- ✅ Lower latency, less overhead
- ✅ Persistent connection
- ❌ More complex setup
- ❌ Need fallback for unsupported browsers

**Polling:**
- ✅ Simple to implement
- ✅ Works everywhere
- ❌ Delayed updates (interval-based)
- ❌ Unnecessary requests when no new messages
- ❌ Higher server load

### Architecture Components

```
ChatApp/
├── ChatContainer.tsx      # Main wrapper
├── MessageList.tsx        # Scrollable message list
├── MessageInput.tsx       # Input + send button
├── TypingIndicator.tsx    # Shows who's typing
├── ConnectionStatus.tsx   # Online/offline indicator
└── useWebSocket.ts        # Custom hook for WS logic
```

### State Management Strategy

**Messages State:**
```typescript
interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'read';
}
```

**Connection State:**
```typescript
type ConnectionState = 'connecting' | 'connected' | 'disconnected' | 'error';
```

**Typing State:**
```typescript
const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
```

### Performance Optimization

#### 1. Virtual Scrolling
For chat rooms with 1000+ messages:
- Use `react-window` or `react-virtualized`
- Only render visible messages
- Smooth scrolling performance

#### 2. Message Batching
- Group rapid messages
- Render in batches (every 100ms)
- Prevent excessive re-renders

#### 3. Memoization
```typescript
const MessageItem = React.memo(({ message }: { message: Message }) => {
  // Only re-render if message changes
});
```

#### 4. useRef for Non-UI Updates
```typescript
const messagesRef = useRef<Message[]>([]);
// Update ref without triggering re-render
messagesRef.current = [...messagesRef.current, newMessage];
```

### Auto-Scroll Implementation

**Strategy:**
1. Scroll to bottom on new message
2. Don't scroll if user scrolled up (reading history)
3. Show "New Messages" badge if scrolled up
4. Smooth scroll animation

```typescript
const messagesEndRef = useRef<HTMLDivElement>(null);

const scrollToBottom = () => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
};

useEffect(() => {
  scrollToBottom();
}, [messages]);
```

### Typing Indicator Logic

**Send typing event:**
```typescript
let typingTimeout: NodeJS.Timeout;

const handleInputChange = (text: string) => {
  setMessageText(text);
  
  // Send typing start
  if (text && !isTyping) {
    setIsTyping(true);
    ws.send(JSON.stringify({ type: 'typing_start' }));
  }
  
  // Clear previous timeout
  clearTimeout(typingTimeout);
  
  // Send typing stop after 2 seconds of inactivity
  typingTimeout = setTimeout(() => {
    setIsTyping(false);
    ws.send(JSON.stringify({ type: 'typing_stop' }));
  }, 2000);
};
```

**Receive typing events:**
```typescript
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  if (data.type === 'typing_start') {
    setTypingUsers(prev => new Set(prev).add(data.userId));
  } else if (data.type === 'typing_stop') {
    setTypingUsers(prev => {
      const newSet = new Set(prev);
      newSet.delete(data.userId);
      return newSet;
    });
  }
};
```

### Reconnection Strategy

**Exponential Backoff:**
```typescript
const connect = () => {
  const ws = new WebSocket(url);
  
  ws.onclose = () => {
    // Retry with increasing delays
    const delay = Math.min(1000 * Math.pow(2, retryCount), 30000);
    setTimeout(connect, delay);
    setRetryCount(prev => prev + 1);
  };
  
  ws.onopen = () => {
    setRetryCount(0); // Reset on successful connection
  };
};
```

### Message Status Tracking

1. **Sending**: Message in UI, not yet sent to server
2. **Sent**: Received by server
3. **Delivered**: Delivered to recipient(s)
4. **Read**: Recipient has seen the message

Update status based on server acknowledgments.

### Security Considerations

- Sanitize message content (prevent XSS)
- Validate message length
- Rate limiting on backend
- Authentication via JWT in WebSocket handshake
- Encrypt sensitive messages

## Code Example

```typescript
import React, { useState, useEffect, useRef, useCallback } from 'react';
import './LiveChat.css';

interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'read';
}

interface ChatProps {
  userId: string;
  userName: string;
  roomId: string;
}

const LiveChat: React.FC<ChatProps> = ({ userId, userName, roomId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [connectionState, setConnectionState] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const [isTyping, setIsTyping] = useState(false);
  
  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const retryCountRef = useRef(0);

  // Initialize WebSocket connection
  useEffect(() => {
    const connectWebSocket = () => {
      setConnectionState('connecting');
      
      const ws = new WebSocket(`wss://api.example.com/chat/${roomId}`);
      
      ws.onopen = () => {
        console.log('Connected to chat');
        setConnectionState('connected');
        retryCountRef.current = 0;
        
        // Send join message
        ws.send(JSON.stringify({
          type: 'join',
          userId,
          userName,
        }));
      };
      
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        switch (data.type) {
          case 'message':
            const newMessage: Message = {
              id: data.id,
              text: data.text,
              senderId: data.senderId,
              senderName: data.senderName,
              timestamp: new Date(data.timestamp),
              status: 'delivered',
            };
            setMessages(prev => [...prev, newMessage]);
            break;
            
          case 'typing_start':
            if (data.userId !== userId) {
              setTypingUsers(prev => new Set(prev).add(data.userName));
            }
            break;
            
          case 'typing_stop':
            setTypingUsers(prev => {
              const newSet = new Set(prev);
              newSet.delete(data.userName);
              return newSet;
            });
            break;
            
          case 'message_status':
            // Update message status
            setMessages(prev =>
              prev.map(msg =>
                msg.id === data.messageId
                  ? { ...msg, status: data.status }
                  : msg
              )
            );
            break;
        }
      };
      
      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setConnectionState('disconnected');
      };
      
      ws.onclose = () => {
        console.log('Disconnected from chat');
        setConnectionState('disconnected');
        
        // Exponential backoff reconnection
        const delay = Math.min(1000 * Math.pow(2, retryCountRef.current), 30000);
        reconnectTimeoutRef.current = setTimeout(() => {
          retryCountRef.current += 1;
          connectWebSocket();
        }, delay);
      };
      
      wsRef.current = ws;
    };
    
    connectWebSocket();
    
    // Cleanup
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [roomId, userId]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send message
  const sendMessage = useCallback(() => {
    if (!inputText.trim() || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      return;
    }
    
    const tempId = `temp-${Date.now()}`;
    const optimisticMessage: Message = {
      id: tempId,
      text: inputText.trim(),
      senderId: userId,
      senderName: userName,
      timestamp: new Date(),
      status: 'sending',
    };
    
    // Optimistic update
    setMessages(prev => [...prev, optimisticMessage]);
    setInputText('');
    
    // Send to server
    wsRef.current.send(JSON.stringify({
      type: 'message',
      text: inputText.trim(),
    }));
  }, [inputText, userId, userName]);

  // Handle typing indicator
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputText(text);
    
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      return;
    }
    
    // Send typing start
    if (text && !isTyping) {
      setIsTyping(true);
      wsRef.current.send(JSON.stringify({ type: 'typing_start' }));
    }
    
    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Send typing stop after inactivity
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      wsRef.current?.send(JSON.stringify({ type: 'typing_stop' }));
    }, 2000);
  };

  // Handle Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <h3>Live Chat</h3>
        <div className={`connection-status ${connectionState}`}>
          {connectionState === 'connected' ? '● Online' : 
           connectionState === 'connecting' ? '● Connecting...' : 
           '● Offline'}
        </div>
      </div>

      {/* Messages List */}
      <div className="messages-list">
        {messages.map(message => (
          <div
            key={message.id}
            className={`message ${message.senderId === userId ? 'own' : 'other'}`}
          >
            <div className="message-sender">{message.senderName}</div>
            <div className="message-text">{message.text}</div>
            <div className="message-meta">
              <span>{message.timestamp.toLocaleTimeString()}</span>
              <span className={`message-status ${message.status}`}>
                {message.status === 'sending' && '⏳'}
                {message.status === 'sent' && '✓'}
                {message.status === 'delivered' && '✓✓'}
                {message.status === 'read' && '✓✓'}
              </span>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {typingUsers.size > 0 && (
          <div className="typing-indicator">
            {Array.from(typingUsers).join(', ')} {typingUsers.size === 1 ? 'is' : 'are'} typing...
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="chat-input">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          disabled={connectionState !== 'connected'}
        />
        <button
          onClick={sendMessage}
          disabled={!inputText.trim() || connectionState !== 'connected'}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default LiveChat;
```

## Common Interview Follow-ups

1. **How to handle message history loading?**
   - Load last 50 messages on connect
   - Infinite scroll up to load older messages
   - Pagination with cursor-based approach

2. **How to support file/image sharing?**
   - Upload file to S3/storage first
   - Send message with file URL
   - Show upload progress
   - Preview images inline

3. **How to implement message reactions?**
   - Add reactions array to message object
   - Optimistic update on reaction click
   - Sync with server via WebSocket

4. **How to handle group chats vs 1-on-1?**
   - Same WebSocket architecture
   - Different room IDs
   - Show participant list for groups
   - Mention functionality (@username)
