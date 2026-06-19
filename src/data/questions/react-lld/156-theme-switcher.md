---
id: 156
category: React LLD
priority: high
tags: [theme, dark-mode, context-api, css-variables]
---

# How would you build a theme switcher (dark/light mode)?

## Quick Answer

Implement theme switching using React Context API to manage theme state globally, CSS custom properties (variables) for dynamic styling, localStorage to persist user preference across sessions, and system preference detection (`prefers-color-scheme`) for initial theme. Handle the flash of unstyled content (FOUC) by setting theme before React hydrates, provide smooth transitions between themes, and ensure all UI elements respect the theme. Support multiple themes (light, dark, system) with easy extensibility.

## Detailed Explanation

### Theme Management Architecture

#### 1. Context API Setup

```typescript
import { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  actualTheme: 'light' | 'dark'; // Resolved theme (system -> light/dark)
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Load from localStorage or default to 'system'
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'system';
    }
    return 'system';
  });

  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');

  // Resolve system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updateTheme = () => {
      if (theme === 'system') {
        setActualTheme(mediaQuery.matches ? 'dark' : 'light');
      } else {
        setActualTheme(theme);
      }
    };

    updateTheme();
    
    // Listen for system theme changes
    mediaQuery.addEventListener('change', updateTheme);
    return () => mediaQuery.removeEventListener('change', updateTheme);
  }, [theme]);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', actualTheme);
  }, [actualTheme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, actualTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

#### 2. CSS Custom Properties (Variables)

Define theme colors as CSS variables:

```css
/* Light theme (default) */
:root, [data-theme="light"] {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --text-primary: #212529;
  --text-secondary: #6c757d;
  --border-color: #dee2e6;
  --accent-color: #667eea;
  --accent-hover: #5568d3;
  --shadow-color: rgba(0, 0, 0, 0.1);
  --card-bg: #ffffff;
  --input-bg: #ffffff;
  --error-color: #dc3545;
  --success-color: #28a745;
}

/* Dark theme */
[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --text-primary: #f8f9fa;
  --text-secondary: #adb5bd;
  --border-color: #495057;
  --accent-color: #8b9cf7;
  --accent-hover: #667eea;
  --shadow-color: rgba(0, 0, 0, 0.3);
  --card-bg: #2d2d2d;
  --input-bg: #3d3d3d;
  --error-color: #ff6b6b;
  --success-color: #51cf66;
}
```

**Usage in components:**

```css
.card {
  background: var(--card-bg);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 4px var(--shadow-color);
}

.button {
  background: var(--accent-color);
  color: white;
}

.button:hover {
  background: var(--accent-hover);
}
```

### Preventing Flash of Unstyled Content (FOUC)

**Problem:** Page loads with wrong theme before React hydrates.

**Solution 1: Inline Script in HTML**

Add this script in `<head>` before any CSS:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script>
    // Set theme immediately to prevent FOUC
    (function() {
      const theme = localStorage.getItem('theme') || 'system';
      
      if (theme === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
      } else {
        document.documentElement.setAttribute('data-theme', theme);
      }
    })();
  </script>
  <!-- Rest of head -->
</head>
```

**Solution 2: Server-Side Rendering (Next.js)**

```typescript
// In _document.tsx or layout component
export async function getInitialProps() {
  const theme = cookies().get('theme')?.value || 'system';
  return { theme };
}
```

### Smooth Theme Transitions

Add CSS transitions for smooth color changes:

```css
* {
  transition: background-color 0.3s ease, 
              color 0.3s ease, 
              border-color 0.3s ease,
              box-shadow 0.3s ease;
}

/* Exclude elements that shouldn't animate */
.no-transition {
  transition: none !important;
}
```

**Performance tip:** Only animate properties that don't trigger layout recalculation (color, background-color, opacity, transform).

### System Preference Detection

```typescript
// Check system preference
const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches 
    ? 'dark' 
    : 'light';
};

// Listen for changes
useEffect(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const handleChange = (e: MediaQueryListEvent) => {
    if (theme === 'system') {
      setActualTheme(e.matches ? 'dark' : 'light');
    }
  };
  
  mediaQuery.addEventListener('change', handleChange);
  return () => mediaQuery.removeEventListener('change', handleChange);
}, [theme]);
```

### Multiple Theme Support

Support more than just light/dark:

```typescript
type Theme = 'light' | 'dark' | 'blue' | 'green' | 'system';

const themeConfigs = {
  light: {
    '--bg-primary': '#ffffff',
    '--text-primary': '#212529',
    // ...
  },
  dark: {
    '--bg-primary': '#1a1a1a',
    '--text-primary': '#f8f9fa',
    // ...
  },
  blue: {
    '--bg-primary': '#0a1929',
    '--text-primary': '#e6f1ff',
    '--accent-color': '#64ffda',
    // ...
  },
};

const applyTheme = (themeName: string) => {
  const root = document.documentElement;
  const config = themeConfigs[themeName];
  
  Object.entries(config).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
};
```

### Accessibility Considerations

#### 1. Sufficient Contrast

Ensure text meets WCAG contrast ratios:

```css
/* Light theme */
[data-theme="light"] {
  --text-primary: #212529; /* Contrast ratio: 16.1:1 on white ✓ */
  --text-secondary: #6c757d; /* Contrast ratio: 5.7:1 on white ✓ */
}

/* Dark theme */
[data-theme="dark"] {
  --text-primary: #f8f9fa; /* Contrast ratio: 15.3:1 on #1a1a1a ✓ */
  --text-secondary: #adb5bd; /* Contrast ratio: 7.2:1 on #1a1a1a ✓ */
}
```

#### 2. Focus Indicators

```css
:focus-visible {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}

[data-theme="dark"] :focus-visible {
  outline-color: var(--accent-color);
  outline-offset: 2px;
}
```

#### 3. Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    animation: none !important;
  }
}
```

### Theme Toggle Component

```typescript
const ThemeToggle: React.FC = () => {
  const { theme, actualTheme, setTheme, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle" role="group" aria-label="Theme selection">
      {/* Simple toggle button */}
      <button
        onClick={toggleTheme}
        className="toggle-btn"
        aria-label={`Switch to ${actualTheme === 'light' ? 'dark' : 'light'} mode`}
        title={`Current: ${actualTheme} mode`}
      >
        {actualTheme === 'light' ? '🌙' : '☀️'}
      </button>

      {/* Advanced: Theme selector */}
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as Theme)}
        aria-label="Select theme"
        className="theme-select"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </div>
  );
};
```

### Testing Themes

```typescript
// Test theme switching
describe('Theme Switcher', () => {
  it('should toggle between light and dark', () => {
    render(<ThemeProvider><TestComponent /></ThemeProvider>);
    
    const toggle = screen.getByRole('button', { name: /switch/i });
    
    // Initially light
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    
    // Toggle to dark
    fireEvent.click(toggle);
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    
    // Toggle back to light
    fireEvent.click(toggle);
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  });

  it('should persist theme to localStorage', () => {
    render(<ThemeProvider><TestComponent /></ThemeProvider>);
    
    const toggle = screen.getByRole('button', { name: /switch/i });
    fireEvent.click(toggle);
    
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('should respect system preference', () => {
    // Mock system preference
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: dark)',
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
    
    render(<ThemeProvider><TestComponent /></ThemeProvider>);
    
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });
});
```

## Code Example

```typescript
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import './ThemeSwitcher.css';

type Theme = 'light' | 'dark' | 'system';
type ActualTheme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  actualTheme: ActualTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme Provider Component
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Initialize from localStorage or default to 'system'
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark' || saved === 'system') {
        return saved;
      }
    }
    return 'system';
  });

  const [actualTheme, setActualTheme] = useState<ActualTheme>('light');

  // Resolve theme based on preference
  useEffect(() => {
    const resolveTheme = () => {
      if (theme === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setActualTheme(prefersDark ? 'dark' : 'light');
      } else {
        setActualTheme(theme);
      }
    };

    resolveTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => resolveTheme();
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', actualTheme);
  }, [actualTheme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, actualTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// Theme Toggle Button Component
interface ThemeToggleProps {
  variant?: 'button' | 'select' | 'icon';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ variant = 'button' }) => {
  const { theme, actualTheme, setTheme, toggleTheme } = useTheme();

  if (variant === 'select') {
    return (
      <div className="theme-selector">
        <label htmlFor="theme-select" className="sr-only">
          Select theme
        </label>
        <select
          id="theme-select"
          value={theme}
          onChange={(e) => setTheme(e.target.value as Theme)}
          className="theme-select"
          aria-label="Select theme"
        >
          <option value="light">☀️ Light</option>
          <option value="dark">🌙 Dark</option>
          <option value="system">💻 System</option>
        </select>
      </div>
    );
  }

  if (variant === 'icon') {
    return (
      <button
        onClick={toggleTheme}
        className="theme-icon-btn"
        aria-label={`Switch to ${actualTheme === 'light' ? 'dark' : 'light'} mode`}
        title={`Current: ${actualTheme} mode (click to toggle)`}
      >
        {actualTheme === 'light' ? (
          <span className="icon" aria-hidden="true">🌙</span>
        ) : (
          <span className="icon" aria-hidden="true">☀️</span>
        )}
      </button>
    );
  }

  // Default: button with text
  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-btn"
      aria-label={`Switch to ${actualTheme === 'light' ? 'dark' : 'light'} mode`}
    >
      <span className="theme-icon" aria-hidden="true">
        {actualTheme === 'light' ? '🌙' : '☀️'}
      </span>
      <span className="theme-text">
        {actualTheme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </span>
    </button>
  );
};

// Demo App Component
const ThemeDemo: React.FC = () => {
  const { actualTheme } = useTheme();

  return (
    <div className="demo-container">
      <header className="demo-header">
        <h1>Theme Switcher Demo</h1>
        <ThemeToggle variant="icon" />
      </header>

      <main className="demo-content">
        <section className="demo-section">
          <h2>Current Theme</h2>
          <p>The current theme is: <strong>{actualTheme}</strong></p>
          <p>Theme is applied via CSS custom properties and data attributes.</p>
        </section>

        <section className="demo-section">
          <h2>Sample Cards</h2>
          <div className="card-grid">
            <div className="card">
              <h3>Card Title</h3>
              <p>This card adapts to the current theme automatically.</p>
              <button className="btn">Action Button</button>
            </div>
            
            <div className="card">
              <h3>Another Card</h3>
              <p>All colors are defined as CSS variables for easy theming.</p>
              <button className="btn btn-secondary">Secondary</button>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>Form Elements</h2>
          <form className="demo-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Enter your name" />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="you@example.com" />
            </div>
            
            <button type="submit" className="btn">Submit</button>
          </form>
        </section>

        <section className="demo-section">
          <h2>Theme Features</h2>
          <ul className="feature-list">
            <li>✓ Persists across sessions (localStorage)</li>
            <li>✓ Respects system preference</li>
            <li>✓ Smooth transitions between themes</li>
            <li>✓ No flash of unstyled content</li>
            <li>✓ Accessible color contrasts</li>
            <li>✓ Easy to extend with new themes</li>
          </ul>
        </section>
      </main>

      <footer className="demo-footer">
        <p>Current theme: {actualTheme} | Try toggling!</p>
      </footer>
    </div>
  );
};

// Main App with ThemeProvider
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ThemeDemo />
    </ThemeProvider>
  );
};

export default App;
```

## CSS Styling

```css
/* ========================================
   Theme Variables
   ======================================== */

/* Light Theme (Default) */
:root, [data-theme="light"] {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --bg-tertiary: #e9ecef;
  --text-primary: #212529;
  --text-secondary: #6c757d;
  --text-muted: #adb5bd;
  --border-color: #dee2e6;
  --accent-color: #667eea;
  --accent-hover: #5568d3;
  --accent-light: rgba(102, 126, 234, 0.1);
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --card-bg: #ffffff;
  --input-bg: #ffffff;
  --input-border: #ced4da;
  --error-color: #dc3545;
  --success-color: #28a745;
  --warning-color: #ffc107;
  --code-bg: #f8f9fa;
  --link-color: #667eea;
  --link-hover: #5568d3;
}

/* Dark Theme */
[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --bg-tertiary: #3d3d3d;
  --text-primary: #f8f9fa;
  --text-secondary: #adb5bd;
  --text-muted: #6c757d;
  --border-color: #495057;
  --accent-color: #8b9cf7;
  --accent-hover: #667eea;
  --accent-light: rgba(139, 156, 247, 0.15);
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.4);
  --card-bg: #2d2d2d;
  --input-bg: #3d3d3d;
  --input-border: #495057;
  --error-color: #ff6b6b;
  --success-color: #51cf66;
  --warning-color: #ffd43b;
  --code-bg: #2d2d2d;
  --link-color: #8b9cf7;
  --link-hover: #667eea;
}

/* ========================================
   Global Styles
   ======================================== */

* {
  transition: background-color 0.3s ease,
              color 0.3s ease,
              border-color 0.3s ease,
              box-shadow 0.3s ease;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
  }
}

/* ========================================
   Demo Layout
   ======================================== */

.demo-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.demo-header {
  background: var(--bg-secondary);
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
}

.demo-header h1 {
  margin: 0;
  font-size: 1.75rem;
  color: var(--text-primary);
}

.demo-content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.demo-footer {
  background: var(--bg-secondary);
  padding: 1rem 2rem;
  text-align: center;
  border-top: 1px solid var(--border-color);
  color: var(--text-secondary);
}

/* ========================================
   Sections
   ======================================== */

.demo-section {
  margin-bottom: 3rem;
}

.demo-section h2 {
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.demo-section p {
  color: var(--text-secondary);
  line-height: 1.8;
}

/* ========================================
   Cards
   ======================================== */

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.card h3 {
  color: var(--text-primary);
  margin: 0 0 0.75rem 0;
}

.card p {
  color: var(--text-secondary);
  margin: 0 0 1rem 0;
}

/* ========================================
   Buttons
   ======================================== */

.btn {
  padding: 0.75rem 1.5rem;
  background: var(--accent-color);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
}

.btn:hover {
  background: var(--accent-hover);
}

.btn:active {
  transform: scale(0.98);
}

.btn-secondary {
  background: var(--bg-tertiary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background: var(--border-color);
}

/* ========================================
   Theme Toggle
   ======================================== */

.theme-toggle-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  color: var(--text-primary);
  transition: all 0.2s;
}

.theme-toggle-btn:hover {
  background: var(--border-color);
}

.theme-icon-btn {
  background: transparent;
  border: 2px solid var(--border-color);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.25rem;
  transition: all 0.2s;
}

.theme-icon-btn:hover {
  background: var(--bg-tertiary);
  border-color: var(--accent-color);
  transform: rotate(15deg);
}

.theme-select {
  padding: 0.5rem;
  background: var(--input-bg);
  border: 1px solid var(--input-border);
  border-radius: 6px;
  color: var(--text-primary);
  font-size: 0.875rem;
  cursor: pointer;
}

.theme-select:focus {
  outline: none;
  border-color: var(--accent-color);
}

/* ========================================
   Forms
   ======================================== */

.demo-form {
  max-width: 500px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  font-weight: 600;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  background: var(--input-bg);
  border: 1px solid var(--input-border);
  border-radius: 6px;
  color: var(--text-primary);
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px var(--accent-light);
}

.form-group input::placeholder {
  color: var(--text-muted);
}

/* ========================================
   Feature List
   ======================================== */

.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  padding: 0.5rem 0;
  color: var(--text-secondary);
  font-size: 1rem;
}

/* ========================================
   Utilities
   ======================================== */

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

/* ========================================
   Responsive
   ======================================== */

@media (max-width: 768px) {
  .demo-header {
    padding: 1rem;
  }
  
  .demo-header h1 {
    font-size: 1.25rem;
  }
  
  .demo-content {
    padding: 1rem;
  }
  
  .card-grid {
    grid-template-columns: 1fr;
  }
}
```

## Common Interview Follow-ups

1. **How do you prevent FOUC (Flash of Unstyled Content)?**
   - Add inline script in `<head>` before CSS loads
   - Set `data-theme` attribute immediately from localStorage
   - Use server-side rendering to set initial theme
   - Critical CSS should include theme variables
   - Consider using CSS `color-scheme` property

2. **Why use CSS custom properties instead of CSS-in-JS?**
   - **CSS Variables**: Native browser support, no JS needed for theme switch, better performance
   - **CSS-in-JS**: More flexible, scoped styles, dynamic values
   - CSS variables are simpler for theme switching, work without JavaScript
   - Can combine both approaches for complex scenarios

3. **How to handle accessibility with themes?**
   - Ensure sufficient color contrast (WCAG AA minimum 4.5:1)
   - Test with color blindness simulators
   - Provide focus indicators that work in both themes
   - Don't rely solely on color to convey information
   - Support `prefers-contrast` and `prefers-reduced-motion`

4. **What about performance?**
   - CSS variable changes are very fast (no reflow)
   - Avoid animating properties that trigger layout
   - Use `will-change` sparingly for animated elements
   - Minimize number of CSS variables
   - Cache theme in localStorage to avoid recalculating

5. **How to support more than 2 themes?**
   - Define separate variable sets for each theme
   - Use theme configuration objects
   - Apply variables dynamically based on selected theme
   - Consider HSL color manipulation for programmatic themes
   - Store theme presets for user customization

6. **Should you use Context API or state management libraries?**
   - **Context API**: Perfect for theme (low frequency updates)
   - **Redux/Zustand**: Overkill unless you have complex theme logic
   - **URL params**: Good for shareable theme links
   - Context is ideal because theme changes are infrequent

7. **How to test theme switching?**
   - Verify CSS variables change correctly
   - Check localStorage persistence
   - Test system preference detection
   - Verify no FOUC on page load
   - Test with different viewport sizes
   - Check accessibility (contrast ratios)
   - Simulate system theme changes

8. **What's the difference between `prefers-color-scheme` and manual toggle?**
   - `prefers-color-scheme`: OS-level setting, automatic
   - Manual toggle: User choice, persists across devices
   - Best practice: Respect system initially, allow override
   - "System" option combines both approaches
