---
id: 200
category: Express.js
priority: high
tags: [express, middleware, routing, nodejs, web-framework]
---

# What is Express.js and why is it used?

## Quick Answer
Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications. It simplifies server-side development by providing middleware support, routing, and request/response handling.

## Detailed Explanation

**Why Express.js?**

• **Minimalist**: Unopinionated framework that doesn't force a specific structure
• **Middleware Architecture**: Chain functions to process requests sequentially
• **Routing**: Simple API for defining routes based on HTTP methods and URLs
• **Template Engines**: Support for various templating engines (EJS, Pug, Handlebars)
• **Error Handling**: Centralized error handling through middleware
• **Large Ecosystem**: Thousands of third-party middleware packages available
• **Performance**: Lightweight with minimal overhead

**Key Features:**

1. **Routing System**: Define routes for different HTTP methods (GET, POST, PUT, DELETE)
2. **Middleware Functions**: Execute code, modify request/response objects, end request-response cycle
3. **Template Engine Integration**: Render dynamic HTML pages
4. **Static File Serving**: Serve CSS, JavaScript, images, etc.
5. **Request Parsing**: Parse JSON, URL-encoded data, multipart forms
6. **Error Handling**: Centralized error management

**Use Cases:**

- RESTful APIs
- Single Page Applications (SPA) backend
- Real-time applications with WebSockets
- Microservices architecture
- Server-side rendering applications

## Code Example
```javascript
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

// Route with parameters
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ userId, name: 'John Doe' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## What is Middleware in Express.js?

## Quick Answer
Middleware functions are functions that have access to the request object (req), response object (res), and the next middleware function in the application's request-response cycle. They can execute code, modify req/res objects, end the cycle, or call the next middleware.

## Detailed Explanation

**Types of Middleware:**

1. **Application-level**: Bound to app object using `app.use()` or `app.METHOD()`
2. **Router-level**: Bound to router object using `router.use()` or `router.METHOD()`
3. **Error-handling**: Takes four arguments (err, req, res, next)
4. **Built-in**: express.json(), express.static(), express.urlencoded()
5. **Third-party**: body-parser, cors, morgan, helmet, etc.

**Middleware Execution Order:**

• Middleware executes sequentially in the order they are defined
• Each middleware must either end the response or call `next()`
• If `next()` is not called, the request will hang
• Error-handling middleware must have 4 parameters

**Common Use Cases:**

- Authentication & Authorization
- Request logging
- Input validation
- CORS handling
- Rate limiting
- Error handling
- Request/response modification

## Code Example
```javascript
const express = require('express');
const app = express();

// Application-level middleware (runs on all routes)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next(); // Pass control to next middleware
});

// Built-in middleware
app.use(express.json());
app.use(express.static('public'));

// Route-specific middleware
const authenticateUser = (req, res, next) => {
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  // Verify token (simplified)
  if (token === 'valid-token') {
    req.user = { id: 1, name: 'John Doe' };
    next();
  } else {
    res.status(403).json({ error: 'Invalid token' });
  }
};

// Protected route
app.get('/profile', authenticateUser, (req, res) => {
  res.json({ user: req.user });
});

// Error-handling middleware (must have 4 params)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(3000);
```

---

## How does routing work in Express.js?

## Quick Answer
Routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, PUT, DELETE, etc.).

## Detailed Explanation

**Route Definition Structure:**

`app.METHOD(PATH, HANDLER)`

Where:
- **app**: Express application instance
- **METHOD**: HTTP method (get, post, put, delete, patch, etc.)
- **PATH**: Endpoint path on the server
- **HANDLER**: Callback function executed when route is matched

**Route Parameters:**

• Dynamic segments in the URL path (e.g., `/users/:id`)
• Accessed via `req.params`
• Can use regex patterns for validation

**Route Methods:**

- GET: Retrieve data
- POST: Create new resource
- PUT: Update entire resource
- PATCH: Partial update
- DELETE: Remove resource
- ALL: Match all HTTP methods

**Advanced Routing:**

1. **Route Chaining**: Chain multiple handlers for same route
2. **Router Object**: Organize routes into modular, mountable route handlers
3. **Route Prefixing**: Group related routes with common prefix
4. **Wildcard Routes**: Use `*` for catch-all patterns

## Code Example
```javascript
const express = require('express');
const router = express.Router();

// Basic routes
app.get('/', (req, res) => {
  res.send('Home Page');
});

app.post('/users', (req, res) => {
  res.status(201).json({ message: 'User created' });
});

// Route with parameters
app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});

// Route with query parameters
app.get('/search', (req, res) => {
  const { q, page = 1, limit = 10 } = req.query;
  res.json({ query: q, page, limit });
});

// Route chaining
app.route('/users/:id')
  .get((req, res) => {
    res.json({ action: 'get user' });
  })
  .put((req, res) => {
    res.json({ action: 'update user' });
  })
  .delete((req, res) => {
    res.json({ action: 'delete user' });
  });

// Using Router for modular routes
router.get('/', (req, res) => {
  res.json({ message: 'Products list' });
});

router.post('/', (req, res) => {
  res.status(201).json({ message: 'Product created' });
});

app.use('/products', router);

app.listen(3000);
```

---

## How to handle errors in Express.js?

## Quick Answer
Express has a built-in error-handling mechanism using middleware functions with four arguments: (err, req, res, next). Errors can be handled synchronously with try-catch or asynchronously by passing errors to next().

## Detailed Explanation

**Error Handling Approaches:**

1. **Synchronous Errors**: Caught automatically by Express
2. **Asynchronous Errors**: Must be passed to `next(err)`
3. **Promise Rejections**: Use `.catch(next)` or async/await with try-catch
4. **Centralized Error Handler**: Single middleware for all errors

**Best Practices:**

• Always handle errors to prevent crashes
• Use centralized error handling middleware
• Log errors for debugging
• Send appropriate HTTP status codes
• Don't expose sensitive error details in production
• Use error classes for different error types

**Error Propagation:**

- Call `next(error)` to pass error to error-handling middleware
- Error-handling middleware must have exactly 4 parameters
- Define error handlers after all other middleware and routes

## Code Example
```javascript
const express = require('express');
const app = express();

// Custom error class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

// Async error handler wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Route with error handling
app.get('/users/:id', asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    throw new AppError('User not found', 404);
  }
  
  res.json(user);
}));

// Synchronous error
app.get('/error', (req, res, next) => {
  try {
    throw new Error('Something broke!');
  } catch (err) {
    next(err); // Pass to error handler
  }
});

// 404 handler
app.use((req, res, next) => {
  next(new AppError('Route not found', 404));
});

// Centralized error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  
  // Log error in development
  if (process.env.NODE_ENV === 'development') {
    console.error('ERROR 💥', err);
  }
  
  // Send error response
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

app.listen(3000);
```

---

## What is the difference between req.params, req.query, and req.body?

## Quick Answer
- **req.params**: Contains route parameters (e.g., `/users/:id` → `req.params.id`)
- **req.query**: Contains URL query string parameters (e.g., `/search?q=test` → `req.query.q`)
- **req.body**: Contains data sent in the request body (requires body-parser middleware)

## Detailed Explanation

**req.params:**

• Extracted from the URL path
• Defined in route definition with `:` prefix
• Used for identifying specific resources
• Example: `/users/123` → `req.params.id = '123'`

**req.query:**

• Extracted from URL query string (after `?`)
• Automatically parsed by Express
• Used for filtering, sorting, pagination
• Example: `/users?page=2&limit=10` → `req.query = { page: '2', limit: '10' }`

**req.body:**

• Contains data sent in POST/PUT/PATCH requests
• Requires middleware like `express.json()` or `express.urlencoded()`
• Used for creating/updating resources
• Can be JSON, form data, or multipart

**Security Considerations:**

- Always validate and sanitize input from all sources
- Never trust client-side data
- Use validation libraries (Joi, express-validator)
- Limit request body size to prevent DoS attacks

## Code Example
```javascript
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route parameters
app.get('/users/:userId/posts/:postId', (req, res) => {
  console.log(req.params.userId); // '123'
  console.log(req.params.postId); // '456'
  res.json(req.params);
});

// Query parameters
app.get('/products', (req, res) => {
  const { category, minPrice, maxPrice, sort, page = 1 } = req.query;
  
  // Build query based on filters
  const filters = {};
  if (category) filters.category = category;
  if (minPrice) filters.price = { $gte: Number(minPrice) };
  if (maxPrice) filters.price = { ...filters.price, $lte: Number(maxPrice) };
  
  res.json({ filters, page, message: 'Products retrieved' });
});

// Request body
app.post('/users', (req, res) => {
  const { name, email, password } = req.body;
  
  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  // Create user (simplified)
  const newUser = { id: Date.now(), name, email };
  res.status(201).json(newUser);
});

// Combined example
app.put('/users/:id/profile', (req, res) => {
  const userId = req.params.id;           // From URL path
  const { fields } = req.query;           // From query string
  const profileData = req.body;           // From request body
  
  res.json({
    userId,
    fieldsToReturn: fields,
    updatedData: profileData
  });
});

app.listen(3000);
```

---

## How to implement authentication in Express.js?

## Quick Answer
Authentication in Express is typically implemented using middleware that verifies user credentials (JWT, sessions, OAuth). The middleware checks for valid tokens/credentials and attaches user information to the request object for downstream handlers.

## Detailed Explanation

**Authentication Strategies:**

1. **JWT (JSON Web Tokens)**: Stateless, scalable, good for APIs
2. **Session-based**: Stateful, uses cookies, good for traditional web apps
3. **OAuth/OAuth2**: Third-party authentication (Google, Facebook, GitHub)
4. **API Keys**: Simple token-based auth for service-to-service communication

**JWT Authentication Flow:**

1. User logs in with credentials
2. Server validates credentials and generates JWT
3. JWT is sent to client (stored in localStorage or httpOnly cookie)
4. Client sends JWT in Authorization header for subsequent requests
5. Server verifies JWT and grants access

**Security Best Practices:**

• Use https-only cookies for JWT storage
• Implement token expiration and refresh tokens
• Hash passwords with bcrypt before storing
• Use rate limiting to prevent brute force attacks
• Validate and sanitize all inputs
• Implement CORS properly

## Code Example
```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';
const TOKEN_EXPIRY = '1h';

// Mock user database
const users = [
  {
    id: 1,
    email: 'user@example.com',
    password: bcrypt.hashSync('password123', 10)
  }
];

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: TOKEN_EXPIRY });
};

// Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }
  
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// Login route
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Find user
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // Verify password
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // Generate token
  const token = generateToken(user.id);
  
  res.json({
    token,
    expiresIn: TOKEN_EXPIRY,
    user: { id: user.id, email: user.email }
  });
});

// Protected route
app.get('/profile', authenticate, (req, res) => {
  res.json({
    message: 'Protected data',
    userId: req.user.userId
  });
});

app.listen(3000);
```

---

## How to handle file uploads in Express.js?

## Quick Answer
File uploads in Express are handled using middleware like multer, which parses multipart/form-data. Files can be stored in memory, on disk, or uploaded to cloud storage services like AWS S3.

## Detailed Explanation

**File Upload Methods:**

1. **multer**: Most popular middleware for handling multipart/form-data
2. **express-fileupload**: Simpler alternative to multer
3. **Busboy**: Lower-level streaming parser
4. **Formidable**: Another popular option

**Storage Options:**

• **Memory Storage**: Files stored in buffer (good for small files)
• **Disk Storage**: Files saved to local filesystem
• **Cloud Storage**: AWS S3, Google Cloud Storage, Azure Blob

**Important Considerations:**

- Set file size limits to prevent DoS attacks
- Validate file types (MIME type checking)
- Sanitize filenames to prevent directory traversal
- Use unique filenames to avoid conflicts
- Stream large files instead of loading into memory
- Implement proper error handling

## Code Example
```javascript
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|pdf/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only images and PDFs are allowed!'));
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

// Single file upload
app.post('/upload', upload.single('avatar'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  res.json({
    message: 'File uploaded successfully',
    file: {
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      path: req.file.path
    }
  });
});

// Multiple file upload
app.post('/upload-multiple', upload.array('photos', 5), (req, res) => {
  res.json({
    message: `${req.files.length} files uploaded`,
    files: req.files.map(file => ({
      filename: file.filename,
      size: file.size
    }))
  });
});

// Error handling for multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size exceeds 5MB limit' });
    }
  }
  next(err);
});

app.listen(3000);
```

---

## What is CORS and how to handle it in Express?

## Quick Answer
CORS (Cross-Origin Resource Sharing) is a security feature that restricts web pages from making requests to a different domain than the one that served the page. In Express, CORS is handled using the cors middleware or by manually setting response headers.

## Detailed Explanation

**Why CORS Exists:**

• Prevents malicious websites from making unauthorized requests
• Protects user data from cross-site attacks
• Enforces same-origin policy by default

**CORS Headers:**

- **Access-Control-Allow-Origin**: Which domains can access the resource
- **Access-Control-Allow-Methods**: Allowed HTTP methods
- **Access-Control-Allow-Headers**: Allowed request headers
- **Access-Control-Allow-Credentials**: Whether to include cookies
- **Access-Control-Max-Age**: How long to cache preflight results

**Implementation Options:**

1. **cors package**: Easy-to-use middleware with configuration options
2. **Manual headers**: Full control over CORS behavior
3. **Environment-based**: Different CORS settings for dev/prod

**Security Considerations:**

- Avoid using wildcard (*) in production
- Specify exact origins that need access
- Only allow necessary HTTP methods
- Be cautious with credentials (cookies)
- Implement proper authentication alongside CORS

## Code Example
```javascript
const express = require('express');
const cors = require('cors');
const app = express();

// Option 1: Enable CORS for all routes (simple)
app.use(cors());

// Option 2: Configure CORS with options
const corsOptions = {
  origin: ['http://localhost:3000', 'https://myapp.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // 24 hours
};

app.use(cors(corsOptions));

// Option 3: Manual CORS implementation
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000', 'https://myapp.com'];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  
  next();
});

// Route-specific CORS
app.get('/public', cors(), (req, res) => {
  res.json({ message: 'Public endpoint' });
});

app.get('/private', (req, res) => {
  res.json({ message: 'Private endpoint' });
});

app.listen(3000);
```

---

## How to implement rate limiting in Express?

## Quick Answer
Rate limiting restricts the number of requests a client can make in a given time period. It's implemented using middleware like express-rate-limit to prevent abuse, DDoS attacks, and ensure fair usage.

## Detailed Explanation

**Why Rate Limiting?**

• Prevent brute force attacks on authentication endpoints
• Protect against DDoS attacks
• Ensure fair API usage among clients
• Reduce server load and costs
• Comply with API usage policies

**Rate Limiting Strategies:**

1. **Fixed Window**: Count requests in fixed time intervals
2. **Sliding Window**: More accurate, tracks requests continuously
3. **Token Bucket**: Allows bursts up to a limit
4. **Leaky Bucket**: Processes requests at a constant rate

**Configuration Options:**

- **windowMs**: Time window in milliseconds
- **max**: Maximum requests per window
- **message**: Custom error message
- **statusCode**: HTTP status code for rate limit exceeded
- **keyGenerator**: Custom logic to identify clients

**Storage Options:**

• Memory (default, not suitable for multi-server setups)
• Redis (recommended for production/distributed systems)
• Database (persistent but slower)

## Code Example
```javascript
const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();

// General rate limiter
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: {
    error: 'Too many requests, please try again later'
  },
  standardHeaders: true,
  statusCode: 429
});

// Strict rate limiter for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts
  message: {
    error: 'Too many login attempts, please try again after 15 minutes'
  },
  skipSuccessfulRequests: true // Don't count successful logins
});

// API rate limiter
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // 30 requests per minute
  keyGenerator: (req) => {
    // Use API key if available, otherwise IP
    return req.headers['x-api-key'] || req.ip;
  }
});

// Apply general limiter to all routes
app.use(generalLimiter);

// Apply strict limiter to auth routes
app.use('/auth/', authLimiter);

// Apply API limiter to API routes
app.use('/api/', apiLimiter);

app.post('/auth/login', (req, res) => {
  res.json({ message: 'Login successful' });
});

app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});

app.listen(3000);
```

---

## How to structure a large Express application?

## Quick Answer
Large Express applications should follow a modular architecture with separation of concerns: routes, controllers, services, models, middleware, and configuration. This improves maintainability, testability, and scalability.

## Detailed Explanation

**Project Structure:**

```
src/
├── config/          # Configuration files
├── controllers/     # Request/response handling
├── routes/          # Route definitions
├── services/        # Business logic
├── models/          # Data models/schemas
├── middleware/      # Custom middleware
├── utils/           # Helper functions
├── validators/      # Input validation
└── app.js           # App setup
```

**Separation of Concerns:**

• **Routes**: Define endpoints and map to controllers
• **Controllers**: Handle HTTP requests/responses
• **Services**: Contain business logic
• **Models**: Define data structure and database operations
• **Middleware**: Cross-cutting concerns (auth, logging, etc.)

**Best Practices:**

- Keep routes thin (delegate to controllers)
- Keep controllers thin (delegate to services)
- Use dependency injection for testability
- Centralize error handling
- Use environment variables for configuration
- Implement proper logging
- Write unit and integration tests
- Document APIs (Swagger/OpenAPI)

## Code Example
```javascript
// app.js - Main application file
const express = require('express');
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(express.json());
app.use(require('./middleware/logger'));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Error handling
app.use(errorHandler);

module.exports = app;

// routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, userController.getAllUsers);
router.get('/:id', authenticate, userController.getUserById);
router.post('/', authenticate, userController.createUser);
router.put('/:id', authenticate, userController.updateUser);
router.delete('/:id', authenticate, userController.deleteUser);

module.exports = router;

// controllers/user.controller.js
const userService = require('../services/user.service');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// services/user.service.js
const User = require('../models/user.model');

exports.getAllUsers = async () => {
  return await User.find().select('-password');
};

exports.getUserById = async (id) => {
  return await User.findById(id).select('-password');
};

exports.createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};
```
