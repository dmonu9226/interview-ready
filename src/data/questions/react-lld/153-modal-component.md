---
id: 153
category: React LLD
priority: high
tags: [modal, portal, accessibility, focus-management]
---

# How would you build a reusable modal component?

## Quick Answer

Create a modal using React Portals to render outside the DOM hierarchy, implement proper focus management (trap focus within modal, restore focus on close), handle escape key and backdrop click to close, add ARIA attributes for accessibility (role="dialog", aria-modal, aria-labelledby), prevent body scroll when open, and support controlled/uncontrolled modes. Use CSS transitions for smooth open/close animations and ensure the modal is centered and responsive.

## Detailed Explanation

### Why Use React Portals?

**Problem:** Modals rendered inside nested components can have z-index and overflow issues:

```typescript
// ❌ Bad: Modal inside deeply nested component
<div className="app">
  <Header />
  <Main>
    <Sidebar>
      <Content>
        <Modal /> {/* Z-index conflicts, overflow hidden */}
      </Content>
    </Sidebar>
  </Main>
</div>
```

**Solution:** Portal renders modal at document root level:

```typescript
// ✅ Good: Modal rendered at root
ReactDOM.createPortal(
  <Modal />,
  document.getElementById('modal-root')
);
```

### Core Modal Features

#### 1. Portal Implementation

```typescript
import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div 
      ref={modalRef}
      className="modal-overlay"
      onClick={onClose}
    >
      <div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body // or document.getElementById('modal-root')
  );
};
```

#### 2. Focus Management

**Critical for accessibility:**

```typescript
useEffect(() => {
  if (!isOpen) return;

  // Save currently focused element
  const previousFocus = document.activeElement as HTMLElement;
  
  // Focus the modal or first focusable element
  const focusableElement = modalRef.current?.querySelector(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  ) as HTMLElement;
  
  focusableElement?.focus();

  // Cleanup: restore focus on close
  return () => {
    previousFocus?.focus();
  };
}, [isOpen]);
```

**Focus Trap:** Keep focus inside modal:

```typescript
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Tab') {
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (!focusableElements || focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    // Shift + Tab: wrap to last element
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    }
    // Tab: wrap to first element
    else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
};

useEffect(() => {
  if (isOpen) {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }
}, [isOpen]);
```

#### 3. Keyboard Handling

```typescript
useEffect(() => {
  if (!isOpen) return;

  const handleKeyDown = (e: KeyboardEvent) => {
    // Close on Escape
    if (e.key === 'Escape') {
      onClose();
    }
    
    // Trap focus with Tab
    if (e.key === 'Tab') {
      trapFocus(e);
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, [isOpen, onClose]);
```

#### 4. Prevent Body Scroll

```typescript
useEffect(() => {
  if (isOpen) {
    // Save scroll position
    const scrollY = window.scrollY;
    
    // Prevent scrolling
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    
    // Cleanup: restore scrolling
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };
  }
}, [isOpen]);
```

Or simpler approach:

```typescript
useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
  
  return () => {
    document.body.style.overflow = '';
  };
}, [isOpen]);
```

### Accessibility Requirements

#### ARIA Attributes

```typescript
<div
  className="modal-overlay"
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <div className="modal-content">
    <h2 id="modal-title">Modal Title</h2>
    <p id="modal-description">Modal description for screen readers</p>
    {/* Content */}
  </div>
</div>
```

**Key attributes:**
- `role="dialog"`: Identifies as a dialog window
- `aria-modal="true"`: Indicates modal behavior
- `aria-labelledby`: References the title element
- `aria-describedby`: References description (optional)

#### Screen Reader Support

```typescript
// Announce modal opening
useEffect(() => {
  if (isOpen) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'assertive');
    announcement.className = 'sr-only';
    announcement.textContent = 'Dialog opened';
    document.body.appendChild(announcement);
    
    return () => {
      document.body.removeChild(announcement);
    };
  }
}, [isOpen]);
```

### Animation & Transitions

#### CSS Transitions

```css
.modal-overlay {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.modal-overlay.open {
  opacity: 1;
}

.modal-content {
  transform: scale(0.9) translateY(-20px);
  transition: transform 0.3s ease;
}

.modal-overlay.open .modal-content {
  transform: scale(1) translateY(0);
}
```

#### Framer Motion (Advanced)

```typescript
import { motion, AnimatePresence } from 'framer-motion';

<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-overlay"
    >
      <motion.div
        initial={{ scale: 0.9, y: -20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: -20 }}
        className="modal-content"
      >
        {children}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
```

### Controlled vs Uncontrolled

#### Controlled Mode (Recommended)

```typescript
const [isModalOpen, setIsModalOpen] = useState(false);

return (
  <>
    <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
    <Modal 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false)}
    >
      <p>Modal content</p>
    </Modal>
  </>
);
```

#### Uncontrolled Mode

```typescript
interface ModalProps {
  defaultOpen?: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ defaultOpen = false, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return isOpen ? (
    <Portal>
      <div className="modal-overlay" onClick={() => setIsOpen(false)}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <button onClick={() => setIsOpen(false)}>Close</button>
          {children}
        </div>
      </div>
    </Portal>
  ) : null;
};
```

### Common Pitfalls

#### 1. Event Bubbling

**Problem:** Click inside modal closes it:

```typescript
// ❌ Bad: Click anywhere closes modal
<div onClick={onClose}>
  <div>{children}</div>
</div>

// ✅ Good: Only backdrop click closes
<div onClick={onClose}>
  <div onClick={e => e.stopPropagation()}>
    {children}
  </div>
</div>
```

#### 2. Multiple Modals

**Problem:** Opening second modal breaks first:

```typescript
// Solution: Use modal stack
const [modalStack, setModalStack] = useState<ModalConfig[]>([]);

const openModal = (config: ModalConfig) => {
  setModalStack(prev => [...prev, config]);
};

const closeModal = () => {
  setModalStack(prev => prev.slice(0, -1));
};
```

#### 3. Memory Leaks

**Problem:** Event listeners not cleaned up:

```typescript
// ✅ Always cleanup in useEffect
useEffect(() => {
  const handler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };
  
  document.addEventListener('keydown', handler);
  return () => document.removeEventListener('keydown', handler);
}, [onClose]);
```

#### 4. SSR Compatibility

**Problem:** `document` doesn't exist on server:

```typescript
const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted || !isOpen) return null;
  
  return ReactDOM.createPortal(/* ... */, document.body);
};
```

## Code Example

```typescript
import React, { useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  trapFocus?: boolean;
  size?: 'small' | 'medium' | 'large' | 'full';
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  trapFocus = true,
  size = 'medium',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Save and restore focus
  useEffect(() => {
    if (isOpen) {
      // Save current focus
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      // Focus modal container or first focusable element
      setTimeout(() => {
        const focusableElement = modalRef.current?.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as HTMLElement;
        
        focusableElement?.focus();
      }, 0);
    } else {
      // Restore previous focus
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  // Handle keyboard events
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Close on Escape
      if (closeOnEscape && e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Trap focus
      if (trapFocus && e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        // Shift + Tab: wrap to last element
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
        // Tab: wrap to first element
        else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, closeOnEscape, trapFocus]);

  // Prevent body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle overlay click
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnOverlayClick && e.target === e.currentTarget) {
        onClose();
      }
    },
    [closeOnOverlayClick, onClose]
  );

  // Don't render if closed
  if (!isOpen) return null;

  // Render via Portal
  return ReactDOM.createPortal(
    <div
      className={`modal-overlay ${size}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-describedby={description ? 'modal-description' : undefined}
    >
      <div 
        ref={modalRef}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || onClose) && (
          <div className="modal-header">
            {title && <h2 id="modal-title">{title}</h2>}
            {description && (
              <p id="modal-description" className="modal-description">
                {description}
              </p>
            )}
            <button
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        )}

        {/* Body */}
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    document.body
  );
};

// Usage Examples

function BasicModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Welcome"
        description="This is a basic modal example"
      >
        <p>Hello! This is modal content.</p>
        <button onClick={() => setIsOpen(false)}>Close</button>
      </Modal>
    </>
  );
}

function ConfirmationModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    console.log('Confirmed!');
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Delete Item</button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Delete"
        closeOnOverlayClick={false}
        size="small"
      >
        <p>Are you sure you want to delete this item? This action cannot be undone.</p>
        
        <div className="modal-actions">
          <button 
            className="btn-secondary"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button 
            className="btn-danger"
            onClick={handleConfirm}
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
}

function FormModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsOpen(false);
    setFormData({ name: '', email: '' });
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Add User</button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add New User"
        size="large"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          
          <div className="modal-actions">
            <button 
              type="button"
              className="btn-secondary"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default Modal;
```

## CSS Styling

```css
/* Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Modal Content */
.modal-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-height: 90vh;
  overflow-y: auto;
  animation: slideIn 0.3s ease;
  width: 100%;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Sizes */
.modal-overlay.small .modal-content {
  max-width: 400px;
}

.modal-overlay.medium .modal-content {
  max-width: 600px;
}

.modal-overlay.large .modal-content {
  max-width: 900px;
}

.modal-overlay.full .modal-content {
  max-width: 100%;
  height: 100vh;
  max-height: 100vh;
  border-radius: 0;
}

/* Header */
.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
  position: relative;
}

.modal-header h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  color: #333;
}

.modal-description {
  margin: 0;
  color: #666;
  font-size: 0.875rem;
}

.modal-close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #999;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: all 0.2s;
  line-height: 1;
}

.modal-close-btn:hover {
  background: #f0f0f0;
  color: #333;
}

.modal-close-btn:focus {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}

/* Body */
.modal-body {
  padding: 1.5rem;
}

/* Actions */
.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e0e0e0;
}

/* Buttons */
.btn-primary, .btn-secondary, .btn-danger {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5568d3;
}

.btn-secondary {
  background: #e0e0e0;
  color: #333;
}

.btn-secondary:hover {
  background: #d0d0d0;
}

.btn-danger {
  background: #f56565;
  color: white;
}

.btn-danger:hover {
  background: #e53e3e;
}

/* Form */
.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
}

/* Responsive */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 0;
  }
  
  .modal-overlay.small .modal-content,
  .modal-overlay.medium .modal-content,
  .modal-overlay.large .modal-content {
    max-width: 100%;
    max-height: 100vh;
    height: 100vh;
    border-radius: 0;
  }
  
  .modal-content {
    display: flex;
    flex-direction: column;
  }
  
  .modal-body {
    flex: 1;
    overflow-y: auto;
  }
}

/* Screen reader only */
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
```

## Common Interview Follow-ups

1. **Why use portals for modals?**
   - Avoids z-index conflicts with parent containers
   - Escapes overflow: hidden and transform contexts
   - Renders at document root level for proper stacking
   - Easier to manage global styles and positioning

2. **How do you handle focus management?**
   - Save previous focus before opening modal
   - Move focus to modal or first focusable element
   - Trap focus inside modal (Tab cycles through)
   - Restore focus to previous element on close
   - Essential for keyboard navigation and screen readers

3. **What are the accessibility requirements?**
   - `role="dialog"` and `aria-modal="true"`
   - `aria-labelledby` pointing to title
   - Keyboard support (Escape to close, Tab trapping)
   - Focus management (enter/exit)
   - Screen reader announcements
   - Sufficient color contrast

4. **How to prevent memory leaks?**
   - Always clean up event listeners in useEffect
   - Remove body style changes on unmount
   - Abort any pending operations
   - Clear timeouts and intervals

5. **How to handle multiple modals?**
   - Use a modal stack (array of modals)
   - Only top modal is interactive
   - Lower modals are visually dimmed
   - Close in reverse order (LIFO)
   - Or use a modal manager/context

6. **Performance considerations?**
   - Don't render modal when closed (conditional rendering)
   - Lazy load heavy modal content
   - Use CSS transitions instead of JavaScript animations
   - Debounce resize handlers
   - Virtualize long lists inside modals

7. **How to test modals?**
   - Test open/close functionality
   - Verify focus management
   - Test keyboard interactions (Escape, Tab)
   - Check ARIA attributes
   - Test backdrop click behavior
   - Verify body scroll prevention
   - Test with screen readers
