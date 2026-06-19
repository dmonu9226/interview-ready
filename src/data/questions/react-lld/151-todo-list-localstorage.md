---
id: 151
category: React LLD
priority: high
tags: [todo, localStorage, persistence, useEffect]
---

# How would you build a Todo List with localStorage persistence?

## Quick Answer

Create a todo list with CRUD operations (add, toggle, edit, delete) using useState for state management. Sync with localStorage using useEffect to persist data across page reloads. Handle edge cases like localStorage being disabled, quota exceeded, JSON parsing errors, and SSR environments. Implement proper cleanup, error boundaries, and optimistic UI updates for better user experience.

## Detailed Explanation

### Core Requirements

A production-ready todo list needs:
- **Add todos**: Input field with validation
- **Toggle completion**: Checkbox or click to mark done
- **Edit todos**: Inline editing or modal
- **Delete todos**: Remove with confirmation
- **Filter todos**: All/Active/Completed views
- **Persist data**: Save to localStorage
- **Handle errors**: Graceful degradation

### localStorage Integration Strategy

#### Basic Sync Pattern

```typescript
const [todos, setTodos] = useState<Todo[]>(() => {
  // Initialize from localStorage
  const saved = localStorage.getItem('todos');
  return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
  // Persist changes
  localStorage.setItem('todos', JSON.stringify(todos));
}, [todos]);
```

**Problem:** This writes to localStorage on every render, even unrelated state changes.

#### Optimized Sync Pattern

```typescript
// Only sync when todos actually change
useEffect(() => {
  try {
    localStorage.setItem('todos', JSON.stringify(todos));
  } catch (error) {
    console.error('Failed to save todos:', error);
  }
}, [todos]);
```

### Edge Cases & Error Handling

#### 1. localStorage Disabled or Unavailable

Users can disable localStorage, or it may not exist (private browsing, certain browsers):

```typescript
const isLocalStorageAvailable = (): boolean => {
  try {
    const test = '__test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    return false;
  }
};

// Usage
const STORAGE_AVAILABLE = isLocalStorageAvailable();

const [todos, setTodos] = useState<Todo[]>(() => {
  if (!STORAGE_AVAILABLE) return [];
  
  try {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to load todos:', error);
    return [];
  }
});
```

#### 2. Quota Exceeded

localStorage has a ~5-10MB limit per domain:

```typescript
const saveToLocalStorage = (key: string, value: any): boolean => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      // Handle gracefully
      alert('Storage full! Please delete some items.');
      return false;
    }
    return false;
  }
};
```

#### 3. Corrupted Data

JSON parsing can fail if data is corrupted:

```typescript
const loadFromLocalStorage = <T,>(key: string, defaultValue: T): T => {
  if (!isLocalStorageAvailable()) return defaultValue;
  
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return defaultValue;
    
    const parsed = JSON.parse(saved);
    
    // Validate structure
    if (!Array.isArray(parsed)) {
      console.warn('Invalid todos data, resetting');
      return defaultValue;
    }
    
    return parsed as T;
  } catch (error) {
    console.error('Failed to parse todos:', error);
    return defaultValue;
  }
};
```

#### 4. Server-Side Rendering (SSR)

localStorage doesn't exist on the server:

```typescript
const [todos, setTodos] = useState<Todo[]>([]);
const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true);
  const saved = localStorage.getItem('todos');
  if (saved) {
    setTodos(JSON.parse(saved));
  }
}, []);

useEffect(() => {
  if (isMounted) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}, [todos, isMounted]);
```

Or use a custom hook that handles SSR:

```typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    return loadFromLocalStorage(key, initialValue);
  });

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    
    if (typeof window !== 'undefined') {
      saveToLocalStorage(key, valueToStore);
    }
  };

  return [storedValue, setValue] as const;
}
```

### Performance Optimizations

#### 1. Debounced Saves

Avoid writing to localStorage on every keystroke:

```typescript
const useDebouncedLocalStorage = (key: string, initialValue: any, delay: number = 300) => {
  const [value, setValue] = useState(initialValue);
  const debouncedValue = useDebounce(value, delay);

  useEffect(() => {
    if (debouncedValue !== undefined) {
      localStorage.setItem(key, JSON.stringify(debouncedValue));
    }
  }, [debouncedValue, key]);

  return [value, setValue] as const;
};
```

#### 2. Selective Persistence

Only save necessary data:

```typescript
// Don't save temporary UI state
const persistentTodos = useMemo(() => {
  return todos.map(({ id, text, completed }) => ({
    id,
    text,
    completed
  }));
}, [todos]);
```

#### 3. Batch Updates

Group multiple operations:

```typescript
const batchUpdateTodos = (updates: Array<(todos: Todo[]) => Todo[]>) => {
  setTodos(prev => {
    let result = prev;
    updates.forEach(update => {
      result = update(result);
    });
    return result;
  });
};

// Usage
batchUpdateTodos([
  todos => [...todos, newTodo],
  todos => todos.filter(t => t.id !== oldId)
]);
```

### Data Validation & Sanitization

#### Input Validation

```typescript
const validateTodo = (text: string): { valid: boolean; error?: string } => {
  const trimmed = text.trim();
  
  if (!trimmed) {
    return { valid: false, error: 'Todo cannot be empty' };
  }
  
  if (trimmed.length > 200) {
    return { valid: false, error: 'Todo must be less than 200 characters' };
  }
  
  return { valid: true };
};
```

#### XSS Prevention

Sanitize user input before rendering:

```typescript
import DOMPurify from 'dompurify';

const SafeTodoText = ({ text }: { text: string }) => {
  const sanitized = DOMPurify.sanitize(text);
  return <span dangerouslySetInnerHTML={{ __html: sanitized }} />;
};
```

Or avoid HTML entirely:

```typescript
// Just render as text (React escapes by default)
<div>{todo.text}</div>
```

### Advanced Features

#### Undo/Redo Support

```typescript
const useUndoableTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [history, setHistory] = useState<Todo[][]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const pushToHistory = (newTodos: Todo[]) => {
    setHistory(prev => [...prev.slice(0, currentIndex + 1), newTodos]);
    setCurrentIndex(prev => prev + 1);
  };

  const addTodo = (text: string) => {
    const newTodos = [...todos, createTodo(text)];
    setTodos(newTodos);
    pushToHistory(newTodos);
  };

  const undo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setTodos(history[currentIndex - 1]);
    }
  };

  const redo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setTodos(history[currentIndex + 1]);
    }
  };

  return { todos, addTodo, undo, redo, canUndo: currentIndex > 0, canRedo: currentIndex < history.length - 1 };
};
```

#### Bulk Operations

```typescript
const clearCompleted = () => {
  setTodos(prev => prev.filter(todo => !todo.completed));
};

const toggleAll = () => {
  const allCompleted = todos.every(t => t.completed);
  setTodos(prev => prev.map(t => ({ ...t, completed: !allCompleted })));
};
```

## Code Example

```typescript
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './TodoList.css';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

type FilterType = 'all' | 'active' | 'completed';

interface TodoListProps {
  storageKey?: string;
  maxTodos?: number;
}

// Utility: Generate unique ID
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Utility: Check localStorage availability
const isLocalStorageAvailable = (): boolean => {
  try {
    const test = '__test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};

// Utility: Load from localStorage with validation
const loadTodos = (key: string): Todo[] => {
  if (!isLocalStorageAvailable()) return [];
  
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return [];
    
    const parsed = JSON.parse(saved);
    
    // Validate structure
    if (!Array.isArray(parsed)) {
      console.warn('Invalid todos data format');
      return [];
    }
    
    // Validate each todo
    return parsed.filter((todo: any) => 
      todo && 
      typeof todo.id === 'string' && 
      typeof todo.text === 'string' && 
      typeof todo.completed === 'boolean'
    );
  } catch (error) {
    console.error('Failed to load todos:', error);
    return [];
  }
};

// Utility: Save to localStorage with error handling
const saveTodos = (key: string, todos: Todo[]): boolean => {
  if (!isLocalStorageAvailable()) return false;
  
  try {
    localStorage.setItem(key, JSON.stringify(todos));
    return true;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.error('Storage quota exceeded');
      return false;
    }
    console.error('Failed to save todos:', error);
    return false;
  }
};

const TodoList: React.FC<TodoListProps> = ({ 
  storageKey = 'todos',
  maxTodos = 1000 
}) => {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos(storageKey));
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Persist todos to localStorage
  useEffect(() => {
    const success = saveTodos(storageKey, todos);
    if (!success) {
      setError('Failed to save todos. Storage may be full.');
    }
  }, [todos, storageKey]);

  // Clear error after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Add new todo
  const addTodo = useCallback(() => {
    const text = inputValue.trim();
    
    if (!text) {
      setError('Todo cannot be empty');
      return;
    }
    
    if (text.length > 200) {
      setError('Todo must be less than 200 characters');
      return;
    }
    
    if (todos.length >= maxTodos) {
      setError(`Maximum ${maxTodos} todos allowed`);
      return;
    }
    
    const newTodo: Todo = {
      id: generateId(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    
    setTodos(prev => [...prev, newTodo]);
    setInputValue('');
    setError(null);
  }, [inputValue, todos.length, maxTodos]);

  // Toggle todo completion
  const toggleTodo = useCallback((id: string) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  // Delete todo
  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  // Start editing
  const startEdit = useCallback((todo: Todo) => {
    setEditingId(todo.id);
    setEditValue(todo.text);
  }, []);

  // Save edit
  const saveEdit = useCallback(() => {
    if (!editingId) return;
    
    const text = editValue.trim();
    if (!text) {
      setError('Todo cannot be empty');
      return;
    }
    
    setTodos(prev => 
      prev.map(todo => 
        todo.id === editingId ? { ...todo, text } : todo
      )
    );
    
    setEditingId(null);
    setEditValue('');
    setError(null);
  }, [editingId, editValue]);

  // Cancel edit
  const cancelEdit = useCallback(() => {
    setEditingId(null);
    setEditValue('');
  }, []);

  // Clear completed todos
  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }, []);

  // Toggle all todos
  const toggleAll = useCallback(() => {
    const allCompleted = todos.every(t => t.completed);
    setTodos(prev => 
      prev.map(todo => ({ ...todo, completed: !allCompleted }))
    );
  }, [todos]);

  // Handle Enter key in input
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  // Handle Enter key in edit mode
  const handleEditKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  // Filtered todos
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(t => !t.completed);
      case 'completed':
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  // Stats
  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const active = total - completed;
    return { total, completed, active };
  }, [todos]);

  return (
    <div className="todo-list-container">
      <h1>Todo List</h1>
      
      {/* Error Message */}
      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}
      
      {/* Input Section */}
      <div className="todo-input-section">
        <input
          type="text"
          className="todo-input"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          maxLength={200}
          aria-label="New todo"
        />
        <button 
          className="add-btn"
          onClick={addTodo}
          disabled={!inputValue.trim()}
        >
          Add
        </button>
      </div>
      
      {/* Stats and Actions */}
      {stats.total > 0 && (
        <div className="todo-stats">
          <span>{stats.active} item{stats.active !== 1 ? 's' : ''} left</span>
          
          <div className="todo-actions">
            <button 
              className="action-btn"
              onClick={toggleAll}
              title="Toggle all"
            >
              {todos.every(t => t.completed) ? 'Unmark All' : 'Mark All'}
            </button>
            
            {stats.completed > 0 && (
              <button 
                className="action-btn danger"
                onClick={clearCompleted}
              >
                Clear Completed ({stats.completed})
              </button>
            )}
          </div>
        </div>
      )}
      
      {/* Filter Tabs */}
      {stats.total > 0 && (
        <div className="filter-tabs" role="tablist">
          {(['all', 'active', 'completed'] as FilterType[]).map(f => (
            <button
              key={f}
              className={`filter-tab ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
              role="tab"
              aria-selected={filter === f}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === 'all' && ` (${stats.total})`}
              {f === 'active' && ` (${stats.active})`}
              {f === 'completed' && ` (${stats.completed})`}
            </button>
          ))}
        </div>
      )}
      
      {/* Todo List */}
      <ul className="todo-items" role="list">
        {filteredTodos.length === 0 ? (
          <li className="empty-state">
            {filter === 'all' 
              ? 'No todos yet. Add one above!' 
              : `No ${filter} todos`}
          </li>
        ) : (
          filteredTodos.map(todo => (
            <li 
              key={todo.id} 
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
              role="listitem"
            >
              {editingId === todo.id ? (
                // Edit Mode
                <div className="todo-edit">
                  <input
                    type="text"
                    className="edit-input"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyPress={handleEditKeyPress}
                    onBlur={saveEdit}
                    autoFocus
                    aria-label="Edit todo"
                  />
                  <button className="save-btn" onClick={saveEdit}>✓</button>
                  <button className="cancel-btn" onClick={cancelEdit}>✕</button>
                </div>
              ) : (
                // View Mode
                <>
                  <input
                    type="checkbox"
                    className="todo-checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
                  />
                  
                  <span 
                    className="todo-text"
                    onDoubleClick={() => startEdit(todo)}
                    title="Double-click to edit"
                  >
                    {todo.text}
                  </span>
                  
                  <div className="todo-actions-inline">
                    <button 
                      className="edit-btn"
                      onClick={() => startEdit(todo)}
                      aria-label={`Edit "${todo.text}"`}
                    >
                      ✏️
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => deleteTodo(todo.id)}
                      aria-label={`Delete "${todo.text}"`}
                    >
                      🗑️
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        )}
      </ul>
      
      {/* Footer Info */}
      <div className="todo-footer">
        <p className="hint">💡 Tip: Double-click a todo to edit it</p>
        <p className="storage-info">
          {isLocalStorageAvailable() 
            ? '✓ Autosaved to browser storage' 
            : '⚠ Storage unavailable - data won\'t persist'}
        </p>
      </div>
    </div>
  );
};

export default TodoList;
```

## CSS Styling

```css
.todo-list-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.todo-list-container h1 {
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
}

/* Error Message */
.error-message {
  padding: 0.75rem 1rem;
  background: #fee;
  border-left: 4px solid #f56565;
  color: #c53030;
  border-radius: 4px;
  margin-bottom: 1rem;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Input Section */
.todo-input-section {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.todo-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.todo-input:focus {
  outline: none;
  border-color: #667eea;
}

.add-btn {
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.add-btn:hover:not(:disabled) {
  background: #5568d3;
}

.add-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Stats */
.todo-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: #666;
}

.todo-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.4rem 0.8rem;
  background: transparent;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  background: #e0e0e0;
}

.action-btn.danger {
  color: #f56565;
  border-color: #f56565;
}

.action-btn.danger:hover {
  background: #fee;
}

/* Filter Tabs */
.filter-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.filter-tab {
  flex: 1;
  padding: 0.5rem;
  background: #f0f0f0;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-tab:hover {
  background: #e0e0e0;
}

.filter-tab.active {
  background: #667eea;
  color: white;
}

/* Todo Items */
.todo-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #999;
  font-style: italic;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  transition: background 0.2s;
}

.todo-item:hover {
  background: #f8f9fa;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: #999;
}

.todo-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.todo-text {
  flex: 1;
  font-size: 1rem;
  color: #333;
  cursor: pointer;
  user-select: none;
}

.todo-actions-inline {
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.todo-item:hover .todo-actions-inline {
  opacity: 1;
}

.edit-btn, .delete-btn {
  padding: 0.25rem 0.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 4px;
  transition: background 0.2s;
}

.edit-btn:hover {
  background: #e0e0e0;
}

.delete-btn:hover {
  background: #fee;
}

/* Edit Mode */
.todo-edit {
  display: flex;
  gap: 0.5rem;
  flex: 1;
}

.edit-input {
  flex: 1;
  padding: 0.5rem;
  border: 2px solid #667eea;
  border-radius: 4px;
  font-size: 1rem;
}

.save-btn, .cancel-btn {
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
}

.save-btn {
  background: #48bb78;
  color: white;
}

.save-btn:hover {
  background: #38a169;
}

.cancel-btn {
  background: #f56565;
  color: white;
}

.cancel-btn:hover {
  background: #e53e3e;
}

/* Footer */
.todo-footer {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  text-align: center;
}

.hint {
  font-size: 0.75rem;
  color: #999;
  margin: 0.5rem 0;
}

.storage-info {
  font-size: 0.75rem;
  color: #666;
  margin: 0.5rem 0;
}
```

## Common Interview Follow-ups

1. **How do you handle localStorage failures?**
   - Wrap in try-catch blocks
   - Check availability before use
   - Provide fallback (in-memory storage)
   - Show user-friendly error messages
   - Consider alternative storage (IndexedDB, cookies)

2. **What about security concerns?**
   - Never store sensitive data (passwords, tokens)
   - Sanitize user input to prevent XSS
   - Be aware localStorage is accessible via JavaScript
   - Consider encryption for sensitive data

3. **How to sync across multiple tabs?**
   - Listen to `storage` event: `window.addEventListener('storage', handler)`
   - Update state when other tabs modify localStorage
   - Use BroadcastChannel API for real-time sync
   - Consider using a service worker

4. **Performance with thousands of todos?**
   - Virtualize the list (react-window, react-virtual)
   - Lazy load todos from storage
   - Implement pagination or infinite scroll
   - Use Web Workers for heavy operations

5. **How to implement offline-first?**
   - Store todos in localStorage/IndexedDB
   - Sync with backend when online
   - Queue changes for later sync
   - Handle conflicts gracefully
   - Show sync status to user

6. **Testing strategies?**
   - Mock localStorage in tests
   - Test CRUD operations
   - Verify persistence across reloads
   - Test error scenarios (quota exceeded, disabled)
   - Test edge cases (empty input, special characters)
