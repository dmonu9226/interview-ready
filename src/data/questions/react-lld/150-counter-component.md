---
id: 150
category: React LLD
priority: high
tags: [counter, state-management, optimization, usecallback]
---

# How would you build an optimized counter component?

## Quick Answer

Build a counter with increment, decrement, and reset functionality using useState for state management. Optimize re-renders by wrapping event handlers in useCallback to maintain referential equality, use functional updates to avoid stale closures, implement useMemo for expensive calculations, and consider React.memo for child components. Handle edge cases like rapid clicks, negative values, and maximum limits.

## Detailed Explanation

### Basic Counter Implementation

The simplest counter uses useState to track the count value:

```typescript
const [count, setCount] = useState(0);

const increment = () => setCount(count + 1);
const decrement = () => setCount(count - 1);
const reset = () => setCount(0);
```

**Problem:** Each render creates new function references, causing unnecessary re-renders of child components.

### Optimization Techniques

#### 1. useCallback for Event Handlers

Prevents function recreation on every render:

```typescript
const increment = useCallback(() => {
  setCount(prev => prev + 1);
}, []);

const decrement = useCallback(() => {
  setCount(prev => prev - 1);
}, []);

const reset = useCallback(() => {
  setCount(0);
}, []);
```

**Why it matters:** When passing callbacks to React.memo children or useEffect dependencies, stable references prevent unnecessary re-renders.

#### 2. Functional State Updates

Avoids stale closure issues:

```typescript
// ❌ Bad: Uses stale 'count' value
const increment = () => setCount(count + 1);

// ✅ Good: Uses previous state
const increment = () => setCount(prev => prev + 1);
```

**When to use:** Whenever the new state depends on the previous state, especially in async operations or batched updates.

#### 3. React.memo for Child Components

Prevents re-rendering when props haven't changed:

```typescript
const DisplayCount = React.memo(({ count }: { count: number }) => {
  console.log('DisplayCount rendered');
  return <div>{count}</div>;
});
```

#### 4. useMemo for Expensive Calculations

Caches computed values:

```typescript
const isEven = useMemo(() => {
  // Expensive calculation example
  return count % 2 === 0;
}, [count]);
```

### Edge Cases to Handle

#### 1. Rapid Click Handling

Multiple rapid clicks can cause issues:

```typescript
// Problem: State updates may be batched unexpectedly
const handleRapidClick = () => {
  increment();
  increment();
  increment();
  // Count only increases by 1, not 3
};

// Solution: Use functional updates
const handleRapidClick = () => {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  // Count increases by 3
};
```

#### 2. Min/Max Limits

Prevent count from going below minimum or above maximum:

```typescript
const MIN_COUNT = 0;
const MAX_COUNT = 100;

const increment = useCallback(() => {
  setCount(prev => Math.min(prev + 1, MAX_COUNT));
}, []);

const decrement = useCallback(() => {
  setCount(prev => Math.max(prev - 1, MIN_COUNT));
}, []);
```

#### 3. Negative Values

Decide if negative counts are allowed:

```typescript
// Option 1: Allow negatives (default behavior)
setCount(prev => prev - 1);

// Option 2: Prevent negatives
setCount(prev => Math.max(0, prev - 1));

// Option 3: Wrap around
setCount(prev => (prev - 1 + 100) % 100);
```

#### 4. Async Operations

Handle delayed updates correctly:

```typescript
const incrementAsync = useCallback(async () => {
  await delay(1000);
  // ✅ Safe: Uses functional update
  setCount(prev => prev + 1);
  
  // ❌ Dangerous: Uses stale closure
  // setCount(count + 1);
}, []);
```

### Performance Monitoring

Track re-renders during development:

```typescript
const Counter = () => {
  const [count, setCount] = useState(0);
  
  // Development-only render tracking
  useEffect(() => {
    console.log('Counter rendered');
  });
  
  return <div>{count}</div>;
};
```

### Common Interview Questions

**Q: Why use useCallback?**
A: Maintains referential equality across renders, preventing unnecessary re-renders of memoized children and avoiding infinite loops in useEffect dependencies.

**Q: When NOT to use useCallback?**
A: For simple components without memoized children, or when the cost of comparison exceeds the cost of re-creation. Premature optimization can hurt performance.

**Q: What's the difference between useCallback and useMemo?**
A: useCallback caches functions, useMemo caches values. `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`.

## Code Example

```typescript
import React, { useState, useCallback, useMemo, memo } from 'react';
import './Counter.css';

interface CounterProps {
  initialCount?: number;
  min?: number;
  max?: number;
  step?: number;
  onCountChange?: (count: number) => void;
}

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
}

// Memoized button component to prevent unnecessary re-renders
const CounterButton = memo(({ onClick, disabled, children, variant = 'primary' }: ButtonProps) => {
  console.log(`Button "${children}" rendered`);
  
  return (
    <button
      className={`counter-btn ${variant}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      {children}
    </button>
  );
});

// Memoized display component
const CountDisplay = memo(({ count, isEven }: { count: number; isEven: boolean }) => {
  console.log('CountDisplay rendered');
  
  return (
    <div className="count-display">
      <span className="count-value">{count}</span>
      <span className={`count-status ${isEven ? 'even' : 'odd'}`}>
        {isEven ? 'Even' : 'Odd'}
      </span>
    </div>
  );
});

const Counter: React.FC<CounterProps> = ({
  initialCount = 0,
  min = -Infinity,
  max = Infinity,
  step = 1,
  onCountChange,
}) => {
  const [count, setCount] = useState(initialCount);
  const [history, setHistory] = useState<number[]>([initialCount]);

  // Optimized increment with useCallback and functional update
  const increment = useCallback(() => {
    setCount(prev => {
      const newValue = Math.min(prev + step, max);
      return newValue;
    });
  }, [step, max]);

  // Optimized decrement
  const decrement = useCallback(() => {
    setCount(prev => {
      const newValue = Math.max(prev - step, min);
      return newValue;
    });
  }, [step, min]);

  // Reset to initial value
  const reset = useCallback(() => {
    setCount(initialCount);
    setHistory([initialCount]);
  }, [initialCount]);

  // Double the count
  const double = useCallback(() => {
    setCount(prev => {
      const newValue = prev * 2;
      return Math.min(Math.max(newValue, min), max);
    });
  }, [min, max]);

  // Track history of changes
  const addToHistory = useCallback((newCount: number) => {
    setHistory(prev => [...prev.slice(-9), newCount]); // Keep last 10
  }, []);

  // Notify parent of changes
  React.useEffect(() => {
    onCountChange?.(count);
    addToHistory(count);
  }, [count, onCountChange, addToHistory]);

  // Expensive calculation (memoized)
  const isEven = useMemo(() => {
    // Simulate expensive computation
    return count % 2 === 0;
  }, [count]);

  const canIncrement = count < max;
  const canDecrement = count > min;

  return (
    <div className="counter-container">
      <h2>Optimized Counter</h2>
      
      <CountDisplay count={count} isEven={isEven} />
      
      <div className="counter-controls">
        <CounterButton
          onClick={decrement}
          disabled={!canDecrement}
          variant="danger"
        >
          − {step}
        </CounterButton>
        
        <CounterButton
          onClick={reset}
          variant="secondary"
        >
          Reset
        </CounterButton>
        
        <CounterButton
          onClick={increment}
          disabled={!canIncrement}
          variant="primary"
        >
          + {step}
        </CounterButton>
        
        <CounterButton
          onClick={double}
          disabled={count * 2 > max}
          variant="secondary"
        >
          × 2
        </CounterButton>
      </div>

      {/* History trail */}
      <div className="counter-history">
        <h3>History:</h3>
        <div className="history-items">
          {history.map((value, index) => (
            <span key={index} className="history-item">
              {value}
              {index < history.length - 1 && ' → '}
            </span>
          ))}
        </div>
      </div>

      {/* Debug info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="debug-info">
          <p>Range: [{min}, {max}]</p>
          <p>Step: {step}</p>
          <p>Is Even: {isEven.toString()}</p>
        </div>
      )}
    </div>
  );
};

// Usage Examples

function BasicCounter() {
  return <Counter initialCount={0} min={0} max={100} />;
}

function StepCounter() {
  return <Counter initialCount={0} min={0} max={1000} step={10} />;
}

function ControlledCounter() {
  const [value, setValue] = useState(50);
  
  return (
    <>
      <Counter
        initialCount={value}
        min={0}
        max={100}
        onCountChange={setValue}
      />
      <p>Parent sees: {value}</p>
    </>
  );
}

export default Counter;
```

## CSS Styling

```css
.counter-container {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.counter-container h2 {
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
}

/* Count Display */
.count-display {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
}

.count-value {
  font-size: 3rem;
  font-weight: bold;
  color: white;
}

.count-status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
}

.count-status.even {
  background: rgba(255, 255, 255, 0.3);
  color: white;
}

.count-status.odd {
  background: rgba(0, 0, 0, 0.2);
  color: white;
}

/* Controls */
.counter-controls {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.counter-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 80px;
}

.counter-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.counter-btn:active:not(:disabled) {
  transform: translateY(0);
}

.counter-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.counter-btn.primary {
  background: #667eea;
  color: white;
}

.counter-btn.secondary {
  background: #e0e0e0;
  color: #333;
}

.counter-btn.danger {
  background: #f56565;
  color: white;
}

/* History */
.counter-history {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 2px solid #e0e0e0;
}

.counter-history h3 {
  font-size: 1rem;
  color: #666;
  margin-bottom: 0.75rem;
}

.history-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-family: monospace;
  font-size: 0.875rem;
  color: #555;
}

.history-item {
  padding: 0.25rem 0.5rem;
  background: #f5f5f5;
  border-radius: 4px;
}

/* Debug Info */
.debug-info {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #f0f0f0;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #666;
}

.debug-info p {
  margin: 0.25rem 0;
}
```

## Common Interview Follow-ups

1. **How does useCallback improve performance?**
   - Prevents unnecessary re-renders of memoized child components
   - Maintains stable references for useEffect dependencies
   - Avoids infinite loops when functions are in dependency arrays

2. **When should you NOT optimize with useCallback?**
   - Simple components without React.memo children
   - Functions that change on every render anyway
   - When profiling shows no performance benefit
   - Premature optimization can make code harder to read

3. **What's the difference between `setCount(count + 1)` and `setCount(prev => prev + 1)`?**
   - First uses current closure value (can be stale)
   - Second uses latest state value (always correct)
   - Functional updates are safer for async/batched operations

4. **How would you add undo/redo functionality?**
   - Maintain history array with past states
   - Track current position in history
   - Implement undo/redo handlers that navigate history
   - Consider memory limits for large histories

5. **How to test this component?**
   - Test basic increment/decrement/reset
   - Test boundary conditions (min/max)
   - Test rapid clicks don't cause issues
   - Verify callbacks are called correctly
   - Check accessibility attributes

6. **What if count needs to sync with an API?**
   - Use useEffect to persist changes
   - Debounce rapid updates
   - Handle network errors gracefully
   - Show loading states during sync
   - Implement optimistic updates with rollback
