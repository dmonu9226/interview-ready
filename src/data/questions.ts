export const categories = [
  'all',
  'React',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'Java',
  'Node.js',
  'Express.js',
  'Testing (Jest & RTL)',
  'System Design',
  'HTML & CSS',
  'Frontend System Design',
  'Performance',
  'AWS',
  'AWS-EC2',
  'Kafka',
  'Redis',
  'Spring Boot',
  'Docker',
  'Kubernetes',
  'GraphQL',
  'MongoDB',
  'PostgreSQL',
  'Microservices',
  'CI/CD',
  'Git',
  'DevOps'
]

export interface Question {
  id: number
  category: string
  question: string
  answer: string
  explanation?: string
  codeExample?: string
  videoUrl?: string
  priority: 'high' | 'medium' | 'low' | null
}

export const questionsData: Question[] = [
  // React Questions
  {
    id: 1,
    category: 'React',
    question: 'What is the Virtual DOM and how does it work?',
    answer: 'Virtual DOM is a lightweight JavaScript object that mirrors the real DOM. When state changes, React creates a new virtual DOM, compares it with the previous one (diffing), and only updates the changed elements in the real DOM.',
    explanation: 'The Virtual DOM is a programming concept where an ideal, or "virtual", representation of a UI is kept in memory and synced with the "real" DOM by a library such as ReactDOM. This process is called reconciliation.\n\n**How it works:**\n\n1. **Initial Render**: React creates a virtual DOM tree from your components\n2. **State Change**: When state or props change, React creates a new virtual DOM tree\n3. **Diffing**: React compares the new tree with the previous one to find differences\n4. **Patching**: Only the changed elements are updated in the real DOM\n\n**Benefits:**\n• **Performance**: Minimizes expensive DOM operations\n• **Cross-platform**: Same virtual DOM can be used for web, mobile (React Native)\n• **Developer Experience**: Write declarative code without worrying about DOM manipulation\n\n**Example:**\n```jsx\n// React efficiently updates only what changed\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <div>\n      <p>Count: {count}</p> // Only this text node updates\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n    </div>\n  );\n}\n```',
    codeExample: `import React, { useState } from 'react';

// Example: Virtual DOM in action
function App() {
  const [items, setItems] = useState(['A', 'B', 'C']);

  const addItem = () => {
    // Creates new virtual DOM tree
    setItems([...items, String.fromCharCode(65 + items.length)]);
  };

  return (
    <div>
      <ul>
        {items.map(item => (
          <li key={item}>{item}</li> // React uses keys for efficient diffing
        ))}
      </ul>
      <button onClick={addItem}>Add Item</button>
    </div>
  );
}`,
    priority: null
  },
  {
    id: 2,
    category: 'React',
    question: 'Explain React Hooks and their benefits.',
    answer: 'Hooks are functions that let you use state and lifecycle features in functional components. Key hooks: useState (manage state), useEffect (side effects), useContext (access context), useReducer (complex state).',
    explanation: 'React Hooks revolutionized how we write React components by enabling functional components to have state and lifecycle capabilities previously only available in class components.\n\n**Most Common Hooks:**\n\n1. **useState**: Manages local state. Returns current state and setter function.\n   Example: const [count, setCount] = useState(0)\n\n2. **useEffect**: Handles side effects (API calls, subscriptions, DOM manipulation).\n   Replaces componentDidMount, componentDidUpdate, componentWillUnmount\n\n3. **useContext**: Accesses context values without wrapping in Consumer.\n   Simplifies prop drilling\n\n4. **useReducer**: Alternative to useState for complex state logic.\n   Follows Redux pattern with actions and reducers\n\n5. **useRef**: Creates mutable references that persist across renders.\n   Used for DOM access or storing values without re-renders\n\n6. **useMemo**: Caches expensive calculations.\n   Recalculates only when dependencies change\n\n7. **useCallback**: Caches function instances.\n   Prevents unnecessary re-creation on every render\n\n**Benefits Over Class Components:**\n\n• **Cleaner Code**: No need for `this` keyword, simpler syntax\n• **Reusable Logic**: Custom hooks enable easy logic sharing between components\n• **Better Organization**: Related code stays together (not split across lifecycle methods)\n• **Easier Testing**: Pure functions are simpler to test than classes\n• **Smaller Bundle Size**: Functional components compile to less code\n• **No Confusion**: Eliminates `this` binding issues and lifecycle method confusion\n\n**Rules of Hooks:**\n\n1. Only call hooks at the top level (not in loops, conditions, or nested functions)\n2. Only call hooks from React functional components or custom hooks\n\n**Real-World Example:**\nInstead of splitting data fetching across componentDidMount and componentDidUpdate, you use one useEffect hook that handles both mounting and updating.',
    codeExample: `import { useState, useEffect, useContext } from 'react';

// useState - Manage component state
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}

// useEffect - Handle side effects
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Fetch user data when userId changes
    fetchUser(userId).then(setUser);
    
    // Cleanup function (runs on unmount)
    return () => cancelFetch();
  }, [userId]);
  
  return <div>{user?.name}</div>;
}

// useContext - Access global state
function ThemeButton() {
  const theme = useContext(ThemeContext);
  
  return (
    <button style={{ background: theme.primary }}>
      Themed Button
    </button>
  );
}`,
    priority: null
  },
  {
    id: 3,
    category: 'React',
    question: 'What is the difference between useEffect and useLayoutEffect?',
    answer: 'useEffect runs after the browser paints (asynchronously), making it non-blocking. useLayoutEffect runs synchronously after DOM mutations but before paint, useful for measuring DOM elements. Use useEffect by default; useLayoutEffect only when you need to read layout before paint.',
    explanation: '**Execution Timing:**\n\n1. **useEffect**: Runs AFTER browser paint\n   - Non-blocking\n   - Good for API calls, subscriptions\n   - User sees update immediately\n\n2. **useLayoutEffect**: Runs BEFORE browser paint\n   - Synchronous and blocking\n   - Good for DOM measurements\n   - Prevents visual flicker\n\n**When to use useLayoutEffect:**\n• Measuring element dimensions\n• Synchronizing scroll position\n• Preventing visual flicker\n• Reading layout properties\n\n**Rule of thumb:** Start with useEffect. Switch to useLayoutEffect only if you see visual flickering.',
    codeExample: `import { useEffect, useLayoutEffect, useState, useRef } from 'react';

// useEffect - runs after paint (may cause flicker)
function ComponentWithEffect() {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    // May cause visible flicker
    setWidth(ref.current.offsetWidth);
  }, []);

  return <div ref={ref}>Width: {width}</div>;
}

// useLayoutEffect - runs before paint (no flicker)
function ComponentWithLayoutEffect() {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useLayoutEffect(() => {
    // No flicker - updates before user sees anything
    setWidth(ref.current.offsetWidth);
  }, []);

  return <div ref={ref}>Width: {width}</div>;
}`,
    priority: null
  },
  {
    id: 4,
    category: 'React',
    question: 'How does React Context API work? When should you use it?',
    answer: 'Context API provides a way to pass data through the component tree without prop drilling. Create context with createContext(), provide value with Context.Provider, consume with useContext(). Use for global data like theme, auth, language. Avoid for frequently changing data as it can cause unnecessary re-renders.',
    explanation: '**Context API Components:**\n\n1. **createContext()**: Creates a context object\n2. **Context.Provider**: Provides value to component tree\n3. **useContext()**: Consumes context value in components\n\n**When to use:**\n✓ Theme preferences\n✓ User authentication\n✓ Language/locale settings\n✓ Global state (small-medium apps)\n\n**When NOT to use:**\n✗ Frequently updating data (causes re-renders)\n✗ Large-scale state management (use Redux/Zustand)\n✗ Data needed by only a few components (use props)\n\n**Best Practices:**\n• Split contexts by concern (ThemeContext, AuthContext)\n• Memoize context values to prevent unnecessary re-renders\n• Provide default values\n• Keep context scope as small as possible',
    codeExample: `import { createContext, useContext, useState } from 'react';

// 1. Create context
const ThemeContext = createContext();

// 2. Create provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Consume context in child component
function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button 
      style={{ background: theme === 'light' ? '#fff' : '#333' }}
      onClick={toggleTheme}
    >
      Toggle Theme
    </button>
  );
}

// Usage
function App() {
  return (
    <ThemeProvider>
      <ThemedButton />
    </ThemeProvider>
  );
}`,
    priority: null
  },
  {
    id: 5,
    category: 'React',
    question: 'What are React.memo, useMemo, and useCallback?',
    answer: 'React.memo: Memoizes entire component to prevent re-renders if props unchanged. useMemo: Caches expensive calculations, recalculates only when dependencies change. useCallback: Caches function instances to prevent recreation on every render. Use them to optimize performance, but only when needed.',
    explanation: '**Performance Optimization Tools:**\n\n1. **React.memo(Component)**: Memoizes component\n   - Prevents re-render if props haven\'t changed\n   - Shallow comparison of props\n\n2. **useMemo(() => value, deps)**: Memoizes computed value\n   - Caches expensive calculations\n   - Recalculates only when dependencies change\n\n3. **useCallback(fn, deps)**: Memoizes function\n   - Returns same function reference across renders\n   - Useful for passing callbacks to optimized child components\n\n**When to use:**\n✓ Expensive calculations (useMemo)\n✓ Functions passed as props to memoized children (useCallback)\n✓ Pure components with expensive renders (React.memo)\n\n**Common mistake:** Over-optimizing. Only use when you measure performance benefit.',
    codeExample: `import React, { useState, useMemo, useCallback } from 'react';

// React.memo - prevents unnecessary re-renders
const ExpensiveList = React.memo(({ items }) => {
  console.log('Rendering list...');
  return (
    <ul>
      {items.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  );
});

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);

  // useMemo - cache expensive calculation
  const filteredItems = useMemo(() => {
    console.log('Filtering items...');
    return items.filter(item => item.active);
  }, [items]);

  // useCallback - stable function reference
  const handleClick = useCallback(() => {
    console.log('Clicked!');
  }, []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ExpensiveList items={filteredItems} onItemClick={handleClick} />
    </div>
  );
}`,
    priority: null
  },
  {
    id: 6,
    category: 'React',
    question: 'Explain React component lifecycle in functional components.',
    answer: 'Mounting: useEffect with empty dependency [] runs once. Updating: useEffect runs when dependencies change. Unmounting: Return cleanup function from useEffect. Example: useEffect(() => { setup(); return () => cleanup(); }, [deps]). This replaces componentDidMount, componentDidUpdate, componentWillUnmount.',
    explanation: '**Lifecycle Phases in Functional Components:**\n\n1. **Mounting**: Component is created and inserted into DOM\n2. **Updating**: Component re-renders due to state/prop changes\n3. **Unmounting**: Component is removed from DOM\n\n**useEffect as Lifecycle Replacement:**\n\n• `useEffect(() => {}, [])` → componentDidMount\n• `useEffect(() => {}, [dep])` → componentDidUpdate (when dep changes)\n• `useEffect(() => { return () => cleanup() }, [])` → componentWillUnmount\n\n**Key Concepts:**\n• Effects run after render\n• Cleanup functions prevent memory leaks\n• Dependency array controls when effect runs\n• Multiple effects can be used for different concerns',
    codeExample: `import { useState, useEffect } from 'react';

function LifecycleExample({ userId }) {
  const [user, setUser] = useState(null);

  // Mounting: Runs once when component mounts
  useEffect(() => {
    console.log('Component mounted');
    
    // Updating: Runs when userId changes
    fetchUser(userId).then(setUser);
    
    // Unmounting: Cleanup function
    return () => {
      console.log('Component will unmount');
      cancelFetch();
    };
  }, [userId]);

  // Separate effect for different concern
  useEffect(() => {
    console.log('User changed:', user);
    document.title = user ? user.name : 'Loading...';
  }, [user]);

  return <div>{user?.name}</div>;
}`,
    priority: null
  },
  {
    id: 7,
    category: 'React',
    question: 'What is reconciliation in React?',
    answer: 'Reconciliation is React\'s algorithm to update the DOM efficiently. When state changes, React creates a new tree, compares it with old tree (diffing), identifies minimum changes needed, and updates only those parts. Uses keys for lists to track items. This process makes React performant.',
    explanation: '**Reconciliation Process:**\n\n1. **Trigger**: State or props change\n2. **New Tree**: React creates new virtual DOM tree\n3. **Diffing**: Compares new tree with previous tree\n4. **Update**: Applies minimal changes to real DOM\n\n**Diffing Algorithm:**\n\n• Elements of different types produce different trees\n• Lists use "key" prop to identify items\n• Keys help React identify which items changed\n• Without keys, React may re-render entire list\n\n**Heuristics:**\n• O(n) complexity instead of O(n³)\n• Assumes elements of different types produce different trees\n• Developer hints via key prop for lists\n\n**Best Practices:**\n✓ Use stable, unique keys for lists\n✓ Avoid using index as key if list can reorder\n✓ Keep component hierarchy stable',
    codeExample: `import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React' },
    { id: 2, text: 'Build app' }
  ]);

  const addTodo = () => {
    const newId = todos.length + 1;
    setTodos([...todos, { id: newId, text: 'New todo' }]);
  };

  return (
    <ul>
      {todos.map(todo => (
        // Key helps React reconcile efficiently
        <li key={todo.id}>{todo.text}</li>
      ))}
      <button onClick={addTodo}>Add Todo</button>
    </ul>
  );
}

// Bad practice - using index as key
{items.map((item, index) => (
  <li key={index}>{item}</li> // Avoid if list can reorder
))}`,
    priority: null
  },
  {
    id: 8,
    category: 'React',
    question: 'How to optimize React application performance?',
    answer: 'Key strategies: 1) Use React.memo for pure components, 2) useMemo/useCallback for expensive operations, 3) Code splitting with lazy() and Suspense, 4) Virtualize long lists (react-window), 5) Optimize images and assets, 6) Avoid inline objects/functions in render, 7) Use production build, 8) Profile with React DevTools.',
    explanation: '**Performance Optimization Strategies:**\n\n1. **Component Optimization**\n   • React.memo for pure components\n   • useMemo/useCallback for expensive ops\n   • Avoid inline objects/functions in JSX\n\n2. **Code Splitting**\n   • React.lazy() + Suspense\n   • Route-based splitting\n   • Dynamic imports\n\n3. **List Optimization**\n   • Virtualization (react-window, react-virtualized)\n   • Pagination/infinite scroll\n   • Proper key usage\n\n4. **Asset Optimization**\n   • Image optimization (next/image)\n   • Lazy loading images\n   • CDN for static assets\n\n5. **Bundle Optimization**\n   • Tree shaking\n   • Code splitting\n   • Analyze bundle size\n\n6. **Rendering Optimization**\n   • Minimize re-renders\n   • Use production build\n   • Profile with React DevTools',
    codeExample: `import React, { lazy, Suspense, useMemo } from 'react';

// 1. Code splitting
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// 2. Memoization
function ExpensiveList({ items, filter }) {
  // useMemo prevents recalculation on every render
  const filteredItems = useMemo(() => {
    return items.filter(item => item.includes(filter));
  }, [items, filter]);

  return (
    <ul>
      {filteredItems.map(item => <li key={item}>{item}</li>)}
    </ul>
  );
}

// 3. Lazy loading with Suspense
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}

// 4. Virtualized list (conceptual)
import { FixedSizeList } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>{items[index]}</div>
  );

  return (
    <FixedSizeList
      height={400}
      itemCount={items.length}
      itemSize={35}
    >
      {Row}
    </FixedSizeList>
  );
}`,
    priority: null
  },
  {
    id: 9,
    category: 'React',
    question: 'What are Error Boundaries in React?',
    answer: 'Error Boundaries catch JavaScript errors in child component trees and display fallback UI. Implemented as class components with getDerivedStateFromError() or componentDidCatch(). Wrap components that might fail. Note: They don\'t catch errors in event handlers, async code, or server-side rendering.',
    explanation: '**Error Boundary Capabilities:**\n\n✓ Catches errors in:\n• Child component tree\n• Lifecycle methods\n• Constructors\n• Render methods\n\n✗ Does NOT catch:\n• Event handlers\n• Asynchronous code\n• Server-side rendering\n• Errors in error boundary itself\n\n**Implementation:**\n• Must be class component\n• Use getDerivedStateFromError or componentDidCatch\n• Display fallback UI when error occurs\n\n**Best Practices:**\n• Wrap major sections of app\n• Log errors to monitoring service\n• Provide user-friendly error messages\n• Don\'t swallow errors silently',
    codeExample: `import React, { Component } from 'react';

// Error Boundary class component
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so next render shows fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to monitoring service
    console.error('Error caught by boundary:', error, errorInfo);
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div>
          <h2>Something went wrong</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
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
      <MyComponent />
    </ErrorBoundary>
  );
}`,
    priority: null
  },
  {
    id: 10,
    category: 'React',
    question: 'Explain controlled vs uncontrolled components.',
    answer: 'Controlled: Form data handled by React state (value + onChange). Uncontrolled: Form data handled by DOM itself (useRef). Controlled gives more control, validation, dynamic behavior. Uncontrolled is simpler, better for file inputs, third-party integrations. Prefer controlled unless you have specific reasons.',
    explanation: '**Controlled Components:**\n\n• Form data handled by React state\n• Value comes from state\n• Changes handled by onChange\n• Full control over form data\n• Easier validation and dynamic behavior\n\n**Uncontrolled Components:**\n\n• Form data handled by DOM\n• Use useRef to access values\n• Simpler for basic forms\n• Better for file inputs\n• Integrates with non-React code\n\n**When to use Controlled:**\n✓ Need immediate validation\n✓ Dynamic form fields\n✓ Conditional disabling\n✓ Force formatting\n\n**When to use Uncontrolled:**\n✓ Simple forms\n✓ File inputs\n✓ Third-party DOM libraries\n✓ Performance for large forms',
    codeExample: `import { useState, useRef } from 'react';

// Controlled Component
function ControlledForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

// Uncontrolled Component
function UncontrolledForm() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name: nameRef.current.value,
      email: emailRef.current.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} type="text" placeholder="Name" />
      <input ref={emailRef} type="email" placeholder="Email" />
      <button type="submit">Submit</button>
    </form>
  );
}`,
    priority: null
  },

  // Next.js Questions
  {
    id: 11,
    category: 'Next.js',
    question: 'What are the main advantages of Next.js over plain React?',
    answer: 'Next.js provides: 1) Server-Side Rendering (SSR) for SEO, 2) Static Site Generation (SSG) for speed, 3) File-based routing (no setup needed), 4) API routes (backend in same app), 5) Image optimization, 6) Built-in CSS/Sass support, 7) Automatic code splitting, 8) TypeScript support out of box. Great for production apps.',
    explanation: '**Key Advantages:**\n\n1. **Rendering**: SSR, SSG, and ISR options\n2. **Routing**: File-system based routing\n3. **Backend**: API routes without a separate server\n4. **Optimization**: Automatic image and font optimization\n5. **DX**: Fast Refresh and built-in TypeScript\n\n**When to choose Next.js:**\n✓ SEO is critical\n✓ Need fast initial load\n✓ Want full-stack capabilities\n✓ Building content-heavy sites',
    codeExample: `// pages/index.js - Automatic routing
export default function Home() {
  return <h1>Welcome to Next.js!</h1>;
}

// pages/api/hello.js - API Route
export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' });
}

// next.config.js - Image Optimization
module.exports = {
  images: {
    domains: ['example.com'],
  },
}`,
    priority: null
  },
  {
    id: 12,
    category: 'Next.js',
    question: 'Explain SSR, SSG, and ISR in Next.js.',
    answer: 'SSR (getServerSideProps): Renders on each request - fresh data, slower. SSG (getStaticProps): Builds HTML at build time - fastest, stale data. ISR (Incremental Static Regeneration): Updates static pages after build using revalidate - best of both worlds. Choose based on data freshness needs.',
    explanation: '**Rendering Strategies:**\n\n1. **SSR (Server-Side Rendering)**:\n   • Runs on every request\n   • Fresh data always\n   • Slower TTFB\n\n2. **SSG (Static Site Generation)**:\n   • Runs at build time\n   • Fastest performance\n   • Data can be stale\n\n3. **ISR (Incremental Static Regeneration)**:\n   • Static page served first\n   • Revalidates in background\n   • Best of both worlds',
    codeExample: `// SSR - getServerSideProps
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  return { props: { data } };
}

// SSG - getStaticProps
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  return { props: { data } };
}

// ISR - getStaticProps with revalidate
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  return { props: { data }, revalidate: 60 }; // Revalidate every 60s
}`,
    priority: null
  },
  {
    id: 13,
    category: 'Next.js',
    question: 'What is the difference between pages directory and app directory?',
    answer: 'Pages dir: Traditional routing, getServerSideProps/getStaticProps, _app.js/_document.js. App dir (Next.js 13+): File-based routing with folders, React Server Components, streaming, layouts, loading.tsx, error.tsx, better caching. App dir is newer, more powerful, recommended for new projects.',
    explanation: '**Pages Directory:**\n• Uses `getServerSideProps` and `getStaticProps`\n• Special files: `_app.js`, `_document.js`\n• Client-side rendering by default\n\n**App Directory:**\n• Uses React Server Components (RSC)\n• Nested layouts via `layout.js`\n• Built-in loading (`loading.js`) and error (`error.js`) UI\n• Simplified data fetching with async components\n• Better caching and streaming support',
    codeExample: `// app/page.js (App Router)
export default async function Page() {
  const data = await fetch('https://api.example.com');
  return <div>{data.title}</div>;
}

// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <nav>Header</nav>
        {children}
      </body>
    </html>
  );
}`,
    priority: null
  },
  {
    id: 14,
    category: 'Next.js',
    question: 'How does Next.js handle routing?',
    answer: 'File-based routing: Files in pages/ or app/ folder become routes automatically. Dynamic routes: [id].js or [slug]/page.js. Nested routes: Create nested folders. Catch-all: [...slug].js. Client navigation: Use <Link> component or useRouter hook. No need for React Router.',
    explanation: '**Routing Features:**\n\n1. **File-based**: Folder structure maps to URL paths\n2. **Dynamic Routes**: `[id]` captures URL segments\n3. **Nested Routes**: Folders inside folders create nested paths\n4. **Catch-all**: `[...slug]` captures multiple segments\n5. **Client Navigation**: `<Link>` provides SPA-like transitions',
    codeExample: `import Link from 'next/link';
import { useRouter } from 'next/router';

// pages/blog/[id].js - Dynamic Route
export default function BlogPost({ id }) {
  const router = useRouter();
  return <div>Post ID: {id}</div>;
}

// Navigation
function Nav() {
  return (
    <nav>
      <Link href="/blog/1">First Post</Link>
      <button onClick={() => router.push('/about')}>
        Go to About
      </button>
    </nav>
  );
}`,
    priority: null
  },
  {
    id: 15,
    category: 'Next.js',
    question: 'What are React Server Components in Next.js?',
    answer: 'Server Components run on server, send HTML to client (not JavaScript). Benefits: Zero bundle size, direct backend access, automatic code splitting, better security. Use \'use client\' directive for client components. Server components can\'t use hooks, event handlers, or browser APIs.',
    explanation: '**Server vs Client Components:**\n\n• **Server**: Fetch data, access backend, no interactivity\n• **Client**: State, effects, event listeners, browser APIs\n• **Interleaving**: You can mix them in the same tree\n• **Performance**: Reduces JavaScript sent to the browser',
    codeExample: `// app/page.js (Server Component by default)
import db from './lib/db';

export default async function Page() {
  const users = await db.users.findMany(); // Direct DB access!
  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}

// app/counter.js (Client Component)
'use client';
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}`,
    priority: null
  },
  {
    id: 16,
    category: 'Next.js',
    question: 'How to handle authentication in Next.js?',
    answer: 'Options: 1) NextAuth.js (easiest, supports OAuth), 2) JWT tokens in cookies, 3) Session management with middleware, 4) Third-party services (Auth0, Clerk). Protect routes with middleware or getServerSideProps. Store tokens securely in httpOnly cookies. Check auth on both client and server.',
    explanation: '**Authentication Strategies:**\n\n1. **NextAuth.js**: Built-in providers, session management\n2. **Middleware**: Protect routes at the edge\n3. **Cookies**: Secure, httpOnly tokens\n4. **API Routes**: Verify sessions on the backend',
    codeExample: `// middleware.js
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

export const config = { matcher: ['/dashboard/:path*'] };

// pages/api/user.js
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) return res.status(401).end();
  res.json({ user: session.user });
}`,
    priority: null
  },
  {
    id: 17,
    category: 'Next.js',
    question: 'What is Next.js Middleware and when to use it?',
    answer: 'Middleware runs before requests complete, allowing you to modify responses. Use for: Authentication checks, redirects, rewriting paths, adding headers, A/B testing, bot detection. Located in middleware.ts at root. Runs on edge for low latency. Example: Protect routes, locale detection, logging.',
    explanation: '**Middleware Capabilities:**\n\n• **Edge Runtime**: Runs globally for low latency\n• **Request Modification**: Add headers, rewrite URLs\n• **Response Generation**: Return responses directly\n• **Use Cases**: Auth, i18n, A/B testing, security',
    codeExample: `// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Check for a specific cookie
  const token = request.cookies.get('token');

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Add a custom header
  const response = NextResponse.next();
  response.headers.set('x-custom-header', 'value');
  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};`,
    priority: null
  },
  {
    id: 18,
    category: 'Next.js',
    question: 'How to optimize images in Next.js?',
    answer: 'Use <Image> component instead of <img>. Benefits: Automatic resizing, lazy loading, modern formats (WebP), blur placeholders, responsive sizes. Configure domains in next.config.js. Use priority prop for LCP images. Optimizes Core Web Vitals automatically. Supports remote images with proper configuration.',
    explanation: '**Image Component Features:**\n\n• **Automatic Optimization**: Converts to WebP/AVIF\n• **Responsive**: `sizes` prop for different viewports\n• **Lazy Loading**: Loads only when in viewport\n• **Layout Shift Prevention**: Requires width/height or layout prop',
    codeExample: `import Image from 'next/image';

export default function Page() {
  return (
    <div>
      {/* Basic usage */}
      <Image
        src="/profile.jpg"
        alt="Profile Picture"
        width={500}
        height={500}
      />

      {/* Remote image */}
      <Image
        src="https://example.com/photo.jpg"
        alt="Remote Photo"
        width={800}
        height={600}
        priority // For LCP images
      />
    </div>
  );
}`,
    priority: null
  },

  // TypeScript Questions
  {
    id: 19,
    category: 'TypeScript',
    question: 'What are the benefits of TypeScript over JavaScript?',
    answer: 'TypeScript adds: 1) Static typing (catch errors early), 2) Better IDE support (autocomplete, refactoring), 3) Self-documenting code, 4) Easier collaboration in teams, 5) Safer refactoring, 6) Interface contracts, 7) Compile-time checks. Compiles to JavaScript. Essential for large-scale applications.',
    explanation: '**Why TypeScript?**\n\n• **Safety**: Catch bugs before running code\n• **IntelliSense**: Better autocomplete and documentation\n• **Refactoring**: Rename variables across the project safely\n• **Collaboration**: Types act as a contract between developers',
    codeExample: `// JavaScript - No type safety
function add(a, b) {
  return a + b; // Might concatenate strings if not careful
}

// TypeScript - Type safety
function add(a: number, b: number): number {
  return a + b;
}

interface User {
  id: number;
  name: string;
  email?: string; // Optional property
}

const user: User = { id: 1, name: 'Alice' };`,
    priority: null
  },
  {
    id: 20,
    category: 'TypeScript',
    question: 'Explain interface vs type in TypeScript.',
    answer: 'Both define object shapes. Interface: Can be extended, merged (declaration merging), better for objects/classes. Type: More flexible (unions, intersections, primitives), can\'t be re-opened. Use interface for public APIs, type for unions/tuples. In practice, they\'re similar - pick one style and be consistent.',
    explanation: '**Interface:**\n• Best for defining object shapes\n• Supports declaration merging\n• Can extend other interfaces\n\n**Type Alias:**\n• Can use union and intersection types\n• Can define primitives, tuples, and unions\n• Cannot be re-opened to add new properties',
    codeExample: `// Interface
interface Animal {
  name: string;
}

interface Dog extends Animal {
  bark(): void;
}

// Type Alias
type Point = {
  x: number;
  y: number;
};

type ID = string | number; // Union type
type Coordinates = [number, number]; // Tuple`,
    priority: null
  },
  {
    id: 21,
    category: 'TypeScript',
    question: 'What are Generics in TypeScript?',
    answer: 'Generics create reusable components that work with multiple types while maintaining type safety. Syntax: <T>. Example: function identity<T>(arg: T): T { return arg }. Use for: Functions, classes, interfaces. Common in React: React.FC<Props>, useState<Type>(). Makes code flexible yet type-safe.',
    explanation: '**Why Generics?**\n\n• **Reusability**: Write one function that works with many types\n• **Type Safety**: TypeScript still knows what type is being used\n• **Constraints**: Limit what types can be passed using `extends`',
    codeExample: `// Generic Function
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>('myString');
let outputNum = identity<number>(100);

// Generic Interface
interface Box<T> {
  contents: T;
}

let stringBox: Box<string> = { contents: 'hello' };
let numberBox: Box<number> = { contents: 42 };`,
    priority: null
  },
  {
    id: 22,
    category: 'TypeScript',
    question: 'What is the difference between any, unknown, and never?',
    answer: 'any: Disables type checking (avoid when possible). unknown: Type-safe counterpart to any - must check type before using. never: Represents values that never occur (empty returns, infinite loops). Use unknown over any for safety. Use never for exhaustive type checking and impossible cases.',
    explanation: '**Type Differences:**\n\n• **any**: Opt-out of type checking. You can do anything with it.\n• **unknown**: Safe alternative. You must narrow the type before using it.\n• **never**: A type that represents a value that will never exist.',
    codeExample: `let anyValue: any = 'hello';
anyValue.toFixed(); // No error, but might crash at runtime

let unknownValue: unknown = 'hello';
// unknownValue.toFixed(); // Error! Must check type first
if (typeof unknownValue === 'string') {
  unknownValue.toUpperCase(); // OK
}

// Never example
function throwError(message: string): never {
  throw new Error(message);
}`,
    priority: null
  },
  {
    id: 23,
    category: 'TypeScript',
    question: 'How to handle optional and nullable types?',
    answer: 'Optional properties: name?: string (can be string or undefined). Nullable: name: string | null (can be string or null). Union types: age: number | string. Type guards: if (typeof x === "string"). Non-null assertion: x! (use carefully). Default parameters: name: string = "default".',
    explanation: '**Handling Missing Values:**\n\n• **Optional (`?`)**: Property might not exist (value is `undefined`).\n• **Nullable (`| null`)**: Property exists but can be explicitly empty.\n• **Union Types**: Variable can be one of several types.\n• **Type Guards**: Logic to narrow down the type at runtime.',
    codeExample: `interface Profile {
  name: string;
  bio?: string; // Optional
  avatar: string | null; // Nullable
}

function greet(profile: Profile) {
  // Optional chaining
  console.log(profile.bio?.toUpperCase());
  
  // Null check
  if (profile.avatar !== null) {
    console.log('Has avatar');
  }
}`,
    priority: null
  },
  {
    id: 24,
    category: 'TypeScript',
    question: 'What are Utility Types in TypeScript?',
    answer: 'Built-in type transformers: Partial<T> (make all optional), Required<T> (make all required), Readonly<T> (prevent modification), Pick<T, K> (select keys), Omit<T, K> (exclude keys), Record<K, T> (create object type), ReturnType<T> (get function return type). Saves time writing custom types.',
    explanation: '**Common Utility Types:**\n\n• **Partial<T>**: Makes all properties optional.\n• **Required<T>**: Makes all properties required.\n• **Readonly<T>**: Makes all properties read-only.\n• **Pick<T, K>**: Selects specific properties from a type.\n• **Omit<T, K>**: Removes specific properties from a type.',
    codeExample: `interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

// Partial: All fields optional
const update: Partial<Todo> = { title: 'New Title' };

// Pick: Only keep title
const summary: Pick<Todo, 'title'> = { title: 'My Task' };

// Omit: Remove completed
const draft: Omit<Todo, 'completed'> = {
  title: 'Draft',
  description: 'In progress'
};`,
    priority: null
  },
  {
    id: 25,
    category: 'TypeScript',
    question: 'How to type React components with TypeScript?',
    answer: 'Functional components: React.FC<Props> or (props: Props) => JSX.Element. Props interface: interface Props { name: string; age?: number }. Event handlers: React.ChangeEvent<HTMLInputElement>. Refs: useRef<HTMLDivElement>(null). Children: React.ReactNode. State: useState<Type>(). Hooks have built-in types.',
    explanation: '**Typing React:**\n\n• **Props**: Define an interface for component props.\n• **Events**: Use specific event types like `React.MouseEvent`.\n• **Refs**: Specify the HTML element type in `useRef`.\n• **State**: Provide the type argument to `useState`.',
    codeExample: `import { useState, ChangeEvent } from 'react';

interface UserFormProps {
  onSubmit: (name: string) => void;
}

export default function UserForm({ onSubmit }: UserFormProps) {
  const [name, setName] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <form onSubmit={() => onSubmit(name)}>
      <input value={name} onChange={handleChange} />
    </form>
  );
}`,
    priority: null
  },

  // JavaScript Questions
  {
    id: 26,
    category: 'JavaScript',
    question: 'Explain closures with an example.',
    answer: 'A closure is a function that remembers its outer variables even after the outer function has returned. Example: function outer() { let count = 0; return function inner() { count++; return count; } }. The inner function "closes over" the count variable. Used for data privacy, currying, callbacks.',
    explanation: '**How Closures Work:**\n\n• A function bundled with its lexical environment.\n• Allows a function to access variables from an outer scope even after the outer function has finished executing.\n• Common use cases: Data encapsulation, currying, and event handlers.',
    codeExample: `function createCounter() {
  let count = 0;

  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
// 'count' is private and only accessible via the closure`,
    priority: null
  },
  {
    id: 27,
    category: 'JavaScript',
    question: 'What is the Event Loop in JavaScript?',
    answer: 'Event Loop manages asynchronous operations. Process: 1) Execute synchronous code (call stack), 2) Queue callbacks (task queue), 3) When call stack empty, move callbacks from queue to stack. Microtasks (Promises) run before macrotasks (setTimeout). This allows non-blocking I/O in single-threaded JS.',
    explanation: '**The Event Loop Cycle:**\n\n1. **Call Stack**: Executes synchronous code.\n2. **Web APIs**: Handles async tasks (timers, fetch).\n3. **Task Queue**: Holds macrotasks (setTimeout, setInterval).\n4. **Microtask Queue**: Holds microtasks (Promises).\n5. **Event Loop**: Moves tasks to the stack when it\'s empty.',
    videoUrl: 'https://www.youtube.com/watch?v=eiC58R16hb8',
    codeExample: `console.log('Start');

setTimeout(() => {
  console.log('Timeout'); // Macrotask
}, 0);

Promise.resolve().then(() => {
  console.log('Promise'); // Microtask
});

console.log('End');

// Output: Start, End, Promise, Timeout`,
    priority: null
  },
  {
    id: 28,
    category: 'JavaScript',
    question: 'Difference between == and ===?',
    answer: '== (loose equality): Converts types before comparison (5 == "5" is true). === (strict equality): Checks both value and type (5 === "5" is false). Always use === for predictable results. Exception: null == undefined is true, but use explicit checks for clarity.',
    explanation: '**Equality Operators:**\n\n• **Loose Equality (`==`)**: Performs type coercion before comparing. Can lead to unexpected results like `0 == ""` being true.\n• **Strict Equality (`===`)**: Compares both value and type without coercion. This is the recommended way to compare values in JavaScript.',
    codeExample: `console.log(5 == '5');  // true (string converted to number)
console.log(5 === '5'); // false (different types)

console.log(0 == false);  // true
console.log(0 === false); // false

// Best practice: Always use ===
if (value === 10) {
  console.log('It is exactly the number 10');
}`,
    priority: null
  },
  {
    id: 29,
    category: 'JavaScript',
    question: 'Explain Promise and async/await.',
    answer: 'Promise: Object representing eventual completion/failure of async operation. States: pending, fulfilled, rejected. Methods: .then(), .catch(), .finally(). Async/await: Syntactic sugar over Promises. async function always returns Promise. await pauses execution until Promise resolves. Makes async code look synchronous and readable.',
    explanation: '**Asynchronous JavaScript:**\n\n• **Promises**: Objects that represent the future result of an async operation.\n• **Async/Await**: Modern syntax that makes working with promises feel like synchronous code.\n• **Error Handling**: Use `.catch()` for promises or `try/catch` blocks for async/await.',
    codeExample: `// Using Promises
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

// Using Async/Await
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}`,
    priority: null
  },
  {
    id: 30,
    category: 'JavaScript',
    question: 'What is hoisting in JavaScript?',
    answer: 'Hoisting moves variable and function declarations to top of scope during compilation. var declarations initialized with undefined. let/const hoisted but not initialized (Temporal Dead Zone). Function declarations fully hoisted. Best practice: Declare variables at top, use let/const over var.',
    explanation: '**Hoisting Behavior:**\n\n• **`var`**: Hoisted and initialized with `undefined`.\n• **`let` / `const`**: Hoisted but remain in the "Temporal Dead Zone" until the declaration is reached.\n• **Functions**: Function declarations are fully hoisted, meaning you can call them before they appear in the code.',
    codeExample: `console.log(x); // undefined
var x = 5;

// console.log(y); // ReferenceError!
let y = 10;

// Function hoisting
greet(); // "Hello!"
function greet() {
  console.log('Hello!');
}`,
    priority: null
  },
  {
    id: 31,
    category: 'JavaScript',
    question: 'Explain this keyword in JavaScript.',
    answer: '"this" refers to execution context. Global: window/browser. Method: object owning the method. Constructor: new instance. Arrow function: inherits from parent scope. Can be changed with call(), apply(), bind(). In strict mode, undefined in global/function context. Understanding context is crucial.',
    explanation: '**Context of `this`:**\n\n• **Global**: Refers to the global object (window in browsers).\n• **Object Method**: Refers to the object calling the method.\n• **Constructor**: Refers to the new instance being created.\n• **Arrow Functions**: Inherits `this` from the surrounding lexical scope.',
    codeExample: `const person = {
  name: 'Alice',
  greet: function() {
    console.log('Hi, I am ' + this.name);
  }
};

person.greet(); // "Hi, I am Alice"

// Arrow function example
const obj = {
  value: 42,
  getValue: () => this.value // 'this' is not obj here!
};`,
    priority: null
  },
  {
    id: 32,
    category: 'JavaScript',
    question: 'What are Map, Set, WeakMap, and WeakSet?',
    answer: 'Map: Key-value pairs, any type as key, maintains insertion order. Set: Unique values only. WeakMap: Keys must be objects, garbage collected when no references. WeakSet: Values must be objects, garbage collected. Use Map/Set for collections, WeakMap/Set for private data/metadata.',
    explanation: '**Collection Types:**\n\n• **Map**: Like an object but keys can be any type. Maintains insertion order.\n• **Set**: A collection of unique values. Great for removing duplicates from arrays.\n• **WeakMap/WeakSet**: Allow garbage collection of keys/values if there are no other references to them.',
    codeExample: `// Map
const map = new Map();
map.set('name', 'Alice');
map.set(1, 'number one');
console.log(map.get('name')); // "Alice"

// Set
const set = new Set([1, 2, 2, 3]);
console.log(set.size); // 3 (duplicates removed)

// WeakMap
const wm = new WeakMap();
let obj = {};
wm.set(obj, 'secret data');`,
    priority: null
  },
  {
    id: 33,
    category: 'JavaScript',
    question: 'Explain debounce and throttle.',
    answer: 'Debounce: Waits until user stops triggering (e.g., search input - wait 300ms after last keystroke). Throttle: Limits execution to once per time period (e.g., scroll event - execute max once per 100ms). Debounce for search, autocomplete. Throttle for scroll, resize, button clicks. Both optimize performance.',
    explanation: '**Performance Optimization:**\n\n• **Debounce**: Ensures a function is not called again until a certain amount of time has passed since the last call. (e.g., Search bar).\n• **Throttle**: Ensures a function is called at most once in a specified time period. (e.g., Window resize).',
    codeExample: `// Simple Debounce
function debounce(func, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

// Simple Throttle
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}`,
    priority: null
  },

  // Testing Questions
  {
    id: 34,
    category: 'Testing (Jest & RTL)',
    question: 'What is the difference between Jest and React Testing Library?',
    answer: 'Jest: Test runner and assertion library (runs tests, provides expect, mock). React Testing Library: DOM testing utilities focused on user behavior (render, fireEvent, queries). Together: Jest runs tests, RTL tests React components. RTL encourages testing like users interact (find by text, role, not implementation).',
    explanation: '**Testing Stack:**\n\n• **Jest**: The engine that runs your tests, handles mocking, and provides assertions (`expect`).\n• **React Testing Library (RTL)**: A set of helpers that let you test React components without depending on their implementation details. It encourages testing from the user\'s perspective.',
    codeExample: `import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Component
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Test
test('renders greeting', () => {
  render(<Greeting name="Alice" />);
  const heading = screen.getByText(/Hello, Alice/i);
  expect(heading).toBeInTheDocument();
});`,
    priority: null
  },
  {
    id: 35,
    category: 'Testing (Jest & RTL)',
    question: 'What are the different types of queries in RTL?',
    answer: 'ByRole: Most preferred (aria roles). ByLabelText: Form elements. ByPlaceholderText: Inputs with placeholder. ByText: Text content. ByDisplayValue: Current input value. ByAltText: Images. ByTitle: Title attribute. Variants: getBy (throws if not found), queryBy (returns null), findBy (async). Prefer role queries for accessibility.',
    explanation: '**Query Priority (from RTL docs):**\n\n1. **getByRole**: Best for accessibility and semantics.\n2. **getByLabelText**: Best for form fields.\n3. **getByText**: Best for non-interactive elements.\n4. **getByTestId**: Last resort when other queries don\'t work.',
    codeExample: `import { render, screen } from '@testing-library/react';

render(
  <form>
    <label htmlFor="username">Username</label>
    <input id="username" placeholder="Enter name" />
    <button>Submit</button>
  </form>
);

// Queries
screen.getByRole('button', { name: /submit/i });
screen.getByLabelText(/username/i);
screen.getByPlaceholderText(/enter name/i);`,
    priority: null
  },
  {
    id: 36,
    category: 'Testing (Jest & RTL)',
    question: 'How to test async operations in React components?',
    answer: 'Use async/await with findBy queries. Example: const element = await findByText("Loaded"). For API calls: Mock with jest.mock() or MSW. Wait for updates: waitFor(() => expect(...)). Test loading states, success, and error scenarios. Always await async operations to avoid timing issues.',
    explanation: '**Testing Async Code:**\n\n• **findBy**: Returns a promise that resolves when the element is found.\n• **waitFor**: Waits for a callback to stop throwing an error.\n• **Mocking**: Use `jest.fn()` or libraries like MSW to mock API responses.',
    codeExample: `import { render, screen, waitFor } from '@testing-library/react';

// Using findBy (auto-retries)
test('loads data', async () => {
  render(<UserProfile />);
  const name = await screen.findByText(/John Doe/i);
  expect(name).toBeInTheDocument();
});

// Using waitFor
test('updates state', async () => {
  render(<Counter />);
  fireEvent.click(screen.getByRole('button'));
  await waitFor(() => {
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });
});`,
    priority: null
  },
  {
    id: 37,
    category: 'Testing (Jest & RTL)',
    question: 'How to mock functions and modules in Jest?',
    answer: 'Mock functions: jest.fn() creates mock. Mock modules: jest.mock(\'./module\'). Mock implementation: mockFn.mockImplementation(() => value). Mock return: mockFn.mockReturnValue(value). Clear mocks: jest.clearAllMocks(). Use mocks to isolate unit tests, avoid real API calls, control test scenarios.',
    explanation: '**Mocking Strategies:**\n\n• **jest.fn()**: Creates a spy function to track calls and arguments.\n• **jest.mock()**: Replaces an entire module with a mock version.\n• **mockImplementation**: Defines what the mock should do when called.',
    codeExample: `// Mocking a function
const mockCallback = jest.fn(x => 42 + x);
mockCallback(1); // returns 43
expect(mockCallback).toHaveBeenCalledWith(1);

// Mocking a module
jest.mock('./api', () => ({
  fetchData: jest.fn().mockResolvedValue({ data: [] })
}));

// Testing with the mock
import { fetchData } from './api';
test('fetches data', async () => {
  const result = await fetchData();
  expect(result.data).toEqual([]);
});`,
    priority: null
  },
  {
    id: 38,
    category: 'Testing (Jest & RTL)',
    question: 'What is the Testing Trophy vs Testing Pyramid?',
    answer: 'Testing Pyramid: Many unit tests, some integration, few E2E. Testing Trophy (RTL philosophy): Focus on integration tests (most valuable), fewer unit tests, some E2E. Integration tests give best confidence/cost ratio. Unit test complex logic. E2E for critical user flows. Avoid testing implementation details.',
    explanation: '**Testing Philosophies:**\n\n• **Pyramid**: Traditional approach. Heavy focus on isolated unit tests.\n• **Trophy**: Modern approach. Focus on integration tests that resemble how the user interacts with the app. Less brittle than unit tests and faster than E2E.',
    codeExample: `// Integration Test Example (Trophy)
test('user can add an item to cart', () => {
  render(<ProductPage />);
  
  // User finds product
  const product = screen.getByText('Super Widget');
  
  // User clicks add to cart
  fireEvent.click(screen.getByRole('button', { name: /add/i }));
  
  // User sees confirmation
  expect(screen.getByText('Added to cart!')).toBeInTheDocument();
});`,
    priority: null
  },
  {
    id: 39,
    category: 'Testing (Jest & RTL)',
    question: 'How to test custom hooks?',
    answer: 'Use @testing-library/react-hooks or renderHook from RTL. Example: const { result } = renderHook(() => useCustomHook()). Access result.current for hook output. Test state changes, side effects, edge cases. Mock dependencies. Test error handling. Keep hook tests focused on hook logic, not component rendering.',
    explanation: '**Hook Testing:**\n\n• **renderHook**: A utility that renders a hook in a test environment without needing a component wrapper.\n• **act**: Ensures that all updates related to the hook are processed before making assertions.',
    codeExample: `import { renderHook, act } from '@testing-library/react';
import { useState } from 'react';

// Testing a simple custom hook
test('increments count', () => {
  const { result } = renderHook(() => {
    const [count, setCount] = useState(0);
    return { count, setCount };
  });

  expect(result.current.count).toBe(0);

  act(() => {
    result.current.setCount(1);
  });

  expect(result.current.count).toBe(1);
});`,
    priority: null
  },
  {
    id: 40,
    category: 'Testing (Jest & RTL)',
    question: 'What are best practices for writing tests?',
    answer: '1) Test behavior, not implementation, 2) Use descriptive test names, 3) Follow AAA pattern (Arrange, Act, Assert), 4) One assertion per test (or related assertions), 5) Mock external dependencies, 6) Test edge cases and errors, 7) Keep tests independent, 8) Aim for high coverage but focus on critical paths, 9) Use beforeEach for setup.',
    explanation: '**Key Principles:**\n\n• **AAA Pattern**: Arrange (setup data), Act (execute code), Assert (verify results).\n• **User-Centric**: Test what the user sees and does, not internal state.\n• **Isolation**: Each test should run independently of others.\n• **Descriptive Names**: The test name should describe the expected behavior.',
    codeExample: `describe('Shopping Cart', () => {
  // Arrange
  beforeEach(() => {
    render(<CartProvider><CartPage /></CartProvider>);
  });

  test('calculates total price correctly', () => {
    // Act
    fireEvent.click(screen.getByRole('button', { name: /add item/i }));
    
    // Assert
    expect(screen.getByText(/Total: $10.00/i)).toBeInTheDocument();
  });
});`,
    priority: null
  },

  // System Design Questions
  {
    id: 41,
    category: 'System Design',
    question: 'How would you design a scalable frontend architecture?',
    answer: 'Key principles: 1) Component hierarchy (atomic design), 2) State management (local first, global when needed), 3) Code splitting (lazy loading), 4) API layer (centralized service calls), 5) Error boundaries, 6) Performance monitoring, 7) Caching strategy, 8) CI/CD pipeline, 9) Documentation. Use feature-based folder structure.',
    explanation: '**Scalable Architecture:**\n\n• **Feature-based**: Group files by feature rather than type.\n• **Atomic Design**: Atoms, Molecules, Organisms, Templates, Pages.\n• **State Management**: Keep state as local as possible; lift up only when necessary.\n• **API Layer**: Centralize all network requests in a `services` directory.',
    codeExample: `// Feature-based folder structure
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── services/
│   └── products/
├── shared/
│   ├── components/
│   └── utils/
└── App.tsx`,
    priority: null
  },
  {
    id: 42,
    category: 'System Design',
    question: 'How to handle state management in large applications?',
    answer: 'Local state: useState/useReducer for component-specific. Shared state: Context API for medium apps. Global state: Redux/Zustand/Jotai for complex apps. Server state: React Query/SWR for API data. Form state: React Hook Form. Rule: Keep state as local as possible. Lift up only when needed. Normalize data.',
    explanation: '**State Management Layers:**\n\n• **Component State**: UI state (isOpen, inputValue).\n• **App State**: User preferences, theme.\n• **Server State**: Data from APIs (use React Query).\n• **Form State**: Managed by libraries like React Hook Form.',
    codeExample: `// Local State
const [isOpen, setIsOpen] = useState(false);

// Global State (Zustand example)
import create from 'zustand';

const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

// Server State (React Query)
const { data, isLoading } = useQuery(['todos'], fetchTodos);`,
    priority: null
  },
  {
    id: 43,
    category: 'System Design',
    question: 'What strategies would you use for performance optimization?',
    answer: 'Frontend: Code splitting, lazy loading, image optimization, caching, memoization, virtualization, minimize bundle size, CDN, compression. Backend: API optimization, pagination, GraphQL, caching layers. Monitoring: Lighthouse, Web Vitals, profiling. Prioritize: Measure first, optimize bottlenecks, test impact.',
    explanation: '**Performance Checklist:**\n\n• **Bundle Size**: Analyze with `webpack-bundle-analyzer`.\n• **Rendering**: Use React.memo and useMemo for expensive components.\n• **Assets**: Compress images and use modern formats like WebP.\n• **Network**: Implement HTTP/2 and Gzip/Brotli compression.',
    codeExample: `// Code Splitting
const Dashboard = React.lazy(() => import('./Dashboard'));

// Image Optimization
<img 
  src="image.webp" 
  loading="lazy" 
  decoding="async"
  alt="Optimized" 
/>

// Virtualization (react-window)
import { FixedSizeList } from 'react-window';`,
    priority: null
  },
  {
    id: 44,
    category: 'System Design',
    question: 'How to implement authentication and authorization?',
    answer: 'Authentication: JWT tokens, OAuth, session cookies. Store tokens securely (httpOnly cookies). Authorization: Role-based access control (RBAC), protect routes (middleware/HOC), validate on server. Frontend: Auth context/provider, protected routes, token refresh. Security: HTTPS, CSRF protection, XSS prevention.',
    explanation: '**Auth Implementation:**\n\n• **JWT**: JSON Web Tokens for stateless authentication.\n• **RBAC**: Restrict UI elements based on user roles (admin, user, guest).\n• **Protected Routes**: Redirect unauthenticated users to the login page.',
    codeExample: `// Protected Route Component
function ProtectedRoute({ children, role }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/forbidden" />;

  return children;
}

// Usage
<Route path="/admin" element={
  <ProtectedRoute role="admin">
    <AdminPanel />
  </ProtectedRoute>
} />`,
    priority: null
  },
  {
    id: 45,
    category: 'System Design',
    question: 'How to handle error handling and logging?',
    answer: 'Error boundaries for React crashes. Try-catch for async operations. Global error handler (window.onerror). Logging: Console for dev, Sentry/DataDog for prod. User feedback: Toast notifications, error pages. Track: Error frequency, user impact, stack traces. Monitor: Real-time alerts, dashboards. Graceful degradation.',
    explanation: '**Error Handling Strategy:**\n\n• **React**: Use Error Boundaries to catch UI crashes.\n• **Async**: Wrap API calls in try/catch blocks.\n• **Logging**: Send errors to a service like Sentry or LogRocket.\n• **UX**: Show friendly error messages instead of blank screens.',
    codeExample: `// Global Error Handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  logToService(event.error);
});

// Async Error Handling
async function loadData() {
  try {
    const data = await api.fetch();
  } catch (err) {
    showToast('Failed to load data');
  }
}`,
    priority: null
  },
  {
    id: 46,
    category: 'System Design',
    question: 'What is your approach to API integration?',
    answer: 'Centralize API calls in service layer. Use axios/fetch with interceptors. Handle loading, success, error states. Implement retry logic, timeout, cancellation. Cache responses (React Query). Type responses with TypeScript. Abstract API details from components. Use environment variables for endpoints. Document API contracts.',
    explanation: '**API Layer Best Practices:**\n\n• **Interceptors**: Handle auth tokens and global error logging in one place.\n• **AbortController**: Cancel in-flight requests when a component unmounts.\n• **Type Safety**: Use TypeScript interfaces for all API responses.',
    codeExample: `// API Service
const api = axios.create({ baseURL: process.env.API_URL });

api.interceptors.request.use(config => {
  config.headers.Authorization = 'Bearer ' + getToken();
  return config;
});

export const fetchUsers = () => api.get('/users');

// Usage in Component
const { data } = useQuery('users', fetchUsers);`,
    priority: null
  },
  {
    id: 47,
    category: 'System Design',
    question: 'How to ensure code quality in a team?',
    answer: 'Tools: ESLint, Prettier, TypeScript, Husky (pre-commit hooks). Process: Code reviews, PR templates, pair programming. Testing: Unit, integration, E2E tests. Documentation: README, component docs, ADRs. CI/CD: Automated tests, linting, deployment. Standards: Coding conventions, git workflow, branching strategy.',
    explanation: '**Quality Assurance:**\n\n• **Linting**: Enforce consistent style with ESLint and Prettier.\n• **Git Hooks**: Use Husky to run tests before every commit.\n• **CI/CD**: Automate testing and deployment pipelines.\n• **Code Reviews**: Ensure at least one other developer reviews every PR.',
    codeExample: `// .eslintrc.json
{
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "rules": {
    "no-console": "warn",
    "react/prop-types": "off"
  }
}

// package.json scripts
"scripts": {
  "lint": "eslint src/",
  "format": "prettier --write src/",
  "test": "jest"
}`,
    priority: null
  },

  // HTML & CSS Questions
  {
    id: 48,
    category: 'HTML & CSS',
    question: 'What is semantic HTML and why is it important?',
    answer: 'Semantic HTML uses meaningful tags (<header>, <nav>, <main>, <article>, <section>, <footer>) instead of generic <div>. Benefits: Better accessibility (screen readers), SEO improvement, code readability, maintainability. Always use appropriate semantic elements. Helps browsers and assistive technologies understand content structure.',
    explanation: '**Why Semantics Matter:**\n\n• **Accessibility**: Screen readers rely on semantic tags to navigate the page.\n• **SEO**: Search engines use tags to understand the importance of content.\n• **Maintainability**: Code is easier for other developers to read and understand.',
    codeExample: `<!-- Non-semantic -->
<div class="header">
  <div class="nav">...</div>
</div>

<!-- Semantic -->
<header>
  <nav>
    <ul>...</ul>
  </nav>
</header>
<main>
  <article>...</article>
</main>`,
    priority: null
  },
  {
    id: 49,
    category: 'HTML & CSS',
    question: 'Explain CSS Box Model.',
    answer: 'Every element is a box with: Content (actual content), Padding (space around content), Border (around padding), Margin (space outside border). box-sizing: content-box (default, width = content only), border-box (width includes padding + border). Use border-box for easier sizing calculations.',
    explanation: '**Box Model Components:**\n\n• **Content**: The actual text or image.\n• **Padding**: Transparent area around the content.\n• **Border**: Goes around the padding and content.\n• **Margin**: Transparent area outside the border.\n\n**Pro Tip**: Use `box-sizing: border-box` so that padding and border are included in the element\'s total width and height.',
    codeExample: `* {
  box-sizing: border-box;
}

.box {
  width: 300px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
  /* Total width is still 300px with border-box */
}`,
    priority: null
  },
  {
    id: 50,
    category: 'HTML & CSS',
    question: 'Difference between Flexbox and Grid?',
    answer: 'Flexbox: One-dimensional (row OR column), content-based sizing, alignment, distribution. Best for: Navigation, cards, centering. Grid: Two-dimensional (rows AND columns), fixed/fluid layouts, complex designs. Best for: Page layouts, galleries, forms. Can combine both. Flexbox for components, Grid for layouts.',
    explanation: '**Layout Systems:**\n\n• **Flexbox**: Great for aligning items in a single direction (row or column). It\'s "content-first".\n• **Grid**: Great for creating complex 2D layouts. It\'s "layout-first".\n• **Combination**: Use Grid for the main page structure and Flexbox for the components inside it.',
    codeExample: `/* Flexbox - Centering */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Grid - Page Layout */
.page {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
}`,
    priority: null
  },
  {
    id: 51,
    category: 'HTML & CSS',
    question: 'What are CSS pseudo-classes and pseudo-elements?',
    answer: 'Pseudo-classes (:hover, :focus, :active, :nth-child, :first-child): Style element states. Pseudo-elements (::before, ::after, ::first-line): Style specific parts or add content. Use :hover for interactions, :focus for accessibility, ::before/::after for decorative content without extra HTML.',
    explanation: '**CSS Selectors:**\n\n• **Pseudo-classes**: Target elements based on their state (e.g., when a user hovers over them).\n• **Pseudo-elements**: Target specific parts of an element or insert virtual content. Note the double colon (`::`) syntax.',
    codeExample: `/* Pseudo-class */
button:hover {
  background-color: blue;
}

/* Pseudo-element */
p::before {
  content: "💡 ";
}

p::first-line {
  font-weight: bold;
}`,
    priority: null
  },
  {
    id: 52,
    category: 'HTML & CSS',
    question: 'How to make a website responsive?',
    answer: 'Strategies: 1) Mobile-first approach, 2) Fluid layouts (%/fr/vw/vh), 3) Media queries (@media), 4) Flexible images (max-width: 100%), 5) Responsive typography (clamp/rem), 6) CSS Grid/Flexbox, 7) Viewport meta tag. Test on multiple devices. Use relative units. Avoid fixed widths. Progressive enhancement.',
    explanation: '**Responsive Design Techniques:**\n\n• **Media Queries**: Apply styles based on screen width.\n• **Relative Units**: Use `rem`, `%`, and `vw` instead of `px`.\n• **Mobile-First**: Start with styles for small screens and add complexity for larger ones.',
    codeExample: `/* Mobile First */
.container {
  width: 100%;
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    width: 750px;
    margin: 0 auto;
  }
}`,
    priority: null
  },
  {
    id: 53,
    category: 'HTML & CSS',
    question: 'What are CSS preprocessors and why use them?',
    answer: 'Preprocessors (Sass, Less, Stylus) extend CSS with: Variables, nesting, mixins, functions, inheritance, modules. Benefits: DRY code, maintainability, organization, reusability. Compile to regular CSS. Modern alternative: CSS custom properties (variables) + PostCSS. Still useful for large projects with complex styling.',
    explanation: '**Why Sass/SCSS?**\n\n• **Variables**: Store colors and fonts in one place.\n• **Nesting**: Write selectors that reflect your HTML structure.\n• **Mixins**: Reusable blocks of CSS code.\n• **Partials**: Split CSS into smaller, manageable files.',
    codeExample: `// SCSS Example
$primary-color: #3498db;

.button {
  background: $primary-color;
  
  &:hover {
    background: darken($primary-color, 10%);
  }
}

@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}`,
    priority: null
  },
  {
    id: 54,
    category: 'HTML & CSS',
    question: 'Explain CSS specificity and cascade.',
    answer: 'Specificity determines which rule applies when conflicts occur. Hierarchy: Inline styles > IDs > Classes/attributes/pseudo-classes > Elements/pseudo-elements. Specificity calculated as (inline, id, class, element). !important overrides everything (avoid). Cascade: Source order matters for equal specificity. Keep selectors simple.',
    explanation: '**Specificity Score:**\n\n• **Inline**: 1000 points\n• **ID**: 100 points\n• **Class/Pseudo-class**: 10 points\n• **Element/Pseudo-element**: 1 point\n\nThe rule with the highest score wins. If scores are equal, the last one defined in the CSS file wins.',
    codeExample: `/* Specificity: 1 */
p { color: red; }

/* Specificity: 10 */
.text { color: blue; }

/* Specificity: 100 */
#main { color: green; }

/* Specificity: 111 */
#main .text p { color: orange; }`,
    priority: null
  },
  {
    id: 55,
    category: 'HTML & CSS',
    question: 'What are CSS custom properties (variables)?',
    answer: 'Define: --primary-color: blue. Use: color: var(--primary-color). Scope: Global (:root) or local (selector). Benefits: Dynamic theming, runtime changes, JavaScript interaction, fallbacks var(--color, red). Update with setProperty(). Better than preprocessor variables - can be changed dynamically, inherited, scoped.',
    explanation: '**CSS Variables:**\n\n• **Definition**: Start with two dashes (`--`).\n• **Usage**: Use the `var()` function.\n• **Scope**: Can be global (`:root`) or scoped to a specific component.\n• **Dynamic**: Can be updated via JavaScript at runtime.',
    codeExample: `:root {
  --brand-color: #646cff;
  --spacing: 1rem;
}

.card {
  padding: var(--spacing);
  color: var(--brand-color);
}

/* JS Interaction */
document.documentElement.style.setProperty('--brand-color', 'red');`,
    priority: null
  },

  // ==================== ADDITIONAL HTML & CSS QUESTIONS ====================
  {
    id: 249,
    category: 'HTML & CSS',
    question: 'What is the difference between display: none and visibility: hidden?',
    answer: 'display: none removes element from document flow (no space), visibility: hidden hides element but keeps space. display: none triggers reflow, visibility: hidden only repaint. display: none not accessible, visibility: hidden still in accessibility tree.',
    explanation: '**Key Differences:**\n\n• **Space**: `display: none` removes space, `visibility: hidden` preserves it\n• **Performance**: `visibility: hidden` is faster (only repaint)\n• **Accessibility**: `visibility: hidden` elements are still read by screen readers\n• **Child Elements**: Children of `visibility: hidden` can be made visible with `visibility: visible`',
    codeExample: `.hidden-display {
  display: none; /* Completely removed */
}

.hidden-visibility {
  visibility: hidden; /* Space preserved */
}

/* Child can override parent visibility */
.parent-hidden {
  visibility: hidden;
}
.child-visible {
  visibility: visible;
}`,
    priority: null
  },
  {
    id: 250,
    category: 'HTML & CSS',
    question: 'Explain position property values in CSS.',
    answer: 'static (default, normal flow), relative (offset from normal position), absolute (positioned relative to nearest positioned ancestor), fixed (relative to viewport), sticky (toggles between relative and fixed). Use z-index to control stacking order.',
    explanation: '**Position Values:**\n\n• **static**: Default behavior, follows normal document flow\n• **relative**: Can use top/right/bottom/left to offset from original position\n• **absolute**: Removed from flow, positioned relative to nearest non-static ancestor\n• **fixed**: Removed from flow, stays fixed relative to viewport (stays on scroll)\n• **sticky**: Behaves like relative until scroll threshold, then becomes fixed',
    codeExample: `.relative-box {
  position: relative;
  top: 10px;
  left: 20px;
}

.absolute-child {
  position: absolute;
  top: 0;
  right: 0;
}

.fixed-header {
  position: fixed;
  top: 0;
  width: 100%;
}

.sticky-nav {
  position: sticky;
  top: 0;
}`,
    priority: null
  },
  {
    id: 251,
    category: 'HTML & CSS',
    question: 'What is the difference between em, rem, px, and % units?',
    answer: 'px: absolute unit, fixed size. em: relative to parent font-size. rem: relative to root (html) font-size. %: relative to parent dimension. Best practice: use rem for typography, % or vw/vh for layouts, avoid px for responsive design.',
    explanation: '**CSS Units:**\n\n• **px**: Fixed pixels, not scalable (bad for accessibility)\n• **em**: Relative to parent element\'s font-size (can compound)\n• **rem**: Relative to root html font-size (consistent, recommended)\n• **%**: Percentage of parent element\n• **vw/vh**: Viewport width/height (1vw = 1% of viewport width)\n• **ch**: Width of "0" character (good for form inputs)',
    codeExample: `html {
  font-size: 16px; /* Base size */
}

h1 {
  font-size: 2rem; /* 32px */
}

.card {
  padding: 1.5rem; /* 24px */
  width: 50%; /* Half of parent */
}

.hero {
  height: 100vh; /* Full viewport height */
}`,
    priority: null
  },
  {
    id: 252,
    category: 'HTML & CSS',
    question: 'How does z-index work and what is stacking context?',
    answer: 'z-index controls vertical stacking order. Only works on positioned elements (not static). Higher z-index appears on top. Stacking context created by: positioned elements with z-index, opacity < 1, transform, filter, flex/grid children with z-index. Each stacking context is independent.',
    explanation: '**Stacking Context Rules:**\n\n• Elements with higher z-index appear above lower ones\n• z-index only works on positioned elements (relative, absolute, fixed, sticky)\n• A new stacking context isolates child z-index values\n• Parent stacking context takes precedence over children\n\n**Common Triggers for New Stacking Context:**\n• position + z-index\n• opacity < 1\n• transform, filter, perspective\n• isolation: isolate\n• mix-blend-mode',
    codeExample: `.modal-overlay {
  position: fixed;
  z-index: 1000;
}

.modal {
  position: fixed;
  z-index: 1001;
}

/* Creates new stacking context */
.parent {
  position: relative;
  z-index: 1;
  opacity: 0.9;
}

.child {
  position: absolute;
  z-index: 9999; /* Still below .modal because parent has z-index: 1 */
}`,
    priority: null
  },
  {
    id: 253,
    category: 'HTML & CSS',
    question: 'What are BFC (Block Formatting Context) and how to create one?',
    answer: 'BFC is an isolated layout region where boxes are laid out. Created by: float (not none), position (absolute/fixed), display (inline-block/table-cell/flex/grid), overflow (not visible). Benefits: contains floats, prevents margin collapse, prevents text wrapping around floats.',
    explanation: '**Why BFC Matters:**\n\n• **Contains Floats**: Parent expands to contain floated children\n• **Prevents Margin Collapse**: Margins don\'t collapse between BFC siblings\n• **Isolates Layout**: External elements don\'t affect internal layout\n\n**Common Use Case**: Clearing floats without extra markup',
    codeExample: `/* Create BFC to contain floats */
.container {
  overflow: hidden; /* Creates BFC */
}

.float-left {
  float: left;
  width: 50%;
}

/* Alternative BFC creators */
.bfc-1 { display: flow-root; } /* Modern way */
.bfc-2 { display: flex; }
.bfc-3 { position: absolute; }
.bfc-4 { overflow: auto; }`,
    priority: null
  },
  {
    id: 254,
    category: 'HTML & CSS',
    question: 'Explain CSS transitions vs animations.',
    answer: 'Transitions: simple state changes (hover, focus), triggered by events, no keyframes. Animations: complex multi-step sequences, auto-play or controlled, uses @keyframes. Transitions need trigger, animations can run automatically. Use transitions for simple effects, animations for complex sequences.',
    explanation: '**When to Use What:**\n\n• **Transitions**: Simple hover effects, smooth state changes\n• **Animations**: Loading spinners, complex sequences, auto-playing effects\n• **Performance**: Both can use GPU acceleration with transform/opacity\n• **Control**: Animations offer more control with keyframes and iteration',
    codeExample: `/* Transition - needs trigger */
.button {
  transition: background-color 0.3s ease, transform 0.2s;
}

.button:hover {
  background-color: blue;
  transform: scale(1.05);
}

/* Animation - runs automatically */
@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

.slide-in {
  animation: slideIn 0.5s ease-out forwards;
}`,
    priority: null
  },
  {
    id: 255,
    category: 'HTML & CSS',
    question: 'What is the difference between grid-template-columns and grid-auto-columns?',
    answer: 'grid-template-columns: explicitly defines column tracks (fixed structure). grid-auto-columns: defines size of implicit columns (auto-generated). Use template for planned layout, auto for dynamic content. Template creates explicit grid, auto handles overflow items.',
    explanation: '**Explicit vs Implicit Grid:**\n\n• **Explicit Grid**: Defined by grid-template-rows/columns\n• **Implicit Grid**: Auto-created when content exceeds explicit grid\n• **grid-auto-***: Controls sizing of implicit tracks\n• Best practice: Define explicit grid for main layout, use auto for flexibility',
    codeExample: `.gallery {
  display: grid;
  /* Explicit: 3 fixed columns */
  grid-template-columns: repeat(3, 1fr);
  /* Implicit: any extra columns are 200px */
  grid-auto-columns: 200px;
  gap: 1rem;
}

/* Responsive with auto-fit */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}`,
    priority: null
  },
  {
    id: 256,
    category: 'HTML & CSS',
    question: 'How to center an element horizontally and vertically?',
    answer: 'Methods: 1) Flexbox: display:flex + justify-content:center + align-items:center, 2) Grid: display:grid + place-items:center, 3) Absolute: position:absolute + top:50% + left:50% + transform:translate(-50%,-50%), 4) Margin: margin:auto (block elements). Flexbox/Grid are modern preferred methods.',
    explanation: '**Centering Techniques:**\n\n• **Flexbox**: Most versatile, works for any content\n• **Grid**: Simplest syntax with place-items\n• **Absolute + Transform**: Works even without knowing dimensions\n• **Margin Auto**: Only for horizontal centering of block elements',
    codeExample: `/* Method 1: Flexbox (Recommended) */
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Method 2: Grid (Simplest) */
.grid-center {
  display: grid;
  place-items: center;
}

/* Method 3: Absolute Positioning */
.absolute-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Method 4: Margin (Horizontal only) */
.margin-center {
  margin: 0 auto;
  width: 50%;
}`,
    priority: null
  },
  {
    id: 257,
    category: 'HTML & CSS',
    question: 'What is the :where() selector and how does it differ from :is()?',
    answer: ':where() and :is() both accept selector lists, but :where() always has specificity of 0, while :is() takes highest specificity from arguments. Use :where() for zero-specificity selectors, :is() for normal specificity matching.',
    explanation: '**Specificity Difference:**\n\n• **:is()**: Uses highest specificity from its arguments\n• **:where()**: Always has 0 specificity\n• **:where()** useful for creating reusable styles without affecting specificity\n• Both support same selector syntax',
    codeExample: `/* :is() - specificity is 10 (class) */
:is(.header, .footer) a {
  color: blue;
}

/* :where() - specificity is 0 */
:where(.header, .footer) a {
  color: red; /* Lower priority than :is() version */
}

/* Practical use: reset styles */
:where(h1, h2, h3, h4, h5, h6) {
  margin: 0;
  padding: 0;
}`,
    priority: null
  },
  {
    id: 258,
    category: 'HTML & CSS',
    question: 'Explain CSS containment property.',
    answer: 'contain property optimizes rendering by telling browser that element subtree is independent. Values: layout (layout containment), paint (paint containment), size (size containment), style (style containment). Improves performance for large pages by limiting recalculation scope.',
    explanation: '**Containment Types:**\n\n• **layout**: Element\'s layout is independent of outside\n• **paint**: Descendants don\'t display outside bounds\n• **size**: Size can be determined without examining descendants\n• **style**: Styles won\'t escape element\n• **content**: Shorthand for layout + paint\n• **strict**: Shorthand for layout + paint + size',
    codeExample: `/* Optimize rendering for card components */
.card {
  contain: content; /* layout + paint */
}

/* For fixed-size widgets */
.widget {
  contain: strict; /* layout + paint + size */
  width: 300px;
  height: 200px;
}

/* Isolate layout calculations */
.sidebar {
  contain: layout;
}`,
    priority: null
  },
  {
    id: 259,
    category: 'HTML & CSS',
    question: 'What are logical properties in CSS?',
    answer: 'Logical properties replace physical directions with logical ones based on writing mode. Examples: margin-inline-start (instead of margin-left), padding-block (top+bottom), border-inline-end. Benefits: Better internationalization, automatic RTL support, cleaner responsive code.',
    explanation: '**Physical vs Logical:**\n\n• **Physical**: left, right, top, bottom (direction-dependent)\n• **Logical**: inline-start/end, block-start/end (writing-mode-aware)\n• **inline**: Horizontal axis in LTR/RTL languages\n• **block**: Vertical axis in most languages\n• Automatically adapts to text direction',
    codeExample: `/* Physical properties */
.old-way {
  margin-left: 1rem;
  margin-right: 2rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

/* Logical properties (modern) */
.new-way {
  margin-inline-start: 1rem; /* left in LTR, right in RTL */
  margin-inline-end: 2rem;
  padding-block: 1rem; /* top + bottom */
  border-inline: 1px solid black;
}`,
    priority: null
  },
  {
    id: 260,
    category: 'HTML & CSS',
    question: 'How to prevent FOUC (Flash of Unstyled Content)?',
    answer: 'FOUC occurs when HTML renders before CSS loads. Prevention: 1) Inline critical CSS in <head>, 2) Load CSS in <head> not body, 3) Use media queries for non-critical CSS, 4) Preload critical fonts, 5) Avoid @import in CSS. Critical rendering path optimization.',
    explanation: '**Best Practices:**\n\n• **Critical CSS**: Inline above-the-fold styles directly in HTML\n• **Load Order**: CSS before JavaScript in <head>\n• **Async Loading**: Use media="print" then switch for non-critical CSS\n• **Font Loading**: Use font-display: swap or optional\n• **Avoid Blocking**: Don\'t use @import (creates additional request chain)',
    codeExample: `<!-- Inline critical CSS -->
<style>
  /* Above-the-fold styles */
  header { background: #fff; }
  .hero { min-height: 100vh; }
</style>

<!-- Load remaining CSS -->
<link rel="stylesheet" href="styles.css">

<!-- Non-critical CSS loaded async -->
<link rel="stylesheet" href="extra.css" media="print" onload="this.media='all'">`,
    priority: null
  },
  {
    id: 261,
    category: 'HTML & CSS',
    question: 'What is the difference between reset.css and normalize.css?',
    answer: 'reset.css: Removes all default browser styles (aggressive, starts from scratch). normalize.css: Makes browsers render consistently while preserving useful defaults (conservative). Modern approach: Use minimal reset or CSS custom properties for consistency.',
    explanation: '**Approaches:**\n\n• **Reset**: Strips everything (margin: 0, padding: 0 everywhere)\n• **Normalize**: Fixes inconsistencies, keeps sensible defaults\n• **Modern**: Minimal reset + design tokens\n• Recommendation: Use normalize.css or modern alternatives like ress.css',
    codeExample: `/* Reset approach (aggressive) */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Normalize approach (conservative) */
/* Keeps useful defaults, fixes bugs */
body {
  line-height: 1.15; /* Consistent across browsers */
}

/* Modern minimal reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
}`,
    priority: null
  },
  {
    id: 262,
    category: 'HTML & CSS',
    question: 'Explain CSS aspect-ratio property.',
    answer: 'aspect-ratio maintains proportional dimensions. Syntax: aspect-ratio: width / height (e.g., 16/9, 1/1). Replaces padding-bottom hack for responsive media. Works with width or height specified. Browser calculates missing dimension automatically.',
    explanation: '**Use Cases:**\n\n• **Images/Videos**: Maintain proportions during loading\n• **Cards**: Uniform card sizes in grids\n• **Responsive Design**: Scale proportionally across breakpoints\n• **Replaces**: The old padding-bottom percentage trick',
    codeExample: `/* Square aspect ratio */
.square {
  aspect-ratio: 1 / 1;
  width: 100%;
}

/* Video container (16:9) */
.video-container {
  aspect-ratio: 16 / 9;
  width: 100%;
}

/* Card with consistent ratio */
.card-image {
  aspect-ratio: 4 / 3;
  object-fit: cover;
}`,
    priority: null
  },
  {
    id: 263,
    category: 'HTML & CSS',
    question: 'What are CSS scroll-snap properties?',
    answer: 'Scroll-snap creates snapping points during scrolling. Properties: scroll-snap-type (container), scroll-snap-align (children). Values: x, y, both, mandatory, proximity. Creates carousel-like behavior without JavaScript. Great for image galleries, full-page sections.',
    explanation: '**Scroll Snap Types:**\n\n• **none**: No snapping\n• **x/y/both**: Axis to snap on\n• **mandatory**: Always snap to point\n• **proximity**: Snap if close enough\n• Smooth, native scrolling experience',
    codeExample: `/* Container */
.gallery {
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
}

/* Children */
.gallery-item {
  flex: 0 0 100%;
  scroll-snap-align: center;
}

/* Full-page sections */
.sections {
  scroll-snap-type: y mandatory;
  height: 100vh;
  overflow-y: scroll;
}

section {
  scroll-snap-align: start;
  height: 100vh;
}`,
    priority: null
  },
  {
    id: 264,
    category: 'HTML & CSS',
    question: 'How to create a CSS-only tooltip?',
    answer: 'Use data attribute for content, ::before/::after pseudo-elements for tooltip box and arrow, :hover or :focus to show. Position absolutely relative to parent. Add transition for smooth appearance. Ensure accessibility with proper ARIA attributes.',
    explanation: '**Implementation Strategy:**\n\n• Store tooltip text in data-tooltip attribute\n• Use ::after for tooltip content (content: attr(data-tooltip))\n• Use ::before for arrow/triangle\n• Show on :hover and :focus for accessibility\n• Position with absolute positioning',
    codeExample: `[data-tooltip] {
  position: relative;
  cursor: help;
}

[data-tooltip]::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem;
  background: #333;
  color: white;
  border-radius: 4px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s;
}

[data-tooltip]:hover::after,
[data-tooltip]:focus::after {
  opacity: 1;
  visibility: visible;
}`,
    priority: null
  },
  {
    id: 265,
    category: 'HTML & CSS',
    question: 'What is the difference between clip-path and mask?',
    answer: 'clip-path: Defines visible region (vector paths), hard edges, better performance. mask: Uses images/gradients for transparency, supports soft edges and gradients, more flexible. clip-path for geometric shapes, mask for complex transparency effects.',
    explanation: '**When to Use:**\n\n• **clip-path**: Simple shapes (circle, polygon), better performance\n• **mask**: Gradient fades, image-based masks, soft edges\n• **clip-path**: Part of CSS Shapes module\n• **mask**: Requires vendor prefixes in some browsers',
    codeExample: `/* Clip-path examples */
.circle {
  clip-path: circle(50%);
}

.polygon {
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

/* Mask examples */
.gradient-mask {
  mask-image: linear-gradient(to bottom, black, transparent);
  -webkit-mask-image: linear-gradient(to bottom, black, transparent);
}

.image-mask {
  mask-image: url(mask.png);
  mask-size: cover;
}`,
    priority: null
  },
  {
    id: 266,
    category: 'HTML & CSS',
    question: 'Explain CSS counter-reset and counter-increment.',
    answer: 'CSS counters allow automatic numbering. counter-reset initializes counter (default 0), counter-increment increases value. Display with counter() or counters() in content property. Useful for ordered lists, section numbering, table of contents without JavaScript.',
    explanation: '**Counter Functions:**\n\n• **counter-reset**: Initialize counter (can set starting value)\n• **counter-increment**: Increase counter (default +1)\n• **counter(name)**: Display current value\n• **counters(name, separator)**: Display nested counters\n• Can count any element, not just list items',
    codeExample: `/* Automatic section numbering */
body {
  counter-reset: section;
}

h2::before {
  counter-increment: section;
  content: "Section " counter(section) ": ";
}

/* Nested numbering (1.1, 1.2, etc.) */
ol {
  counter-reset: item;
  list-style: none;
}

li::before {
  counter-increment: item;
  content: counters(item, ".") " ";
}`,
    priority: null
  },
  {
    id: 267,
    category: 'HTML & CSS',
    question: 'What is the prefers-reduced-motion media query?',
    answer: 'prefers-reduced-motion respects user\'s OS setting for reduced motion. Important for accessibility (vestibular disorders, motion sensitivity). Check with @media (prefers-reduced-motion: reduce). Provide alternative animations or disable them. Always respect user preferences.',
    explanation: '**Accessibility Best Practice:**\n\n• Some users experience nausea/dizziness from animations\n• Users can enable reduced motion in OS settings\n• Always provide non-animated alternatives\n• Disable parallax, auto-scrolling, flashing effects\n• Keep essential UI feedback (button states)',
    codeExample: `/* Default animation */
.animated-element {
  animation: slideIn 0.5s ease-out;
  transition: transform 0.3s;
}

/* Respect user preference */
@media (prefers-reduced-motion: reduce) {
  .animated-element {
    animation: none;
    transition: none;
  }
  
  /* Or provide simpler alternative */
  .fade-in {
    animation: fadeIn 0.1s; /* Very subtle */
  }
}`,
    priority: null
  },
  {
    id: 268,
    category: 'HTML & CSS',
    question: 'How to implement dark mode with CSS?',
    answer: 'Methods: 1) prefers-color-scheme media query (system preference), 2) CSS custom properties + class toggle (user control), 3) Combine both. Define color variables for light/dark themes. Toggle class on <html> or <body>. Store preference in localStorage.',
    explanation: '**Implementation Approaches:**\n\n• **System Preference**: Automatic based on OS setting\n• **User Toggle**: Manual switch with class toggling\n• **Hybrid**: Start with system, allow override\n• **Variables**: Change variable values, not individual properties\n• **Storage**: Save user preference for persistence',
    codeExample: `/* Define theme variables */
:root {
  --bg-color: #ffffff;
  --text-color: #000000;
}

/* Dark theme */
[data-theme="dark"] {
  --bg-color: #1a1a1a;
  --text-color: #ffffff;
}

/* System preference */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg-color: #1a1a1a;
    --text-color: #ffffff;
  }
}

/* Apply variables */
body {
  background: var(--bg-color);
  color: var(--text-color);
}`,
    priority: null
  },
  {
    id: 269,
    category: 'HTML & CSS',
    question: 'What is the difference between object-fit and object-position?',
    answer: 'object-fit: Controls how replaced content (img, video) resizes to fit container (contain, cover, fill, none, scale-down). object-position: Controls alignment within container (like background-position). Common: object-fit: cover for uniform images, contain for full visibility.',
    explanation: '**Object-Fit Values:**\n\n• **fill**: Stretches to fill (may distort) - default\n• **contain**: Fits entirely within (may have empty space)\n• **cover**: Fills completely (may crop)\n• **none**: Original size (may overflow)\n• **scale-down**: Smaller of none or contain\n• **object-position**: Works like background-position (center, top, etc.)',
    codeExample: `/* Cover entire area (crop if needed) */
.cover-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  object-position: center;
}

/* Show entire image (may have gaps) */
.contain-image {
  width: 100%;
  height: 300px;
  object-fit: contain;
}

/* Specific positioning */
.top-image {
  object-fit: cover;
  object-position: top center;
}`,
    priority: null
  },
  {
    id: 270,
    category: 'HTML & CSS',
    question: 'Explain CSS will-change property.',
    answer: 'will-change hints browser about upcoming changes for optimization. Values: auto, scroll-position, contents, <custom-ident>. Use sparingly - creates new stacking context and consumes memory. Remove after animation completes. Only use for actual performance bottlenecks.',
    explanation: '**Best Practices:**\n\n• **Purpose**: Gives browser advance notice for optimization\n• **Memory Cost**: Each will-change creates compositor layer\n• **When to Use**: Before expensive animations/transitions\n• **When to Remove**: After animation completes\n• **Don\'t Overuse**: Can hurt performance if misused\n• **Alternatives**: Let browser optimize naturally first',
    codeExample: `/* Before animation starts */
.element {
  will-change: transform, opacity;
}

/* During animation */
.element.animate {
  transform: rotate(360deg);
  opacity: 0.5;
}

/* After animation - remove will-change */
.element:not(.animate) {
  will-change: auto;
}

/* Dynamic usage with JS */
element.addEventListener('mouseenter', () => {
  element.style.willChange = 'transform';
});
element.addEventListener('mouseleave', () => {
  element.style.willChange = 'auto';
});`,
    priority: null
  },
  {
    id: 271,
    category: 'HTML & CSS',
    question: 'What are CSS blend modes?',
    answer: 'mix-blend-mode blends element with backdrop. background-blend-mode blends background layers. Values: multiply, screen, overlay, darken, lighten, color-dodge, color-burn, hard-light, soft-light, difference, exclusion, hue, saturation, color, luminosity. Create visual effects without images.',
    explanation: '**Common Blend Modes:**\n\n• **multiply**: Darkens (like multiplying colors)\n• **screen**: Lightens (opposite of multiply)\n• **overlay**: Combines multiply and screen\n• **difference**: Subtracts colors\n• **hue/saturation/color/luminosity**: HSL component blending\n• Useful for image effects, text overlays, creative designs',
    codeExample: `/* Text blending with background */
.blended-text {
  color: white;
  mix-blend-mode: difference;
}

/* Background layer blending */
.multi-bg {
  background-image: url(photo.jpg), linear-gradient(red, blue);
  background-blend-mode: overlay;
}

/* Image effect */
.grayscale-effect {
  mix-blend-mode: luminosity;
}`,
    priority: null
  },
  {
    id: 272,
    category: 'HTML & CSS',
    question: 'How to create a CSS-only accordion?',
    answer: 'Use checkbox/radio input + label + sibling selector. Hide input, style label as header, use :checked to show/hide content. Alternative: Use <details> and <summary> elements (semantic, accessible). Details/summary is modern preferred approach.',
    explanation: '**Two Approaches:**\n\n• **Checkbox Hack**: Works everywhere, less semantic\n• **Details/Summary**: Semantic HTML5, built-in accessibility\n• **Details/Summary Advantages**: Native keyboard support, screen reader friendly\n• **Checkbox Advantages**: More styling control, multiple open',
    codeExample: `/* Modern approach (recommended) */
details {
  border: 1px solid #ccc;
  border-radius: 4px;
}

summary {
  padding: 1rem;
  cursor: pointer;
  font-weight: bold;
}

details[open] summary {
  border-bottom: 1px solid #ccc;
}

.details-content {
  padding: 1rem;
}

/* Checkbox approach */
.accordion-input {
  display: none;
}

.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s;
}

.accordion-input:checked ~ .accordion-content {
  max-height: 500px;
}`,
    priority: null
  },
  {
    id: 273,
    category: 'HTML & CSS',
    question: 'What is the CSS :focus-visible pseudo-class?',
    answer: ':focus-visible shows focus indicator only when appropriate (keyboard navigation), not on mouse click. Improves UX by hiding focus rings for mouse users while keeping them for keyboard users. Better than :focus which shows for all interactions. Essential for accessibility.',
    explanation: '**Focus Management:**\n\n• **:focus**: Shows on any focus (mouse, keyboard, touch)\n• **:focus-visible**: Smart detection of focus method\n• **Browser Heuristic**: Shows ring when keyboard used\n• **Accessibility**: Keyboard users need visible focus\n• **UX**: Mouse users don\'t need persistent focus rings',
    codeExample: `/* Remove default outline */
button {
  outline: none;
}

/* Show focus only for keyboard users */
button:focus-visible {
  outline: 2px solid blue;
  outline-offset: 2px;
}

/* Fallback for older browsers */
button:focus {
  outline: 2px solid blue;
  outline-offset: 2px;
}

button.js-focus-visible:focus:not(.focus-visible) {
  outline: none;
}`,
    priority: null
  },
  {
    id: 274,
    category: 'HTML & CSS',
    question: 'Explain CSS @supports rule (feature queries).',
    answer: '@supports checks browser support for CSS features before applying styles. Progressive enhancement pattern. Syntax: @supports (property: value) { styles }. Can use not, and, or operators. Fallback styles outside @supports. Test any CSS feature support.',
    explanation: '**Progressive Enhancement:**\n\n• **Purpose**: Apply advanced styles only if supported\n• **Fallback**: Provide basic styles for all browsers\n• **Operators**: not, and, or for complex queries\n• **Better than JS**: No JavaScript required\n• **Common Uses**: Grid, custom properties, new selectors',
    codeExample: `/* Basic feature query */
.card {
  display: block; /* Fallback */
}

@supports (display: grid) {
  .card {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Complex query */
@supports (display: grid) and (gap: 1rem) {
  .layout {
    display: grid;
    gap: 1rem;
  }
}

/* Negation */
@supports not (display: grid) {
  .layout {
    display: flex;
  }
}`,
    priority: null
  },
  {
    id: 275,
    category: 'HTML & CSS',
    question: 'What is the difference between initial, inherit, unset, and revert?',
    answer: 'initial: Sets to CSS spec default value. inherit: Takes parent\'s computed value. unset: Acts as inherit if inherited property, initial otherwise. revert: Rolls back to user agent stylesheet or user styles. revert-layer: Reverts to previous cascade layer.',
    explanation: '**Keyword Values:**\n\n• **initial**: CSS specification default (e.g., display: inline)\n• **inherit**: Copy from parent element\n• **unset**: inherit for inherited props, initial for others\n• **revert**: Back to browser default or user styles\n• **revert-layer**: Back to previous @layer\n• Useful for resetting specific properties',
    codeExample: `/* Reset to default */
.reset-btn {
  all: initial; /* Reset all properties */
}

/* Inherit from parent */
.child {
  color: inherit;
  font-size: inherit;
}

/* Smart reset */
.unset-example {
  margin: unset; /* Acts as inherit (margin is inherited) */
  display: unset; /* Acts as initial (display is not inherited) */
}

/* Revert to browser default */
.revert-example {
  all: revert;
}`,
    priority: null
  },
  {
    id: 276,
    category: 'HTML & CSS',
    question: 'How to optimize web fonts for performance?',
    answer: 'Strategies: 1) Use font-display: swap/optional, 2) Subset fonts (remove unused characters), 3) Use WOFF2 format, 4) Limit font weights/styles, 5) Preload critical fonts, 6) Use system fonts as fallback, 7) Consider variable fonts. Balance aesthetics with performance.',
    explanation: '**Font Optimization Checklist:**\n\n• **font-display**: Control loading behavior (swap, optional, fallback)\n• **Format**: WOFF2 has best compression\n• **Subsetting**: Include only needed characters\n• **Weights**: Load only used weights (400, 700)\n• **Preload**: <link rel="preload"> for critical fonts\n• **Variable Fonts**: Single file for multiple weights/styles\n• **System Fallback**: Use font-stack with system fonts',
    codeExample: `/* Preload critical font */
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>

/* Font loading strategy */
@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2') format('woff2');
  font-display: swap; /* Show fallback immediately */
  font-weight: 400;
}

/* Font stack with fallbacks */
body {
  font-family: 'CustomFont', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* Variable font */
@font-face {
  font-family: 'VarFont';
  src: url('variable.woff2') format('woff2-variations');
  font-weight: 100 900;
}`,
    priority: null
  },
  {
    id: 277,
    category: 'HTML & CSS',
    question: 'What are CSS containment queries (@container)?',
    answer: 'Container queries style elements based on parent container size, not viewport. Enables truly modular, reusable components. Syntax: @container (min-width: 400px) { styles }. Requires container-type on parent (inline-size, size, normal). Component-level responsive design.',
    explanation: '**vs Media Queries:**\n\n• **Media Queries**: Based on viewport size\n• **Container Queries**: Based on parent container size\n• **Benefit**: Components adapt to their container, not screen\n• **Use Case**: Cards in different layout contexts\n• **Setup**: Define container-type on parent element',
    codeExample: `/* Define container */
.card-container {
  container-type: inline-size;
  container-name: card;
}

/* Query container size */
@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}

@container card (max-width: 399px) {
  .card {
    display: flex;
    flex-direction: column;
  }
}`,
    priority: null
  },
  {
    id: 278,
    category: 'HTML & CSS',
    question: 'Explain CSS text-wrap: balance and pretty.',
    answer: 'text-wrap: balance evenly distributes text across lines (better headlines). text-wrap: pretty prevents single words on last line (orphans). Modern CSS properties for typographic improvement. balance for short text (titles), pretty for paragraphs. Replaces JavaScript solutions.',
    explanation: '**Text Wrapping Options:**\n\n• **balance**: Evens out line lengths (great for headings)\n• **pretty**: Prevents widows/orphans in paragraphs\n• **wrap**: Default wrapping behavior\n• **nowrap**: No wrapping at all\n• Improves readability and visual appeal',
    codeExample: `/* Balanced headings */
h1, h2, h3 {
  text-wrap: balance;
}

/* Pretty paragraphs */
p {
  text-wrap: pretty;
}

/* Traditional approach (manual) */
.manual-break {
  /* Would need <br> tags or JS */
}`,
    priority: null
  },
  {
    id: 279,
    category: 'HTML & CSS',
    question: 'What is the CSS accent-color property?',
    answer: 'accent-color sets color for form controls (checkboxes, radio buttons, range sliders, progress bars). Simplifies form styling without custom controls. Inherits from color if not set. Works on native form elements. Limited customization but easy to implement.',
    explanation: '**Styled Form Elements:**\n\n• **Applies to**: checkbox, radio, range, progress\n• **Inheritance**: Defaults to color property\n• **Limitation**: Can\'t fully customize appearance\n• **Browser Support**: Good in modern browsers\n• **Alternative**: Custom form controls for full control',
    codeExample: `/* Global accent color */
:root {
  accent-color: #646cff;
}

/* Specific element */
input[type="checkbox"] {
  accent-color: green;
}

input[type="range"] {
  accent-color: orange;
}

/* Inherit from text color */
.themed-form {
  color: purple;
  /* Form controls will be purple */
}`,
    priority: null
  },
  {
    id: 280,
    category: 'HTML & CSS',
    question: 'How to create fluid typography with clamp()?',
    answer: 'clamp(min, preferred, max) creates responsive font sizes without media queries. Formula: clamp(minSize, calc(baseSize + viewportUnits), maxSize). Example: clamp(1rem, 2.5vw, 2rem). Scales smoothly between breakpoints. Combines with calc() for precise control.',
    explanation: '**Fluid Typography Formula:**\n\n• **min**: Smallest font size (mobile)\n• **preferred**: Scaling value (usually viewport units)\n• **max**: Largest font size (desktop)\n• **Benefits**: Smooth scaling, no breakpoints needed\n• **Advanced**: Use calc() with vw for precise scaling',
    codeExample: `/* Simple fluid typography */
h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
}

p {
  font-size: clamp(1rem, 1.5vw, 1.25rem);
}

/* Advanced with calc */
.fluid-text {
  font-size: clamp(
    1rem,
    calc(1rem + 1.5vw),
    2.5rem
  );
}

/* Fluid spacing */
.section {
  padding: clamp(1rem, 3vw, 4rem);
}`,
    priority: null
  },
  {
    id: 281,
    category: 'HTML & CSS',
    question: 'What is the CSS gap property and where can it be used?',
    answer: 'gap sets spacing between grid/flex items. Replaces margins for layout spacing. Works in Grid (original), Flexbox (modern), Multi-column layouts. Advantages: No margin collapse, easier calculation, consistent spacing. Syntax: gap: row-gap column-gap or gap: both.',
    explanation: '**Gap Property:**\n\n• **Grid**: Original use case, full support\n• **Flexbox**: Added later, now widely supported\n• **Multi-column**: Also works here\n• **Advantages over margin**: No collapse, parent-aligned\n• **Syntax**: gap: 1rem (both), gap: 1rem 2rem (row col)',
    codeExample: `/* Grid gap */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem; /* Same row and column */
  gap: 1rem 2rem; /* Row Column */
}

/* Flexbox gap */
.flex {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Old way (avoid) */
.old-grid > * {
  margin: 0.5rem; /* Causes edge spacing issues */
}`,
    priority: null
  },
  {
    id: 282,
    category: 'HTML & CSS',
    question: 'Explain CSS isolation property.',
    answer: 'isolation: isolate creates new stacking context without needing position/z-index. Prevents blend mode inheritance. Useful for containing mix-blend-mode effects. Cleaner than position: relative + z-index. Part of compositing and blending spec.',
    explanation: '**Isolation Use Cases:**\n\n• **Stacking Context**: Without affecting layout\n• **Blend Mode Containment**: Prevent mixing with backdrop\n• **Component Isolation**: Keep effects contained\n• **Cleaner Code**: No need for position hacks\n• Similar to creating new BFC for blending',
    codeExample: `/* Create stacking context cleanly */
.isolated {
  isolation: isolate;
}

/* Contain blend modes */
.blend-container {
  isolation: isolate;
}

.blend-child {
  mix-blend-mode: multiply;
  /* Won't blend with elements outside container */
}

/* Old way (still valid) */
.old-isolation {
  position: relative;
  z-index: 0;
}`,
    priority: null
  },
  {
    id: 283,
    category: 'HTML & CSS',
    question: 'What are CSS nesting rules and best practices?',
    answer: 'Native CSS nesting allows nested selectors without preprocessors. Syntax: parent { & child { styles } }. Use & for parent reference. Supports @media, @supports inside. Best practices: Limit depth (3 levels max), use for component scoping, combine with BEM. Browser support now excellent.',
    explanation: '**Native CSS Nesting:**\n\n• **& Symbol**: References parent selector\n• **Depth**: Keep nesting shallow (max 3 levels)\n• **Readability**: Don\'t over-nest, maintain clarity\n• **Performance**: Compiles to same CSS as flat selectors\n• **Combines Well**: With CSS custom properties\n• **Supported**: All modern browsers',
    codeExample: `/* Basic nesting */
.card {
  padding: 1rem;
  
  & h2 {
    font-size: 1.5rem;
  }
  
  & .button {
    background: blue;
    
    &:hover {
      background: darkblue;
    }
  }
  
  @media (min-width: 768px) {
    & {
      padding: 2rem;
    }
  }
}

/* Equivalent to */
.card { padding: 1rem; }
.card h2 { font-size: 1.5rem; }
.card .button { background: blue; }
.card .button:hover { background: darkblue; }
@media (min-width: 768px) {
  .card { padding: 2rem; }
}`,
    priority: null
  },

  // ==================== ADVANCED REACT QUESTIONS ====================
  {
    id: 56,
    category: 'React',
    question: 'What is React Suspense and how does it work?',
    answer: 'Suspense lets components wait for something (code, data) before rendering, showing a fallback UI in the meantime.',
    explanation: 'Suspense works with React.lazy() for code splitting: <Suspense fallback={<Spinner />}><LazyComponent /></Suspense>. In React 18+, Suspense also works with data fetching. When a component suspends, React shows the fallback until the promise resolves. Can nest multiple Suspense boundaries for granular loading states. Works seamlessly with Server Components and streaming. Key benefit: Better UX with progressive loading instead of all-or-nothing.',
    priority: null
  },
  {
    id: 57,
    category: 'React',
    question: 'Explain Concurrent Mode and its features.',
    answer: 'Concurrent Mode enables React to work on multiple tasks simultaneously, interrupting low-priority work for high-priority updates.',
    explanation: 'Key features: 1) startTransition - mark non-urgent updates, 2) useTransition - get isPending state for transitions, 3) useDeferredValue - defer re-rendering part of UI, 4) Suspense - handle async operations. Benefits: Keeps UI responsive during heavy updates, better perceived performance, smoother animations. Example: Typing in search (immediate) vs filtering results (deferred). React automatically prioritizes user input over background updates.',
    priority: null
  },
  {
    id: 58,
    category: 'React',
    question: 'How to implement custom hooks effectively?',
    answer: 'Custom hooks extract reusable logic from components. Start with "use" prefix, follow Rules of Hooks, return relevant values/functions.',
    explanation: 'Best practices: 1) Extract logic that\'s used in multiple places, 2) Keep hooks focused (single responsibility), 3) Compose hooks (use other hooks inside), 4) Return array or object based on usage, 5) Document inputs/outputs, 6) Test hooks independently. Examples: useLocalStorage, useFetch, useForm, useDebounce, useMediaQuery. Anti-patterns: Don\'t conditionally call hooks, don\'t create hooks inside loops. Custom hooks make code DRY and testable.',
    priority: null
  },
  {
    id: 59,
    category: 'React',
    question: 'What are Portals in React and when to use them?',
    answer: 'Portals render children into a DOM node outside parent hierarchy. Useful for modals, tooltips, popups that need to escape overflow/z-index issues.',
    explanation: 'ReactDOM.createPortal(child, container). Use cases: Modals/dialogs (escape parent overflow), tooltips/popovers (avoid clipping), notifications (fixed positioning), dropdowns (z-index management). Event bubbling still works through React tree, not DOM tree. Benefits: Proper stacking context, no z-index wars, cleaner component structure. Always clean up portal containers on unmount.',
    priority: null
  },
  {
    id: 60,
    category: 'React',
    question: 'How to handle forms at scale in React?',
    answer: 'Use libraries like React Hook Form or Formik for complex forms. Manage validation, submission, error states efficiently.',
    explanation: 'React Hook Form advantages: 1) Uncontrolled components (better performance), 2) Built-in validation (Yup/Zod), 3) Easy integration with UI libraries, 4) Minimal re-renders, 5) TypeScript support. Best practices: Separate validation schemas, handle async validation, show clear error messages, disable submit during processing, handle edge cases (network errors). For simple forms, controlled components with useState work fine. For complex forms (dynamic fields, conditional validation, multi-step), use dedicated form library.',
    priority: null
  },
  {
    id: 61,
    category: 'React',
    question: 'What is the difference between useMemo and useCallback?',
    answer: 'useMemo caches computed values, useCallback caches function instances. Both prevent unnecessary recalculations/recreations.',
    explanation: 'useMemo: const value = useMemo(() => expensiveCalculation(a, b), [a, b]). Caches the result. useCallback: const fn = useCallback(() => doSomething(a), [a]). Caches the function reference. When to use: useMemo for expensive calculations, useCallback for passing functions as props to memoized children. Common mistake: Overusing both adds overhead. Only memoize when you measure performance benefit. Rule of thumb: Memoize if dependency array changes infrequently and calculation/rendering is expensive.',
    priority: null
  },
  {
    id: 62,
    category: 'React',
    question: 'How to implement infinite scroll efficiently?',
    answer: 'Use IntersectionObserver API to detect when user scrolls near bottom, then load more data. Virtualize rendered items for performance.',
    explanation: 'Implementation: 1) Create ref for sentinel element at list bottom, 2) Use IntersectionObserver to watch sentinel, 3) When visible, fetch next page, 4) Append to existing data, 5) Virtualize with react-window for long lists. Key considerations: Debounce scroll events, show loading indicators, handle errors, implement pull-to-refresh, cache loaded data. Avoid: Loading all data at once, not virtualizing, memory leaks from observers. Modern approach: Use CSS content-visibility for off-screen items.',
    priority: null
  },
  {
    id: 63,
    category: 'React',
    question: 'What are Compound Components pattern?',
    answer: 'Compound components share state implicitly through Context, allowing flexible composition while maintaining encapsulation.',
    explanation: 'Example: <Select><Option value="1">One</Option></Select>. Parent (Select) provides context, children (Option) consume it. Benefits: Flexible API, implicit state sharing, better DX, prevents prop drilling. Implementation: Create Context in parent, provide value, children access via useContext. Real-world examples: Radix UI, Reach UI, Headless UI. Pattern enables powerful, composable APIs while keeping implementation details hidden. Great for building design systems.',
    priority: null
  },
  {
    id: 64,
    category: 'React',
    question: 'How to handle code splitting in React applications?',
    answer: 'Use React.lazy() and Suspense for component-level splitting, dynamic imports for route-based splitting.',
    explanation: 'Route-based: const Dashboard = lazy(() => import(\'./Dashboard\')). Component-based: Lazy load heavy components (charts, editors). Webpack/Vite automatically creates separate chunks. Benefits: Smaller initial bundle, faster load time, better caching. Strategies: Split by routes, split large dependencies, split rarely-used features. Monitor: Bundle analyzer to identify optimization opportunities. Advanced: Prefetch/predictive loading based on user behavior. Always provide meaningful fallbacks with Suspense.',
    priority: null
  },
  {
    id: 65,
    category: 'React',
    question: 'What is the Render Props pattern?',
    answer: 'Render props share code between components using a prop whose value is a function that returns JSX.',
    explanation: 'Example: <Mouse render={mouse => <Cat mouse={mouse} />} />. The Mouse component tracks state, passes it to render function. Before hooks, this was primary way to share logic. Now hooks replaced most use cases, but render props still useful for: Component libraries, backward compatibility, specific composition patterns. Comparison: Hooks are simpler for most cases, render props offer more flexibility in composition. Know both patterns for legacy code and library development.',
    priority: null
  },

  // ==================== ADVANCED NEXT.JS QUESTIONS ====================
  {
    id: 66,
    category: 'Next.js',
    question: 'What is Edge Runtime in Next.js?',
    answer: 'Edge Runtime runs code on CDN edge locations closer to users, providing ultra-low latency for middleware and API routes.',
    explanation: 'Benefits: 1) Faster response times (runs globally), 2) Lower costs than serverless, 3) Automatic scaling, 4) Perfect for auth checks, redirects, A/B testing. Limitations: No Node.js APIs (fs, path), limited npm packages, smaller execution time. Use for: Middleware, lightweight API routes, geolocation, personalization. Configure: export const runtime = \'edge\'. Not suitable for: Database queries, file operations, heavy computations. Ideal for request/response manipulation.',
    priority: null
  },
  {
    id: 67,
    category: 'Next.js',
    question: 'How does Next.js handle data fetching in App Router?',
    answer: 'App Router uses fetch with automatic caching, generateMetadata for SEO, and Server Components for direct data access.',
    explanation: 'Server Components: Async components can fetch directly: async function Page() { const data = await fetch(...) }. Caching: fetch caches by default (can opt-out with cache: \'no-store\'). Revalidation: time-based (next: { revalidate: 60 }) or on-demand (revalidatePath). Client Components: Use SWR, React Query, or useEffect. Parallel data fetching: Promise.all for independent requests. Streaming: Suspense boundaries for progressive loading. Benefits: Simpler code, better performance, automatic optimizations.',
    priority: null
  },
  {
    id: 68,
    category: 'Next.js',
    question: 'What are Parallel Routes and Intercepting Routes?',
    answer: 'Parallel Routes render multiple pages simultaneously (@folder syntax). Intercepting Routes intercept navigation to show modal instead of full page.',
    explanation: 'Parallel Routes: @team and @analytics folders render simultaneously in same layout. Use for: Dashboards, multi-panel layouts. Intercepting Routes: (...)folder intercepts navigation. Example: Click photo opens modal (intercepted), direct URL shows full page. Use for: Modals, overlays, contextual views. Combined: Create complex routing patterns like Instagram (feed + modal). Benefits: Better UX, preserved context, smooth transitions. Advanced feature for sophisticated apps.',
    priority: null
  },
  {
    id: 69,
    category: 'Next.js',
    question: 'How to optimize Core Web Vitals in Next.js?',
    answer: 'Use Image component, font optimization, script strategies, dynamic imports, proper caching, and monitor with Vercel Analytics.',
    explanation: 'LCP (Largest Contentful Paint): Optimize images, preload critical resources, use priority prop. FID (First Input Delay): Minimize JavaScript, code split, use web workers. CLS (Cumulative Layout Shift): Set image dimensions, reserve space for ads/embeds, avoid dynamic content above fold. Tools: next/font (zero layout shift), next/script (loading strategies), Lighthouse CI, Web Vitals package. Monitor: Real User Monitoring (RUM), track trends, set budgets. Continuous optimization process.',
    priority: null
  },
  {
    id: 70,
    category: 'Next.js',
    question: 'What is Turbopack and how does it improve development?',
    answer: 'Turbopack is Rust-based bundler (successor to Webpack) offering 10x faster HMR and startup times in Next.js.',
    explanation: 'Benefits: 1) Incremental computation (only recompute changed files), 2) Persistent caching across sessions, 3) Parallel processing, 4) Written in Rust for performance. Enable: npx next dev --turbo. Improvements: Sub-second startup, instant HMR, better memory usage. Production: Still uses Turbopack in development, webpack/turbopack for production builds. Future: Will replace webpack entirely. Already stable for most projects. Significant DX improvement for large codebases.',
    priority: null
  },

  // ==================== ADVANCED TYPESCRIPT QUESTIONS ====================
  {
    id: 71,
    category: 'TypeScript',
    question: 'What are Discriminated Unions?',
    answer: 'Discriminated unions use a common literal type property to differentiate between types, enabling exhaustive type checking.',
    explanation: 'Example: type Shape = { kind: \'circle\'; radius: number } | { kind: \'square\'; side: number }. Switch on kind property, TypeScript narrows type automatically. Benefits: Type-safe pattern matching, exhaustive checking (compile error if case missing), self-documenting. Use for: State machines, API responses, action creators, variant components. Pattern: Common discriminant property + union type + switch statement. Prevents runtime errors by catching mismatches at compile time.',
    priority: null
  },
  {
    id: 72,
    category: 'TypeScript',
    question: 'How to create advanced mapped types?',
    answer: 'Mapped types transform existing types by iterating over keys. Use keyof, in operator, and conditional types for powerful transformations.',
    explanation: 'Basic: type Readonly<T> = { readonly [P in keyof T]: T[P] }. Advanced: Add modifiers (+/-), filter keys (as), conditional mapping. Examples: Partial, Required, Pick, Omit are all mapped types. Use cases: API response transformation, form field mapping, event handler typing. Combine with template literal types for string manipulation. Powerful for creating DRY, maintainable type definitions. Master these for complex type gymnastics.',
    priority: null
  },
  {
    id: 73,
    category: 'TypeScript',
    question: 'What are Template Literal Types?',
    answer: 'Template literal types enable string manipulation at type level, creating precise string unions from patterns.',
    explanation: 'Example: type EventName = `on${Capitalize<string>}` matches \'onClick\', \'onSubmit\', etc. Use with infer for extraction: type GetFirst<T extends `${infer First}.${string}`> = First. Applications: CSS class names, event handlers, route paths, API endpoints. Combine with key remapping for powerful type transformations. Enables type-safe string operations previously impossible. Essential for modern TypeScript libraries.',
    priority: null
  },
  {
    id: 74,
    category: 'TypeScript',
    question: 'How to handle type narrowing effectively?',
    answer: 'Type narrowing refines types using type guards, typeof, instanceof, in operator, and custom predicates.',
    explanation: 'Built-in guards: typeof x === \'string\', x instanceof Date, \'prop\' in x. Custom guards: function isFish(pet: Fish | Bird): pet is Fish. Assertion functions: function assertIsString(val: any): asserts val is string. Switch statements narrow discriminated unions. Optional chaining (?.) handles undefined/null. Non-null assertion (!) use sparingly. Goal: Help TypeScript understand runtime types for safer code without type casting.',
    priority: null
  },
  {
    id: 75,
    category: 'TypeScript',
    question: 'What is Declaration Merging?',
    answer: 'Declaration merging combines multiple declarations with same name into single definition. Works with interfaces, namespaces, enums.',
    explanation: 'Interfaces merge automatically: interface Box { width: number } + interface Box { height: number } = Box with both properties. Use for: Extending third-party types, augmenting global types, plugin architectures. Limitations: Doesn\'t work with type aliases, classes. Namespaces also merge. Practical use: Extend Window interface for custom properties, add methods to existing interfaces. Powerful for library authors and extending built-in types safely.',
    priority: null
  },

  // ==================== ADVANCED JAVASCRIPT QUESTIONS ====================
  {
    id: 76,
    category: 'JavaScript',
    question: 'Explain Prototypal Inheritance in JavaScript.',
    answer: 'JavaScript uses prototype chain for inheritance. Objects inherit from other objects via __proto__ link, not classical classes.',
    explanation: 'Every object has internal [[Prototype]] link (accessible via __proto__ or Object.getPrototypeOf). Property lookup traverses prototype chain until found or reaches null. Constructor functions have .prototype property. ES6 classes are syntactic sugar over prototypes. Methods: Object.create(), Object.setPrototypeOf(), class extends. Understanding prototypes crucial for: Debugging, performance (method sharing), understanding JavaScript fundamentals. Modern code uses classes, but prototypes power everything underneath.',
    priority: null
  },
  {
    id: 77,
    category: 'JavaScript',
    question: 'What are Generators and how do they work?',
    answer: 'Generators are functions that can pause execution and resume later, yielding multiple values over time.',
    explanation: 'Syntax: function* gen() { yield value }. Returns iterator with next() method. Use cases: 1) Infinite sequences, 2) Lazy evaluation, 3) Async flow control (before async/await), 4) State machines. Example: function* fibonacci() { let a = 0, b = 1; while(true) { yield a; [a, b] = [b, a+b] } }. Modern use: Redux-Saga for side effects, custom iterators. Less common now with async/await, but powerful for specific scenarios.',
    priority: null
  },
  {
    id: 78,
    category: 'JavaScript',
    question: 'How does garbage collection work in JavaScript?',
    answer: 'V8 engine uses Mark-and-Sweep algorithm to reclaim memory from unreachable objects automatically.',
    explanation: 'Process: 1) Mark phase - identify reachable objects from roots (global, stack), 2) Sweep phase - collect unmarked objects. Optimizations: Generational collection (young/old generation), incremental marking, concurrent collection. Memory leaks occur when: Forgotten timers, closures holding references, detached DOM nodes, global variables. Prevention: Remove event listeners, clear intervals, nullify unused references, use WeakMap/WeakSet. Monitor: Chrome DevTools Memory tab, heap snapshots.',
    priority: null
  },
  {
    id: 79,
    category: 'JavaScript',
    question: 'What is the Temporal Dead Zone (TDZ)?',
    answer: 'TDZ is the period between entering scope and variable declaration where let/const variables cannot be accessed.',
    explanation: 'Example: console.log(x); // ReferenceError, let x = 5. Variables are hoisted but not initialized. Accessing before declaration throws ReferenceError. Differs from var (initialized with undefined). Purpose: Catch bugs from using variables before initialization. Best practice: Declare variables at top of scope, use before accessing. TDZ exists for each iteration in loops with let. Understanding TDZ helps debug temporal errors and write safer code.',
    priority: null
  },
  {
    id: 80,
    category: 'JavaScript',
    question: 'Explain Microtasks and Macrotasks.',
    answer: 'Microtasks (Promises, queueMicrotask) execute before macrotasks (setTimeout, setInterval, I/O) in event loop.',
    explanation: 'Event loop order: 1) Execute synchronous code, 2) Process all microtasks, 3) Render (if needed), 4) Execute one macrotask, repeat. Microtasks: Promise.then/catch/finally, queueMicrotask, MutationObserver. Macrotasks: setTimeout, setInterval, setImmediate, I/O, UI rendering. Important: Microtasks can starve macrotasks if queue never empties. Use case: Ensure code runs after current operation but before next render. Critical for understanding async behavior.',
    priority: null
  },

  // ==================== ADVANCED TESTING QUESTIONS ====================
  {
    id: 81,
    category: 'Testing (Jest & RTL)',
    question: 'What is Mock Service Worker (MSW) and why use it?',
    answer: 'MSW intercepts network requests at service worker layer, enabling realistic API mocking for tests and development.',
    explanation: 'Benefits over jest.mock: 1) Tests actual fetch/XMLHttpRequest calls, 2) Works in browser and Node, 3) Realistic error scenarios, 4) Share mocks between dev and test. Setup: Define handlers, start server in tests. Example: rest.get(\'/api/users\', (req, res, ctx) => res(ctx.json(users))). Use for: Integration tests, E2E tests, development prototyping. More realistic than mocking modules. Industry standard for API mocking.',
    priority: null
  },
  {
    id: 82,
    category: 'Testing (Jest & RTL)',
    question: 'How to test accessibility in React applications?',
    answer: 'Use jest-axe for automated accessibility testing, RTL queries by role, and manual testing with screen readers.',
    explanation: 'Tools: 1) jest-axe (automated WCAG checks), 2) RTL getByRole queries (enforces accessible markup), 3) eslint-plugin-jsx-a11y (linting), 4) Lighthouse audits, 5) Manual keyboard navigation. Test: Color contrast, focus management, ARIA attributes, semantic HTML, keyboard traps. Integrate in CI: Fail builds on accessibility violations. Best practice: Build accessibility in from start, not retrofit. Test with actual assistive technologies.',
    priority: null
  },
  {
    id: 83,
    category: 'Testing (Jest & RTL)',
    question: 'What is Visual Regression Testing?',
    answer: 'Visual regression testing compares screenshots to detect unintended UI changes pixel-by-pixel.',
    explanation: 'Tools: Percy, Chromatic, Applitools, Storybook + addon-visual-regression. Process: 1) Capture baseline screenshots, 2) Run tests, 3) Compare pixel differences, 4) Review changes manually. Use for: Design systems, preventing visual bugs, CSS refactoring. Challenges: False positives from animations, fonts, anti-aliasing. Solutions: Ignore dynamic content, use thresholds, snapshot specific states. Combine with unit/integration tests for comprehensive coverage.',
    priority: null
  },
  {
    id: 84,
    category: 'Testing (Jest & RTL)',
    question: 'How to test performance in React applications?',
    answer: 'Use React Profiler, jest performance APIs, Lighthouse CI, and custom metrics to catch performance regressions.',
    explanation: 'Strategies: 1) React.profiler callback to measure render times, 2) Performance API in browsers (performance.mark), 3) Lighthouse CI in pipeline, 4) Web Vitals library for real users, 5) Bundle size tracking (size-limit). Test: Initial load, interactions, memory leaks, re-renders. Set budgets: Max bundle size, max render time, max TTI. Automate: Fail CI on regression. Monitor: Real User Monitoring (RUM) in production. Proactive performance testing prevents degradation.',
    priority: null
  },
  {
    id: 85,
    category: 'Testing (Jest & RTL)',
    question: 'What are E2E testing tools and when to use them?',
    answer: 'Cypress, Playwright, Puppeteer for end-to-end testing. Test complete user flows across multiple pages.',
    explanation: 'Cypress: Developer-friendly, great DX, time travel debugging. Playwright: Cross-browser (Chrome, Firefox, Safari), parallel execution, auto-waiting. Puppeteer: Chrome-focused, lighter weight. Use for: Critical user journeys, authentication flows, payment processes, form submissions. Pyramid: Few E2E tests (slow, brittle), many integration tests. Best practices: Test happy path + critical errors, mock external services, keep tests independent, run in CI. Balance speed vs coverage.',
    priority: null
  },

  // ==================== ADVANCED SYSTEM DESIGN QUESTIONS ====================
  {
    id: 86,
    category: 'System Design',
    question: 'How would you design a real-time collaborative editor?',
    answer: 'Use Operational Transformation (OT) or CRDTs for conflict resolution, WebSockets for real-time sync, optimistic updates for UX.',
    explanation: 'Architecture: 1) WebSocket connection for bidirectional communication, 2) OT/CRDT algorithm for merging concurrent edits, 3) Operational history for undo/redo, 4) Presence system for showing active users, 5) Conflict resolution strategy. Technologies: Socket.io, Yjs (CRDT library), Redis for pub/sub. Challenges: Network latency, offline support, conflict resolution, scalability. Solutions: Optimistic UI, operational buffering, eventual consistency. Study: Google Docs, Figma architecture.',
    priority: null
  },
  {
    id: 87,
    category: 'System Design',
    question: 'How to design a scalable micro-frontend architecture?',
    answer: 'Split monolith into independent deployable units using Module Federation, iframe, or web components with shared dependencies.',
    explanation: 'Approaches: 1) Webpack Module Federation (share dependencies, runtime integration), 2) iframes (complete isolation, communication via postMessage), 3) Web Components (standard, framework-agnostic), 4) Single SPA (orchestration framework). Considerations: Shared state management, consistent styling, routing coordination, version compatibility, deployment independence. Benefits: Team autonomy, independent deployments, technology diversity. Challenges: Complexity, shared dependencies, UX consistency. Use for: Large organizations, multiple teams, gradual migration.',
    priority: null
  },
  {
    id: 88,
    category: 'System Design',
    question: 'How to implement offline-first applications?',
    answer: 'Use Service Workers for caching, IndexedDB for storage, background sync for queued operations, and conflict resolution strategies.',
    explanation: 'Stack: 1) Service Worker (cache assets, intercept requests), 2) IndexedDB (store data locally), 3) Background Sync API (queue actions), 4) Cache API (HTTP responses). Strategy: Cache-first for static assets, network-first for fresh data, stale-while-revalidate for balance. Handle conflicts: Last-write-wins, manual merge, operational transformation. Libraries: Workbox (service workers), localForage (storage), PWA Builder. Test: Offline scenarios, reconnection, data sync. UX: Show offline status, queue indicators.',
    priority: null
  },
  {
    id: 89,
    category: 'System Design',
    question: 'How to design for internationalization (i18n)?',
    answer: 'Use i18n libraries (react-i18next), RTL support, locale-aware formatting, dynamic imports for translations, and cultural considerations.',
    explanation: 'Implementation: 1) Translation files per locale (JSON), 2) i18n library for switching languages, 3) Pluralization rules, 4) Date/number/currency formatting (Intl API), 5) RTL layout support (CSS logical properties), 6) Dynamic imports for translation chunks. Challenges: Text expansion/contraction, cultural sensitivity, legal requirements, right-to-left languages. Best practices: Externalize all strings, use ICU format for plurals, test with pseudo-localization, consider timezone differences. Accessibility: Screen reader language announcement.',
    priority: null
  },
  {
    id: 90,
    category: 'System Design',
    question: 'How to implement feature flags safely?',
    answer: 'Use feature flag services (LaunchDarkly, Flagsmith) with client-side SDK, gradual rollouts, and kill switches for emergency disable.',
    explanation: 'Architecture: 1) Flag configuration service, 2) Client SDK for evaluation, 3) Targeting rules (user segments, percentages), 4) Analytics for impact measurement. Strategies: Percentage rollouts, user targeting, A/B testing, canary releases. Safety: Kill switch for immediate disable, audit logs, flag expiration dates. Code organization: Abstract flag checks, avoid nested conditions, cleanup old flags. Monitoring: Track flag usage, performance impact, error rates. Lifecycle: Create → Test → Rollout → Monitor → Cleanup.',
    priority: null
  },

  // ==================== MORE HTML & CSS QUESTIONS ====================
  {
    id: 91,
    category: 'HTML & CSS',
    question: 'What is Container Queries and how do they differ from Media Queries?',
    answer: 'Container queries style elements based on parent container size, not viewport. Enables truly modular, reusable components.',
    explanation: 'Syntax: @container (min-width: 400px) { .card { ... } }. Difference: Media queries respond to viewport, container queries respond to parent. Benefits: Component-level responsiveness, no breakpoint coordination, better reusability. Use cases: Cards that adapt to available space, sidebar widgets, embedded components. Browser support: Modern browsers (2022+). Fallback: Feature queries @supports or traditional media queries. Game-changer for component-driven development.',
    priority: null
  },
  {
    id: 92,
    category: 'HTML & CSS',
    question: 'Explain CSS Subgrid.',
    answer: 'Subgrid allows grid children to inherit and participate in parent grid tracks, enabling aligned nested grids.',
    explanation: 'Problem: Nested grids can\'t align with parent grid lines. Solution: grid-template-columns: subgrid. Child inherits parent\'s track definition. Use cases: Card layouts with aligned footers, complex magazine layouts, consistent spacing across nested structures. Benefits: True grid nesting, maintains alignment, reduces wrapper elements. Browser support: Good in modern browsers. Alternative without subgrid: Complex calc() or JavaScript. Subgrid simplifies previously impossible layouts.',
    priority: null
  },
  {
    id: 93,
    category: 'HTML & CSS',
    question: 'What are CSS Layers (@layer) and cascade layers?',
    answer: '@layer creates explicit cascade layers, giving developers control over specificity without !important.',
    explanation: 'Syntax: @layer reset, base, components, utilities. Later layers override earlier regardless of specificity. Solves: Specificity wars, !important abuse, CSS architecture. Order matters: Utilities > Components > Base > Reset. Within layer, normal cascade rules apply. Benefits: Predictable styles, easier maintenance, team collaboration. Use with design systems, CSS frameworks, large codebases. Modern alternative to BEM/Sass nesting for managing specificity.',
    priority: null
  },
  {
    id: 94,
    category: 'HTML & CSS',
    question: 'How to optimize CSS for performance?',
    answer: 'Minimize selectors, avoid expensive properties, use will-change sparingly, reduce layout thrashing, and leverage GPU acceleration.',
    explanation: 'Optimization techniques: 1) Flatten selectors (avoid deep nesting), 2) Use class selectors over attribute/type, 3) Avoid universal selector (*), 4) Minimize repaints (transform/opacity are cheap), 5) Batch DOM reads/writes, 6) Use contain property for isolated sections, 7) Lazy load non-critical CSS, 8) Critical CSS inline, 9) Code splitting by route. Tools: CSSNano, PurgeCSS, Critters. Measure: DevTools Performance panel, Lighthouse. Focus on rendering performance, not just file size.',
    priority: null
  },
  {
    id: 95,
    category: 'HTML & CSS',
    question: 'What is the :has() selector and its use cases?',
    answer: ':has() is a parent selector that matches elements containing specific children, enabling previously impossible CSS patterns.',
    explanation: 'Example: ul:has(> li.active) { border: 2px solid blue }. Selects <ul> if it has active <li>. Use cases: Style parent based on child state, card hover effects, form validation styling, conditional layouts. Previously required JavaScript. Browser support: Modern browsers (2022+). Power: Enables component-level state management in pure CSS. Combine with :not(), :is() for complex conditions. Game-changer for interactive UIs without JavaScript.',
    priority: null
  },

  // ==================== FRONTEND SYSTEM DESIGN QUESTIONS ====================
  {
    id: 96,
    category: 'Frontend System Design',
    question: 'Design an Autocomplete Search',
    answer: 'Implement a search input that fetches suggestions as the user types. Key features: Debounce API calls, cache results, keyboard navigation, and accessibility (ARIA).',
    explanation: '**Key Components:**\n\n• **Debounce**: Wait for user to stop typing before fetching.\n• **Caching**: Store previous results to avoid redundant API calls.\n• **Keyboard Nav**: Allow users to select items using arrow keys.\n• **Accessibility**: Use `aria-activedescendant` and `role="listbox"`.',
    codeExample: `import { useState, useEffect, useRef } from 'react';\n\nfunction Autocomplete({ fetchSuggestions }) {\n  const [query, setQuery] = useState('');\n  const [suggestions, setSuggestions] = useState([]);\n  const [highlightedIndex, setHighlightedIndex] = useState(-1);\n  const debounceRef = useRef(null);\n\n  useEffect(() => {\n    if (debounceRef.current) clearTimeout(debounceRef.current);\n    \n    debounceRef.current = setTimeout(async () => {\n      if (query.length > 2) {\n        const results = await fetchSuggestions(query);\n        setSuggestions(results);\n      }\n    }, 300);\n\n    return () => clearTimeout(debounceRef.current);\n  }, [query]);\n\n  return (\n    <div role="combobox">\n      <input \n        value={query} \n        onChange={(e) => setQuery(e.target.value)}\n        aria-controls="suggestions-list"\n      />\n      <ul id="suggestions-list" role="listbox">\n        {suggestions.map((item, index) => (\n          <li key={item.id} role="option" aria-selected={index === highlightedIndex}>\n            {item.name}\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}`,
    priority: null
  },
  {
    id: 97,
    category: 'Frontend System Design',
    question: 'Design a Data Table with Sorting/Filtering',
    answer: 'Create a table component that supports client-side or server-side sorting and filtering. Features: Pagination, column resizing, and row selection.',
    explanation: '**Architecture:**\n\n• **State Management**: Track sort column, direction, and filter values.\n• **Performance**: Virtualize rows if the dataset is large.\n• **Flexibility**: Allow custom cell renderers for different data types.\n• **Server-side**: Send query params to backend for large datasets.',
    codeExample: `function DataTable({ data, columns }) {\n  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });\n  const [filteredData, setFilteredData] = useState(data);\n\n  const handleSort = (key) => {\n    let direction = 'asc';\n    if (sortConfig.key === key && sortConfig.direction === 'asc') {\n      direction = 'desc';\n    }\n    \n    const sorted = [...filteredData].sort((a, b) => {\n      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;\n      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;\n      return 0;\n    });\n    \n    setFilteredData(sorted);\n    setSortConfig({ key, direction });\n  };\n\n  return (\n    <table>\n      <thead>\n        <tr>\n          {columns.map(col => (\n            <th key={col.key} onClick={() => handleSort(col.key)}>\n              {col.label} {sortConfig.key === col.key ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}\n            </th>\n          ))}\n        </tr>\n      </thead>\n      <tbody>\n        {filteredData.map(row => (\n          <tr key={row.id}>\n            {columns.map(col => <td key={col.key}>{row[col.key]}</td>)}\n          </tr>\n        ))}\n      </tbody>\n    </table>\n  );\n}`,
    priority: null
  },
  {
    id: 98,
    category: 'Frontend System Design',
    question: 'Design a Dashboard with Real-time Updates',
    answer: 'Build a dashboard that displays live data using WebSockets or Server-Sent Events (SSE). Focus on efficient re-rendering and connection management.',
    explanation: '**Real-time Strategy:**\n\n• **WebSockets**: Bi-directional communication for interactive dashboards.\n• **SSE**: One-way communication for simple data feeds.\n• **Optimistic UI**: Update the UI immediately while waiting for server confirmation.\n• **Reconnection**: Implement exponential backoff for dropped connections.',
    codeExample: `import { useEffect, useState } from 'react';\n\nfunction LiveDashboard() {\n  const [metrics, setMetrics] = useState({});\n\n  useEffect(() => {\n    const ws = new WebSocket('wss://api.example.com/metrics');\n    \n    ws.onmessage = (event) => {\n      const data = JSON.parse(event.data);\n      setMetrics(prev => ({ ...prev, [data.id]: data.value }));\n    };\n\n    ws.onclose = () => {\n      // Implement reconnection logic here\n      setTimeout(() => window.location.reload(), 5000);\n    };\n\n    return () => ws.close();\n  }, []);\n\n  return (\n    <div className="dashboard-grid">\n      {Object.entries(metrics).map(([id, value]) => (\n        <MetricCard key={id} id={id} value={value} />\n      ))}\n    </div>\n  );\n}`,
    priority: null
  },
  {
    id: 99,
    category: 'Frontend System Design',
    question: 'Design an E-commerce Product Listing Page',
    answer: 'Design a high-performance product listing page with infinite scroll, lazy-loaded images, and complex filtering. Prioritize Core Web Vitals.',
    explanation: '**Key Considerations:**\n\n• **Infinite Scroll**: Use IntersectionObserver to load more products.\n• **Image Optimization**: Use responsive images and lazy loading.\n• **URL State**: Sync filters and pagination with URL query params for shareability.\n• **Skeleton Screens**: Show placeholders while content loads.',
    codeExample: `function ProductListing() {\n  const [products, setProducts] = useState([]);\n  const [page, setPage] = useState(1);\n  const observerTarget = useRef(null);\n\n  useEffect(() => {\n    const observer = new IntersectionObserver(\n      entries => {\n        if (entries[0].isIntersecting) {\n          setPage(prev => prev + 1);\n        }\n      },\n      { threshold: 1.0 }\n    );\n\n    if (observerTarget.current) observer.observe(observerTarget.current);\n    return () => observer.disconnect();\n  }, []);\n\n  useEffect(() => {\n    fetchProducts(page).then(newProducts => {\n      setProducts(prev => [...prev, ...newProducts]);\n    });\n  }, [page]);\n\n  return (\n    <div>\n      {products.map(product => (\n        <ProductCard key={product.id} {...product} />\n      ))}\n      <div ref={observerTarget}>Loading more...</div>\n    </div>\n  );\n}`,
    priority: null
  },
  {
    id: 100,
    category: 'Frontend System Design',
    question: 'Design a Notification System',
    answer: 'Create a global notification system (toasts) that can be triggered from anywhere in the app. Support multiple types (success, error, info) and auto-dismissal.',
    explanation: '**Implementation Pattern:**\n\n• **Context API**: Provide a `useNotification` hook globally.\n• **Portal**: Render notifications at the root level to avoid z-index issues.\n• **Queueing**: Handle multiple notifications arriving simultaneously.\n• **Transitions**: Use CSS animations for smooth entry/exit.',
    codeExample: `const NotificationContext = createContext();\n\nexport function NotificationProvider({ children }) {\n  const [notifications, setNotifications] = useState([]);\n\n  const addNotification = (message, type = 'info') => {\n    const id = Date.now();\n    setNotifications(prev => [...prev, { id, message, type }]);\n    setTimeout(() => removeNotification(id), 3000);\n  };\n\n  const removeNotification = (id) => {\n    setNotifications(prev => prev.filter(n => n.id !== id));\n  };\n\n  return (\n    <NotificationContext.Provider value={{ addNotification }}>\n      {children}\n      <div className="notification-container">\n        {notifications.map(n => (\n          <Toast key={n.id} {...n} onClose={() => removeNotification(n.id)} />\n        ))}\n      </div>\n    </NotificationContext.Provider>\n  );\n}`,
    priority: null
  },
  {
    id: 101,
    category: 'Frontend System Design',
    question: 'Design a File Upload System',
    answer: 'Build a robust file upload feature supporting drag-and-drop, progress tracking, chunked uploads for large files, and image previews.',
    explanation: '**Upload Architecture:**\n\n• **Chunking**: Split large files into smaller pieces for reliability.\n• **Progress**: Use the `XMLHttpRequest` upload event or Axios `onUploadProgress`.\n• **Validation**: Check file type and size on the client before sending.\n• **Previews**: Use `URL.createObjectURL()` for instant image feedback.',
    codeExample: `function FileUploader({ onUpload }) {\n  const [progress, setProgress] = useState(0);\n\n  const handleUpload = async (file) => {\n    const formData = new FormData();\n    formData.append('file', file);\n\n    await axios.post('/api/upload', formData, {\n      headers: { 'Content-Type': 'multipart/form-data' },\n      onUploadProgress: (progressEvent) => {\n        const percentCompleted = Math.round(\n          (progressEvent.loaded * 100) / progressEvent.total\n        );\n        setProgress(percentCompleted);\n      }\n    });\n  };\n\n  return (\n    <div>\n      <input type="file" onChange={(e) => handleUpload(e.target.files[0])} />\n      <progress value={progress} max="100" />\n    </div>\n  );\n}`,
    priority: null
  },
  {
    id: 102,
    category: 'Frontend System Design',
    question: 'Design a Role-Based Access Control UI using OKTA/OAuth',
    answer: 'Implement a UI that adapts based on user roles fetched from an identity provider like Okta. Protect routes and hide unauthorized UI elements.',
    explanation: '**RBAC Implementation:**\n\n• **Identity Provider**: Use Okta/Auth0 SDKs to manage sessions.\n• **Role Extraction**: Parse roles from the JWT access token.\n• **Guard Components**: Create `<RequireRole>` wrappers for protected pages.\n• **Conditional Rendering**: Hide buttons/links if the user lacks permissions.',
    codeExample: `import { useAuth0 } from '@auth0/auth0-react';\n\nfunction RequireRole({ children, requiredRole }) {\n  const { user, isLoading } = useAuth0();\n\n  if (isLoading) return <Spinner />;\n  if (!user || !user.roles.includes(requiredRole)) {\n    return <Navigate to="/unauthorized" />;\n  }\n\n  return children;\n}\n\n// Usage\n<Route path="/admin" element={\n  <RequireRole requiredRole="admin">\n    <AdminDashboard />\n  </RequireRole>\n} />`,
    priority: null
  },

  // ==================== PERFORMANCE QUESTIONS ====================
  {
    id: 103,
    category: 'Performance',
    question: 'How would you optimize a slow React app?',
    answer: 'Start by measuring with React DevTools Profiler and Lighthouse. Common fixes: Memoization, code splitting, virtualizing lists, optimizing images, and reducing bundle size.',
    explanation: '**Optimization Workflow:**\n\n1. **Measure**: Identify bottlenecks using the Profiler.\n2. **Analyze**: Check for unnecessary re-renders or large bundles.\n3. **Fix**: Apply targeted optimizations (memo, lazy, etc.).\n4. **Verify**: Re-measure to ensure the change had a positive impact.',
    codeExample: `// 1. Identify wasted renders\nimport { Profiler } from 'react';\n\nfunction onRenderCallback(id, phase, actualDuration) {\n  console.log(\`\${id} took \${actualDuration}ms\`);\n}\n\n<Profiler id="App" onRender={onRenderCallback}>\n  <App />\n</Profiler>\n\n// 2. Fix with memoization\nconst ExpensiveComponent = React.memo(({ data }) => {\n  return <div>{data.map(item => <Item key={item.id} {...item} />)}</div>;\n});`,
    priority: null
  },
  {
    id: 104,
    category: 'Performance',
    question: 'Virtualization vs Pagination',
    answer: 'Virtualization renders only visible items (great for UX), while Pagination loads data in chunks (better for server load). Choose based on dataset size and network constraints.',
    explanation: '**Comparison:**\n\n• **Virtualization**: Keeps DOM light by recycling nodes. Best for smooth scrolling through thousands of items.\n• **Pagination**: Reduces initial payload. Best when users need to jump to specific pages or share links to specific data.',
    codeExample: `// Virtualization with react-window\nimport { FixedSizeList } from 'react-window';\n\nconst Row = ({ index, style }) => (\n  <div style={style}>Row {index}</div>\n);\n\n<VirtualizedList height={600} itemCount={10000} itemSize={35}>\n  {Row}\n</VirtualizedList>\n\n// Pagination\nconst PaginatedList = ({ items, page, setPage }) => (\n  <div>\n    {items.slice((page - 1) * 10, page * 10).map(item => <Item {...item} />)}\n    <button onClick={() => setPage(p => p + 1)}>Next</button>\n  </div>\n);`,
    priority: null
  },
  {
    id: 105,
    category: 'Performance',
    question: 'React.memo vs useMemo vs useCallback',
    answer: 'React.memo prevents component re-renders. useMemo caches values. useCallback caches functions. All three help avoid expensive recalculations or unnecessary child updates.',
    explanation: '**When to use what:**\n\n• **React.memo**: When a component renders often with the same props.\n• **useMemo**: When a calculation is heavy (sorting, filtering).\n• **useCallback**: When passing a function to a child wrapped in React.memo.',
    codeExample: `const Child = React.memo(({ onClick, data }) => {\n  const processed = useMemo(() => heavyCalc(data), [data]);\n  return <button onClick={onClick}>{processed}</button>;\n});\n\nfunction Parent() {\n  const handleClick = useCallback(() => {\n    console.log('clicked');\n  }, []);\n\n  return <Child onClick={handleClick} data={largeDataset} />;\n}`,
    priority: null
  },
  {
    id: 106,
    category: 'Performance',
    question: 'Code Splitting',
    answer: 'Break your bundle into smaller chunks loaded on demand. In React, use `React.lazy()` and `Suspense` to split by route or component.',
    explanation: '**Benefits:**\n\n• **Faster Initial Load**: Users only download what they need for the current page.\n• **Better Caching**: Small changes don\'t invalidate the entire bundle.\n• **Parallel Loading**: Browsers can download multiple small chunks simultaneously.',
    codeExample: `import { lazy, Suspense } from 'react';\n\nconst Dashboard = lazy(() => import('./Dashboard'));\nconst Settings = lazy(() => import('./Settings'));\n\nfunction App() {\n  return (\n    <Router>\n      <Suspense fallback={<LoadingSpinner />}>\n        <Routes>\n          <Route path="/dashboard" element={<Dashboard />} />\n          <Route path="/settings" element={<Settings />} />\n        </Routes>\n      </Suspense>\n    </Router>\n  );\n}`,
    priority: null
  },
  {
    id: 107,
    category: 'Performance',
    question: 'Lazy Loading',
    answer: 'Defer the loading of non-critical resources (images, components) until they are needed. This reduces the initial payload and speeds up the Time to Interactive (TTI).',
    explanation: '**Lazy Loading Strategies:**\n\n• **Images**: Use `loading="lazy"` attribute.\n• **Components**: Use `React.lazy()`.\n• **Libraries**: Use dynamic `import()` for heavy libraries like charting tools.',
    codeExample: `// Lazy Image\n<img src="hero.jpg" loading="lazy" alt="Hero" />\n\n// Lazy Library\nfunction ChartSection() {\n  const [Chart, setChart] = useState(null);\n\n  useEffect(() => {\n    import('heavy-charting-lib').then(mod => setChart(mod.Chart));\n  }, []);\n\n  if (!Chart) return <div>Loading Chart...</div>;\n  return <Chart data={data} />;\n}`,
    priority: null
  },
  {
    id: 108,
    category: 'Performance',
    question: 'Bundle Optimization',
    answer: 'Reduce the size of your JavaScript bundle using techniques like tree shaking, minification, compression (Gzip/Brotli), and analyzing dependencies.',
    explanation: '**Optimization Tools:**\n\n• **Webpack Bundle Analyzer**: Visualizes where your bundle size is going.\n• **Terser**: Minifies JS by removing whitespace and shortening variable names.\n• **Compression**: Enable Gzip or Brotli on your server/CDN.',
    codeExample: `// webpack.config.js\nconst BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;\n\nmodule.exports = {\n  plugins: [\n    new BundleAnalyzerPlugin()\n  ],\n  optimization: {\n    splitChunks: {\n      chunks: 'all'\n    }\n  }\n};`,
    priority: null
  },
  {
    id: 109,
    category: 'Performance',
    question: 'Tree Shaking',
    answer: 'A webpack/Vite feature that eliminates dead code (unused exports) from your final bundle. Requires ES6 modules (import/export) to work effectively.',
    explanation: '**How it works:**\n\n• **Static Analysis**: The bundler looks at your imports and removes any exports that aren\'t used.\n• **Side Effects**: Mark packages as "side-effect-free" in `package.json` to allow aggressive shaking.\n• **Named Imports**: Use `import { Button } from \'lib\'` instead of `import * as Lib` for better results.',
    codeExample: `// utils.js\nexport const add = (a, b) => a + b;\nexport const subtract = (a, b) => a - b; // Unused\n\n// main.js\nimport { add } from './utils'; // 'subtract' is shaken out\n\n// package.json\n{\n  "sideEffects": false\n}`,
    priority: null
  },

  // ==================== JAVA QUESTIONS ====================
  {
    id: 110,
    category: 'Java',
    question: 'What is the difference between JDK, JRE, and JVM?',
    answer: 'JVM (Java Virtual Machine) executes bytecode. JRE (Java Runtime Environment) includes JVM + libraries to run Java apps. JDK (Java Development Kit) includes JRE + development tools (compiler, debugger).',
    explanation: '**Hierarchy:**\n\n• **JVM**: The engine that drives Java code. It\'s platform-dependent.\n• **JRE**: The implementation of JVM. It provides the minimum requirements to execute a Java application.\n• **JDK**: The full package for developers. It contains JRE plus `javac` (compiler), `javadoc`, and other tools.',
    codeExample: `// To compile: javac HelloWorld.java (Requires JDK)
// To run: java HelloWorld (Requires JRE)

public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}`,
    priority: null
  },
  {
    id: 111,
    category: 'Java',
    question: 'Explain the difference between == and .equals() in Java.',
    answer: '`==` compares object references (memory addresses). `.equals()` compares the actual content/values of objects. For Strings, always use `.equals()` unless you specifically want to check if they are the same object in memory.',
    explanation: '**Comparison Logic:**\n\n• **Primitive Types**: `==` compares values directly.\n• **Objects**: `==` checks if both references point to the exact same object in the heap.\n• **.equals()**: A method defined in the `Object` class that should be overridden to define logical equality (like comparing String characters).',
    codeExample: `String s1 = new String("Hello");
String s2 = new String("Hello");

System.out.println(s1 == s2);      // false (different memory locations)
System.out.println(s1.equals(s2)); // true (same content)

// For primitives
int a = 5;
int b = 5;
System.out.println(a == b); // true`,
    priority: null
  },
  {
    id: 112,
    category: 'Java',
    question: 'What is the difference between an Abstract Class and an Interface?',
    answer: 'Abstract classes can have state (instance variables) and constructors, while interfaces cannot (before Java 8). A class can implement multiple interfaces but extend only one abstract class. Interfaces are better for defining capabilities; abstract classes for shared base behavior.',
    explanation: '**Key Differences:**\n\n• **State**: Abstract classes can have instance fields; interfaces only have `static final` constants.\n• **Constructors**: Abstract classes have them; interfaces do not.\n• **Access Modifiers**: Abstract class methods can be private/protected; interface methods are implicitly public.\n• **Multiple Inheritance**: Java supports multiple interface inheritance but single class inheritance.',
    codeExample: `abstract class Animal {
    String name;
    abstract void speak();
}

interface Swimmable {
    void swim();
}

class Dog extends Animal implements Swimmable {
    void speak() { System.out.println("Bark"); }
    public void swim() { System.out.println("Dog paddling"); }
}`,
    priority: null
  },
  {
    id: 113,
    category: 'Java',
    question: 'What are the main principles of OOP in Java?',
    answer: 'The four pillars are: Encapsulation (hiding data), Inheritance (reusing code), Polymorphism (many forms), and Abstraction (hiding complexity).',
    explanation: '**OOP Pillars:**\n\n1. **Encapsulation**: Using `private` fields and `public` getters/setters to protect data integrity.\n2. **Inheritance**: Using `extends` to create a hierarchy and reuse logic.\n3. **Polymorphism**: Method Overloading (compile-time) and Overriding (runtime).\n4. **Abstraction**: Using abstract classes or interfaces to expose only essential features.',
    codeExample: `// Encapsulation
class BankAccount {
    private double balance;
    public void deposit(double amount) { 
        if (amount > 0) balance += amount; 
    }
}

// Polymorphism
class Cat extends Animal {
    @Override
    void speak() { System.out.println("Meow"); }
}`,
    priority: null
  },
  {
    id: 114,
    category: 'Java',
    question: 'What is the difference between String, StringBuilder, and StringBuffer?',
    answer: 'String is immutable (creates new objects on change). StringBuilder is mutable and not thread-safe (fastest). StringBuffer is mutable and thread-safe (synchronized). Use StringBuilder for single-threaded string manipulation.',
    explanation: '**Performance Implications:**\n\n• **String**: Every concatenation creates a new object in the heap, leading to garbage collection overhead.\n• **StringBuilder**: Modifies the same object. Ideal for loops or complex string building in a single thread.\n• **StringBuffer**: Same as StringBuilder but synchronized. Use only when multiple threads access the same string buffer.',
    codeExample: `// Bad practice for loops
String s = "";
for (int i = 0; i < 100; i++) {
    s += i; // Creates 100 new String objects
}

// Good practice
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 100; i++) {
    sb.append(i);
}
String result = sb.toString();`,
    priority: null
  },
  {
    id: 115,
    category: 'Java',
    question: 'Explain the `final` keyword in Java.',
    answer: '`final` has different meanings based on context: for variables (constant value), for methods (cannot be overridden), and for classes (cannot be inherited).',
    explanation: '**Usage Contexts:**\n\n• **Final Variable**: Value cannot be changed once assigned. Must be initialized.\n• **Final Method**: Prevents subclasses from overriding the method.\n• **Final Class**: Prevents the class from being extended (e.g., `String` class is final).',
    codeExample: `final int MAX_SPEED = 100;
// MAX_SPEED = 120; // Compilation Error

final class SecurityManager {
    // Cannot be subclassed
}

class Parent {
    final void lockedMethod() { }
}`,
    priority: null
  },
  {
    id: 116,
    category: 'Java',
    question: 'What is the difference between Checked and Unchecked Exceptions?',
    answer: 'Checked exceptions are checked at compile-time (must be handled or declared). Unchecked exceptions occur at runtime (usually programming errors like NullPointerException).',
    explanation: '**Exception Hierarchy:**\n\n• **Checked**: Extend `Exception`. Examples: `IOException`, `SQLException`. The compiler forces you to use `try-catch` or `throws`.\n• **Unchecked**: Extend `RuntimeException`. Examples: `ArithmeticException`, `ClassCastException`. Handling them is optional but recommended for robustness.',
    codeExample: `// Checked Exception
public void readFile() throws IOException {
    FileReader fr = new FileReader("test.txt");
}

// Unchecked Exception
public void divide(int a, int b) {
    if (b == 0) throw new ArithmeticException("Divide by zero");
    return a / b;
}`,
    priority: null
  },
  {
    id: 117,
    category: 'Java',
    question: 'How does HashMap work internally in Java?',
    answer: 'HashMap uses hashing. It stores entries in an array of buckets. When you put a key-value pair, it calculates the hash code to find the bucket index. If a collision occurs (two keys have the same hash), it uses a LinkedList (or Tree in Java 8+) to store multiple entries in that bucket.',
    explanation: '**Internal Mechanics:**\n\n• **put()**: Calculates `hash(key)` to find the index. If the bucket is empty, it adds the node. If not, it checks `equals()` to update or append.\n• **get()**: Calculates the index and traverses the linked list/tree using `equals()` to find the correct value.\n• **Complexity**: Average O(1) for get/put. Worst case O(n) if all keys collide, or O(log n) with TreeNodes.',
    codeExample: `Map<String, Integer> map = new HashMap<>();
map.put("Apple", 10);
map.put("Banana", 20);

// Internal flow:
// 1. "Apple".hashCode() -> index 5
// 2. Store Entry("Apple", 10) at index 5

Integer val = map.get("Apple"); // Returns 10`,
    priority: null
  },
  {
    id: 118,
    category: 'Java',
    question: 'What is the difference between ArrayList and LinkedList?',
    answer: 'ArrayList uses a dynamic array. It is fast for random access (get) but slow for insertions/deletions in the middle. LinkedList uses a doubly-linked list. It is fast for insertions/deletions but slow for random access.',
    explanation: '**Performance Comparison:**\n\n• **ArrayList**: \n  - Get/Set: O(1)\n  - Add/Remove: O(n) (due to shifting elements)\n  - Memory: Less overhead (only stores data)\n\n• **LinkedList**: \n  - Get/Set: O(n)\n  - Add/Remove: O(1) (if you have the iterator)\n  - Memory: More overhead (stores prev/next pointers)',
    codeExample: `List<String> arrayList = new ArrayList<>();
arrayList.add("A");
arrayList.get(0); // Fast

List<String> linkedList = new LinkedList<>();
linkedList.add("A");
linkedList.remove(0); // Fast if using iterator`,
    priority: null
  },
  {
    id: 119,
    category: 'Java',
    question: 'What are Java Streams and how do they differ from Collections?',
    answer: 'Collections are about storing data; Streams are about processing data. Streams support functional-style operations like `filter`, `map`, and `reduce`. They are lazy (operations are only performed when a terminal operation is called).',
    explanation: '**Stream Pipeline:**\n\n1. **Source**: Collection, Array, or I/O channel.\n2. **Intermediate Operations**: `filter`, `map`, `sorted` (lazy, return a new stream).\n3. **Terminal Operations**: `collect`, `forEach`, `reduce` (trigger execution and return a result).',
    codeExample: `List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

List<String> filtered = names.stream()
    .filter(name -> name.startsWith("A"))
    .map(String::toUpperCase)
    .collect(Collectors.toList());

// Result: ["ALICE"]`,
    priority: null
  },
  {
    id: 120,
    category: 'Java',
    question: 'Explain Multithreading in Java and how to create a thread.',
    answer: 'Multithreading allows concurrent execution of two or more parts of a program. You can create a thread by extending the `Thread` class or implementing the `Runnable` interface. Implementing `Runnable` is preferred as it allows your class to extend other classes.',
    explanation: '**Thread Lifecycle:**\n\n• **New**: Thread is created but not started.\n• **Runnable**: Ready to run.\n• **Running**: Currently executing.\n• **Blocked/Waiting**: Waiting for a resource or another thread.\n• **Terminated**: Finished execution.',
    codeExample: `// Method 1: Implementing Runnable (Preferred)
class Task implements Runnable {
    public void run() {
        System.out.println("Thread running");
    }
}

Thread t = new Thread(new Task());
t.start();

// Method 2: Lambda
new Thread(() -> System.out.println("Lambda thread")).start();`,
    priority: null
  },
  {
    id: 121,
    category: 'Java',
    question: 'What is the `volatile` keyword in Java?',
    answer: '`volatile` ensures that a variable\'s value is always read from and written to main memory, not from a thread\'s local cache. It guarantees visibility of changes across threads but does not guarantee atomicity.',
    explanation: '**Visibility vs Atomicity:**\n\n• **Without volatile**: Thread A might cache a variable and never see updates made by Thread B.\n• **With volatile**: Every read sees the most recent write by any thread.\n• **Limitation**: `volatile` does not make operations like `i++` atomic. For that, use `AtomicInteger` or `synchronized`.',
    codeExample: `public class SharedData {
    private volatile boolean flag = false;

    public void setFlag() {
        flag = true; // Visible to all threads immediately
    }

    public boolean getFlag() {
        return flag;
    }
}`,
    priority: null
  },
  {
    id: 122,
    category: 'Java',
    question: 'What is the difference between `sleep()` and `wait()`?',
    answer: '`sleep()` is a static method of `Thread` that pauses execution for a specific time without releasing locks. `wait()` is a method of `Object` that releases the lock and waits for a `notify()` call.',
    explanation: '**Key Distinctions:**\n\n• **Lock Handling**: `sleep()` holds the monitor lock; `wait()` releases it.\n• **Wake up**: `sleep()` wakes up after time expires; `wait()` wakes up when notified or timed out.\n• **Context**: `sleep()` can be called anywhere; `wait()` must be called inside a synchronized block/method.',
    codeExample: `// sleep()
try {
    Thread.sleep(1000); // Pauses for 1 second, keeps lock
} catch (InterruptedException e) { }

// wait()
synchronized(obj) {
    obj.wait(); // Releases lock and waits
    // Another thread must call obj.notify()
}`,
    priority: null
  },
  {
    id: 123,
    category: 'Java',
    question: 'What is Garbage Collection in Java?',
    answer: 'Garbage Collection (GC) is the process of automatically freeing memory by destroying objects that are no longer reachable or referenced by the program. It runs in the JVM background.',
    explanation: '**GC Algorithms:**\n\n• **Serial GC**: Single-threaded, good for small apps.\n• **Parallel GC**: Multi-threaded, high throughput.\n• **G1 GC (Garbage First)**: Designed for large heaps with predictable pause times.\n• **ZGC**: Low-latency GC for very large heaps.\n\nYou can suggest GC using `System.gc()`, but it\'s not guaranteed to run immediately.',
    codeExample: `public class GCDemo {
    public static void main(String[] args) {
        GCDemo obj = new GCDemo();
        obj = null; // Object is now eligible for GC
        
        // Suggesting JVM to run GC
        System.gc(); 
    }

    @Override
    protected void finalize() {
        System.out.println("Object garbage collected");
    }
}`,
    priority: null
  },

  // ==================== NODE.JS QUESTIONS ====================
  {
    id: 124,
    category: 'Node.js',
    question: 'What is Node.js and how does it work?',
    answer: 'Nodes is a runtime environment that allows JavaScript to be executed outside the browser. It uses the V8 JavaScript engine and operates on a single-threaded, event-driven architecture using the non-blocking I/O model, making it efficient for handling concurrent requests.',
    explanation: '**Key Concepts:**\\n\\n• **Single-threaded**: Runs on a single thread with event loop\\n• **Non-blocking I/O**: Operations don\'t block execution\\n• **Event-driven**: Uses callbacks/promises for async operations\\n• **V8 Engine**: Google\'s high-performance JavaScript engine\\n\\n**Architecture:**\\n- Requests come in → Event Loop handles them → Thread Pool for heavy tasks → Callbacks executed when ready',
    codeExample: `const http = require('http');

// Create a simple server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\\n');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
    priority: null
  },
  {
    id: 125,
    category: 'Node.js',
    question: 'Explain the Event Loop in Node.js',
    answer: 'The Event Loop in Node.js is a mechanism that allows non-blocking execution. It continuously monitors the event queue and processes pending tasks like I/O operations, timers, and promises. It consists of different phases like timers, I/O callbacks, idle, polling, and closing events.',
    explanation: '**Event Loop Phases:**\\n\\n1. **Timers**: Executes setTimeout() and setInterval() callbacks\\n2. **Pending callbacks**: Executes I/O callbacks deferred to next loop iteration\\n3. **Idle, prepare**: Internal use only\\n4. **Poll**: Retrieves new I/O events; executes I/O callbacks\\n5. **Check**: Executes setImmediate() callbacks\\n6. **Close callbacks**: Executes close event callbacks (e.g., socket.on(\'close\', ...))\\n\\n**Process.nextTick()**: Not technically part of the event loop. Executes after current operation completes, before event loop continues.',
    codeExample: `console.log('Start');

setTimeout(() => {
  console.log('Timeout');
}, 0);

setImmediate(() => {
  console.log('Immediate');
});

process.nextTick(() => {
  console.log('Next Tick');
});

Promise.resolve().then(() => {
  console.log('Promise');
});

console.log('End');

// Output:
// Start
// End
// Next Tick
// Promise
// Timeout
// Immediate`,
    priority: null
  },
  {
    id: 126,
    category: 'Node.js',
    question: 'What is the difference between process.nextTick() and setImmediate()?',
    answer: 'process.nextTick() fires immediately on the same phase, while setImmediate() fires on the next iteration of the event loop (check phase).',
    explanation: '**Key Differences:**\\n\\n• **process.nextTick()**: \\n  - Executes before the event loop continues\\n  - Higher priority than timers, I/O, etc.\\n  - Can starve I/O if used recursively\\n\\n• **setImmediate()**: \\n  - Executes in the check phase of next event loop iteration\\n  - Lower priority than nextTick\\n  - Better for breaking up long-running operations\\n\\n**Best Practice**: Use setImmediate() for most cases. Use nextTick() only when you need to ensure callback executes before any I/O.',
    codeExample: `// process.nextTick() example
process.nextTick(() => {
  console.log('This runs before I/O');
});

fs.readFile('file.txt', () => {
  console.log('File read');
});

// setImmediate() example
setImmediate(() => {
  console.log('This runs after I/O in next loop');
});

fs.readFile('file.txt', () => {
  console.log('File read');
});`,
    priority: null
  },
  {
    id: 127,
    category: 'Node.js',
    question: 'How does Node.js handle asynchronous operations?',
    answer: 'Node.js uses the libuv library to handle async operations through an event loop, thread pool, and non-blocking I/O.',
    explanation: '**Async Handling Mechanisms:**\\n\\n1. **Callbacks**: Traditional error-first pattern\\n2. **Promises**: Cleaner async handling with .then()/.catch()\\n3. **Async/Await**: Syntactic sugar over promises\\n4. **EventEmitter**: Event-based communication\\n5. **Streams**: Handle large data efficiently\\n\\n**Under the Hood:**\\n- Non-blocking I/O → OS handles file/network operations\\n- Thread Pool (4 threads by default) → CPU-intensive tasks\\n- Event Loop → Orchestrates callback execution',
    codeExample: `// Callback approach
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Promise approach
fs.promises.readFile('file.txt', 'utf8')
  .then(data => console.log(data))
  .catch(err => console.error(err));

// Async/Await approach
async function readFile() {
  try {
    const data = await fs.promises.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}`,
    priority: null
  },
  {
    id: 128,
    category: 'Node.js',
    question: 'What are Streams in Node.js?',
    answer: 'Streams are collections of data that might not be available all at once. They allow you to read/write data chunk by chunk, making them memory-efficient for large files.',
    explanation: '**Types of Streams:**\\n\\n1. **Readable**: Read data (fs.createReadStream)\\n2. **Writable**: Write data (fs.createWriteStream)\\n3. **Duplex**: Both readable and writable (net.Socket)\\n4. **Transform**: Modify data as it\'s read/written (zlib.createGzip)\\n\\n**Benefits:**\\n- Memory efficient: Don\'t load entire file into memory\\n- Time efficient: Process data as it arrives\\n- Composable: Pipe streams together',
    codeExample: `const fs = require('fs');
const zlib = require('zlib');

// Reading a large file efficiently
const readStream = fs.createReadStream('large-file.txt');
const writeStream = fs.createWriteStream('compressed.gz');
const gzip = zlib.createGzip();

// Pipe streams together
readStream
  .pipe(gzip)
  .pipe(writeStream)
  .on('finish', () => console.log('File compressed successfully'));

// Handle errors
readStream.on('error', (err) => console.error('Read error:', err));
writeStream.on('error', (err) => console.error('Write error:', err));`,
    priority: null
  },
  {
    id: 129,
    category: 'Node.js',
    question: 'What is the Cluster module in Node.js?',
    answer: 'The Cluster module allows you to create child processes (workers) that share server ports, enabling multi-core utilization.',
    explanation: '**Why Use Clustering?**\\n\\n• Node.js is single-threaded → Can\'t utilize multiple CPU cores\\n• Cluster creates worker processes → Each has its own event loop\\n• Workers share ports → Load balancing handled automatically\\n\\n**How it Works:**\\n- Master process spawns workers\\n- Workers handle incoming requests\\n- Round-robin distribution (default on Windows, OS-dependent on Unix)\\n\\n**Best For:** CPU-bound applications, high-traffic servers',
    codeExample: `const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(\`Master \${process.pid} is running\`);
  
  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker, code, signal) => {
    console.log(\`Worker \${worker.process.pid} died\`);
    // Replace dead worker
    cluster.fork();
  });
} else {
  // Workers share the TCP connection
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello from worker ' + process.pid);
  }).listen(8000);
  
  console.log(\`Worker \${process.pid} started\`);
}`,
    priority: null
  },
  {
    id: 130,
    category: 'Node.js',
    question: 'How do you handle errors in Node.js?',
    answer: 'Node.js provides multiple error handling mechanisms: try-catch for sync code, error-first callbacks, promise .catch(), and uncaughtException handlers.',
    explanation: '**Error Handling Strategies:**\\n\\n1. **Synchronous Code**: try-catch blocks\\n2. **Callbacks**: Error-first pattern (err, result)\\n3. **Promises**: .catch() or try-catch with async/await\\n4. **EventEmitter**: \'error\' event listeners\\n5. **Global Handlers**: process.on(\'uncaughtException\'), process.on(\'unhandledRejection\')\\n\\n**Best Practices:**\\n- Always handle errors, never ignore them\\n- Use custom error classes\\n- Log errors properly\\n- Graceful shutdown on critical errors',
    codeExample: `// Error-first callback
fs.readFile('file.txt', (err, data) => {
  if (err) {
    console.error('Failed to read file:', err.message);
    return;
  }
  console.log(data);
});

// Promise error handling
fetchData()
  .then(data => console.log(data))
  .catch(err => console.error('Fetch failed:', err));

// Async/await
async function getData() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

// Global error handlers
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});`,
    priority: null
  },
  {
    id: 131,
    category: 'Node.js',
    question: 'What is middleware in Express.js?',
    answer: 'Middleware functions have access to request and response objects and can execute code, modify them, or end the request-response cycle.',
    explanation: '**Types of Middleware:**\\n\\n1. **Application-level**: app.use(), app.METHOD()\\n2. **Router-level**: router.use(), router.METHOD()\\n3. **Error-handling**: 4 parameters (err, req, res, next)\\n4. **Built-in**: express.static(), express.json()\\n5. **Third-party**: body-parser, cors, morgan\\n\\n**Execution Order:**\\n- Middleware executes sequentially\\n- Must call next() to pass control\\n- Can terminate request by sending response',
    codeExample: `const express = require('express');
const app = express();

// Application-level middleware
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next();
});

// Authentication middleware
function authenticate(req, res, next) {
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  // Verify token
  try {
    req.user = verifyToken(token);
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
}

// Protected route
app.get('/profile', authenticate, (req, res) => {
  res.json({ user: req.user });
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});`,
    priority: null
  },
  {
    id: 132,
    category: 'Node.js',
    question: 'How do you manage environment variables in Node.js?',
    answer: 'Use the dotenv package to load environment variables from a .env file into process.env.',
    explanation: '**Environment Variable Management:**\\n\\n1. **.env file**: Store sensitive config (never commit to git)\\n2. **dotenv package**: Loads .env into process.env\\n3. **process.env**: Access variables in code\\n4. **Validation**: Use packages like joi or zod to validate\\n\\n**Security Best Practices:**\\n- Never hardcode secrets\\n- Add .env to .gitignore\\n- Use different .env files for different environments\\n- Validate required variables at startup',
    codeExample: `// .env file
# .env
PORT=3000
DATABASE_URL=mongodb://localhost:27017/mydb
JWT_SECRET=your-secret-key
NODE_ENV=development

// app.js
require('dotenv').config();

const express = require('express');
const app = express();

// Access environment variables
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET;

// Validate required variables
if (!DB_URL || !JWT_SECRET) {
  console.error('Missing required environment variables');
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
    priority: null
  },
  {
    id: 133,
    category: 'Node.js',
    question: 'What is the difference between require() and import?',
    answer: 'require() is CommonJS (synchronous, dynamic), while import is ES Modules (asynchronous, static). Node.js supports both.',
    explanation: '**CommonJS (require):**\\n\\n• Synchronous loading\\n• Dynamic: Can be called conditionally\\n• Default in Node.js (.js files)\\n• module.exports / exports\\n\\n**ES Modules (import):**\\n\\n• Asynchronous loading\\n• Static: Must be at top level\\n• Requires .mjs extension or "type": "module" in package.json\\n• export / export default\\n\\n**When to Use:**\\n- Use ES Modules for modern projects\\n- Use CommonJS for backward compatibility\\n- Can mix both with proper configuration',
    codeExample: `// CommonJS (require)
const express = require('express');
const { Router } = require('express');

module.exports = function myFunction() {
  return 'Hello';
};

// ES Modules (import)
import express from 'express';
import { Router } from 'express';

export default function myFunction() {
  return 'Hello';
}

// package.json for ES Modules
{
  "name": "my-app",
  "type": "module"  // Enables ES Modules for .js files
}`,
    priority: null
  },
  {
    id: 134,
    category: 'Node.js',
    question: 'How do you implement authentication in Node.js?',
    answer: 'Use JWT (JSON Web Tokens) for stateless authentication or sessions for stateful. Combine with bcrypt for password hashing.',
    explanation: '**Authentication Approaches:**\\n\\n1. **JWT (Stateless)**:\\n   - Token contains user info\\n   - Signed with secret key\\n   - No server-side storage needed\\n   - Good for APIs and microservices\\n\\n2. **Sessions (Stateful)**:\\n   - Session ID stored in cookie\\n   - Session data stored server-side\\n   - Easier to invalidate\\n   - Good for traditional web apps\\n\\n**Security Considerations:**\\n- Always hash passwords (bcrypt)\\n- Use HTTPS in production\\n- Set secure cookie flags\\n- Implement rate limiting',
    codeExample: `const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');

const app = express();
app.use(express.json());

const SECRET_KEY = process.env.JWT_SECRET;

// Register
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Save user to database
  const user = await createUser(username, hashedPassword);
  
  res.status(201).json({ message: 'User created' });
});

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  const user = await findUser(username);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // Verify password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // Generate JWT
  const token = jwt.sign(
    { userId: user.id, username: user.username },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
  
  res.json({ token });
});

// Auth middleware
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }
  
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
}

// Protected route
app.get('/profile', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});`,
    priority: null
  },
  {
    id: 135,
    category: 'Node.js',
    question: 'How do you handle file uploads in Node.js?',
    answer: 'Use multer middleware for handling multipart/form-data. Stream files to disk or cloud storage for efficiency.',
    explanation: '**File Upload Strategies:**\\n\\n1. **Multer**: Most popular middleware\\n2. **Streaming**: Process files without loading into memory\\n3. **Storage Options**:\\n   - Local disk (development)\\n   - Cloud storage (AWS S3, Google Cloud)\\n   - Database (for small files)\\n\\n**Best Practices:**\\n- Validate file types and sizes\\n- Sanitize filenames\\n- Use streaming for large files\\n- Implement virus scanning for user uploads',
    codeExample: `const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Unique filename
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueName + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (extname && mimetype) {
    return cb(null, true);
  }
  cb(new Error('Only images are allowed!'));
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter
});

// Upload endpoint
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  res.json({
    message: 'File uploaded successfully',
    filename: req.file.filename,
    path: req.file.path
  });
});

// Error handling
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({ error: err.message });
  } else {
    next(err);
  }
});`,
    priority: null
  },
  {
    id: 136,
    category: 'Node.js',
    question: 'What is the Worker Threads module?',
    answer: 'Worker Threads enable parallel execution of JavaScript code, useful for CPU-intensive tasks without blocking the main thread.',
    explanation: '**When to Use Worker Threads:**\\n\\n• CPU-intensive calculations\\n• Image/video processing\\n• Data encryption/decryption\\n• Large dataset processing\\n\\n**vs Cluster Module:**\\n- **Cluster**: Multiple processes, shared ports, good for I/O\\n- **Workers**: Multiple threads, shared memory, good for CPU tasks\\n\\n**Communication:**\\n- postMessage() to send data\\n- on(\'message\') to receive data\\n- SharedArrayBuffer for shared memory',
    codeExample: `const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
  // Main thread
  const worker = new Worker(__filename, {
    workerData: { numbers: [1, 2, 3, 4, 5] }
  });
  
  worker.on('message', (result) => {
    console.log('Result from worker:', result);
  });
  
  worker.on('error', (err) => {
    console.error('Worker error:', err);
  });
  
  worker.on('exit', (code) => {
    if (code !== 0) {
      console.error(\`Worker stopped with exit code \${code}\`);
    }
  });
} else {
  // Worker thread
  const { numbers } = workerData;
  
  // CPU-intensive task
  const result = numbers.reduce((sum, num) => {
    // Simulate heavy computation
    let factorial = 1;
    for (let i = 1; i <= num * 1000; i++) {
      factorial *= i;
    }
    return sum + factorial;
  }, 0);
  
  parentPort.postMessage(result);
}`,
    priority: null
  },
  {
    id: 137,
    category: 'Node.js',
    question: 'How do you implement caching in Node.js?',
    answer: 'Use in-memory caching (Map/Object), Redis for distributed caching, or HTTP caching headers for API responses.',
    explanation: '**Caching Strategies:**\\n\\n1. **In-Memory Cache**:\\n   - Fast, simple\\n   - Lost on restart\\n   - Single instance only\\n\\n2. **Redis/Memcached**:\\n   - Distributed\\n   - Persistent\\n   - TTL support\\n\\n3. **HTTP Caching**:\\n   - Cache-Control headers\\n   - ETags for validation\\n   - Browser/proxy caching\\n\\n**Cache Invalidation:**\\n- Time-based (TTL)\\n- Event-based (on data change)\\n- Manual invalidation',
    codeExample: `const redis = require('redis');
const client = redis.createClient();

// Simple in-memory cache
class Cache {
  constructor(ttl = 3600) {
    this.store = new Map();
    this.ttl = ttl;
  }
  
  get(key) {
    const item = this.store.get(key);
    if (!item) return null;
    
    // Check if expired
    if (Date.now() > item.expiry) {
      this.store.delete(key);
      return null;
    }
    
    return item.value;
  }
  
  set(key, value, ttl = this.ttl) {
    this.store.set(key, {
      value,
      expiry: Date.now() + (ttl * 1000)
    });
  }
  
  delete(key) {
    this.store.delete(key);
  }
}

// Redis caching middleware
async function cacheMiddleware(req, res, next) {
  const key = req.originalUrl;
  
  // Try to get from cache
  const cached = await client.get(key);
  if (cached) {
    return res.json(JSON.parse(cached));
  }
  
  // Override res.json to cache response
  const originalJson = res.json.bind(res);
  res.json = (data) => {
    client.setex(key, 300, JSON.stringify(data)); // Cache for 5 minutes
    originalJson(data);
  };
  
  next();
}

app.get('/api/data', cacheMiddleware, async (req, res) => {
  const data = await fetchData();
  res.json(data);
});`,
    priority: null
  },
  {
    id: 138,
    category: 'Node.js',
    question: 'How do you debug Node.js applications?',
    answer: 'Use built-in debugger, console logging, Chrome DevTools, or specialized tools like ndb and clinic.js.',
    explanation: '**Debugging Tools:**\\n\\n1. **Built-in Debugger**:\\n   - node inspect app.js\\n   - debugger statement\\n\\n2. **Chrome DevTools**:\\n   - node --inspect app.js\\n   - chrome://inspect\\n\\n3. **Console Methods**:\\n   - console.log(), console.error()\\n   - console.trace() for stack traces\\n   - console.time() for performance\\n\\n4. **Advanced Tools**:\\n   - ndb: Enhanced debugging UI\\n   - clinic.js: Performance profiling\\n   - PM2: Production monitoring',
    codeExample: `// Using debugger statement
function calculateTotal(items) {
  let total = 0;
  
  for (const item of items) {
    debugger; // Execution pauses here in debugger
    total += item.price * item.quantity;
  }
  
  return total;
}

// Console debugging
console.log('Starting application...');
console.error('Error occurred:', error);
console.trace('Stack trace');

console.time('Operation');
// ... some code ...
console.timeEnd('Operation'); // Logs: Operation: 123.45ms

// Inspect mode
// Run: node --inspect app.js
// Open Chrome and go to chrome://inspect

// Async debugging
async function fetchData() {
  try {
    console.log('Fetching data...');
    const response = await fetch('/api/data');
    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Data received:', data);
    return data;
  } catch (err) {
    console.error('Fetch failed:', err);
    throw err;
  }
}`,
    priority: null
  },
  {
    id: 139,
    category: 'Node.js',
    question: 'What are EventEmitter and how do they work?',
    answer: 'EventEmitter is a core Node.js class that enables event-driven architecture. Objects can emit named events and register listeners.',
    explanation: '**EventEmitter Basics:**\\n\\n• **emit(eventName, ...args)**: Trigger an event\\n• **on(eventName, listener)**: Register listener\\n• **once(eventName, listener)**: Listen once then remove\\n• **removeListener(eventName, listener)**: Remove specific listener\\n• **removeAllListeners(eventName)**: Remove all listeners\\n\\n**Best Practices:**\\n- Always handle \'error\' events\\n- Remove listeners to prevent memory leaks\\n- Use meaningful event names\\n- Limit listener count (default max: 10)',
    codeExample: `const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// Register listeners
myEmitter.on('greet', (name) => {
  console.log(\`Hello, \${name}!\`);
});

myEmitter.once('welcome', () => {
  console.log('Welcome! This only prints once.');
});

// Handle errors
myEmitter.on('error', (err) => {
  console.error('Error occurred:', err.message);
});

// Emit events
myEmitter.emit('greet', 'John'); // Hello, John!
myEmitter.emit('welcome');       // Welcome! This only prints once.
myEmitter.emit('welcome');       // Nothing happens
myEmitter.emit('error', new Error('Something went wrong'));

// Real-world example: Server events
const server = require('http').createServer();

server.on('request', (req, res) => {
  console.log(\`\${req.method} \${req.url}\`);
  res.end('OK');
});

server.on('connection', (socket) => {
  console.log('New connection');
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

server.listen(3000);`,
    priority: null
  },
  {
    id: 140,
    category: 'Node.js',
    question: 'How do you handle database connections in Node.js?',
    answer: 'Use connection pooling for efficiency, implement retry logic, and properly close connections to prevent leaks.',
    explanation: '**Database Connection Best Practices:**\\n\\n1. **Connection Pooling**:\\n   - Reuse connections\\n   - Configurable pool size\\n   - Automatic connection management\\n\\n2. **Error Handling**:\\n   - Retry logic for transient failures\\n   - Circuit breaker pattern\\n   - Proper error propagation\\n\\n3. **Resource Management**:\\n   - Close connections properly\\n   - Use try-finally blocks\\n   - Monitor pool health\\n\\n**Popular ORMs/Drivers:**\\n- MongoDB: mongoose, mongodb driver\\n- PostgreSQL: pg, sequelize\\n- MySQL: mysql2, knex',
    codeExample: `const mongoose = require('mongoose');

// MongoDB connection with pooling
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,        // Maximum connections
      minPoolSize: 5,         // Minimum connections
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log(\`MongoDB Connected: \${conn.connection.host}\`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// PostgreSQL with pg
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,              // Max connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Query with error handling
async function getUsers() {
  const client = await pool.connect();
  
  try {
    const result = await client.query('SELECT * FROM users');
    return result.rows;
  } catch (err) {
    console.error('Query error:', err);
    throw err;
  } finally {
    client.release(); // Always release connection
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  await pool.end();
  await mongoose.disconnect();
  process.exit(0);
});`,
    priority: null
  },
  {
    id: 141,
    category: 'Node.js',
    question: 'What happens if an unhandled promise rejection occurs?',
    answer: 'In modern Node.js (v15+), unhandled promise rejections cause the process to exit with a non-zero exit code. In older versions, they were silently ignored but emitted a warning.',
    explanation: '**Unhandled Promise Rejection Behavior:**\n\n**Node.js v15+ (Current Behavior):**\n- Process exits with non-zero exit code\n- Error is logged to stderr\n- Prevents silent failures in production\n\n**Node.js < v15 (Deprecated Behavior):**\n- Emitted \'unhandledRejection\' event\n- Process continued running (dangerous)\n- Could lead to unpredictable state\n\n**How to Handle:**\n\n1. **Always use try-catch with async/await**\n2. **Add .catch() to promise chains**\n3. **Listen to process.unhandledRejection event** (for logging/fallback)\n4. **Use proper error handling middleware**\n\n**Best Practices:**\n- Never ignore promise rejections\n- Always handle errors at appropriate level\n- Log rejections for debugging\n- Use centralized error handling',
    codeExample: `// BAD: Unhandled rejection (process will crash in Node.js v15+)
async function fetchData() {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json(); // May throw if response is invalid
  return data;
}

fetchData(); // No error handling!

// GOOD: Proper error handling with try-catch
async function fetchDataSafe() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error.message);
    throw error; // Or handle appropriately
  }
}

// GOOD: Using .catch() with promises
fetchData()
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Fallback: Global handler (for logging, not as primary strategy)
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Log to monitoring service, cleanup, etc.
  // Note: In Node.js v15+, process will still exit after this
});

// Express error handling example
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});`,
    priority: null
  },
  // AWS Questions
  {
    id: 142,
    category: 'AWS',
    question: 'What is AWS Lambda and when should you use it?',
    answer: 'AWS Lambda is a serverless compute service that runs code in response to events without provisioning servers. Use it for event-driven architectures, API backends, data processing, and automated tasks.',
    explanation: '**AWS Lambda Overview:**\n\n**Key Features:**\n- Serverless: No server management\n- Auto-scaling: Scales automatically with demand\n- Pay-per-use: Only pay for execution time\n- Event-driven: Triggered by various AWS services\n- Multiple runtimes: Node.js, Python, Java, Go, etc.\n\n**Use Cases:**\n1. **API Backends**: With API Gateway\n2. **Data Processing**: S3 file uploads, DynamoDB streams\n3. **Scheduled Tasks**: CloudWatch Events\n4. **Real-time File Processing**: Image resizing, video transcoding\n5. **Chatbots**: Lex integration\n6. **IoT Data Processing**: IoT Core triggers\n\n**When NOT to use:**\n- Long-running processes (>15 min limit)\n- Stateful applications\n- High-performance computing needs\n- Predictable steady workloads (EC2 may be cheaper)',
    codeExample: `// Example: Lambda function for image processing
const AWS = require('aws-sdk');
const sharp = require('sharp');
const s3 = new AWS.S3();

exports.handler = async (event) => {
  // Get the uploaded image from S3
  const bucket = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;
  
  try {
    // Download image
    const { Body } = await s3.getObject({ Bucket: bucket, Key: key }).promise();
    
    // Resize image using sharp
    const resizedImage = await sharp(Body)
      .resize(800, 600)
      .toBuffer();
    
    // Upload resized image
    await s3.putObject({
      Bucket: bucket,
      Key: \`resized/\${key}\`,
      Body: resizedImage
    }).promise();
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Image processed successfully' })
    };
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
};`,
    priority: null
  },

  // Express.js Questions
  {
    id: 143,
    category: 'Express.js',
    question: 'What is Express.js and why is it popular?',
    answer: 'Express.js is a minimal and flexible Node.js web application framework that provides robust features for building web and mobile applications. It simplifies server-side development with middleware support, routing, and request/response handling.',
    explanation: '**Why Express.js?**\n\n• **Minimalist**: Unopinionated framework that doesn\'t force a specific structure\n• **Middleware Architecture**: Chain functions to process requests sequentially\n• **Routing**: Simple API for defining routes based on HTTP methods and URLs\n• **Large Ecosystem**: Thousands of third-party middleware packages available\n• **Performance**: Lightweight with minimal overhead\n\n**Key Features:**\n\n1. **Routing System**: Define routes for different HTTP methods (GET, POST, PUT, DELETE)\n2. **Middleware Functions**: Execute code, modify request/response objects, end request-response cycle\n3. **Template Engine Integration**: Render dynamic HTML pages\n4. **Static File Serving**: Serve CSS, JavaScript, images, etc.\n5. **Request Parsing**: Parse JSON, URL-encoded data, multipart forms\n6. **Error Handling**: Centralized error management',
    codeExample: `const express = require('express');
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
  console.log(\`Server running on port \${PORT}\`);
});`,
    priority: null
  },
  {
    id: 144,
    category: 'Express.js',
    question: 'What is Middleware in Express.js?',
    answer: 'Middleware functions are functions that have access to the request object (req), response object (res), and the next middleware function in the application\'s request-response cycle. They can execute code, modify req/res objects, end the cycle, or call the next middleware.',
    explanation: '**Types of Middleware:**\n\n1. **Application-level**: Bound to app object using `app.use()` or `app.METHOD()`\n2. **Router-level**: Bound to router object using `router.use()` or `router.METHOD()`\n3. **Error-handling**: Takes four arguments (err, req, res, next)\n4. **Built-in**: express.json(), express.static(), express.urlencoded()\n5. **Third-party**: body-parser, cors, morgan, helmet, etc.\n\n**Middleware Execution Order:**\n\n• Middleware executes sequentially in the order they are defined\n• Each middleware must either end the response or call `next()`\n• If `next()` is not called, the request will hang\n• Error-handling middleware must have 4 parameters',
    codeExample: `const express = require('express');
const app = express();

// Application-level middleware (runs on all routes)
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.url} - \${new Date().toISOString()}\`);
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

app.listen(3000);`,
    priority: null
  },
  {
    id: 145,
    category: 'Express.js',
    question: 'How does routing work in Express.js?',
    answer: 'Routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, PUT, DELETE, etc.).',
    explanation: '**Route Definition Structure:**\n\n`app.METHOD(PATH, HANDLER)`\n\nWhere:\n- **app**: Express application instance\n- **METHOD**: HTTP method (get, post, put, delete, patch, etc.)\n- **PATH**: Endpoint path on the server\n- **HANDLER**: Callback function executed when route is matched\n\n**Route Parameters:**\n\n• Dynamic segments in the URL path (e.g., `/users/:id`)\n• Accessed via `req.params`\n• Can use regex patterns for validation\n\n**Advanced Routing:**\n\n1. **Route Chaining**: Chain multiple handlers for same route\n2. **Router Object**: Organize routes into modular, mountable route handlers\n3. **Route Prefixing**: Group related routes with common prefix\n4. **Wildcard Routes**: Use `*` for catch-all patterns',
    codeExample: `const express = require('express');
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

app.listen(3000);`,
    priority: null
  },
  {
    id: 146,
    category: 'Express.js',
    question: 'How to handle errors in Express.js?',
    answer: 'Express has a built-in error-handling mechanism using middleware functions with four arguments: (err, req, res, next). Errors can be handled synchronously with try-catch or asynchronously by passing errors to next().',
    explanation: '**Error Handling Approaches:**\n\n1. **Synchronous Errors**: Caught automatically by Express\n2. **Asynchronous Errors**: Must be passed to `next(err)`\n3. **Promise Rejections**: Use `.catch(next)` or async/await with try-catch\n4. **Centralized Error Handler**: Single middleware for all errors\n\n**Best Practices:**\n\n• Always handle errors to prevent crashes\n• Use centralized error handling middleware\n• Log errors for debugging\n• Send appropriate HTTP status codes\n• Don\'t expose sensitive error details in production\n• Use error classes for different error types',
    codeExample: `const express = require('express');
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

app.listen(3000);`,
    priority: null
  },
  {
    id: 147,
    category: 'Express.js',
    question: 'What is the difference between req.params, req.query, and req.body?',
    answer: '- **req.params**: Contains route parameters (e.g., `/users/:id` → `req.params.id`)\n- **req.query**: Contains URL query string parameters (e.g., `/search?q=test` → `req.query.q`)\n- **req.body**: Contains data sent in the request body (requires body-parser middleware)',
    explanation: '**req.params:**\n\n• Extracted from the URL path\n• Defined in route definition with `:` prefix\n• Used for identifying specific resources\n• Example: `/users/123` → `req.params.id = \'123\'`\n\n**req.query:**\n\n• Extracted from URL query string (after `?`)\n• Automatically parsed by Express\n• Used for filtering, sorting, pagination\n• Example: `/users?page=2&limit=10` → `req.query = { page: \'2\', limit: \'10\' }`\n\n**req.body:**\n\n• Contains data sent in POST/PUT/PATCH requests\n• Requires middleware like `express.json()` or `express.urlencoded()`\n• Used for creating/updating resources\n• Can be JSON, form data, or multipart',
    codeExample: `const express = require('express');
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

app.listen(3000);`,
    priority: null
  },
  {
    id: 148,
    category: 'Express.js',
    question: 'How to implement authentication in Express.js?',
    answer: 'Authentication in Express is typically implemented using middleware that verifies user credentials (JWT, sessions, OAuth). The middleware checks for valid tokens/credentials and attaches user information to the request object for downstream handlers.',
    explanation: '**Authentication Strategies:**\n\n1. **JWT (JSON Web Tokens)**: Stateless, scalable, good for APIs\n2. **Session-based**: Stateful, uses cookies, good for traditional web apps\n3. **OAuth/OAuth2**: Third-party authentication (Google, Facebook, GitHub)\n4. **API Keys**: Simple token-based auth for service-to-service communication\n\n**JWT Authentication Flow:**\n\n1. User logs in with credentials\n2. Server validates credentials and generates JWT\n3. JWT is sent to client (stored in localStorage or httpOnly cookie)\n4. Client sends JWT in Authorization header for subsequent requests\n5. Server verifies JWT and grants access',
    codeExample: `const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';
const TOKEN_EXPIRY = '1h';

// Mock user database
const users = [
  {
    id: 149,
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

app.listen(3000);`,
    priority: null
  },
  {
    id: 150,
    category: 'Express.js',
    question: 'How to handle file uploads in Express.js?',
    answer: 'File uploads in Express are handled using middleware like multer, which parses multipart/form-data. Files can be stored in memory, on disk, or uploaded to cloud storage services like AWS S3.',
    explanation: '**File Upload Methods:**\n\n1. **multer**: Most popular middleware for handling multipart/form-data\n2. **express-fileupload**: Simpler alternative to multer\n3. **Busboy**: Lower-level streaming parser\n4. **Formidable**: Another popular option\n\n**Storage Options:**\n\n• **Memory Storage**: Files stored in buffer (good for small files)\n• **Disk Storage**: Files saved to local filesystem\n• **Cloud Storage**: AWS S3, Google Cloud Storage, Azure Blob\n\n**Important Considerations:**\n\n- Set file size limits to prevent DoS attacks\n- Validate file types (MIME type checking)\n- Sanitize filenames to prevent directory traversal\n- Use unique filenames to avoid conflicts\n- Stream large files instead of loading into memory',
    codeExample: `const express = require('express');
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
    cb(null, \`\${file.fieldname}-\${uniqueSuffix}\${ext}\`);
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

app.listen(3000);`,
    priority: null
  },
  {
    id: 151,
    category: 'Express.js',
    question: 'What is CORS and how to handle it in Express?',
    answer: 'CORS (Cross-Origin Resource Sharing) is a security feature that restricts web pages from making requests to a different domain than the one that served the page. In Express, CORS is handled using the cors middleware or by manually setting response headers.',
    explanation: '**Why CORS Exists:**\n\n• Prevents malicious websites from making unauthorized requests\n• Protects user data from cross-site attacks\n• Enforces same-origin policy by default\n\n**CORS Headers:**\n\n- **Access-Control-Allow-Origin**: Which domains can access the resource\n- **Access-Control-Allow-Methods**: Allowed HTTP methods\n- **Access-Control-Allow-Headers**: Allowed request headers\n- **Access-Control-Allow-Credentials**: Whether to include cookies\n- **Access-Control-Max-Age**: How long to cache preflight results\n\n**Implementation Options:**\n\n1. **cors package**: Easy-to-use middleware with configuration options\n2. **Manual headers**: Full control over CORS behavior\n3. **Environment-based**: Different CORS settings for dev/prod',
    codeExample: `const express = require('express');
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

app.listen(3000);`,
    priority: null
  },
  {
    id: 152,
    category: 'Express.js',
    question: 'How to implement rate limiting in Express?',
    answer: 'Rate limiting restricts the number of requests a client can make in a given time period. It\'s implemented using middleware like express-rate-limit to prevent abuse, DDoS attacks, and ensure fair usage.',
    explanation: '**Why Rate Limiting?**\n\n• Prevent brute force attacks on authentication endpoints\n• Protect against DDoS attacks\n• Ensure fair API usage among clients\n• Reduce server load and costs\n• Comply with API usage policies\n\n**Rate Limiting Strategies:**\n\n1. **Fixed Window**: Count requests in fixed time intervals\n2. **Sliding Window**: More accurate, tracks requests continuously\n3. **Token Bucket**: Allows bursts up to a limit\n4. **Leaky Bucket**: Processes requests at a constant rate\n\n**Configuration Options:**\n\n- **windowMs**: Time window in milliseconds\n- **max**: Maximum requests per window\n- **message**: Custom error message\n- **statusCode**: HTTP status code for rate limit exceeded\n- **keyGenerator**: Custom logic to identify clients',
    codeExample: `const express = require('express');
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

// Apply general limiter to all routes
app.use(generalLimiter);

// Apply strict limiter to auth routes
app.use('/auth/', authLimiter);

app.post('/auth/login', (req, res) => {
  res.json({ message: 'Login successful' });
});

app.listen(3000);`,
    priority: null
  },
  {
    id: 153,
    category: 'Express.js',
    question: 'How to structure a large Express application?',
    answer: 'Large Express applications should follow a modular architecture with separation of concerns: routes, controllers, services, models, middleware, and configuration. This improves maintainability, testability, and scalability.',
    explanation: '**Project Structure:**\n\n```\nsrc/\n├── config/          # Configuration files\n├── controllers/     # Request/response handling\n├── routes/          # Route definitions\n├── services/        # Business logic\n├── models/          # Data models/schemas\n├── middleware/      # Custom middleware\n├── utils/           # Helper functions\n├── validators/      # Input validation\n└── app.js           # App setup\n```\n\n**Separation of Concerns:**\n\n• **Routes**: Define endpoints and map to controllers\n• **Controllers**: Handle HTTP requests/responses\n• **Services**: Contain business logic\n• **Models**: Define data structure and database operations\n• **Middleware**: Cross-cutting concerns (auth, logging, etc.)\n\n**Best Practices:**\n\n- Keep routes thin (delegate to controllers)\n- Keep controllers thin (delegate to services)\n- Use dependency injection for testability\n- Centralize error handling\n- Use environment variables for configuration\n- Implement proper logging\n- Write unit and integration tests\n- Document APIs (Swagger/OpenAPI)',
    codeExample: `// app.js - Main application file
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
};`,
    priority: null
  },
  {
    id: 154,
    category: 'AWS',
    question: 'Explain the difference between S3 Standard, S3 Intelligent-Tiering, and S3 Glacier.',
    answer: 'S3 Standard is for frequently accessed data, S3 Intelligent-Tiering automatically moves data between tiers based on access patterns, and S3 Glacier is for long-term archival with retrieval times from minutes to hours.',
    explanation: '**S3 Storage Classes Comparison:**\n\n**S3 Standard:**\n- High durability (99.999999999%)\n- Low latency, high throughput\n- For frequently accessed data\n- Cost: Higher storage, lower retrieval\n- Use case: Active websites, mobile apps\n\n**S3 Intelligent-Tiering:**\n- Automatically moves objects between tiers\n- Monitors access patterns\n- No retrieval fees within same tier\n- Cost-effective for unpredictable access\n- Use case: Data with unknown access patterns\n\n**S3 Glacier Instant Retrieval:**\n- Millisecond retrieval\n- Lower storage cost than Standard\n- Minimum 90-day storage\n- Use case: Rarely accessed data needing instant access\n\n**S3 Glacier Flexible Retrieval:**\n- Retrieval in minutes to hours\n- Very low storage cost\n- Minimum 90-day storage\n- Use case: Backups, disaster recovery\n\n**S3 Glacier Deep Archive:**\n- Lowest cost option\n- Retrieval in 12+ hours\n- Minimum 180-day storage\n- Use case: Long-term compliance archives',
    codeExample: `// S3 lifecycle policy example
{
  "Rules": [
    {
      "ID": "MoveToInfrequentAccess",
      "Status": "Enabled",
      "Filter": { "Prefix": "logs/" },
      "Transitions": [
        {
          "Days": 30,
          "StorageClass": "STANDARD_IA"
        },
        {
          "Days": 90,
          "StorageClass": "GLACIER"
        },
        {
          "Days": 365,
          "StorageClass": "DEEP_ARCHIVE"
        }
      ],
      "Expiration": {
        "Days": 730
      }
    }
  ]
}

// Using S3 SDK with different storage classes
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

// Upload to Standard
await s3.putObject({
  Bucket: 'my-bucket',
  Key: 'frequent-access/file.txt',
  Body: data,
  StorageClass: 'STANDARD'
}).promise();

// Upload to Glacier
await s3.putObject({
  Bucket: 'my-bucket',
  Key: 'archive/file.txt',
  Body: data,
  StorageClass: 'GLACIER'
}).promise();`,
    priority: null
  },
  {
    id: 155,
    category: 'AWS',
    question: 'What is Amazon VPC and how does it work?',
    answer: 'Amazon VPC (Virtual Private Cloud) lets you provision a logically isolated section of AWS where you can launch resources in a virtual network you define. It provides complete control over your virtual networking environment.',
    explanation: '**VPC Components:**\n\n1. **Subnets**: Segments of VPC IP address range\n   - Public subnets: Have route to Internet Gateway\n   - Private subnets: No direct internet access\n\n2. **Route Tables**: Define network traffic routing\n   - Control where traffic goes\n   - Associated with subnets\n\n3. **Internet Gateway (IGW)**: Enables internet access\n   - Connects VPC to internet\n   - Required for public subnets\n\n4. **NAT Gateway**: Allows private instances to access internet\n   - Outbound-only internet access\n   - Protects private resources\n\n5. **Security Groups**: Instance-level firewall\n   - Stateful (return traffic allowed)\n   - Attached to EC2 instances\n\n6. **Network ACLs**: Subnet-level firewall\n   - Stateless (must allow return traffic)\n   - Additional security layer\n\n7. **VPC Peering**: Connect two VPCs\n   - Private communication between VPCs\n   - Same or different AWS accounts\n\n**Best Practices:**\n- Use private subnets for databases\n- Implement least privilege security groups\n- Use VPC Flow Logs for monitoring\n- Enable VPC endpoints for AWS services',
    codeExample: `// Terraform: Create VPC with public and private subnets
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true
  
  tags = {
    Name = "main-vpc"
  }
}

# Public Subnet
resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true
  
  tags = {
    Name = "public-subnet"
  }
}

# Private Subnet
resource "aws_subnet" "private" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "us-east-1a"
  
  tags = {
    Name = "private-subnet"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id
  
  tags = {
    Name = "main-igw"
  }
}

# Route table for public subnet
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
  
  tags = {
    Name = "public-rt"
  }
}`,
    priority: null
  },
  {
    id: 156,
    category: 'AWS',
    question: 'What is AWS IAM and explain its key components?',
    answer: 'AWS IAM (Identity and Access Management) enables secure control of access to AWS services and resources. Key components include Users, Groups, Roles, Policies, and Permission Boundaries.',
    explanation: '**IAM Components:**\n\n1. **Users**: Individual identities with credentials\n   - Programmatic access (access keys)\n   - Console access (password)\n\n2. **Groups**: Collections of users\n   - Apply permissions to multiple users\n   - Simplify permission management\n\n3. **Roles**: Temporary credentials for services/users\n   - Used by EC2, Lambda, cross-account access\n   - No long-term credentials\n   - Assumed when needed\n\n4. **Policies**: JSON documents defining permissions\n   - Managed policies (AWS-managed or customer-managed)\n   - Inline policies (embedded in identity)\n   - Follow principle of least privilege\n\n5. **Permission Boundaries**: Maximum permissions\n   - Limit what managed policies can grant\n   - Defense in depth\n\n**Best Practices:**\n- Never use root account for daily tasks\n- Enable MFA for all users\n- Use roles instead of access keys\n- Regularly rotate credentials\n- Review permissions periodically\n- Use AWS Organizations for multi-account',
    codeExample: `// IAM Policy Example: S3 Read-Only Access
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::my-bucket",
        "arn:aws:s3:::my-bucket/*"
      ]
    }
  ]
}

// IAM Role Trust Policy (for Lambda)
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}

// AWS CLI: Create user and attach policy
aws iam create-user --user-name developer
aws iam attach-user-policy \\
  --user-name developer \\
  --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess

// Assume role programmatically
const AWS = require('aws-sdk');
const sts = new AWS.STS();

async function assumeRole() {
  const params = {
    RoleArn: 'arn:aws:iam::123456789012:role/MyRole',
    RoleSessionName: 'session1'
  };
  
  const credentials = await sts.assumeRole(params).promise();
  
  // Use temporary credentials
  const s3 = new AWS.S3({
    accessKeyId: credentials.Credentials.AccessKeyId,
    secretAccessKey: credentials.Credentials.SecretAccessKey,
    sessionToken: credentials.Credentials.SessionToken
  });
  
  return s3;
}`,
    priority: null
  },
  {
    id: 157,
    category: 'AWS',
    question: 'Explain AWS ECS vs EKS vs Fargate.',
    answer: 'ECS is AWS native container orchestration, EKS is managed Kubernetes, and Fargate is serverless compute engine for containers. Choose based on orchestration preference and infrastructure management needs.',
    explanation: '**Container Services Comparison:**\n\n**Amazon ECS (Elastic Container Service):**\n- AWS-native container orchestration\n- Simpler setup and management\n- Tight AWS integration\n- Two launch types: EC2 and Fargate\n- Best for: Teams already using AWS\n\n**Amazon EKS (Elastic Kubernetes Service):**\n- Managed Kubernetes service\n- Industry-standard orchestration\n- Portable across clouds\n- Larger ecosystem and community\n- Best for: Multi-cloud, existing K8s expertise\n\n**AWS Fargate:**\n- Serverless compute for containers\n- No server management\n- Pay per resource usage\n- Works with both ECS and EKS\n- Best for: Variable workloads, no ops overhead\n\n**Decision Factors:**\n- Team expertise (Kubernetes vs AWS-native)\n- Portability requirements\n- Operational overhead tolerance\n- Cost considerations\n- Existing infrastructure',
    codeExample: `# ECS Task Definition (JSON)
{
  "family": "my-app",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "containerDefinitions": [
    {
      "name": "web",
      "image": "nginx:latest",
      "portMappings": [
        {
          "containerPort": 80,
          "protocol": "tcp"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/my-app",
          "awslogs-region": "us-east-1"
        }
      }
    }
  ]
}

# EKS Cluster Creation (eksctl)
eksctl create cluster \\
  --name my-cluster \\
  --version 1.28 \\
  --region us-east-1 \\
  --nodegroup-name standard-workers \\
  --node-type t3.medium \\
  --nodes 3

# Kubernetes Deployment YAML (for EKS)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: web
        image: nginx:latest
        ports:
        - containerPort: 80`,
    priority: null
  },
  {
    id: 158,
    category: 'AWS',
    question: 'What is Amazon EC2 and what are the different instance types?',
    answer: 'Amazon EC2 (Elastic Compute Cloud) provides resizable compute capacity in the cloud. Instance types are optimized for different use cases: general purpose, compute optimized, memory optimized, storage optimized, and accelerated computing.',
    explanation: '**EC2 Instance Families:**\n\n**General Purpose (T, M):**\n- Balanced compute, memory, networking\n- T-series: Burstable performance (T3, T4g)\n- M-series: Current generation (M5, M6i, M7g)\n- Use case: Web servers, small databases\n\n**Compute Optimized (C):**\n- High performance processors\n- C5, C6i, C7g instances\n- Use case: Batch processing, media transcoding, HPC\n\n**Memory Optimized (R, X):**\n- Large memory for memory-intensive apps\n- R5, R6g, X2idn instances\n- Use case: In-memory databases, real-time analytics\n\n**Storage Optimized (I, D, H):**\n- High sequential read/write access\n- I3: NVMe SSD storage\n- D3: Dense HDD storage\n- Use case: NoSQL databases, data warehousing\n\n**Accelerated Computing (P, G, F):**\n- Hardware accelerators (GPUs, FPGAs)\n- P4/P5: ML training\n- G5/G6: Graphics, gaming\n- Use case: Machine learning, graphics rendering\n\n**Pricing Models:**\n- On-Demand: Pay by hour/second\n- Reserved: 1-3 year commitment (up to 72% savings)\n- Spot: Unused capacity (up to 90% savings)\n- Savings Plans: Flexible pricing model\n\n**Key Features:**\n- Auto Scaling groups\n- Elastic Load Balancing\n- Security groups & key pairs\n- EBS volumes for persistent storage',
    codeExample: `# Terraform: Launch EC2 Instance
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"  # Amazon Linux 2
  instance_type = "t3.micro"
  key_name      = "my-key-pair"
  
  vpc_security_group_ids = [aws_security_group.web_sg.id]
  subnet_id              = aws_subnet.public.id
  
  root_block_device {
    volume_size = 20
    volume_type = "gp3"
    encrypted   = true
  }
  
  tags = {
    Name        = "web-server"
    Environment = "production"
  }
  
  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              yum install -y httpd
              systemctl start httpd
              systemctl enable httpd
              echo "<h1>Hello from EC2</h1>" > /var/www/html/index.html
              EOF
}

# Security Group
resource "aws_security_group" "web_sg" {
  name        = "web-sg"
  description = "Allow HTTP and SSH"
  vpc_id      = aws_vpc.main.id
  
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/8"]  # Restrict SSH
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Auto Scaling Group
resource "aws_autoscaling_group" "web_asg" {
  desired_capacity     = 2
  max_size             = 5
  min_size             = 1
  vpc_zone_identifier  = [aws_subnet.public.id, aws_subnet.public2.id]
  launch_template      = aws_launch_template.web_lt.id
  
  tag {
    key                 = "Name"
    value               = "web-asg-instance"
    propagate_at_launch = true
  }
}

# AWS CLI commands
# List instance types
aws ec2 describe-instance-types --query "InstanceTypes[*].InstanceType"

# Start/Stop instance
aws ec2 start-instances --instance-ids i-1234567890abcdef0
aws ec2 stop-instances --instance-ids i-1234567890abcdef0

# Create key pair
aws ec2 create-key-pair --key-name my-key --query 'KeyMaterial' --output text > my-key.pem
chmod 400 my-key.pem`,
    priority: null
  },
  {
    id: 159,
    category: 'AWS',
    question: 'Explain Amazon DynamoDB and its key features.',
    answer: 'DynamoDB is a fully managed NoSQL database service that provides fast and predictable performance with seamless scalability. Key features include automatic scaling, built-in security, backup/restore, and global tables for multi-region deployment.',
    explanation: '**DynamoDB Overview:**\n\n**Data Model:**\n- Tables: Collection of items\n- Items: Individual records (like rows)\n- Attributes: Key-value pairs (like columns)\n- Primary Key: Partition key or partition+sort key\n\n**Key Features:**\n1. **Automatic Scaling**: Adjusts capacity automatically\n2. **Single-digit millisecond latency**\n3. **Built-in Security**: IAM integration, encryption at rest\n4. **Backup & Restore**: Point-in-time recovery\n5. **Global Tables**: Multi-region replication\n6. **Streams**: Capture data changes in real-time\n7. **Transactions**: ACID transactions across items\n\n**Access Patterns:**\n- Query: Retrieve items by primary key\n- Scan: Read entire table (expensive, avoid)\n- Global Secondary Indexes (GSI): Alternative query patterns\n- Local Secondary Indexes (LSI): Same partition key, different sort key\n\n**Capacity Modes:**\n- **Provisioned**: Set read/write capacity units\n- **On-Demand**: Pay per request (auto-scaling)\n\n**Best Practices:**\n- Design for your access patterns\n- Use sparse indexes\n- Implement exponential backoff for retries\n- Use batch operations for efficiency\n- Enable PITR for production\n- Monitor with CloudWatch metrics',
    codeExample: `// DynamoDB Operations (Node.js with AWS SDK v3)
const { DynamoDBClient, PutItemCommand, GetItemCommand, QueryCommand } = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');

const client = new DynamoDBClient({ region: 'us-east-1' });

// Create item
async function createUser(user) {
  const params = {
    TableName: 'Users',
    Item: marshall({
      userId: user.userId,        // Partition key
      email: user.email,          // Sort key (if composite key)
      name: user.name,
      age: user.age,
      createdAt: new Date().toISOString()
    })
  };
  
  await client.send(new PutItemCommand(params));
}

// Get item
async function getUser(userId) {
  const params = {
    TableName: 'Users',
    Key: marshall({ userId })
  };
  
  const result = await client.send(new GetItemCommand(params));
  return unmarshall(result.Item);
}

// Query with index
async function getUsersByAge(age) {
  const params = {
    TableName: 'Users',
    IndexName: 'AgeIndex',  // GSI
    KeyConditionExpression: 'age = :age',
    ExpressionAttributeValues: {
      ':age': { N: age.toString() }
    }
  };
  
  const result = await client.send(new QueryCommand(params));
  return result.Items.map(item => unmarshall(item));
}

// Batch write
async function batchCreateUsers(users) {
  const params = {
    RequestItems: {
      Users: users.map(user => ({
        PutRequest: {
          Item: marshall(user)
        }
      }))
    }
  };
  
  await client.send(new BatchWriteItemCommand(params));
}

// Transaction
const { TransactWriteItemsCommand } = require('@aws-sdk/client-dynamodb');

async function transferFunds(fromAccount, toAccount, amount) {
  const params = {
    TransactItems: [
      {
        Update: {
          TableName: 'Accounts',
          Key: marshall({ accountId: fromAccount }),
          UpdateExpression: 'SET balance = balance - :amount',
          ExpressionAttributeValues: { ':amount': { N: amount.toString() } },
          ConditionExpression: 'balance >= :amount'
        }
      },
      {
        Update: {
          TableName: 'Accounts',
          Key: marshall({ accountId: toAccount }),
          UpdateExpression: 'SET balance = balance + :amount',
          ExpressionAttributeValues: { ':amount': { N: amount.toString() } }
        }
      }
    ]
  };
  
  await client.send(new TransactWriteItemsCommand(params));
}

// Terraform: Create DynamoDB Table
resource "aws_dynamodb_table" "users" {
  name         = "Users"
  billing_mode = "PAY_PER_REQUEST"  # On-demand
  hash_key     = "userId"
  range_key    = "email"
  
  attribute {
    name = "userId"
    type = "S"
  }
  
  attribute {
    name = "email"
    type = "S"
  }
  
  attribute {
    name = "age"
    type = "N"
  }
  
  global_secondary_index {
    name            = "AgeIndex"
    hash_key        = "age"
    projection_type = "ALL"
  }
  
  point_in_time_recovery {
    enabled = true
  }
  
  tags = {
    Environment = "production"
  }
}`,
    priority: null
  },
  {
    id: 160,
    category: 'AWS',
    question: 'What is AWS API Gateway and how does it work?',
    answer: 'API Gateway is a fully managed service for creating, publishing, maintaining, monitoring, and securing APIs at any scale. It acts as a front door for applications to access backend services like Lambda, EC2, or other AWS services.',
    explanation: '**API Gateway Features:**\n\n**API Types:**\n1. **REST APIs**: Traditional RESTful APIs\n   - Full feature set\n   - Request/response transformation\n   - Multiple integrations\n\n2. **HTTP APIs**: Lightweight, lower latency\n   - Faster than REST APIs\n   - Lower cost\n   - JWT/OIDC authorization\n\n3. **WebSocket APIs**: Real-time bidirectional communication\n   - Chat applications\n   - Live notifications\n   - Streaming data\n\n**Key Capabilities:**\n- **Request/Response Transformation**: Map templates\n- **Authentication**: IAM, Cognito, Lambda authorizers\n- **Rate Limiting & Throttling**: Protect backends\n- **Caching**: Cache responses for better performance\n- **Monitoring**: CloudWatch integration\n- **Versioning & Stages**: Dev, staging, production\n- **Custom Domains**: Use your own domain\n- **CORS Support**: Cross-origin requests\n\n**Integration Types:**\n- Lambda functions\n- HTTP endpoints\n- AWS services (DynamoDB, SQS, etc.)\n- Mock integrations\n\n**Best Practices:**\n- Use stages for environments\n- Implement proper error handling\n- Enable caching for frequently accessed data\n- Use API keys for usage plans\n- Monitor with CloudWatch\n- Implement request validation',
    codeExample: `// Serverless Framework: API Gateway + Lambda
service: my-api

provider:
  name: aws
  runtime: nodejs18.x
  stage: \${opt:stage, 'dev'}
  region: us-east-1

functions:
  getUser:
    handler: handlers.getUser
    events:
      - http:
          path: users/{id}
          method: get
          cors: true
          authorizer: aws_iam
  
  createUser:
    handler: handlers.createUser
    events:
      - http:
          path: users
          method: post
          cors: true
          request:
            schemas:
              application/json: \${file(models/user.json)}

// Lambda Handler
exports.getUser = async (event) => {
  const userId = event.pathParameters.id;
  
  try {
    const user = await fetchUserFromDB(userId);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(user)
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'User not found' })
    };
  }
};

// Terraform: API Gateway
resource "aws_apigatewayv2_api" "main" {
  name          = "my-api"
  protocol_type = "HTTP"
  
  cors_configuration {
    allow_origins = ["*"]
    allow_methods = ["GET", "POST", "PUT", "DELETE"]
    allow_headers = ["Content-Type", "Authorization"]
  }
}

resource "aws_apigatewayv2_route" "get_user" {
  api_id    = aws_apigatewayv2_api.main.id
  route_key = "GET /users/{id}"
  target    = "integrations/\${aws_apigatewayv2_integration.get_user.id}"
}

resource "aws_apigatewayv2_integration" "get_user" {
  api_id             = aws_apigatewayv2_api.main.id
  integration_type   = "AWS_PROXY"
  integration_uri    = aws_lambda_function.get_user.invoke_arn
  integration_method = "POST"
}

// Usage Plan & API Key
resource "aws_api_gateway_usage_plan" "main" {
  name = "basic-plan"
  
  api_stages {
    api_id = aws_apigateway_rest_api.main.id
    stage  = aws_apigateway_stage.prod.stage_name
  }
  
  throttle_settings {
    burst_limit = 100
    rate_limit  = 50
  }
}

resource "aws_api_gateway_api_key" "main" {
  name = "my-api-key"
}

resource "aws_api_gateway_usage_plan_key" "main" {
  key_id        = aws_api_gateway_api_key.main.id
  key_type      = "API_KEY"
  usage_plan_id = aws_api_gateway_usage_plan.main.id
}`,
    priority: null
  },
  {
    id: 161,
    category: 'AWS',
    question: 'Explain AWS CloudFormation and Infrastructure as Code (IaC).',
    answer: 'CloudFormation is AWS IaC service that lets you model and provision AWS resources using templates (JSON/YAML). It enables version-controlled, repeatable, and automated infrastructure deployment.',
    explanation: '**CloudFormation Concepts:**\n\n**Template Structure:**\n1. **AWSTemplateFormatVersion**: Template version\n2. **Description**: Optional description\n3. **Parameters**: Input values for customization\n4. **Mappings**: Static key-value pairs\n5. **Conditions**: Conditional resource creation\n6. **Resources**: AWS resources to create (required)\n7. **Outputs**: Values returned after stack creation\n\n**Key Benefits:**\n- **Automation**: Deploy entire infrastructure with one command\n- **Version Control**: Templates in Git\n- **Repeatability**: Consistent deployments\n- **Documentation**: Template serves as documentation\n- **Dependency Management**: Automatic resource ordering\n- **Rollback**: Automatic rollback on failure\n- **Change Sets**: Preview changes before applying\n\n**Stack Operations:**\n- Create: Provision new resources\n- Update: Modify existing resources\n- Delete: Remove all resources\n- Drift Detection: Find manual changes\n\n**Best Practices:**\n- Use parameters for environment-specific values\n- Implement nested stacks for modularity\n- Use outputs for cross-stack references\n- Enable termination protection for production\n- Use change sets for safe updates\n- Tag resources for cost tracking\n- Store templates in S3 or CodeCommit',
    codeExample: `# CloudFormation Template (YAML)
AWSTemplateFormatVersion: '2010-09-09'
Description: 'Web Application Stack'

Parameters:
  Environment:
    Type: String
    AllowedValues:
      - dev
      - staging
      - prod
    Default: dev
  
  InstanceType:
    Type: String
    Default: t3.micro
    AllowedValues:
      - t3.micro
      - t3.small
      - t3.medium

Mappings:
  EnvironmentConfig:
    dev:
      InstanceCount: 1
      MinSize: 1
      MaxSize: 2
    prod:
      InstanceCount: 3
      MinSize: 2
      MaxSize: 10

Conditions:
  IsProduction: !Equals [!Ref Environment, 'prod']

Resources:
  VPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: 10.0.0.0/16
      EnableDnsSupport: true
      EnableDnsHostnames: true
      Tags:
        - Key: Name
          Value: !Sub '\${AWS::StackName}-vpc'

  PublicSubnet:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: 10.0.1.0/24
      AvailabilityZone: !Select [0, !GetAZs '']
      MapPublicIpOnLaunch: true

  SecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: 'Web server security group'
      VpcId: !Ref VPC
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 80
          ToPort: 80
          CidrIp: 0.0.0.0/0
        - IpProtocol: tcp
          FromPort: 443
          ToPort: 443
          CidrIp: 0.0.0.0/0

  LaunchTemplate:
    Type: AWS::EC2::LaunchTemplate
    Properties:
      LaunchTemplateName: !Sub '\${AWS::StackName}-lt'
      LaunchTemplateData:
        InstanceType: !Ref InstanceType
        ImageId: !FindInMap [AmiMap, !Ref 'AWS::Region', AMI]
        SecurityGroupIds:
          - !Ref SecurityGroup
        UserData: !Base64 |
          #!/bin/bash
          yum update -y
          yum install -y httpd
          systemctl start httpd

  AutoScalingGroup:
    Type: AWS::AutoScaling::AutoScalingGroup
    Properties:
      VPCZoneIdentifier:
        - !Ref PublicSubnet
      LaunchTemplate:
        LaunchTemplateId: !Ref LaunchTemplate
        Version: !GetAtt LaunchTemplate.LatestVersionNumber
      MinSize: !FindInMap [EnvironmentConfig, !Ref Environment, MinSize]
      MaxSize: !FindInMap [EnvironmentConfig, !Ref Environment, MaxSize]
      DesiredCapacity: !FindInMap [EnvironmentConfig, !Ref Environment, InstanceCount]
      Tags:
        - Key: Name
          Value: !Sub '\${AWS::StackName}-instance'
          PropagateAtLaunch: true

Outputs:
  VPCId:
    Description: 'VPC ID'
    Value: !Ref VPC
    Export:
      Name: !Sub '\${AWS::StackName}-VPCId'
  
  WebsiteURL:
    Description: 'Application URL'
    Value: !Sub 'http://\${AutoScalingGroup.DNSName}'

# Deploy commands
# Create stack
aws cloudformation create-stack \\
  --stack-name my-web-app \\
  --template-body file://template.yaml \\
  --parameters ParameterKey=Environment,ParameterValue=prod \\
  --capabilities CAPABILITY_IAM

# Update stack
aws cloudformation update-stack \\
  --stack-name my-web-app \\
  --template-body file://template.yaml

# Create change set
aws cloudformation create-change-set \\
  --stack-name my-web-app \\
  --change-set-name my-changes \\
  --template-body file://template.yaml

# Delete stack
aws cloudformation delete-stack --stack-name my-web-app`,
    priority: null
  },
  {
    id: 162,
    category: 'AWS',
    question: 'What is Amazon CloudWatch and how do you use it for monitoring?',
    answer: 'CloudWatch is a monitoring and observability service that collects metrics, logs, and events from AWS resources and applications. It provides dashboards, alarms, automated actions, and log insights.',
    explanation: '**CloudWatch Components:**\n\n**1. Metrics:**\n- Numerical data about resources\n- Default metrics for AWS services\n- Custom metrics for applications\n- Stored for 15 months\n- Granularity: 1 minute (standard), 1 second (high-resolution)\n\n**2. Logs:**\n- Centralized log management\n- Log groups and log streams\n- CloudWatch Logs Insights for querying\n- Subscription filters for real-time processing\n- Retention policies (1 day to never expire)\n\n**3. Alarms:**\n- Trigger actions based on thresholds\n- States: OK, ALARM, INSUFFICIENT_DATA\n- Actions: SNS notifications, Auto Scaling, EC2 actions\n- Composite alarms for complex conditions\n\n**4. Dashboards:**\n- Visualize metrics in real-time\n- Custom widgets\n- Share across teams\n- Auto-refresh\n\n**5. Events (EventBridge):**\n- Respond to state changes\n- Scheduled events\n- Route events to targets\n\n**Best Practices:**\n- Set up alarms for critical metrics\n- Use consistent naming conventions\n- Implement log retention policies\n- Create operational dashboards\n- Use Insights for log analysis\n- Monitor costs with billing alarms',
    codeExample: `// Publish Custom Metric (Node.js)
const { CloudWatchClient, PutMetricDataCommand } = require('@aws-sdk/client-cloudwatch');

const cloudwatch = new CloudWatchClient({ region: 'us-east-1' });

async function publishMetric(metricName, value, unit = 'Count') {
  const params = {
    Namespace: 'MyApp/Production',
    MetricData: [{
      MetricName: metricName,
      Dimensions: [
        { Name: 'Service', Value: 'UserService' },
        { Name: 'Environment', Value: 'production' }
      ],
      Value: value,
      Unit: unit,
      Timestamp: new Date()
    }]
  };
  
  await cloudwatch.send(new PutMetricDataCommand(params));
}

// Usage
await publishMetric('UserSignupCount', 1);
await publishMetric('APIResponseTime', 250, 'Milliseconds');
await publishMetric('ErrorRate', 5, 'Percent');

// CloudWatch Logs (Node.js with Winston)
const winston = require('winston');
const CloudWatchTransport = require('winston-cloudwatch');

const logger = winston.createLogger({
  transports: [
    new CloudWatchTransport({
      logGroupName: '/myapp/production',
      logStreamName: 'api-server',
      awsRegion: 'us-east-1'
    })
  ]
});

logger.info('User logged in', { userId: '123' });
logger.error('Database connection failed', { error: err.message });

// Terraform: CloudWatch Alarm
resource "aws_cloudwatch_metric_alarm" "high_cpu" {
  alarm_name          = "high-cpu-utilization"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = 300
  statistic           = "Average"
  threshold           = 80
  alarm_description   = "This metric monitors ec2 cpu utilization"
  
  dimensions = {
    InstanceId = aws_instance.web.id
  }
  
  alarm_actions = [aws_sns_topic.alerts.arn]
  ok_actions    = [aws_sns_topic.alerts.arn]
}

resource "aws_cloudwatch_log_group" "app_logs" {
  name              = "/myapp/production"
  retention_in_days = 30
  
  tags = {
    Environment = "production"
  }
}

# CloudWatch Logs Insights Query
# Find errors in last hour
fields @timestamp, @message
| filter @message like /ERROR/
| sort @timestamp desc
| limit 100

# Average response time by endpoint
stats avg(duration) as avgDuration by endpoint
| sort avgDuration desc

# Create dashboard JSON
{
  "widgets": [
    {
      "type": "metric",
      "properties": {
        "metrics": [
          ["AWS/EC2", "CPUUtilization", "InstanceId", "i-1234567890"]
        ],
        "period": 300,
        "stat": "Average",
        "region": "us-east-1",
        "title": "EC2 CPU Utilization"
      }
    }
  ]
}`,
    priority: null
  },
  {
    id: 163,
    category: 'AWS',
    question: 'Explain AWS SQS and SNS messaging services.',
    answer: 'SQS (Simple Queue Service) is a message queue for decoupling applications. SNS (Simple Notification Service) is a pub/sub messaging service for fan-out to multiple subscribers. Often used together for scalable, distributed systems.',
    explanation: '**Amazon SQS (Queue Service):**\n\n**Queue Types:**\n1. **Standard Queues**:\n   - Nearly unlimited throughput\n   - Best-effort ordering\n   - At-least-once delivery\n   - Duplicate possible\n\n2. **FIFO Queues**:\n   - Exactly-once processing\n   - Strict ordering\n   - Limited throughput (300 msgs/sec)\n   - Message group support\n\n**Key Features:**\n- Visibility timeout (prevent duplicate processing)\n- Dead-letter queues (failed messages)\n- Long polling (reduce empty receives)\n- Delay queues (schedule future processing)\n- Message attributes\n\n**Amazon SNS (Notification Service):**\n\n**Subscription Types:**\n- HTTP/HTTPS endpoints\n- Email/SMS\n- SQS queues\n- Lambda functions\n- Mobile push notifications\n\n**Features:**\n- Fan-out to multiple subscribers\n- Message filtering\n- Content-based filtering\n- FIFO topics\n- Message deduplication\n\n**Common Pattern: SNS + SQS**\n- SNS fans out to multiple SQS queues\n- Each subscriber gets own queue\n- Decoupled, scalable architecture\n\n**Best Practices:**\n- Use DLQs for error handling\n- Implement idempotent consumers\n- Set appropriate visibility timeouts\n- Use long polling to reduce costs\n- Monitor queue depth and age',
    codeExample: `// SQS Producer (Node.js)
const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs');
const sqs = new SQSClient({ region: 'us-east-1' });

async function sendToQueue(messageBody) {
  const params = {
    QueueUrl: 'https://sqs.us-east-1.amazonaws.com/123456789/my-queue',
    MessageBody: JSON.stringify(messageBody),
    DelaySeconds: 0,
    MessageAttributes: {
      'MessageType': {
        DataType: 'String',
        StringValue: 'OrderCreated'
      }
    }
  };
  
  const result = await sqs.send(new SendMessageCommand(params));
  return result.MessageId;
}

// SQS Consumer
const { ReceiveMessageCommand, DeleteMessageCommand } = require('@aws-sdk/client-sqs');

async function processMessages() {
  const params = {
    QueueUrl: 'https://sqs.us-east-1.amazonaws.com/123456789/my-queue',
    MaxNumberOfMessages: 10,
    WaitTimeSeconds: 20,  // Long polling
    VisibilityTimeout: 30
  };
  
  const result = await sqs.send(new ReceiveMessageCommand(params));
  
  if (result.Messages) {
    for (const message of result.Messages) {
      try {
        const body = JSON.parse(message.Body);
        await processOrder(body);  // Process message
        
        // Delete after successful processing
        await sqs.send(new DeleteMessageCommand({
          QueueUrl: params.QueueUrl,
          ReceiptHandle: message.ReceiptHandle
        }));
      } catch (error) {
        console.error('Processing failed:', error);
        // Message will become visible again after visibility timeout
      }
    }
  }
}

// SNS Publisher
const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns');
const sns = new SNSClient({ region: 'us-east-1' });

async function publishToTopic(message, subject) {
  const params = {
    TopicArn: 'arn:aws:sns:us-east-1:123456789:my-topic',
    Message: JSON.stringify(message),
    Subject: subject,
    MessageAttributes: {
      'EventType': {
        DataType: 'String',
        StringValue: 'order.created'
      }
    }
  };
  
  await sns.send(new PublishCommand(params));
}

// SNS with Filter Policy
// Only receive messages where eventType = 'order.created'
{
  "eventType": {
    "type": "String",
    "value": ["order.created"]
  }
}

// Terraform: SQS Queue with DLQ
resource "aws_sqs_queue" "dead_letter" {
  name = "orders-dlq"
  message_retention_seconds = 1209600  # 14 days
}

resource "aws_sqs_queue" "orders" {
  name                       = "orders"
  visibility_timeout_seconds = 30
  message_retention_seconds  = 345600  # 4 days
  
  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.dead_letter.arn
    maxReceiveCount     = 3
  })
}

# SNS Topic with SQS subscriptions
resource "aws_sns_topic" "orders" {
  name = "orders-topic"
}

resource "aws_sns_topic_subscription" "order_processor" {
  topic_arn = aws_sns_topic.orders.arn
  protocol  = "sqs"
  endpoint  = aws_sqs_queue.orders.arn
}

# Lambda triggered by SQS
resource "aws_lambda_event_source_mapping" "order_processor" {
  event_source_arn = aws_sqs_queue.orders.arn
  function_name    = aws_lambda_function.order_processor.arn
  batch_size       = 10
}

// AWS CLI commands
# Send message to SQS
aws sqs send-message \\
  --queue-url https://sqs.us-east-1.amazonaws.com/123456789/my-queue \\
  --message-body '{"orderId": "123"}'

# Publish to SNS
aws sns publish \\
  --topic-arn arn:aws:sns:us-east-1:123456789:my-topic \\
  --message '{"event": "order.created"}' \\
  --subject "New Order"

# Get queue attributes
aws sqs get-queue-attributes \\
  --queue-url https://sqs.us-east-1.amazonaws.com/123456789/my-queue \\
  --attribute-names All`,
    priority: null
  },
  {
    id: 164,
    category: 'AWS',
    question: 'What is AWS Elastic Load Balancing (ELB) and what are the different types?',
    answer: 'ELB automatically distributes incoming traffic across multiple targets. Three types: Application Load Balancer (Layer 7), Network Load Balancer (Layer 4), and Gateway Load Balancer (for third-party virtual appliances).',
    explanation: '**Load Balancer Types:**\n\n**1. Application Load Balancer (ALB):**\n- Layer 7 (HTTP/HTTPS)\n- Advanced request routing\n- Path-based routing\n- Host-based routing\n- WebSocket support\n- Target groups (EC2, Lambda, IP)\n- Best for: Web applications, microservices\n\n**2. Network Load Balancer (NLB):**\n- Layer 4 (TCP/UDP/TLS)\n- Ultra-high performance\n- Millions of requests per second\n- Static IP addresses\n- Preserve source IP\n- Best for: TCP/UDP traffic, gaming, IoT\n\n**3. Gateway Load Balancer (GWLB):**\n- Layer 3/4\n- Deploy third-party appliances\n- Firewall, intrusion detection\n- Single entry/exit point\n- Best for: Security appliances\n\n**Classic Load Balancer (CLB):**\n- Legacy (use ALB/NLB instead)\n- Layer 4 and basic Layer 7\n\n**Key Features:**\n- Health checks\n- SSL/TLS termination\n- Sticky sessions\n- Cross-zone load balancing\n- Integration with Auto Scaling\n- CloudWatch metrics\n\n**Best Practices:**\n- Use ALB for HTTP/HTTPS traffic\n- Use NLB for TCP/UDP traffic\n- Enable access logs\n- Configure health checks properly\n- Use multiple AZs for HA\n- Implement WAF for security',
    codeExample: `# Terraform: Application Load Balancer
resource "aws_lb" "web" {
  name               = "web-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets            = [aws_subnet.public1.id, aws_subnet.public2.id]
  
  enable_deletion_protection = true
  
  tags = {
    Environment = "production"
  }
}

# Target Group
resource "aws_lb_target_group" "web" {
  name     = "web-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id
  
  health_check {
    enabled             = true
    path                = "/health"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 3
    unhealthy_threshold = 3
    matcher             = "200"
  }
}

# Listener
resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.web.arn
  port              = 80
  protocol          = "HTTP"
  
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.web.arn
  }
}

# HTTPS Listener with SSL
resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.web.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS-1-2-2017-01"
  certificate_arn   = aws_acm_certificate.cert.arn
  
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.web.arn
  }
}

# Path-based routing
resource "aws_lb_listener_rule" "api" {
  listener_arn = aws_lb_listener.https.arn
  priority     = 100
  
  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.api.arn
  }
  
  condition {
    path_pattern {
      values = ["/api/*"]
    }
  }
}

# Register targets
resource "aws_lb_target_group_attachment" "web1" {
  target_group_arn = aws_lb_target_group.web.arn
  target_id        = aws_instance.web1.id
  port             = 80
}

resource "aws_lb_target_group_attachment" "web2" {
  target_group_arn = aws_lb_target_group.web.arn
  target_id        = aws_instance.web2.id
  port             = 80
}

# Auto Scaling with ALB
resource "aws_autoscaling_group" "web" {
  vpc_zone_identifier = [aws_subnet.public1.id, aws_subnet.public2.id]
  target_group_arns   = [aws_lb_target_group.web.arn]
  
  # ... other ASG config
}

# AWS CLI commands
# Describe load balancers
aws elbv2 describe-load-balancers

# Describe target groups
aws elbv2 describe-target-groups

# Register targets
aws elbv2 register-targets \\
  --target-group-arn arn:aws:elasticloadbalancing:us-east-1:123456789:targetgroup/web-tg/abc123 \\
  --targets Id=i-1234567890 Id=i-0987654321

# Check target health
aws elbv2 describe-target-health \\
  --target-group-arn arn:aws:elasticloadbalancing:us-east-1:123456789:targetgroup/web-tg/abc123`,
    priority: null
  },
  {
    id: 165,
    category: 'AWS',
    question: 'Explain AWS Cognito for user authentication and authorization.',
    answer: 'Amazon Cognito provides user sign-up, sign-in, and access control for web and mobile apps. It has two main components: User Pools (user directory) and Identity Pools (AWS credentials for resources).',
    explanation: '**Cognito Components:**\n\n**1. User Pools:**\n- User directory and authentication\n- Sign-up and sign-in\n- Social identity providers (Google, Facebook, etc.)\n- Multi-factor authentication (MFA)\n- Password policies\n- Custom attributes\n- User profile management\n- Token-based (JWT)\n\n**2. Identity Pools (Federated Identities):**\n- Provide AWS credentials\n- Access AWS resources directly\n- Support for unauthenticated users\n- Integrate with User Pools\n- Role-based access control\n\n**Authentication Flow:**\n1. User signs in via app\n2. Cognito validates credentials\n3. Returns JWT tokens (ID, Access, Refresh)\n4. App uses tokens for API calls\n5. Tokens validated by backend/API Gateway\n\n**Key Features:**\n- Hosted UI for quick setup\n- Custom UI with SDKs\n- OAuth 2.0 and OpenID Connect\n- Adaptive authentication\n- Device tracking\n- User migration\n- Lambda triggers for customization\n\n**Best Practices:**\n- Use hosted UI for faster development\n- Implement MFA for security\n- Set appropriate token expiration\n- Use refresh tokens wisely\n- Validate tokens on backend\n- Monitor with CloudWatch\n- Implement proper logout',
    codeExample: `// Frontend: Sign Up (JavaScript with AWS Amplify)
import { Auth } from 'aws-amplify';

async function signUp(username, password, email) {
  try {
    const user = await Auth.signUp({
      username,
      password,
      attributes: {
        email,
        name: 'John Doe'
      }
    });
    console.log('Sign up successful:', user);
  } catch (error) {
    console.error('Sign up error:', error);
  }
}

// Confirm sign up with code
async function confirmSignUp(username, code) {
  await Auth.confirmSignUp(username, code);
}

// Sign In
async function signIn(username, password) {
  try {
    const user = await Auth.signIn(username, password);
    console.log('Signed in:', user);
    return user;
  } catch (error) {
    console.error('Sign in error:', error);
  }
}

// Get current user
async function currentUser() {
  const user = await Auth.currentAuthenticatedUser();
  const session = await Auth.currentSession();
  
  console.log('User:', user);
  console.log('ID Token:', session.getIdToken().getJwtToken());
  console.log('Access Token:', session.getAccessToken().getJwtToken());
  
  return user;
}

// Sign Out
async function signOut() {
  await Auth.signOut();
}

// Backend: Verify JWT Token (Node.js)
const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');

const poolId = 'us-east-1_abc123';
const region = 'us-east-1';
const issuer = 'https://cognito-idp.' + region + '.amazonaws.com/' + poolId;

async function verifyToken(token) {
  // Get JWKS from Cognito
  const pems = await getCognitoJWKS();
  
  return new Promise((resolve, reject) => {
    jwt.verify(token, pems, { issuer }, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}

// Express middleware for authentication
async function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = await verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Terraform: Cognito User Pool
resource "aws_cognito_user_pool" "main" {
  name = "my-app-users"
  
  auto_verified_attributes = ["email"]
  
  password_policy {
    minimum_length    = 8
    require_lowercase = true
    require_numbers   = true
    require_symbols   = true
    require_uppercase = true
  }
  
  mfa_configuration = "OPTIONAL"
  
  software_token_mfa_configuration {
    enabled = true
  }
  
  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }
  
  lambda_config {
    pre_sign_up = aws_lambda_function.pre_signup.arn
  }
}

# Identity Pool
resource "aws_cognito_identity_pool" "main" {
  identity_pool_name = "my-app-identity-pool"
  
  cognito_identity_providers {
    client_id               = aws_cognito_user_pool_client.main.id
    provider_name           = aws_cognito_user_pool.main.endpoint
    server_side_token_check = false
  }
}

# AWS CLI commands
# Create user pool
aws cognito-idp create-user-pool \\
  --pool-name my-users \\
  --auto-verified-attributes email

# Create user pool client
aws cognito-idp create-user-pool-client \\
  --user-pool-id us-east-1_abc123 \\
  --client-name my-app-client

# Admin create user
aws cognito-idp admin-create-user \\
  --user-pool-id us-east-1_abc123 \\
  --username john.doe \\
  --user-attributes Name=email,Value=john@example.com`,
    priority: null
  },
  {
    id: 166,
    category: 'AWS',
    question: 'What is AWS Step Functions and when should you use it?',
    answer: 'Step Functions is a serverless orchestration service that lets you coordinate multiple AWS services into serverless workflows using state machines. Use it for complex workflows, error handling, and long-running processes.',
    explanation: '**Step Functions Overview:**\n\n**Workflow Types:**\n1. **Standard Workflows**:\n   - Long-running (up to 1 year)\n   - Exactly-once execution\n   - Audit trail\n   - Higher cost\n\n2. **Express Workflows**:\n   - Short-running (< 5 minutes)\n   - At-least-once execution\n   - High throughput\n   - Lower cost\n\n**State Types:**\n- **Task**: Execute work (Lambda, ECS, etc.)\n- **Choice**: Conditional branching\n- **Parallel**: Run branches in parallel\n- **Map**: Iterate over array\n- **Wait**: Delay execution\n- **Succeed/Fail**: Terminal states\n- **Pass**: Pass data without work\n\n**Use Cases:**\n- Microservices orchestration\n- Data processing pipelines\n- IT automation\n- Order processing\n- Machine learning workflows\n- Approval workflows\n\n**Benefits:**\n- Visual workflow designer\n- Built-in error handling\n- Automatic retries\n- State persistence\n- Execution history\n- No infrastructure to manage\n\n**Best Practices:**\n- Keep workflows focused\n- Use expressive state names\n- Implement error handling\n- Add retry logic\n- Monitor with CloudWatch\n- Use choice states for branching',
    codeExample: `// Step Functions State Machine (ASL - Amazon States Language)
{
  "Comment": "Order Processing Workflow",
  "StartAt": "ValidateOrder",
  "States": {
    "ValidateOrder": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123456789:function:validateOrder",
      "Next": "CheckInventory",
      "Catch": [
        {
          "ErrorEquals": ["ValidationError"],
          "Next": "OrderRejected"
        }
      ]
    },
    "CheckInventory": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123456789:function:checkInventory",
      "Next": "InventoryAvailable?"
    },
    "InventoryAvailable?": {
      "Type": "Choice",
      "Choices": [
        {
          "Variable": "$.inventory.inStock",
          "BooleanEquals": true,
          "Next": "ProcessPayment"
        }
      ],
      "Default": "NotifyOutOfStock"
    },
    "ProcessPayment": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123456789:function:processPayment",
      "Retry": [
        {
          "ErrorEquals": ["PaymentGatewayTimeout"],
          "IntervalSeconds": 2,
          "MaxAttempts": 3,
          "BackoffRate": 2.0
        }
      ],
      "Next": "ShipOrder"
    },
    "ShipOrder": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123456789:function:shipOrder",
      "Next": "SendConfirmation"
    },
    "SendConfirmation": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123456789:function:sendEmail",
      "End": true
    },
    "NotifyOutOfStock": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123456789:function:notifyOutOfStock",
      "End": true
    },
    "OrderRejected": {
      "Type": "Fail",
      "Error": "ValidationError",
      "Cause": "Order validation failed"
    }
  }
}

// Start execution (Node.js)
const { SFNClient, StartExecutionCommand } = require('@aws-sdk/client-sfn');
const sfn = new SFNClient({ region: 'us-east-1' });

async function startOrderWorkflow(orderData) {
  const params = {
    stateMachineArn: 'arn:aws:states:us-east-1:123456789:stateMachine:OrderProcessor',
    input: JSON.stringify(orderData),
    name: 'order-' + orderData.orderId + '-' + Date.now()
  };
  
  const result = await sfn.send(new StartExecutionCommand(params));
  console.log('Execution started:', result.executionArn);
  return result.executionArn;
}

// Terraform: Step Functions
resource "aws_sfn_state_machine" "order_processor" {
  name     = "OrderProcessor"
  role_arn = aws_iam_role.sfn_role.arn
  
  definition = jsonencode({
    Comment = "Order Processing Workflow"
    StartAt = "ValidateOrder"
    States = {
      ValidateOrder = {
        Type     = "Task"
        Resource = aws_lambda_function.validate_order.arn
        Next     = "CheckInventory"
      }
      # ... rest of workflow
    }
  })
  
  logging_configuration {
    log_destination        = "\${aws_cloudwatch_log_group.sfn_logs.arn}:*"
    include_execution_data = true
    level                  = "ALL"
  }
}

# AWS CLI commands
# List state machines
aws stepfunctions list-state-machines

# Start execution
aws stepfunctions start-execution \\
  --state-machine-arn arn:aws:states:us-east-1:123456789:stateMachine:OrderProcessor \\
  --input '{"orderId": "123", "items": [...]}'

# Describe execution
aws stepfunctions describe-execution \\
  --execution-arn arn:aws:states:us-east-1:123456789:execution:OrderProcessor:abc123

# Get execution history
aws stepfunctions get-execution-history \\
  --execution-arn arn:aws:states:us-east-1:123456789:execution:OrderProcessor:abc123`,
    priority: null
  },
  {
    id: 167,
    category: 'AWS-EC2',
    question: 'What is Amazon EC2 and what are its key features?',
    answer: 'Amazon EC2 (Elastic Compute Cloud) is a web service that provides resizable compute capacity in the cloud. It allows you to launch virtual servers (instances) with various configurations, operating systems, and pricing models.',
    explanation: '**EC2 Key Features:**\n\n• **Virtual Servers**: Launch instances with customizable CPU, memory, storage, and networking\n• **Multiple Instance Types**: Optimized for different use cases (compute, memory, storage, GPU)\n• **Flexible Pricing**: On-Demand, Reserved, Spot, and Savings Plans\n• **Auto Scaling**: Automatically adjust capacity based on demand\n• **High Availability**: Deploy across multiple Availability Zones\n• **Security**: Security groups, IAM roles, VPC isolation\n• **Storage Options**: EBS volumes, instance store, S3 integration\n• **Global Infrastructure**: Available in multiple regions worldwide\n\n**Use Cases:**\n- Web applications and APIs\n- Batch processing and data analytics\n- Machine learning training and inference\n- Gaming servers\n- Development and test environments\n- Disaster recovery\n- High-performance computing (HPC)',
    codeExample: `// Launch EC2 instance using AWS CLI
aws ec2 run-instances \\
  --image-id ami-0abcdef1234567890 \\
  --instance-type t3.medium \\
  --key-name my-key-pair \\
  --security-group-ids sg-12345678 \\
  --subnet-id subnet-12345678 \\
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=WebServer}]' \\
  --count 1

# Terraform: EC2 Instance
resource "aws_instance" "web_server" {
  ami           = "ami-0abcdef1234567890"
  instance_type = "t3.medium"
  key_name      = "my-key-pair"
  
  vpc_security_group_ids = [aws_security_group.web_sg.id]
  subnet_id              = aws_subnet.public.id
  
  tags = {
    Name = "WebServer"
    Environment = "Production"
  }
  
  root_block_device {
    volume_size = 20
    volume_type = "gp3"
    encrypted   = true
  }
}`,
    priority: null
  },
  {
    id: 168,
    category: 'AWS-EC2',
    question: 'What are EC2 Instance Types and how do you choose the right one?',
    answer: 'EC2 instances come in different families optimized for specific use cases: general purpose, compute optimized, memory optimized, storage optimized, and accelerated computing.',
    explanation: '**Instance Families:**\n\n1. **General Purpose (t3, m5, m6i)**: Balanced resources\n   - Web servers, small databases, development environments\n   - Example: t3.medium (2 vCPU, 4 GB RAM)\n\n2. **Compute Optimized (c5, c6g, c7g)**: High-performance processors\n   - Batch processing, gaming servers, scientific modeling\n   - Example: c5.xlarge (4 vCPU, 8 GB RAM)\n\n3. **Memory Optimized (r5, r6g, x1e)**: Large RAM capacity\n   - In-memory databases (Redis), real-time analytics, SAP HANA\n   - Example: r5.2xlarge (8 vCPU, 64 GB RAM)\n\n4. **Storage Optimized (i3, d2, h1)**: High I/O performance\n   - NoSQL databases, data warehousing, Elasticsearch\n   - Example: i3.xlarge (4 vCPU, 30.5 GB RAM, NVMe SSD)\n\n5. **Accelerated Computing (p3, g4dn, inf1)**: GPU/FPGA instances\n   - Machine learning, graphics rendering, video encoding\n   - Example: p3.2xlarge (8 vCPU, 61 GB RAM, 1 NVIDIA Tesla V100)\n\n**Selection Criteria:**\n- CPU vs Memory ratio needed\n- Network performance requirements\n- Storage type and IOPS needs\n- Cost constraints\n- Workload characteristics (bursty vs steady)',
    codeExample: `# Check instance types and pricing
aws ec2 describe-instance-types \\
  --filters Name=instance-type,Values=t3.*,m5.* \\
  --query 'InstanceTypes[*].[InstanceType,VCpuInfo.DefaultVCpus,MemoryInfo.SizeInMiB]'

# Compare instance specifications
# Use AWS Instance Selector CLI
pip install aws-instance-selector
aws-instance-selector \\
  --vcpus 4 \\
  --memory 16 \\
  --region us-east-1

# Real-world examples:
# Web server: t3.medium or m5.large
# Database: r5.xlarge or r6g.xlarge
# ML Training: p3.2xlarge or p4d.24xlarge
# Video encoding: g4dn.xlarge`,
    priority: null
  },
  {
    id: 169,
    category: 'AWS-EC2',
    question: 'What is the difference between On-Demand, Reserved, and Spot Instances?',
    answer: 'On-Demand instances have no commitment and pay by the hour/second. Reserved Instances require 1-3 year commitment for up to 72% discount. Spot Instances use spare capacity for up to 90% discount but can be interrupted.',
    explanation: '**On-Demand Instances:**\n- No long-term commitment\n- Pay only for what you use (per second/hour)\n- Ideal for unpredictable workloads, short-term projects, testing\n- Most expensive option\n- Can start/stop anytime\n\n**Reserved Instances (RI):**\n- Commit to 1 or 3 years\n- Up to 72% discount compared to On-Demand\n- Best for steady-state applications (production databases, core services)\n- Three types:\n  * Standard RI: Fixed configuration, highest discount\n  * Convertible RI: Can change instance type/family\n  * Scheduled RI: Reserve for specific time windows\n- Payment options: All upfront, partial upfront, no upfront\n\n**Spot Instances:**\n- Bid on unused EC2 capacity\n- Up to 90% discount\n- Can be interrupted with 2-minute warning when AWS needs capacity\n- Perfect for fault-tolerant, flexible workloads:\n  * Batch processing\n  * CI/CD pipelines\n  * Distributed computing\n  * Containerized workloads (EKS/ECS)\n  * Image/video processing\n\n**Savings Plans:**\n- Flexible pricing model (alternative to RIs)\n- Commit to consistent usage ($/hour) for 1 or 3 years\n- Applies across instance families and regions\n- Up to 72% savings\n\n**Cost Optimization Strategy:**\n1. Use Reserved/Savings Plans for baseline capacity (70-80%)\n2. Use On-Demand for variable load (10-20%)\n3. Use Spot for cost-sensitive batch jobs (10-30%)',
    codeExample: `# Purchase Reserved Instance
aws ec2 purchase-reserved-instances-offering \\
  --reserved-instances-offering-id offering-id \\
  --instance-count 5 \\
  --duration 31536000 \\
  --instance-purchase-price 500.00

# Request Spot Instances
aws ec2 request-spot-instances \\
  --spot-price "0.05" \\
  --instance-count 10 \\
  --type "one-time" \\
  --launch-specification file://spot-config.json

# Spot Fleet (recommended over individual spot requests)
aws ec2 request-spot-fleet \\
  --spot-fleet-request-config file://fleet-config.json

# Terraform: Mixed instances strategy
resource "aws_autoscaling_group" "mixed_asg" {
  min_size         = 5
  max_size         = 20
  desired_capacity = 10
  
  mixed_instances_policy {
    instances_distribution {
      on_demand_base_capacity      = 5
      on_demand_percentage_above_base_capacity = 20
      spot_allocation_strategy     = "capacity-optimized"
    }
    
    launch_template {
      launch_template_specification {
        launch_template_id = aws_launch_template.main.id
      }
      override {
        instance_type = "m5.large"
      }
      override {
        instance_type = "m5.xlarge"
      }
    }
  }
}`,
    priority: null
  },
  {
    id: 170,
    category: 'AWS-EC2',
    question: 'What is an Amazon Machine Image (AMI) and how do you create custom AMIs?',
    answer: 'An AMI is a template that contains the software configuration (OS, application server, applications) required to launch an EC2 instance. You can use AWS-provided, Marketplace, or custom AMIs.',
    explanation: '**AMI Components:**\n\n1. **One or more EBS snapshots** (or instance store template)\n2. **Launch permissions** controlling which AWS accounts can use it\n3. **Block device mapping** specifying volumes to attach at launch\n\n**Types of AMIs:**\n\n- **AWS-provided**: Amazon Linux 2, Ubuntu, Windows Server, Red Hat\n- **Marketplace**: Pre-configured with commercial software (paid/free)\n- **Custom**: Created from your configured instances\n- **Community**: Shared by other AWS users\n\n**Creating Custom AMIs:**\n\n1. Launch and configure an EC2 instance\n2. Install applications, dependencies, security patches\n3. Configure monitoring agents, logging\n4. Create AMI from the running/stopped instance\n5. Test the AMI by launching new instances\n6. Share or copy to other regions if needed\n\n**Best Practices:**\n- Regularly update AMIs with latest security patches\n- Use Systems Manager Patch Manager for automation\n- Tag AMIs for version control (e.g., v1.0, v1.1)\n- Remove sensitive data before creating AMI\n- Test AMIs thoroughly before production use\n- Document changes in each AMI version\n- Copy AMIs across regions for disaster recovery\n- Use EC2 Image Builder for automated AMI creation',
    codeExample: `# Create AMI from existing instance
aws ec2 create-image \\
  --instance-id i-1234567890abcdef0 \\
  --name "MyApp-Server-v1.0" \\
  --description "Application server with Node.js and dependencies" \\
  --no-reboot

# Wait for AMI to be available
aws ec2 wait image-available \\
  --image-ids ami-0abcdef1234567890

# Copy AMI to another region
aws ec2 copy-image \\
  --source-region us-east-1 \\
  --source-image-id ami-0abcdef1234567890 \\
  --name "MyApp-Server-v1.0-us-west-2" \\
  --region us-west-2

# Terraform: Use custom AMI
resource "aws_instance" "app_server" {
  ami           = "ami-0abcdef1234567890"  # Custom AMI ID
  instance_type = "t3.medium"
  
  tags = {
    Name = "AppServer"
    AMIVersion = "v1.0"
  }
}

# EC2 Image Builder (automated AMI creation)
resource "aws_imagebuilder_image_pipeline" "app_ami" {
  name                = "app-server-ami-pipeline"
  image_recipe_arn    = aws_imagebuilder_image_recipe.app.arn
  infrastructure_configuration_arn = aws_imagebuilder_infrastructure_configuration.app.arn
  distribution_configuration_arn   = aws_imagebuilder_distribution_configuration.app.arn
  
  schedule {
    schedule_expression = "cron(0 0 1 * ? *)"  # Monthly
  }
}`,
    priority: null
  },
  {
    id: 171,
    category: 'AWS-EC2',
    question: 'What are EBS Volumes and how do they differ from Instance Store?',
    answer: 'EBS (Elastic Block Store) is persistent network-attached storage that survives instance termination. Instance Store is temporary block-level storage physically attached to the host that is lost when the instance stops.',
    explanation: '**EBS Volumes:**\n\n- Network-attached storage (like a virtual hard drive)\n- Data persists independently of instance lifecycle\n- Can be detached and reattached to different instances\n- Supports snapshots for backup and cloning\n- Can be encrypted using AWS KMS\n- Different volume types for different needs:\n  * **gp3**: General purpose SSD (balanced price/performance)\n  * **io2**: Provisioned IOPS SSD (mission-critical workloads)\n  * **st1**: Throughput optimized HDD (big data, data warehouses)\n  * **sc1**: Cold HDD (infrequently accessed data)\n\n**Instance Store (Ephemeral Storage):**\n\n- Physically attached to the host server\n- Extremely high I/O performance (local NVMe SSD)\n- Data is lost when instance stops, terminates, or hardware fails\n- Cannot be detached or moved\n- Included in instance price (no additional cost)\n- Available only on certain instance types\n\n**When to Use:**\n\n**EBS:**\n- Databases (MySQL, PostgreSQL, MongoDB)\n- File systems requiring persistence\n- Application data that must survive restarts\n- Boot volumes for instances\n- Any data requiring backup/snapshots\n\n**Instance Store:**\n- Cache layers (Redis, Memcached)\n- Temporary buffers and scratch space\n- High-performance transient data\n- Data that can be rebuilt from source\n- Stateless applications\n\n**Performance Comparison:**\n- Instance Store: Higher IOPS and lower latency\n- EBS io2: Up to 256,000 IOPS, consistent performance\n- EBS gp3: Up to 16,000 IOPS, cost-effective',
    codeExample: `# Create EBS volume
aws ec2 create-volume \\
  --volume-type gp3 \\
  --size 100 \\
  --availability-zone us-east-1a \\
  --encrypted \\
  --tag-specifications 'ResourceType=volume,Tags=[{Key=Name,Value=DataVolume}]'

# Attach volume to instance
aws ec2 attach-volume \\
  --volume-id vol-1234567890abcdef0 \\
  --instance-id i-1234567890abcdef0 \\
  --device /dev/sdf

# Create snapshot for backup
aws ec2 create-snapshot \\
  --volume-id vol-1234567890abcdef0 \\
  --description "Daily backup snapshot"

# Terraform: EBS volume with encryption
resource "aws_ebs_volume" "data" {
  availability_zone = "us-east-1a"
  size              = 100
  type              = "gp3"
  encrypted         = true
  
  tags = {
    Name = "DatabaseVolume"
  }
}

resource "aws_volume_attachment" "data_attach" {
  instance_id = aws_instance.db.id
  volume_id   = aws_ebs_volume.data.id
  device_name = "/dev/sdf"
}

# Format and mount (inside instance)
# sudo mkfs -t ext4 /dev/xvdf
# sudo mkdir /data
# sudo mount /dev/xvdf /data
# echo '/dev/xvdf /data ext4 defaults,nofail 0 2' | sudo tee -a /etc/fstab`,
    priority: null
  },
  {
    id: 172,
    category: 'AWS-EC2',
    question: 'What is an Elastic IP Address and when should you use it?',
    answer: 'An Elastic IP (EIP) is a static IPv4 address designed for dynamic cloud computing that you can remap to different EC2 instances. Unlike standard public IPs, EIPs persist until explicitly released.',
    explanation: '**Key Features:**\n\n- Associated with your AWS account, not a specific instance\n- Can be quickly remapped from one instance to another\n- Free when associated with a running instance\n- Charged when not associated or when instance is stopped\n- Helps mask instance or Availability Zone failures\n\n**Use Cases:**\n\n1. **Failover/Disaster Recovery**: If primary server fails, remap EIP to standby instance within minutes without DNS changes\n\n2. **Fixed IP Requirements**: When external partners need to whitelist your IP address\n\n3. **DNS Stability**: Maintain consistent DNS records even when replacing instances\n\n4. **Compliance**: Some regulations require fixed IP addresses\n\n5. **Legacy Applications**: Applications hardcoded to specific IP addresses\n\n**How It Works:**\n\n1. Allocate an Elastic IP address to your account\n2. Associate it with a running EC2 instance\n3. If instance fails, disassociate and remap to another instance\n4. Update happens instantly (no DNS propagation delay)\n\n**Limitations:**\n- Limited to 5 EIPs per region by default (can request increase)\n- Only works with instances in VPC (EC2-Classic deprecated)\n- Each EIP must be associated with one instance or NAT gateway\n- Not compatible with IPv6 (use IPv6 CIDR blocks instead)\n\n**Best Practices:**\n- Use Elastic Load Balancer (ALB/NLB) instead when possible\n- Monitor unassociated EIPs to avoid unnecessary charges\n- Document EIP assignments for team awareness\n- Consider using Route 53 with health checks for better failover',
    codeExample: `# Allocate Elastic IP
aws ec2 allocate-address \\
  --domain vpc \\
  --tag-specifications 'ResourceType=elastic-ip,Tags=[{Key=Name,Value=Production-API}]'

# Output: {"PublicIp": "54.123.45.67", "AllocationId": "eipalloc-12345"}

# Associate EIP with instance
aws ec2 associate-address \\
  --instance-id i-1234567890abcdef0 \\
  --allocation-id eipalloc-12345

# Disassociate EIP (before remapping)
aws ec2 disassociate-address \\
  --association-id eipassoc-12345

# Release EIP back to AWS (when no longer needed)
aws ec2 release-address \\
  --allocation-id eipalloc-12345

# Terraform: Elastic IP
resource "aws_eip" "production" {
  domain = "vpc"
  
  tags = {
    Name = "Production-API-EIP"
  }
}

resource "aws_eip_association" "production_assoc" {
  instance_id   = aws_instance.web.id
  allocation_id = aws_eip.production.id
}

# Failover script example
#!/bin/bash
INSTANCE_ID=$1
EIP_ALLOCATION="eipalloc-12345"

# Disassociate current association
CURRENT_ASSOC=$(aws ec2 describe-addresses \\
  --allocation-ids $EIP_ALLOCATION \\
  --query 'Addresses[0].AssociationId' \\
  --output text)

if [ "$CURRENT_ASSOC" != "None" ]; then
  aws ec2 disassociate-address --association-id $CURRENT_ASSOC
fi

# Associate with new instance
aws ec2 associate-address \\
  --instance-id $INSTANCE_ID \\
  --allocation-id $EIP_ALLOCATION

echo "EIP remapped to instance: $INSTANCE_ID"`,
    priority: null
  },
  {
    id: 173,
    category: 'AWS-EC2',
    question: 'What are Security Groups and how do they work?',
    answer: 'Security Groups are stateful virtual firewalls that control inbound and outbound traffic at the EC2 instance level. They act as the first line of defense for your instances.',
    explanation: '**Key Characteristics:**\n\n**Stateful Nature:**\n- If you allow inbound traffic on port 443 (HTTPS), the return traffic is automatically allowed\n- No need to create explicit outbound rules for response traffic\n- Tracks connection state\n\n**Rule Structure:**\n- Protocol: TCP, UDP, ICMP, or All\n- Port range: Single port (80), range (8000-9000), or all (0-65535)\n- Source/Destination: IP range (CIDR), another Security Group, or prefix list\n- Description: Document why the rule exists\n\n**Default Behavior:**\n- All inbound traffic is DENIED by default\n- All outbound traffic is ALLOWED by default\n- You must explicitly allow inbound traffic\n\n**Best Practices:**\n\n1. **Principle of Least Privilege**: Only open necessary ports\n2. **Reference Security Groups**: Instead of IP addresses, reference other SGs for inter-instance communication\n3. **Layered Security**: Use different SGs for different tiers (web, app, database)\n4. **Regular Audits**: Review and remove unused rules\n5. **Document Rules**: Add descriptions to explain why each rule exists\n6. **Avoid 0.0.0.0/0**: Don\'t allow unrestricted access unless absolutely necessary\n\n**Example Multi-Tier Architecture:**\n\n- **Web Server SG**: Inbound ports 80/443 from 0.0.0.0/0 (internet)\n- **App Server SG**: Inbound port 8080 only from Web Server SG\n- **Database SG**: Inbound port 3306 only from App Server SG\n\nThis creates secure, layered defense where each tier communicates only with authorized sources.\n\n**Differences from NACLs:**\n- Security Groups: Instance-level, stateful, support only allow rules\n- NACLs: Subnet-level, stateless, support allow and deny rules',
    codeExample: `# Create Security Group
aws ec2 create-security-group \\
  --group-name web-server-sg \\
  --description "Security group for web servers" \\
  --vpc-id vpc-12345678

# Output: {"GroupId": "sg-12345678"}

# Allow HTTP and HTTPS from internet
aws ec2 authorize-security-group-ingress \\
  --group-id sg-12345678 \\
  --protocol tcp \\
  --port 80 \\
  --cidr 0.0.0.0/0 \\
  --description "Allow HTTP from internet"

aws ec2 authorize-security-group-ingress \\
  --group-id sg-12345678 \\
  --protocol tcp \\
  --port 443 \\
  --cidr 0.0.0.0/0 \\
  --description "Allow HTTPS from internet"

# Allow SSH from specific IP only
aws ec2 authorize-security-group-ingress \\
  --group-id sg-12345678 \\
  --protocol tcp \\
  --port 22 \\
  --cidr 203.0.113.0/24 \\
  --description "Allow SSH from office IP"

# Terraform: Multi-tier security groups
resource "aws_security_group" "web_sg" {
  name        = "web-server-sg"
  description = "Security group for web servers"
  vpc_id      = aws_vpc.main.id
  
  ingress {
    description = "HTTP from internet"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  ingress {
    description = "HTTPS from internet"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "app_sg" {
  name        = "app-server-sg"
  description = "Security group for application servers"
  vpc_id      = aws_vpc.main.id
  
  ingress {
    description     = "From web servers"
    from_port       = 8080
    to_port         = 8080
    protocol        = "tcp"
    security_groups = [aws_security_group.web_sg.id]
  }
}

resource "aws_security_group" "db_sg" {
  name        = "database-sg"
  description = "Security group for databases"
  vpc_id      = aws_vpc.main.id
  
  ingress {
    description     = "MySQL from app servers"
    from_port       = 3306
    to_port         = 3306
    protocol        = "tcp"
    security_groups = [aws_security_group.app_sg.id]
  }
}`,
    priority: null
  },
  {
    id: 174,
    category: 'AWS-EC2',
    question: 'What is User Data in EC2 and how is it used?',
    answer: 'User Data is a script that runs automatically when an EC2 instance first boots. It is used for bootstrapping instances and automating initial configuration tasks.',
    explanation: '**Key Points:**\n\n- Runs only once during first boot (unless specifically configured otherwise)\n- Executed with root privileges\n- Limited to 16 KB in size\n- Passed as plain text (not encrypted by default)\n- Visible in instance metadata\n- Logged to /var/log/cloud-init-output.log\n\n**Common Use Cases:**\n\n1. Install software packages and dependencies\n2. Download application code from version control (Git)\n3. Configure environment variables\n4. Start services and daemons\n5. Join instances to a domain\n6. Register with configuration management tools (Chef, Puppet, Ansible)\n7. Mount EBS volumes\n8. Configure monitoring agents\n\n**Cloud-Init:**\nAWS uses cloud-init to process User Data. It supports multiple formats:\n- Shell scripts (#!/bin/bash)\n- Cloud-config YAML\n- Multipart archives (combine multiple formats)\n- Include directives (fetch scripts from URLs)\n\n**Best Practices:**\n\n- Keep scripts idempotent (safe to run multiple times)\n- Use AWS Systems Manager for complex configurations\n- Avoid storing secrets in User Data (use Secrets Manager or Parameter Store)\n- Log output for debugging\n- For Auto Scaling, ensure User Data makes each instance unique\n- Test User Data scripts thoroughly before production\n- Use #cloud-config for declarative configuration\n- Implement error handling and retries',
    codeExample: `#!/bin/bash
# Example: Bootstrap a web server
set -e  # Exit on error

# Update system packages
yum update -y

# Install Apache web server
yum install -y httpd

# Enable and start Apache
systemctl enable httpd
systemctl start httpd

# Clone application code
cd /var/www/html
git clone https://github.com/myorg/myapp.git .

# Install dependencies
npm install --production

# Create environment file (example)
echo 'NODE_ENV=production' > /var/www/html/.env
echo 'DB_HOST=mydb.us-east-1.rds.amazonaws.com' >> /var/www/html/.env

# Set permissions
chown -R apache:apache /var/www/html
chmod -R 755 /var/www/html

# Restart Apache
systemctl restart httpd

# Log completion
echo "Bootstrap completed successfully at $(date)" >> /var/log/bootstrap.log

# Cloud-config example (YAML format)
#cloud-config
package_update: true
packages:
  - nginx
  - nodejs
  - git
write_files:
  - path: /etc/nginx/conf.d/app.conf
    content: |
      server {
        listen 80;
        location / {
          proxy_pass http://localhost:3000;
        }
      }
runcmd:
  - systemctl enable nginx
  - systemctl start nginx
  - cd /opt/app && npm install && npm start`,
    priority: null
  },
  {
    id: 175,
    category: 'AWS-EC2',
    question: 'What is EC2 Auto Scaling and what are its components?',
    answer: 'EC2 Auto Scaling is a service that automatically adjusts the number of EC2 instances based on demand. It ensures you have the right number of instances to handle your application\'s load while optimizing costs.',
    explanation: '**Key Components:**\n\n1. **Launch Template/Configuration**:\n   - Blueprint for creating new instances\n   - Defines: instance type, AMI, security groups, key pair, storage, User Data\n   - Launch Templates are newer and recommended over Launch Configurations\n\n2. **Auto Scaling Group (ASG)**:\n   - Collection of instances managed as a logical group\n   - Defined across one or more Availability Zones\n   - Configured with minimum, maximum, and desired capacity\n   - Handles instance lifecycle (launch, terminate, replace unhealthy)\n\n3. **Scaling Policies**:\n   - **Target Tracking**: Maintain a specific metric value (e.g., 70% CPU utilization)\n   - **Step Scaling**: Scale based on CloudWatch alarm breaches with step adjustments\n   - **Simple Scaling**: Basic scale-in/scale-out actions (legacy)\n   - **Scheduled Scaling**: Predefined scaling based on time (predictable patterns)\n   - **Predictive Scaling**: Uses machine learning to anticipate traffic spikes\n\n4. **CloudWatch Alarms**:\n   - Monitor metrics (CPU, memory, network, custom metrics)\n   - Trigger scaling actions when thresholds are breached\n   - Can use any CloudWatch metric\n\n**How Auto Scaling Works:**\n\n**Scale-Out Scenario (Flash Sale):**\n1. CloudWatch detects CPU utilization exceeds 70%\n2. Alarm triggers scale-out policy\n3. ASG launches 5 new instances using Launch Template\n4. New instances register with Load Balancer\n5. Health checks verify instances are healthy\n6. Traffic distributes across all instances\n\n**Scale-In Scenario (After Sale):**\n1. CPU drops below 30% for sustained period\n2. Scale-in policy triggers\n3. ASG selects instances to terminate (oldest, newest, or based on protection)\n4. Instances deregister from Load Balancer\n5. Connection draining allows in-flight requests to complete\n6. Instances terminate gracefully\n\n**Benefits:**\n- Fault tolerance (automatically replace unhealthy instances)\n- Cost optimization (scale down when not needed)\n- Performance maintenance (scale up during peaks)\n- High availability (spread across multiple AZs)\n- Hands-off operations (reduces manual intervention)',
    codeExample: `# Create Launch Template
aws ec2 create-launch-template \\
  --launch-template-name web-server-template \\
  --version-description "v1.0" \\
  --launch-template-data '{
    "ImageId": "ami-0abcdef1234567890",
    "InstanceType": "t3.medium",
    "KeyName": "my-key-pair",
    "SecurityGroupIds": ["sg-12345678"],
    "UserData": "IyEvYmluL2Jhc2g...",
    "TagSpecifications": [{
      "ResourceType": "instance",
      "Tags": [{"Key": "Name", "Value": "WebServer"}]
    }]
  }'

# Create Auto Scaling Group
aws autoscaling create-auto-scaling-group \\
  --auto-scaling-group-name web-asg \\
  --launch-template LaunchTemplateId=lt-12345678 \\
  --min-size 2 \\
  --max-size 10 \\
  --desired-capacity 3 \\
  --vpc-zone-identifier "subnet-12345,subnet-67890" \\
  --target-group-arns arn:aws:elasticloadbalancing:us-east-1:123456789:targetgroup/web-tg/abc123 \\
  --health-check-type ELB \\
  --health-check-grace-period 300

# Create Target Tracking Policy
aws autoscaling put-scaling-policy \\
  --auto-scaling-group-name web-asg \\
  --policy-name cpu-target-tracking \\
  --policy-type TargetTrackingScaling \\
  --target-tracking-configuration '{
    "PredefinedMetricSpecification": {
      "PredefinedMetricType": "ASGAverageCPUUtilization"
    },
    "TargetValue": 70.0
  }'

# Terraform: Complete Auto Scaling setup
resource "aws_launch_template" "web" {
  name_prefix   = "web-server-"
  image_id      = "ami-0abcdef1234567890"
  instance_type = "t3.medium"
  key_name      = "my-key-pair"
  
  vpc_security_group_ids = [aws_security_group.web.id]
  
  user_data = base64encode(file("bootstrap.sh"))
  
  tag_specifications {
    resource_type = "instance"
    tags = {
      Name = "WebServer"
    }
  }
}

resource "aws_autoscaling_group" "web" {
  name                      = "web-asg"
  min_size                  = 2
  max_size                  = 10
  desired_capacity          = 3
  health_check_grace_period = 300
  health_check_type         = "ELB"
  target_group_arns         = [aws_lb_target_group.web.arn]
  vpc_zone_identifier       = [aws_subnet.public_a.id, aws_subnet.public_b.id]
  
  launch_template {
    id      = aws_launch_template.web.id
    version = "$Latest"
  }
  
  tag {
    key                 = "Name"
    value               = "WebServer"
    propagate_at_launch = true
  }
}

resource "aws_autoscaling_policy" "cpu_scaling" {
  name                   = "cpu-target-tracking"
  autoscaling_group_name = aws_autoscaling_group.web.name
  policy_type            = "TargetTrackingScaling"
  
  target_tracking_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ASGAverageCPUUtilization"
    }
    target_value = 70.0
  }
}`,
    priority: null
  },
  {
    id: 176,
    category: 'AWS-EC2',
    question: 'What is the difference between Horizontal and Vertical Scaling in EC2?',
    answer: 'Horizontal scaling adds more instances (scale out/in), while vertical scaling increases instance size (scale up/down). Horizontal scaling is preferred in cloud architecture for better fault tolerance and unlimited scalability.',
    explanation: '**Horizontal Scaling (Scale Out/In):**\n\n**Characteristics:**\n- Add or remove instances to handle load\n- Requires a Load Balancer to distribute traffic\n- Provides better fault tolerance\n- Nearly unlimited scalability\n- No downtime during scaling\n- Preferred approach in cloud-native architecture\n\n**Advantages:**\n- Zero downtime scaling\n- Better fault tolerance (multiple instances)\n- Can scale beyond single instance limits\n- Cost-effective (pay for what you need)\n- Geographic distribution possible\n\n**Example:** Start with 2 t3.medium instances behind an ALB. During peak traffic, scale out to 10 instances. After peak, scale back to 2.\n\n**Vertical Scaling (Scale Up/Down):**\n\n**Characteristics:**\n- Change instance type to larger/smaller size\n- Requires stopping the instance, changing type, and restarting\n- Causes downtime during the change\n- Limited by maximum available instance size\n- Simpler architecture (no load balancer needed)\n- May require application restart/reconfiguration\n\n**Advantages:**\n- Simpler to implement\n- No need for load balancer\n- Good for single-node applications\n- Useful for databases that don\'t support clustering\n\n**Example:** Upgrade from t3.medium (2 vCPU, 4GB RAM) to t3.large (2 vCPU, 8GB RAM) for more memory.\n\n**Comparison Table:**\n\n| Aspect | Horizontal | Vertical |\n|--------|-----------|----------|\n| Downtime | None | Required |\n| Complexity | Higher (needs LB) | Lower |\n| Fault Tolerance | Better | Single point of failure |\n| Scalability | Unlimited | Limited by instance size |\n| Cost Efficiency | Pay for what you use | May over-provision |\n| Implementation | Auto Scaling + ALB | Stop → Resize → Start |\n\n**Best Practices:**\n\n- Use horizontal scaling for production web applications\n- Use vertical scaling for databases (if clustering not supported)\n- Combine both: vertical for baseline, horizontal for peaks\n- Design applications to be stateless for horizontal scaling\n- Use sticky sessions or session stores if state is needed',
    codeExample: `# Horizontal Scaling: Add instances to Auto Scaling Group
aws autoscaling set-desired-capacity \\
  --auto-scaling-group-name web-asg \\
  --desired-capacity 5

# Verify instances
aws autoscaling describe-auto-scaling-instances \\
  --query 'AutoScalingInstances[*].[InstanceId,HealthStatus,LifecycleState]'

# Vertical Scaling: Change instance type
# Step 1: Stop the instance
aws ec2 stop-instances --instance-ids i-1234567890abcdef0

# Wait for instance to stop
aws ec2 wait instance-stopped --instance-ids i-1234567890abcdef0

# Step 2: Modify instance type
aws ec2 modify-instance-attribute \\
  --instance-id i-1234567890abcdef0 \\
  --instance-type '{"Value": "t3.large"}'

# Step 3: Start the instance
aws ec2 start-instances --instance-ids i-1234567890abcdef0

# Wait for instance to run
aws ec2 wait instance-running --instance-ids i-1234567890abcdef0

echo "Instance resized from t3.medium to t3.large"

# Terraform: Horizontal scaling with ASG
resource "aws_autoscaling_group" "horizontal" {
  min_size         = 2
  max_size         = 10
  desired_capacity = 3
  # ... rest of config
}

# For vertical scaling, change instance_type in launch template
resource "aws_launch_template" "vertical" {
  instance_type = "t3.large"  # Changed from t3.medium
  # ... rest of config
}

# Note: Changing launch template requires ASG refresh
# aws autoscaling start-instance-refresh \\
#   --auto-scaling-group-name my-asg`,
    priority: null
  },
  {
    id: 177,
    category: 'AWS-EC2',
    question: 'What is EC2 Instance Metadata Service (IMDS) and why use IMDSv2?',
    answer: 'Instance Metadata Service (IMDS) provides data about your EC2 instance accessible from within the instance. IMDSv2 is a session-oriented method that protects against SSRF attacks by requiring authentication tokens.',
    explanation: '**What is Instance Metadata?**\n\nMetadata includes information about your running instance:\n- Instance ID, type, and availability zone\n- Public and private IP addresses\n- Security groups\n- IAM role credentials (temporary)\n- Hostname and network interfaces\n\n**Access URL:** `http://169.254.169.254/latest/meta-data/`\n\n**IMDSv1 vs IMDSv2:**\n- IMDSv1: Simple GET requests, vulnerable to SSRF attacks\n- IMDSv2: Session-oriented with tokens, protects against attacks\n\n**Use Cases:**\n1. IAM Role Credentials: Applications retrieve temporary AWS credentials\n2. Auto-scaling Scripts: Instances discover their own properties\n3. Monitoring: Collect instance metadata for logging\n\n**Best Practices:**\n- Always use IMDSv2 when possible\n- Set appropriate token TTL\n- Use hop limit of 1 for containers\n- Restrict metadata access using IAM policies',
    codeExample: `# IMDSv2: Get session token\nTOKEN=$(curl -X PUT "http://169.254.169.254/latest/api/token" \\\n  -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")\n\n# Get instance ID\ncurl -H "X-aws-ec2-metadata-token: $TOKEN" \\\n  http://169.254.169.254/latest/meta-data/instance-id\n\n# Python example\nimport requests\n\ndef get_instance_metadata():\n    token_url = "http://169.254.169.254/latest/api/token"\n    headers = {"X-aws-ec2-metadata-token-ttl-seconds": "21600"}\n    token = requests.put(token_url, headers=headers).text\n    \n    metadata_url = "http://169.254.169.254/latest/meta-data/instance-id"\n    headers = {"X-aws-ec2-metadata-token": token}\n    return requests.get(metadata_url, headers=headers).text`,
    priority: null
  },
  {
    id: 178,
    category: 'AWS-EC2',
    question: 'What are EC2 Placement Groups and when should you use them?',
    answer: 'Placement Groups control how EC2 instances are placed on underlying hardware to optimize for low-latency networking (Cluster), high availability (Spread), or large distributed workloads (Partition).',
    explanation: '**Three Types:**\n\n**1. Cluster Placement Group:**\n- Instances close together in same AZ\n- Low-latency, high-throughput communication\n- Use for: HPC, distributed databases, big data analytics\n\n**2. Spread Placement Group:**\n- Instances on distinct hardware racks\n- Reduces correlated failures\n- Max 7 instances per AZ\n- Use for: Critical applications, master nodes\n\n**3. Partition Placement Group:**\n- Instances divided into partitions\n- Each partition has separate racks\n- Supports hundreds of instances\n- Use for: Hadoop, Cassandra, Kafka clusters\n\n**Important:** Must specify at launch time, cannot move existing instances.',
    codeExample: `# Create Cluster Placement Group\naws ec2 create-placement-group \\\n  --group-name hpc-cluster \\\n  --strategy cluster\n\n# Launch instances in cluster\naws ec2 run-instances \\\n  --placement GroupName=hpc-cluster \\\n  --instance-type c5n.18xlarge \\\n  --count 10\n\n# Terraform: Placement Groups\nresource "aws_placement_group" "hpc" {\n  name     = "hpc-cluster"\n  strategy = "cluster"\n}\n\nresource "aws_instance" "hpc_node" {\n  count           = 10\n  ami             = "ami-0abcdef1234567890"\n  instance_type   = "c5n.18xlarge"\n  placement_group = aws_placement_group.hpc.name\n}`,
    priority: null
  },
  {
    id: 179,
    category: 'AWS-EC2',
    question: 'What is the difference between Stopping and Terminating an EC2 instance?',
    answer: 'Stopping shuts down the instance temporarily while preserving EBS volumes (can restart). Terminating permanently deletes the instance and releases all resources (cannot recover).',
    explanation: '**Stopping:**\n- Graceful OS shutdown\n- EBS volumes persist\n- Instance ID retained\n- No compute charges (only storage)\n- Can restart later\n- Public IP changes (unless Elastic IP)\n- Use for: Temporary pauses, cost savings\n\n**Terminating:**\n- Permanent deletion\n- Instance store lost\n- EBS deleted by default\n- Instance ID released\n- Cannot recover\n- No charges after termination\n- Use for: Cleanup, no longer needed\n\n**Best Practices:**\n- Stop dev/test instances when not in use\n- Terminate unused instances to avoid orphaned resources\n- Enable termination protection for production\n- Check DeleteOnTermination flag before terminating',
    codeExample: `# Stop instance (can restart)\naws ec2 stop-instances --instance-ids i-1234567890abcdef0\n\n# Start stopped instance\naws ec2 start-instances --instance-ids i-1234567890abcdef0\n\n# Terminate instance (permanent)\naws ec2 terminate-instances --instance-ids i-1234567890abcdef0\n\n# Enable termination protection\naws ec2 modify-instance-attribute \\\n  --instance-id i-1234567890abcdef0 \\\n  --disable-api-termination\n\n# Terraform: Prevent accidental termination\nresource "aws_instance" "prod" {\n  ami                     = "ami-0abcdef1234567890"\n  instance_type           = "t3.medium"\n  disable_api_termination = true\n  \n  root_block_device {\n    delete_on_termination = false  # Keep EBS after termination\n  }\n}`,
    priority: null
  },
  {
    id: 180,
    category: 'AWS-EC2',
    question: 'How do you monitor EC2 instances and what tools are available?',
    answer: 'Use Amazon CloudWatch for metrics (CPU, network, disk), CloudWatch Logs for log aggregation, and CloudWatch Agent for custom metrics like memory utilization. Set up alarms for proactive monitoring.',
    explanation: '**CloudWatch Monitoring:**\n\n**Basic Monitoring (Free):**\n- Metrics every 5 minutes\n- CPU, network, disk I/O, status checks\n\n**Detailed Monitoring (Paid):**\n- Metrics every 1 minute\n- $0.30 per instance/month\n- Better for auto-scaling\n\n**Key Metrics:**\n- CPUUtilization: CPU percentage used\n- NetworkIn/Out: Bytes transferred\n- EBSReadOps/WriteOps: Disk operations\n- StatusCheckFailed: Health checks\n\n**Custom Metrics (CloudWatch Agent):**\n- Memory utilization\n- Disk space usage\n- Application-specific metrics\n\n**CloudWatch Alarms:**\n- Trigger on thresholds\n- Send SNS notifications\n- Auto Scaling actions\n- Lambda functions\n\n**Other Tools:**\n- AWS Systems Manager: Inventory, patching\n- AWS X-Ray: Application tracing\n- Third-party: Datadog, New Relic',
    codeExample: `# Create CPU alarm\naws cloudwatch put-metric-alarm \\\n  --alarm-name "High-CPU" \\\n  --metric-name CPUUtilization \\\n  --namespace AWS/EC2 \\\n  --statistic Average \\\n  --period 300 \\\n  --threshold 80 \\\n  --comparison-operator GreaterThanThreshold \\\n  --dimensions Name=InstanceId,Value=i-1234567890abcdef0 \\\n  --evaluation-periods 2 \\\n  --alarm-actions arn:aws:sns:us-east-1:123456789:alerts\n\n# Install CloudWatch Agent for memory metrics\nsudo yum install amazon-cloudwatch-agent\nsudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-config-wizard\nsudo systemctl start amazon-cloudwatch-agent\n\n# Terraform: CloudWatch alarms\nresource "aws_cloudwatch_metric_alarm" "high_cpu" {\n  alarm_name          = "High-CPU"\n  metric_name         = "CPUUtilization"\n  namespace           = "AWS/EC2"\n  statistic           = "Average"\n  period              = 300\n  threshold           = 80\n  comparison_operator = "GreaterThanThreshold"\n  evaluation_periods  = 2\n  \n  dimensions = {\n    InstanceId = aws_instance.web.id\n  }\n}`,
    priority: null
  },
  {
    id: 181,
    category: 'AWS-EC2',
    question: 'What are T2/T3 Unlimited instances and how do CPU credits work?',
    answer: 'T2/T3 instances earn CPU credits when idle and spend them when bursting above baseline. Unlimited mode allows continued bursting beyond earned credits for an additional hourly charge.',
    explanation: '**CPU Credit System:**\n\n**How It Works:**\n- Instances earn credits when CPU usage is below baseline\n- Spend credits when CPU usage exceeds baseline\n- 1 credit = 1 vCPU at 100% for 1 minute\n- Credits accumulate up to maximum balance\n\n**Baseline Performance:**\n- t3.micro: 10% of 2 vCPUs = 0.2 vCPU\n- t3.small: 20% of 2 vCPUs = 0.4 vCPU\n- t3.medium: 40% of 2 vCPUs = 0.8 vCPU\n\n**Two Modes:**\n\n**Standard Mode:**\n- Burst using earned credits only\n- When credits exhausted, throttled to baseline\n- No additional charges\n- Good for predictable workloads\n\n**Unlimited Mode:**\n- Continue bursting even after credits exhausted\n- Pay additional hourly charge for excess CPU\n- No performance throttling\n- Good for workloads with occasional spikes\n\n**When to Use Unlimited:**\n- Web servers with periodic traffic spikes\n- Development environments\n- Batch processing with variable intensity\n- When consistent performance is critical\n\n**Cost Consideration:**\n- Monitor SurplusCreditBalance metric\n- If frequently using surplus credits, consider larger instance type\n- Unlimited can be cheaper than over-provisioning',
    codeExample: `# Launch T3 instance with Unlimited mode\naws ec2 run-instances \\\n  --image-id ami-0abcdef1234567890 \\\n  --instance-type t3.medium \\\n  --credit-specification CpuCredits=unlimited\n\n# Change existing instance to Unlimited\naws ec2 modify-instance-credit-specification \\\n  --instance-id i-1234567890abcdef0 \\\n  --cpu-credits unlimited\n\n# Monitor CPU credits\naws cloudwatch get-metric-statistics \\\n  --namespace AWS/EC2 \\\n  --metric-name CPUCreditBalance \\\n  --dimensions Name=InstanceId,Value=i-1234567890abcdef0 \\\n  --start-time 2024-01-01T00:00:00Z \\\n  --end-time 2024-01-01T23:59:59Z \\\n  --period 300 \\\n  --statistics Average\n\n# Terraform: T3 Unlimited\nresource "aws_instance" "web" {\n  ami           = "ami-0abcdef1234567890"\n  instance_type = "t3.medium"\n  \n  credit_specification {\n    cpu_credits = "unlimited"\n  }\n  \n  tags = {\n    Name = "WebServer"\n  }\n}\n\n# CloudWatch alarm for low CPU credits\nresource "aws_cloudwatch_metric_alarm" "low_credits" {\n  alarm_name          = "Low-CPU-Credits"\n  metric_name         = "CPUCreditBalance"\n  namespace           = "AWS/EC2"\n  statistic           = "Average"\n  period              = 300\n  threshold           = 100\n  comparison_operator = "LessThanThreshold"\n  evaluation_periods  = 2\n  \n  dimensions = {\n    InstanceId = aws_instance.web.id\n  }\n}`,
    priority: null
  },
  // Kafka Questions
  {
    id: 182,
    category: 'Kafka',
    question: 'What is Apache Kafka and what are its core concepts?',
    answer: 'Apache Kafka is a distributed event streaming platform for building real-time data pipelines and streaming applications. Core concepts include Topics, Producers, Consumers, Brokers, Partitions, and Consumer Groups.',
    explanation: '**Kafka Core Concepts:**\n\n1. **Topics**: Categories/feeds where messages are published\n   - Divided into partitions for scalability\n   - Messages are ordered within partitions\n\n2. **Producers**: Applications that publish messages to topics\n   - Can specify partition or let Kafka decide\n   - Messages include key-value pairs\n\n3. **Consumers**: Applications that read messages from topics\n   - Organized in consumer groups\n   - Each partition consumed by one consumer in group\n\n4. **Brokers**: Kafka servers that store and serve messages\n   - Form a cluster\n   - Handle replication and fault tolerance\n\n5. **Partitions**: subdivisions of topics\n   - Enable parallelism and scalability\n   - Messages assigned to partitions by key\n\n6. **Consumer Groups**: Set of consumers working together\n   - Load balancing across consumers\n   - Each partition consumed once per group\n\n7. **Offsets**: Position markers in partitions\n   - Track which messages have been consumed\n   - Stored in __consumer_offsets topic\n\n**Key Benefits:**\n- High throughput (millions of msgs/sec)\n- Fault tolerance through replication\n- Scalability via partitioning\n- Durability with disk persistence\n- Real-time stream processing',
    codeExample: `// Producer Example (Node.js with kafkajs)
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

async function sendMessage() {
  await producer.connect();
  
  await producer.send({
    topic: 'user-events',
    messages: [
      { 
        key: 'user123',
        value: JSON.stringify({
          event: 'login',
          userId: 'user123',
          timestamp: Date.now()
        })
      },
      { 
        key: 'user456',
        value: JSON.stringify({
          event: 'purchase',
          userId: 'user456',
          amount: 99.99
        })
      }
    ]
  });
  
  await producer.disconnect();
}

// Consumer Example
const consumer = kafka.consumer({ groupId: 'analytics-group' });

async function consumeMessages() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'user-events', fromBeginning: true });
  
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        offset: message.offset,
        key: message.key.toString(),
        value: JSON.parse(message.value.toString())
      });
    }
  });
}

sendMessage();
consumeMessages();`,
    priority: null
  },
  {
    id: 183,
    category: 'Kafka',
    question: 'Explain Kafka message ordering and delivery guarantees.',
    answer: 'Kafka guarantees order within a partition but not across partitions. Delivery guarantees depend on configuration: at-most-once, at-least-once (default), or exactly-once semantics.',
    explanation: '**Message Ordering:**\n\n**Within Partition:**\n- Messages are strictly ordered\n- Assigned sequential offsets\n- Consumers read in order\n- Key determines partition (same key → same partition)\n\n**Across Partitions:**\n- No ordering guarantee\n- Different partitions processed independently\n- Parallel consumption possible\n\n**Delivery Guarantees:**\n\n1. **At-Most-Once**:\n   - Messages may be lost\n   - Never duplicated\n   - Fastest, least reliable\n   - acks=0\n\n2. **At-Least-Once** (Default):\n   - Messages never lost\n   - May be duplicated\n   - Requires idempotent consumers\n   - acks=all, enable.idempotence=true\n\n3. **Exactly-Once**:\n   - No loss, no duplication\n   - Transactional producers/consumers\n   - Higher overhead\n   - isolation.level=read_committed\n\n**Best Practices:**\n- Use message keys for ordering needs\n- Design idempotent consumers\n- Enable idempotent producer\n- Use transactions for exactly-once\n- Monitor consumer lag',
    codeExample: `// Producer with delivery guarantees
const producer = kafka.producer({
  allowAutoTopicCreation: false,
  idempotent: true  // Enable idempotent producer
});

// At-least-once delivery
await producer.send({
  topic: 'orders',
  messages: [
    {
      key: 'order-123',  // Same key ensures ordering
      value: JSON.stringify({ orderId: '123', amount: 100 })
    }
  ],
  acks: -1  // Wait for all replicas (acks=all)
});

// Exactly-once with transactions
const transaction = await producer.transaction();

try {
  await transaction.send({
    topic: 'orders',
    messages: [{
      key: 'order-456',
      value: JSON.stringify({ orderId: '456', amount: 200 })
    }]
  });
  
  await transaction.send({
    topic: 'notifications',
    messages: [{
      value: JSON.stringify({ type: 'order-created', orderId: '456' })
    }]
  });
  
  await transaction.commit();
} catch (error) {
  await transaction.abort();
  console.error('Transaction failed:', error);
}

// Idempotent consumer
async function processMessage(message) {
  const data = JSON.parse(message.value.toString());
  const messageId = data.messageId;
  
  // Check if already processed
  const alreadyProcessed = await checkProcessed(messageId);
  if (alreadyProcessed) {
    console.log('Duplicate message, skipping');
    return;
  }
  
  // Process message
  await processData(data);
  
  // Mark as processed
  await markProcessed(messageId);
}`,
    priority: null
  },
  {
    id: 184,
    category: 'Kafka',
    question: 'What is Kafka Connect and when should you use it?',
    answer: 'Kafka Connect is a framework for building and running connectors that move data between Kafka and external systems (databases, file systems, cloud services) without custom code.',
    explanation: '**Kafka Connect Overview:**\n\n**Components:**\n1. **Connectors**: Plugins that integrate with external systems\n   - Source connectors: Import data into Kafka\n   - Sink connectors: Export data from Kafka\n\n2. **Workers**: Run connectors and tasks\n   - Standalone mode: Single worker\n   - Distributed mode: Cluster of workers\n\n3. **Tasks**: Parallel units of work\n   - Handle actual data movement\n   - Scale horizontally\n\n**Popular Connectors:**\n- JDBC Connector: Database integration\n- Elasticsearch Connector: Search indexing\n- S3 Connector: Data lake storage\n- MongoDB Connector: NoSQL integration\n- HTTP Connector: REST APIs\n\n**When to Use:**\n- ETL pipelines\n- Database change data capture (CDC)\n- Data synchronization\n- Log aggregation\n- Stream data to data warehouses\n\n**Benefits:**\n- No custom code needed\n- Scalable and fault-tolerant\n- Rich ecosystem of connectors\n- Automatic offset management',
    codeExample: `// Source Connector Configuration (JDBC)
{
  "name": "mysql-source",
  "config": {
    "connector.class": "io.confluent.connect.jdbc.JdbcSourceConnector",
    "connection.url": "jdbc:mysql://localhost:3306/mydb",
    "connection.user": "username",
    "connection.password": "password",
    "table.whitelist": "users,orders",
    "mode": "incrementing",
    "incrementing.column.name": "id",
    "topic.prefix": "mysql-",
    "tasks.max": "3"
  }
}

// Sink Connector Configuration (Elasticsearch)
{
  "name": "elasticsearch-sink",
  "config": {
    "connector.class": "io.confluent.connect.elasticsearch.ElasticsearchSinkConnector",
    "connection.url": "http://localhost:9200",
    "topics": "mysql-users,mysql-orders",
    "type.name": "_doc",
    "key.converter": "org.apache.kafka.connect.storage.StringConverter",
    "value.converter": "org.apache.kafka.connect.json.JsonConverter",
    "value.converter.schemas.enable": false,
    "tasks.max": "3"
  }
}

// REST API: List connectors
curl http://localhost:8083/connectors

// Create connector
curl -X POST http://localhost:8083/connectors \\
  -H "Content-Type: application/json" \\
  -d @source-connector.json

// Check connector status
curl http://localhost:8083/connectors/mysql-source/status`,
    priority: null
  },
  {
    id: 185,
    category: 'Kafka',
    question: 'How does Kafka handle fault tolerance and data replication?',
    answer: 'Kafka achieves fault tolerance through replication across multiple brokers. Each partition has a leader and followers. If leader fails, a follower becomes the new leader automatically.',
    explanation: '**Replication Mechanism:**\n\n**Replica Types:**\n1. **Leader Replica**: Handles all reads/writes for partition\n2. **Follower Replicas**: Replicate data from leader\n   - In-sync replicas (ISR): Up-to-date followers\n   - Out-of-sync: Lagging behind\n\n**Replication Factor:**\n- Number of copies of each partition\n- Recommended: 3 for production\n- Higher = more fault tolerance, more storage\n\n**Failover Process:**\n1. Leader fails\n2. Controller detects failure\n3. New leader elected from ISR\n4. Clients reconnect to new leader\n5. Minimal downtime\n\n**Acknowledgment Configurations:**\n- acks=0: No acknowledgment (fastest, riskiest)\n- acks=1: Leader acknowledgment only\n- acks=all: All ISR acknowledge (safest)\n\n**Min.insync.replicas:**\n- Minimum ISR size for writes\n- Prevents data loss\n- Recommended: 2 with replication factor 3\n\n**Unclean Leader Election:**\n- Allow out-of-sync replica to become leader\n- Risk of data loss\n- Generally disabled in production',
    codeExample: `// Topic creation with replication
kafka-topics.sh --create \\
  --topic orders \\
  --partitions 6 \\
  --replication-factor 3 \\
  --bootstrap-server localhost:9092

// Producer configuration for durability
const producer = kafka.producer({
  allowAutoTopicCreation: false,
  idempotent: true,
  retry: {
    maxRetryTime: 30000,
    initialRetryTime: 100,
    retries: 10
  }
});

await producer.send({
  topic: 'orders',
  messages: [{ value: JSON.stringify(order) }],
  acks: -1  // Wait for all ISR (acks=all)
});

// Broker configuration (server.properties)
# Replication settings
num.partitions=6
default.replication.factor=3
min.insync.replicas=2
unclean.leader.election.enable=false

# ISR settings
replica.lag.time.max.ms=30000
auto.leader.rebalance.enable=true
leader.imbalance.check.interval.seconds=300

// Monitor replication
kafka-topics.sh --describe \\
  --topic orders \\
  --bootstrap-server localhost:9092

# Output shows:
# Topic: orders  PartitionCount: 6  ReplicationFactor: 3
#   Partition: 0  Leader: 1  Replicas: 1,2,3  Isr: 1,2,3
#   Partition: 1  Leader: 2  Replicas: 2,3,1  Isr: 2,3,1`,
    priority: null
  },
  {
    id: 186,
    category: 'Kafka',
    question: 'What is Kafka Streams and how does it differ from traditional stream processing?',
    answer: 'Kafka Streams is a client library for building stream processing applications. Unlike traditional frameworks, it runs as part of your application (not separate cluster), uses Kafka for state storage, and provides exactly-once semantics.',
    explanation: '**Kafka Streams Features:**\n\n**Architecture:**\n- Library, not framework (embed in app)\n- No separate cluster needed\n- Uses Kafka for coordination\n- Leverages consumer/producer APIs\n\n**Key Concepts:**\n1. **KStream**: Unbounded stream of records\n2. **KTable**: changelog stream (latest value per key)\n3. **GlobalKTable**: Full copy of topic data\n4. **Processor Topology**: DAG of operations\n\n**Operations:**\n- Filter, map, flatMap\n- Aggregations (count, sum, average)\n- Joins (stream-stream, stream-table)\n- Windowing (tumbling, hopping, session)\n- Branching and merging\n\n**State Management:**\n- Local state stores (RocksDB)\n- Changelog topics for fault tolerance\n- Automatic state restoration\n\n**Advantages:**\n- Simple deployment (just run app)\n- Elastic scaling\n- Fault tolerance built-in\n- Exactly-once processing\n- Low latency',
    codeExample: `// Kafka Streams Application (Java)
import org.apache.kafka.streams.KafkaStreams;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.kstream.KStream;
import org.apache.kafka.streams.kstream.Materialized;

public class OrderProcessingApp {
    public static void main(String[] args) {
        StreamsBuilder builder = new StreamsBuilder();
        
        // Read from input topic
        KStream<String, String> orders = builder.stream("orders");
        
        // Filter valid orders
        KStream<String, String> validOrders = orders.filter((key, value) -> {
            Order order = parseOrder(value);
            return order != null && order.getAmount() > 0;
        });
        
        // Calculate total per customer
        validOrders.groupByKey()
            .aggregate(
                () -> 0.0,  // Initializer
                (key, value, aggregate) -> aggregate + parseOrder(value).getAmount(),
                Materialized.as("customer-totals")
            )
            .toStream()
            .to("customer-totals-output");
        
        // Windowed aggregation
        validOrders.groupByKey()
            .windowedBy(TimeWindows.ofSizeWithNoGrace(Duration.ofMinutes(5)))
            .count()
            .toStream()
            .to("order-counts-windowed");
        
        KafkaStreams streams = new KafkaStreams(builder.build(), config);
        streams.start();
    }
}

// Configuration
Properties config = new Properties();
config.put(StreamsConfig.APPLICATION_ID_CONFIG, "order-processor");
config.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
config.put(StreamsConfig.PROCESSING_GUARANTEE_CONFIG, 
           StreamsConfig.EXACTLY_ONCE_V2);`,
    priority: null
  },
  {
    id: 187,
    category: 'Kafka',
    question: 'Explain Kafka broker architecture and cluster management.',
    answer: 'A Kafka cluster consists of multiple brokers (servers). Each broker is identified by a unique ID and stores partitions. Brokers handle read/write requests, replicate data, and communicate via ZooKeeper or KRaft for cluster coordination.',
    explanation: '**Broker Architecture:**\n\n**Broker Components:**\n1. **Network Layer**: Handles client connections\n2. **Storage Engine**: Manages log segments on disk\n3. **Replication Manager**: Handles leader/follower sync\n4. **Group Coordinator**: Manages consumer groups\n5. **Transaction Coordinator**: Handles transactions\n\n**Cluster Coordination:**\n\n**ZooKeeper Mode (Legacy):**\n- Stores metadata (brokers, topics, partitions)\n- Leader election\n- Configuration management\n- Being phased out\n\n**KRaft Mode (New):**\n- Kafka Raft consensus protocol\n- No ZooKeeper dependency\n- Controller quorum\n- Simplified operations\n- Better scalability\n\n**Broker Roles:**\n- **Controller Broker**: Manages partition leadership\n- **Leader Broker**: Handles reads/writes for partition\n- **Follower Broker**: Replicates from leader\n\n**Key Configurations:**\n- broker.id: Unique identifier\n- log.dirs: Data directories\n- num.partitions: Default partitions\n- default.replication.factor\n- min.insync.replicas\n- unclean.leader.election.enable\n\n**Best Practices:**\n- Use odd number of brokers for quorum\n- Separate data directories across disks\n- Monitor broker health metrics\n- Plan capacity for growth\n- Use rack awareness for HA',
    codeExample: `# Kafka Broker Configuration (server.properties)

# Broker ID
broker.id=1

# Network Settings
listeners=PLAINTEXT://0.0.0.0:9092
advertised.listeners=PLAINTEXT://broker1.example.com:9092
num.network.threads=3
num.io.threads=8
socket.send.buffer.bytes=102400
socket.receive.buffer.bytes=102400
socket.request.max.bytes=104857600

# Log Settings
log.dirs=/tmp/kafka-logs,/mnt/data/kafka-logs
num.partitions=6
num.recovery.threads.per.data.dir=1
log.retention.hours=168
log.segment.bytes=1073741824
log.retention.check.interval.ms=300000

# Replication
default.replication.factor=3
min.insync.replicas=2
unclean.leader.election.enable=false
replica.lag.time.max.ms=30000

# ZooKeeper (legacy)
zookeeper.connect=zk1:2181,zk2:2181,zk3:2181/kafka
zookeeper.connection.timeout.ms=18000

# KRaft Mode (new)
process.roles=broker,controller
node.id=1
controller.quorum.voters=1@broker1:9093,2@broker2:9093,3@broker3:9093
controller.listener.names=CONTROLLER
listeners=PLAINTEXT://broker1:9092,CONTROLLER://broker1:9093
inter.broker.listener.name=PLAINTEXT

# Performance Tuning
num.replica.fetchers=1
replica.fetch.max.bytes=1048576
fetch.message.max.bytes=1048576

# Group Coordinator
group.initial.rebalance.delay.ms=3000
offsets.topic.replication.factor=3
transaction.state.log.replication.factor=3
transaction.state.log.min.isr=2

# Monitoring
auto.create.topics.enable=false
delete.topic.enable=true

# Start broker
bin/kafka-server-start.sh config/server.properties &

# Check broker status
bin/kafka-broker-api-versions.sh --bootstrap-server localhost:9092

# List all brokers
bin/kafka-metadata.sh --snapshot /tmp/kafka-combined-metadata.log \\
  --cluster-id <cluster-id> \\
  command brokers

# Rolling restart
bin/kafka-server-stop.sh
# Wait for ISR to sync
bin/kafka-server-start.sh config/server.properties`,
    priority: null
  },
  {
    id: 188,
    category: 'Kafka',
    question: 'How do you optimize Kafka performance for high throughput?',
    answer: 'Optimize Kafka performance through batch configuration, compression, proper partitioning, hardware tuning, and producer/consumer settings. Key areas include batch size, linger time, compression type, and I/O optimization.',
    explanation: '**Producer Optimization:**\n\n**Batching:**\n- **batch.size**: Larger batches = better throughput (default: 16KB)\n- **linger.ms**: Wait to fill batches (default: 0ms)\n- **max.request.size**: Max request size (default: 1MB)\n\n**Compression:**\n- **compression.type**: none, gzip, snappy, lz4, zstd\n- LZ4: Best balance of speed/compression\n- Zstd: Best compression ratio\n- Reduces network I/O significantly\n\n**Acknowledgments:**\n- **acks=0**: Fastest, no guarantee\n- **acks=1**: Leader acknowledgment\n- **acks=all**: All ISR (safest, slower)\n\n**Consumer Optimization:**\n- **fetch.min.bytes**: Minimum data to fetch\n- **fetch.max.wait.ms**: Max wait time\n- **max.poll.records**: Records per poll\n- Increase parallelism with more partitions\n\n**Broker Optimization:**\n- **num.io.threads**: Match disk count\n- **num.network.threads**: Handle connections\n- **log.flush.interval.messages**: Flush frequency\n- Use SSDs for better I/O\n- Separate log directories across disks\n\n**Topic Design:**\n- Right-size partitions (not too many/few)\n- Appropriate retention period\n- Enable compaction if needed\n- Avoid hot partitions\n\n**Hardware:**\n- Fast disks (SSD/NVMe)\n- Sufficient RAM for page cache\n- High network bandwidth\n- Multiple CPU cores',
    codeExample: `// Optimized Producer Configuration
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'high-throughput-producer',
  brokers: ['broker1:9092', 'broker2:9092', 'broker3:9092']
});

const producer = kafka.producer({
  // Batching
  allowAutoTopicCreation: false,
  createPartitioner: Kafka.Partitioners.LegacyPartitioner,
  
  // Retry configuration
  retry: {
    initialRetryTime: 100,
    maxRetryTime: 30000,
    retries: 5
  }
});

// Send with optimized settings
await producer.send({
  topic: 'events',
  messages: largeMessageArray,  // Batch multiple messages
  compression: Kafka.CompressionTypes.LZ4,  // Compression
  acks: -1  // Wait for all ISR
});

// Java Producer with optimizations
Properties props = new Properties();
props.put("bootstrap.servers", "broker1:9092,broker2:9092");
props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

// Batching
props.put("batch.size", 32768);  // 32KB
props.put("linger.ms", 10);      // Wait 10ms to fill batch
props.put("buffer.memory", 67108864);  // 64MB buffer

// Compression
props.put("compression.type", "lz4");

// Reliability
props.put("acks", "all");
props.put("retries", 3);
props.put("enable.idempotence", true);

// Performance
props.put("max.in.flight.requests.per.connection", 5);
props.put("delivery.timeout.ms", 120000);

KafkaProducer<String, String> producer = new KafkaProducer<>(props);

// Consumer optimizations
Properties consumerProps = new Properties();
consumerProps.put("group.id", "analytics-group");
consumerProps.put("fetch.min.bytes", 1048576);  // 1MB
consumerProps.put("fetch.max.wait.ms", 500);
consumerProps.put("max.poll.records", 1000);
consumerProps.put("auto.offset.reset", "earliest");

// Broker tuning (server.properties)
# I/O threads
num.io.threads=16
num.network.threads=8

# Log settings
log.flush.interval.messages=10000
log.flush.interval.ms=1000

# Replica settings
num.replica.fetchers=2
replica.fetch.max.bytes=1048576

# Request handling
queued.max.requests=500
num.partitions=12

# Monitoring commands
# Check throughput
bin/kafka-producer-perf-test.sh \\
  --topic test-topic \\
  --num-records 1000000 \\
  --record-size 1000 \\
  --throughput -1 \\
  --producer-props bootstrap.servers=localhost:9092

# Consumer lag monitoring
bin/kafka-consumer-groups.sh \\
  --bootstrap-server localhost:9092 \\
  --describe \\
  --group analytics-group`,
    priority: null
  },
  {
    id: 189,
    category: 'Kafka',
    question: 'What is Kafka security and how do you implement authentication and authorization?',
    answer: 'Kafka security includes authentication (SSL/SASL), authorization (ACLs), and encryption (SSL/TLS). Implement security through SSL certificates, SASL mechanisms (PLAIN, SCRAM, GSSAPI), and ACL-based access control.',
    explanation: '**Authentication Methods:**\n\n**1. SSL/TLS:**\n- Certificate-based authentication\n- Encrypts data in transit\n- Mutual TLS (mTLS) for client auth\n- Most secure option\n\n**2. SASL Mechanisms:**\n- **SASL/PLAIN**: Username/password (simple)\n- **SASL/SCRAM**: Salted Challenge Response (better)\n- **SASL/GSSAPI**: Kerberos integration\n- **SASL/OAUTHBEARER**: OAuth 2.0 tokens\n- **SASL/AWS_MSK_IAM**: AWS IAM authentication\n\n**Authorization:**\n\n**ACLs (Access Control Lists):**\n- Topic-level permissions\n- Consumer group permissions\n- Transactional ID permissions\n- Cluster-level operations\n- Principal-based access control\n\n**Security Layers:**\n1. **Encryption**: SSL/TLS for data in transit\n2. **Authentication**: Verify identity\n3. **Authorization**: Control access\n4. **Audit Logging**: Track operations\n\n**Best Practices:**\n- Enable SSL for all communications\n- Use SCRAM over PLAIN\n- Implement least privilege ACLs\n- Rotate credentials regularly\n- Monitor security events\n- Use separate principals for services\n- Enable audit logging',
    codeExample: `# SSL Configuration (broker)

# server.properties
listeners=SSL://0.0.0.0:9093
advertised.listeners=SSL://broker1.example.com:9093

ssl.keystore.location=/var/private/ssl/kafka.server.keystore.jks
ssl.keystore.password=keystore-password
ssl.key.password=key-password
ssl.truststore.location=/var/private/ssl/kafka.server.truststore.jks
ssl.truststore.password=truststore-password

ssl.client.auth=required  # Require client certificates
ssl.enabled.protocols=TLSv1.2,TLSv1.3
ssl.cipher.suites=TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384

# SASL/SCRAM Configuration
listeners=SASL_SSL://0.0.0.0:9094
advertised.listeners=SASL_SSL://broker1.example.com:9094

sasl.enabled.mechanisms=SCRAM-SHA-512
sasl.mechanism.inter.broker.protocol=SCRAM-SHA-512

# Create SCRAM users
bin/kafka-configs.sh --zookeeper localhost:2181 \\
  --alter --add-config 'SCRAM-SHA-512=[password=secret123]' \\
  --entity-type users --entity-name admin

bin/kafka-configs.sh --zookeeper localhost:2181 \\
  --alter --add-config 'SCRAM-SHA-512=[password=userpass]' \\
  --entity-type users --entity-name app-user

# Client Configuration (producer)
const fs = require('fs');
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'secure-producer',
  brokers: ['broker1:9094'],
  ssl: {
    ca: [fs.readFileSync('/path/to/ca-cert.pem')],
    cert: fs.readFileSync('/path/to/client-cert.pem'),
    key: fs.readFileSync('/path/to/client-key.pem'),
    rejectUnauthorized: true
  },
  sasl: {
    mechanism: 'scram-sha-512',
    username: 'app-user',
    password: 'userpass'
  }
});

// ACL Management
# Create ACLs
bin/kafka-acls.sh --bootstrap-server localhost:9094 \\
  --command-config client.properties \\
  --add \\
  --allow-principal User:app-user \\
  --operation Write \\
  --topic orders

bin/kafka-acls.sh --bootstrap-server localhost:9094 \\
  --command-config client.properties \\
  --add \\
  --allow-principal User:app-user \\
  --operation Read \\
  --topic orders

bin/kafka-acls.sh --bootstrap-server localhost:9094 \\
  --command-config client.properties \\
  --add \\
  --allow-principal User:app-user \\
  --operation Read \\
  --group analytics-group

# List ACLs
bin/kafka-acls.sh --bootstrap-server localhost:9094 \\
  --command-config client.properties \\
  --list

# Remove ACL
bin/kafka-acls.sh --bootstrap-server localhost:9094 \\
  --command-config client.properties \\
  --remove \\
  --allow-principal User:app-user \\
  --operation Write \\
  --topic orders

# Terraform: Kafka ACLs
resource "kafka_acl" "producer_write" {
  resource_name       = "orders"
  resource_type       = "Topic"
  acl_principal       = "User:app-user"
  acl_host            = "*"
  acl_operation       = "Write"
  acl_permission_type = "Allow"
}

resource "kafka_acl" "consumer_read" {
  resource_name       = "orders"
  resource_type       = "Topic"
  acl_principal       = "User:app-user"
  acl_host            = "*"
  acl_operation       = "Read"
  acl_permission_type = "Allow"
}

# Generate SSL certificates
# CA Certificate
openssl req -new -x509 -keyout ca-key -out ca-cert -days 365

# Server Keystore
keytool -keystore kafka.server.keystore.jks -alias localhost -validity 365 -genkey

# Sign server certificate
openssl x509 -req -CA ca-cert -CAkey ca-key -in cert-file -out cert-signed -days 365

# Import CA to truststore
keytool -keystore kafka.server.truststore.jks -alias CARoot -import -file ca-cert`,
    priority: null
  },
  {
    id: 190,
    category: 'Kafka',
    question: 'Explain Kafka monitoring and observability best practices.',
    answer: 'Monitor Kafka using JMX metrics, consumer lag, broker health, and throughput metrics. Use tools like Kafka Manager, Burrow, Prometheus + Grafana for comprehensive observability. Key metrics include ISR shrink rate, under-replicated partitions, and consumer lag.',
    explanation: '**Key Metrics to Monitor:**\n\n**Broker Metrics:**\n1. **Under-replicated Partitions**: Should be 0\n2. **ISR Shrink/Expand Rate**: Indicates replication issues\n3. **Request Handler Idle Ratio**: Should be > 30%\n4. **Network Processor Idle Ratio**: Network bottleneck indicator\n5. **Log Flush Latency**: Disk I/O performance\n6. **Bytes In/Out Per Second**: Throughput\n7. **Messages In Per Second**: Production rate\n\n**Producer Metrics:**\n- Record send rate\n- Record error rate\n- Request latency\n- Batch size average\n- Compression ratio\n- Retry rate\n\n**Consumer Metrics:**\n- **Consumer Lag**: Most critical metric\n- Records consumed per second\n- Poll rate\n- Commit rate\n- Rebalance rate\n- Fetch latency\n\n**Topic Metrics:**\n- Partition count\n- Replication factor\n- Retention size/time\n- Log end offset\n- Log start offset\n\n**Monitoring Tools:**\n\n1. **Prometheus + Grafana**:\n   - JMX exporter for metrics\n   - Custom dashboards\n   - Alerting rules\n\n2. **Burrow**:\n   - Consumer lag monitoring\n   - HTTP API\n   - Email/Slack alerts\n\n3. **Kafka Manager/CMAK**:\n   - Web UI for cluster management\n   - Broker/topic inspection\n   - Consumer group monitoring\n\n4. **Confluent Control Center**:\n   - Enterprise monitoring\n   - Stream monitoring\n   - Schema registry UI\n\n**Alerting Rules:**\n- Under-replicated partitions > 0\n- Consumer lag > threshold\n- Offline partitions > 0\n- Active controller count != 1\n- Request handler idle < 20%\n- Disk usage > 80%',
    codeExample: `# Prometheus JMX Exporter Configuration (jmx-exporter.yml)
lowercaseOutputName: true
lowercaseOutputLabelNames: true

rules:
  # Broker metrics
  - pattern: kafka.server<type=ReplicaManager, name=(\w+)><>(Value|Count)
    name: kafka_server_replicamanager_$1
    
  - pattern: kafka.server<type=BrokerTopicMetrics, name=(\w+), topic=(\w+)><>(Count|OneMinuteRate)
    name: kafka_server_brokertopicmetrics_$1
    labels:
      topic: "$2"
      
  # Consumer group metrics
  - pattern: kafka.consumer<type=consumer-fetch-manager-metrics, client-id=(\w+), topic=(\w+)><>(bytes-consumed-rate|records-consumed-rate)
    name: kafka_consumer_fetch_manager_$1
    labels:
      client_id: "$2"
      topic: "$3"

# Start JMX exporter
java -jar jmx_prometheus_javaagent.jar 9404 jmx-exporter.yml \\
  -jar /opt/kafka/bin/kafka-run-class.sh kafka.Kafka

# Prometheus scrape config
# prometheus.yml
scrape_configs:
  - job_name: 'kafka-brokers'
    static_configs:
      - targets: ['broker1:9404', 'broker2:9404', 'broker3:9404']
        
  - job_name: 'kafka-consumer-lag'
    static_configs:
      - targets: ['burrow:8000']

# Grafana Dashboard JSON (simplified)
{
  "dashboard": {
    "title": "Kafka Cluster Overview",
    "panels": [
      {
        "title": "Under-Replicated Partitions",
        "targets": [
          {
            "expr": "kafka_server_replicamanager_underreplicatedpartitions"
          }
        ],
        "thresholds": [
          {"value": 0, "colorMode": "ok"},
          {"value": 1, "colorMode": "critical"}
        ]
      },
      {
        "title": "Messages In Per Second",
        "targets": [
          {
            "expr": "rate(kafka_server_brokertopicmetrics_messagesinpersec_count[5m])"
          }
        ]
      },
      {
        "title": "Consumer Lag",
        "targets": [
          {
            "expr": "kafka_consumergroup_lag_sum"
          }
        ]
      }
    ]
  }
}

# Burrow Configuration (burrow.toml)
[general]
pidfile = "burrow.pid"

[zookeeper]
servers = ["zk1:2181", "zk2:2181", "zk3:2181"]
timeout = 6
root-path = "/burrow"

[cluster.local]
class-name = "Kafka"
servers = ["broker1:9092", "broker2:9092", "broker3:9092"]
client-profile = "local"

[consumer.local]
class-name = "Kafka"
cluster = "local"
servers = ["broker1:9092", "broker2:9092", "broker3:9092"]

[httpserver.default]
address = ":8000"

# Check consumer lag via Burrow API
curl http://burrow:8000/v3/kafka/local/consumer/analytics-group/lag

# Kafka CLI monitoring
# Describe topic
bin/kafka-topics.sh --describe --bootstrap-server localhost:9092 --topic orders

# List consumer groups
bin/kafka-consumer-groups.sh --bootstrap-server localhost:9092 --list

# Describe consumer group
bin/kafka-consumer-groups.sh --bootstrap-server localhost:9092 \\
  --describe --group analytics-group

# Get broker metrics
bin/kafka-broker-api-versions.sh --bootstrap-server localhost:9092

# Monitor with kafkacat
kafkacat -b broker1:9092 -t orders -C -o beginning -c 10

# Real-time monitoring script
#!/bin/bash
while true; do
  echo "=== Kafka Cluster Status ==="
  echo "Under-replicated partitions:"
  bin/kafka-topics.sh --describe --bootstrap-server localhost:9092 | \\
    grep -c "UnderReplicated"
  
  echo "Consumer lag:"
  bin/kafka-consumer-groups.sh --bootstrap-server localhost:9092 \\
    --describe --all-groups | grep -v "GROUP" | awk '{print $1, $5}'
  
  sleep 60
done`,
    priority: null
  },
  {
    id: 191,
    category: 'Kafka',
    question: 'What are Kafka compacted topics and when should you use them?',
    answer: 'Log compaction retains only the latest value for each key in a topic. Use it for changelog streams, state maintenance, and scenarios where you need the current state rather than full history. Ideal for database CDC and configuration updates.',
    explanation: '**Log Compaction Overview:**\n\n**How It Works:**\n1. Kafka maintains log segments\n2. Compactor runs in background\n3. For each key, keeps only latest record\n4. Deletes older records with same key\n5. Preserves tombstones (null values)\n\n**Compaction Process:**\n- Runs periodically based on settings\n- Creates clean segments\n- Swaps old segments with clean ones\n- Maintains message order within key\n- Does not affect active segment\n\n**Use Cases:**\n1. **Change Data Capture (CDC)**: Current row state\n2. **Configuration Updates**: Latest config per service\n3. **User Profiles**: Current user data\n4. **Inventory Systems**: Current stock levels\n5. **Schema Evolution**: Latest schema version\n6. **State Stores**: Kafka Streams state\n\n**Configuration:**\n- **cleanup.policy**: compact or compact,delete\n- **min.cleanable.dirty.ratio**: Compaction trigger (default: 0.5)\n- **delete.retention.ms**: Tombstone retention (default: 24h)\n- **min.compaction.lag**: Min time before compaction\n- **max.compaction.lag**: Max time before compaction\n- **segment.ms**: Segment roll time\n\n**Tombstones:**\n- Messages with null value\n- Signal key deletion\n- Retained for delete.retention.ms\n- Important for downstream consumers\n\n**Best Practices:**\n- Always set keys for compacted topics\n- Monitor compaction lag\n- Set appropriate retention\n- Handle tombstones in consumers\n- Don\'t use for event sourcing\n- Test compaction behavior',
    codeExample: `# Create compacted topic
bin/kafka-topics.sh --create \\
  --bootstrap-server localhost:9092 \\
  --topic user-profiles \\
  --partitions 6 \\
  --replication-factor 3 \\
  --config cleanup.policy=compact \\
  --config min.cleanable.dirty.ratio=0.1 \\
  --config delete.retention.ms=86400000 \\
  --config segment.ms=3600000

# Mixed policy (compact and delete)
bin/kafka-topics.sh --create \\
  --bootstrap-server localhost:9092 \\
  --topic events-with-compaction \\
  --partitions 6 \\
  --config cleanup.policy=compact,delete \\
  --config retention.ms=604800000  # 7 days

// Producer for compacted topic
const { Kafka } = require('kafkajs');
const kafka = new Kafka({ brokers: ['localhost:9092'] });
const producer = kafka.producer();

async function updateUserProfile(userId, profileData) {
  await producer.send({
    topic: 'user-profiles',
    messages: [{
      key: userId,  // Key is critical for compaction
      value: JSON.stringify({
        ...profileData,
        updatedAt: Date.now()
      })
    }]
  });
}

// Delete user (tombstone)
async function deleteUserProfile(userId) {
  await producer.send({
    topic: 'user-profiles',
    messages: [{
      key: userId,
      value: null  // Tombstone - marks key for deletion
    }]
  });
}

// Consumer for compacted topic
const consumer = kafka.consumer({ groupId: 'profile-sync' });

await consumer.subscribe({ topic: 'user-profiles', fromBeginning: true });

await consumer.run({
  eachMessage: async ({ message }) => {
    const key = message.key.toString();
    const value = message.value ? JSON.parse(message.value.toString()) : null;
    
    if (value === null) {
      // Tombstone - delete from local store
      console.log('Deleting profile for ' + key);
      await deleteFromDatabase(key);
    } else {
      // Update profile
      console.log('Updating profile for ' + key);
      await upsertToDatabase(key, value);
    }
  }
});

// Terraform: Compacted Topic
resource "kafka_topic" "user_profiles" {
  name               = "user-profiles"
  replication_factor = 3
  partitions         = 6
  
  config = {
    "cleanup.policy"            = "compact"
    "min.cleanable.dirty.ratio" = "0.1"
    "delete.retention.ms"       = "86400000"
    "segment.ms"                = "3600000"
    "min.insync.replicas"       = "2"
  }
}

# Monitor compaction
bin/kafka-log-dirs.sh --describe --bootstrap-server localhost:9092 \\
  --topic-list user-profiles

# Check compaction stats
bin/kafka-configs.sh --describe --bootstrap-server localhost:9092 \\
  --entity-type topics --entity-name user-profiles

# Force compaction (for testing)
bin/kafka-configs.sh --alter --bootstrap-server localhost:9092 \\
  --entity-type topics --entity-name user-profiles \\
  --add-config min.cleanable.dirty.ratio=0.01

# View compacted data
bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 \\
  --topic user-profiles \\
  --from-beginning \\
  --property print.key=true \\
  --property key.separator=":"`,
    priority: null
  },
  {
    id: 192,
    category: 'Kafka',
    question: 'Explain Kafka Schema Registry and why schema evolution matters.',
    answer: 'Schema Registry manages Avro/Protobuf/JSON schemas for Kafka topics. It ensures data compatibility during schema changes, prevents breaking changes, and enables schema evolution strategies (backward, forward, full compatibility).',
    explanation: '**Schema Registry Overview:**\n\n**Purpose:**\n- Centralized schema management\n- Schema versioning\n- Compatibility checking\n- Prevents data corruption\n- Enables schema evolution\n\n**Supported Formats:**\n1. **Avro**: Most common, binary format\n2. **Protobuf**: Google\'s serialization\n3. **JSON Schema**: Human-readable\n\n**Compatibility Levels:**\n\n1. **BACKWARD**: New schema reads old data\n   - Can add optional fields\n   - Cannot remove required fields\n   - Most common\n\n2. **FORWARD**: Old schema reads new data\n   - Can add fields with defaults\n   - Cannot remove fields\n\n3. **FULL**: Both backward and forward\n   - Strictest compatibility\n   - Safest for production\n\n4. **NONE**: No compatibility check\n   - Not recommended\n\n**Schema Evolution Rules:**\n\n**Safe Changes:**\n- Add optional field with default\n- Remove optional field\n- Change field order\n- Widen numeric types\n\n**Breaking Changes:**\n- Remove required field\n- Change field type incompatibly\n- Rename field\n- Change field requirement\n\n**Benefits:**\n- Type safety\n- Smaller message size (Avro)\n- Automatic serialization\n- Documentation\n- Validation\n\n**Best Practices:**\n- Use backward compatibility\n- Version schemas properly\n- Test schema changes\n- Document breaking changes\n- Use subject naming strategy\n- Monitor schema registry health',
    codeExample: `// Schema Registry Client (Node.js)
const { SchemaRegistry, readAVSC } = require('@kafkajs/schema-registry-avro');

const registry = new SchemaRegistry({
  host: 'http://schema-registry:8081'
});

// Register schema
const schema = readAVSC('./schemas/user.avsc');
const { id } = await registry.register({
  type: 'AVRO',
  schema: JSON.stringify(schema)
});

console.log('Schema registered with ID:', id);

// Avro Schema (user.avsc)
{
  "type": "record",
  "name": "User",
  "namespace": "com.example",
  "fields": [
    {"name": "id", "type": "int"},
    {"name": "name", "type": "string"},
    {"name": "email", "type": "string"},
    {"name": "age", "type": ["int", "null"], "default": null}
  ]
}

// Producer with schema
const producer = kafka.producer();

async function sendUser(user) {
  const { id, schema } = await registry.getLatestSchema('users-value');
  
  const encoded = await registry.encode(id, user);
  
  await producer.send({
    topic: 'users',
    messages: [{
      key: user.id.toString(),
      value: encoded
    }]
  });
}

// Consumer with schema
const consumer = kafka.consumer({ groupId: 'user-processors' });
await consumer.subscribe({ topic: 'users' });

await consumer.run({
  eachMessage: async ({ message }) => {
    const decoded = await registry.decode(message.value);
    console.log('Received user:', decoded);
    // Type-safe access
    console.log(decoded.name, decoded.email);
  }
});

// Schema Evolution Example
// V1 Schema
{
  "type": "record",
  "name": "User",
  "fields": [
    {"name": "id", "type": "int"},
    {"name": "name", "type": "string"}
  ]
}

// V2 Schema (Backward Compatible)
{
  "type": "record",
  "name": "User",
  "fields": [
    {"name": "id", "type": "int"},
    {"name": "name", "type": "string"},
    {"name": "email", "type": ["string", "null"], "default": null}  // Added optional field
  ]
}

// REST API: Schema Registry
curl -X POST http://localhost:8081/subjects/users-value/versions \\
  -H "Content-Type: application/vnd.schemaregistry.v1+json" \\
  -d '{"schema": "{...}"}'

# Get latest schema
curl http://localhost:8081/subjects/users-value/versions/latest

# Check compatibility
curl -X POST http://localhost:8081/compatibility/subjects/users-value/versions/latest \\
  -H "Content-Type: application/vnd.schemaregistry.v1+json" \\
  -d '{"schema": "{...}"}'

# List all subjects
curl http://localhost:8081/subjects

# Terraform: Schema Registry
resource "confluent_schema" "user_schema" {
  rest_endpoint = "https://psrc-xyz.us-west-2.aws.confluent.cloud"
  subject_name  = "users-value"
  format        = "AVRO"
  
  schema = <<-EOF
    {
      "type": "record",
      "name": "User",
      "fields": [
        {"name": "id", "type": "int"},
        {"name": "name", "type": "string"},
        {"name": "email", "type": ["string", "null"], "default": null}
      ]
    }
  EOF
}

# Schema Registry Configuration
# schema-registry.properties
kafkastore.bootstrap.servers=broker1:9092,broker2:9092
kafkastore.topic=_schemas
listeners=http://0.0.0.0:8081
schema.compatibility.level=BACKWARD
host.name=schema-registry`,
    priority: null
  },
  // Redis Questions
  {
    id: 193,
    category: 'Redis',
    question: 'What is Redis and what are its primary use cases?',
    answer: 'Redis is an in-memory data structure store used as database, cache, and message broker. Primary use cases include caching, session management, real-time analytics, leaderboards, pub/sub messaging, and rate limiting.',
    explanation: '**Redis Overview:**\n\n**Key Characteristics:**\n- In-memory storage (extremely fast)\n- Supports multiple data structures\n- Single-threaded (simple, predictable)\n- Persistence options (RDB, AOF)\n- Built-in replication and clustering\n\n**Primary Use Cases:**\n\n1. **Caching**: Most common use\n   - Session storage\n   - API response caching\n   - Database query results\n\n2. **Session Management**:\n   - User sessions\n   - Shopping carts\n   - Authentication tokens\n\n3. **Real-time Analytics**:\n   - Counters and metrics\n   - Rate limiting\n   - Leaderboards\n\n4. **Pub/Sub Messaging**:\n   - Real-time notifications\n   - Chat applications\n   - Event broadcasting\n\n5. **Job Queues**:\n   - Background job processing\n   - Task scheduling\n   - Delayed jobs\n\n6. **Geospatial Data**:\n   - Location-based queries\n   - Proximity searches\n\n**Data Structures:**\n- Strings, Lists, Sets, Sorted Sets\n- Hashes, Bitmaps, HyperLogLogs\n- Streams, Geospatial indexes',
    codeExample: `// Basic Redis Operations (Node.js with ioredis)
const Redis = require('ioredis');
const redis = new Redis();

// String operations (caching)
await redis.set('user:123:name', 'John Doe', 'EX', 3600); // 1 hour TTL
const name = await redis.get('user:123:name');

// Hash operations (user profile)
await redis.hset('user:123', {
  name: 'John Doe',
  email: 'john@example.com',
  age: 30
});
const userProfile = await redis.hgetall('user:123');

// List operations (queue)
await redis.rpush('task-queue', 'task1', 'task2', 'task3');
const task = await redis.lpop('task-queue');

// Set operations (unique visitors)
await redis.sadd('daily-visitors:2024-01-01', 'user1', 'user2', 'user3');
const visitorCount = await redis.scard('daily-visitors:2024-01-01');

// Sorted Set (leaderboard)
await redis.zadd('leaderboard', 100, 'player1', 200, 'player2', 150, 'player3');
const topPlayers = await redis.zrevrange('leaderboard', 0, 9, 'WITHSCORES');

// Pub/Sub
const subscriber = new Redis();
subscriber.subscribe('notifications');
subscriber.on('message', (channel, message) => {
  console.log('Received:', message);
});

const publisher = new Redis();
publisher.publish('notifications', 'New notification!');

// Rate limiting
async function isRateLimited(userId) {
  const key = \`rate-limit:\${userId}\`;
  const requests = await redis.incr(key);
  
  if (requests === 1) {
    await redis.expire(key, 60); // Reset after 60 seconds
  }
  
  return requests > 100; // Limit: 100 requests per minute
}`,
    priority: null
  },
  {
    id: 194,
    category: 'Redis',
    question: 'Explain Redis persistence options: RDB vs AOF.',
    answer: 'RDB creates point-in-time snapshots at intervals (compact, good for backups). AOF logs every write operation (more durable, larger files). Can use both for best balance of performance and durability.',
    explanation: '**RDB (Redis Database):**\n\n**How it works:**\n- Periodic snapshots of dataset\n- Forks child process to save\n- Binary compressed format\n- Configurable save intervals\n\n**Advantages:**\n- Compact files (good for backups)\n- Fast restart for large datasets\n- Better performance (no continuous I/O)\n- Disaster recovery friendly\n\n**Disadvantages:**\n- Data loss between snapshots\n- Fork operation can be expensive\n- Not suitable for minimal data loss\n\n**AOF (Append Only File):**\n\n**How it works:**\n- Logs every write operation\n- Appends commands to file\n- Rewrites periodically to compact\n- Three fsync policies\n\n**Fsync Policies:**\n1. **always**: Every command (slowest, safest)\n2. **everysec**: Every second (recommended)\n3. **no**: Let OS decide (fastest, riskiest)\n\n**Advantages:**\n- More durable (less data loss)\n- Append-only (no corruption)\n- Easy to understand/debug\n\n**Disadvantages:**\n- Larger files than RDB\n- Slower restart for large datasets\n- Continuous I/O overhead\n\n**Best Practice:**\n- Use both RDB and AOF\n- RDB for backups\n- AOF for durability\n- Redis uses AOF for reconstruction',
    codeExample: `# Redis Configuration (redis.conf)

# RDB Configuration
save 900 1      # Save after 900 sec if at least 1 key changed
save 300 10     # Save after 300 sec if at least 10 keys changed
save 60 10000   # Save after 60 sec if at least 10000 keys changed

stop-writes-on-bgsave-error yes
rdbcompression yes
rdbchecksum yes
dbfilename dump.rdb

# AOF Configuration
appendonly yes
appendfilename "appendonly.aof"

# Fsync policy
appendfsync everysec  # Recommended balance

# AOF Rewrite
auto-aof-rewrite-percentage 100  # Rewrite when 100% larger
auto-aof-rewrite-min-size 64mb   # Minimum size before rewrite

# Mixed persistence (Redis 4+)
aof-use-rdb-preamble yes  # Use RDB preamble in AOF

# Backup script
#!/bin/bash
# Create RDB backup
redis-cli BGSAVE
sleep 5

# Copy to backup location
cp /var/lib/redis/dump.rdb /backup/redis-$(date +%Y%m%d).rdb

# Compress
gzip /backup/redis-$(date +%Y%m%d).rdb

# Restore from backup
# Stop Redis
sudo systemctl stop redis

# Copy backup
cp /backup/redis-20240101.rdb /var/lib/redis/dump.rdb
chown redis:redis /var/lib/redis/dump.rdb

# Start Redis
sudo systemctl start redis`,
    priority: null
  },
  {
    id: 195,
    category: 'Redis',
    question: 'How does Redis handle concurrency with single-threaded architecture?',
    answer: 'Redis uses a single-threaded event loop for command execution, making operations atomic without locks. For I/O operations, it uses non-blocking I/O with multiplexing (epoll/kqueue) to handle many connections efficiently.',
    explanation: '**Single-Threaded Architecture:**\n\n**Why Single-Threaded?**\n- No context switching overhead\n- No race conditions\n- Simpler code, easier to maintain\n- Predictable performance\n- CPU not usually bottleneck\n\n**Event Loop:**\n1. Accept client connections\n2. Read commands from clients\n3. Execute commands sequentially\n4. Send responses back\n5. Repeat\n\n**Non-blocking I/O:**\n- Uses epoll (Linux) or kqueue (BSD)\n- Multiplexes thousands of connections\n- One thread handles all I/O\n- Commands execute quickly (< microseconds)\n\n**Multi-threaded Aspects:**\n- Network I/O (Redis 6+)\n- RDB/AOF persistence (forked process)\n- Lazy deletion (background threads)\n- Cluster bus communication\n\n**Performance Implications:**\n- Great for small, fast operations\n- Single command = atomic operation\n- No need for transactions in most cases\n- Long-running commands block everything\n\n**Best Practices:**\n- Keep commands fast\n- Avoid KEYS * in production\n- Use SCAN instead of KEYS\n- Pipeline multiple commands\n- Don\'t store huge values',
    codeExample: `// Atomic operations (no locks needed)
const Redis = require('ioredis');
const redis = new Redis();

// Atomic increment
await redis.incr('counter');

// Atomic decrement with expiration
await redis.decr('inventory:item:123');
await redis.expire('inventory:item:123', 3600);

// Check-and-set pattern (atomic)
async function updateIfNotChanged(key, expectedValue, newValue) {
  const multi = redis.multi();
  multi.watch(key);
  const currentValue = await redis.get(key);
  
  if (currentValue === expectedValue) {
    await multi.set(key, newValue);
    await multi.exec();
    return true;
  } else {
    await multi.unwatch();
    return false;
  }
}

// Pipeline for batch operations (reduces round trips)
const pipeline = redis.pipeline();
pipeline.set('user:1', 'Alice');
pipeline.set('user:2', 'Bob');
pipeline.set('user:3', 'Charlie');
pipeline.get('user:1');
pipeline.get('user:2');

const results = await pipeline.exec();
console.log(results); // [[null, 'OK'], [null, 'OK'], ...]

// Lua scripting for complex atomic operations
const luaScript = \`
local current = redis.call('GET', KEYS[1])
if tonumber(current) >= tonumber(ARGV[1]) then
  redis.call('DECRBY', KEYS[1], ARGV[1])
  return 1
else
  return 0
end
\`;

// Deduct inventory atomically
const result = await redis.eval(
  luaScript,
  1,              // number of keys
  'inventory:123', // key
  '5'             // amount to deduct
);

if (result === 1) {
  console.log('Inventory deducted successfully');
} else {
  console.log('Insufficient inventory');
}`,
    priority: null
  },
  {
    id: 196,
    category: 'Redis',
    question: 'What is Redis Cluster and how does it provide horizontal scaling?',
    answer: 'Redis Cluster is a distributed implementation that automatically shards data across multiple nodes (up to 16384 hash slots). It provides horizontal scaling, high availability through master-replica replication, and automatic failover.',
    explanation: '**Redis Cluster Architecture:**\n\n**Hash Slots:**\n- 16384 hash slots total\n- Keys mapped to slots: HASH_SLOT = CRC16(key) % 16384\n- Slots distributed across master nodes\n- Each master handles subset of slots\n\n**Sharding:**\n- Automatic data distribution\n- Client calculates which node has key\n- No proxy needed\n- Redirection if wrong node contacted\n\n**Replication:**\n- Each master has 1+ replicas\n- Replicas promote to master on failure\n- Automatic failover\n- No manual intervention needed\n\n**Cluster Communication:**\n- Gossip protocol for node discovery\n- Failure detection\n- Slot ownership updates\n- Separate bus port (data port + 10000)\n\n**Limitations:**\n- No multi-key operations across slots\n- No transactions across nodes\n- Keys must use hash tags for co-location\n- Max 1000 masters recommended\n\n**Use Cases:**\n- Large datasets (> memory of single node)\n- High throughput requirements\n- High availability needs\n- Horizontal scaling required',
    codeExample: `// Creating Redis Cluster
redis-cli --cluster create \\
  127.0.0.1:7000 127.0.0.1:7001 127.0.0.1:7002 \\
  127.0.0.1:7003 127.0.0.1:7004 127.0.0.1:7005 \\
  --cluster-replicas 1

# Creates 3 masters + 3 replicas

// Using Redis Cluster (Node.js with ioredis)
const Redis = require('ioredis');

const cluster = new Redis.Cluster([{
  host: '127.0.0.1',
  port: 7000
}, {
  host: '127.0.0.1',
  port: 7001
}], {
  scaleReads: 'slave',  // Read from slaves
  maxRedirections: 16,
  retryDelayOnFailover: 100
});

// Normal operations (cluster handles routing)
await cluster.set('user:123', 'John Doe');
const user = await cluster.get('user:123');

// Hash tags for co-located keys
// Keys with same hash tag go to same slot
await cluster.set('{user:123}:profile', '...');
await cluster.set('{user:123}:settings', '...');
// These can be used in multi-key operations

// Cluster info
const info = await cluster.info('cluster');
console.log(info);

// Check cluster status
redis-cli --cluster check 127.0.0.1:7000

# Output:
# >>> Performing Cluster Check (using node 127.0.0.1:7000)
# M: abc123... 127.0.0.1:7000
#    slots:[0-5460] (5461 slots) master
#    1 additional replica(s)
# S: def456... 127.0.0.1:7003
#    replicates abc123...

// Add new node to cluster
redis-cli --cluster add-node 127.0.0.1:7006 127.0.0.1:7000

// Rebalance slots
redis-cli --cluster rebalance 127.0.0.1:7000`,
    priority: null
  },
  {
    id: 197,
    category: 'Redis',
    question: 'Explain Redis eviction policies and memory management.',
    answer: 'Redis eviction policies determine how keys are removed when maxmemory is reached. Options include LRU (Least Recently Used), LFU (Least Frequently Used), random eviction, and TTL-based eviction. Proper configuration prevents out-of-memory errors.',
    explanation: '**Eviction Policies:**\n\n**LRU Policies:**\n1. **volatile-lru**: Evict keys with TTL set (LRU)\n2. **allkeys-lru**: Evict any key (LRU) - Most common\n\n**LFU Policies:**\n3. **volatile-lfu**: Evict keys with TTL set (LFU)\n4. **allkeys-lfu**: Evict any key (LFU)\n\n**Random Policies:**\n5. **volatile-random**: Random key with TTL\n6. **allkeys-random**: Any random key\n\n**TTL-Based:**\n7. **volatile-ttl**: Evict keys with shortest TTL\n\n**No Eviction:**\n8. **noeviction**: Return error on write (default)\n\n**LRU vs LFU:**\n- **LRU**: Removes least recently accessed\n  - Good for temporal locality\n  - Simple implementation\n\n- **LFU**: Removes least frequently accessed\n  - Better for popularity-based caching\n  - Tracks access frequency\n  - More accurate for some workloads\n\n**Memory Management:**\n- Set maxmemory limit\n- Choose appropriate eviction policy\n- Monitor memory usage\n- Use efficient data structures\n- Set TTLs on cache entries\n\n**Best Practices:**\n- Always set maxmemory\n- Use allkeys-lru for general caching\n- Use volatile-* if mixing cache/persistent data\n- Monitor eviction rate\n- Tune lfu-decay-time for LFU',
    codeExample: `# Redis Configuration (redis.conf)

# Set maximum memory
maxmemory 2gb

# Set eviction policy
maxmemory-policy allkeys-lru

# LRU approximation (sample size)
maxmemory-samples 5

# LFU configuration (if using LFU)
# lfu-log-factor 10
# lfu-decay-time 1

// Setting TTL on keys (Node.js)
const Redis = require('ioredis');
const redis = new Redis();

// Cache with expiration
async function getCachedData(key) {
  // Try to get from cache
  const cached = await redis.get(key);
  if (cached) {
    return JSON.parse(cached);
  }
  
  // Fetch from database
  const data = await fetchDataFromDB(key);
  
  // Store in cache with 1 hour TTL
  await redis.setex(key, 3600, JSON.stringify(data));
  
  return data;
}

// Monitor memory usage
async function checkMemory() {
  const info = await redis.info('memory');
  console.log(info);
  
  // Parse memory stats
  const usedMemory = await redis.info('memory').then(info => {
    const match = info.match(/used_memory:(\\d+)/);
    return match ? parseInt(match[1]) : 0;
  });
  
  console.log('Used: ' + (usedMemory / 1024 / 1024).toFixed(2) + ' MB');
}

// Efficient data structures
// Use hashes instead of individual keys
await redis.hset('user:123', {
  name: 'John',
  email: 'john@example.com',
  age: '30'
});
// More memory efficient than:
// await redis.set('user:123:name', 'John');
// await redis.set('user:123:email', 'john@example.com');

// Use sorted sets for leaderboards
await redis.zadd('scores', 100, 'player1', 200, 'player2');

// Cleanup old data
await redis.unlink('old-key');  // Non-blocking delete
// Instead of:
// await redis.del('old-key');  // Blocking for large keys`,
    priority: null
  },
  {
    id: 198,
    category: 'Redis',
    question: 'Explain Redis data structures and when to use each one.',
    answer: 'Redis supports Strings, Lists, Sets, Sorted Sets, Hashes, Bitmaps, HyperLogLogs, Streams, and Geospatial indexes. Each structure is optimized for specific use cases like caching, queues, unique collections, leaderboards, and real-time analytics.',
    explanation: '**Redis Data Structures:**\n\n**1. Strings:**\n- Simple key-value pairs\n- Binary safe (up to 512MB)\n- Operations: SET, GET, INCR, DECR, APPEND\n- Use case: Caching, counters, session storage\n\n**2. Lists:**\n- Ordered collections (linked lists)\n- Push/pop from both ends\n- Operations: LPUSH, RPUSH, LPOP, RPOP, LRANGE\n- Use case: Queues, recent items, message buffers\n\n**3. Sets:**\n- Unordered unique collections\n- Set operations: union, intersection, difference\n- Operations: SADD, SREM, SMEMBERS, SISMEMBER\n- Use case: Tags, unique visitors, friend lists\n\n**4. Sorted Sets:**\n- Sets with scores for ordering\n- Range queries by score or rank\n- Operations: ZADD, ZRANGE, ZREVRANGE, ZRANGEBYSCORE\n- Use case: Leaderboards, priority queues, rate limiting\n\n**5. Hashes:**\n- Field-value pairs (like objects)\n- Efficient for storing objects\n- Operations: HSET, HGET, HGETALL, HDEL\n- Use case: User profiles, configuration, object caching\n\n**6. Bitmaps:**\n- Bit-level operations on strings\n- Memory efficient for boolean flags\n- Operations: SETBIT, GETBIT, BITCOUNT, BITOP\n- Use case: Daily active users, feature flags, presence\n\n**7. HyperLogLogs:**\n- Probabilistic cardinality counting\n- Fixed memory (~12KB) regardless of size\n- Operations: PFADD, PFCOUNT, PFMERGE\n- Use case: Unique visitor counts, distinct elements\n\n**8. Streams:**\n- Append-only log structure\n- Consumer groups support\n- Operations: XADD, XREAD, XGROUP, XACK\n- Use case: Event sourcing, activity feeds, IoT data\n\n**9. Geospatial:**\n- Location-based data\n- Radius queries\n- Operations: GEOADD, GEORADIUS, GEODIST\n- Use case: Nearby places, location tracking\n\n**Selection Guide:**\n- Single value → String\n- Ordered sequence → List\n- Unique items → Set\n- Ranked items → Sorted Set\n- Object fields → Hash\n- Boolean flags → Bitmap\n- Counting uniques → HyperLogLog\n- Event log → Stream\n- Locations → Geospatial',
    codeExample: `const Redis = require('ioredis');
const redis = new Redis();

// 1. Strings - Caching
await redis.setex('user:123', 3600, JSON.stringify({ name: 'John' }));
const user = await redis.get('user:123');

// Counter
await redis.incr('page_views');
await redis.incrby('downloads', 10);

// 2. Lists - Task Queue
await redis.rpush('tasks', 'task1', 'task2', 'task3');
const task = await redis.lpop('tasks');
const allTasks = await redis.lrange('tasks', 0, -1);

// 3. Sets - Unique Visitors
await redis.sadd('daily_visitors:2024-01-01', 'user1', 'user2', 'user3');
const isMember = await redis.sismember('daily_visitors:2024-01-01', 'user1');
const count = await redis.scard('daily_visitors:2024-01-01');

// Set operations
await redis.sadd('group_a', 'user1', 'user2', 'user3');
await redis.sadd('group_b', 'user2', 'user3', 'user4');
const intersection = await redis.sinter('group_a', 'group_b'); // ['user2', 'user3']
const union = await redis.sunion('group_a', 'group_b');

// 4. Sorted Sets - Leaderboard
await redis.zadd('leaderboard', 
  100, 'player1',
  200, 'player2',
  150, 'player3',
  300, 'player4'
);

// Top 10 players
const topPlayers = await redis.zrevrange('leaderboard', 0, 9, 'WITHSCORES');

// Players with score > 150
const highScorers = await redis.zrangebyscore('leaderboard', 150, '+inf');

// Player rank
const rank = await redis.zrevrank('leaderboard', 'player2'); // 0 (highest)

// 5. Hashes - User Profile
await redis.hset('user:456', {
  name: 'Jane Doe',
  email: 'jane@example.com',
  age: '28',
  city: 'New York'
});

const name = await redis.hget('user:456', 'name');
const profile = await redis.hgetall('user:456');
await redis.hincrby('user:456', 'login_count', 1);

// 6. Bitmaps - Daily Active Users
// Set bit for user ID
await redis.setbit('dau:2024-01-01', 123, 1);
await redis.setbit('dau:2024-01-01', 456, 1);

// Count active users
const dau = await redis.bitcount('dau:2024-01-01');

// Check if user was active
const isActive = await redis.getbit('dau:2024-01-01', 123); // 1

// 7. HyperLogLog - Unique Page Views
await redis.pfadd('page_views:unique', 'user1', 'user2', 'user3');
await redis.pfadd('page_views:unique', 'user2', 'user4'); // user2 is duplicate
const uniqueCount = await redis.pfcount('page_views:unique'); // ~4

// Merge multiple HLLs
await redis.pfmerge('page_views:all', 'page_views:day1', 'page_views:day2');

// 8. Streams - Event Log
await redis.xadd('events', '*', 'type', 'order.created', 'orderId', '123');
await redis.xadd('events', '*', 'type', 'payment.processed', 'orderId', '123');

// Read events
const events = await redis.xread('COUNT', 10, 'STREAMS', 'events', '0');

// Consumer Groups
await redis.xgroup_create('events', 'processors', '0', 'MKSTREAM');
const [stream, messages] = await redis.xreadgroup(
  'GROUP', 'processors', 'consumer1',
  'COUNT', 10,
  'STREAMS', 'events', '>'
);

// Acknowledge processing
await redis.xack('events', 'processors', messageId);

// 9. Geospatial - Nearby Places
await redis.geoadd('cities',
  -73.935242, 40.730610, 'New York',
  -118.243683, 34.052235, 'Los Angeles',
  -87.629799, 41.878113, 'Chicago'
);

// Find cities within 500km of New York
const nearby = await redis.georadius('cities', -73.935242, 40.730610, 500, 'km');

// Distance between cities
const distance = await redis.geodist('cities', 'New York', 'Chicago', 'km');

// Get coordinates
const coords = await redis.geopos('cities', 'New York');`,
    priority: null
  },
  {
    id: 199,
    category: 'Redis',
    question: 'What are Redis design patterns and common use cases?',
    answer: 'Common Redis patterns include Cache-Aside, Write-Through, Session Store, Rate Limiter, Distributed Lock, Pub/Sub, Queue, and Leaderboard. Each pattern solves specific distributed system challenges using Redis capabilities.',
    explanation: '**Common Redis Patterns:**\n\n**1. Cache-Aside (Lazy Loading):**\n- Application checks cache first\n- If miss, fetch from database\n- Store in cache with TTL\n- Most common caching pattern\n\n**2. Write-Through Cache:**\n- Write to cache and database together\n- Ensures cache consistency\n- Higher write latency\n- Good for read-heavy workloads\n\n**3. Session Store:**\n- Store user sessions in Redis\n- Fast access across servers\n- Automatic expiration\n- Enables horizontal scaling\n\n**4. Rate Limiter:**\n- Track request counts per user/IP\n- Sliding window or fixed window\n- Prevent abuse and overload\n- Token bucket algorithm\n\n**5. Distributed Lock:**\n- Coordinate across multiple instances\n- Prevent race conditions\n- SET with NX and EX\n- Redlock for high availability\n\n**6. Pub/Sub Messaging:**\n- Real-time notifications\n- Decouple producers/consumers\n- Fire-and-forget delivery\n- No message persistence\n\n**7. Job Queue:**\n- Background job processing\n- Multiple workers\n- Priority queues with sorted sets\n- Delayed jobs\n\n**8. Leaderboard/Ranking:**\n- Real-time rankings\n- Sorted sets with scores\n- Range queries\n- Automatic sorting\n\n**9. Counter/Analytics:**\n- Real-time metrics\n- Atomic increments\n- Time-series data\n- Aggregations\n\n**10. Bloom Filter:**\n- Probabilistic set membership\n- Reduce database queries\n- False positives possible\n- Space efficient\n\n**Best Practices:**\n- Set appropriate TTLs\n- Use consistent naming conventions\n- Monitor memory usage\n- Implement circuit breakers\n- Handle cache failures gracefully',
    codeExample: `const Redis = require('ioredis');
const redis = new Redis();

// 1. Cache-Aside Pattern
async function getUserWithCache(userId) {
  const cacheKey = \`user:\${userId}\`;
  
  // Try cache first
  let user = await redis.get(cacheKey);
  if (user) {
    return JSON.parse(user);
  }
  
  // Cache miss - fetch from database
  user = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
  
  // Store in cache with TTL
  if (user) {
    await redis.setex(cacheKey, 3600, JSON.stringify(user));
  }
  
  return user;
}

// 2. Rate Limiter (Sliding Window)
async function isRateLimited(userId, maxRequests = 100, windowSeconds = 60) {
  const key = \`rate_limit:\${userId}\`;
  const now = Date.now();
  const windowStart = now - (windowSeconds * 1000);
  
  // Remove old entries
  await redis.zremrangebyscore(key, 0, windowStart);
  
  // Count requests in window
  const requestCount = await redis.zcard(key);
  
  if (requestCount >= maxRequests) {
    return true; // Rate limited
  }
  
  // Add current request
  await redis.zadd(key, now, \`\${now}:\${Math.random()}\`);
  await redis.expire(key, windowSeconds);
  
  return false;
}

// 3. Distributed Lock
async function acquireLock(lockName, ttlSeconds = 10) {
  const lockKey = \`lock:\${lockName}\`;
  const lockValue = \`\${process.pid}:\${Date.now()}\`;
  
  // SET with NX (only if not exists) and EX (expiration)
  const result = await redis.set(lockKey, lockValue, 'EX', ttlSeconds, 'NX');
  
  return result === 'OK';
}

async function releaseLock(lockName, lockValue) {
  const lockKey = \`lock:\${lockName}\`;
  
  // Use Lua script for atomic check-and-delete
  const luaScript = \`
    if redis.call("get", KEYS[1]) == ARGV[1] then
      return redis.call("del", KEYS[1])
    else
      return 0
    end
  \`;
  
  await redis.eval(luaScript, 1, lockKey, lockValue);
}

// Usage
const locked = await acquireLock('resource:123');
if (locked) {
  try {
    // Critical section
    await processResource();
  } finally {
    await releaseLock('resource:123', lockValue);
  }
}

// 4. Pub/Sub - Real-time Notifications
const subscriber = new Redis();
const publisher = new Redis();

// Subscribe to channel
subscriber.subscribe('notifications:user:123');
subscriber.on('message', (channel, message) => {
  console.log('Received:', JSON.parse(message));
  // Send to WebSocket client
});

// Publish notification
await publisher.publish('notifications:user:123', JSON.stringify({
  type: 'order_shipped',
  orderId: '456',
  timestamp: Date.now()
}));

// 5. Job Queue with Priority
async function enqueueJob(queue, job, priority = 0) {
  // Use sorted set for priority queue
  await redis.zadd(queue, priority, JSON.stringify({
    ...job,
    id: Date.now(),
    createdAt: new Date().toISOString()
  }));
}

async function dequeueJob(queue) {
  // Get highest priority job (lowest score)
  const jobs = await redis.zpopmin(queue, 1);
  
  if (jobs.length > 0) {
    return JSON.parse(jobs[0][0]);
  }
  return null;
}

// Worker loop
async function processJobs(queue) {
  while (true) {
    const job = await dequeueJob(queue);
    if (job) {
      try {
        await handleJob(job);
      } catch (error) {
        console.error('Job failed:', error);
        // Requeue with lower priority
        await enqueueJob(queue, job, job.priority + 1);
      }
    } else {
      // No jobs, wait
      await sleep(1000);
    }
  }
}

// 6. Bloom Filter (simplified)
async function bloomFilterAdd(key, item) {
  const hash = hashCode(item);
  const positions = getHashPositions(hash, 3); // 3 hash functions
  
  for (const pos of positions) {
    await redis.setbit(key, pos, 1);
  }
}

async function bloomFilterTest(key, item) {
  const hash = hashCode(item);
  const positions = getHashPositions(hash, 3);
  
  for (const pos of positions) {
    const bit = await redis.getbit(key, pos);
    if (bit === 0) return false; // Definitely not in set
  }
  
  return true; // Probably in set (may have false positives)
}

// Helper functions
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function getHashPositions(hash, numHashes) {
  const positions = [];
  for (let i = 0; i < numHashes; i++) {
    positions.push((hash + i * 2654435761) % 1000000);
  }
  return positions;
}`,
    priority: null
  },
  {
    id: 200,
    category: 'Redis',
    question: 'How do you implement Redis caching strategies effectively?',
    answer: 'Effective caching requires choosing the right strategy (cache-aside, write-through, write-behind), setting appropriate TTLs, handling cache invalidation, preventing cache stampedes, and monitoring hit rates. Use layered caching and consider cache warming for critical data.',
    explanation: '**Caching Strategies:**\n\n**1. Cache-Aside (Read-Through):**\n- App reads from cache first\n- On miss, read from DB and populate cache\n- Simple and effective\n- Cache can become stale\n\n**2. Write-Through:**\n- Write to cache and DB simultaneously\n- Cache always consistent\n- Higher write latency\n- Good for read-heavy apps\n\n**3. Write-Behind (Write-Back):**\n- Write to cache immediately\n- Async write to DB\n- Best write performance\n- Risk of data loss\n\n**4. Refresh-Ahead:**\n- Proactively refresh cache before expiry\n- Prevents cache misses\n- Complex implementation\n- Good for predictable access patterns\n\n**Cache Invalidation:**\n\n**Strategies:**\n1. **TTL-based**: Auto-expire after time\n2. **Explicit**: Delete on update\n3. **Pattern-based**: Invalidate by key pattern\n4. **Version-based**: Include version in key\n\n**Common Problems:**\n\n**Cache Stampede:**\n- Many requests hit expired cache simultaneously\n- Solution: Locking, probabilistic early expiration\n\n**Cache Penetration:**\n- Requests for non-existent keys\n- Solution: Cache null values, Bloom filters\n\n**Cache Avalanche:**\n- Many keys expire at same time\n- Solution: Randomize TTLs\n\n**Best Practices:**\n- Set appropriate TTLs based on data volatility\n- Use consistent hashing for distributed caches\n- Monitor hit/miss ratios\n- Implement circuit breakers\n- Use cache warming for critical data\n- Consider multi-level caching\n- Handle cache failures gracefully\n- Document cache semantics',
    codeExample: `const Redis = require('ioredis');
const redis = new Redis();

// 1. Cache-Aside with Locking (prevent stampede)
async function getWithLock(key, ttl, fetchFunction) {
  const lockKey = \`lock:\${key}\`;
  
  // Try to get from cache
  let data = await redis.get(key);
  if (data) {
    return JSON.parse(data);
  }
  
  // Try to acquire lock
  const locked = await redis.set(lockKey, '1', 'EX', 10, 'NX');
  
  if (locked) {
    try {
      // Double-check cache (another request might have populated it)
      data = await redis.get(key);
      if (data) {
        return JSON.parse(data);
      }
      
      // Fetch from source
      data = await fetchFunction();
      
      // Store in cache
      if (data) {
        await redis.setex(key, ttl, JSON.stringify(data));
      }
      
      return data;
    } finally {
      await redis.del(lockKey);
    }
  } else {
    // Wait for lock holder to populate cache
    await sleep(100);
    return getWithLock(key, ttl, fetchFunction);
  }
}

// Usage
const user = await getWithLock(
  'user:123',
  3600,
  () => db.query('SELECT * FROM users WHERE id = 123')
);

// 2. Write-Through Cache
async function updateUserWriteThrough(userId, userData) {
  const key = \`user:\${userId}\`;
  
  // Update database
  await db.query('UPDATE users SET ? WHERE id = ?', [userData, userId]);
  
  // Update cache
  await redis.setex(key, 3600, JSON.stringify({
    id: userId,
    ...userData
  }));
}

// 3. Cache with Probabilistic Early Expiration
async function getWithEarlyExpiration(key, ttl, fetchFunction) {
  let data = await redis.get(key);
  
  if (data) {
    const parsed = JSON.parse(data);
    
    // Check if approaching expiration (last 20% of TTL)
    const remainingTTL = await redis.ttl(key);
    const shouldRefresh = remainingTTL < (ttl * 0.2);
    
    if (shouldRefresh && Math.random() < 0.1) { // 10% chance
      // Refresh in background
      refreshCache(key, ttl, fetchFunction);
    }
    
    return parsed;
  }
  
  // Cache miss
  data = await fetchFunction();
  if (data) {
    await redis.setex(key, ttl, JSON.stringify(data));
  }
  
  return data;
}

async function refreshCache(key, ttl, fetchFunction) {
  try {
    const data = await fetchFunction();
    if (data) {
      await redis.setex(key, ttl, JSON.stringify(data));
    }
  } catch (error) {
    console.error('Cache refresh failed:', error);
  }
}

// 4. Cache Null Values (prevent penetration)
async function getWithNullCache(key, ttl, fetchFunction) {
  const data = await redis.get(key);
  
  // Check for cached null marker
  if (data === 'NULL') {
    return null;
  }
  
  if (data) {
    return JSON.parse(data);
  }
  
  // Fetch from source
  const result = await fetchFunction();
  
  if (result) {
    await redis.setex(key, ttl, JSON.stringify(result));
  } else {
    // Cache null for shorter time
    await redis.setex(key, 60, 'NULL');
  }
  
  return result;
}

// 5. Multi-Level Caching
const localCache = new Map();
const LOCAL_TTL = 60; // 1 minute
const REDIS_TTL = 3600; // 1 hour

async function getMultiLevel(key, fetchFunction) {
  // Level 1: Local memory cache
  const localEntry = localCache.get(key);
  if (localEntry && Date.now() - localEntry.timestamp < LOCAL_TTL * 1000) {
    return localEntry.data;
  }
  
  // Level 2: Redis cache
  const redisData = await redis.get(key);
  if (redisData) {
    const parsed = JSON.parse(redisData);
    localCache.set(key, { data: parsed, timestamp: Date.now() });
    return parsed;
  }
  
  // Level 3: Database
  const data = await fetchFunction();
  if (data) {
    // Populate both caches
    await redis.setex(key, REDIS_TTL, JSON.stringify(data));
    localCache.set(key, { data, timestamp: Date.now() });
  }
  
  return data;
}

// 6. Cache Warming
async function warmCache(keys, fetchFunction) {
  const pipeline = redis.pipeline();
  
  for (const key of keys) {
    const data = await fetchFunction(key);
    if (data) {
      pipeline.setex(key, 3600, JSON.stringify(data));
    }
  }
  
  await pipeline.exec();
}

// Warm cache on startup
await warmCache(
  ['product:popular:1', 'product:popular:2', 'product:popular:3'],
  (key) => db.query('SELECT * FROM products WHERE id = ?', [key.split(':')[1]])
);

// 7. Monitoring Cache Performance
let cacheHits = 0;
let cacheMisses = 0;

async function getWithMetrics(key, fetchFunction) {
  const data = await redis.get(key);
  
  if (data) {
    cacheHits++;
    return JSON.parse(data);
  }
  
  cacheMisses++;
  const result = await fetchFunction();
  
  if (result) {
    await redis.setex(key, 3600, JSON.stringify(result));
  }
  
  return result;
}

function getCacheMetrics() {
  const total = cacheHits + cacheMisses;
  return {
    hits: cacheHits,
    misses: cacheMisses,
    hitRate: total > 0 ? (cacheHits / total * 100).toFixed(2) + '%' : '0%',
    total
  };
}`,
    priority: null
  },
  {
    id: 201,
    category: 'Redis',
    question: 'Explain Redis transactions and atomic operations.',
    answer: 'Redis provides MULTI/EXEC for transaction blocks, WATCH for optimistic locking, and Lua scripting for complex atomic operations. Transactions ensure command isolation but don\'t provide rollback on errors. Use EVAL for atomic read-modify-write operations.',
    explanation: '**Redis Transactions:**\n\n**MULTI/EXEC:**\n- Queue commands with MULTI\n- Execute atomically with EXEC\n- No rollback on individual failures\n- All commands execute or none\n- Isolated from other clients\n\n**WATCH (Optimistic Locking):**\n- Monitor keys for changes\n- Abort transaction if watched key changes\n- Implement compare-and-swap\n- Retry logic needed\n\n**Lua Scripting:**\n- Execute multiple commands atomically\n- Full programming logic\n- Return custom results\n- Better than MULTI/EXEC for complex ops\n- Cached on server for performance\n\n**Atomic Commands:**\n- INCR/DECR: Atomic increment/decrement\n- SETNX: Set if not exists\n- RENAMENX: Rename if not exists\n- LPUSH/RPUSH: Atomic list operations\n- SADD/SREM: Atomic set operations\n- ZADD: Atomic sorted set operations\n\n**Transaction Limitations:**\n- No rollback (partial execution possible)\n- Cannot read within transaction\n- WATCH only detects external changes\n- Not ACID compliant (no durability guarantee)\n\n**When to Use:**\n- MULTI/EXEC: Simple command batching\n- WATCH: Optimistic concurrency control\n- Lua: Complex atomic operations\n- Atomic commands: Simple counters/flags\n\n**Best Practices:**\n- Keep transactions short\n- Use Lua for read-modify-write\n- Implement retry logic with WATCH\n- Avoid long-running scripts\n- Monitor script execution time',
    codeExample: `const Redis = require('ioredis');
const redis = new Redis();

// 1. MULTI/EXEC Transaction
async function transferFunds(fromAccount, toAccount, amount) {
  const multi = redis.multi();
  
  multi.decrby(\`account:\${fromAccount}\`, amount);
  multi.incrby(\`account:\${toAccount}\`, amount);
  multi.set(\`transaction:\${Date.now()}\`, JSON.stringify({
    from: fromAccount,
    to: toAccount,
    amount,
    timestamp: Date.now()
  }));
  
  const results = await multi.exec();
  
  // Check for errors
  for (const [err, result] of results) {
    if (err) {
      console.error('Transaction failed:', err);
      throw err;
    }
  }
  
  return results;
}

// 2. WATCH for Optimistic Locking
async function updateBalanceWithWatch(accountId, amount) {
  const key = \`account:\${accountId}\`;
  
  while (true) {
    try {
      // Watch the key
      await redis.watch(key);
      
      // Read current balance
      const balance = await redis.get(key);
      const newBalance = parseInt(balance) + amount;
      
      if (newBalance < 0) {
        await redis.unwatch();
        throw new Error('Insufficient funds');
      }
      
      // Execute transaction
      const multi = redis.multi();
      multi.set(key, newBalance.toString());
      
      const result = await multi.exec();
      
      if (result === null) {
        // Transaction aborted (key changed), retry
        console.log('Conflict detected, retrying...');
        continue;
      }
      
      return newBalance;
    } catch (error) {
      await redis.unwatch();
      throw error;
    }
  }
}

// 3. Lua Script for Atomic Operation
const updateInventoryScript = \`
local stock = redis.call('GET', KEYS[1])
if not stock then
  return -1  -- Product not found
end

stock = tonumber(stock)
local quantity = tonumber(ARGV[1])

if stock < quantity then
  return -2  -- Insufficient stock
end

-- Deduct stock
redis.call('DECRBY', KEYS[1], quantity)

-- Record transaction
redis.call('LPUSH', KEYS[2], cjson.encode({
  product_id = KEYS[1],
  quantity = quantity,
  timestamp = redis.call('TIME')[1]
}))

return stock - quantity  -- Return new stock level
\`;

async function purchaseProduct(productId, quantity) {
  const result = await redis.eval(
    updateInventoryScript,
    2,  // number of keys
    \`product:\${productId}:stock\`,  // KEY[1]
    \`product:\${productId}:transactions\`,  // KEY[2]
    quantity  // ARGV[1]
  );
  
  if (result === -1) {
    throw new Error('Product not found');
  } else if (result === -2) {
    throw new Error('Insufficient stock');
  }
  
  return result; // New stock level
}

// 4. Lua Script for Rate Limiting
const rateLimitScript = \`
local key = KEYS[1]
local limit = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local now = redis.call('TIME')[1]

-- Remove old entries
redis.call('ZREMRANGEBYSCORE', key, 0, now - window)

-- Count current requests
local count = redis.call('ZCARD', key)

if count >= limit then
  return 0  -- Rate limited
end

-- Add current request
redis.call('ZADD', key, now, now .. ':' .. math.random())
redis.call('EXPIRE', key, window)

return 1  -- Allowed
\`;

async function checkRateLimit(userId, maxRequests, windowSeconds) {
  const result = await redis.eval(
    rateLimitScript,
    1,
    \`rate_limit:\${userId}\`,
    maxRequests,
    windowSeconds
  );
  
  return result === 1;
}

// 5. Atomic Counter with Lua
const incrementCounterScript = \`
local key = KEYS[1]
local increment = tonumber(ARGV[1])
local ttl = tonumber(ARGV[2])

local current = redis.call('GET', key)
if not current then
  current = 0
else
  current = tonumber(current)
end

local newValue = current + increment
redis.call('SET', key, newValue)

if ttl > 0 then
  redis.call('EXPIRE', key, ttl)
end

return newValue
\`;

async function atomicIncrement(key, amount = 1, ttl = 0) {
  return await redis.eval(
    incrementCounterScript,
    1,
    key,
    amount,
    ttl
  );
}

// Usage
const newCount = await atomicIncrement('page_views', 1, 86400);

// 6. Compare-And-Set with Lua
const casScript = \`
local key = KEYS[1]
local expected = ARGV[1]
local newValue = ARGV[2]

local current = redis.call('GET', key)

if current == expected then
  redis.call('SET', key, newValue)
  return 1  -- Success
else
  return 0  -- Failed (value changed)
end
\`;

async function compareAndSet(key, expectedValue, newValue) {
  const result = await redis.eval(
    casScript,
    1,
    key,
    expectedValue,
    newValue
  );
  
  return result === 1;
}

// Usage
const success = await compareAndSet('config:version', 'v1', 'v2');
if (success) {
  console.log('Config updated');
} else {
  console.log('Config changed by another process');
}

// 7. Register Lua Scripts (for better performance)
redis.defineCommand('updateInventory', {
  numberOfKeys: 2,
  lua: updateInventoryScript
});

// Now call it like a regular command
await redis.updateInventory(
  'product:123:stock',
  'product:123:transactions',
  5  // quantity
);`,
    priority: null
  },
  {
    id: 202,
    category: 'Redis',
    question: 'How do you troubleshoot and debug Redis performance issues?',
    answer: 'Debug Redis performance using SLOWLOG for slow commands, MONITOR for real-time tracking, INFO for statistics, and CLIENT LIST for connection analysis. Common issues include large keys, blocking operations, memory fragmentation, and network latency.',
    explanation: '**Performance Debugging Tools:**\n\n**1. SLOWLOG:**\n- Logs slow commands (> threshold)\n- Configurable threshold (microseconds)\n- Shows command, duration, timestamp\n- Essential for finding bottlenecks\n\n**2. MONITOR:**\n- Real-time command stream\n- See all commands executed\n- Use cautiously (performance impact)\n- Great for debugging\n\n**3. INFO Command:**\n- Server statistics\n- Memory usage\n- Client connections\n- Keyspace info\n- Replication status\n\n**4. CLIENT LIST:**\n- All connected clients\n- Connection details\n- Idle time\n- Flags and commands\n\n**5. LATENCY DOCTOR:**\n- Analyzes latency issues\n- Provides recommendations\n- Checks system configuration\n\n**Common Performance Issues:**\n\n**1. Large Keys:**\n- Big hashes, lists, sets\n- Causes blocking during operations\n- Solution: Break into smaller keys\n\n**2. Blocking Commands:**\n- KEYS * in production\n- SMEMBERS on large sets\n- LRANGE on huge lists\n- Solution: Use SCAN, SSCAN\n\n**3. Memory Fragmentation:**\n- Ratio > 1.5 indicates problem\n- Caused by allocator\n- Solution: Restart or tune allocator\n\n**4. Network Latency:**\n- High round-trip times\n- Too many small requests\n- Solution: Pipelining, connection pooling\n\n**5. CPU Saturation:**\n- Single-threaded bottleneck\n- Complex Lua scripts\n- Solution: Optimize commands, scale out\n\n**6. Persistence Overhead:**\n- AOF rewrite blocking\n- RDB fork expensive\n- Solution: Tune frequency, use replicas\n\n**Debugging Checklist:**\n- Check slowlog for slow commands\n- Monitor memory usage and fragmentation\n- Analyze keyspace distribution\n- Review client connections\n- Check replication lag\n- Monitor CPU and network\n- Use Redis Insight or RDB tools',
    codeExample: `const Redis = require('ioredis');
const redis = new Redis();

// 1. Configure and Check Slow Log
// Set slow log threshold (in microseconds)
await redis.config('SET', 'slowlog-log-slower-than', '10000'); // 10ms
await redis.config('SET', 'slowlog-max-len', '128');

// Get slow log entries
const slowLog = await redis.slowlog('GET', 10);
console.log('Slow commands:', slowLog);

// Reset slow log
await redis.slowlog('RESET');

// 2. Monitor Commands (use carefully!)
const monitor = redis.monitor();
monitor.on('monitor', (time, args, source, database) => {
  console.log(\`\${time}: \${args.join(' ')}\`);
});

// Stop monitoring after 5 seconds
setTimeout(() => {
  monitor.disconnect();
}, 5000);

// 3. Get Server Info
const info = await redis.info();
console.log(info);

// Parse specific sections
const memoryInfo = await redis.info('memory');
const serverInfo = await redis.info('server');
const clientsInfo = await redis.info('clients');

// Extract used memory
const usedMemoryMatch = memoryInfo.match(/used_memory:(\\d+)/);
const usedMemoryMB = usedMemoryMatch ? 
  parseInt(usedMemoryMatch[1]) / 1024 / 1024 : 0;
console.log(\`Used Memory: \${usedMemoryMB.toFixed(2)} MB\`);

// Check fragmentation ratio
const fragMatch = memoryInfo.match(/mem_fragmentation_ratio:([\\d.]+)/);
const fragRatio = fragMatch ? parseFloat(fragMatch[1]) : 0;
if (fragRatio > 1.5) {
  console.warn('High memory fragmentation detected!');
}

// 4. Analyze Client Connections
const clientList = await redis.client('LIST');
console.log(clientList);

// Count connections
const connections = clientList.split('\\n').filter(c => c.trim()).length;
console.log(\`Active connections: \${connections}\`);

// Kill idle clients
const clients = await redis.client('LIST');
clients.split('\\n').forEach(client => {
  if (client.includes('idle=') && client.includes('cmd=get')) {
    const idMatch = client.match(/id=(\\d+)/);
    if (idMatch) {
      redis.client('KILL', 'ID', idMatch[1]);
    }
  }
});

// 5. Run Latency Doctor
const latencyDoctor = await redis.latency('DOCTOR');
console.log(latencyDoctor);

// 6. Analyze Keyspace
const keyspace = await redis.info('keyspace');
console.log(keyspace);

// Count keys by pattern (use SCAN, not KEYS!)
async function countKeysByPattern(pattern) {
  let count = 0;
  let cursor = '0';
  
  do {
    const [nextCursor, keys] = await redis.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
    count += keys.length;
    cursor = nextCursor;
  } while (cursor !== '0');
  
  return count;
}

const userCount = await countKeysByPattern('user:*');
console.log(\`User keys: \${userCount}\`);

// 7. Find Large Keys
async function findLargeKeys(threshold = 10000) {
  const largeKeys = [];
  let cursor = '0';
  
  do {
    const [nextCursor, keys] = await redis.scan(cursor, 'COUNT', 100);
    
    for (const key of keys) {
      const type = await redis.type(key);
      let size;
      
      switch (type) {
        case 'string':
          const value = await redis.get(key);
          size = value ? Buffer.byteLength(value) : 0;
          break;
        case 'list':
          size = await redis.llen(key);
          break;
        case 'set':
          size = await redis.scard(key);
          break;
        case 'zset':
          size = await redis.zcard(key);
          break;
        case 'hash':
          size = await redis.hlen(key);
          break;
        default:
          size = 0;
      }
      
      if (size > threshold) {
        largeKeys.push({ key, type, size });
      }
    }
    
    cursor = nextCursor;
  } while (cursor !== '0');
  
  return largeKeys.sort((a, b) => b.size - a.size);
}

const largeKeys = await findLargeKeys(1000);
console.log('Large keys:', largeKeys.slice(0, 10));

// 8. Performance Testing
async function benchmark(command, iterations = 1000) {
  const start = Date.now();
  
  for (let i = 0; i < iterations; i++) {
    await command();
  }
  
  const duration = Date.now() - start;
  const opsPerSec = (iterations / duration) * 1000;
  
  return {
    iterations,
    duration: \`\${duration}ms\`,
    opsPerSec: \`\${opsPerSec.toFixed(0)} ops/sec\`,
    avgLatency: \`\${(duration / iterations).toFixed(2)}ms\`
  };
}

// Benchmark SET operations
const setResult = await benchmark(
  () => redis.set(\`bench:\${Date.now()}\`, 'value'),
  1000
);
console.log('SET benchmark:', setResult);

// Benchmark GET operations
const getResult = await benchmark(
  async () => {
    await redis.set('bench:key', 'value');
    return redis.get('bench:key');
  },
  1000
);
console.log('GET benchmark:', getResult);

// 9. Pipeline for Batch Operations
async function benchmarkPipeline(iterations = 1000) {
  const start = Date.now();
  
  const pipeline = redis.pipeline();
  for (let i = 0; i < iterations; i++) {
    pipeline.set(\`pipe:\${i}\`, 'value');
  }
  
  await pipeline.exec();
  
  const duration = Date.now() - start;
  console.log(\`Pipeline \${iterations} SETs: \${duration}ms\`);
}

await benchmarkPipeline(10000);

// 10. Debug Script Execution Time
const slowScript = \`
local sum = 0
for i = 1, 1000000 do
  sum = sum + i
end
return sum
\`;

const scriptStart = Date.now();
await redis.eval(slowScript, 0);
const scriptDuration = Date.now() - scriptStart;
console.log(\`Script execution: \${scriptDuration}ms\`);

if (scriptDuration > 100) {
  console.warn('Warning: Script taking too long!');
}`,
    priority: null
  },
  // Spring Boot Questions
  {
    id: 203,
    category: 'Spring Boot',
    question: 'What is Spring Boot and how does it differ from Spring Framework?',
    answer: 'Spring Boot is an opinionated framework built on top of Spring Framework that simplifies Spring application development through auto-configuration, embedded servers, and starter dependencies. It eliminates boilerplate configuration and enables rapid development.',
    explanation: '**Spring Boot Overview:**\n\n**Key Features:**\n1. **Auto-Configuration**: Automatically configures Spring based on dependencies\n2. **Starter Dependencies**: Pre-configured dependency sets\n3. **Embedded Servers**: Tomcat, Jetty, Undertow included\n4. **Production-Ready**: Actuator for monitoring and management\n5. **No Code Generation**: No XML configuration required\n6. **Opinionated Defaults**: Sensible defaults with easy customization\n\n**Differences from Spring Framework:**\n\n**Spring Framework:**\n- Requires manual configuration\n- XML or Java-based config needed\n- External server deployment\n- More setup and boilerplate\n- Flexible but complex\n\n**Spring Boot:**\n- Auto-configuration\n- Convention over configuration\n- Embedded server (run as JAR)\n- Minimal setup\n- Quick start, easy deployment\n\n**Benefits:**\n- Faster development\n- Microservices-ready\n- Easy testing\n- Production monitoring\n- Cloud-native support\n- Large ecosystem\n\n**When to Use:**\n- Microservices architecture\n- REST APIs\n- Rapid prototyping\n- Cloud deployments\n- Standalone applications',
    codeExample: `// Spring Boot Application\nimport org.springframework.boot.SpringApplication;\nimport org.springframework.boot.autoconfigure.SpringBootApplication;\n\n@SpringBootApplication  // Combines @Configuration, @EnableAutoConfiguration, @ComponentScan\npublic class Application {\n    public static void main(String[] args) {\n        SpringApplication.run(Application.class, args);\n    }\n}\n\n// application.properties (minimal configuration)\nspring.application.name=my-app\nserver.port=8080\nspring.datasource.url=jdbc:mysql://localhost:3306/mydb\nspring.datasource.username=root\nspring.datasource.password=password\n\n// pom.xml - Starter dependencies\n<dependencies>\n    <!-- Web starter - includes Spring MVC, Tomcat -->\n    <dependency>\n        <groupId>org.springframework.boot</groupId>\n        <artifactId>spring-boot-starter-web</artifactId>\n    </dependency>\n    \n    <!-- Data JPA starter -->\n    <dependency>\n        <groupId>org.springframework.boot</groupId>\n        <artifactId>spring-boot-starter-data-jpa</artifactId>\n    </dependency>\n    \n    <!-- Security starter -->\n    <dependency>\n        <groupId>org.springframework.boot</groupId>\n        <artifactId>spring-boot-starter-security</artifactId>\n    </dependency>\n    \n    <!-- Actuator for monitoring -->\n    <dependency>\n        <groupId>org.springframework.boot</groupId>\n        <artifactId>spring-boot-starter-actuator</artifactId>\n    </dependency>\n</dependencies>\n\n// Run application\n// Method 1: Maven\nmvn spring-boot:run\n\n// Method 2: Executable JAR\nmvn package\njava -jar target/myapp.jar\n\n// Method 3: IDE - Run main method\n\n// Check actuator endpoints\ncurl http://localhost:8080/actuator/health\ncurl http://localhost:8080/actuator/info\ncurl http://localhost:8080/actuator/metrics`,
    priority: null
  },
  {
    id: 204,
    category: 'Spring Boot',
    question: 'Explain Spring Boot auto-configuration and how it works.',
    answer: 'Auto-configuration automatically configures Spring beans based on classpath dependencies, existing beans, and property settings. It uses @Conditional annotations to determine what to configure, enabling convention-over-configuration approach.',
    explanation: '**Auto-Configuration Mechanism:**\n\n**How It Works:**\n1. Scans classpath for dependencies\n2. Checks @Conditional annotations\n3. Configures beans automatically\n4. Can be overridden by custom configuration\n\n**Key Annotations:**\n- **@EnableAutoConfiguration**: Enables auto-config (included in @SpringBootApplication)\n- **@ConditionalOnClass**: Configure if class exists\n- **@ConditionalOnMissingBean**: Configure if bean not present\n- **@ConditionalOnProperty**: Configure based on properties\n- **@ConditionalOnWebApplication**: For web apps\n- **@ConditionalOnMissingClass**: Configure if class absent\n\n**Auto-Configuration Process:**\n1. Load spring.factories files\n2. Filter by @Conditional conditions\n3. Apply configurations in order\n4. Allow user overrides\n\n**Common Auto-Configurations:**\n- DataSource (if H2/MySQL driver present)\n- Spring MVC (if spring-web present)\n- JPA repositories (if spring-data-jpa present)\n- Security (if spring-security present)\n- Thymeleaf templates (if thymeleaf present)\n\n**Customization:**\n- Exclude specific auto-configs\n- Override with custom beans\n- Set properties in application.properties\n- Create custom auto-configuration\n\n**Debugging:**\n- Use --debug flag\n- Check condition evaluation report\n- Review auto-config classes\n\n**Best Practices:**\n- Understand what\'s auto-configured\n- Override only when necessary\n- Use properties for customization\n- Document custom configurations',
    codeExample: `// Example: How DataSource auto-configuration works\n\n// 1. Spring detects H2 database on classpath\n// pom.xml\n<dependency>\n    <groupId>com.h2database</groupId>\n    <artifactId>h2</artifactId>\n    <scope>runtime</scope>\n</dependency>\n\n// 2. Auto-configuration creates DataSource bean automatically\n// No need to define @Bean for DataSource\n\n// 3. Customize via properties\n// application.properties\nspring.datasource.url=jdbc:h2:mem:testdb\nspring.datasource.driver-class-name=org.h2.Driver\nspring.datasource.username=sa\nspring.datasource.password=\nspring.h2.console.enabled=true\n\n// 4. Override auto-configuration with custom bean\n@Configuration\npublic class CustomDataSourceConfig {\n    \n    @Bean\n    @Primary  // This takes precedence over auto-configured bean\n    public DataSource dataSource() {\n        HikariDataSource dataSource = new HikariDataSource();\n        dataSource.setJdbcUrl("jdbc:mysql://localhost/mydb");\n        dataSource.setUsername("user");\n        dataSource.setPassword("pass");\n        return dataSource;\n    }\n}\n\n// 5. Exclude specific auto-configuration\n@SpringBootApplication(exclude = {\n    DataSourceAutoConfiguration.class,\n    HibernateJpaAutoConfiguration.class\n})\npublic class Application { }\n\n// Or in application.properties:\n// spring.autoconfigure.exclude=\\\n//   org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration\n\n// 6. Conditional configuration example\n@Configuration\n@ConditionalOnProperty(name = "email.enabled", havingValue = "true")\npublic class EmailConfig {\n    \n    @Bean\n    public EmailService emailService() {\n        return new EmailServiceImpl();\n    }\n}\n\n// 7. Debug auto-configuration\n// Run with debug flag\n// java -jar app.jar --debug\n\n// Output shows:\n// ============================\n// CONDITIONS EVALUATION REPORT\n// ============================\n// \n// Positive matches:\n//    DataSourceAutoConfiguration matched:\n//       - @ConditionalOnClass found required class 'javax.sql.DataSource'\n//       - @ConditionalOnMissingBean did not find custom DataSource\n// \n// Negative matches:\n//    RedisAutoConfiguration did not match:\n//       - @ConditionalOnClass did not find required class 'redis.clients.jedis.Jedis'\n\n// 8. Create custom auto-configuration\n// src/main/resources/META-INF/spring.factories\norg.springframework.boot.autoconfigure.EnableAutoConfiguration=\\\n    com.example.CustomAutoConfiguration\n\n// CustomAutoConfiguration.java\n@Configuration\n@ConditionalOnClass(CustomService.class)\npublic class CustomAutoConfiguration {\n    \n    @Bean\n    @ConditionalOnMissingBean\n    public CustomService customService() {\n        return new CustomServiceImpl();\n    }\n}`,
    priority: null
  },
  {
    id: 205,
    category: 'Spring Boot',
    question: 'What are Spring Boot starters and name common ones?',
    answer: 'Starters are convenient dependency descriptors that bundle related dependencies together. They simplify build configuration by providing curated sets of dependencies for specific functionalities like web, data, security, and testing.',
    explanation: '**Spring Boot Starters:**\n\n**Purpose:**\n- Simplify dependency management\n- Provide curated dependency sets\n- Ensure compatible versions\n- Reduce configuration errors\n- Enable quick project setup\n\n**Naming Convention:**\n- spring-boot-starter-* (official)\n- *-spring-boot-starter (third-party)\n\n**Common Official Starters:**\n\n**Web & REST:**\n- spring-boot-starter-web: Spring MVC, Tomcat, REST\n- spring-boot-starter-webflux: Reactive web (Netty)\n- spring-boot-starter-jersey: JAX-RS/Jersey\n\n**Data Access:**\n- spring-boot-starter-data-jpa: JPA with Hibernate\n- spring-boot-starter-data-mongodb: MongoDB\n- spring-boot-starter-data-redis: Redis\n- spring-boot-starter-jdbc: JDBC\n- spring-boot-starter-data-rest: REST repositories\n\n**Security:**\n- spring-boot-starter-security: Spring Security\n- spring-boot-starter-oauth2-client: OAuth2 client\n- spring-boot-starter-oauth2-resource-server: OAuth2 resource server\n\n**Testing:**\n- spring-boot-starter-test: JUnit, Mockito, AssertJ\n- spring-boot-starter-testcontainers: Test containers\n\n**Messaging:**\n- spring-boot-starter-amqp: RabbitMQ\n- spring-boot-starter-kafka: Apache Kafka\n- spring-boot-starter-mail: Email\n\n**Template Engines:**\n- spring-boot-starter-thymeleaf: Thymeleaf\n- spring-boot-starter-freemarker: FreeMarker\n- spring-boot-starter-mustache: Mustache\n\n**Monitoring:**\n- spring-boot-starter-actuator: Production features\n\n**Other:**\n- spring-boot-starter-validation: Bean validation\n- spring-boot-starter-cache: Caching\n- spring-boot-starter-quartz: Scheduling\n- spring-boot-starter-batch: Batch processing\n\n**Third-Party Starters:**\n- mybatis-spring-boot-starter\n- grpc-spring-boot-starter\n- graphql-spring-boot-starter\n\n**Benefits:**\n- One dependency instead of many\n- Version compatibility guaranteed\n- Transitive dependencies managed\n- Easy to swap implementations\n\n**Best Practices:**\n- Use appropriate starters\n- Avoid mixing conflicting starters\n- Check transitive dependencies\n- Override versions carefully',
    codeExample: `// pom.xml - Common starter combinations\n\n<!-- REST API with JPA -->\n<dependencies>\n    <dependency>\n        <groupId>org.springframework.boot</groupId>\n        <artifactId>spring-boot-starter-web</artifactId>\n    </dependency>\n    \n    <dependency>\n        <groupId>org.springframework.boot</groupId>\n        <artifactId>spring-boot-starter-data-jpa</artifactId>\n    </dependency>\n    \n    <dependency>\n        <groupId>org.springframework.boot</groupId>\n        <artifactId>spring-boot-starter-validation</artifactId>\n    </dependency>\n    \n    <dependency>\n        <groupId>mysql</groupId>\n        <artifactId>mysql-connector-java</artifactId>\n        <scope>runtime</scope>\n    </dependency>\n</dependencies>\n\n<!-- Microservice with Security & Monitoring -->\n<dependencies>\n    <dependency>\n        <groupId>org.springframework.boot</groupId>\n        <artifactId>spring-boot-starter-web</artifactId>\n    </dependency>\n    \n    <dependency>\n        <groupId>org.springframework.boot</groupId>\n        <artifactId>spring-boot-starter-security</artifactId>\n    </dependency>\n    \n    <dependency>\n        <groupId>org.springframework.boot</groupId>\n        <artifactId>spring-boot-starter-oauth2-resource-server</artifactId>\n    </dependency>\n    \n    <dependency>\n        <groupId>org.springframework.boot</groupId>\n        <artifactId>spring-boot-starter-actuator</artifactId>\n    </dependency>\n    \n    <dependency>\n        <groupId>org.springframework.boot</groupId>\n        <artifactId>spring-boot-starter-data-redis</artifactId>\n    </dependency>\n</dependencies>\n\n<!-- Reactive Application -->\n<dependencies>\n    <dependency>\n        <groupId>org.springframework.boot</groupId>\n        <artifactId>spring-boot-starter-webflux</artifactId>\n    </dependency>\n    \n    <dependency>\n        <groupId>org.springframework.boot</groupId>\n        <artifactId>spring-boot-starter-data-mongodb-reactive</artifactId>\n    </dependency>\n</dependencies>\n\n<!-- Testing -->\n<dependencies>\n    <dependency>\n        <groupId>org.springframework.boot</groupId>\n        <artifactId>spring-boot-starter-test</artifactId>\n        <scope>test</scope>\n    </dependency>\n    \n    <dependency>\n        <groupId>org.springframework.security</groupId>\n        <artifactId>spring-security-test</artifactId>\n        <scope>test</scope>\n    </dependency>\n</dependencies>\n\n<!-- View transitive dependencies -->\n// Command line\nmvn dependency:tree -Dincludes=org.springframework.boot:spring-boot-starter-web\n\n// Output shows all included dependencies:\n// spring-boot-starter-web:2.7.0\n// ├── spring-boot-starter:2.7.0\n// │   ├── spring-boot:2.7.0\n// │   ├── spring-boot-autoconfigure:2.7.0\n// │   └── ...\n// ├── spring-boot-starter-json:2.7.0\n// ├── spring-boot-starter-tomcat:2.7.0\n// └── spring-webmvc:5.3.20\n\n<!-- Exclude specific transitive dependency -->\n<dependency>\n    <groupId>org.springframework.boot</groupId>\n    <artifactId>spring-boot-starter-web</artifactId>\n    <exclusions>\n        <exclusion>\n            <groupId>org.springframework.boot</groupId>\n            <artifactId>spring-boot-starter-tomcat</artifactId>\n        </exclusion>\n    </exclusions>\n</dependency>\n\n<!-- Add alternative server -->\n<dependency>\n    <groupId>org.springframework.boot</groupId>\n    <artifactId>spring-boot-starter-jetty</artifactId>\n</dependency>`,
    priority: null
  },
  {
    id: 206,
    category: 'Spring Boot',
    question: 'Explain Spring Boot profiles and how to use them.',
    answer: 'Profiles allow different configurations for different environments (dev, test, prod). Use @Profile annotation, profile-specific properties files, and active profile settings to manage environment-specific behavior.',
    explanation: '**Spring Boot Profiles:**\n\n**Purpose:**\n- Environment-specific configuration\n- Different beans per environment\n- Conditional configuration loading\n- Separate dev/test/prod setups\n\n**Profile Types:**\n1. **Default**: No profile specified\n2. **Custom**: dev, test, prod, staging, etc.\n\n**Activation Methods:**\n1. **application.properties**: spring.profiles.active=dev\n2. **Command line**: --spring.profiles.active=prod\n3. **Environment variable**: SPRING_PROFILES_ACTIVE=prod\n4. **Programmatic**: SpringApplication.setAdditionalProfiles()\n5. **Maven/Gradle**: Build-time activation\n\n**Profile-Specific Files:**\n- application.properties (default)\n- application-dev.properties\n- application-test.properties\n- application-prod.properties\n- application-{profile}.yml\n\n**Bean Profiles:**\n- @Profile annotation on beans\n- Only load beans for active profile\n- Combine with @Configuration\n\n**Profile Groups:**\n- Group multiple profiles\n- Activate group activates all\n- spring.profiles.group.prod=proddb,prodmq\n\n**Best Practices:**\n- Use profiles for environment differences\n- Keep default configuration minimal\n- Document required profiles\n- Use profile groups for complex setups\n- Never commit sensitive data\n- Use environment variables for secrets',
    codeExample: `// 1. Profile-specific properties files\n\n// application.properties (common config)\nspring.application.name=myapp\nlogging.level.root=INFO\n\n// application-dev.properties\nspring.datasource.url=jdbc:h2:mem:testdb\nspring.jpa.show-sql=true\nlogging.level.com.myapp=DEBUG\nspring.h2.console.enabled=true\n\n// application-prod.properties\nspring.datasource.url=jdbc:mysql://prod-db:3306/mydb\nspring.jpa.show-sql=false\nlogging.level.com.myapp=WARN\nspring.datasource.hikari.maximum-pool-size=20\n\n// 2. Activate profile\n// application.properties\nspring.profiles.active=dev\n\n// OR command line\n// java -jar app.jar --spring.profiles.active=prod\n\n// OR environment variable\n// export SPRING_PROFILES_ACTIVE=prod\n\n// 3. Profile-specific beans\n@Configuration\npublic class DataSourceConfig {\n    \n    @Bean\n    @Profile("dev")\n    public DataSource devDataSource() {\n        return new EmbeddedDatabaseBuilder()\n            .setType(H2)\n            .build();\n    }\n    \n    @Bean\n    @Profile("prod")\n    public DataSource prodDataSource() {\n        HikariDataSource ds = new HikariDataSource();\n        ds.setJdbcUrl(env.getProperty("spring.datasource.url"));\n        ds.setMaximumPoolSize(20);\n        return ds;\n    }\n}\n\n// 4. Profile-specific configuration classes\n@Configuration\n@Profile("dev")\npublic class DevConfig {\n    @Bean\n    public CommandLineRunner initData() {\n        return args -> {\n            // Load test data\n        };\n    }\n}\n\n@Configuration\n@Profile("prod")\npublic class ProdConfig {\n    @Bean\n    public CacheManager cacheManager() {\n        // Production cache setup\n        return new RedisCacheManager();\n    }\n}\n\n// 5. Multiple active profiles\n// application.properties\nspring.profiles.active=dev,feature-x\n\n// 6. Profile groups (Spring Boot 2.4+)\n// application.properties\nspring.profiles.group.production=proddb,prodmq,prodmonitoring\nspring.profiles.group.development=devdb,devmq\n\n// Activate group\nspring.profiles.active=production\n\n// 7. YAML profile configuration\n// application.yml\nspring:\n  profiles:\n    active: dev\n---\nspring:\n  config:\n    activate:\n      on-profile: dev\ndatasource:\n  url: jdbc:h2:mem:testdb\n---\nspring:\n  config:\n    activate:\n      on-profile: prod\ndatasource:\n  url: jdbc:mysql://prod-db:3306/mydb\n\n// 8. Check active profile in code\n@Component\npublic class ProfileChecker {\n    \n    @Autowired\n    private Environment environment;\n    \n    public void checkProfile() {\n        String[] activeProfiles = environment.getActiveProfiles();\n        System.out.println("Active profiles: " + Arrays.toString(activeProfiles));\n        \n        if (environment.acceptsProfiles("prod")) {\n            // Production-specific logic\n        }\n    }\n}\n\n// 9. Maven profile activation\n// pom.xml\n<profiles>\n    <profile>\n        <id>dev</id>\n        <properties>\n            <spring.profiles.active>dev</spring.profiles.active>\n        </properties>\n        <activation>\n            <activeByDefault>true</activeByDefault>\n        </activation>\n    </profile>\n    <profile>\n        <id>prod</id>\n        <properties>\n            <spring.profiles.active>prod</spring.profiles.active>\n        </properties>\n    </profile>\n</profiles>\n\n// Build with profile\nmvn clean package -Pprod\n\n// 10. Test with specific profile\n@SpringBootTest\n@ActiveProfiles("test")\nclass UserRepositoryTest {\n    @Test\n    void testWithTestProfile() {\n        // Uses application-test.properties\n    }\n}`,
    priority: null
  },
  {
    id: 207,
    category: 'Spring Boot',
    question: 'How do you create REST APIs in Spring Boot?',
    answer: 'Create REST APIs using @RestController, @RequestMapping, @GetMapping, @PostMapping, etc. Use @RequestBody for input, @ResponseBody for output, ResponseEntity for full control, and proper HTTP status codes.',
    explanation: '**REST API Development:**\n\n**Key Annotations:**\n- **@RestController**: Combines @Controller + @ResponseBody\n- **@RequestMapping**: Base URL mapping\n- **@GetMapping/@PostMapping/@PutMapping/@DeleteMapping/@PatchMapping**: HTTP methods\n- **@PathVariable**: URL path parameters\n- **@RequestParam**: Query parameters\n- **@RequestBody**: Request body (JSON)\n- **@ResponseBody**: Response body\n- **@ResponseStatus**: HTTP status code\n- **ResponseEntity**: Full HTTP response control\n\n**Request Handling:**\n- Path variables: /users/{id}\n- Query params: /users?page=1&size=10\n- Request body: JSON payload\n- Headers: @RequestHeader\n- Cookies: @CookieValue\n\n**Response Handling:**\n- Return objects (auto-serialized to JSON)\n- ResponseEntity for status codes\n- @ResponseStatus for exceptions\n- Problem Details for errors\n\n**Validation:**\n- @Valid annotation\n- Bean Validation (JSR 380)\n- Custom validators\n- Method validation\n\n**Content Negotiation:**\n- JSON (default)\n- XML (with Jackson XML)\n- Custom media types\n\n**Best Practices:**\n- Use proper HTTP methods\n- Return appropriate status codes\n- Implement versioning\n- Handle errors consistently\n- Validate input\n- Use DTOs (not entities)\n- Document with Swagger/OpenAPI',
    codeExample: `// REST Controller\n@RestController\n@RequestMapping("/api/users")\n@Validated\npublic class UserController {\n    \n    @Autowired\n    private UserService userService;\n    \n    // GET all users with pagination\n    @GetMapping\n    public ResponseEntity<Page<UserDTO>> getUsers(\n            @RequestParam(defaultValue = "0") int page,\n            @RequestParam(defaultValue = "10") int size,\n            @RequestParam(required = false) String sortBy) {\n        \n        Page<UserDTO> users = userService.findAll(page, size, sortBy);\n        return ResponseEntity.ok(users);\n    }\n    \n    // GET user by ID\n    @GetMapping("/{id}")\n    public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {\n        UserDTO user = userService.findById(id)\n            .orElseThrow(() -> new ResourceNotFoundException("User not found"));\n        return ResponseEntity.ok(user);\n    }\n    \n    // POST create user\n    @PostMapping\n    @ResponseStatus(HttpStatus.CREATED)\n    public ResponseEntity<UserDTO> createUser(\n            @Valid @RequestBody CreateUserRequest request) {\n        \n        UserDTO user = userService.create(request);\n        \n        URI location = ServletUriComponentsBuilder\n            .fromCurrentRequest()\n            .path("/{id}")\n            .buildAndExpand(user.getId())\n            .toUri();\n        \n        return ResponseEntity.created(location).body(user);\n    }\n    \n    // PUT update user\n    @PutMapping("/{id}")\n    public ResponseEntity<UserDTO> updateUser(\n            @PathVariable Long id,\n            @Valid @RequestBody UpdateUserRequest request) {\n        \n        UserDTO user = userService.update(id, request);\n        return ResponseEntity.ok(user);\n    }\n    \n    // PATCH partial update\n    @PatchMapping("/{id}")\n    public ResponseEntity<UserDTO> patchUser(\n            @PathVariable Long id,\n            @RequestBody Map<String, Object> updates) {\n        \n        UserDTO user = userService.patch(id, updates);\n        return ResponseEntity.ok(user);\n    }\n    \n    // DELETE user\n    @DeleteMapping("/{id}")\n    @ResponseStatus(HttpStatus.NO_CONTENT)\n    public void deleteUser(@PathVariable Long id) {\n        userService.delete(id);\n    }\n    \n    // GET with query params\n    @GetMapping("/search")\n    public ResponseEntity<List<UserDTO>> searchUsers(\n            @RequestParam String name,\n            @RequestParam(required = false) String email) {\n        \n        List<UserDTO> users = userService.search(name, email);\n        return ResponseEntity.ok(users);\n    }\n}\n\n// DTO (Data Transfer Object)\npublic class UserDTO {\n    private Long id;\n    private String name;\n    private String email;\n    // getters/setters\n}\n\n// Request DTO with validation\npublic class CreateUserRequest {\n    @NotBlank(message = "Name is required")\n    @Size(min = 2, max = 100)\n    private String name;\n    \n    @Email(message = "Invalid email")\n    @NotBlank\n    private String email;\n    \n    @Min(18)\n    private Integer age;\n    // getters/setters\n}\n\n// Global Exception Handler\n@RestControllerAdvice\npublic class GlobalExceptionHandler {\n    \n    @ExceptionHandler(ResourceNotFoundException.class)\n    public ResponseEntity<ErrorResponse> handleNotFound(\n            ResourceNotFoundException ex) {\n        \n        ErrorResponse error = new ErrorResponse(\n            HttpStatus.NOT_FOUND.value(),\n            ex.getMessage(),\n            LocalDateTime.now()\n        );\n        \n        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);\n    }\n    \n    @ExceptionHandler(MethodArgumentNotValidException.class)\n    public ResponseEntity<ErrorResponse> handleValidation(\n            MethodArgumentNotValidException ex) {\n        \n        String message = ex.getBindingResult()\n            .getFieldErrors()\n            .stream()\n            .map(error -> error.getField() + ": " + error.getDefaultMessage())\n            .collect(Collectors.joining(", "));\n        \n        ErrorResponse error = new ErrorResponse(\n            HttpStatus.BAD_REQUEST.value(),\n            "Validation failed: " + message,\n            LocalDateTime.now()\n        );\n        \n        return ResponseEntity.badRequest().body(error);\n    }\n}\n\n// Error Response DTO\npublic class ErrorResponse {\n    private int status;\n    private String message;\n    private LocalDateTime timestamp;\n    // constructor, getters\n}\n\n// Test REST API\n@SpringBootTest\n@AutoConfigureMockMvc\nclass UserControllerTest {\n    \n    @Autowired\n    private MockMvc mockMvc;\n    \n    @Test\n    void testGetUser() throws Exception {\n        mockMvc.perform(get("/api/users/1")\n                .contentType(MediaType.APPLICATION_JSON))\n            .andExpect(status().isOk())\n            .andExpect(jsonPath("$.name").value("John Doe"));\n    }\n    \n    @Test\n    void testCreateUser() throws Exception {\n        String userJson = "{\\"name\\":\\"Jane\\",\\"email\\":\\"jane@test.com\\"}";\n        \n        mockMvc.perform(post("/api/users")\n                .contentType(MediaType.APPLICATION_JSON)\n                .content(userJson))\n            .andExpect(status().isCreated())\n            .andExpect(header().exists("Location"));\n    }\n}`,
    priority: null
  },
  {
    id: 208,
    category: 'Spring Boot',
    question: 'Explain Spring Data JPA and repository pattern.',
    answer: 'Spring Data JPA simplifies data access by providing repository abstractions. Define interfaces extending JpaRepository, and Spring generates implementations automatically. Supports CRUD operations, query methods, pagination, and custom queries.',
    explanation: '**Spring Data JPA Overview:**\n\n**Repository Interfaces:**\n- **CrudRepository**: Basic CRUD operations\n- **PagingAndSortingRepository**: Pagination and sorting\n- **JpaRepository**: JPA-specific features\n- **QueryByExampleExecutor**: Query by example\n\n**Query Methods:**\n- Derived from method names\n- findByFieldName\n- findByFieldGreaterThan\n- findByFieldOrderByFieldDesc\n- Automatic query generation\n\n**Custom Queries:**\n- @Query annotation\n- JPQL (Java Persistence Query Language)\n- Native SQL queries\n- Parameter binding\n\n**Features:**\n- Automatic implementation\n- Pagination support\n- Sorting\n- Auditing\n- Entity callbacks\n- Projections\n\n**Best Practices:**\n- Use DTOs not entities in services\n- Lazy loading considerations\n- N+1 query problem\n- Transaction management\n- Proper indexing\n- Query optimization',
    codeExample: `// Entity\n@Entity\n@Table(name = "users")\n@EntityListeners(AuditingEntityListener.class)\npublic class User {\n    @Id\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n    \n    @Column(nullable = false)\n    private String name;\n    \n    @Column(unique = true, nullable = false)\n    private String email;\n    \n    private Integer age;\n    \n    @CreatedDate\n    private LocalDateTime createdAt;\n    \n    @LastModifiedDate\n    private LocalDateTime updatedAt;\n    \n    // getters/setters\n}\n\n// Repository Interface\n@Repository\npublic interface UserRepository extends JpaRepository<User, Long>, \n                                       JpaSpecificationExecutor<User> {\n    \n    // Derived query methods\n    Optional<User> findByEmail(String email);\n    \n    List<User> findByNameContaining(String name);\n    \n    List<User> findByAgeGreaterThan(int age);\n    \n    List<User> findByNameOrderByCreatedAtDesc(String name);\n    \n    boolean existsByEmail(String email);\n    \n    long countByAgeGreaterThan(int age);\n    \n    // Pagination\n    Page<User> findByAge(int age, Pageable pageable);\n    \n    // Custom JPQL query\n    @Query("SELECT u FROM User u WHERE u.email LIKE ?1%")\n    List<User> findByEmailStartingWith(String emailPrefix);\n    \n    @Query("SELECT u FROM User u WHERE u.age BETWEEN :minAge AND :maxAge")\n    List<User> findByAgeRange(@Param("minAge") int minAge, \n                              @Param("maxAge") int maxAge);\n    \n    // Native query\n    @Query(value = "SELECT * FROM users WHERE name = :name", nativeQuery = true)\n    List<User> findByNameNative(@Param("name") String name);\n    \n    // Update query\n    @Modifying\n    @Query("UPDATE User u SET u.name = :name WHERE u.id = :id")\n    int updateName(@Param("id") Long id, @Param("name") String name);\n    \n    // Delete query\n    @Modifying\n    @Query("DELETE FROM User u WHERE u.email = :email")\n    void deleteByEmail(@Param("email") String email);\n}\n\n// Service Layer\n@Service\n@Transactional(readOnly = true)\npublic class UserService {\n    \n    @Autowired\n    private UserRepository userRepository;\n    \n    public List<UserDTO> findAll(int page, int size, String sortBy) {\n        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));\n        Page<User> users = userRepository.findAll(pageable);\n        \n        return users.stream()\n            .map(this::convertToDTO)\n            .collect(Collectors.toList());\n    }\n    \n    public Optional<UserDTO> findById(Long id) {\n        return userRepository.findById(id)\n            .map(this::convertToDTO);\n    }\n    \n    @Transactional\n    public UserDTO create(CreateUserRequest request) {\n        if (userRepository.existsByEmail(request.getEmail())) {\n            throw new DuplicateResourceException("Email already exists");\n        }\n        \n        User user = new User();\n        user.setName(request.getName());\n        user.setEmail(request.getEmail());\n        user.setAge(request.getAge());\n        \n        User saved = userRepository.save(user);\n        return convertToDTO(saved);\n    }\n    \n    @Transactional\n    public UserDTO update(Long id, UpdateUserRequest request) {\n        User user = userRepository.findById(id)\n            .orElseThrow(() -> new ResourceNotFoundException("User not found"));\n        \n        user.setName(request.getName());\n        user.setAge(request.getAge());\n        \n        User updated = userRepository.save(user);\n        return convertToDTO(updated);\n    }\n    \n    @Transactional\n    public void delete(Long id) {\n        userRepository.deleteById(id);\n    }\n    \n    // Specification for dynamic queries\n    public List<UserDTO> search(String name, Integer minAge, Integer maxAge) {\n        Specification<User> spec = Specification.where(null);\n        \n        if (name != null) {\n            spec = spec.and((root, query, cb) -> \n                cb.like(root.get("name"), "%" + name + "%"));\n        }\n        \n        if (minAge != null) {\n            spec = spec.and((root, query, cb) -> \n                cb.greaterThanOrEqualTo(root.get("age"), minAge));\n        }\n        \n        if (maxAge != null) {\n            spec = spec.and((root, query, cb) -> \n                cb.lessThanOrEqualTo(root.get("age"), maxAge));\n        }\n        \n        List<User> users = userRepository.findAll(spec);\n        return users.stream()\n            .map(this::convertToDTO)\n            .collect(Collectors.toList());\n    }\n    \n    private UserDTO convertToDTO(User user) {\n        UserDTO dto = new UserDTO();\n        dto.setId(user.getId());\n        dto.setName(user.getName());\n        dto.setEmail(user.getEmail());\n        dto.setAge(user.getAge());\n        return dto;\n    }\n}\n\n// Enable JPA Auditing\n@Configuration\n@EnableJpaAuditing\npublic class JpaConfig {\n    @Bean\n    public AuditorAware<AuditUser> auditorProvider() {\n        return () -> Optional.of(new AuditUser());\n    }\n}`,
    priority: null
  },
  {
    id: 209,
    category: 'Spring Boot',
    question: 'How do you implement security in Spring Boot applications?',
    answer: 'Implement security using Spring Security with authentication (form login, JWT, OAuth2) and authorization (role-based, method-level). Configure security filter chain, password encoding, CORS, CSRF protection, and secure endpoints.',
    explanation: '**Spring Security Overview:**\n\n**Core Concepts:**\n- **Authentication**: Who are you?\n- **Authorization**: What can you do?\n- **Filter Chain**: Security filters\n- **UserDetailsService**: Load user data\n- **PasswordEncoder**: Hash passwords\n\n**Authentication Methods:**\n1. **Form Login**: Traditional username/password\n2. **HTTP Basic**: Basic auth header\n3. **JWT**: Token-based stateless auth\n4. **OAuth2/OIDC**: Third-party authentication\n5. **LDAP**: Directory service\n\n**Authorization:**\n- Role-based (ROLE_USER, ROLE_ADMIN)\n- Permission-based\n- Method-level (@PreAuthorize)\n- URL-based security\n\n**Security Features:**\n- Password encoding (BCrypt)\n- CSRF protection\n- CORS configuration\n- Session management\n- Remember-me\n- Two-factor authentication\n\n**Best Practices:**\n- Use HTTPS in production\n- Encode passwords properly\n- Implement rate limiting\n- Validate JWT tokens\n- Use principle of least privilege\n- Regular security audits',
    codeExample: `// Security Configuration (Spring Security 6+)\n@Configuration\n@EnableWebSecurity\npublic class SecurityConfig {\n    \n    @Bean\n    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {\n        http\n            .csrf(csrf -> csrf.disable())  // Disable for REST APIs\n            .cors(cors -> cors.configurationSource(corsConfigurationSource()))\n            .authorizeHttpRequests(auth -> auth\n                .requestMatchers("/api/public/**").permitAll()\n                .requestMatchers("/api/admin/**").hasRole("ADMIN")\n                .requestMatchers("/api/user/**").hasAnyRole("USER", "ADMIN")\n                .anyRequest().authenticated()\n            )\n            .sessionManagement(session -> \n                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))\n            .addFilterBefore(jwtAuthenticationFilter(), \n                UsernamePasswordAuthenticationFilter.class);\n        \n        return http.build();\n    }\n    \n    @Bean\n    public AuthenticationManager authenticationManager(\n            AuthenticationConfiguration config) throws Exception {\n        return config.getAuthenticationManager();\n    }\n    \n    @Bean\n    public PasswordEncoder passwordEncoder() {\n        return new BCryptPasswordEncoder();\n    }\n    \n    @Bean\n    public CorsConfigurationSource corsConfigurationSource() {\n        CorsConfiguration config = new CorsConfiguration();\n        config.setAllowedOrigins(List.of("http://localhost:3000"));\n        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));\n        config.setAllowedHeaders(List.of("*"));\n        config.setAllowCredentials(true);\n        \n        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();\n        source.registerCorsConfiguration("/**", config);\n        return source;\n    }\n}\n\n// JWT Authentication Filter\n@Component\npublic class JwtAuthenticationFilter extends OncePerRequestFilter {\n    \n    @Autowired\n    private JwtTokenProvider tokenProvider;\n    \n    @Autowired\n    private UserDetailsService userDetailsService;\n    \n    @Override\n    protected void doFilterInternal(HttpServletRequest request,\n                                    HttpServletResponse response,\n                                    FilterChain filterChain) \n            throws ServletException, IOException {\n        \n        try {\n            String jwt = getJwtFromRequest(request);\n            \n            if (jwt != null && tokenProvider.validateToken(jwt)) {\n                String username = tokenProvider.getUsernameFromToken(jwt);\n                \n                UserDetails userDetails = userDetailsService.loadUserByUsername(username);\n                \n                UsernamePasswordAuthenticationToken authentication =\n                    new UsernamePasswordAuthenticationToken(\n                        userDetails, null, userDetails.getAuthorities());\n                \n                authentication.setDetails(\n                    new WebAuthenticationDetailsSource().buildDetails(request));\n                \n                SecurityContextHolder.getContext().setAuthentication(authentication);\n            }\n        } catch (Exception e) {\n            logger.error("Cannot set user authentication", e);\n        }\n        \n        filterChain.doFilter(request, response);\n    }\n    \n    private String getJwtFromRequest(HttpServletRequest request) {\n        String bearerToken = request.getHeader("Authorization");\n        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {\n            return bearerToken.substring(7);\n        }\n        return null;\n    }\n}\n\n// JWT Token Provider\n@Component\npublic class JwtTokenProvider {\n    \n    @Value("\${jwt.secret}")\n    private String jwtSecret;\n    \n    @Value("\${jwt.expiration}")\n    private long jwtExpiration;\n    \n    public String generateToken(UserDetails userDetails) {\n        Date now = new Date();\n        Date expiryDate = new Date(now.getTime() + jwtExpiration);\n        \n        return Jwts.builder()\n            .setSubject(userDetails.getUsername())\n            .setIssuedAt(now)\n            .setExpiration(expiryDate)\n            .signWith(SignatureAlgorithm.HS512, jwtSecret)\n            .compact();\n    }\n    \n    public String getUsernameFromToken(String token) {\n        Claims claims = Jwts.parser()\n            .setSigningKey(jwtSecret)\n            .parseClaimsJws(token)\n            .getBody();\n        \n        return claims.getSubject();\n    }\n    \n    public boolean validateToken(String token) {\n        try {\n            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);\n            return true;\n        } catch (Exception e) {\n            return false;\n        }\n    }\n}\n\n// UserDetailsService Implementation\n@Service\npublic class CustomUserDetailsService implements UserDetailsService {\n    \n    @Autowired\n    private UserRepository userRepository;\n    \n    @Override\n    public UserDetails loadUserByUsername(String username) \n            throws UsernameNotFoundException {\n        \n        User user = userRepository.findByEmail(username)\n            .orElseThrow(() -> \n                new UsernameNotFoundException("User not found"));\n        \n        return org.springframework.security.core.userdetails.User\n            .withUsername(user.getEmail())\n            .password(user.getPassword())\n            .roles(user.getRole())\n            .build();\n    }\n}\n\n// Method-level security\n@Service\npublic class AdminService {\n    \n    @PreAuthorize("hasRole('ADMIN')")\n    public void adminOnlyOperation() {\n        // Only admins can call this\n    }\n    \n    @PreAuthorize("hasRole('ADMIN') or #userId == authentication.principal.id")\n    public void updateUser(Long userId, UpdateRequest request) {\n        // Admin or own user\n    }\n    \n    @PostAuthorize("returnObject.owner == authentication.principal.id")\n    public Document getDocument(Long documentId) {\n        // Check ownership after method execution\n    }\n}\n\n// Authentication Controller\n@RestController\n@RequestMapping("/api/auth")\npublic class AuthController {\n    \n    @Autowired\n    private AuthenticationManager authenticationManager;\n    \n    @Autowired\n    private JwtTokenProvider tokenProvider;\n    \n    @PostMapping("/login")\n    public ResponseEntity<?> login(@RequestBody LoginRequest request) {\n        Authentication authentication = authenticationManager.authenticate(\n            new UsernamePasswordAuthenticationToken(\n                request.getEmail(), request.getPassword())\n        );\n        \n        SecurityContextHolder.getContext().setAuthentication(authentication);\n        \n        String jwt = tokenProvider.generateToken(authentication);\n        \n        return ResponseEntity.ok(new JwtResponse(jwt));\n    }\n}\n\n// application.properties\njwt.secret=your-secret-key-minimum-32-characters-long\njwt.expiration=86400000  # 24 hours in milliseconds\n\n# Password encoding\n@Bean\npublic PasswordEncoder passwordEncoder() {\n    return new BCryptPasswordEncoder(12);  // Strength parameter\n}\n\n// Register user with encoded password\n@Service\npublic class RegistrationService {\n    \n    @Autowired\n    private PasswordEncoder passwordEncoder;\n    \n    public User register(RegisterRequest request) {\n        User user = new User();\n        user.setEmail(request.getEmail());\n        user.setPassword(passwordEncoder.encode(request.getPassword()));\n        user.setRole("USER");\n        \n        return userRepository.save(user);\n    }\n}`,
    priority: null
  },
  {
    id: 210,
    category: 'Spring Boot',
    question: 'Explain Spring Boot Actuator and production-ready features.',
    answer: 'Actuator provides production-ready features like health checks, metrics, auditing, and monitoring. Exposes endpoints for application information, environment, beans, mappings, and custom health indicators. Essential for microservices observability.',
    explanation: '**Spring Boot Actuator:**\n\n**Built-in Endpoints:**\n- **/actuator/health**: Application health\n- **/actuator/info**: Application info\n- **/actuator/metrics**: Metrics data\n- **/actuator/env**: Environment properties\n- **/actuator/beans**: Spring beans\n- **/actuator/mappings**: URL mappings\n- **/actuator/configprops**: Configuration properties\n- **/actuator/threaddump**: Thread dump\n- **/actuator/heapdump**: Heap dump\n- **/actuator/loggers**: Logging configuration\n\n**Health Indicators:**\n- Database connectivity\n- Disk space\n- Redis/MongoDB/Elasticsearch\n- Custom health checks\n- Composite health\n\n**Metrics:**\n- JVM metrics (memory, threads, GC)\n- HTTP request metrics\n- DataSource metrics\n- Custom metrics\n- Micrometer integration\n\n**Security:**\n- Secure sensitive endpoints\n- Role-based access\n- IP whitelisting\n- Separate management port\n\n**Integration:**\n- Prometheus\n- Grafana\n- New Relic\n- Datadog\n- ELK Stack\n\n**Best Practices:**\n- Secure actuator endpoints\n- Use separate management port\n- Expose only necessary endpoints\n- Implement custom health checks\n- Monitor key metrics\n- Set up alerts',
    codeExample: `// pom.xml\n<dependency>\n    <groupId>org.springframework.boot</groupId>\n    <artifactId>spring-boot-starter-actuator</artifactId>\n</dependency>\n\n// application.properties\n# Expose endpoints\nmanagement.endpoints.web.exposure.include=health,info,metrics,prometheus\nmanagement.endpoints.web.exposure.exclude=env,beans\n\n# Health details\nmanagement.endpoint.health.show-details=when-authorized\nmanagement.endpoint.health.show-components=always\n\n# Info endpoint\nmanagement.info.env.enabled=true\ninfo.app.name=My Application\ninfo.app.version=1.0.0\ninfo.app.description=Spring Boot Application\n\n# Metrics\nmanagement.metrics.export.prometheus.enabled=true\nmanagement.metrics.distribution.percentiles-histogram.http.server.requests=true\n\n# Separate management port\nmanagement.server.port=8081\nmanagement.server.address=127.0.0.1\n\n# Base path\nmanagement.endpoints.web.base-path=/manage\n\n// Custom Health Indicator\n@Component\npublic class CustomHealthIndicator implements HealthIndicator {\n    \n    @Autowired\n    private ExternalService externalService;\n    \n    @Override\n    public Health health() {\n        try {\n            boolean isHealthy = externalService.ping();\n            \n            if (isHealthy) {\n                return Health.up()\n                    .withDetail("service", "External API")\n                    .withDetail("status", "Connected")\n                    .build();\n            } else {\n                return Health.down()\n                    .withDetail("service", "External API")\n                    .withDetail("status", "Disconnected")\n                    .build();\n            }\n        } catch (Exception e) {\n            return Health.down(e)\n                .withDetail("service", "External API")\n                .withDetail("error", e.getMessage())\n                .build();\n        }\n    }\n}\n\n// Composite Health Check\n@Component\npublic class DatabaseHealthIndicator implements HealthIndicator {\n    \n    @Autowired\n    private DataSource dataSource;\n    \n    @Override\n    public Health health() {\n        try (Connection connection = dataSource.getConnection()) {\n            if (connection.isValid(2)) {\n                return Health.up()\n                    .withDetail("database", "Connected")\n                    .withDetail("pool", getPoolInfo())\n                    .build();\n            }\n            return Health.down().withDetail("database", "Invalid connection").build();\n        } catch (SQLException e) {\n            return Health.down(e)\n                .withDetail("database", "Connection failed")\n                .build();\n        }\n    }\n    \n    private Map<String, Object> getPoolInfo() {\n        HikariDataSource hikari = (HikariDataSource) dataSource;\n        Map<String, Object> info = new HashMap<>();\n        info.put("active", hikari.getHikariPoolMXBean().getActiveConnections());\n        info.put("idle", hikari.getHikariPoolMXBean().getIdleConnections());\n        info.put("total", hikari.getHikariPoolMXBean().getTotalConnections());\n        return info;\n    }\n}\n\n// Custom Metrics\n@Service\npublic class OrderService {\n    \n    private final MeterRegistry meterRegistry;\n    private final Timer orderProcessingTimer;\n    private final Counter orderCounter;\n    \n    public OrderService(MeterRegistry meterRegistry) {\n        this.meterRegistry = meterRegistry;\n        \n        this.orderProcessingTimer = Timer.builder("order.processing.time")\n            .description("Time taken to process orders")\n            .register(meterRegistry);\n        \n        this.orderCounter = Counter.builder("order.count")\n            .description("Number of orders processed")\n            .tag("type", "online")\n            .register(meterRegistry);\n    }\n    \n    public Order processOrder(OrderRequest request) {\n        return orderProcessingTimer.record(() -> {\n            // Process order logic\n            Order order = createOrder(request);\n            orderCounter.increment();\n            return order;\n        });\n    }\n}\n\n// Custom Info Contributor\n@Component\npublic class GitInfoContributor implements InfoContributor {\n    \n    @Override\n    public void contribute(Info.Builder builder) {\n        builder.withDetail("git", Map.of(\n            "commit", "abc123",\n            "branch", "main",\n            "buildTime", LocalDateTime.now()\n        ));\n    }\n}\n\n// Security for Actuator\n@Configuration\npublic class ActuatorSecurityConfig {\n    \n    @Bean\n    public SecurityFilterChain actuatorSecurity(HttpSecurity http) throws Exception {\n        http\n            .securityMatcher("/actuator/**")\n            .authorizeHttpRequests(auth -> auth\n                .requestMatchers("/actuator/health").permitAll()\n                .requestMatchers("/actuator/info").permitAll()\n                .requestMatchers("/actuator/prometheus").permitAll()\n                .requestMatchers("/actuator/**").hasRole("ADMIN")\n            )\n            .httpBasic(Customizer.withDefaults());\n        \n        return http.build();\n    }\n}\n\n// Prometheus Integration\n// pom.xml\n<dependency>\n    <groupId>io.micrometer</groupId>\n    <artifactId>micrometer-registry-prometheus</artifactId>\n</dependency>\n\n// Access metrics\n// curl http://localhost:8081/actuator/prometheus\n\n// Sample Prometheus config\n# prometheus.yml\nscrape_configs:\n  - job_name: 'spring-boot-app'\n    metrics_path: '/actuator/prometheus'\n    static_configs:\n      - targets: ['localhost:8081']\n\n// Check endpoints\n// Health\ncurl http://localhost:8081/actuator/health\n\n// Info\ncurl http://localhost:8081/actuator/info\n\n// Metrics\ncurl http://localhost:8081/actuator/metrics\n\n// Specific metric\ncurl http://localhost:8081/actuator/metrics/jvm.memory.used\n\n// Thread dump\ncurl http://localhost:8081/actuator/threaddump\n\n// Change log level at runtime\ncurl -X POST http://localhost:8081/actuator/loggers/com.myapp \\\n  -H "Content-Type: application/json" \\\n  -d '{"configuredLevel": "DEBUG"}'`,
    priority: null
  },
  {
    id: 211,
    category: 'Spring Boot',
    question: 'How do you handle exceptions in Spring Boot?',
    answer: 'Handle exceptions using @ControllerAdvice with @ExceptionHandler for global handling, @ResponseStatus for status codes, ResponseStatusException for simple cases, and Problem Details for standardized error responses. Implement custom exception classes and validation error handling.',
    explanation: '**Exception Handling Strategies:**\n\n**1. @ControllerAdvice (Global):**\n- Centralized exception handling\n- Apply to all controllers\n- Multiple exception handlers\n- Best for REST APIs\n\n**2. @ExceptionHandler (Local):**\n- Controller-specific handling\n- Override global handlers\n- Fine-grained control\n\n**3. @ResponseStatus:**\n- Simple status code mapping\n- On exception classes\n- Quick and easy\n\n**4. ResponseStatusException:**\n- Throw with status code\n- No custom exception needed\n- Flexible\n\n**5. Problem Details (RFC 7807):**\n- Standardized error format\n- Machine-readable\n- Better API design\n\n**Exception Types:**\n- Business exceptions\n- Validation exceptions\n- Resource not found\n- Unauthorized/Forbidden\n- Internal server errors\n\n**Best Practices:**\n- Use meaningful exception messages\n- Log exceptions properly\n- Don\'t expose internal details\n- Consistent error format\n- Appropriate HTTP status codes\n- Include correlation IDs',
    codeExample: `// Custom Exceptions\npublic class ResourceNotFoundException extends RuntimeException {\n    public ResourceNotFoundException(String message) {\n        super(message);\n    }\n}\n\npublic class InvalidRequestException extends RuntimeException {\n    public InvalidRequestException(String message) {\n        super(message);\n    }\n}\n\npublic class AuthorizationException extends RuntimeException {\n    public AuthorizationException(String message) {\n        super(message);\n    }\n}\n\n// Error Response DTO\npublic class ErrorResponse {\n    private int status;\n    private String error;\n    private String message;\n    private LocalDateTime timestamp;\n    private String path;\n    private List<FieldError> fieldErrors;\n    \n    // Constructors, getters, setters\n    public ErrorResponse(int status, String error, String message, String path) {\n        this.status = status;\n        this.error = error;\n        this.message = message;\n        this.timestamp = LocalDateTime.now();\n        this.path = path;\n    }\n}\n\npublic class FieldError {\n    private String field;\n    private String message;\n    private Object rejectedValue;\n    // constructors, getters\n}\n\n// Global Exception Handler\n@RestControllerAdvice\npublic class GlobalExceptionHandler {\n    \n    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);\n    \n    // Resource Not Found\n    @ExceptionHandler(ResourceNotFoundException.class)\n    public ResponseEntity<ErrorResponse> handleNotFound(\n            ResourceNotFoundException ex, HttpServletRequest request) {\n        \n        log.warn("Resource not found: {}", ex.getMessage());\n        \n        ErrorResponse error = new ErrorResponse(\n            HttpStatus.NOT_FOUND.value(),\n            "NOT_FOUND",\n            ex.getMessage(),\n            request.getRequestURI()\n        );\n        \n        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);\n    }\n    \n    // Validation Errors\n    @ExceptionHandler(MethodArgumentNotValidException.class)\n    public ResponseEntity<ErrorResponse> handleValidation(\n            MethodArgumentNotValidException ex, HttpServletRequest request) {\n        \n        List<FieldError> fieldErrors = ex.getBindingResult()\n            .getFieldErrors()\n            .stream()\n            .map(error -> new FieldError(\n                error.getField(),\n                error.getDefaultMessage(),\n                error.getRejectedValue()\n            ))\n            .collect(Collectors.toList());\n        \n        ErrorResponse error = new ErrorResponse(\n            HttpStatus.BAD_REQUEST.value(),\n            "VALIDATION_FAILED",\n            "Request validation failed",\n            request.getRequestURI()\n        );\n        error.setFieldErrors(fieldErrors);\n        \n        log.warn("Validation failed: {}", fieldErrors);\n        \n        return ResponseEntity.badRequest().body(error);\n    }\n    \n    // Authorization Exception\n    @ExceptionHandler(AuthorizationException.class)\n    public ResponseEntity<ErrorResponse> handleAuthorization(\n            AuthorizationException ex, HttpServletRequest request) {\n        \n        ErrorResponse error = new ErrorResponse(\n            HttpStatus.FORBIDDEN.value(),\n            "FORBIDDEN",\n            ex.getMessage(),\n            request.getRequestURI()\n        );\n        \n        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);\n    }\n    \n    // Bad Request\n    @ExceptionHandler(InvalidRequestException.class)\n    public ResponseEntity<ErrorResponse> handleBadRequest(\n            InvalidRequestException ex, HttpServletRequest request) {\n        \n        ErrorResponse error = new ErrorResponse(\n            HttpStatus.BAD_REQUEST.value(),\n            "BAD_REQUEST",\n            ex.getMessage(),\n            request.getRequestURI()\n        );\n        \n        return ResponseEntity.badRequest().body(error);\n    }\n    \n    // Generic Exception (catch-all)\n    @ExceptionHandler(Exception.class)\n    public ResponseEntity<ErrorResponse> handleGeneric(\n            Exception ex, HttpServletRequest request) {\n        \n        log.error("Unexpected error occurred", ex);\n        \n        ErrorResponse error = new ErrorResponse(\n            HttpStatus.INTERNAL_SERVER_ERROR.value(),\n            "INTERNAL_SERVER_ERROR",\n            "An unexpected error occurred",\n            request.getRequestURI()\n        );\n        \n        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);\n    }\n}\n\n// Using @ResponseStatus on exception\n@ResponseStatus(HttpStatus.NOT_FOUND)\npublic class UserNotFoundException extends RuntimeException {\n    public UserNotFoundException(Long userId) {\n        super("User not found with id: " + userId);\n    }\n}\n\n// Using ResponseStatusException\n@GetMapping("/users/{id}")\npublic ResponseEntity<User> getUser(@PathVariable Long id) {\n    User user = userService.findById(id)\n        .orElseThrow(() -> new ResponseStatusException(\n            HttpStatus.NOT_FOUND, \n            "User not found with id: " + id\n        ));\n    \n    return ResponseEntity.ok(user);\n}\n\n// Problem Details (Spring Boot 3+)\n@Component\npublic class ProblemDetailsExceptionHandler implements ErrorAttributes {\n    \n    @Override\n    public Map<String, Object> getErrorAttributes(\n            WebRequest webRequest, boolean includeStackTrace) {\n        \n        Map<String, Object> attributes = new LinkedHashMap<>();\n        attributes.put("type", "https://api.example.com/errors/not-found");\n        attributes.put("title", "Resource Not Found");\n        attributes.put("status", 404);\n        attributes.put("detail", "The requested resource was not found");\n        attributes.put("instance", webRequest.getDescription(false));\n        \n        return attributes;\n    }\n}\n\n// Validation in Controller\n@PostMapping("/users")\npublic ResponseEntity<User> createUser(@Valid @RequestBody CreateUserRequest request) {\n    // If validation fails, MethodArgumentNotValidException is thrown automatically\n    User user = userService.create(request);\n    return ResponseEntity.status(HttpStatus.CREATED).body(user);\n}\n\n// Request DTO with validation\npublic class CreateUserRequest {\n    @NotBlank(message = "Name is required")\n    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")\n    private String name;\n    \n    @Email(message = "Invalid email format")\n    @NotBlank(message = "Email is required")\n    private String email;\n    \n    @Min(value = 18, message = "Age must be at least 18")\n    @Max(value = 120, message = "Age must be less than 120")\n    private Integer age;\n    \n    // getters/setters\n}\n\n// Test exception handling\n@SpringBootTest\n@AutoConfigureMockMvc\nclass ExceptionHandlingTest {\n    \n    @Autowired\n    private MockMvc mockMvc;\n    \n    @Test\n    void testNotFound() throws Exception {\n        mockMvc.perform(get("/api/users/999"))\n            .andExpect(status().isNotFound())\n            .andExpect(jsonPath("$.status").value(404))\n            .andExpect(jsonPath("$.error").value("NOT_FOUND"));\n    }\n    \n    @Test\n    void testValidation() throws Exception {\n        String invalidUser = "{\\"name\\":\\"A\\",\\"email\\":\\"invalid\\"}";\n        \n        mockMvc.perform(post("/api/users")\n                .contentType(MediaType.APPLICATION_JSON)\n                .content(invalidUser))\n            .andExpect(status().isBadRequest())\n            .andExpect(jsonPath("$.fieldErrors").isArray());\n    }\n}`,
    priority: null
  },
  // CI/CD Questions
  {
    id: 212,
    category: 'CI/CD',
    question: 'What is CI/CD and explain its benefits?',
    answer: 'CI/CD stands for Continuous Integration and Continuous Deployment/Delivery. CI automatically builds and tests code changes, while CD automates deployment. Benefits include faster releases, early bug detection, reduced manual errors, improved code quality, and better collaboration.',
    explanation: '**Continuous Integration (CI):** Automatically merges code changes, runs tests, and provides fast feedback. **Continuous Delivery:** Code is always ready to deploy but requires manual approval. **Continuous Deployment:** Fully automated deployment to production without manual intervention.',
    codeExample: `# Simple CI/CD Pipeline Concept

# 1. Developer pushes code to Git
git push origin main

# 2. CI Server detects change and:
#    - Pulls latest code
#    - Installs dependencies
#    - Runs linter
#    - Executes tests
#    - Builds application

# 3. If all checks pass:
#    - Creates Docker image
#    - Pushes to registry
#    - Deploys to staging

# 4. After manual approval:
#    - Deploys to production
#    - Runs smoke tests
#    - Sends notification

# Tools: Jenkins, GitHub Actions, GitLab CI, CircleCI`,
    priority: null
  },
  {
    id: 213,
    category: 'CI/CD',
    question: 'What are popular CI/CD tools and when to use each?',
    answer: 'Popular tools include Jenkins (flexible, self-hosted), GitHub Actions (integrated with GitHub), GitLab CI (built into GitLab), CircleCI (cloud-native), and Azure DevOps (Microsoft ecosystem). Choose based on team size, budget, existing infrastructure, and cloud provider.',
    explanation: '**Jenkins:** Best for complex pipelines and on-premise. **GitHub Actions:** Ideal for GitHub projects with simple setup. **GitLab CI:** Great all-in-one solution for GitLab users. **CircleCI:** Fast cloud-native option. **Azure DevOps:** Perfect for Microsoft ecosystem.',
    codeExample: `# Tool Selection Guide

# GitHub Actions - Simple YAML config
# Good for: GitHub repos, quick setup

# Jenkins - Highly customizable  
# Good for: Complex workflows, self-hosted

# GitLab CI - Integrated experience
# Good for: GitLab users, all-in-one

# CircleCI - Fast execution
# Good for: Startups, cloud-native

# Azure DevOps - Enterprise features
# Good for: Microsoft shops, large teams`,
    priority: null
  },
  {
    id: 214,
    category: 'CI/CD',
    question: 'What are CI/CD best practices?',
    answer: 'Best practices include: keep pipelines fast (under 10 minutes), parallelize tests, cache dependencies, implement proper error handling, secure secrets management, use infrastructure as code, implement blue-green or canary deployments, and monitor pipeline metrics.',
    explanation: 'Focus on speed, reliability, security, and maintainability. Use feature flags for safe deployments. Implement rollback strategies. Monitor deployment frequency, lead time, change failure rate, and mean time to recovery.',
    codeExample: `# Key Best Practices

# 1. Fast Feedback - Keep builds under 10 min
# 2. Parallel Tests - Run tests concurrently
# 3. Cache Dependencies - Speed up builds
# 4. Secure Secrets - Never hardcode credentials
# 5. Infrastructure as Code - Version control infra
# 6. Blue-Green Deployments - Zero downtime
# 7. Canary Releases - Gradual rollout
# 8. Monitor Everything - Track pipeline health
# 9. Automated Rollback - Quick recovery
# 10. Small Commits - Easier debugging`,
    priority: null
  },
  {
    id: 215,
    category: 'CI/CD',
    question: 'How do you handle database migrations in CI/CD?',
    answer: 'Use migration tools like Flyway, Liquibase, or Prisma Migrate. Version control all migration scripts, test on staging first, ensure backward compatibility, use expand-and-contract pattern for zero downtime, implement rollback scripts, and automate migration execution in the pipeline.',
    explanation: 'Database migrations require careful handling to avoid downtime. Use feature flags for schema changes. Test migrations on production data copies. Make migrations idempotent. Always have rollback plans. Monitor migration performance.',
    codeExample: `# Migration Strategy

# 1. Expand - Add new columns/tables
# 2. Deploy code that uses both old and new
# 3. Migrate data gradually
# 4. Contract - Remove old columns
# 5. Deploy updated code

# Tools: Flyway, Liquibase, Alembic, Prisma
# Pattern: Expand and Contract for zero downtime`,
    priority: null
  },
  {
    id: 316,
    category: 'CI/CD',
    question: 'What is a CI/CD pipeline and what are its typical stages?',
    answer: 'A CI/CD pipeline is an automated workflow that takes code from commit to production. Typical stages include: Source Control → Build → Unit Tests → Code Quality → Integration Tests → Security Scanning → Artifact Creation → Deploy to Staging → E2E Tests → Performance Tests → Approve → Deploy to Production → Monitoring.',
    explanation: '**Pipeline Stages Explained:**\n\n• **Source:** Git repository triggers pipeline on push/PR\n• **Build:** Compile code, resolve dependencies\n• **Unit Tests:** Fast tests for individual components\n• **Code Quality:** Linting, static analysis, code coverage\n• **Integration Tests:** Test component interactions\n• **Security:** SAST, DAST, dependency scanning\n• **Artifact:** Create Docker image, JAR, etc.\n• **Staging:** Deploy to test environment\n• **E2E Tests:** Full user journey testing\n• **Performance:** Load testing, stress testing\n• **Approval:** Manual gate (optional)\n• **Production:** Deploy with blue-green/canary\n• **Monitoring:** Track health, auto-rollback if needed',
    codeExample: `# Example Pipeline Flow
trigger:
  - main
  - develop

stages:
  - build
  - test
  - quality
  - security
  - deploy-staging
  - e2e-test
  - approve
  - deploy-production
  - monitor`,
    priority: null
  },
  {
    id: 317,
    category: 'CI/CD',
    question: 'What is the difference between CI, CD (Delivery), and CD (Deployment)?',
    answer: 'CI (Continuous Integration) automatically builds and tests code on every commit. CD (Continuous Delivery) ensures code is always deployable but requires manual approval for production. CD (Continuous Deployment) fully automates deployment to production without human intervention.',
    explanation: '**CI:** Focus on integration - merge code frequently, run tests automatically, get fast feedback. **Continuous Delivery:** Every change passes through pipeline and is ready to deploy, but human decides when. Used in regulated industries. **Continuous Deployment:** Fully automated - if tests pass, code goes to production. Requires excellent test coverage and monitoring. Used by Netflix, Amazon, Facebook.',
    codeExample: `# Comparison

# Continuous Integration
# Developer pushes → Auto build → Auto test → Feedback

# Continuous Delivery
# CI passes → Deploy to staging → [Manual Approval] → Production

# Continuous Deployment  
# CI passes → Deploy to staging → Auto tests → Auto deploy to production

# Key Difference: Human involvement in production deployment`,
    priority: null
  },
  {
    id: 318,
    category: 'CI/CD',
    question: 'What are pipeline artifacts and why are they important?',
    answer: 'Artifacts are files produced during the build process (compiled code, Docker images, test reports, coverage reports). They\'re stored and passed between pipeline stages or saved for deployment. Important for reproducibility, debugging, and audit trails.',
    explanation: '**Types of Artifacts:**\n\n• **Build Artifacts:** Compiled binaries, JAR files, bundles\n• **Docker Images:** Containerized applications\n• **Test Reports:** JUnit XML, coverage reports\n• **Logs:** Build logs, test output\n• **Configuration:** Environment-specific configs\n\n**Best Practices:** Version artifacts, store in artifact repositories (Nexus, Artifactory, ECR), set retention policies, secure sensitive artifacts, use checksums for integrity.',
    codeExample: `# Artifact Examples

# Maven/Java
<artifactId>my-app</artifactId>
<version>1.0.0</version>
<packaging>jar</packaging>

# Docker
docker build -t myapp:1.0.0 .
docker push registry.example.com/myapp:1.0.0

# NPM
npm pack  # Creates .tgz file

# Storage: Nexus, Artifactory, S3, container registries`,
    priority: null
  },
  {
    id: 319,
    category: 'CI/CD',
    question: 'How do you implement parallel jobs in CI/CD pipelines?',
    answer: 'Parallel jobs run multiple tasks simultaneously to speed up pipelines. Common patterns: parallel test suites, multi-platform builds, independent microservices, matrix builds (test across different OS/runtimes). Reduces pipeline time significantly.',
    explanation: '**When to Parallelize:**\n\n• Independent test suites (unit, integration, E2E)\n• Multiple deployment targets (staging, prod)\n• Cross-browser testing\n• Multi-architecture builds (amd64, arm64)\n• Microservices deployments\n\n**Considerations:** Resource costs, shared state management, failure handling, aggregation of results. Most CI tools support parallel execution natively.',
    codeExample: `# Parallel Execution Examples

# GitHub Actions - Matrix Build
strategy:
  matrix:
    node-version: [14, 16, 18]
  max-parallel: 4

# Jenkins - Parallel Stages
parallel {
  stage('Unit Tests') { ... }
  stage('Integration Tests') { ... }
}`,
    priority: null
  },
  {
    id: 320,
    category: 'CI/CD',
    question: 'What is pipeline caching and how does it improve performance?',
    answer: 'Caching stores dependencies, build outputs, or intermediate files between pipeline runs to avoid redundant work. Dramatically reduces build times by reusing previously downloaded packages, compiled code, or test results.',
    explanation: '**What to Cache:**\n\n• **Dependencies:** node_modules, .m2, .gradle, pip cache\n• **Build Outputs:** Compiled code, Docker layers\n• **Test Results:** For incremental testing\n• **Tool Installations:** SDKs, CLIs\n\n**Cache Keys:** Use hash of lock files (package-lock.json, pom.xml) to invalidate cache when dependencies change. Set TTL (time-to-live) for automatic expiration.',
    codeExample: `# Caching Examples

# npm cache in CI
path: ~/.npm
key: based-on-package-lock.json-hash

# Docker Layer Caching
FROM node:18
COPY package*.json ./
RUN npm ci  # Cached if package.json unchanged
COPY . .
RUN npm run build`,
    priority: null
  },
  {
    id: 321,
    category: 'CI/CD',
    question: 'How do you manage secrets and credentials in CI/CD?',
    answer: 'Never hardcode secrets in code or pipeline configs. Use secret management tools: GitHub Secrets, GitLab Variables, HashiCorp Vault, AWS Secrets Manager, Azure Key Vault. Encrypt secrets at rest and in transit. Rotate regularly. Limit access with least privilege.',
    explanation: '**Secret Management Best Practices:**\n\n• **Storage:** Use dedicated secret managers, not environment variables in code\n• **Access:** Principle of least privilege, role-based access\n• **Rotation:** Automatic rotation policies\n• **Audit:** Log all secret access\n• **Encryption:** At rest and in transit\n• **Scanning:** Detect hardcoded secrets with tools like git-secrets, trufflehog\n\n**Never Do:** Commit .env files, print secrets in logs, use default credentials.',
    codeExample: `# Secret Management Examples

# GitHub Actions - Using Secrets
env:
  AWS_ACCESS_KEY_ID: (stored in GitHub Secrets)
  AWS_SECRET_ACCESS_KEY: (stored in GitHub Secrets)

# HashiCorp Vault Integration
vault read secret/data/myapp/prod

# Best Practice: Short-lived credentials
# Use IAM roles, OIDC tokens instead of long-lived keys`,
    priority: null
  },
  {
    id: 322,
    category: 'CI/CD',
    question: 'What are deployment strategies and when to use each?',
    answer: 'Common strategies: Rolling Update (gradual replacement), Blue-Green (two identical environments), Canary (gradual traffic shift), Recreate (stop old, start new), Shadow (mirror traffic). Choose based on risk tolerance, infrastructure cost, and complexity.',
    explanation: '**Strategy Comparison:**\n\n• **Rolling:** Low cost, gradual, some overlap. Good for most cases.\n• **Blue-Green:** Zero downtime, instant rollback, 2x cost. Critical apps.\n• **Canary:** Real user testing, gradual risk. High-traffic apps.\n• **Recreate:** Simple, downtime involved. Dev/test environments.\n• **Shadow:** Zero risk, complex setup. Testing major changes.\n\nConsider: Downtime tolerance, budget, complexity, rollback speed, testing requirements.',
    codeExample: `# Kubernetes Rolling Update
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0

# Istio Canary
http:
  - route:
    - destination:
        host: myapp
        subset: v1
      weight: 90
    - destination:
        host: myapp
        subset: v2
      weight: 10`,
    priority: null
  },
  {
    id: 323,
    category: 'CI/CD',
    question: 'How do you implement automated rollback in CI/CD?',
    answer: 'Automated rollback reverts to previous version when deployment fails or metrics degrade. Implement using health checks, metric thresholds (error rate, latency), canary analysis, and deployment hooks. Critical for maintaining availability.',
    explanation: '**Rollback Triggers:**\n\n• Health check failures\n• Error rate spikes (>5%)\n• Latency increase (>50%)\n• CPU/memory anomalies\n• Business metric drops\n• Failed smoke tests\n\n**Implementation:** Keep previous version available, use deployment labels/tags, automate rollback commands, test rollback procedures regularly, document rollback runbooks.',
    codeExample: `# Kubernetes Automated Rollback
kubectl rollout status deployment/myapp --timeout=300s
if [ $? -ne 0 ]; then
  echo "Deployment failed, rolling back..."
  kubectl rollout undo deployment/myapp
fi

# Argo Rollouts - Canary Analysis
analysis:
  successfulRunHistoryLimit: 3
  unsuccessfulRunHistoryLimit: 3
  metrics:
    - name: error-rate
      successCondition: result[0] <= 0.05`,
    priority: null
  },
  {
    id: 324,
    category: 'CI/CD',
    question: 'What is shift-left testing in CI/CD?',
    answer: 'Shift-left testing moves testing earlier in the development lifecycle. Instead of testing only at the end, integrate testing throughout: unit tests during coding, integration tests in CI, security scans pre-commit, performance tests in staging. Catches bugs earlier, reduces costs.',
    explanation: '**Testing Pyramid:**\n\n• **Base (70%):** Unit tests - fast, isolated, cheap\n• **Middle (20%):** Integration tests - component interaction\n• **Top (10%):** E2E tests - full user journeys, slow, expensive\n\n**Shift-Left Practices:** Pre-commit hooks, IDE linting, local test runners, contract testing, security scanning in PRs, performance baselines. Goal: Fail fast, fail early.',
    codeExample: `# Pre-commit Hook Example
#!/bin/bash
# Run before commit
npm run lint
npm test -- --changedSince=HEAD
npm run security-scan

# If any fail, commit is rejected
# Catches issues before they reach CI`,
    priority: null
  },
  {
    id: 325,
    category: 'CI/CD',
    question: 'What are CI/CD anti-patterns to avoid?',
    answer: 'Common anti-patterns: Manual steps in pipeline, flaky tests, long-running pipelines (>30 min), hardcoded credentials, no rollback strategy, deploying on Fridays, skipping tests to save time, monolithic pipelines, no monitoring, treating staging differently than production.',
    explanation: '**Anti-Patterns & Solutions:**\n\n• **Manual Steps** → Automate everything\n• **Flaky Tests** → Fix or remove unreliable tests\n• **Slow Pipelines** → Parallelize, cache, optimize\n• **Hardcoded Secrets** → Use secret managers\n• **No Rollback** → Implement automated rollback\n• **Friday Deploys** → Deploy anytime with confidence\n• **Skip Tests** → Never compromise quality\n• **Monolithic Pipeline** → Split into smaller pipelines\n• **No Monitoring** → Track pipeline metrics\n• **Env Drift** → Use IaC for all environments',
    codeExample: `# Bad: Manual approval for every deployment
# Good: Automated with feature flags

# Bad: Pipeline takes 1 hour
# Good: Optimized to <10 minutes

# Bad: Different configs per environment
# Good: Same config, different values via IaC`,
    priority: null
  },
  {
    id: 326,
    category: 'CI/CD',
    question: 'How do you monitor CI/CD pipeline health?',
    answer: 'Track DORA metrics (deployment frequency, lead time, change failure rate, MTTR), pipeline success rate, build duration, test coverage, deployment success rate, mean time to detect failures. Use dashboards and alerts for pipeline health.',
    explanation: '**Key Metrics to Track:**\n\n• **Pipeline Success Rate:** % of successful runs\n• **Build Duration:** Average time per stage\n• **Deployment Frequency:** How often you deploy\n• **Lead Time:** Commit to production time\n• **Change Failure Rate:** % causing incidents\n• **MTTR:** Time to recover from failures\n• **Test Coverage:** Code coverage trends\n• **Flaky Test Rate:** Unstable tests count\n\n**Tools:** Grafana dashboards, Prometheus metrics, CI tool analytics, custom dashboards.',
    codeExample: `# DORA Metrics Dashboard

# Deployment Frequency
COUNT(deployments) per day

# Lead Time
AVG(time from commit to production)

# Change Failure Rate
SUM(failed_deployments) / SUM(total_deployments)

# MTTR
AVG(time from failure to recovery)

# Alert if pipeline success rate < 95%`,
    priority: null
  },
  {
    id: 327,
    category: 'CI/CD',
    question: 'What is trunk-based development and how does it impact CI/CD?',
    answer: 'Trunk-based development uses short-lived branches (<2 days) merged frequently to main branch, with feature flags controlling visibility. Enables continuous integration, reduces merge conflicts, accelerates delivery. Requires strong automated testing and mature CI/CD.',
    explanation: '**Benefits for CI/CD:**\n\n• Always releasable main branch\n• Faster feedback loops\n• Reduced integration hell\n• Smaller, safer changes\n• True continuous delivery\n\n**Requirements:** Excellent test coverage, feature flag infrastructure, disciplined commits, automated quality gates, team buy-in. Used by Google, Facebook, Amazon for high velocity.',
    codeExample: `# Trunk-Based Workflow

# 1. Pull latest main
git pull origin main

# 2. Create tiny branch (<2 days)
git checkout -b feature/tiny-change

# 3. Make small commit
git commit -m "Add validation"

# 4. Push and create PR
git push origin feature/tiny-change

# 5. Merge same day with feature flag
if (featureFlags.isEnabled('new-feature')) {
  // new code
} else {
  // old code
}`,
    priority: null
  },
  {
    id: 328,
    category: 'CI/CD',
    question: 'How do you handle configuration management across environments in CI/CD?',
    answer: 'Use environment-specific configuration separated from code. Store configs in ConfigMaps (K8s), environment variables, or config files. Use tools like Helm values, Kustomize overlays, or Terraform workspaces. Never commit secrets. Validate configs in pipeline.',
    explanation: '**Configuration Strategies:**\n\n• **12-Factor App:** Config in environment variables\n• **Helm Values:** Parameterized templates per environment\n• **Kustomize:** Overlays for dev/staging/prod\n• **Terraform Workspaces:** Separate state per env\n• **Config Servers:** Spring Cloud Config, Consul\n\n**Best Practices:** Same artifact across environments, validate configs early, use schemas, document required vars, fallback defaults, encrypt sensitive configs.',
    codeExample: `# Helm Values Structure
values.yaml          # Defaults
values-dev.yaml      # Dev overrides
values-staging.yaml  # Staging overrides
values-prod.yaml     # Production overrides

# Install with environment-specific values
helm install myapp -f values-prod.yaml

# Kubernetes ConfigMap
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  DATABASE_URL: postgres://db:5432/myapp`,
    priority: null
  },
  {
    id: 329,
    category: 'CI/CD',
    question: 'What is progressive delivery and how does it differ from traditional deployment?',
    answer: 'Progressive delivery gradually exposes new versions to users with automated verification and rollback. Includes canary releases, A/B testing, feature flags. Traditional deployment is all-or-nothing. Progressive delivery reduces risk, enables data-driven decisions.',
    explanation: '**Progressive Delivery Techniques:**\n\n• **Canary Releases:** Gradual traffic shift with monitoring\n• **A/B Testing:** Compare versions with real users\n• **Feature Flags:** Toggle features per user segment\n• **Blue-Green:** Instant switch with rollback option\n\n**Benefits:** Lower risk, faster detection of issues, data-driven decisions, user segmentation, controlled blast radius. **Tools:** Argo Rollouts, Istio, LaunchDarkly, Split.io.',
    codeExample: `# Progressive Delivery Flow

# 1. Deploy to 1% of users
canary.weight: 1%

# 2. Monitor metrics for 5 minutes
# - Error rate < 1%
# - Latency p95 < 200ms

# 3. If healthy, increase to 10%
canary.weight: 10%

# 4. Continue: 25% → 50% → 100%

# 5. Auto-rollback if metrics degrade`,
    priority: null
  },
  {
    id: 330,
    category: 'CI/CD',
    question: 'How do you implement security scanning in CI/CD pipelines?',
    answer: 'Integrate security scanning at multiple stages: SAST (static analysis) in build, SCA (dependency scanning) for vulnerabilities, DAST (dynamic analysis) in staging, container scanning for images, secret scanning for credentials. Shift security left.',
    explanation: '**Security Scanning Types:**\n\n• **SAST:** SonarQube, Checkmarx - Code vulnerabilities\n• **SCA:** Snyk, Dependabot - Dependency vulnerabilities\n• **DAST:** OWASP ZAP, Burp Suite - Runtime vulnerabilities\n• **Container:** Trivy, Clair - Image vulnerabilities\n• **Secrets:** git-secrets, trufflehog - Hardcoded credentials\n• **IaC:** tfsec, checkov - Infrastructure misconfigurations\n\n**Best Practice:** Fail pipeline on critical vulnerabilities, generate reports, track trends, prioritize fixes.',
    codeExample: `# Security Scanning Pipeline

stages:
  - sast:
      script: sonar-scanner
  
  - sca:
      script: snyk test --severity-threshold=high
  
  - container-scan:
      script: trivy image myapp:latest
  
  - secret-scan:
      script: git-secrets --scan
  
  - dast:
      script: zap-baseline.py -t https://staging.example.com`,
    priority: null
  },
  {
    id: 331,
    category: 'CI/CD',
    question: 'What are ephemeral environments and their benefits in CI/CD?',
    answer: 'Ephemeral environments are temporary, on-demand environments created for each pull request or feature branch. Automatically provisioned, used for testing, then destroyed. Benefits: isolated testing, faster feedback, reduced environment conflicts, cost optimization.',
    explanation: '**Use Cases:**\n\n• Preview deployments for PRs\n• Integration testing with real dependencies\n• Stakeholder demos\n• QA testing specific features\n• Performance testing isolated changes\n\n**Implementation:** Use Kubernetes namespaces, Docker Compose, or cloud services. Automate provisioning/destruction. Clean up after merge/close. **Tools:** Vercel Preview, Netlify Deploy Previews, Kubernetes + ArgoCD, Okteto.',
    codeExample: `# Ephemeral Environment Workflow

# On PR creation:
1. Trigger pipeline
2. Provision namespace: pr-123
3. Deploy application
4. Generate preview URL: pr-123.example.com
5. Run E2E tests against preview
6. Share URL with stakeholders

# On PR merge/close:
1. Destroy namespace
2. Release resources
3. Clean up DNS records

# Cost: Only pay while PR is open`,
    priority: null
  },
  {
    id: 332,
    category: 'CI/CD',
    question: 'How do you optimize CI/CD pipeline execution time?',
    answer: 'Optimize by: parallelizing jobs, caching dependencies, using incremental builds, splitting large test suites, optimizing Docker builds (multi-stage, layer caching), using faster runners, conditional execution, and removing unnecessary steps. Target <10 minute pipelines.',
    explanation: '**Optimization Techniques:**\n\n• **Parallelization:** Run independent jobs concurrently\n• **Caching:** Dependencies, build outputs, Docker layers\n• **Incremental Builds:** Only rebuild changed components\n• **Test Optimization:** Run affected tests only, parallel test execution\n• **Docker Optimization:** Multi-stage builds, .dockerignore, layer caching\n• **Resource Optimization:** Right-size runners, spot instances\n• **Conditional Execution:** Skip irrelevant stages\n• **Artifact Reuse:** Don\'t rebuild unchanged components',
    codeExample: `# Optimization Examples

# 1. Parallel test execution
pytest -n auto  # Auto-detect CPU cores

# 2. Docker layer caching
COPY package.json .
RUN npm ci  # Cached unless package.json changes
COPY . .

# 3. Conditional execution
if: changes-ignore('docs/**')

# 4. Incremental builds
nx affected:test  # Test only changed apps`,
    priority: null
  },
  {
    id: 333,
    category: 'CI/CD',
    question: 'What is GitOps and how does it enhance CI/CD?',
    answer: 'GitOps uses Git as the single source of truth for infrastructure and applications. Automated operators continuously sync cluster state with Git repository. Enhances CI/CD with audit trails, easy rollbacks (git revert), disaster recovery, and declarative desired state.',
    explanation: '**GitOps Principles:**\n\n• **Declarative:** Desired state in Git\n• **Versioned:** All changes tracked\n• **Automated:** Operators sync automatically\n• **Continuous:** Constant reconciliation loop\n\n**CI/CD Enhancement:** Traditional CI/CD pushes changes (imperative). GitOps pulls changes (declarative). Benefits: No drift, complete history, peer review via PRs, self-healing clusters. **Tools:** ArgoCD, Flux, Jenkins X.',
    codeExample: `# GitOps Workflow

# Traditional CI/CD
Developer → CI → CD → kubectl apply (push)

# GitOps
Developer → PR → Merge → Git → ArgoCD detects → Sync (pull)

# Benefits:
# - Audit trail in Git history
# - Rollback: git revert
# - Disaster recovery: clone repo
# - No manual kubectl commands`,
    priority: null
  },
  {
    id: 334,
    category: 'CI/CD',
    question: 'How do you handle multi-service deployments in CI/CD?',
    answer: 'For microservices, use independent pipelines per service, contract testing for API compatibility, service mesh for traffic management, feature flags for coordinated releases, and deployment orchestration tools. Avoid monolithic deployment pipelines.',
    explanation: '**Multi-Service Strategies:**\n\n• **Independent Pipelines:** Each service has own CI/CD\n• **Contract Testing:** Ensure API compatibility (Pact)\n• **Consumer-Driven Contracts:** Test from consumer perspective\n• **Service Mesh:** Manage inter-service communication\n• **Feature Flags:** Coordinate releases without coupling\n• **Orchestration:** ArgoCD Applications, Spinnaker pipelines\n\n**Challenges:** Version compatibility, distributed tracing, cascading failures, database migrations. **Solution:** Backward compatibility, circuit breakers, expand-contract pattern.',
    codeExample: `# Independent Service Pipelines

# Service A Pipeline
build → test → deploy-a-v1.2.0

# Service B Pipeline  
build → test → deploy-b-v2.0.0

# Contract Testing
pact-verifier --provider-base-url=http://service-a

# Feature Flag for Coordination
if (flags.isEnabled('new-integration')) {
  serviceA.callNewEndpoint()
}`,
    priority: null
  },
  {
    id: 335,
    category: 'CI/CD',
    question: 'What are the key differences between Jenkins, GitHub Actions, and GitLab CI?',
    answer: 'Jenkins: Self-hosted, highly customizable, large plugin ecosystem, complex maintenance. GitHub Actions: Native GitHub integration, marketplace of actions, simple YAML, free tier generous. GitLab CI: Built into GitLab, all-in-one DevOps platform, auto DevOps features, container registry included.',
    explanation: '**Comparison:**\n\n• **Setup:** Jenkins (complex) vs Actions/GitLab (simple)\n• **Cost:** Jenkins (infrastructure) vs Actions (minutes) vs GitLab (included)\n• **Flexibility:** Jenkins (unlimited) vs Actions/GitLab (good for most)\n• **Maintenance:** Jenkins (high) vs Actions/GitLab (managed)\n• **Integration:** Actions (GitHub) vs GitLab CI (GitLab) vs Jenkins (any)\n• **Scalability:** Jenkins (manual) vs Actions/GitLab (auto)\n\n**Choose Jenkins** for complex requirements, on-premise. **Choose Actions** for GitHub projects. **Choose GitLab CI** for all-in-one solution.',
    codeExample: `# Tool Selection Guide

# Jenkins - When you need:
# - Complex workflows
# - On-premise control
# - Custom plugins
# - Legacy system integration

# GitHub Actions - When you need:
# - Simple setup
# - GitHub integration
# - Community actions
# - Pay-per-use pricing

# GitLab CI - When you need:
# - All-in-one platform
# - Built-in container registry
# - Auto DevOps
# - Single vendor solution`,
    priority: null
  },
  {
    id: 336,
    category: 'CI/CD',
    question: 'How do you implement compliance and audit requirements in CI/CD?',
    answer: 'Implement compliance through: mandatory code reviews, approval gates, audit logs, signed commits, immutable artifacts, policy-as-code (OPA), security scanning, separation of duties, and compliance-as-code frameworks. Document everything in pipeline.',
    explanation: '**Compliance Requirements:**\n\n• **Audit Trail:** Log all pipeline actions, who approved what\n• **Approvals:** Mandatory reviews for production\n• **Signed Commits:** GPG signatures verify authorship\n• **Immutable Artifacts:** Once built, never modify\n• **Policy Enforcement:** OPA, Sentinel for guardrails\n• **Segregation:** Different teams for dev vs deploy\n• **Retention:** Keep logs/artifacts per regulations\n\n**Frameworks:** SOC 2, HIPAA, PCI-DSS, GDPR. Automate compliance checks.',
    codeExample: `# Compliance Pipeline

stages:
  - code-review:
      rules:
        - if: $CI_COMMIT_BRANCH == "main"
          when: manual  # Require approval
  
  - security-scan:
      script: 
        - sonar-scanner
        - snyk test --fail-on=all
  
  - compliance-check:
      script: opa eval --data policy.rego
  
  - sign-artifact:
      script: cosign sign myapp:latest
  
  - audit-log:
      script: log-deployment deployment-info`,
    priority: null
  },
  {
    id: 337,
    category: 'CI/CD',
    question: 'What is chaos engineering in CI/CD and why is it important?',
    answer: 'Chaos engineering intentionally injects failures in CI/CD pipelines to test resilience: kill pods, add latency, fill disks, corrupt networks. Validates that systems handle failures gracefully. Important for building confidence in reliability and identifying weaknesses before production incidents.',
    explanation: '**Chaos Experiments in CI/CD:**\n\n• **Pod Kill:** Test auto-restart and rescheduling\n• **Network Latency:** Verify timeout handling\n• **Disk Fill:** Test disk pressure responses\n• **CPU Stress:** Validate resource limits\n• **Dependency Failure:** Test circuit breakers\n\n**Integration:** Run chaos experiments in staging pipeline before production deployment. **Tools:** Chaos Mesh, LitmusChaos, Gremlin. Start small, measure impact, learn and improve.',
    codeExample: `# Chaos Experiment in Pipeline

stages:
  - deploy-staging
  - chaos-test:
      script: |
        # Kill random pods
        chaos-mesh pod-kill --namespace staging
        
        # Add network delay
        chaos-mesh network-delay --latency 100ms
        
        # Wait and verify recovery
        sleep 60
        verify-health-endpoint
  
  - proceed-to-prod:
      only: if chaos-test passes`,
    priority: null
  },
  {
    id: 338,
    category: 'CI/CD',
    question: 'How do you handle long-running tests in CI/CD pipelines?',
    answer: 'Strategies: split test suites (fast unit tests in CI, slow E2E in separate pipeline), parallel execution, test selection (run only affected tests), quarantine flaky tests, use test containers for isolation, implement test impact analysis, and run comprehensive suites nightly.',
    explanation: '**Test Optimization Strategies:**\n\n• **Pyramid Approach:** 70% unit (fast), 20% integration, 10% E2E (slow)\n• **Parallel Execution:** Distribute tests across runners\n• **Test Impact Analysis:** Run only tests affected by changes\n• **Quarantine:** Move flaky tests to separate suite\n• **Test Containers:** Isolated, reproducible environments\n• **Nightly Runs:** Full suite overnight, quick feedback during day\n• **Sampling:** Run subset of E2E tests on every commit\n\n**Goal:** Keep CI pipeline under 10 minutes.',
    codeExample: `# Test Strategy

# CI Pipeline (Fast - <10 min)
- Unit tests (parallel)
- Integration tests (critical paths only)
- Lint and type check

# Nightly Pipeline (Comprehensive)
- Full E2E test suite
- Performance tests
- Security scans
- Cross-browser tests

# Test Impact Analysis
nx affected:test --base=main~1 --head=HEAD`,
    priority: null
  },
  {
    id: 339,
    category: 'CI/CD',
    question: 'What are the best practices for CI/CD in microservices architecture?',
    answer: 'Best practices: independent pipelines per service, contract testing for APIs, decentralized deployment, service versioning, feature flags for coordination, distributed tracing, centralized logging, circuit breakers, and automated rollback per service. Avoid synchronized deployments.',
    explanation: '**Microservices CI/CD Principles:**\n\n• **Independence:** Each service deploys independently\n• **Contract Testing:** Ensure API compatibility (Pact)\n• **Decentralized:** Teams own their pipelines\n• **Versioning:** Semantic versioning for APIs\n• **Observability:** Tracing, logging, metrics per service\n• **Resilience:** Circuit breakers, retries, timeouts\n• **Coordination:** Feature flags, not synchronized deploys\n• **Database:** Per-service databases, expand-contract migrations\n\n**Avoid:** Monorepo with single pipeline, shared databases, synchronized releases.',
    codeExample: `# Microservices Pipeline Pattern

# Each service has independent pipeline
service-a/
  .github/workflows/ci.yml  # Independent
  
service-b/
  .github/workflows/ci.yml  # Independent

# Contract Testing
pact-broker publish pacts/
pact-broker verify

# Feature Flag for Coordination
if (flags.isEnabled('new-api')) {
  callServiceBNewEndpoint()
} else {
  callServiceBOldEndpoint()
}`,
    priority: null
  },
  {
    id: 340,
    category: 'CI/CD',
    question: 'How do you implement zero-downtime deployments in CI/CD?',
    answer: 'Zero-downtime deployments ensure continuous availability during updates. Strategies: blue-green (switch traffic instantly), rolling updates (gradual replacement with health checks), canary (gradual traffic shift), and load balancer manipulation. Requires backward-compatible changes and proper health checks.',
    explanation: '**Zero-Downtime Techniques:**\n\n• **Health Checks:** Readiness probes before receiving traffic\n• **Graceful Shutdown:** Finish requests before stopping\n• **Connection Draining:** Wait for active connections\n• **Backward Compatibility:** Old and new versions work together\n• **Load Balancer:** Route traffic intelligently\n• **Database:** Expand-contract pattern for schema changes\n\n**Verification:** Monitor error rates, latency, throughput during deployment. Auto-rollback if degradation detected.',
    codeExample: `# Kubernetes Zero-Downtime Deployment

spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1       # One extra pod
      maxUnavailable: 0 # Zero unavailable
  template:
    spec:
      containers:
      - name: app
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
        lifecycle:
          preStop:
            exec:
              command: ["sleep", "30"]  # Graceful shutdown`,
    priority: null
  },
  // Git Questions
  {
    id: 216,
    category: 'Git',
    question: 'Explain common Git branching strategies.',
    answer: 'Common strategies include Git Flow (feature, develop, release, hotfix branches for traditional releases), GitHub Flow (simple feature branches merged to main for continuous deployment), Trunk-Based Development (short-lived branches with feature flags), and GitLab Flow (environment-based branches).',
    explanation: '**Git Flow:** Best for versioned software with scheduled releases. **GitHub Flow:** Ideal for web apps with continuous deployment. **Trunk-Based:** For high-performing teams with mature CI/CD. **GitLab Flow:** Good for multiple deployment environments.',
    codeExample: `# Branching Strategies Overview

# Git Flow: main, develop, feature/*, release/*, hotfix/*
# GitHub Flow: main + feature branches only
# Trunk-Based: Everyone commits to main directly
# GitLab Flow: main + environment branches

# Choose based on:
# - Team size
# - Release frequency  
# - Deployment model
# - Project complexity`,
    priority: null
  },
  {
    id: 217,
    category: 'Git',
    question: 'What are advanced Git techniques developers should know?',
    answer: 'Advanced techniques include interactive rebase for clean history, cherry-pick for selective commits, git bisect for finding bugs, reflog for recovery, worktrees for multiple working directories, submodules for dependencies, and hooks for automation.',
    explanation: 'Interactive rebase helps rewrite commit history. Cherry-pick applies specific commits. Git bisect uses binary search to find bug-introducing commits. Reflog recovers lost work. Worktrees allow working on multiple branches simultaneously.',
    codeExample: `# Useful Advanced Commands

# Interactive rebase - Clean up commits
git rebase -i HEAD~5

# Cherry-pick - Apply specific commit
git cherry-pick <commit-hash>

# Find bug with binary search
git bisect start
git bisect bad
git bisect good v1.0

# Recover lost commits
git reflog
git reset --hard HEAD@{number}

# Multiple working directories
git worktree add ../hotfix hotfix-branch`,
    priority: null
  },
  {
    id: 218,
    category: 'Git',
    question: 'How do you resolve merge conflicts effectively?',
    answer: 'Understand conflict markers (<<<<<<, ======, >>>>>>), communicate with teammates, use merge tools like VS Code or Meld, test after resolution, and follow prevention practices like frequent pulls, small commits, and clear communication.',
    explanation: 'Conflicts occur when same code is modified differently. Resolve by choosing yours, theirs, combining both, or writing new code. Prevention is key: pull frequently, commit often, communicate changes, and use rebase to keep history clean.',
    codeExample: `# Conflict Resolution Steps

# 1. Identify conflicted files
git status

# 2. Open file and find markers:
# <<<<<< HEAD (your changes)
# =======
# >>>>>> branch (their changes)

# 3. Edit file to resolve
# 4. Mark as resolved
git add filename.js

# 5. Complete merge
git commit

# Prevention: Pull often, small commits, communicate`,
    priority: null
  },
  {
    id: 219,
    category: 'Git',
    question: 'Explain how Git stores data internally.',
    answer: 'Git uses a content-addressable filesystem with four object types: blobs (file content), trees (directory structure), commits (snapshots with metadata), and tags (references). Objects are stored as compressed files identified by SHA-1 hashes, enabling deduplication and efficient storage.',
    explanation: 'Every file becomes a blob. Directories become trees pointing to blobs and other trees. Commits point to root trees and contain metadata. All objects are hashed and stored in .git/objects. Packfiles compress similar objects using deltas for efficiency.',
    codeExample: `# Git Object Types

# Blob - File content (no filename)
git hash-object filename.txt

# Tree - Directory structure  
git ls-tree HEAD

# Commit - Snapshot with metadata
git cat-file -p <commit-hash>

# Tag - Named reference
git tag v1.0

# View objects
ls .git/objects/
git count-objects -v`,
    priority: null
  },
  {
    id: 220,
    category: 'Git',
    question: 'What are Git hooks and how do they improve workflow?',
    answer: 'Git hooks are scripts that run automatically at specific workflow points. Client-side hooks (pre-commit, commit-msg, pre-push) enforce code quality locally. Server-side hooks (pre-receive, post-receive) control repository access and trigger deployments. Use them for linting, testing, and automation.',
    explanation: 'Pre-commit hooks validate code before committing. Commit-msg hooks enforce message conventions. Pre-push hooks run tests before pushing. Post-receive hooks deploy code after pushes. Tools like Husky make hook management easier in Node.js projects.',
    codeExample: `# Common Git Hooks

# Pre-commit - Run before commit
# Use for: Linting, formatting, tests

# Commit-msg - Validate message
# Use for: Enforce conventions

# Pre-push - Run before push  
# Use for: Full test suite

# Post-receive - Run after push (server)
# Use for: Deploy, notify

# Easy setup with Husky (Node.js)
npm install husky --save-dev
npx husky init`,
    priority: null
  },

  {
    id: 221,
    category: 'Microservices',
    question: 'What are microservices and how do they differ from monolithic architecture?',
    answer: 'Microservices is an architectural style structuring applications as small, independent services. Each runs in its own process, communicates via lightweight protocols, and deploys independently. Unlike monoliths with tightly coupled components in a single codebase.',
    explanation: '**Monolithic:** Single codebase, tight coupling, shared database, scale entire app. **Microservices:** Independent services, loose coupling, database per service, scale individually. Microservices offer flexibility and scalability but add complexity.',
    codeExample: `# Microservices Example Code
# See detailed implementation in documentation`,
    priority: null
  },
  {
    id: 222,
    category: 'Microservices',
    question: 'Explain service discovery in microservices.',
    answer: 'Service discovery allows microservices to locate and communicate with each other through a registry. Patterns include client-side (client queries registry) and server-side (load balancer queries). Tools: Consul, Eureka, Kubernetes DNS.',
    explanation: '**Client-Side:** Direct communication, flexible load balancing. **Server-Side:** Simple clients, centralized. Registry stores service locations with health checks for automatic failover.',
    codeExample: `# Microservices Example Code
# See detailed implementation in documentation`,
    priority: null
  },
  {
    id: 223,
    category: 'Microservices',
    question: 'How do you handle data consistency in microservices?',
    answer: 'Use eventual consistency with Saga pattern (choreography/orchestration), CQRS, Event Sourcing, and outbox pattern. Avoid distributed transactions; use compensating transactions for rollback instead.',
    explanation: '**Saga:** Sequence of local transactions with compensating actions. **CQRS:** Separate read/write models. **Outbox:** Atomic writes to DB and event log. Design for eventual consistency.',
    codeExample: `# Microservices Example Code
# See detailed implementation in documentation`,
    priority: null
  },
  {
    id: 224,
    category: 'Microservices',
    question: 'What are common microservices design patterns?',
    answer: 'API Gateway (single entry point), Circuit Breaker (fault tolerance), Service Mesh (infrastructure layer), CQRS, Event Sourcing, Strangler Fig (migration), Backend for Frontend (BFF).',
    explanation: '**API Gateway:** Routing, auth, rate limiting. **Circuit Breaker:** Prevent cascading failures. **Service Mesh:** Istio/Linkerd for mTLS, observability. Combine patterns based on needs.',
    codeExample: `# Microservices Example Code
# See detailed implementation in documentation`,
    priority: null
  },
  {
    id: 225,
    category: 'Microservices',
    question: 'How do you implement monitoring in microservices?',
    answer: 'Three pillars: Logging (ELK/Loki), Metrics (Prometheus/Grafana), Distributed Tracing (Jaeger/Zipkin). Use correlation IDs, health checks, RED method (Rate, Errors, Duration), and golden signals.',
    explanation: '**Logging:** Structured JSON logs with correlation IDs. **Metrics:** Application and infrastructure metrics. **Tracing:** Track requests across services. Monitor SLIs/SLOs.',
    codeExample: `# Microservices Example Code
# See detailed implementation in documentation`,
    priority: null
  },
  {
    id: 226,
    category: 'Docker',
    question: 'What is Docker and how does it differ from VMs?',
    answer: 'Docker is a containerization platform packaging apps into lightweight, portable containers. Unlike VMs that virtualize entire OS, containers share host kernel, making them faster and more efficient.',
    explanation: '**VMs:** Full OS, heavy (GBs), slow startup. **Containers:** OS-level, light (MBs), fast startup. Docker provides portability, consistency, and efficiency.',
    codeExample: `# Docker Example
# FROM node:18-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci --production
# COPY . .
# CMD ["node", "index.js"]`,
    priority: null
  },
  {
    id: 227,
    category: 'Docker',
    question: 'Explain Docker layers and image optimization.',
    answer: 'Docker images use layered filesystem. Each instruction creates a layer. Optimize by: minimizing layers, using .dockerignore, multi-stage builds, alpine images, and ordering instructions for cache efficiency.',
    explanation: '**Layers:** Union filesystem, cached for rebuilds. **Optimization:** Multi-stage builds reduce size. Order: least changing first. Use .dockerignore to exclude unnecessary files.',
    codeExample: `# Docker Example
# FROM node:18-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci --production
# COPY . .
# CMD ["node", "index.js"]`,
    priority: null
  },
  {
    id: 228,
    category: 'Docker',
    question: 'What are Docker volumes and networking?',
    answer: 'Volumes provide persistent storage outside containers. Networking enables container communication via bridge, host, overlay, or macvlan drivers. Volumes survive container deletion.',
    explanation: '**Volumes:** Named or anonymous, persist data. **Networks:** Bridge (default), host (no isolation), overlay (multi-host). Use volumes for databases, configs, logs.',
    codeExample: `# Docker Example
# FROM node:18-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci --production
# COPY . .
# CMD ["node", "index.js"]`,
    priority: null
  },
  {
    id: 229,
    category: 'Docker',
    question: 'Explain Docker Compose and when to use it.',
    answer: 'Docker Compose defines and runs multi-container applications using YAML. Perfect for development, testing, and simple deployments. Manages service dependencies, networks, and volumes.',
    explanation: '**Use Cases:** Local development, integration testing, simple production. Define services, networks, volumes in docker-compose.yml. Run with: docker-compose up',
    codeExample: `# Docker Example
# FROM node:18-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci --production
# COPY . .
# CMD ["node", "index.js"]`,
    priority: null
  },
  {
    id: 230,
    category: 'Docker',
    question: 'What are Docker best practices?',
    answer: 'Use specific tags (not latest), multi-stage builds, .dockerignore, non-root users, health checks, proper logging, image scanning, and keep images small. One process per container.',
    explanation: '**Security:** Scan images, non-root user. **Performance:** Multi-stage builds, alpine base. **Reliability:** Health checks, restart policies. Tag versions properly.',
    codeExample: `# Docker Example
# FROM node:18-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci --production
# COPY . .
# CMD ["node", "index.js"]`,
    priority: null
  },
  {
    id: 231,
    category: 'Kubernetes',
    question: 'What is Kubernetes and its core components?',
    answer: 'Kubernetes (K8s) is a container orchestration platform automating deployment, scaling, and management. Core components: API Server, etcd, Scheduler, Controller Manager, Kubelet, Kube-proxy.',
    explanation: '**Master Node:** API Server, etcd (storage), Scheduler, Controller Manager. **Worker Nodes:** Kubelet (agent), Kube-proxy (networking), Container Runtime. Manages pods, services, deployments.',
    codeExample: `# Kubernetes Example
# apiVersion: apps/v1
# kind: Deployment
# metadata:
#   name: my-app
# spec:
#   replicas: 3
#   selector:
#     matchLabels:
#       app: my-app`,
    priority: null
  },
  {
    id: 232,
    category: 'Kubernetes',
    question: 'Explain Pods, Deployments, and Services.',
    answer: 'Pods are smallest deployable units (one or more containers). Deployments manage pod replicas and updates. Services provide stable network endpoints for accessing pods.',
    explanation: '**Pod:** Ephemeral, scheduled to nodes. **Deployment:** Declarative updates, rollbacks, scaling. **Service:** ClusterIP (internal), NodePort, LoadBalancer (external access).',
    codeExample: `# Kubernetes Example
# apiVersion: apps/v1
# kind: Deployment
# metadata:
#   name: my-app
# spec:
#   replicas: 3
#   selector:
#     matchLabels:
#       app: my-app`,
    priority: null
  },
  {
    id: 233,
    category: 'Kubernetes',
    question: 'What are ConfigMaps and Secrets in Kubernetes?',
    answer: 'ConfigMaps store non-sensitive configuration data. Secrets store sensitive data (passwords, tokens) encoded in base64. Both decouple configuration from container images.',
    explanation: '**ConfigMap:** Environment variables, config files. **Secret:** Opaque, TLS certs, Docker registry creds. Mount as volumes or env vars. Never commit secrets to version control.',
    codeExample: `# Kubernetes Example
# apiVersion: apps/v1
# kind: Deployment
# metadata:
#   name: my-app
# spec:
#   replicas: 3
#   selector:
#     matchLabels:
#       app: my-app`,
    priority: null
  },
  {
    id: 234,
    category: 'Kubernetes',
    question: 'Explain Kubernetes namespaces and resource quotas.',
    answer: 'Namespaces provide virtual clusters within a physical cluster for isolation. Resource quotas limit CPU, memory, storage per namespace. Useful for multi-tenant environments.',
    explanation: '**Default namespaces:** default, kube-system, kube-public. **Quotas:** Prevent resource hogging. **RBAC:** Role-based access control per namespace. Organize by team, environment, or project.',
    codeExample: `# Kubernetes Example
# apiVersion: apps/v1
# kind: Deployment
# metadata:
#   name: my-app
# spec:
#   replicas: 3
#   selector:
#     matchLabels:
#       app: my-app`,
    priority: null
  },
  {
    id: 235,
    category: 'Kubernetes',
    question: 'What are Kubernetes best practices?',
    answer: 'Use labels/annotations, resource limits/requests, health probes (liveness/readiness), horizontal pod autoscaling, rolling updates, network policies, and proper logging/monitoring.',
    explanation: '**Security:** RBAC, network policies, secrets management. **Reliability:** Probes, replicas, PDBs. **Performance:** Resource limits, HPA. Always set requests and limits.',
    codeExample: `# Kubernetes Example
# apiVersion: apps/v1
# kind: Deployment
# metadata:
#   name: my-app
# spec:
#   replicas: 3
#   selector:
#     matchLabels:
#       app: my-app`,
    priority: null
  },
  {
    id: 236,
    category: 'GraphQL',
    question: 'What is GraphQL and how does it differ from REST?',
    answer: 'GraphQL is a query language for APIs allowing clients to request exact data needed. Unlike REST with multiple endpoints, GraphQL has a single endpoint with flexible queries, reducing over/under-fetching.',
    explanation: '**REST:** Multiple endpoints, fixed responses, versioning challenges. **GraphQL:** Single endpoint, client-specified responses, strong typing, introspection. Better for complex, nested data.',
    codeExample: `# GraphQL Example
# type Query {
#   user(id: ID!): User
# }
# type User {
#   id: ID!
#   name: String!
#   email: String!
# }`,
    priority: null
  },
  {
    id: 237,
    category: 'GraphQL',
    question: 'Explain GraphQL schema, types, and resolvers.',
    answer: 'Schema defines API structure using SDL (Schema Definition Language). Types define data shapes. Resolvers are functions fetching data for each field. Schema acts as contract between client and server.',
    explanation: '**Types:** Object, Scalar, Enum, Input, Interface, Union. **Resolvers:** Map to database/API calls. **Directives:** Modify execution (@deprecated, @auth). Schema-first or code-first approaches.',
    codeExample: `# GraphQL Example
# type Query {
#   user(id: ID!): User
# }
# type User {
#   id: ID!
#   name: String!
#   email: String!
# }`,
    priority: null
  },
  {
    id: 238,
    category: 'GraphQL',
    question: 'What are GraphQL fragments and when to use them?',
    answer: 'Fragments are reusable selections of fields for objects. They reduce duplication in queries, improve maintainability, and enable component-based query construction in frontend apps.',
    explanation: '**Usage:** Define once, reuse everywhere. Great for shared UI components. Inline fragments for unions/interfaces. Colocate with components. Improves query readability.',
    codeExample: `# GraphQL Example
# type Query {
#   user(id: ID!): User
# }
# type User {
#   id: ID!
#   name: String!
#   email: String!
# }`,
    priority: null
  },
  {
    id: 239,
    category: 'GraphQL',
    question: 'How do you handle authentication in GraphQL?',
    answer: 'Authenticate via HTTP headers (JWT tokens), context object passed to resolvers, or custom directives. Authorization happens in resolvers checking user roles/permissions. Use middleware for global auth.',
    explanation: '**Methods:** JWT in Authorization header, session cookies, OAuth. **Context:** Add user info to resolver context. **Directives:** @auth on fields. Validate tokens before query execution.',
    codeExample: `# GraphQL Example
# type Query {
#   user(id: ID!): User
# }
# type User {
#   id: ID!
#   name: String!
#   email: String!
# }`,
    priority: null
  },
  {
    id: 240,
    category: 'GraphQL',
    question: 'What is the N+1 problem in GraphQL and solutions?',
    answer: 'N+1 occurs when fetching related data causes multiple queries (1 parent + N children). Solve with DataLoader for batching/caching, eager loading, or JOIN operations. DataLoader groups requests efficiently.',
    explanation: '**DataLoader:** Batches multiple ID lookups into single query, caches per-request. **Eager Loading:** Fetch all related data upfront. **Batch Resolvers:** Collect IDs, single query. Critical for performance.',
    codeExample: `# GraphQL Example
# type Query {
#   user(id: ID!): User
# }
# type User {
#   id: ID!
#   name: String!
#   email: String!
# }`,
    priority: null
  },
  {
    id: 241,
    category: 'MongoDB',
    question: 'What is MongoDB and how does it differ from SQL databases?',
    answer: 'MongoDB is a NoSQL document database storing JSON-like BSON documents. Unlike relational databases with tables/rows, MongoDB uses collections/documents offering schema flexibility and horizontal scaling.',
    explanation: '**SQL:** Fixed schema, tables, JOINs, ACID, vertical scaling. **MongoDB:** Flexible schema, documents, embedding/references, eventual consistency, horizontal scaling. Better for unstructured data.',
    codeExample: `# MongoDB Example
# db.users.find({ age: { $gte: 25 } })
# db.users.createIndex({ email: 1 }, { unique: true })
# db.orders.aggregate([
#   { $match: { status: "completed" } },
#   { $group: { _id: "$customerId", total: { $sum: "$amount" } } }
# ])`,
    priority: null
  },
  {
    id: 242,
    category: 'MongoDB',
    question: 'Explain MongoDB indexing and query optimization.',
    answer: 'Indexes improve query performance by avoiding collection scans. Types: single field, compound, multikey (arrays), text, geospatial. Use explain() to analyze queries. Create indexes on frequently queried fields.',
    explanation: '**Index Types:** B-tree (default), hashed, text, 2dsphere. **Best Practices:** Index sort fields, use compound indexes wisely, monitor with profiler. Avoid indexing everything.',
    codeExample: `# MongoDB Example
# db.users.find({ age: { $gte: 25 } })
# db.users.createIndex({ email: 1 }, { unique: true })
# db.orders.aggregate([
#   { $match: { status: "completed" } },
#   { $group: { _id: "$customerId", total: { $sum: "$amount" } } }
# ])`,
    priority: null
  },
  {
    id: 243,
    category: 'MongoDB',
    question: 'What is MongoDB aggregation pipeline?',
    answer: 'Aggregation pipeline processes documents through stages ($match, $group, $sort, $project, $lookup) for complex data transformations. More powerful than simple find queries for analytics and reporting.',
    explanation: '**Stages:** Filter, transform, group, join data. **Operators:** $sum, $avg, $push, $addToSet. **Performance:** Use indexes, limit early stages, avoid $unwind on large arrays. Essential for analytics.',
    codeExample: `# MongoDB Example
# db.users.find({ age: { $gte: 25 } })
# db.users.createIndex({ email: 1 }, { unique: true })
# db.orders.aggregate([
#   { $match: { status: "completed" } },
#   { $group: { _id: "$customerId", total: { $sum: "$amount" } } }
# ])`,
    priority: null
  },
  {
    id: 244,
    category: 'MongoDB',
    question: 'Explain MongoDB replica sets and sharding.',
    answer: 'Replica sets provide high availability with primary-secondary replication. Sharding distributes data across multiple servers for horizontal scaling. Together they ensure availability and scalability.',
    explanation: '**Replica Set:** Automatic failover, read scaling, data redundancy. **Sharding:** Shard key selection critical, balancer distributes chunks. Use together for production systems.',
    codeExample: `# MongoDB Example
# db.users.find({ age: { $gte: 25 } })
# db.users.createIndex({ email: 1 }, { unique: true })
# db.orders.aggregate([
#   { $match: { status: "completed" } },
#   { $group: { _id: "$customerId", total: { $sum: "$amount" } } }
# ])`,
    priority: null
  },
  {
    id: 245,
    category: 'PostgreSQL',
    question: 'What is PostgreSQL and its key features?',
    answer: 'PostgreSQL is an advanced open-source relational database known for standards compliance, extensibility, and reliability. Features include ACID compliance, MVCC, advanced indexing, JSON support, and extensive extensions.',
    explanation: '**Strengths:** Standards-compliant SQL, rich data types, powerful indexing (B-tree, GIN, GiST), full-text search, geospatial (PostGIS), JSON/JSONB. Excellent for complex queries and data integrity.',
    codeExample: `# PostgreSQL Example
# CREATE INDEX idx_users_email ON users(email);
# EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';
# CREATE EXTENSION IF NOT EXISTS postgis;
# SELECT name, ST_Distance(coordinates, point) FROM locations;`,
    priority: null
  },
  {
    id: 246,
    category: 'PostgreSQL',
    question: 'Explain PostgreSQL indexing strategies.',
    answer: 'PostgreSQL supports multiple index types: B-tree (default, equality/range), GIN (arrays, JSONB, full-text), GiST (geometric, full-text), BRIN (large tables), Hash (equality only). Choose based on query patterns.',
    explanation: '**B-tree:** Most common, good for most cases. **GIN:** Composite values, containment queries. **GiST:** Geometric data, nearest-neighbor. **Partial indexes:** Index subset of rows. Monitor with pg_stat_user_indexes.',
    codeExample: `# PostgreSQL Example
# CREATE INDEX idx_users_email ON users(email);
# EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';
# CREATE EXTENSION IF NOT EXISTS postgis;
# SELECT name, ST_Distance(coordinates, point) FROM locations;`,
    priority: null
  },
  {
    id: 247,
    category: 'PostgreSQL',
    question: 'What are PostgreSQL extensions and when to use them?',
    answer: 'Extensions add functionality: PostGIS (geospatial), pgcrypto (encryption), hstore (key-value), uuid-ossp (UUIDs), pg_trgm (trigram search). Install with CREATE EXTENSION. Extend database capabilities without custom code.',
    explanation: '**Popular:** PostGIS for maps, pgcrypto for security, citext for case-insensitive text, timescaledb for time-series. One-time setup per database. Keep updated, test upgrades carefully.',
    codeExample: `# PostgreSQL Example
# CREATE INDEX idx_users_email ON users(email);
# EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';
# CREATE EXTENSION IF NOT EXISTS postgis;
# SELECT name, ST_Distance(coordinates, point) FROM locations;`,
    priority: null
  },
  {
    id: 248,
    category: 'PostgreSQL',
    question: 'How do you optimize PostgreSQL query performance?',
    answer: 'Use EXPLAIN ANALYZE to understand query plans, create appropriate indexes, update statistics with ANALYZE, optimize joins, use connection pooling (PgBouncer), partition large tables, and tune configuration parameters.',
    explanation: '**Tools:** EXPLAIN ANALYZE, pg_stat_statements, auto_explain. **Techniques:** Proper indexing, query rewriting, materialized views, caching. **Config:** work_mem, shared_buffers, effective_cache_size. Regular maintenance with VACUUM.',
    codeExample: `# PostgreSQL Example
# CREATE INDEX idx_users_email ON users(email);
# EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';
# CREATE EXTENSION IF NOT EXISTS postgis;
# SELECT name, ST_Distance(coordinates, point) FROM locations;`,
    priority: null
  },
  // DevOps Questions
  {
    id: 284,
    category: 'DevOps',
    question: 'What is DevOps and why is it important?',
    answer: 'DevOps is a cultural and professional movement that combines development (Dev) and operations (Ops) to improve collaboration, automate processes, and deliver software faster and more reliably.',
    explanation: 'Traditional silos between developers and operations teams led to slow releases and blame games. DevOps breaks these barriers through Culture (shared responsibility), Automation (CI/CD pipelines, IaC), Measurement (monitoring, metrics), and Sharing (knowledge transfer). Benefits include faster time-to-market, improved deployment frequency, lower failure rates, and quicker recovery times.',
    codeExample: `# DevOps Practices
# 1. Infrastructure as Code (Terraform)
# 2. CI/CD Pipelines (Jenkins/GitHub Actions)
# 3. Automated Testing
# 4. Monitoring & Observability
# 5. Container Orchestration (Kubernetes)`,
    priority: null
  },
  {
    id: 285,
    category: 'DevOps',
    question: 'Explain the CALMS framework in DevOps.',
    answer: 'CALMS stands for Culture, Automation, Lean, Measurement, and Sharing - the five pillars of DevOps transformation.',
    explanation: '**Culture:** Break down silos, foster collaboration, embrace failure as learning. **Automation:** Automate repetitive tasks (builds, tests, deployments). **Lean:** Eliminate waste, optimize flow, reduce batch sizes. **Measurement:** Track DORA metrics (deployment frequency, lead time, change failure rate, MTTR). **Sharing:** Share knowledge, tools, practices across teams.',
    codeExample: `# CALMS Implementation
# Culture: Pair programming, blameless postmortems
# Automation: Jenkins pipelines, Terraform
# Lean: Reduce sprint cycles, continuous improvement
# Measurement: DORA metrics dashboards
# Sharing: Retrospectives, knowledge sessions`,
    priority: null
  },
  {
    id: 286,
    category: 'DevOps',
    question: 'What are DORA metrics and why do they matter?',
    answer: 'DORA (DevOps Research and Assessment) metrics measure software delivery performance: Deployment Frequency, Lead Time for Changes, Change Failure Rate, and Mean Time to Recovery (MTTR).',
    explanation: '**Elite performers achieve:** Deployment Frequency: Multiple deploys per day. Lead Time: <1 hour from commit to production. Change Failure Rate: 0-15%. MTTR: <1 hour to restore service. These metrics predict organizational performance better than any other factors. Google\'s State of DevOps Report shows elite performers are 208x more likely to exceed profitability goals.',
    codeExample: `# DORA Metrics Tracking
# 1. Deployment Frequency: Count deployments/day
# 2. Lead Time: Time from commit to production
# 3. Change Failure Rate: % of deployments causing incidents
# 4. MTTR: Time to recover from failures
# Tools: Prometheus, Grafana, DORA dashboards`,
    priority: null
  },
  {
    id: 287,
    category: 'DevOps',
    question: 'What is Infrastructure as Code (IaC) and its benefits?',
    answer: 'Infrastructure as Code manages and provisions infrastructure through machine-readable definition files rather than manual processes or interactive configuration tools.',
    explanation: '**Benefits:** Version Control (track changes in Git), Reproducibility (identical environments), Speed (provision in minutes), Documentation (code as living docs), Collaboration (code reviews), Disaster Recovery (rebuild from code). Popular tools: Terraform, AWS CloudFormation, Ansible, Pulumi.',
    codeExample: `# Terraform Example
resource "aws_instance" "web_server" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
  
  tags = {
    Name = "production-web-server"
  }
}`,
    priority: null
  },
  {
    id: 288,
    category: 'DevOps',
    question: 'Compare Terraform and Ansible. When would you use each?',
    answer: 'Terraform is primarily for infrastructure provisioning (creating resources). Ansible is for configuration management (configuring existing resources). They\'re complementary, not competitors.',
    explanation: '**Terraform:** Declarative, state management, creates cloud resources (VPCs, EC2, RDS). **Ansible:** Procedural, agentless, configures servers (install software, start services). **Best Practice:** Use Terraform to provision infrastructure, then Ansible to configure it.',
    codeExample: `# Terraform (Provisioning)
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

# Ansible (Configuration)
- hosts: webservers
  tasks:
    - name: Install Nginx
      apt:
        name: nginx
        state: present`,
    priority: null
  },
  {
    id: 289,
    category: 'DevOps',
    question: 'What is CI/CD and explain the pipeline stages?',
    answer: 'CI/CD (Continuous Integration/Continuous Delivery or Deployment) automates the software delivery process from code commit to production deployment.',
    explanation: '**Typical Stages:** 1. Source Code Management (Git), 2. Build (compile, dependencies), 3. Unit Tests, 4. Code Quality (linting, security scanning), 5. Integration Tests, 6. Build Docker Image, 7. Push to Registry, 8. Deploy to Staging, 9. Automated Testing, 10. Approval Gate (optional), 11. Deploy to Production, 12. Monitoring & Rollback. **Tools:** Jenkins, GitLab CI, GitHub Actions, CircleCI, ArgoCD.',
    codeExample: `# CI/CD Pipeline Flow
# Code → Build → Test → Quality Check → 
# Docker Build → Push to Registry → 
# Deploy Staging → E2E Tests → 
# Approve → Deploy Production → Monitor`,
    priority: null
  },
  {
    id: 290,
    category: 'DevOps',
    question: 'What is the difference between Continuous Delivery and Continuous Deployment?',
    answer: 'Continuous Delivery requires manual approval before production deployment. Continuous Deployment automatically deploys every change that passes tests to production without human intervention.',
    explanation: '**Continuous Delivery:** Code → Build → Test → Stage → [Manual Approval] → Production. Common in regulated industries (finance, healthcare). **Continuous Deployment:** Code → Build → Test → Stage → Production (automatic). Used by Netflix, Amazon, Facebook. Requires excellent test coverage, monitoring, and rollback capabilities.',
    codeExample: `# Continuous Delivery
# Pipeline stops for manual approval before production

# Continuous Deployment
# Fully automated - every passing change goes to production
# Requires: Feature flags, comprehensive testing, auto-rollback`,
    priority: null
  },
  {
    id: 291,
    category: 'DevOps',
    question: 'Explain blue-green deployment strategy.',
    answer: 'Blue-green deployment maintains two identical production environments. One serves live traffic (blue), while the other (green) receives the new version. Traffic switches entirely once green is verified.',
    explanation: '**Process:** 1. Blue (v1.0) serving 100% traffic. 2. Deploy v2.0 to Green. 3. Test Green environment. 4. Switch load balancer to Green. 5. Monitor metrics. 6. Instant rollback to Blue if needed. **Advantages:** Zero downtime, instant rollback, full testing. **Disadvantages:** Double infrastructure cost, database migrations must be backward-compatible.',
    codeExample: `# Kubernetes Blue-Green
# kubectl apply -f deployment-v2.yaml  # Deploy to green
# kubectl get pods -l app=myapp,version=v2  # Verify
# kubectl patch service myapp -p '{"spec":{"selector":{"version":"v2"}}}'  # Switch`,
    priority: null
  },
  {
    id: 292,
    category: 'DevOps',
    question: 'What is canary deployment and when should you use it?',
    answer: 'Canary deployment gradually rolls out changes to a small subset of users before full deployment, allowing risk mitigation through real-world testing.',
    explanation: '**Process:** Deploy new version, route 5% traffic to it (canary), monitor metrics (error rate, latency), if good increase to 25%, 50%, 100%, if issues detected auto-rollback. **Use Cases:** High-traffic applications, testing performance impact, validating features in production, A/B testing. **Implementation:** Istio, NGINX, AWS ALB weighted routing.',
    codeExample: `# Istio Canary Configuration
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
spec:
  http:
  - route:
    - destination:
        host: myapp
        subset: v1
      weight: 90
    - destination:
        host: myapp
        subset: v2
      weight: 10  # 10% canary traffic`,
    priority: null
  },
  {
    id: 293,
    category: 'DevOps',
    question: 'What is GitOps and how does it differ from traditional CI/CD?',
    answer: 'GitOps uses Git as the single source of truth for both infrastructure and applications. Changes are made via pull requests, and automated operators sync the cluster state with Git.',
    explanation: '**Traditional CI/CD:** Developer → CI Pipeline → CD Pipeline → Production (push model). **GitOps:** Developer → Pull Request → Merge to Git → Operator detects change → Syncs cluster (pull model). **Key Principles:** Declarative, Versioned, Automated, Continuous reconciliation. **Tools:** ArgoCD, Flux. Benefits include audit trail, easy rollback (git revert), disaster recovery.',
    codeExample: `# GitOps Workflow
# 1. Update Kubernetes manifests in Git
# 2. Create PR, review, merge
# 3. ArgoCD detects change automatically
# 4. ArgoCD syncs cluster to match Git
# 5. Cluster state = Git state (always)`,
    priority: null
  },
  {
    id: 294,
    category: 'DevOps',
    question: 'Explain the concept of immutable infrastructure.',
    answer: 'Immutable infrastructure means servers are never modified after deployment. Any change requires replacing the entire server with a new one built from updated configuration.',
    explanation: '**Mutable (Traditional):** SSH to server, install packages manually → causes configuration drift,难以 reproduce issues. **Immutable:** Update Dockerfile/AMI template → build new image → replace old servers → destroy old servers. **Benefits:** Consistency (every server identical), Reliability (no drift), Simplicity, Easy rollback. **Technologies:** Docker containers, AWS AMIs, Packer, Terraform.',
    codeExample: `# Immutable Infrastructure with Docker
FROM ubuntu:20.04
RUN apt-get update && apt-get install -y nginx
COPY config/nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]

# Any change: rebuild image, replace containers`,
    priority: null
  },
  {
    id: 295,
    category: 'DevOps',
    question: 'What is observability and how does it differ from monitoring?',
    answer: 'Monitoring tells you when something is wrong. Observability helps you understand WHY it\'s wrong through logs, metrics, and traces (the three pillars).',
    explanation: '**Monitoring (What):** CPU usage > 80%, Error rate > 5%, Alerts when thresholds exceeded. **Observability (Why):** Logs (detailed event records), Metrics (aggregated numerical data), Traces (request journey through distributed systems). **Example:** Monitoring alert: "API latency increased to 5s". Observability investigation: Check traces (slows at DB), check logs (slow query), check metrics (connections at max) → Root cause: Connection pool exhaustion.',
    codeExample: `# Three Pillars of Observability
# 1. Logs: ELK Stack, Splunk, Grafana Loki
# 2. Metrics: Prometheus, Grafana, Datadog
# 3. Traces: Jaeger, Zipkin, AWS X-Ray, OpenTelemetry`,
    priority: null
  },
  {
    id: 296,
    category: 'DevOps',
    question: 'What is Prometheus and how does it work?',
    answer: 'Prometheus is an open-source monitoring system that collects metrics using a pull model, stores them in a time-series database, and provides powerful query language (PromQL) for analysis.',
    explanation: '**Architecture:** 1. Targets expose metrics at /metrics endpoint. 2. Prometheus Server scrapes metrics periodically. 3. Time-Series DB stores metrics with timestamps. 4. PromQL for queries. 5. Alertmanager sends alerts. 6. Grafana for visualization. **Strengths:** Multi-dimensional data model, powerful queries, no dependencies, great for Kubernetes.',
    codeExample: `# PromQL Queries
# Request rate over 5 minutes
rate(http_requests_total[5m])

# 95th percentile latency
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))

# Alert condition
up == 0  # Instance is down`,
    priority: null
  },
  {
    id: 297,
    category: 'DevOps',
    question: 'What is Grafana and why is it used with Prometheus?',
    answer: 'Grafana is an open-source visualization and analytics platform that creates dashboards from various data sources including Prometheus, making metrics human-readable and actionable.',
    explanation: '**Why Grafana + Prometheus:** Prometheus collects and stores metrics, provides query engine. Grafana creates beautiful dashboards, supports multiple data sources, provides alerting, templating, and annotations. **Key Features:** Customizable panels (graphs, tables, heatmaps), multi-source support (Prometheus, InfluxDB, Elasticsearch), visual alert rules, dynamic variables, deployment annotations.',
    codeExample: `# Grafana Dashboard Panels
# 1. Request Rate: Graph showing requests/second
# 2. Error Rate: Percentage of 5xx errors
# 3. Latency: p50, p95, p99 response times
# 4. Saturation: CPU, memory, disk usage
# 5. Top Endpoints: Table of slowest APIs`,
    priority: null
  },
  {
    id: 298,
    category: 'DevOps',
    question: 'Explain the ELK Stack and its components.',
    answer: 'ELK Stack (Elasticsearch, Logstash, Kibana) is a centralized logging solution. Elasticsearch stores logs, Logstash processes them, and Kibana visualizes them. Often includes Beats for lightweight shipping.',
    explanation: '**Components:** 1. **Beats** (Filebeat, Metricbeat): Lightweight agents that collect and ship data. 2. **Logstash:** Data processing pipeline (parse, filter, transform). 3. **Elasticsearch:** Distributed search and analytics engine storing logs as JSON documents. 4. **Kibana:** Visualization interface for searching, filtering, dashboards, alerts. **Use Cases:** Centralized log aggregation, real-time analysis, SIEM, APM.',
    codeExample: `# Filebeat Configuration
filebeat.inputs:
- type: log
  paths:
    - /var/log/*.log
output.elasticsearch:
  hosts: ["elasticsearch:9200"]

# Modern Alternative: EFK (Fluentd) or Grafana Loki`,
    priority: null
  },
  {
    id: 299,
    category: 'DevOps',
    question: 'What is Jenkins and how does it work?',
    answer: 'Jenkins is an open-source automation server for CI/CD pipelines. It orchestrates builds, tests, and deployments using plugins and declarative or scripted pipelines.',
    explanation: '**Architecture:** Master (orchestrates jobs, manages configuration), Agents/Nodes (execute build tasks), Plugins (extend functionality - Git, Docker, Kubernetes, etc.). **Strengths:** Huge plugin ecosystem, mature, flexible. **Weaknesses:** Complex maintenance, scaling challenges. Modern alternatives like GitLab CI and GitHub Actions are simpler.',
    codeExample: `# Jenkins Declarative Pipeline
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'npm install && npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Deploy') {
            steps {
                sh 'kubectl apply -f k8s/'
            }
        }
    }
}`,
    priority: null
  },
  {
    id: 300,
    category: 'DevOps',
    question: 'What are GitHub Actions and how do they compare to Jenkins?',
    answer: 'GitHub Actions is GitHub\'s native CI/CD platform that runs workflows directly in your repository. Simpler setup than Jenkins but less flexible for complex scenarios.',
    explanation: '**Comparison:** Setup: Actions (zero setup) vs Jenkins (install, configure, maintain). Cost: Actions (free tier, pay per minute) vs Jenkins (infrastructure cost). Scalability: Actions (managed) vs Jenkins (self-managed). Flexibility: Jenkins (unlimited) vs Actions (good for most cases). Integration: Actions (native GitHub) vs Jenkins (any Git provider). **Choose Actions** for simplicity and GitHub projects. **Choose Jenkins** for complex requirements.',
    codeExample: `# GitHub Actions Workflow (.github/workflows/ci.yml)
name: CI/CD Pipeline
on:
  push:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test`,
    priority: null
  },
  {
    id: 301,
    category: 'DevOps',
    question: 'What is Docker and why is it essential for DevOps?',
    answer: 'Docker is a containerization platform that packages applications and dependencies into lightweight, portable containers, ensuring consistency across environments.',
    explanation: '**Problem Without Docker:** "It works on my machine" - different OS versions, library conflicts cause deployment failures. **Solution With Docker:** Same container runs everywhere (dev, staging, prod). **Benefits:** Consistency, Isolation (no dependency conflicts), Portability, Efficiency (fewer resources than VMs), Fast Deployment (seconds), Versioning (tag images), Scalability. Essential for microservices, CI/CD, and cloud-native architectures.',
    codeExample: `# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]

# Build and run
docker build -t myapp:1.0 .
docker run -p 3000:3000 myapp:1.0`,
    priority: null
  },
  {
    id: 302,
    category: 'DevOps',
    question: 'Explain Docker multi-stage builds and their benefits.',
    answer: 'Multi-stage builds use multiple FROM statements in a Dockerfile to separate build dependencies from runtime dependencies, creating smaller, more secure production images.',
    explanation: '**Single-Stage:** ~900MB (includes build tools, dev dependencies). **Multi-Stage:** ~150MB (only runtime dependencies). **Benefits:** 80-90% size reduction, Faster pulls, Security (smaller attack surface), Clean separation (build tools don\'t exist in production). **Pattern:** Stage 1: Build (full SDK). Stage 2: Production (minimal runtime, alpine base).',
    codeExample: `# Multi-Stage Dockerfile
# Stage 1: Build
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
RUN npm ci --production
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/server.js"]`,
    priority: null
  },
  {
    id: 303,
    category: 'DevOps',
    question: 'What is Kubernetes and why is it important for DevOps?',
    answer: 'Kubernetes (K8s) is an open-source container orchestration platform that automates deployment, scaling, and management of containerized applications across clusters of machines.',
    explanation: '**Problems Solved:** How to schedule containers across servers? Handle failures automatically? Scale based on demand? Manage networking? Update without downtime? **Core Concepts:** Pod (smallest unit), Deployment (manages replicas), Service (stable endpoint), ConfigMap/Secret (configuration), Namespace (isolation). **Benefits:** Self-healing, Auto-scaling, Rolling updates, Declarative YAML, Portability (any cloud), Rich ecosystem.',
    codeExample: `# Kubernetes Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  template:
    spec:
      containers:
      - name: web-app
        image: myapp:1.0
        ports:
        - containerPort: 3000`,
    priority: null
  },
  {
    id: 304,
    category: 'DevOps',
    question: 'Explain Kubernetes rolling updates and rollbacks.',
    answer: 'Rolling updates gradually replace old pods with new ones, ensuring zero downtime. Rollbacks revert to previous version if issues are detected.',
    explanation: '**Strategy:** maxSurge (max extra pods during update), maxUnavailable (max unavailable pods). **Process:** Create new pods → Wait for readiness probes → Terminate old pods → Repeat until all updated. **Commands:** kubectl set image (trigger), kubectl rollout status (monitor), kubectl rollout undo (rollback). **Health Checks:** Readiness probe (ready to serve traffic), Liveness probe (should restart).',
    codeExample: `# Rolling Update Commands
kubectl set image deployment/web-app web-app=myapp:2.0
kubectl rollout status deployment/web-app
kubectl rollout history deployment/web-app
kubectl rollout undo deployment/web-app

# Health Checks
readinessProbe:
  httpGet:
    path: /ready
    port: 3000`,
    priority: null
  },
  {
    id: 305,
    category: 'DevOps',
    question: 'What are Helm charts and why are they used?',
    answer: 'Helm is a package manager for Kubernetes that uses charts (templates) to define, install, and upgrade complex Kubernetes applications with parameterized configurations.',
    explanation: '**Problem:** Managing dozens of YAML files for each microservice becomes unwieldy. **Solution:** Helm charts with templates and values. **Structure:** Chart.yaml (metadata), values.yaml (default config), templates/ (K8s manifests with placeholders). **Benefits:** Templating, reusability, versioning, dependency management, easy rollbacks. Essential for managing complex K8s deployments.',
    codeExample: `# Helm Commands
helm install my-release ./my-chart
helm install my-release ./my-chart --set replicaCount=5
helm upgrade my-release ./my-chart --set image.tag=3.0
helm rollback my-release 1
helm list
helm uninstall my-release`,
    priority: null
  },
  {
    id: 306,
    category: 'DevOps',
    question: 'What is a service mesh and when should you use Istio?',
    answer: 'A service mesh is an infrastructure layer that handles service-to-service communication, providing observability, security, and traffic management without changing application code. Istio is the most popular service mesh.',
    explanation: '**Problem:** Each microservice needs retry logic, circuit breakers, authentication, encryption, metrics - leading to code duplication. **Solution:** Sidecar proxy (Envoy) injected into each pod handles cross-cutting concerns. **Features:** Traffic management (canary, A/B testing), Security (mTLS encryption), Resilience (circuit breakers, retries), Observability (metrics, tracing, logs). **When to Use:** Large microservices (10+ services), advanced traffic management, service-to-service encryption. **When NOT:** Small number of services, simple apps.',
    codeExample: `# Istio Canary Deployment
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
spec:
  http:
  - route:
    - destination:
        host: reviews
        subset: v1
      weight: 90
    - destination:
        host: reviews
        subset: v2
      weight: 10`,
    priority: null
  },
  {
    id: 307,
    category: 'DevOps',
    question: 'What is Terraform state and why is it important?',
    answer: 'Terraform state is a file that maps your configuration to real-world resources, tracks metadata, and enables Terraform to plan and apply changes efficiently.',
    explanation: '**Why State Matters:** Resource tracking (knows which resources Terraform manages), Metadata (stores IDs, IPs), Performance (avoids API queries), Dependencies (understands relationships), Planning (compares desired vs actual). **Remote State (Best Practice):** Store in S3 with DynamoDB locking. **Benefits:** Team collaboration, Security (encrypted), Locking (prevents concurrent modifications), Backup (versioned), Access control (IAM). **Critical Rules:** Never edit manually, always use remote state for teams, enable locking, backup regularly, never commit to Git.',
    codeExample: `# Remote State Configuration
terraform {
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "prod/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}

# State Commands
terraform state list
terraform import aws_instance.web i-0abc123`,
    priority: null
  },
  {
    id: 308,
    category: 'DevOps',
    question: 'Explain Terraform modules and best practices.',
    answer: 'Terraform modules are reusable, encapsulated collections of resources that promote code reuse, maintainability, and standardization across infrastructure.',
    explanation: '**Structure:** main.tf (resources), variables.tf (inputs), outputs.tf (outputs), README.md (docs). **Best Practices:** 1. Small, focused modules (one responsibility). 2. Version modules (use Git tags). 3. Document inputs/outputs. 4. Validate inputs. 5. Test modules (terratest). 6. Publish to registry. Modules transform Terraform from scripts to maintainable infrastructure code.',
    codeExample: `# Module Structure
modules/vpc/
├── main.tf         # Resources
├── variables.tf    # Inputs
├── outputs.tf      # Outputs
└── README.md       # Docs

# Using Module
module "prod_vpc" {
  source     = "./modules/vpc"
  cidr_block = "10.0.0.0/16"
  environment = "production"
}`,
    priority: null
  },
  {
    id: 309,
    category: 'DevOps',
    question: 'What is Ansible and how does it work?',
    answer: 'Ansible is an agentless configuration management tool that uses SSH to execute tasks on remote servers, defined in simple YAML playbooks.',
    explanation: '**Architecture:** Control Node (runs Ansible), Managed Nodes (target servers, no agent required), Inventory (list of hosts), Playbooks (YAML task definitions), Modules (reusable task units). **Key Concepts:** Idempotent (running multiple times produces same result), Agentless (no software on managed nodes), Push Model (control node pushes changes), Human-Readable (simple YAML). Excels at configuration management, application deployment, orchestration.',
    codeExample: `# Ansible Playbook
- hosts: webservers
  become: yes
  tasks:
    - name: Install Nginx
      apt:
        name: nginx
        state: present
    
    - name: Start Nginx
      service:
        name: nginx
        state: started
        enabled: yes

# Run: ansible-playbook -i hosts.ini site.yml`,
    priority: null
  },
  {
    id: 310,
    category: 'DevOps',
    question: 'What are Ansible roles and when should you use them?',
    answer: 'Ansible roles are reusable, organized collections of tasks, variables, files, and templates that follow a standard directory structure for better maintainability.',
    explanation: '**Problem:** Large playbooks become hard to maintain, reuse, and share. **Solution:** Roles with standard structure (defaults/, tasks/, handlers/, templates/, files/, vars/, meta/). **Benefits:** Reusability (use across projects), Organization (standard structure), Maintainability (smaller files), Sharing (publish to Ansible Galaxy), Testing (test independently). Essential for scaling Ansible beyond simple playbooks.',
    codeExample: `# Role Structure
roles/nginx/
├── defaults/main.yml      # Default variables
├── tasks/main.yml         # Tasks
├── handlers/main.yml      # Handlers
├── templates/nginx.conf.j2
└── vars/main.yml          # Variables

# Using Role
- hosts: webservers
  roles:
    - role: nginx
      vars:
        nginx_port: 80`,
    priority: null
  },
  {
    id: 311,
    category: 'DevOps',
    question: 'What is Git branching strategy and explain GitFlow?',
    answer: 'Git branching strategy defines how teams organize branches for development, releases, and hotfixes. GitFlow is a popular model with dedicated branches for features, releases, and hotfixes.',
    explanation: '**GitFlow Branches:** main/master (production-ready), develop (integration), feature/* (individual features), release/* (release preparation), hotfix/* (urgent fixes). **Workflow:** Feature branch from develop → merge back to develop → create release branch → merge to main and tag → merge back to develop. **Choose GitFlow when:** Versioned releases, multiple versions supported, regulatory requirements. **Modern Alternative:** GitHub Flow (simpler, main + short-lived feature branches) for continuous deployment.',
    codeExample: `# GitFlow Commands
git checkout -b feature/user-auth
git checkout develop
git merge --no-ff feature/user-auth
git checkout -b release/1.0.0
git checkout main
git merge --no-ff release/1.0.0
git tag -a v1.0.0
git checkout -b hotfix/critical-bug`,
    priority: null
  },
  {
    id: 312,
    category: 'DevOps',
    question: 'What is trunk-based development and how does it work?',
    answer: 'Trunk-based development keeps all developers working on the main branch with short-lived feature branches (< 2 days), using feature flags instead of long-lived branches.',
    explanation: '**Traditional Problems:** Long-lived branches cause merge conflicts, "merge hell", delayed feedback, slower delivery. **Trunk-Based:** Everyone works on main, make small incremental changes, very short-lived branches (< 2 days). **Feature Flags:** Control visibility of incomplete features in production. **Benefits:** Continuous integration, faster feedback, reduced conflicts, flexible releases (decouple deployment from release), safer rollbacks. **Requirements:** Strong automated testing, feature flag infrastructure, team discipline. Used by Google, Facebook, Amazon.',
    codeExample: `# Feature Flag Implementation
if (featureFlags.isEnabled('new-checkout')) {
  renderNewCheckout();
} else {
  renderOldCheckout();
}

# Toggle Configuration
features:
  new-checkout:
    enabled: false
    percentage: 0  # Gradually increase: 10%, 50%, 100%`,
    priority: null
  },
  {
    id: 313,
    category: 'DevOps',
    question: 'What is chaos engineering and why is it important?',
    answer: 'Chaos engineering is the practice of intentionally injecting failures into systems to test resilience, identify weaknesses, and build confidence in system reliability.',
    explanation: '**Principle:** "Hope is not a strategy." Proactively test failure scenarios instead of waiting for production incidents. **Process:** 1. Define steady state (normal behavior). 2. Hypothesize ("If DB fails, system recovers in 5s"). 3. Inject failure. 4. Verify system maintains steady state. 5. Learn and fix weaknesses. **Common Experiments:** Kill instances, add network latency, fill disk space, corrupt packets, DNS failures, CPU/memory exhaustion. **Tools:** Chaos Monkey (Netflix), LitmusChaos (K8s), Gremlin. Netflix uses Chaos Monkey to randomly terminate EC2 instances, resulting in 99.99% uptime.',
    codeExample: `# Chaos Engineering Process
# 1. Define: < 1% error rate, < 200ms latency
# 2. Hypothesize: System handles DB failure
# 3. Inject: Kill database pod
# 4. Verify: Auto-failover to replica in < 5s
# 5. Learn: Fix weaknesses found

# LitmusChaos Experiment
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
spec:
  experiments:
    - name: pod-delete
      spec:
        components:
          env:
            - name: TOTAL_CHAOS_DURATION
              value: '60'`,
    priority: null
  },
  {
    id: 314,
    category: 'DevOps',
    question: 'What is Site Reliability Engineering (SRE)?',
    answer: 'SRE is a discipline that applies software engineering principles to operations, focusing on reliability, automation, and measurable service level objectives (SLOs).',
    explanation: '**Google\'s Definition:** "SRE is what happens when you ask a software engineer to design an operations function." **Core Concepts:** SLI (Service Level Indicator - metric measuring behavior), SLO (Service Level Objective - target value), SLA (Service Level Agreement - contractual obligation), Error Budget (allowed downtime). **Responsibilities:** Automation (eliminate toil), Monitoring, Incident Response, Capacity Planning, Release Engineering, Performance Optimization. **Toil Reduction:** Replace manual work with automation (Terraform, Ansible, K8s). **Blameless Postmortems:** Focus on systemic issues, not individuals.',
    codeExample: `# SRE Concepts
# SLI: Availability = successful requests / total requests
# SLO: 99.9% availability target
# SLA: 99.9% uptime or refund 10%
# Error Budget: 0.1% = 43.2 minutes/month

# Toil Elimination
# Bad: Manual server provisioning
# Good: terraform apply + ansible-playbook`,
    priority: null
  },
  {
    id: 315,
    category: 'DevOps',
    question: 'Explain the concept of error budgets in SRE.',
    answer: 'Error budget is the amount of unreliability allowed before violating SLO. It balances innovation (feature development) with reliability (system stability).',
    explanation: '**Calculation:** SLO 99.9% = Error Budget 0.1%. Monthly budget: 30 days × 24 hours × 60 minutes × 0.1% = 43.2 minutes. **How It Works:** If budget remaining (> 50%): Normal development velocity. If 20-50%: Increase testing, monitor closely. If < 20%: Freeze features, focus on reliability. If exhausted: Stop all feature releases until reliability improves. **Policy:** Error budget determines release velocity. Exhausted budget = reliability work takes priority over new features. This creates accountability and data-driven decisions about when to slow down for stability.',
    codeExample: `# Error Budget Calculation
# SLO: 99.9% availability
# Error Budget: 0.1% per month
# Monthly allowance: 43.2 minutes downtime

# Budget Policy
# > 50% remaining: Ship features normally
# 20-50% remaining: Increase testing
# < 20% remaining: Freeze features, fix reliability
# 0% remaining: Stop releases, focus on stability`,
    priority: null
  }
]
