---
id: 144
category: React LLD
priority: null
tags: [tabs, animation, state-management, transitions]
---

# How would you implement a tab component with animated switching?

## Quick Answer

Use state management for active tab index, conditional rendering of tab content, CSS transitions or Framer Motion for smooth animations, proper accessibility with ARIA roles, and keyboard navigation support. Structure tab data as an array of objects with id, label, and content.

## Detailed Explanation

### Tab Data Structure

```typescript
interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}
```

**Why this structure?**
- Unique IDs for keys and identification
- Flexible content (can be components, JSX, or strings)
- Optional disabled state for conditional tabs
- Easy to extend with icons, badges, etc.

### State Management Strategy

**Controlled vs Uncontrolled:**

**Controlled (Recommended for most cases):**
```typescript
const [activeTab, setActiveTab] = useState('tab1');
// Parent controls which tab is active
<Tabs activeTab={activeTab} onChange={setActiveTab} />
```

**Uncontrolled:**
```typescript
// Tabs manage their own state internally
<Tabs defaultTab="tab1" />
```

### Animation Approaches

#### 1. CSS Transitions (Simple)
```css
.tab-content {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}
.tab-content.active {
  opacity: 1;
}
```
✅ Lightweight, no dependencies
❌ Limited animation capabilities

#### 2. Framer Motion (Recommended for Rich Animations)
```typescript
<motion.div
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: -20 }}
>
  {content}
</motion.div>
```
✅ Smooth, complex animations
✅ Spring physics, gestures
❌ Adds bundle size (~30kb)

#### 3. CSS Keyframes
```css
@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
```
✅ No JavaScript needed
❌ Less flexible, harder to control programmatically

### Accessibility Requirements

- Use `role="tablist"` on container
- Use `role="tab"` on each tab button
- Use `role="tabpanel"` on content panels
- `aria-selected` indicates active tab
- `aria-controls` links tab to panel
- Keyboard support: Arrow keys, Home, End

### Performance Considerations

- **Lazy Loading**: Render tab content only when active
- **Keep Mounted**: Keep all tabs mounted but hide inactive ones (preserves state)
- **Unmount Inactive**: Unmount to save memory (loses state)
- **Memoization**: Use React.memo for tab panels if expensive to render

## Code Example

```typescript
import React, { useState, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Tabs.css';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  activeTab?: string;
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  animated?: boolean;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab: controlledActiveTab,
  defaultTab,
  onChange,
  animated = true,
}) => {
  // Support both controlled and uncontrolled modes
  const [internalActiveTab, setInternalActiveTab] = useState(
    defaultTab || tabs[0]?.id
  );

  const activeTab = controlledActiveTab ?? internalActiveTab;

  const handleTabChange = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (!tab || tab.disabled) return;

    if (!controlledActiveTab) {
      setInternalActiveTab(tabId);
    }
    onChange?.(tabId);
  };

  // Keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, currentIndex: number) => {
    let newIndex = currentIndex;

    switch (e.key) {
      case 'ArrowRight':
        newIndex = (currentIndex + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    e.preventDefault();
    const newTab = tabs[newIndex];
    if (newTab && !newTab.disabled) {
      handleTabChange(newTab.id);
    }
  };

  const activeTabIndex = tabs.findIndex(t => t.id === activeTab);
  const activeTabData = tabs[activeTabIndex];

  return (
    <div className="tabs-container">
      {/* Tab List */}
      <div 
        className="tab-list" 
        role="tablist"
        aria-label="Tabs"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            className={`tab-button ${tab.id === activeTab ? 'active' : ''} ${tab.disabled ? 'disabled' : ''}`}
            role="tab"
            aria-selected={tab.id === activeTab}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            tabIndex={tab.disabled ? -1 : 0}
            onClick={() => handleTabChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            disabled={tab.disabled}
          >
            {tab.label}
            {tab.id === activeTab && (
              <motion.div
                className="active-indicator"
                layoutId="activeTab"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="tab-panels">
        {animated ? (
          <AnimatePresence mode="wait">
            {activeTabData && (
              <motion.div
                key={activeTabData.id}
                className="tab-panel"
                role="tabpanel"
                id={`panel-${activeTabData.id}`}
                aria-labelledby={`tab-${activeTabData.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTabData.content}
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          tabs.map(tab => (
            <div
              key={tab.id}
              className={`tab-panel ${tab.id === activeTab ? 'active' : ''}`}
              role="tabpanel"
              id={`panel-${tab.id}`}
              aria-labelledby={`tab-${tab.id}`}
              hidden={tab.id !== activeTab}
            >
              {tab.content}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Usage Example
function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs: Tab[] = [
    {
      id: 'overview',
      label: 'Overview',
      content: <OverviewPanel />,
    },
    {
      id: 'features',
      label: 'Features',
      content: <FeaturesPanel />,
    },
    {
      id: 'pricing',
      label: 'Pricing',
      content: <PricingPanel />,
    },
    {
      id: 'reviews',
      label: 'Reviews',
      content: <ReviewsPanel />,
      disabled: true,
    },
  ];

  return (
    <Tabs
      tabs={tabs}
      activeTab={activeTab}
      onChange={setActiveTab}
      animated={true}
    />
  );
}

export default Tabs;
```

## CSS Styling

```css
.tabs-container {
  width: 100%;
}

.tab-list {
  display: flex;
  border-bottom: 2px solid #e0e0e0;
  gap: 8px;
}

.tab-button {
  position: relative;
  padding: 12px 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #666;
  transition: color 0.2s;
}

.tab-button:hover:not(.disabled) {
  color: #333;
}

.tab-button.active {
  color: #007bff;
  font-weight: 600;
}

.tab-button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.active-indicator {
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: #007bff;
}

.tab-panel {
  padding: 24px 0;
}
```

## Common Interview Follow-ups

1. **How would you handle dynamic tabs (add/remove)?**
   - Maintain tabs array in parent state
   - Provide callbacks: onAddTab, onRemoveTab
   - Ensure unique IDs for new tabs
   - Handle edge case: removing active tab

2. **How to persist active tab across page reloads?**
   - Store activeTab ID in URL query params
   - Or use localStorage/sessionStorage
   - Restore on component mount

3. **How to handle async tab content loading?**
   - Show loading skeleton/spinner per tab
   - Fetch data when tab becomes active
   - Cache fetched data to avoid re-fetching

4. **Performance with many tabs (50+)?**
   - Virtualize tab list if needed
   - Lazy load tab content
   - Unmount inactive tabs to save memory
   - Use React.memo for expensive panels
