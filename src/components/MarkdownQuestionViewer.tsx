import { useEffect, useState } from 'react';
import { loadAllMarkdownQuestions } from '../data/markdownLoader';
import type { MarkdownQuestion } from '../data/markdownLoader';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownQuestionCard: React.FC<{ 
  question: MarkdownQuestion;
  priority: Priority;
  onUpdatePriority: (id: number, priority: Priority) => void;
}> = ({ question, priority, onUpdatePriority }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPriorityColor = () => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Priority;
    onUpdatePriority(question.id, value || null);
  };

  return (
    <div className={`markdown-question-card ${getPriorityColor()}`}>
      <div className="card-header-compact">
        <span className="category-badge">{question.category}</span>
        <h3 className="question-text-inline">{question.question}</h3>
        <div className="priority-wrapper">
          <span className="priority-label">Priority:</span>
          <select
            value={priority || ''}
            onChange={handlePriorityChange}
            className="priority-select-compact"
            aria-label="Set priority"
          >
            <option value="">⚡ Priority</option>
            <option value="high">🔴 High</option>
            <option value="medium">🟡 Medium</option>
            <option value="low">🟢 Low</option>
          </select>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="toggle-btn-compact"
          aria-expanded={isExpanded}
        >
          {isExpanded ? '▲' : '▼'}
        </button>
      </div>

      {isExpanded && (
        <div className="answer-section">
          {/* Show quick answer if available, otherwise show first paragraph */}
          {question.answer ? (
            <>
              <h3 className="markdown-section-title">Quick Answer</h3>
              <div 
                className="markdown-answer-text"
                dangerouslySetInnerHTML={{ 
                  __html: question.answer.replace(/\n/g, '<br/>')
                }} 
              />
            </>
          ) : null}
          
          {/* Show detailed explanation if available, otherwise show full content */}
          {question.explanation ? (
            <>
              <h3 className="markdown-section-title">Detailed Explanation</h3>
              <div className="markdown-explanation">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {question.explanation}
                </ReactMarkdown>
              </div>
            </>
          ) : (
            <div className="markdown-explanation">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {question.content}
              </ReactMarkdown>
            </div>
          )}
          
          {question.codeExample && (
            <>
              <h3 className="markdown-section-title">Code Example</h3>
              <pre className="markdown-code-block">
                <code>{question.codeExample}</code>
              </pre>
            </>
          )}
        </div>
      )}
    </div>
  );
};

interface MarkdownQuestionViewerProps {
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
  section?: 'backend' | 'lld';
}

type Priority = 'high' | 'medium' | 'low' | null;

const MarkdownQuestionViewer: React.FC<MarkdownQuestionViewerProps> = ({ 
  searchTerm = '', 
  onSearchChange,
  section = 'lld'
}) => {
  const [questions, setQuestions] = useState<MarkdownQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPriority, setShowPriority] = useState<Priority | 'all'>('all');
  
  // Initialize priorities from localStorage
  const [priorities, setPriorities] = useState<Record<number, Priority>>(() => {
    const savedPriorities = localStorage.getItem('lld-priorities');
    if (savedPriorities) {
      try {
        return JSON.parse(savedPriorities);
      } catch (e) {
        console.error('Failed to parse saved priorities:', e);
        return {};
      }
    }
    return {};
  });

  useEffect(() => {
    let isActive = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true); 

    const loadQuestions = async () => {
      try {
        const loadedQuestions = await loadAllMarkdownQuestions(section);
        if (isActive) {
          console.log('Successfully loaded questions:', loadedQuestions.length);
          setQuestions(loadedQuestions);
          setError(null);
        }
      } catch (err) {
        if (isActive) {
          console.error('Failed to load questions:', err);
          setError(`Failed to load questions: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
      } finally {
        if (isActive) setLoading(false);
      }
    };

    loadQuestions();

    return () => {
      isActive = false;
    };
  }, [section]);

  // Save priorities to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('lld-priorities', JSON.stringify(priorities));
  }, [priorities]);

  const handleUpdatePriority = (id: number, priority: Priority) => {
    setPriorities(prev => ({
      ...prev,
      [id]: priority
    }));
  };

  // Filter questions based on search term and priority
  const filteredQuestions = questions.filter(q => {
    const matchesSearch = !searchTerm || (
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.explanation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const questionPriority = priorities[q.id] ?? q.priority ?? null;
    const matchesPriority = showPriority === 'all' || questionPriority === showPriority;
    return matchesSearch && matchesPriority;
  });

  const getPriorityCount = (priority: Priority | 'all') => {
    if (priority === 'all') return questions.length;
    return questions.filter(q => {
      const questionPriority = priorities[q.id] ?? q.priority ?? null;
      return questionPriority === priority;
    }).length;
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Loading React LLD Questions...</h2>
        <p>Please wait while we load the markdown files.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '40px', color: 'red' }}>
        <h2>Error Loading Questions</h2>
        <p>{error}</p>
        <p>Check the browser console for more details.</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>No Questions Found</h2>
        <p>No markdown questions were found in the data/questions directory.</p>
        <p>Please check:</p>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li>Make sure you have .md files in src/data/questions/</li>
          <li>Check browser console for loading errors</li>
          <li>Verify files have proper frontmatter (id, category, priority)</li>
        </ul>
      </div>
    );
  }

  const isBackend = section === 'backend';
  const title = isBackend ? 'Backend Interview Questions' : 'React LLD Questions (Markdown)';

  return (
    <div className="markdown-viewer-container">
      {/* Search Bar with Priority Filter */}
      <div className="search-section">
        <div className="search-container-with-filter">
          <input
            type="text"
            placeholder={`🔍 Search ${isBackend ? 'Backend' : 'React LLD'} questions...`}
            value={searchTerm}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="search-input-top"
            aria-label="Search React LLD questions"
          />
          {searchTerm && (
            <button 
              onClick={() => onSearchChange?.('')}
              className="clear-search-btn"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
          
          {/* Priority Filter - Right Side */}
          <div className="priority-filter-inline">
            <label htmlFor="lld-priority-select">Filter by Priority:</label>
            <select 
              id="lld-priority-select"
              value={showPriority || 'all'} 
              onChange={(e) => setShowPriority(e.target.value === 'all' ? 'all' : e.target.value as Priority)}
              className="priority-select-inline"
            >
              <option value="all">All Priorities ({getPriorityCount('all')})</option>
              <option value="high">High Priority ({getPriorityCount('high')})</option>
              <option value="medium">Medium Priority ({getPriorityCount('medium')})</option>
              <option value="low">Low Priority ({getPriorityCount('low')})</option>
            </select>
          </div>
        </div>
      </div>

      <h1 className="markdown-viewer-title">
        {title}
      </h1>
      <p className="markdown-viewer-subtitle">
        {isBackend 
          ? `${filteredQuestions.length} of ${questions.length} questions available`
          : `Showing ${filteredQuestions.length} of ${questions.length} questions${searchTerm ? ` matching "${searchTerm}"` : ''}`
        }
      </p>
      
      {filteredQuestions.length === 0 ? (
        <div className="no-results">
          <p>No questions found matching "{searchTerm}"</p>
          <button 
            onClick={() => onSearchChange?.('')}
            className="clear-filters-btn"
          >
            Clear Search
          </button>
        </div>
      ) : (
        filteredQuestions.map(q => {
          const questionPriority = priorities[q.id] ?? q.priority ?? null;
          return (
            <MarkdownQuestionCard 
              key={q.id} 
              question={q} 
              priority={questionPriority}
              onUpdatePriority={handleUpdatePriority}
            />
          );
        })
      )}
    </div>
  );
};

export default MarkdownQuestionViewer;
