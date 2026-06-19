---
id: 148
category: React LLD
priority: null
tags: [rate-limiting, throttling, debouncing, performance]
---

# How would you build a rate limiter or throttling logic for a button click?

## Quick Answer

Use debounce for delaying execution until after a pause in events (search inputs), throttle for limiting execution to once per time interval (scroll/resize events), or implement custom rate limiting with token bucket algorithm for API calls. Track last execution time with useRef to persist across renders without triggering re-renders.

## Detailed Explanation

### Debounce vs Throttle vs Rate Limit

#### **Debounce**
- Wait until user stops triggering events
- Execute only after specified delay of inactivity
- **Use case**: Search input, auto-save

```typescript
// User types "hello" with 300ms debounce
h → wait...
he → wait...
hel → wait...
hell → wait...
hello → [wait 300ms] → EXECUTE
```

#### **Throttle**
- Execute at most once per time interval
- Ignore events during cooldown period
- **Use case**: Scroll events, resize handlers, button clicks

```typescript
// Click button with 1000ms throttle
Click → EXECUTE
Click → IGNORE (within 1s)
Click → IGNORE (within 1s)
[1 second passes]
Click → EXECUTE
```

#### **Rate Limiting (Token Bucket)**
- Allow N requests per time window
- More sophisticated than simple throttle
- **Use case**: API calls, form submissions

```typescript
// Rate limit: 5 requests per minute
Request 1 → ✓ (4 tokens left)
Request 2 → ✓ (3 tokens left)
Request 3 → ✓ (2 tokens left)
Request 4 → ✓ (1 token left)
Request 5 → ✓ (0 tokens left)
Request 6 → ✗ BLOCKED (refill in 12s)
```

### Implementation Approaches

#### 1. Using Lodash (Quick Solution)

```typescript
import { debounce, throttle } from 'lodash';

// Debounce
const debouncedSearch = debounce((query) => {
  fetchResults(query);
}, 300);

// Throttle
const throttledScroll = throttle(() => {
  handleScroll();
}, 200);
```

**Pros:** ✅ Battle-tested, well-optimized
**Cons:** ❌ Adds ~70kb bundle size

#### 2. Custom Implementation (Lightweight)

Better for production apps to avoid large dependencies.

### When to Use Each

| Scenario | Technique | Why |
|----------|-----------|-----|
| Search input | Debounce | Wait for user to finish typing |
| Button submit | Throttle | Prevent double submissions |
| Scroll handler | Throttle | Limit expensive calculations |
| API calls | Rate Limit | Respect API quotas |
| Window resize | Throttle | Avoid layout thrashing |
| Auto-save | Debounce | Save after user stops editing |

### State Management with useRef

**Why useRef?**
- Persists across renders
- Doesn't trigger re-renders when updated
- Perfect for tracking timestamps, timers

```typescript
const lastExecutionTime = useRef<number>(0);
const timeoutRef = useRef<NodeJS.Timeout | null>(null);
```

### Edge Cases to Handle

1. **Component unmount during delay**
   - Clear timeouts in useEffect cleanup
   - Cancel pending API calls with AbortController

2. **Multiple rapid clicks**
   - Disable button during cooldown
   - Show visual feedback (loading state)

3. **Server clock skew**
   - Use client-side timestamps for UI
   - Server validates with its own clock

4. **Page refresh**
   - Persist rate limit state in sessionStorage
   - Reset on new session

## Code Example

```typescript
import React, { useState, useRef, useCallback } from 'react';
import './RateLimitedButton.css';

interface RateLimitedButtonProps {
  onClick: () => Promise<void>;
  label: string;
  limitMs?: number;  // Minimum time between clicks
  maxAttempts?: number;  // Max attempts in window
  windowMs?: number;  // Time window for maxAttempts
}

/**
 * Custom hook for rate limiting
 */
const useRateLimiter = (limitMs: number, maxAttempts?: number, windowMs?: number) => {
  const lastExecutionTime = useRef<number>(0);
  const attemptTimestamps = useRef<number[]>([]);
  const [isBlocked, setIsBlocked] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState(maxAttempts || Infinity);
  const [cooldownTime, setCooldownTime] = useState(0);

  const canExecute = useCallback(() => {
    const now = Date.now();
    
    // Simple throttle check
    if (now - lastExecutionTime.current < limitMs) {
      const remaining = limitMs - (now - lastExecutionTime.current);
      setCooldownTime(Math.ceil(remaining / 1000));
      return false;
    }

    // Rate limit check (max attempts in window)
    if (maxAttempts && windowMs) {
      // Remove old timestamps outside window
      attemptTimestamps.current = attemptTimestamps.current.filter(
        timestamp => now - timestamp < windowMs
      );

      if (attemptTimestamps.current.length >= maxAttempts) {
        setIsBlocked(true);
        const oldestInWindow = attemptTimestamps.current[0];
        const resetTime = oldestInWindow + windowMs - now;
        setCooldownTime(Math.ceil(resetTime / 1000));
        setRemainingAttempts(0);
        return false;
      }

      setRemainingAttempts(maxAttempts - attemptTimestamps.current.length);
    }

    return true;
  }, [limitMs, maxAttempts, windowMs]);

  const recordExecution = useCallback(() => {
    const now = Date.now();
    lastExecutionTime.current = now;
    
    if (maxAttempts) {
      attemptTimestamps.current.push(now);
      setRemainingAttempts(prev => Math.max(0, prev - 1));
    }
    
    setIsBlocked(false);
    setCooldownTime(0);
  }, [maxAttempts]);

  // Update cooldown timer every second
  React.useEffect(() => {
    if (cooldownTime > 0) {
      const interval = setInterval(() => {
        setCooldownTime(prev => Math.max(0, prev - 1));
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [cooldownTime]);

  return { canExecute, recordExecution, isBlocked, remainingAttempts, cooldownTime };
};

/**
 * Rate Limited Button Component
 */
const RateLimitedButton: React.FC<RateLimitedButtonProps> = ({
  onClick,
  label,
  limitMs = 1000,
  maxAttempts,
  windowMs,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { canExecute, recordExecution, isBlocked, remainingAttempts, cooldownTime } = 
    useRateLimiter(limitMs, maxAttempts, windowMs);

  const handleClick = useCallback(async () => {
    setError(null);

    if (!canExecute()) {
      setError(`Please wait ${cooldownTime}s before trying again`);
      return;
    }

    setIsLoading(true);
    recordExecution();

    try {
      await onClick();
    } catch (err) {
      setError('Action failed. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [onClick, canExecute, recordExecution, cooldownTime]);

  return (
    <div className="rate-limited-button-container">
      <button
        className={`rate-limited-button ${isBlocked ? 'blocked' : ''} ${isLoading ? 'loading' : ''}`}
        onClick={handleClick}
        disabled={isLoading || isBlocked}
      >
        {isLoading ? (
          <>
            <span className="spinner"></span>
            Processing...
          </>
        ) : (
          label
        )}
      </button>

      {/* Status Info */}
      {(remainingAttempts !== Infinity || cooldownTime > 0) && (
        <div className="rate-limit-info">
          {remainingAttempts !== Infinity && (
            <span>{remainingAttempts} attempts remaining</span>
          )}
          {cooldownTime > 0 && (
            <span className="cooldown">Cooldown: {cooldownTime}s</span>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
};

/**
 * Debounce Hook
 */
const useDebounce = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): T => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(((...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }) as T, [callback, delay]);
};

/**
 * Throttle Hook
 */
const useThrottle = <T extends (...args: any[]) => void>(
  callback: T,
  limitMs: number
): T => {
  const lastExecutionTime = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(((...args: any[]) => {
    const now = Date.now();
    
    if (now - lastExecutionTime.current >= limitMs) {
      lastExecutionTime.current = now;
      callback(...args);
    } else if (!timeoutRef.current) {
      timeoutRef.current = setTimeout(() => {
        lastExecutionTime.current = Date.now();
        timeoutRef.current = null;
        callback(...args);
      }, limitMs - (now - lastExecutionTime.current));
    }
  }) as T, [callback, limitMs]);
};

// Usage Examples

function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Debounced search
  const searchAPI = useDebounce(async (searchQuery: string) => {
    if (!searchQuery) {
      setResults([]);
      return;
    }
    
    const response = await fetch(`/api/search?q=${searchQuery}`);
    const data = await response.json();
    setResults(data);
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    searchAPI(value);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
      />
      <ul>
        {results.map(result => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
}

function SubmitForm() {
  const handleSubmit = async () => {
    await fetch('/api/submit', { method: 'POST' });
  };

  return (
    <RateLimitedButton
      onClick={handleSubmit}
      label="Submit Form"
      limitMs={2000}  // Can only submit every 2 seconds
      maxAttempts={5}  // Max 5 submissions
      windowMs={60000}  // In 1 minute window
    />
  );
}

export { RateLimitedButton, useDebounce, useThrottle };
export default RateLimitedButton;
```

## Common Interview Follow-ups

1. **How to implement server-side rate limiting?**
   - Use Redis to track request counts
   - Return 429 status code when limit exceeded
   - Include `Retry-After` header
   - Implement sliding window algorithm

2. **How to show countdown timer accurately?**
   - Use `requestAnimationFrame` for smooth updates
   - Sync with server time via NTP
   - Account for tab throttling (background tabs)

3. **How to handle rate limiting across multiple tabs?**
   - Use BroadcastChannel API to sync state
   - Store limit state in localStorage
   - Listen for storage events

4. **What's the difference between client and server rate limiting?**
   - Client: UX improvement, can be bypassed
   - Server: Security, prevents abuse
   - Always implement both (defense in depth)
