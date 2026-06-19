---
id: 154
category: React LLD
priority: high
tags: [infinite-scroll, intersection-observer, virtualization, performance]
---

# How would you build an infinite scroll component?

## Quick Answer

Implement infinite scroll using the Intersection Observer API to detect when the user reaches the bottom of the content. Load data in chunks (pagination), show loading indicators during fetch, handle errors gracefully, and implement proper cleanup. Optimize performance with virtualization (react-window) for large lists, debounce scroll events, cache loaded data, and provide manual refresh capability. Handle edge cases like no more data, network failures, and rapid scrolling.

## Detailed Explanation

### Why Infinite Scroll?

**Benefits:**
- Better UX than pagination for browsing content
- Seamless content discovery
- Reduced cognitive load (no page numbers)
- Popular in social media, feeds, e-commerce

**Challenges:**
- Memory management with large datasets
- Performance degradation with many DOM nodes
- Difficult to navigate to specific items
- SEO considerations

### Core Implementation Approaches

#### 1. Intersection Observer (Recommended)

Modern, efficient way to detect when user reaches bottom:

```typescript
import { useEffect, useRef, useState } from 'react';

const InfiniteScroll = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const observerRef = useRef<HTMLDivElement>(null);

  // Fetch data
  const fetchItems = async (pageNum: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/items?page=${pageNum}&limit=20`);
      const data = await response.json();
      
      setItems(prev => [...prev, ...data.items]);
      setHasMore(data.items.length > 0 && page < data.totalPages);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Failed to fetch:', error);
    } finally {
      setLoading(false);
    }
  };

  // Setup Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loading) {
          fetchItems(page);
        }
      },
      { threshold: 0.5 } // Trigger when 50% visible
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [page, hasMore, loading]);

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
      
      {/* Sentinel element */}
      <div ref={observerRef} className="sentinel">
        {loading && <p>Loading more...</p>}
        {!hasMore && <p>No more items</p>}
      </div>
    </div>
  );
};
```

#### 2. Scroll Event Listener (Legacy)

Older approach, less efficient:

```typescript
useEffect(() => {
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
    // Check if near bottom (within 200px)
    if (scrollHeight - scrollTop <= clientHeight + 200) {
      if (hasMore && !loading) {
        fetchItems(page);
      }
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [page, hasMore, loading]);
```

**Why Intersection Observer is better:**
- More performant (doesn't fire on every scroll)
- Cleaner API
- No need to calculate positions manually
- Better battery life on mobile

### Loading States & User Feedback

#### Multiple Loading States

```typescript
interface LoadingState {
  initial: boolean;   // First load
  fetching: boolean;  // Loading more
  refreshing: boolean;// Manual refresh
}

const [loadingState, setLoadingState] = useState<LoadingState>({
  initial: true,
  fetching: false,
  refreshing: false,
});

// Initial load
useEffect(() => {
  fetchItems(1).then(() => {
    setLoadingState({ initial: false, fetching: false, refreshing: false });
  });
}, []);

// Load more
const loadMore = async () => {
  setLoadingState(prev => ({ ...prev, fetching: true }));
  await fetchItems(page);
  setLoadingState(prev => ({ ...prev, fetching: false }));
};

// Manual refresh
const refresh = async () => {
  setLoadingState({ initial: false, fetching: false, refreshing: true });
  setItems([]);
  setPage(1);
  await fetchItems(1);
  setLoadingState({ initial: false, fetching: false, refreshing: false });
};
```

#### Skeleton Loaders

Better UX than spinners:

```typescript
const SkeletonItem = () => (
  <div className="skeleton-item">
    <div className="skeleton-avatar" />
    <div className="skeleton-content">
      <div className="skeleton-title" />
      <div className="skeleton-text" />
    </div>
  </div>
);

// Usage
{loadingState.fetching && (
  <>
    <SkeletonItem />
    <SkeletonItem />
    <SkeletonItem />
  </>
)}
```

### Error Handling

#### Retry Mechanism

```typescript
const [error, setError] = useState<string | null>(null);
const [retryCount, setRetryCount] = useState(0);

const fetchItems = async (pageNum: number) => {
  setLoading(true);
  setError(null);
  
  try {
    const response = await fetch(`/api/items?page=${pageNum}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    setItems(prev => [...prev, ...data.items]);
    setHasMore(data.hasMore);
    setPage(prev => prev + 1);
    setRetryCount(0); // Reset on success
  } catch (err: any) {
    setError(err.message || 'Failed to load');
    
    // Auto-retry up to 3 times
    if (retryCount < 3) {
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        fetchItems(pageNum);
      }, 1000 * (retryCount + 1)); // Exponential backoff
    }
  } finally {
    setLoading(false);
  }
};

// Manual retry button
{error && (
  <div className="error-state">
    <p>{error}</p>
    <button onClick={() => fetchItems(page)}>Retry</button>
  </div>
)}
```

### Performance Optimizations

#### 1. Virtualization (Critical for Large Lists)

Use react-window or react-virtualized to render only visible items:

```typescript
import { FixedSizeList as List } from 'react-window';

const VirtualizedInfiniteScroll = () => {
  const [items, setItems] = useState([]);
  
  // Row renderer
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const item = items[index];
    return (
      <div style={style} className="list-item">
        {item.name}
      </div>
    );
  };

  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
      onItemsRendered={({ visibleStopIndex }) => {
        // Load more when near end
        if (visibleStopIndex >= items.length - 10) {
          loadMore();
        }
      }}
    >
      {Row}
    </List>
  );
};
```

#### 2. Caching

Avoid re-fetching loaded data:

```typescript
const cache = new Map<number, Item[]>();

const fetchItems = async (pageNum: number) => {
  // Check cache first
  if (cache.has(pageNum)) {
    setItems(prev => [...prev, ...cache.get(pageNum)!]);
    return;
  }
  
  const data = await api.fetch(pageNum);
  cache.set(pageNum, data.items);
  setItems(prev => [...prev, ...data.items]);
};
```

#### 3. Debounced Loading

Prevent multiple simultaneous requests:

```typescript
const isLoadingRef = useRef(false);

const loadMore = async () => {
  if (isLoadingRef.current || !hasMore) return;
  
  isLoadingRef.current = true;
  try {
    await fetchItems(page);
  } finally {
    isLoadingRef.current = false;
  }
};
```

### Edge Cases

#### 1. No More Data

```typescript
{!hasMore && items.length > 0 && (
  <div className="end-message">
    <p>🎉 You've reached the end!</p>
  </div>
)}

{items.length === 0 && !loading && (
  <div className="empty-state">
    <p>No items found</p>
  </div>
)}
```

#### 2. Rapid Scrolling

```typescript
// Prevent multiple triggers
const loadMoreRef = useRef(false);

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !loadMoreRef.current && hasMore) {
        loadMoreRef.current = true;
        fetchItems(page).finally(() => {
          loadMoreRef.current = false;
        });
      }
    },
    { threshold: 0.1 }
  );
  
  // ... observe logic
}, [page, hasMore]);
```

#### 3. Window Resize

Recalculate on resize:

```typescript
useEffect(() => {
  const handleResize = debounce(() => {
    // Recalculate visible items or trigger load
    checkIfShouldLoadMore();
  }, 200);

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

#### 4. Navigation Preservation

Save scroll position:

```typescript
const [scrollPosition, setScrollPosition] = useState(0);

// Save before navigation
useEffect(() => {
  const savePosition = () => {
    setScrollPosition(window.scrollY);
  };
  
  window.addEventListener('beforeunload', savePosition);
  return () => window.removeEventListener('beforeunload', savePosition);
}, []);

// Restore on return
useEffect(() => {
  if (scrollPosition > 0) {
    window.scrollTo(0, scrollPosition);
  }
}, [items]);
```

## Code Example

```typescript
import React, { useEffect, useRef, useState, useCallback } from 'react';
import './InfiniteScroll.css';

interface Item {
  id: string;
  title: string;
  description: string;
  image?: string;
}

interface InfiniteScrollProps {
  fetchData: (page: number) => Promise<{ items: Item[]; hasMore: boolean }>;
  renderItem: (item: Item, index: number) => React.ReactNode;
  pageSize?: number;
  threshold?: number;
  loadingComponent?: React.ReactNode;
  errorComponent?: (error: string, retry: () => void) => React.ReactNode;
  emptyComponent?: React.ReactNode;
  endComponent?: React.ReactNode;
  className?: string;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  fetchData,
  renderItem,
  pageSize = 20,
  threshold = 0.5,
  loadingComponent,
  errorComponent,
  emptyComponent,
  endComponent,
  className = '',
}) => {
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  const observerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  // Fetch data function
  const loadItems = useCallback(async (pageNum: number, isRefresh = false) => {
    if (loadingRef.current) return;
    
    loadingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const result = await fetchData(pageNum);
      
      if (isRefresh) {
        setItems(result.items);
      } else {
        setItems(prev => [...prev, ...result.items]);
      }
      
      setHasMore(result.hasMore);
      setPage(prev => prev + 1);
    } catch (err: any) {
      setError(err.message || 'Failed to load items');
    } finally {
      setLoading(false);
      loadingRef.current = false;
      if (initialLoad) {
        setInitialLoad(false);
      }
    }
  }, [fetchData, initialLoad]);

  // Initial load
  useEffect(() => {
    loadItems(1, true);
  }, [loadItems]);

  // Setup Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        
        if (target.isIntersecting && hasMore && !loading && !loadingRef.current) {
          loadItems(page);
        }
      },
      { threshold }
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [page, hasMore, loading, loadItems, threshold]);

  // Manual refresh
  const refresh = useCallback(() => {
    setPage(1);
    setItems([]);
    setHasMore(true);
    loadItems(1, true);
  }, [loadItems]);

  // Manual retry
  const retry = useCallback(() => {
    loadItems(page);
  }, [loadItems, page]);

  // Default components
  const defaultLoading = (
    <div className="loading-spinner">
      <div className="spinner" />
      <p>Loading more items...</p>
    </div>
  );

  const defaultError = (errorMsg: string, onRetry: () => void) => (
    <div className="error-container">
      <p className="error-message">{errorMsg}</p>
      <button className="retry-btn" onClick={onRetry}>
        Try Again
      </button>
    </div>
  );

  const defaultEmpty = (
    <div className="empty-state">
      <p>No items to display</p>
    </div>
  );

  const defaultEnd = (
    <div className="end-message">
      <p>🎉 You've reached the end!</p>
    </div>
  );

  return (
    <div className={`infinite-scroll-container ${className}`}>
      {/* Pull to refresh indicator */}
      {loading && initialLoad && (
        <div className="initial-loader">
          <div className="spinner-large" />
        </div>
      )}

      {/* Items list */}
      <div className="items-list">
        {items.length === 0 && !loading && !error && (
          emptyComponent || defaultEmpty
        )}
        
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            {renderItem(item, index)}
          </React.Fragment>
        ))}
      </div>

      {/* Loading indicator */}
      {loading && !initialLoad && (
        loadingComponent || defaultLoading
      )}

      {/* Error state */}
      {error && (
        errorComponent 
          ? errorComponent(error, retry)
          : defaultError(error, retry)
      )}

      {/* End message */}
      {!hasMore && items.length > 0 && !error && (
        endComponent || defaultEnd
      )}

      {/* Sentinel element for Intersection Observer */}
      {hasMore && !error && (
        <div 
          ref={observerRef} 
          className="sentinel"
          aria-hidden="true"
        />
      )}

      {/* Refresh button */}
      {items.length > 0 && !loading && !error && (
        <button 
          className="refresh-btn"
          onClick={refresh}
          aria-label="Refresh items"
        >
          ↻ Refresh
        </button>
      )}

      {/* Stats */}
      {process.env.NODE_ENV === 'development' && (
        <div className="debug-stats">
          <p>Loaded: {items.length} items</p>
          <p>Page: {page}</p>
          <p>Has More: {hasMore ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
};

// Usage Examples

function PostFeed() {
  const fetchPosts = async (page: number) => {
    const response = await fetch(`/api/posts?page=${page}&limit=10`);
    const data = await response.json();
    return {
      items: data.posts,
      hasMore: data.hasNextPage,
    };
  };

  const renderPost = (post: any, index: number) => (
    <article key={post.id} className="post-card">
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
      <span className="post-date">{new Date(post.date).toLocaleDateString()}</span>
    </article>
  );

  return (
    <InfiniteScroll
      fetchData={fetchPosts}
      renderItem={renderPost}
      pageSize={10}
    />
  );
}

function ImageGallery() {
  const fetchImages = async (page: number) => {
    const response = await fetch(`/api/images?page=${page}&limit=20`);
    const data = await response.json();
    return {
      items: data.images,
      hasMore: data.hasMore,
    };
  };

  const renderImage = (image: any, index: number) => (
    <div key={image.id} className="image-item">
      <img src={image.url} alt={image.alt} loading="lazy" />
    </div>
  );

  return (
    <InfiniteScroll
      fetchData={fetchImages}
      renderItem={renderImage}
      pageSize={20}
      className="gallery-grid"
    />
  );
}

export default InfiniteScroll;
```

## CSS Styling

```css
.infinite-scroll-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

/* Initial Loader */
.initial-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
}

.spinner-large {
  width: 50px;
  height: 50px;
  border: 4px solid #f0f0f0;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Items List */
.items-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Post Card Example */
.post-card {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.post-card h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.post-card p {
  margin: 0 0 1rem 0;
  color: #666;
  line-height: 1.6;
}

.post-date {
  font-size: 0.875rem;
  color: #999;
}

/* Image Gallery Grid */
.gallery-grid .items-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.image-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.2s;
}

.image-item img:hover {
  transform: scale(1.05);
}

/* Loading Spinner */
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  color: #666;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f0f0f0;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Error Container */
.error-container {
  text-align: center;
  padding: 2rem;
  background: #fee;
  border-radius: 8px;
  margin: 1rem 0;
}

.error-message {
  color: #c53030;
  margin: 0 0 1rem 0;
}

.retry-btn {
  padding: 0.75rem 1.5rem;
  background: #f56565;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.retry-btn:hover {
  background: #e53e3e;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 3rem;
  color: #999;
}

/* End Message */
.end-message {
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 0.875rem;
}

/* Sentinel */
.sentinel {
  height: 1px;
  visibility: hidden;
}

/* Refresh Button */
.refresh-btn {
  display: block;
  margin: 1rem auto;
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.refresh-btn:hover {
  background: #5568d3;
}

/* Debug Stats */
.debug-stats {
  margin-top: 2rem;
  padding: 1rem;
  background: #f0f0f0;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #666;
}

.debug-stats p {
  margin: 0.25rem 0;
}

/* Skeleton Loader */
.skeleton-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.skeleton-avatar {
  width: 50px;
  height: 50px;
  background: #e0e0e0;
  border-radius: 50%;
}

.skeleton-content {
  flex: 1;
}

.skeleton-title {
  height: 20px;
  background: #e0e0e0;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.skeleton-text {
  height: 40px;
  background: #e0e0e0;
  border-radius: 4px;
}

/* Responsive */
@media (max-width: 768px) {
  .infinite-scroll-container {
    padding: 0.5rem;
  }
  
  .gallery-grid .items-list {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
```

## Common Interview Follow-ups

1. **Why use Intersection Observer instead of scroll events?**
   - More performant (browser-optimized, doesn't fire on every scroll)
   - Cleaner API with threshold control
   - Better battery life on mobile devices
   - No need for manual position calculations
   - Debouncing built-in

2. **How do you handle performance with thousands of items?**
   - Use virtualization (react-window, react-virtualized)
   - Only render visible items in viewport
   - Implement windowing to recycle DOM nodes
   - Lazy load images with `loading="lazy"`
   - Use CSS containment for layout isolation

3. **What about memory leaks?**
   - Always disconnect Intersection Observer on unmount
   - Clear cached data when component unmounts
   - Abort pending fetch requests
   - Clean up event listeners
   - Limit cache size

4. **How to implement pull-to-refresh on mobile?**
   - Detect touch start/move/end events
   - Show refresh indicator when pulling down
   - Trigger refresh when threshold exceeded
   - Use libraries like `react-pull-to-refresh`
   - Or implement custom gesture handling

5. **How to preserve scroll position after navigation?**
   - Save scroll position before leaving (sessionStorage)
   - Restore position when returning
   - Keep items in cache/memory
   - Use React Router's location state
   - Consider URL params for shareable positions

6. **What if the API doesn't support pagination?**
   - Request all data upfront (if small enough)
   - Implement client-side pagination
   - Slice data array: `items.slice(start, end)`
   - Cache full dataset locally
   - Warn about performance with large datasets

7. **How to test infinite scroll?**
   - Mock Intersection Observer in tests
   - Simulate scroll events
   - Test loading states
   - Verify data accumulation
   - Test error handling and retry
   - Check sentinel element behavior
   - Test with different viewport sizes

8. **SEO considerations?**
   - Infinite scroll can hurt SEO (content not immediately available)
   - Provide alternative paginated views for crawlers
   - Use proper URL structure (?page=2)
   - Implement "Load More" button as fallback
   - Consider server-side rendering for initial content
