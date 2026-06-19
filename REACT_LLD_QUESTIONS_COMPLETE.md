# React.js Low-Level Design Questions - Complete Guide

## Overview

This collection contains **8 essential React.js LLD questions** that every frontend developer should master for technical interviews. Each question includes detailed explanations, optimized code examples, best practices, and common interview follow-ups.

## Questions Included

### 1. Counter Component (ID: 150)
**File:** `150-counter-component.md`

**Key Concepts:**
- State management with useState
- Optimization with useCallback and useMemo
- Functional state updates to avoid stale closures
- React.memo for preventing unnecessary re-renders
- Edge cases: rapid clicks, min/max limits, negative values

**What Interviewers Look For:**
- Understanding of referential equality
- When to use useCallback vs when not to
- Proper handling of state dependencies
- Performance optimization awareness

---

### 2. Todo List with localStorage (ID: 151)
**File:** `151-todo-list-localstorage.md`

**Key Concepts:**
- CRUD operations (Create, Read, Update, Delete)
- localStorage persistence with useEffect
- Error handling: disabled storage, quota exceeded, corrupted data
- SSR compatibility checks
- Data validation and sanitization

**What Interviewers Look For:**
- Understanding of useEffect lifecycle
- Error boundary implementation
- Graceful degradation strategies
- Security considerations (XSS prevention)

---

### 3. Search with Debouncing (ID: 152)
**File:** `152-search-debounce.md`

**Key Concepts:**
- Custom useDebounce hook implementation
- AbortController for canceling previous requests
- Race condition handling
- Result caching for performance
- Minimum character thresholds

**What Interviewers Look For:**
- Understanding of debounce vs throttle
- Race condition prevention strategies
- Performance optimization techniques
- Proper cleanup in useEffect

---

### 4. Modal Component (ID: 153)
**File:** `153-modal-component.md`

**Key Concepts:**
- React Portals for rendering outside DOM hierarchy
- Focus management (trap focus, restore on close)
- Keyboard handling (Escape to close, Tab trapping)
- ARIA attributes for accessibility
- Preventing body scroll

**What Interviewers Look For:**
- Accessibility knowledge (WCAG compliance)
- Focus management expertise
- Understanding of event bubbling
- Memory leak prevention

---

### 5. Infinite Scroll Component (ID: 154)
**File:** `154-infinite-scroll.md`

**Key Concepts:**
- Intersection Observer API
- Loading states and error handling
- Virtualization for performance (react-window)
- Caching strategies
- Retry mechanisms with exponential backoff

**What Interviewers Look For:**
- Modern browser API knowledge
- Performance optimization skills
- Memory management awareness
- UX considerations (skeleton loaders, empty states)

---

### 6. Form with Validation (ID: 155)
**File:** `155-form-validation.md`

**Key Concepts:**
- Controlled components pattern
- Real-time validation (on change + blur)
- Async validation (username availability)
- Password strength indicators
- Field dependencies (confirm password)

**What Interviewers Look For:**
- Understanding of controlled vs uncontrolled
- Validation strategy (when to validate)
- Accessibility (aria-invalid, aria-describedby)
- User experience considerations

---

### 7. Theme Switcher (ID: 156)
**File:** `156-theme-switcher.md`

**Key Concepts:**
- React Context API for global state
- CSS custom properties (variables)
- localStorage persistence
- System preference detection (prefers-color-scheme)
- Preventing FOUC (Flash of Unstyled Content)

**What Interviewers Look For:**
- Context API understanding
- CSS architecture knowledge
- Accessibility (color contrast, reduced motion)
- Performance optimization

---

### 8. Auto-Complete Component (ID: 157)
**File:** `157-autocomplete.md`

**Key Concepts:**
- Debounced API calls
- Keyboard navigation (arrow keys, Enter, Escape)
- ARIA attributes (combobox, listbox, option)
- Text highlighting for matches
- Caching and request deduplication

**What Interviewers Look For:**
- Accessibility expertise (ARIA patterns)
- Keyboard interaction handling
- Performance optimization
- Edge case handling (empty results, errors)

---

## Common Patterns Across All Questions

### 1. Clean Code Structure
- Separation of concerns (logic vs UI)
- Reusable custom hooks
- TypeScript interfaces for type safety
- Meaningful variable and function names

### 2. Proper State Management
- useState for local state
- useContext for shared state
- useRef for mutable values without re-renders
- Proper dependency arrays in useEffect

### 3. Performance Considerations
- useCallback for stable function references
- useMemo for expensive calculations
- React.memo for preventing re-renders
- Debouncing and throttling
- Caching strategies

### 4. Error Handling
- Try-catch blocks for async operations
- User-friendly error messages
- Fallback UI for error states
- Retry mechanisms

### 5. Accessibility Basics
- Semantic HTML elements
- ARIA attributes where needed
- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast

### 6. Testing Approach
- Unit tests for logic
- Integration tests for component interactions
- Accessibility testing
- Edge case coverage
- Performance testing

---

## How to Use This Guide

### For Interview Preparation

1. **Study One Question Per Day**
   - Read the detailed explanation
   - Understand the code example
   - Practice implementing from scratch
   - Review common follow-up questions

2. **Build From Memory**
   - After studying, try to rebuild without looking
   - Compare your solution with the provided example
   - Identify gaps in understanding

3. **Explain Out Loud**
   - Practice explaining your approach
   - Discuss trade-offs and alternatives
   - Anticipate follow-up questions

4. **Code Reviews**
   - Review your own code critically
   - Identify optimization opportunities
   - Check for accessibility issues
   - Verify error handling

### For Teaching Others

1. **Start with Basics**
   - Explain core concepts first
   - Build incrementally (simple → complex)
   - Show common mistakes and fixes

2. **Live Coding Sessions**
   - Code together in real-time
   - Explain thought process
   - Encourage questions

3. **Pair Programming**
   - Alternate driver/navigator roles
   - Discuss design decisions
   - Review each other's code

---

## Additional Resources

### React Documentation
- [React Hooks](https://react.dev/reference/react)
- [Performance Optimization](https://react.dev/learn/render-and-commit)
- [Accessibility](https://react.dev/learn/accessibility)

### Related Topics
- Custom Hooks patterns
- React performance profiling
- Testing with Jest and React Testing Library
- TypeScript with React
- State management (Context, Redux, Zustand)

### Practice Platforms
- LeetCode (React problems)
- Frontend Mentor
- Codewars
- HackerRank

---

## Interview Tips

### Before the Interview
- ✅ Review all 8 questions thoroughly
- ✅ Practice coding without IDE assistance
- ✅ Prepare explanations for design decisions
- ✅ Understand trade-offs of different approaches
- ✅ Review accessibility guidelines (WCAG)

### During the Interview
- ✅ Clarify requirements before coding
- ✅ Start with simple working solution
- ✅ Optimize incrementally
- ✅ Explain your thought process
- ✅ Ask questions if unsure
- ✅ Test edge cases
- ✅ Mention accessibility considerations

### Common Mistakes to Avoid
- ❌ Ignoring error handling
- ❌ Forgetting cleanup in useEffect
- ❌ Not considering accessibility
- ❌ Over-engineering simple solutions
- ❌ Ignoring performance implications
- ❌ Hard-coding values that should be props
- ❌ Not handling loading states

---

## Summary

These 8 React.js LLD questions cover the most commonly asked patterns in frontend interviews:

1. **State Management** - Counter, Todo List, Form
2. **Performance** - Debounce, Infinite Scroll, Memoization
3. **Accessibility** - Modal, Auto-complete, Form
4. **User Experience** - Theme Switcher, Loading States, Error Handling
5. **API Integration** - Search, Auto-complete, Infinite Scroll

Master these patterns, and you'll be well-prepared for any React LLD interview question!

---

**Last Updated:** June 2026  
**Total Questions:** 8 comprehensive LLD problems  
**Files Created:** 150-157 in `/src/data/questions/react-lld/`
