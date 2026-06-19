---
id: 149
category: React LLD
priority: null
tags: [accordion, collapsible, animation, accessibility]
---

# How would you build a collapsible accordion component?

## Quick Answer

Use state to track which sections are open (single or multiple), CSS transitions for smooth expand/collapse animations with max-height trick, proper ARIA attributes for accessibility (aria-expanded, aria-controls), keyboard navigation support (Enter/Space to toggle, Arrow keys to navigate), and controlled/uncontrolled mode support. Animate height using CSS grid-template-rows or max-height for smooth transitions.

## Detailed Explanation

### Accordion Behavior Modes

#### Single-Active Mode
- Only one section can be open at a time
- Opening a new section closes the previous one
- Common in FAQs, settings panels

#### Multi-Active Mode
- Multiple sections can be open simultaneously
- Independent toggle for each section
- Common in documentation, navigation menus

### State Management

```typescript
// Single-active mode
const [activeSection, setActiveSection] = useState<string | null>('section1');

// Multi-active mode
const [activeSections, setActiveSections] = useState<Set<string>>(new Set(['section1']));
```

### Animation Techniques

#### Method 1: Max-Height Transition (Most Compatible)

```css
.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.accordion-content.open {
  max-height: 1000px; /* Large enough value */
}
```

**Pros:** ✅ Works everywhere, simple
**Cons:** ❌ Need to guess max-height, not truly dynamic

#### Method 2: Grid Template Rows (Modern, Recommended)

```css
.accordion-content {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease-out;
}

.accordion-content.open {
  grid-template-rows: 1fr;
}

.accordion-inner {
  overflow: hidden;
}
```

**Pros:** ✅ Truly dynamic height, no guessing
**Cons:** ❌ Not supported in older browsers

#### Method 3: Framer Motion (Rich Animations)

```typescript
<motion.div
  initial={{ height: 0 }}
  animate={{ height: isOpen ? 'auto' : 0 }}
  transition={{ duration: 0.3 }}
>
  {content}
</motion.div>
```

**Pros:** ✅ Smooth, spring physics, gestures
**Cons:** ❌ Adds bundle size

### Accessibility Requirements

**ARIA Attributes:**
- `role="region"` on content panels
- `aria-expanded` on trigger buttons (true/false)
- `aria-controls` linking button to panel ID
- `aria-labelledby` linking panel to button ID

**Keyboard Navigation:**
- **Enter/Space**: Toggle section
- **Arrow Down**: Move to next header
- **Arrow Up**: Move to previous header
- **Home**: Move to first header
- **End**: Move to last header
- **Tab**: Navigate through interactive elements

**Screen Reader Support:**
- Announce expanded/collapsed state
- Proper heading hierarchy (h2, h3, etc.)
- Focus management when opening sections

### Performance Considerations

1. **Lazy Content Rendering**
   - Only render content when section is open
   - Saves memory for complex content
   - Trade-off: slight delay on first open

2. **Keep Mounted vs Unmount**
   - **Keep mounted**: Preserves form state, scroll position
   - **Unmount**: Frees memory, fresh state each time

3. **Animation Performance**
   - Use CSS transforms instead of layout properties
   - GPU-accelerated properties: transform, opacity
   - Avoid animating height directly (causes reflow)

### Controlled vs Uncontrolled

**Controlled (Parent manages state):**
```typescript
<Accordion
  activeSections={activeSections}
  onChange={setActiveSections}
>
  {/* items */}
</Accordion>
```

**Uncontrolled (Internal state):**
```typescript
<Accordion defaultActive={['section1']}>
  {/* items */}
</Accordion>
```

### Common Pitfalls

1. **Nested Accordions**
   - Stop event propagation
   - Unique IDs for nested items
   - Careful with keyboard navigation

2. **Dynamic Content Height**
   - Content changes after open (async data)
   - Recalculate height or use grid method

3. **Scroll Position**
   - Section opens below viewport
   - Scroll into view smoothly

4. **Focus Management**
   - Focus moves unexpectedly
   - Trap focus within open section if needed

## Code Example

```typescript
import React, { useState, useRef, KeyboardEvent, useCallback } from 'react';
import './Accordion.css';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  activeSections?: string[];
  defaultActive?: string[];
  onChange?: (activeIds: string[]) => void;
  allowMultiple?: boolean;
  animated?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  activeSections: controlledActive,
  defaultActive = [],
  onChange,
  allowMultiple = false,
  animated = true,
}) => {
  // Support both controlled and uncontrolled modes
  const [internalActive, setInternalActive] = useState<string[]>(defaultActive);
  
  const activeSections = controlledActive ?? internalActive;
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const toggleSection = useCallback((id: string) => {
    const item = items.find(i => i.id === id);
    if (!item || item.disabled) return;

    let newActive: string[];

    if (allowMultiple) {
      // Multi-active mode
      const activeSet = new Set(activeSections);
      if (activeSet.has(id)) {
        activeSet.delete(id);
      } else {
        activeSet.add(id);
      }
      newActive = Array.from(activeSet);
    } else {
      // Single-active mode
      newActive = activeSections.includes(id) ? [] : [id];
    }

    // Update state
    if (!controlledActive) {
      setInternalActive(newActive);
    }
    
    onChange?.(newActive);
  }, [activeSections, allowMultiple, controlledActive, items, onChange]);

  // Keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let newIndex = currentIndex;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        newIndex = (currentIndex + 1) % items.length;
        break;
      case 'ArrowUp':
        e.preventDefault();
        newIndex = (currentIndex - 1 + items.length) % items.length;
        break;
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        newIndex = items.length - 1;
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        toggleSection(items[currentIndex].id);
        return;
      default:
        return;
    }

    // Focus new header
    const newItem = items[newIndex];
    if (newItem && !newItem.disabled) {
      itemRefs.current.get(newItem.id)?.focus();
    }
  };

  return (
    <div className="accordion" role="region">
      {items.map((item, index) => {
        const isActive = activeSections.includes(item.id);
        
        return (
          <div 
            key={item.id} 
            className={`accordion-item ${isActive ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
          >
            {/* Header/Button */}
            <button
              ref={el => {
                if (el) itemRefs.current.set(item.id, el);
              }}
              className="accordion-header"
              onClick={() => toggleSection(item.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-expanded={isActive}
              aria-controls={`panel-${item.id}`}
              id={`header-${item.id}`}
              disabled={item.disabled}
            >
              <span className="accordion-title">{item.title}</span>
              <span className={`accordion-icon ${isActive ? 'open' : ''}`}>
                ▼
              </span>
            </button>

            {/* Content Panel */}
            <div
              className={`accordion-content ${animated ? 'animated' : ''} ${isActive ? 'open' : ''}`}
              role="region"
              id={`panel-${item.id}`}
              aria-labelledby={`header-${item.id}`}
              hidden={!isActive}
            >
              <div className="accordion-inner">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Usage Examples

function FAQAccordion() {
  const faqItems: AccordionItem[] = [
    {
      id: 'faq1',
      title: 'What is React?',
      content: (
        <p>React is a JavaScript library for building user interfaces, developed by Facebook.</p>
      ),
    },
    {
      id: 'faq2',
      title: 'What are hooks?',
      content: (
        <p>Hooks are functions that let you use state and other React features in functional components.</p>
      ),
    },
    {
      id: 'faq3',
      title: 'What is JSX?',
      content: (
        <p>JSX is a syntax extension for JavaScript that looks similar to HTML.</p>
      ),
    },
  ];

  return (
    <Accordion
      items={faqItems}
      allowMultiple={false}
      animated={true}
    />
  );
}

function SettingsAccordion() {
  const [activeSections, setActiveSections] = useState(['general']);

  const settingsItems: AccordionItem[] = [
    {
      id: 'general',
      title: 'General Settings',
      content: <GeneralSettingsForm />,
    },
    {
      id: 'notifications',
      title: 'Notifications',
      content: <NotificationSettings />,
    },
    {
      id: 'privacy',
      title: 'Privacy',
      content: <PrivacySettings />,
    },
    {
      id: 'advanced',
      title: 'Advanced',
      content: <AdvancedSettings />,
      disabled: true,
    },
  ];

  return (
    <Accordion
      items={settingsItems}
      activeSections={activeSections}
      onChange={setActiveSections}
      allowMultiple={true}
      animated={true}
    />
  );
}

export default Accordion;
```

## CSS with Grid Animation

```css
.accordion {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.accordion-item {
  border-bottom: 1px solid #e0e0e0;
}

.accordion-item:last-child {
  border-bottom: none;
}

.accordion-item.disabled {
  opacity: 0.5;
}

/* Header Button */
.accordion-header {
  width: 100%;
  padding: 16px 20px;
  background: #f8f9fa;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  transition: background 0.2s;
}

.accordion-header:hover:not(:disabled) {
  background: #e9ecef;
}

.accordion-header:focus {
  outline: 2px solid #007bff;
  outline-offset: -2px;
}

.accordion-item.active .accordion-header {
  background: #e7f3ff;
}

/* Icon Rotation */
.accordion-icon {
  transition: transform 0.3s ease;
  font-size: 12px;
}

.accordion-icon.open {
  transform: rotate(180deg);
}

/* Content with Grid Animation */
.accordion-content {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease-out;
}

.accordion-content.open {
  grid-template-rows: 1fr;
}

.accordion-inner {
  overflow: hidden;
  padding: 0 20px;
}

.accordion-content.open .accordion-inner {
  padding: 16px 20px;
}

/* Alternative: Max-Height Animation (for older browsers) */
.accordion-content.animated {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.accordion-content.animated.open {
  max-height: 1000px;
}
```

## Common Interview Follow-ups

1. **How to handle async content loading?**
   - Show skeleton loader inside accordion
   - Fetch data when section opens
   - Cache loaded data to avoid re-fetching

2. **How to animate height dynamically without knowing it?**
   - Use CSS grid-template-rows method (shown above)
   - Or measure content height with getBoundingClientRect()
   - Or use FLIP animation technique

3. **How to support nested accordions?**
   - Stop event propagation on nested headers
   - Use unique IDs (parent-child naming)
   - Careful with keyboard navigation scope

4. **How to persist open sections across page reloads?**
   - Store active section IDs in localStorage
   - Restore on component mount
   - Clear when user explicitly closes all

5. **Performance with 100+ accordion items?**
   - Virtualize the list (react-window)
   - Lazy render content only when open
   - Use React.memo for items
