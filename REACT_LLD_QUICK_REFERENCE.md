# React LLD Quick Reference Card

## 📱 All 9 Questions at a Glance

### 1️⃣ Toast Notification System (Q141)
**Pattern:** Context API + Queue Management  
**Key Hook:** `useCallback` for stable functions  
**Animation:** CSS transitions  
**Challenge:** Auto-dismiss with cleanup

```typescript
const addToast = useCallback((msg, type) => {
  const id = Date.now();
  setToasts(prev => [...prev, { id, msg, type }]);
  setTimeout(() => removeToast(id), 3000);
}, []);
```

---

### 2️⃣ Comment Thread (Q142)
**Pattern:** Recursive Components  
**Data Structure:** Flat array with parentId  
**Optimization:** `React.memo` + `useMemo`  
**Challenge:** Prevent infinite recursion

```typescript
const children = useMemo(() => 
  allComments.filter(c => c.parentId === comment.id),
  [allComments, comment.id]
);
```

---

### 3️⃣ Responsive Sidebar (Q143)
**Pattern:** Media Queries + Conditional Rendering  
**Hook:** Custom `useMediaQuery`  
**Animation:** CSS transforms  
**Challenge:** Mobile overlay with focus trap

```typescript
const isMobile = useMediaQuery('(max-width: 768px)');
// Transform: translateX(-100%) for hide
```

---

### 4️⃣ Tab Component (Q144)
**Pattern:** Controlled/Uncontrolled State  
**Animation:** Framer Motion `<AnimatePresence>`  
**Accessibility:** ARIA roles (tablist, tab, tabpanel)  
**Challenge:** Keyboard navigation

```typescript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
>
```

---

### 5️⃣ Data Table (Q145)
**Pattern:** Filter → Sort → Paginate Pipeline  
**Optimization:** `useMemo` for expensive ops  
**Scale:** Virtualization for 10k+ rows  
**Challenge:** Multi-column sorting

```typescript
const filtered = useMemo(() => data.filter(...), [data, filters]);
const sorted = useMemo(() => filtered.sort(...), [filtered, sortConfig]);
```

---

### 6️⃣ Like Button (Q146)
**Pattern:** Optimistic Updates  
**Strategy:** Update UI → API call → Rollback on error  
**Race Condition:** Request ID tracking  
**Challenge:** Instant feedback with safety

```typescript
// Optimistic update
setLiked(true);
try {
  await api.like();
} catch {
  setLiked(false); // Rollback
}
```

---

### 7️⃣ Live Chat (Q147)
**Pattern:** WebSocket + Real-time State  
**Features:** Typing indicators, auto-scroll  
**Reconnection:** Exponential backoff  
**Challenge:** Message ordering & duplicates

```typescript
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  setMessages(prev => [...prev, data]);
};
```

---

### 8️⃣ Rate Limiter (Q148)
**Pattern:** Debounce vs Throttle vs Token Bucket  
**Hook:** Custom `useRateLimiter`  
**Storage:** `useRef` for timestamps  
**Challenge:** Accurate countdown timers

```typescript
// Throttle: Execute max once per interval
if (now - lastExec < limitMs) return;
lastExec = now;
execute();
```

---

### 9️⃣ Accordion (Q149)
**Pattern:** Single/Multi-active Modes  
**Animation:** CSS grid-template-rows  
**Accessibility:** aria-expanded, keyboard nav  
**Challenge:** Dynamic height animation

```css
.accordion-content {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s;
}
.accordion-content.open {
  grid-template-rows: 1fr;
}
```

---

## 🎯 Common Patterns Across All Questions

### State Management
- **Context API** for global state (Toast, Theme)
- **useState** for local component state
- **useRef** for non-UI state (timestamps, timers)
- **useReducer** for complex state logic

### Performance Optimization
- **React.memo** - Prevent unnecessary re-renders
- **useMemo** - Cache expensive calculations
- **useCallback** - Stable function references
- **Virtualization** - Large lists (react-window)

### Animation Techniques
1. **CSS Transitions** - Simple, lightweight
2. **CSS Grid** - Dynamic height (modern)
3. **Framer Motion** - Rich, complex animations
4. **CSS Keyframes** - Declarative animations

### Accessibility Checklist
- ✅ Semantic HTML (`<nav>`, `<button>`, `<table>`)
- ✅ ARIA attributes (`aria-expanded`, `aria-controls`)
- ✅ Keyboard navigation (Enter, Space, Arrow keys)
- ✅ Focus management (visible focus indicators)
- ✅ Screen reader support (role, label)

### Error Handling Strategy
1. **Try-Catch** for async operations
2. **Rollback** optimistic updates on failure
3. **User Feedback** - Toast, inline errors
4. **Retry Logic** - Provide retry button
5. **Graceful Degradation** - Fallback UI

---

## 💡 Interview Tips

### When Asked to Design a Component:

1. **Clarify Requirements**
   - "Should it support mobile?"
   - "How many items maximum?"
   - "Any accessibility requirements?"

2. **Explain Your Approach**
   - "I'll use Context for global state..."
   - "For animations, I prefer CSS transitions because..."
   - "To handle large datasets, I'll implement virtualization..."

3. **Discuss Trade-offs**
   - "Redux adds complexity but scales better..."
   - "Client-side filtering is faster but uses more memory..."

4. **Mention Edge Cases**
   - "What if the API fails?"
   - "How do we handle rapid clicks?"
   - "What about offline mode?"

5. **Talk About Performance**
   - "I'll use React.memo to prevent..."
   - "For 1000+ items, virtualization is essential..."

---

## 🔥 Hot Topics in 2024 Interviews

1. **Optimistic Updates** - Better UX
2. **WebSocket/Real-time** - Live features
3. **Accessibility** - WCAG compliance
4. **Performance** - Core Web Vitals
5. **Type Safety** - TypeScript everywhere
6. **Server Components** - Next.js 13+
7. **State Management** - Zustand, Jotai trends
8. **Testing** - RTL, Cypress, Playwright

---

## 📚 Must-Know Hooks

| Hook | Use Case | Example |
|------|----------|---------|
| useState | Local state | `const [count, setCount] = useState(0)` |
| useEffect | Side effects | API calls, subscriptions |
| useContext | Global state | Theme, auth, toast |
| useRef | Persistent values | Timers, DOM refs |
| useMemo | Expensive calc | Filtered/sorted data |
| useCallback | Stable functions | Event handlers |
| useReducer | Complex state | Form state machines |
| custom hooks | Reusable logic | useDebounce, useWebSocket |

---

## 🚀 Quick Wins for Interviews

### 1. Always Mention Accessibility
> "I'll add ARIA attributes and keyboard navigation..."

### 2. Discuss Performance Early
> "For large datasets, I'd use virtualization..."

### 3. Show Error Handling Awareness
> "We should handle API failures gracefully..."

### 4. Think About Edge Cases
> "What happens if the user clicks rapidly?"

### 5. Explain Your Choices
> "I chose Context over Redux because..."

---

## 🎓 Study Plan (7 Days)

**Day 1:** Toast Notifications + Comment Threads  
**Day 2:** Responsive Sidebar + Tabs  
**Day 3:** Data Tables (filtering, sorting)  
**Day 4:** Optimistic Updates (Like Button)  
**Day 5:** Live Chat (WebSockets)  
**Day 6:** Rate Limiting + Accordion  
**Day 7:** Review all + Mock interviews

---

## ✅ Final Checklist Before Interview

- [ ] Understand all 9 patterns
- [ ] Can explain trade-offs
- [ ] Know when to use each pattern
- [ ] Comfortable with code examples
- [ ] Prepared for follow-up questions
- [ ] Can whiteboard solutions
- [ ] Practice explaining out loud

---

**Good luck with your interviews! You've got this! 🎉**
