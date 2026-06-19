# Markdown Questions Guide

This guide explains how to add and maintain interview questions using Markdown files.

## Directory Structure

```
src/data/questions/
├── react-lld/           # React Low-Level Design questions
│   ├── 141-toast-notification.md
│   ├── 142-comment-thread.md
│   └── ... (add more here)
├── react/               # Regular React questions (future)
├── nextjs/              # Next.js questions (future)
└── ... (other categories)
```

## Creating a New Question

### Step 1: Create a Markdown File

Create a new `.md` file in the appropriate category folder. Use the naming convention: `{id}-{short-name}.md`

Example: `143-responsive-sidebar.md`

### Step 2: Add Frontmatter

At the top of your file, add YAML frontmatter with metadata:

```yaml
---
id: 143
category: React LLD
priority: null  # or 'high', 'medium', 'low'
tags: [responsive-design, sidebar, navigation]
---
```

### Step 3: Write Your Question

Use this template:

```markdown
# How would you design a responsive sidebar navigation component?

## Quick Answer

One or two sentence summary of the answer.

## Detailed Explanation

Write your detailed explanation here using Markdown formatting.

### Subsection Title

- Bullet points work great
- **Bold** for emphasis
- `code` for inline code

## Code Example

```typescript
// Your TypeScript/React code here
const Sidebar = () => {
  return <nav>Sidebar Content</nav>;
};
```

## Common Interview Follow-ups

1. **Question 1?**
   - Answer point 1
   - Answer point 2

2. **Question 2?**
   - Answer...
```

## Benefits of Markdown Approach

✅ **No escaping issues** - Write code naturally without worrying about template literals
✅ **Easy to read** - Clean, readable format in any text editor
✅ **Rich formatting** - Use headings, lists, bold, italics, links, etc.
✅ **Syntax highlighting** - Code blocks are automatically highlighted
✅ **Version control friendly** - Easy to see changes in Git
✅ **Non-developer friendly** - Anyone can edit markdown files

## Viewing Questions

1. Start the dev server: `npm run dev`
2. Click "📝 React LLD (Markdown)" in the navigation
3. Your markdown questions will be rendered with proper formatting

## Tips

- Use descriptive filenames: `141-toast-notification.md` not `q1.md`
- Keep IDs unique across all question files
- Use tags to make questions searchable (future feature)
- Include common follow-up questions to prepare for interviews
- Add diagrams as images if needed: `![Diagram](./diagram.png)`

## Migration from questions.ts

To migrate existing questions from `questions.ts`:

1. Create a markdown file for each question
2. Copy the content into the markdown format
3. Remove the question from `questions.ts`
4. Test that it appears correctly in the app

## Future Enhancements

- [ ] Add search/filter by tags
- [ ] Add difficulty levels
- [ ] Add estimated reading time
- [ ] Export to PDF
- [ ] Add interactive code playgrounds
- [ ] Support for images and diagrams
