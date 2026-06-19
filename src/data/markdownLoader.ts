export interface MarkdownQuestion {
  id: number;
  category: string;
  question: string;
  answer: string;
  explanation?: string;
  codeExample?: string;
  priority: 'high' | 'medium' | 'low' | null;
  tags?: string[];
  content: string; // Full markdown content
}

/**
 * Parse YAML frontmatter manually (browser-compatible)
 */
function parseFrontmatter(content: string): { data: Record<string, unknown>; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content };
  }
  
  const yamlString = match[1];
  const markdownContent = match[2];
  
  // Simple YAML parser for basic key-value pairs
  const data: Record<string, unknown> = {};
  const lines = yamlString.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    
    const colonIndex = trimmed.indexOf(':');
    if (colonIndex === -1) continue;
    
    const key = trimmed.substring(0, colonIndex).trim();
    let value: unknown = trimmed.substring(colonIndex + 1).trim();
    
    // Handle arrays like [tag1, tag2]
    if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map((v: string) => v.trim().replace(/^['"]|['"]$/g, ''));
    } else if (value === 'null') {
      value = null;
    } else if (value === 'true') {
      value = true;
    } else if (value === 'false') {
      value = false;
    } else if (typeof value === 'string' && !isNaN(Number(value)) && value !== '') {
      value = Number(value);
    } else if (typeof value === 'string') {
      // Remove quotes from strings
      value = value.replace(/^['"]|['"]$/g, '');
    }
    
    data[key] = value;
  }
  
  return { data, content: markdownContent };
}

/**
 * Load a single markdown question file
 */
export async function loadQuestionFromFile(fileContent: string): Promise<MarkdownQuestion> {
  const { data, content } = parseFrontmatter(fileContent);
  
  // Extract the first heading as the question
  const questionMatch = content.match(/^# (.+)$/m);
  const question = questionMatch ? questionMatch[1] : 'Unknown Question';
  
  // Extract quick answer (first paragraph after question)
  const answerRegex = new RegExp('## Quick Answer\\s*\\n\\s*\\n([\\s\\S]*?)(?=\\n##|\\n```|$)');
  const answerMatch = content.match(answerRegex);
  const answer = answerMatch ? answerMatch[1].trim() : '';
  
  // Extract detailed explanation
  const explanationRegex = /## Detailed Explanation\s*\n\s*\n([\s\S]*?)(?=\n## Code Example|$)/;
  const explanationMatch = content.match(explanationRegex);
  const explanation = explanationMatch ? explanationMatch[1].trim() : undefined;
  
  // Extract code example
  const codeRegex = /```typescript\s*\n([\s\S]*?)```/;
  const codeMatch = content.match(codeRegex);
  const codeExample = codeMatch ? codeMatch[1].trim() : undefined;
  
  return {
    id: Number(data.id),
    category: String(data.category || ''),
    question,
    answer,
    explanation,
    codeExample,
    priority: (data.priority as 'high' | 'medium' | 'low' | null) || null,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    content,
  };
}

/**
 * Load all questions from markdown files dynamically
 * This uses Vite's import.meta.glob for dynamic imports
 */
export async function loadAllMarkdownQuestions(section: 'backend' | 'lld' = 'lld'): Promise<MarkdownQuestion[]> {
  console.log(`=== Starting to load markdown questions for section: ${section} ===`);
  
  try {
    // Vite requires static string literals for import.meta.glob
    const backendModules = import.meta.glob('./questions/backend/**/*.md', { 
      eager: true,
      query: '?raw',
      import: 'default'
    });

    const lldModules = import.meta.glob('./questions/react-lld/**/*.md', { 
      eager: true,
      query: '?raw',
      import: 'default'
    });

    const questionModules = section === 'backend' ? backendModules : lldModules;
    
    console.log('questionModules type:', typeof questionModules);
    console.log('questionModules keys:', Object.keys(questionModules));
    
    const filePaths = Object.keys(questionModules);
    console.log('Found markdown file paths:', filePaths);
    console.log('Total files found:', filePaths.length);
    
    if (filePaths.length === 0) {
      console.warn(`⚠️ No markdown files found for section: ${section}! Check the directory.`);
      return [];
    }
  
  const questions: MarkdownQuestion[] = [];
  
  // Load each file (eager loading returns the content directly)
  for (const [path, module] of Object.entries(questionModules)) {
    try {
      console.log('Processing file:', path);
      const fileContent = module as string;
      console.log('File content length:', fileContent.length);
      const question = await loadQuestionFromFile(fileContent);
      console.log('✓ Loaded question:', question.id, '-', question.question.substring(0, 50));
      questions.push(question);
    } catch (error) {
      console.error(`✗ Failed to load question from ${path}:`, error);
    }
  }
  
  console.log('Total questions loaded successfully:', questions.length);
  
  // Sort by ID
  questions.sort((a, b) => a.id - b.id);
  
  return questions;
  } catch (error) {
    console.error('✗ Error loading markdown questions:', error);
    throw error;
  }
}
