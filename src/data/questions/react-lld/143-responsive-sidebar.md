---
id: 143
category: React LLD
priority: null
tags: [responsive-design, sidebar, navigation, mobile]
---

# How would you design a responsive sidebar navigation component?

## Quick Answer

Use CSS media queries for responsive breakpoints, conditional rendering based on screen size, state management for open/closed toggle, smooth CSS transitions for animations, and React Router for navigation linking. Implement a hamburger menu for mobile and expandable submenus with proper accessibility.

## Detailed Explanation

### Responsive Strategy

#### Desktop vs Mobile Approach

**Desktop (>768px):**
- Sidebar always visible
- Full width with icons + text labels
- Submenus expand inline or as dropdowns
- Fixed position with scrollable content

**Mobile (<768px):**
- Sidebar hidden by default
- Hamburger menu triggers slide-in overlay
- Full-screen or partial overlay
- Touch-friendly tap targets (min 44px)

### State Management

Key states to manage:
1. **isOpen**: Controls sidebar visibility (especially on mobile)
2. **activeRoute**: Current selected route
3. **expandedMenus**: Which submenus are open (can be multiple or single)
4. **isMobile**: Detect viewport size for conditional rendering

### Animation Techniques

**CSS Transitions (Recommended):**
```css
.sidebar {
  transition: transform 0.3s ease-in-out;
}
.sidebar.closed {
  transform: translateX(-100%);
}
```

**Why not Framer Motion?**
- CSS transitions are lighter weight
- Better performance for simple slide animations
- Framer Motion overkill unless complex choreography needed

### Accessibility Considerations

- Use `<nav>` semantic element
- ARIA attributes: `aria-expanded`, `aria-label`
- Keyboard navigation: Escape to close, Tab through links
- Focus trap when sidebar is open on mobile
- Screen reader announcements for state changes

### Performance Optimization

- Use `useMediaQuery` hook to detect screen size efficiently
- Debounce resize events
- Lazy load submenu content if heavy
- Use CSS transforms instead of changing width/height (GPU accelerated)

## Code Example

```typescript
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { id: 'home', label: 'Home', icon: <HomeIcon />, path: '/' },
  { 
    id: 'products', 
    label: 'Products', 
    icon: <ProductIcon />,
    children: [
      { id: 'electronics', label: 'Electronics', path: '/products/electronics' },
      { id: 'clothing', label: 'Clothing', path: '/products/clothing' },
    ]
  },
  { id: 'settings', label: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

// Custom hook for responsive detection
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
};

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());
  const isMobile = useMediaQuery('(max-width: 768px)');
  const navigate = useNavigate();
  const location = useLocation();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location.pathname, isMobile]);

  const toggleMenu = (id: string) => {
    setExpandedMenus(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleNavigation = (path?: string) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <>
      {/* Hamburger Menu Button (Mobile Only) */}
      {isMobile && (
        <button 
          className="hamburger-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          ☰
        </button>
      )}

      {/* Sidebar */}
      <nav 
        className={`sidebar ${isOpen ? 'open' : 'closed'} ${isMobile ? 'mobile' : 'desktop'}`}
        aria-label="Main navigation"
      >
        <div className="sidebar-header">
          <h2>Logo</h2>
          {isMobile && (
            <button 
              className="close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              ×
            </button>
          )}
        </div>

        <ul className="menu-list">
          {menuItems.map(item => (
            <li key={item.id} className="menu-item">
              <button
                className={`menu-button ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => {
                  if (item.children) {
                    toggleMenu(item.id);
                  } else {
                    handleNavigation(item.path);
                  }
                }}
                aria-expanded={item.children ? expandedMenus.has(item.id) : undefined}
              >
                <span className="icon">{item.icon}</span>
                <span className="label">{item.label}</span>
                {item.children && (
                  <span className="arrow">
                    {expandedMenus.has(item.id) ? '▼' : '▶'}
                  </span>
                )}
              </button>

              {/* Submenu */}
              {item.children && expandedMenus.has(item.id) && (
                <ul className="submenu">
                  {item.children.map(child => (
                    <li key={child.id}>
                      <button
                        className={`submenu-button ${location.pathname === child.path ? 'active' : ''}`}
                        onClick={() => handleNavigation(child.path)}
                      >
                        {child.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;
```

## CSS Implementation

```css
/* Sidebar Base Styles */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background: #2c3e50;
  color: white;
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
  overflow-y: auto;
}

/* Desktop Sidebar */
.sidebar.desktop {
  width: 250px;
  transform: translateX(0);
}

/* Mobile Sidebar */
.sidebar.mobile {
  width: 280px;
  transform: translateX(-100%);
}

.sidebar.mobile.open {
  transform: translateX(0);
}

/* Menu Items */
.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-button {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  transition: background 0.2s;
}

.menu-button:hover {
  background: rgba(255, 255, 255, 0.1);
}

.menu-button.active {
  background: rgba(255, 255, 255, 0.2);
  border-left: 3px solid #3498db;
}

/* Submenu */
.submenu {
  list-style: none;
  padding-left: 20px;
  background: rgba(0, 0, 0, 0.2);
}

.submenu-button {
  width: 100%;
  padding: 10px 16px;
  background: transparent;
  border: none;
  color: #ecf0f1;
  cursor: pointer;
  text-align: left;
}

/* Mobile Overlay */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

/* Hamburger Button */
.hamburger-btn {
  position: fixed;
  top: 16px;
  left: 16px;
  padding: 8px 12px;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  z-index: 998;
}
```

## Common Interview Follow-ups

1. **How would you persist sidebar state across page reloads?**
   - Store `isOpen` and `expandedMenus` in localStorage
   - Restore on component mount using useEffect

2. **How to handle keyboard navigation?**
   - Add onKeyDown handlers for Arrow keys, Enter, Escape
   - Implement focus trapping for mobile overlay
   - Use tabIndex for proper tab order

3. **How to optimize for very large menus (100+ items)?**
   - Implement virtual scrolling (react-window)
   - Lazy load submenu content
   - Search/filter functionality

4. **How to support RTL (Right-to-Left) languages?**
   - Use CSS logical properties (left → inset-inline-start)
   - Flip transform direction for RTL
   - Mirror icons if directional
