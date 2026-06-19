---
id: 146
category: React LLD
priority: null
tags: [optimistic-updates, api, error-handling, user-experience]
---

# How would you design a favorite/like button with optimistic updates?

## Quick Answer

Update UI immediately when user clicks (optimistic update), send API request in background, rollback UI if API fails with error message and retry option. Use local state for immediate feedback, handle race conditions with request IDs, and provide visual loading states during the API call.

## Detailed Explanation

### What are Optimistic Updates?

**Pessimistic (Traditional):**
1. User clicks like button
2. Show loading spinner
3. Wait for API response
4. Update UI based on response

**Optimistic (Better UX):**
1. User clicks like button
2. Update UI immediately (assume success)
3. Send API request in background
4. If fails, rollback UI and show error

### Why Use Optimistic Updates?

✅ **Instant feedback** - No waiting for network
✅ **Better perceived performance** - Feels snappy
✅ **Improved user experience** - Reduces friction
❌ **Complexity** - Need to handle rollbacks
❌ **Race conditions** - Multiple rapid clicks

### Implementation Strategy

#### State Management

```typescript
interface LikeState {
  isLiked: boolean;
  likeCount: number;
  isLoading: boolean;
  error: string | null;
}
```

#### Request Tracking

Track pending requests to handle race conditions:
```typescript
const [pendingRequest, setPendingRequest] = useState<number | null>(null);
```

Use timestamps or UUIDs to identify requests and ignore stale responses.

### Error Handling & Rollback

**Rollback Process:**
1. Save previous state before optimistic update
2. If API fails, restore previous state
3. Show error toast/notification
4. Provide "Retry" button

**Example Flow:**
```typescript
// Before API call
const previousState = { isLiked, likeCount };

// Optimistic update
setIsLiked(true);
setLikeCount(prev => prev + 1);

// API fails
try {
  await likePost(postId);
} catch (error) {
  // Rollback
  setIsLiked(previousState.isLiked);
  setLikeCount(previousState.likeCount);
  showError('Failed to like post');
}
```

### Race Condition Prevention

**Problem:** User clicks like/unlike rapidly
- Request 1: Like (slow)
- Request 2: Unlike (fast)
- Request 1 completes → Shows liked (wrong!)

**Solutions:**

1. **Disable button during request:**
```typescript
<button disabled={isLoading}>Like</button>
```

2. **Queue requests:**
- Store pending actions in queue
- Process sequentially
- Cancel outdated requests

3. **Use latest timestamp:**
```typescript
const requestId = Date.now();
setPendingRequest(requestId);

const response = await apiCall();
if (requestId !== pendingRequest) return; // Stale response
```

### Visual Feedback States

1. **Default**: Empty heart icon
2. **Hover**: Slightly larger heart
3. **Loading**: Spinning animation or pulse
4. **Liked**: Filled heart with color
5. **Error**: Shake animation + red border

### Accessibility

- Use `<button>` not `<div>` for clickability
- `aria-pressed` for toggle state
- Announce changes to screen readers
- Keyboard support (Enter/Space to toggle)
- Sufficient color contrast

### Performance Considerations

- Debounce rapid clicks (e.g., 300ms)
- Cache like status to avoid re-fetching
- Batch multiple likes if possible
- Use SWR or React Query for automatic refetching

## Code Example

```typescript
import React, { useState, useCallback } from 'react';
import './LikeButton.css';

interface LikeButtonProps {
  postId: string;
  initialLiked: boolean;
  initialCount: number;
  onLike: (postId: string) => Promise<void>;
  onUnlike: (postId: string) => Promise<void>;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  postId,
  initialLiked,
  initialCount,
  onLike,
  onUnlike,
}) => {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Track request ID to handle race conditions
  const [currentRequestId, setCurrentRequestId] = useState<number>(0);

  const handleToggle = useCallback(async () => {
    if (isLoading) return; // Prevent duplicate requests

    const requestId = Date.now();
    setCurrentRequestId(requestId);

    // Save previous state for rollback
    const previousState = {
      isLiked,
      likeCount,
    };

    // Optimistic update
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikeCount(prev => newIsLiked ? prev + 1 : prev - 1);
    setIsLoading(true);
    setError(null);

    try {
      // Perform API call
      if (newIsLiked) {
        await onLike(postId);
      } else {
        await onUnlike(postId);
      }

      // Check if this is still the latest request
      if (requestId !== currentRequestId) {
        console.log('Stale response ignored');
        return;
      }

      // Success - keep optimistic state
      setIsLoading(false);
    } catch (err) {
      // Check if this is still the latest request
      if (requestId !== currentRequestId) {
        return;
      }

      // Rollback on error
      setIsLiked(previousState.isLiked);
      setLikeCount(previousState.likeCount);
      setIsLoading(false);
      setError('Failed to update. Please try again.');
      
      console.error('Like toggle failed:', err);
    }
  }, [isLiked, likeCount, isLoading, postId, onLike, onUnlike, currentRequestId]);

  const handleRetry = useCallback(() => {
    setRetryCount(prev => prev + 1);
    handleToggle();
  }, [handleToggle]);

  return (
    <div className="like-button-container">
      <button
        className={`like-button ${isLiked ? 'liked' : ''} ${isLoading ? 'loading' : ''}`}
        onClick={handleToggle}
        disabled={isLoading}
        aria-pressed={isLiked}
        aria-label={isLiked ? 'Unlike' : 'Like'}
      >
        {/* Heart Icon with Animation */}
        <svg
          className={`heart-icon ${isLiked ? 'filled' : ''}`}
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill={isLiked ? '#e74c3c' : 'none'}
            stroke={isLiked ? '#e74c3c' : '#666'}
            strokeWidth="2"
          />
        </svg>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        )}
      </button>

      {/* Like Count */}
      <span className="like-count">{likeCount}</span>

      {/* Error Message with Retry */}
      {error && (
        <div className="like-error">
          <span>{error}</span>
          <button onClick={handleRetry} className="retry-button">
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

// Usage Example with API calls
function PostCard({ post }: { post: Post }) {
  const handleLike = async (postId: string) => {
    const response = await fetch(`/api/posts/${postId}/like`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      throw new Error('Failed to like post');
    }
  };

  const handleUnlike = async (postId: string) => {
    const response = await fetch(`/api/posts/${postId}/unlike`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to unlike post');
    }
  };

  return (
    <div className="post-card">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      
      <LikeButton
        postId={post.id}
        initialLiked={post.isLiked}
        initialCount={post.likeCount}
        onLike={handleLike}
        onUnlike={handleUnlike}
      />
    </div>
  );
}

export default LikeButton;
```

## CSS Animations

```css
.like-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: transparent;
  border: 2px solid #ddd;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.like-button:hover:not(:disabled) {
  border-color: #e74c3c;
  transform: scale(1.05);
}

.like-button.liked {
  border-color: #e74c3c;
  background: rgba(231, 76, 60, 0.1);
}

.like-button.loading {
  cursor: not-allowed;
  opacity: 0.7;
}

/* Heart Animation */
.heart-icon.filled {
  animation: heartBeat 0.3s ease-in-out;
}

@keyframes heartBeat {
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
}

/* Error Shake Animation */
.like-error {
  animation: shake 0.5s ease-in-out;
  color: #e74c3c;
  margin-top: 8px;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

/* Loading Spinner */
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #e74c3c;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

## Common Interview Follow-ups

1. **How to handle offline mode?**
   - Queue actions in localStorage/IndexedDB
   - Sync when connection restored
   - Show "pending" indicator

2. **How to prevent spam clicking?**
   - Disable button during request
   - Add debounce/throttle (300ms)
   - Rate limit on backend

3. **How to sync with other tabs/windows?**
   - Use BroadcastChannel API
   - Listen for storage events
   - Refetch data periodically

4. **What if user navigates away during request?**
   - AbortController to cancel request
   - Cleanup in useEffect return
   - Let request complete silently
