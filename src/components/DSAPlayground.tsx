import { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { codeQuestionsData, dsaCategories } from '../data/codeQuestions'
import type { CodeQuestion } from '../data/codeQuestions'

type Priority = 'high' | 'medium' | 'low' | null

interface DSAPlaygroundProps {
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
}

const DSAPlayground: React.FC<DSAPlaygroundProps> = ({ 
  searchTerm = '', 
  onSearchChange 
}) => {
  const [questions] = useState<CodeQuestion[]>(codeQuestionsData)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showPriority, setShowPriority] = useState<Priority | 'all'>('all')
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [priorities, setPriorities] = useState<Record<number, Priority>>({})
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [practiceCode, setPracticeCode] = useState<Record<number, string>>({})
  const [practiceExpanded, setPracticeExpanded] = useState<Record<number, boolean>>({})

  const filteredQuestions = questions.filter(q => {
    const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory
    const matchesSearch = !searchTerm || 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.explanation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = showPriority === 'all' || priorities[q.id] === showPriority
    return matchesCategory && matchesSearch && matchesPriority
  })

  // Sort questions by priority: high > medium > low > null
  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    const priorityOrder: Record<string, number> = {
      'high': 0,
      'medium': 1,
      'low': 2,
      'null': 3
    }
    
    const aPriority = priorities[a.id] || 'null'
    const bPriority = priorities[b.id] || 'null'
    
    return priorityOrder[aPriority] - priorityOrder[bPriority]
  })

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const updatePriority = (id: number, priority: Priority) => {
    setPriorities(prev => ({ ...prev, [id]: priority }))
  }

  const copyToClipboard = (code: string, id: number) => {
    navigator.clipboard.writeText(code)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#00C851'
      case 'Medium': return '#ffbb33'
      case 'Hard': return '#ff4444'
      default: return '#666'
    }
  }

  const getCategoryCount = (category: string) => {
    if (category === 'all') return questions.length
    return questions.filter(q => q.category === category).length
  }

  const getPriorityCount = (priority: Priority | 'all') => {
    if (priority === 'all') return questions.length
    return questions.filter(q => priorities[q.id] === priority).length
  }

  return (
    <div className="playground-container">
      {/* Search Bar with Priority Filter */}
      <div className="search-section">
        <div className="search-container-with-filter">
          <input
            type="text"
            placeholder="🔍 Search DSA problems..."
            value={searchTerm}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="search-input-top"
            aria-label="Search DSA problems"
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
            <label htmlFor="dsa-priority-select">Filter by Priority:</label>
            <select 
              id="dsa-priority-select"
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

      <div className="category-filter-section">
        <div className="category-buttons">
          {dsaCategories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            >
              {category === 'all' ? 'All Categories' : category} ({getCategoryCount(category)})
            </button>
          ))}
        </div>
      </div>

      <div className="questions-list">
        {sortedQuestions.map(question => (
          <div
            key={question.id}
            className={`question-item ${priorities[question.id] ? `priority-${priorities[question.id]}` : ''}`}
          >
            <div className="question-header" onClick={() => toggleExpand(question.id)}>
              <div className="question-info">
                <span className="category-tag">{question.category}</span>
                <span 
                  className="difficulty-badge"
                  style={{ backgroundColor: getDifficultyColor(question.difficulty) }}
                >
                  {question.difficulty}
                </span>
                <h3 className="question-title">{question.question}</h3>
              </div>
              
              <div className="question-actions">
                <div className="priority-wrapper">
                  <span className="priority-label">Priority:</span>
                  <select
                    value={priorities[question.id] || ''}
                    onChange={(e) => updatePriority(question.id, e.target.value as Priority || null)}
                    className="priority-select-mini"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option value="">⚡ Priority</option>
                    <option value="high">🔴 High</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="low">🟢 Low</option>
                  </select>
                </div>
                <span className="expand-icon">{expandedId === question.id ? '↑' : '↓'}</span>
              </div>
            </div>

            {expandedId === question.id && (
              <div className="answer-content">
                <div className="explanation-section">
                  <h4>💡 Explanation</h4>
                  <div dangerouslySetInnerHTML={{ 
                    __html: question.explanation.replace(/\n/g, '<br/>')
                  }} />
                </div>

                <div className="complexity-section">
                  <div className="complexity-item">
                    <strong>⏱️ Time:</strong> {question.timeComplexity}
                  </div>
                  <div className="complexity-item">
                    <strong>💾 Space:</strong> {question.spaceComplexity}
                  </div>
                </div>

                <div className="code-section">
                  <div className="code-header">
                    <h4>💻 Solution</h4>
                    <button
                      onClick={() => copyToClipboard(question.solution, question.id)}
                      className="copy-btn"
                    >
                      {copiedId === question.id ? '✓ Copied!' : '📋 Copy'}
                    </button>
                  </div>
                  <div className="codemirror-wrapper">
                    <CodeMirror
                      value={question.solution}
                      height="auto"
                      theme={oneDark}
                      extensions={[javascript()]}
                      basicSetup={{
                        lineNumbers: true,
                        highlightActiveLineGutter: true,
                        highlightSpecialChars: true,
                        foldGutter: true,
                        drawSelection: true,
                        dropCursor: true,
                        allowMultipleSelections: true,
                        indentOnInput: true,
                        syntaxHighlighting: true,
                        bracketMatching: true,
                        closeBrackets: true,
                        autocompletion: true,
                        rectangularSelection: true,
                        crosshairCursor: true,
                        highlightActiveLine: true,
                        highlightSelectionMatches: true,
                        closeBracketsKeymap: true,
                        defaultKeymap: true,
                        searchKeymap: true,
                        historyKeymap: true,
                        foldKeymap: true,
                        completionKeymap: true,
                        lintKeymap: true
                      }}
                      editable={false}
                      readOnly={true}
                    />
                  </div>
                </div>

                <div className="practice-section">
                  <div 
                    className="practice-header" 
                    onClick={() => setPracticeExpanded(prev => ({ ...prev, [question.id]: !prev[question.id] }))}
                  >
                    <h4>✍️ Practice - Rewrite the Code</h4>
                    <div className="practice-actions">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setPracticeCode(prev => ({ ...prev, [question.id]: '' }))
                        }}
                        className="clear-btn"
                      >
                        🗑️ Clear
                      </button>
                      <span className="expand-icon">{practiceExpanded[question.id] ? '▲' : '▼'}</span>
                    </div>
                  </div>
                  {practiceExpanded[question.id] && (
                    <>
                      <div className="codemirror-wrapper practice-wrapper">
                        <CodeMirror
                          value={practiceCode[question.id] || ''}
                          height="300px"
                          theme={oneDark}
                          extensions={[javascript()]}
                          onChange={(value) => {
                            setPracticeCode(prev => ({ ...prev, [question.id]: value }))
                          }}
                          basicSetup={{
                            lineNumbers: true,
                            highlightActiveLineGutter: true,
                            highlightSpecialChars: true,
                            foldGutter: true,
                            drawSelection: true,
                            dropCursor: true,
                            allowMultipleSelections: true,
                            indentOnInput: true,
                            syntaxHighlighting: true,
                            bracketMatching: true,
                            closeBrackets: true,
                            autocompletion: true,
                            rectangularSelection: true,
                            crosshairCursor: true,
                            highlightActiveLine: true,
                            highlightSelectionMatches: true,
                            closeBracketsKeymap: true,
                            defaultKeymap: true,
                            searchKeymap: true,
                            historyKeymap: true,
                            foldKeymap: true,
                            completionKeymap: true,
                            lintKeymap: true
                          }}
                          editable={true}
                          readOnly={false}
                        />
                      </div>
                      <p className="practice-hint">💡 Try to implement the solution yourself without looking at the code above!</p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {sortedQuestions.length === 0 && (
        <div className="no-questions">
          <p>No questions found in this category.</p>
        </div>
      )}
    </div>
  )
}

export default DSAPlayground
