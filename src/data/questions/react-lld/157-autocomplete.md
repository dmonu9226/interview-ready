---
id: 157
category: React LLD
priority: high
tags: [autocomplete, search, keyboard-navigation, accessibility]
---

# How would you build an auto-complete (search suggestions) component?

## Quick Answer

Create an auto-complete input that shows suggestions as the user types using debounced API calls to avoid excessive requests. Implement keyboard navigation (arrow keys to navigate suggestions, Enter to select, Escape to close), proper ARIA attributes for accessibility (role="combobox", aria-expanded, aria-activedescendant), handle loading and empty states, highlight matching text in suggestions, and support mouse and touch interactions. Close dropdown on outside click, manage focus properly, and cache results for better performance.

## Detailed Explanation

### Core Architecture

#### Component Structure

```typescript
<AutoComplete
  value={query}
  onChange={setQuery}
  fetchSuggestions={fetchAPI}
  onSelect={handleSelect}
/>

// Renders:
// - Input field with role="combobox"
// - Dropdown listbox with suggestions
// - Loading indicator
// - No results message
// - Highlighted matching text
```

#### State Management

```typescript
interface AutoCompleteState {
  query: string;           // Current input value
  suggestions: Item[];     // Fetched suggestions
  loading: boolean;        // Fetching state
  error: string | null;    // Error message
  isOpen: boolean;         // Dropdown visibility
  highlightedIndex: number;// Keyboard navigation index
  selectedItem: Item | null;// Currently selected item
}
```

### Debounced Search Implementation

```typescript
const [query, setQuery] = useState('');
const [suggestions, setSuggestions] = useState<Item[]>([]);
const [loading, setLoading] = useState(false);
const debouncedQuery = useDebounce(query, 300);

useEffect(() => {
  if (!debouncedQuery.trim()) {
    setSuggestions([]);
    return;
  }

  const controller = new AbortController();
  setLoading(true);

  const fetchSuggestions = async () => {
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(debouncedQuery)}`,
        { signal: controller.signal }
      );
      const data = await response.json();
      setSuggestions(data.suggestions);
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('Fetch failed:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  fetchSuggestions();

  return () => controller.abort();
}, [debouncedQuery]);
```

### Keyboard Navigation

Critical for accessibility and UX:

```typescript
const handleKeyDown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault();
      setHighlightedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
      break;
      
    case 'ArrowUp':
      e.preventDefault();
      setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
      break;
      
    case 'Enter':
      e.preventDefault();
      if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
        handleSelect(suggestions[highlightedIndex]);
      }
      break;
      
    case 'Escape':
      setIsOpen(false);
      setHighlightedIndex(-1);
      break;
      
    case 'Tab':
      setIsOpen(false);
      break;
  }
};
```

**Navigation behavior:**
- **Arrow Down**: Move to next suggestion (wrap or stop at end)
- **Arrow Up**: Move to previous suggestion (stop at -1)
- **Enter**: Select highlighted suggestion
- **Escape**: Close dropdown
- **Tab**: Close dropdown and move to next element

### Accessibility Requirements

#### ARIA Attributes

```typescript
<div className="autocomplete" role="combobox">
  <input
    type="text"
    role="combobox"
    aria-expanded={isOpen}
    aria-haspopup="listbox"
    aria-controls="suggestions-listbox"
    aria-activedescendant={
      highlightedIndex >= 0 
        ? `suggestion-${highlightedIndex}` 
        : undefined
    }
    aria-autocomplete="list"
    value={query}
    onChange={handleChange}
    onKeyDown={handleKeyDown}
  />
  
  <ul
    id="suggestions-listbox"
    role="listbox"
    aria-label="Suggestions"
  >
    {suggestions.map((item, index) => (
      <li
        key={item.id}
        id={`suggestion-${index}`}
        role="option"
        aria-selected={highlightedIndex === index}
        onClick={() => handleSelect(item)}
        onMouseEnter={() => setHighlightedIndex(index)}
      >
        {item.label}
      </li>
    ))}
  </ul>
</div>
```

**Key attributes:**
- `role="combobox"`: Identifies as combo box pattern
- `aria-expanded`: Indicates if dropdown is open
- `aria-controls`: Links input to listbox
- `aria-activedescendant`: Points to currently highlighted option
- `role="listbox"`: Container for options
- `role="option"`: Individual suggestion items
- `aria-selected`: Marks highlighted option

#### Screen Reader Announcements

```typescript
// Announce result count
useEffect(() => {
  if (isOpen && suggestions.length > 0) {
    const announcement = `${suggestions.length} suggestions available`;
    announceToScreenReader(announcement);
  }
}, [suggestions, isOpen]);

const announceToScreenReader = (message: string) => {
  const announcer = document.createElement('div');
  announcer.setAttribute('aria-live', 'polite');
  announcer.className = 'sr-only';
  announcer.textContent = message;
  document.body.appendChild(announcer);
  
  setTimeout(() => {
    document.body.removeChild(announcer);
  }, 1000);
};
```

### Text Highlighting

Highlight matching portions of suggestions:

```typescript
const highlightMatch = (text: string, query: string): React.ReactNode => {
  if (!query) return text;
  
  const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, i) => 
    regex.test(part) ? (
      <mark key={i} className="highlight">{part}</mark>
    ) : (
      part
    )
  );
};

const escapeRegex = (str: string): string => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// Usage
<li>{highlightMatch(item.label, query)}</li>
```

### Caching Strategy

Avoid redundant API calls:

```typescript
const cacheRef = useRef<Map<string, Item[]>>(new Map());

const fetchWithCache = async (query: string): Promise<Item[]> => {
  const normalizedQuery = query.toLowerCase().trim();
  
  // Check cache
  if (cacheRef.current.has(normalizedQuery)) {
    return cacheRef.current.get(normalizedQuery)!;
  }
  
  // Fetch from API
  const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  const data = await response.json();
  
  // Store in cache
  cacheRef.current.set(normalizedQuery, data.suggestions);
  
  // Limit cache size
  if (cacheRef.current.size > 50) {
    const firstKey = cacheRef.current.keys().next().value;
    cacheRef.current.delete(firstKey);
  }
  
  return data.suggestions;
};
```

### Closing Behavior

Close dropdown on outside click:

```typescript
const containerRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);
```

### Performance Optimizations

#### 1. Virtual Scrolling (Large Lists)

For 100+ suggestions:

```typescript
import { FixedSizeList as List } from 'react-window';

const VirtualizedSuggestions = ({ suggestions, onSelect }) => {
  const Row = ({ index, style }) => {
    const item = suggestions[index];
    return (
      <div style={style} onClick={() => onSelect(item)}>
        {item.label}
      </div>
    );
  };

  return (
    <List
      height={300}
      itemCount={suggestions.length}
      itemSize={40}
      width="100%"
    >
      {Row}
    </List>
  );
};
```

#### 2. Minimum Character Threshold

Don't search for single characters:

```typescript
const MIN_QUERY_LENGTH = 2;

if (debouncedQuery.length < MIN_QUERY_LENGTH) {
  setSuggestions([]);
  setIsOpen(false);
  return;
}
```

#### 3. Request Deduplication

Prevent duplicate in-flight requests:

```typescript
const currentRequestRef = useRef<string | null>(null);

const fetchSuggestions = async (query: string) => {
  // Cancel if same request is already in flight
  if (currentRequestRef.current === query) {
    return;
  }
  
  currentRequestRef.current = query;
  
  try {
    const data = await api.search(query);
    
    // Only update if this is still the current request
    if (currentRequestRef.current === query) {
      setSuggestions(data);
    }
  } finally {
    if (currentRequestRef.current === query) {
      currentRequestRef.current = null;
    }
  }
};
```

### Edge Cases

#### 1. Empty Results

```typescript
{suggestions.length === 0 && !loading && query && (
  <div className="no-results">
    <p>No results found for "{query}"</p>
    <p className="hint">Try different keywords</p>
  </div>
)}
```

#### 2. Error States

```typescript
{error && (
  <div className="error-state" role="alert">
    <p>Failed to load suggestions</p>
    <button onClick={() => retryFetch()}>Retry</button>
  </div>
)}
```

#### 3. Long Loading Times

```typescript
const [loadTime, setLoadTime] = useState(0);

useEffect(() => {
  if (loading) {
    const timer = setInterval(() => {
      setLoadTime(prev => prev + 100);
    }, 100);
    
    return () => clearInterval(timer);
  } else {
    setLoadTime(0);
  }
}, [loading]);

{loading && loadTime > 1000 && (
  <p className="slow-loading">Still loading... This may take a moment.</p>
)}
```

## Code Example

```typescript
import React, { useState, useEffect, useRef, useCallback } from 'react';
import './AutoComplete.css';

interface Suggestion {
  id: string;
  label: string;
  description?: string;
  category?: string;
}

interface AutoCompleteProps {
  placeholder?: string;
  fetchSuggestions: (query: string) => Promise<Suggestion[]>;
  onSelect: (item: Suggestion) => void;
  minChars?: number;
  debounceMs?: number;
  maxSuggestions?: number;
  label?: string;
}

// Custom debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  placeholder = 'Search...',
  fetchSuggestions,
  onSelect,
  minChars = 2,
  debounceMs = 300,
  maxSuggestions = 10,
  label = 'Search',
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const cacheRef = useRef<Map<string, Suggestion[]>>(new Map());
  const abortControllerRef = useRef<AbortController | null>(null);
  
  const debouncedQuery = useDebounce(query, debounceMs);

  // Fetch suggestions
  useEffect(() => {
    if (!debouncedQuery.trim() || debouncedQuery.length < minChars) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const normalizedQuery = debouncedQuery.toLowerCase().trim();

    // Check cache
    if (cacheRef.current.has(normalizedQuery)) {
      setSuggestions(cacheRef.current.get(normalizedQuery)!);
      setIsOpen(true);
      return;
    }

    // Abort previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;
    setLoading(true);
    setError(null);

    const performSearch = async () => {
      try {
        const results = await fetchSuggestions(debouncedQuery);
        
        // Only update if not aborted
        if (!controller.signal.aborted) {
          const limitedResults = results.slice(0, maxSuggestions);
          cacheRef.current.set(normalizedQuery, limitedResults);
          setSuggestions(limitedResults);
          setIsOpen(true);
          setLoading(false);
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError('Failed to load suggestions');
          setLoading(false);
        }
      }
    };

    performSearch();

    return () => {
      controller.abort();
    };
  }, [debouncedQuery, minChars, maxSuggestions, fetchSuggestions]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setHighlightedIndex(-1);
    
    if (!value.trim()) {
      setIsOpen(false);
      setSuggestions([]);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen && suggestions.length > 0) {
          setIsOpen(true);
        }
        setHighlightedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;

      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;

      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
          handleSelect(suggestions[highlightedIndex]);
        }
        break;

      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;

      case 'Tab':
        setIsOpen(false);
        break;
    }
  };

  // Handle suggestion selection
  const handleSelect = useCallback((item: Suggestion) => {
    setQuery(item.label);
    setIsOpen(false);
    setHighlightedIndex(-1);
    onSelect(item);
    inputRef.current?.blur();
  }, [onSelect]);

  // Highlight matching text
  const highlightMatch = (text: string, query: string): React.ReactNode => {
    if (!query) return text;
    
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, i) => 
      regex.test(part) ? (
        <mark key={i} className="highlight">{part}</mark>
      ) : (
        part
      )
    );
  };

  // Clear input
  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  return (
    <div 
      ref={containerRef}
      className="autocomplete-container"
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-owns={isOpen ? 'suggestions-listbox' : undefined}
    >
      <label htmlFor="autocomplete-input" className="sr-only">
        {label}
      </label>
      
      <div className="input-wrapper">
        <input
          ref={inputRef}
          id="autocomplete-input"
          type="text"
          className="autocomplete-input"
          placeholder={placeholder}
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) {
              setIsOpen(true);
            }
          }}
          role="combobox"
          aria-autocomplete="list"
          aria-controls="suggestions-listbox"
          aria-activedescendant={
            highlightedIndex >= 0 ? `suggestion-${highlightedIndex}` : undefined
          }
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        
        {/* Loading indicator */}
        {loading && (
          <div className="loading-indicator" aria-hidden="true">
            <div className="spinner" />
          </div>
        )}
        
        {/* Clear button */}
        {query && !loading && (
          <button
            className="clear-btn"
            onClick={handleClear}
            aria-label="Clear search"
            type="button"
          >
            ✕
          </button>
        )}
      </div>

      {/* Suggestions dropdown */}
      {isOpen && (
        <div className="suggestions-dropdown">
          <ul
            id="suggestions-listbox"
            className="suggestions-list"
            role="listbox"
            aria-label="Suggestions"
          >
            {suggestions.length === 0 && !loading && query.length >= minChars && (
              <li className="no-results" role="option">
                <p>No results found for "{query}"</p>
                <p className="hint">Try different keywords</p>
              </li>
            )}
            
            {error && (
              <li className="error-message" role="alert">
                <p>{error}</p>
                <button 
                  onClick={() => setQuery(debouncedQuery)}
                  className="retry-btn"
                >
                  Retry
                </button>
              </li>
            )}
            
            {suggestions.map((item, index) => (
              <li
                key={item.id}
                id={`suggestion-${index}`}
                className={`suggestion-item ${
                  highlightedIndex === index ? 'highlighted' : ''
                }`}
                role="option"
                aria-selected={highlightedIndex === index}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                <div className="suggestion-content">
                  <span className="suggestion-label">
                    {highlightMatch(item.label, query)}
                  </span>
                  {item.description && (
                    <span className="suggestion-description">
                      {item.description}
                    </span>
                  )}
                </div>
                {item.category && (
                  <span className="suggestion-category">
                    {item.category}
                  </span>
                )}
              </li>
            ))}
          </ul>
          
          {/* Footer info */}
          {suggestions.length > 0 && (
            <div className="suggestions-footer">
              <span className="result-count">
                {suggestions.length} result{suggestions.length !== 1 ? 's' : ''}
              </span>
              <span className="keyboard-hint">
                ↑↓ to navigate, Enter to select, Esc to close
              </span>
            </div>
          )}
        </div>
      )}

      {/* Status for screen readers */}
      <div 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
      >
        {loading && 'Loading suggestions...'}
        {!loading && suggestions.length > 0 && isOpen && (
          `${suggestions.length} suggestions available`
        )}
        {error && `Error: ${error}`}
      </div>
    </div>
  );
};

// Usage Examples

function SearchCountries() {
  const fetchCountries = async (query: string): Promise<Suggestion[]> => {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${query}?fullText=false`
    );
    const data = await response.json();
    
    return data.slice(0, 10).map((country: any) => ({
      id: country.cca2,
      label: country.name.common,
      description: country.region,
      category: country.subregion,
    }));
  };

  const handleSelect = (country: Suggestion) => {
    console.log('Selected:', country);
  };

  return (
    <div className="demo">
      <h2>Search Countries</h2>
      <AutoComplete
        placeholder="Type a country name..."
        fetchSuggestions={fetchCountries}
        onSelect={handleSelect}
        minChars={2}
        debounceMs={300}
      />
    </div>
  );
}

function SearchUsers() {
  const fetchUsers = async (query: string): Promise<Suggestion[]> => {
    const response = await fetch(`/api/users/search?q=${query}`);
    const data = await response.json();
    
    return data.users.map((user: any) => ({
      id: user.id,
      label: user.name,
      description: user.email,
      category: user.role,
    }));
  };

  const handleSelect = (user: Suggestion) => {
    console.log('Selected user:', user);
  };

  return (
    <div className="demo">
      <h2>Search Users</h2>
      <AutoComplete
        placeholder="Search users..."
        fetchSuggestions={fetchUsers}
        onSelect={handleSelect}
        minChars={1}
        debounceMs={200}
      />
    </div>
  );
}

export default AutoComplete;
```

## CSS Styling

```css
/* Container */
.autocomplete-container {
  position: relative;
  width: 100%;
  max-width: 500px;
}

/* Input Wrapper */
.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.autocomplete-input {
  width: 100%;
  padding: 0.75rem 3rem 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
  background: white;
}

.autocomplete-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Loading Indicator */
.loading-indicator {
  position: absolute;
  right: 3rem;
  top: 50%;
  transform: translateY(-50%);
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #e0e0e0;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Clear Button */
.clear-btn {
  position: absolute;
  right: 0.75rem;
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

/* Suggestions Dropdown */
.suggestions-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-height: 400px;
  overflow-y: auto;
  animation: slideDown 0.2s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Suggestions List */
.suggestions-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Suggestion Item */
.suggestion-item {
  padding: 0.75rem 1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.15s;
  border-bottom: 1px solid #f0f0f0;
}

.suggestion-item:last-child {
  border-bottom: none;
}

.suggestion-item:hover,
.suggestion-item.highlighted {
  background: #f8f9fa;
}

.suggestion-item.highlighted {
  background: #e7f3ff;
}

.suggestion-content {
  flex: 1;
}

.suggestion-label {
  display: block;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.25rem;
}

.suggestion-label .highlight {
  background: #fef3c7;
  padding: 0 2px;
  border-radius: 2px;
  font-weight: 600;
}

.suggestion-description {
  display: block;
  font-size: 0.875rem;
  color: #666;
}

.suggestion-category {
  font-size: 0.75rem;
  color: #999;
  background: #f0f0f0;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin-left: 0.5rem;
}

/* No Results */
.no-results {
  padding: 2rem 1rem;
  text-align: center;
  color: #999;
}

.no-results p {
  margin: 0.5rem 0;
}

.no-results .hint {
  font-size: 0.875rem;
  color: #bbb;
}

/* Error Message */
.error-message {
  padding: 1rem;
  background: #fee;
  color: #c53030;
  text-align: center;
}

.retry-btn {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background: #f56565;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
}

.retry-btn:hover {
  background: #e53e3e;
}

/* Footer */
.suggestions-footer {
  padding: 0.5rem 1rem;
  background: #f8f9fa;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: #666;
}

.result-count {
  font-weight: 500;
}

.keyboard-hint {
  font-style: italic;
}

/* Screen Reader Only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .autocomplete-container {
    max-width: 100%;
  }
  
  .suggestions-dropdown {
    max-height: 300px;
  }
  
  .suggestions-footer {
    flex-direction: column;
    gap: 0.25rem;
    text-align: center;
  }
}
```

## Common Interview Follow-ups

1. **How do you handle keyboard navigation?**
   - Arrow keys to move through suggestions
   - Enter to select highlighted item
   - Escape to close dropdown
   - Tab to close and move to next element
   - Track highlightedIndex in state
   - Update aria-activedescendant for screen readers

2. **Why debounce the search?**
   - Prevents API call on every keystroke
   - Reduces server load
   - Better UX (waits for user to pause)
   - Typical delay: 200-500ms
   - Cancel previous requests with AbortController

3. **What about accessibility?**
   - Use proper ARIA roles (combobox, listbox, option)
   - aria-expanded, aria-activedescendant
   - Keyboard navigation support
   - Screen reader announcements (aria-live)
   - Sufficient color contrast
   - Focus management

4. **How to optimize performance?**
   - Cache search results
   - Virtualize long lists (react-window)
   - Set minimum character threshold
   - Limit max suggestions shown
   - Debounce API calls
   - Cancel in-flight requests

5. **How to handle race conditions?**
   - Use AbortController to cancel previous requests
   - Track request IDs and ignore stale responses
   - Only update state if request is still current
   - AbortController is the cleanest solution

6. **Should you show suggestions on focus or only after typing?**
   - **On focus**: Show recent searches or popular items
   - **After typing**: Only show relevant results
   - Best practice: Show on focus if you have meaningful defaults
   - Or wait until user types minChars (2-3 characters)

7. **How to test auto-complete?**
   - Test typing and suggestion appearance
   - Verify keyboard navigation works
   - Check ARIA attributes
   - Test debouncing (timers)
   - Verify caching behavior
   - Test error handling
   - Check screen reader compatibility
   - Test on mobile/touch devices

8. **What if the API is slow?**
   - Show loading spinner
   - Implement timeout with fallback
   - Cache results aggressively
   - Show "still loading" message after delay
   - Consider progressive loading (show partial results)
   - Optimize backend queries
