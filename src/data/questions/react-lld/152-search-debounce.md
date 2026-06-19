---
id: 152
category: React LLD
priority: high
tags: [search, debounce, api, custom-hook]
---

# How would you implement a search with debouncing?

## Quick Answer

Create a search input that delays API calls using a debounce mechanism to avoid excessive requests on every keystroke. Implement a custom `useDebounce` hook that waits for a specified delay after the last input change before triggering the search. Cancel previous pending requests when new input arrives, handle loading and error states, and provide proper cleanup to prevent memory leaks and race conditions.

## Detailed Explanation

### Why Debounce Search?

**Problem:** Without debouncing, typing "javascript" triggers 10 API calls (one per character):
```
j → ja → jav → java → javas → javasc → javascri → javascrip → javascript
```

**Solution:** Wait until user stops typing for 300-500ms before making the API call.

### Debounce Implementation Strategies

#### 1. Custom useDebounce Hook (Recommended)

```typescript
import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set timer to update debounced value
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: cancel timer if value changes or component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

**Usage:**
```typescript
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearch = useDebounce(searchTerm, 300);

useEffect(() => {
  if (debouncedSearch) {
    fetchResults(debouncedSearch);
  }
}, [debouncedSearch]);
```

#### 2. Debounce with AbortController (Cancel Previous Requests)

```typescript
const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    
    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(debouncedQuery)}`,
          { signal: controller.signal }
        );
        const data = await response.json();
        setResults(data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Search failed:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResults();

    // Cleanup: abort previous request
    return () => {
      controller.abort();
    };
  }, [debouncedQuery]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {loading && <p>Loading...</p>}
      <ul>
        {results.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

### Race Condition Handling

**Problem:** Slow network can cause out-of-order responses:
```
Request 1: "jav" (slow, takes 2s)
Request 2: "javascript" (fast, takes 0.5s)
Result: Shows results for "jav" instead of "javascript" ❌
```

**Solutions:**

#### Solution 1: AbortController (Best)
```typescript
// Automatically cancels previous in-flight requests
const controller = new AbortController();
fetch(url, { signal: controller.signal });
// Later: controller.abort() cancels the request
```

#### Solution 2: Request ID Tracking
```typescript
useEffect(() => {
  let currentRequestId = requestId++;
  
  fetchResults(query).then(results => {
    // Only update if this is still the latest request
    if (currentRequestId === latestRequestId) {
      setResults(results);
    }
  });
  
  return () => {
    // Mark this request as stale
  };
}, [query]);
```

#### Solution 3: Timestamp Comparison
```typescript
const [lastFetchTime, setLastFetchTime] = useState(0);

useEffect(() => {
  const fetchTime = Date.now();
  setLastFetchTime(fetchTime);
  
  fetchResults(query).then(results => {
    if (fetchTime >= lastFetchTime) {
      setResults(results);
    }
  });
}, [query]);
```

### Advanced Debounce Patterns

#### 1. Immediate Execution (Leading Edge)

Execute immediately, then wait:

```typescript
function useDebounceImmediate<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [isFirst, setIsFirst] = useState(true);

  useEffect(() => {
    if (isFirst) {
      setDebouncedValue(value);
      setIsFirst(false);
      return;
    }

    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay, isFirst]);

  return debouncedValue;
}
```

#### 2. Debounce with Max Wait

Guarantee execution after maximum wait time:

```typescript
function useDebounceMaxWait<T>(value: T, delay: number = 300, maxWait: number = 1000): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [lastChange, setLastChange] = useState(Date.now());

  useEffect(() => {
    setLastChange(Date.now());
    
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Force update if maxWait exceeded
    const maxTimer = setTimeout(() => {
      setDebouncedValue(value);
    }, maxWait);

    return () => {
      clearTimeout(timer);
      clearTimeout(maxTimer);
    };
  }, [value, delay, maxWait]);

  return debouncedValue;
}
```

#### 3. Throttle vs Debounce

**Debounce:** Wait until user stops (good for search)
**Throttle:** Execute at most once per interval (good for scroll/resize)

```typescript
function useThrottle<T>(value: T, interval: number = 300): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecuted = useRef<number>(0);

  useEffect(() => {
    const now = Date.now();
    const timeSinceLast = now - lastExecuted.current;

    if (timeSinceLast >= interval) {
      setThrottledValue(value);
      lastExecuted.current = now;
    } else {
      const timer = setTimeout(() => {
        setThrottledValue(value);
        lastExecuted.current = Date.now();
      }, interval - timeSinceLast);
      
      return () => clearTimeout(timer);
    }
  }, [value, interval]);

  return throttledValue;
}
```

### Performance Optimizations

#### 1. Cache Search Results

```typescript
const searchCache = new Map<string, any[]>();

const cachedSearch = async (query: string) => {
  if (searchCache.has(query)) {
    return searchCache.get(query);
  }
  
  const results = await fetchResults(query);
  searchCache.set(query, results);
  
  // Limit cache size
  if (searchCache.size > 50) {
    const firstKey = searchCache.keys().next().value;
    searchCache.delete(firstKey);
  }
  
  return results;
};
```

#### 2. Minimum Character Threshold

Don't search for single characters:

```typescript
const MIN_SEARCH_LENGTH = 2;

useEffect(() => {
  if (debouncedQuery.length < MIN_SEARCH_LENGTH) {
    setResults([]);
    return;
  }
  
  // Perform search...
}, [debouncedQuery]);
```

#### 3. Cancel on Empty Input

```typescript
useEffect(() => {
  if (!debouncedQuery.trim()) {
    setResults([]);
    setLoading(false);
    return;
  }
  
  // Perform search...
}, [debouncedQuery]);
```

### Error Handling

```typescript
interface SearchResult {
  data: any[];
  error: string | null;
  loading: boolean;
}

const useSearch = (query: string, delay: number = 300): SearchResult => {
  const [result, setResult] = useState<SearchResult>({
    data: [],
    error: null,
    loading: false,
  });
  
  const debouncedQuery = useDebounce(query, delay);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResult({ data: [], error: null, loading: false });
      return;
    }

    const controller = new AbortController();
    setResult(prev => ({ ...prev, loading: true, error: null }));

    const performSearch = async () => {
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(debouncedQuery)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`Search failed: ${response.statusText}`);
        }

        const data = await response.json();
        setResult({ data, error: null, loading: false });
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          setResult({
            data: [],
            error: error.message || 'Search failed',
            loading: false,
          });
        }
      }
    };

    performSearch();

    return () => {
      controller.abort();
    };
  }, [debouncedQuery]);

  return result;
};
```

## Code Example

```typescript
import React, { useState, useEffect, useCallback, useRef } from 'react';
import './SearchWithDebounce.css';

// Custom debounce hook
function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Search result item interface
interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
}

// Search hook with caching and error handling
interface UseSearchReturn {
  results: SearchResult[];
  loading: boolean;
  error: string | null;
  hasSearched: boolean;
}

function useSearch(query: string, delay: number = 300): UseSearchReturn {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  
  const debouncedQuery = useDebounce(query, delay);
  const cacheRef = useRef<Map<string, SearchResult[]>>(new Map());

  useEffect(() => {
    // Reset if query is empty
    if (!debouncedQuery.trim()) {
      setResults([]);
      setLoading(false);
      setError(null);
      setHasSearched(false);
      return;
    }

    const trimmedQuery = debouncedQuery.trim().toLowerCase();
    
    // Check cache first
    if (cacheRef.current.has(trimmedQuery)) {
      setResults(cacheRef.current.get(trimmedQuery)!);
      setHasSearched(true);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);
    setHasSearched(true);

    const performSearch = async () => {
      try {
        // Simulate API call (replace with actual fetch)
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(trimmedQuery)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`Search failed: ${response.status}`);
        }

        const data = await response.json();
        
        // Cache results
        cacheRef.current.set(trimmedQuery, data);
        
        // Limit cache size
        if (cacheRef.current.size > 50) {
          const firstKey = cacheRef.current.keys().next().value;
          cacheRef.current.delete(firstKey);
        }
        
        setResults(data);
        setLoading(false);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Failed to fetch results');
          setLoading(false);
        }
      }
    };

    performSearch();

    // Cleanup: abort request on unmount or query change
    return () => {
      controller.abort();
    };
  }, [debouncedQuery]);

  return { results, loading, error, hasSearched };
}

// Mock data generator (for demo purposes)
const generateMockResults = (query: string): SearchResult[] => {
  const items = [
    'JavaScript', 'Java', 'React', 'Redux', 'TypeScript',
    'Node.js', 'Next.js', 'Vue.js', 'Angular', 'Svelte'
  ];
  
  return items
    .filter(item => item.toLowerCase().includes(query.toLowerCase()))
    .map((item, index) => ({
      id: `${index}`,
      title: item,
      description: `Learn about ${item} - A comprehensive guide`,
      url: `https://example.com/${item.toLowerCase()}`,
    }));
};

// Main Search Component
const SearchWithDebounce: React.FC = () => {
  const [query, setQuery] = useState('');
  const { results, loading, error, hasSearched } = useSearch(query, 300);
  const inputRef = useRef<HTMLInputElement>(null);

  // Clear search
  const clearSearch = useCallback(() => {
    setQuery('');
    inputRef.current?.focus();
  }, []);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Highlight matching text
  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, i) => 
      regex.test(part) ? <mark key={i}>{part}</mark> : part
    );
  };

  return (
    <div className="search-container">
      <h2>Search with Debouncing</h2>
      
      {/* Search Input */}
      <div className="search-input-wrapper">
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Search technologies..."
          value={query}
          onChange={handleInputChange}
          aria-label="Search"
          autoComplete="off"
        />
        
        {query && (
          <button 
            className="clear-btn"
            onClick={clearSearch}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
        
        {loading && (
          <div className="loading-spinner" aria-label="Loading">
            ⏳
          </div>
        )}
      </div>
      
      {/* Search Info */}
      <div className="search-info">
        <span className="query-display">
          {query ? `Searching for: "${query}"` : 'Start typing to search'}
        </span>
        <span className="debounce-hint">
          (Search triggers 300ms after you stop typing)
        </span>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="error-message" role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {/* Results */}
      <div className="search-results" aria-live="polite">
        {!hasSearched && !query && (
          <div className="empty-state">
            <p>🔍 Type something to start searching</p>
            <p className="hint">Try: "java", "react", "type"</p>
          </div>
        )}
        
        {hasSearched && results.length === 0 && !loading && !error && (
          <div className="no-results">
            <p>No results found for "{query}"</p>
            <p className="hint">Try different keywords</p>
          </div>
        )}
        
        {results.length > 0 && (
          <>
            <div className="results-count">
              Found {results.length} result{results.length !== 1 ? 's' : ''}
            </div>
            
            <ul className="results-list">
              {results.map(result => (
                <li key={result.id} className="result-item">
                  <h3 className="result-title">
                    {highlightMatch(result.title, query)}
                  </h3>
                  <p className="result-description">
                    {highlightMatch(result.description, query)}
                  </p>
                  <a 
                    href={result.url} 
                    className="result-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {result.url}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      
      {/* Debug Info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="debug-info">
          <p><strong>Query:</strong> "{query}"</p>
          <p><strong>Length:</strong> {query.length}</p>
          <p><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</p>
          <p><strong>Results:</strong> {results.length}</p>
        </div>
      )}
    </div>
  );
};

export default SearchWithDebounce;
```

## CSS Styling

```css
.search-container {
  max-width: 700px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.search-container h2 {
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
}

/* Search Input */
.search-input-wrapper {
  position: relative;
  margin-bottom: 1rem;
}

.search-input {
  width: 100%;
  padding: 1rem 3rem 1rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.clear-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #999;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: all 0.2s;
}

.clear-btn:hover {
  background: #f0f0f0;
  color: #333;
}

.loading-spinner {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: translateY(-50%) rotate(0deg); }
  to { transform: translateY(-50%) rotate(360deg); }
}

/* Search Info */
.search-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.query-display {
  color: #666;
  font-weight: 500;
}

.debounce-hint {
  color: #999;
  font-style: italic;
}

/* Error Message */
.error-message {
  padding: 0.75rem 1rem;
  background: #fee;
  border-left: 4px solid #f56565;
  color: #c53030;
  border-radius: 4px;
  margin-bottom: 1rem;
}

/* Results */
.search-results {
  min-height: 200px;
}

.empty-state, .no-results {
  text-align: center;
  padding: 3rem 1rem;
  color: #999;
}

.empty-state p, .no-results p {
  margin: 0.5rem 0;
}

.hint {
  font-size: 0.875rem;
  color: #bbb;
}

.results-count {
  padding: 0.75rem 0;
  color: #666;
  font-size: 0.875rem;
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;
}

.results-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.result-item {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  transition: background 0.2s;
}

.result-item:hover {
  background: #f8f9fa;
}

.result-item:last-child {
  border-bottom: none;
}

.result-title {
  font-size: 1.1rem;
  color: #333;
  margin: 0 0 0.5rem 0;
}

.result-title mark {
  background: #fef3c7;
  padding: 0 2px;
  border-radius: 2px;
}

.result-description {
  font-size: 0.875rem;
  color: #666;
  margin: 0 0 0.5rem 0;
}

.result-link {
  font-size: 0.75rem;
  color: #667eea;
  text-decoration: none;
}

.result-link:hover {
  text-decoration: underline;
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

1. **What's the difference between debounce and throttle?**
   - **Debounce**: Waits for pause in events (good for search, autocomplete)
   - **Throttle**: Limits execution to once per interval (good for scroll, resize)
   - Example: Typing "hello" - debounce fires once after pause, throttle fires every 300ms

2. **How do you handle race conditions?**
   - Use AbortController to cancel previous requests
   - Track request IDs and ignore stale responses
   - Compare timestamps to ensure latest request wins
   - AbortController is the cleanest solution

3. **Why not just use lodash.debounce?**
   - You can! But understanding the implementation is important
   - Custom hooks give more control and flexibility
   - Reduces bundle size if you only need debounce
   - Easy to add custom features (caching, max wait, etc.)

4. **How to test debounced search?**
   - Mock timers with Jest: `jest.useFakeTimers()`
   - Fast-forward time: `jest.advanceTimersByTime(300)`
   - Test that API isn't called immediately
   - Verify API is called after delay
   - Test cancellation of previous requests

5. **Performance with large result sets?**
   - Implement pagination or infinite scroll
   - Virtualize the results list
   - Add minimum character threshold (don't search for 1 char)
   - Cache results to avoid redundant API calls
   - Consider server-side filtering

6. **Accessibility considerations?**
   - Use `aria-live` regions for dynamic results
   - Provide keyboard navigation (arrow keys, Enter)
   - Announce result count changes to screen readers
   - Ensure sufficient color contrast
   - Add ARIA labels to interactive elements

7. **How to add keyboard navigation?**
   - Track selected index in state
   - Listen for ArrowUp/ArrowDown keys
   - Highlight selected result
   - Enter key to select/open result
   - Escape key to close dropdown
