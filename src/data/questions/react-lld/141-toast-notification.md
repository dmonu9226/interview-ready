---
id: 141
category: React LLD
priority: null
tags: [context-api, notifications, state-management, toast]
---

# How would you implement a toast notification system in React?

## Quick Answer

Use Context API for global state management, create a ToastProvider to manage notification queue, implement auto-dismiss with setTimeout, and use CSS transitions for smooth animations.

## Detailed Explanation

### Architecture Overview

A toast notification system requires:

1. **Global State Management**: Use React Context to share toast state across the app
2. **Queue System**: Maintain an array of active toasts with unique IDs
3. **Auto-dismiss**: Each toast has a timeout that removes it after N seconds
4. **Positioning**: Fixed positioning (top-right, bottom-left, etc.)
5. **Animation**: CSS transitions or libraries like Framer Motion for enter/exit
6. **Types**: Support different types (success, error, warning, info)

### Why Context over Redux?

- Toast state is simple (array of notifications)
- No complex state transformations needed
- Lower overhead than Redux
- Built into React

### Key Implementation Details

- **Unique IDs**: Use `Date.now()` or uuid for each toast
- **Queue Management**: Limit max visible toasts (e.g., 5) to avoid screen clutter
- **Stacking**: New toasts push older ones down
- **Manual Dismiss**: Allow users to close toasts early
- **Pause on Hover**: Optional - pause timer when user hovers

### Performance Considerations

- Use `React.memo` for Toast component to prevent unnecessary re-renders
- Clean up timeouts on unmount to prevent memory leaks
- Use CSS transforms instead of changing layout properties for animations

## Code Example

```typescript
import React, { createContext, useContext, useState, useCallback } from 'react';
import './Toast.css';

// Types
type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: number) => void;
}

// Context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Provider Component
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);

    // Auto-remove after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="toast-container">
        {toasts.map(toast => (
          <Toast key={toast.id} toast={toast} onClose={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Individual Toast Component
const Toast: React.FC<{
  toast: Toast;
  onClose: (id: number) => void;
}> = React.memo(({ toast, onClose }) => {
  return (
    <div className={`toast ${toast.type}`} role="alert">
      <span className="toast-message">{toast.message}</span>
      <button onClick={() => onClose(toast.id)} className="toast-close">
        ×
      </button>
    </div>
  );
});

// Custom Hook
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

// Usage Example
function App() {
  const { addToast } = useToast();

  return (
    <div>
      <button onClick={() => addToast('Success!', 'success')}>
        Show Success
      </button>
      <button onClick={() => addToast('Error occurred', 'error')}>
        Show Error
      </button>
    </div>
  );
}
```

## Common Interview Follow-ups

1. **How would you handle overlapping toasts?**
   - Implement a queue system with max limit
   - Stack them vertically with proper spacing

2. **How to make toasts accessible?**
   - Use `role="alert"` for screen readers
   - Ensure keyboard navigation
   - Provide sufficient color contrast

3. **How to persist toasts across page reloads?**
   - Store in localStorage or sessionStorage
   - Restore on app initialization
