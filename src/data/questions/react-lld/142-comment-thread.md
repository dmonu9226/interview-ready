---
id: 142
category: React LLD
priority: null
tags: [recursion, comments, nested-data, performance]
---

# How would you build a comment thread feature with nested replies?

## Quick Answer

Use recursive components to render nested comments, maintain a flat data structure with parent-child relationships via IDs, optimize with React.memo and useMemo, and use unique keys based on comment IDs.

## Detailed Explanation

### Data Structure Strategy

Two approaches for storing nested comments:

#### 1. Nested Tree Structure (Not Recommended)
- Comments contain children arrays
- Hard to update/delete deeply nested items
- Complex immutability updates

#### 2. Flat Structure with Parent References (Recommended) ✅
- All comments in a single array
- Each comment has an `id` and `parentId`
- Easy to query, update, and delete
- Build tree on-the-fly for rendering

### Recursive Component Pattern

- Create a Comment component that renders itself for children
- Base case: No children = stop recursion
- Pass depth level for indentation styling
- Limit nesting depth if needed (e.g., max 5 levels)

### Performance Optimization

1. **React.memo**: Prevent re-render of unchanged comments
2. **useMemo**: Cache filtered children to avoid recalculating
3. **Virtual Scrolling**: For very long threads (react-window)
4. **Lazy Loading**: Load replies on-demand ("Show replies" button)
5. **Pagination**: Load comments in batches

### Key Management

- Always use stable, unique IDs (from database)
- Never use array index as key for dynamic lists
- Keys help React identify which items changed

### State Management

- Store all comments in a flat array
- Use normalized state shape (like Redux normalizr)
- Optimistic updates for better UX

### Common Pitfalls

- Infinite recursion if circular references exist
- Performance issues with deep nesting (>10 levels)
- Re-rendering entire tree when one comment changes

## Code Example

```typescript
import React, { useMemo } from 'react';

// Type Definition
interface Comment {
  id: string;
  text: string;
  author: string;
  parentId: string | null;
  createdAt: Date;
}

// Flat data structure (from API)
const commentsData: Comment[] = [
  { id: '1', text: 'Great post!', author: 'Alice', parentId: null, createdAt: new Date() },
  { id: '2', text: 'Thanks!', author: 'Bob', parentId: '1', createdAt: new Date() },
  { id: '3', text: 'I agree', author: 'Charlie', parentId: '2', createdAt: new Date() },
];

// Recursive Comment Component
const CommentItem: React.FC<{
  comment: Comment;
  allComments: Comment[];
  depth?: number;
  onReply: (parentId: string) => void;
}> = React.memo(({ comment, allComments, depth = 0, onReply }) => {
  // Get direct children only
  const children = useMemo(() => {
    return allComments.filter(c => c.parentId === comment.id);
  }, [allComments, comment.id]);

  return (
    <div className={`comment depth-${depth}`} style={{ marginLeft: depth * 20 }}>
      <div className="comment-content">
        <strong>{comment.author}</strong>
        <p>{comment.text}</p>
        <button onClick={() => onReply(comment.id)}>Reply</button>
      </div>

      {/* Recursively render children */}
      {children.length > 0 && (
        <div className="comment-replies">
          {children.map(child => (
            <CommentItem
              key={child.id}
              comment={child}
              allComments={allComments}
              depth={depth + 1}
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  );
});

// Main Comment Thread Component
const CommentThread: React.FC<{
  comments: Comment[];
}> = ({ comments }) => {
  // Get root comments (no parent)
  const rootComments = useMemo(() => {
    return comments.filter(c => c.parentId === null);
  }, [comments]);

  const handleReply = (parentId: string) => {
    console.log(`Replying to comment: ${parentId}`);
    // Open reply form, make API call, etc.
  };

  return (
    <div className="comment-thread">
      {rootComments.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          allComments={comments}
          onReply={handleReply}
        />
      ))}
    </div>
  );
};

export default CommentThread;
```

## Common Interview Follow-ups

1. **How would you handle adding a new comment?**
   - Optimistic update: Add to UI immediately
   - Send API request in background
   - Rollback on error

2. **How to limit nesting depth?**
   - Check depth parameter in recursive component
   - Show "View more replies" button instead

3. **How to handle real-time updates?**
   - Use WebSockets or Server-Sent Events
   - Merge new comments into existing array
   - Maintain scroll position

4. **Performance with 1000+ comments?**
   - Implement virtual scrolling
   - Lazy load nested replies
   - Pagination or infinite scroll
