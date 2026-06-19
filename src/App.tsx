import { useState, useEffect } from 'react'
import './App.css'
import QuestionCard from './components/QuestionCard'
import CategoryFilter from './components/CategoryFilter'
import DSAPlayground from './components/DSAPlayground'
import MarkdownQuestionViewer from './components/MarkdownQuestionViewer'
import { questionsData, categories } from './data/questions'

type Priority = 'high' | 'medium' | 'low' | null
type Category = string | 'all'
type Page = 'interview' | 'playground' | 'markdown' | 'backend'

interface Question {
  id: number
  category: string
  question: string
  answer: string
  priority: Priority
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('interview')
  const [questions, setQuestions] = useState<Question[]>(() => {
    // Initialize with fresh data from questionsData
    return questionsData.map(q => ({ ...q }))
  })
  const [selectedCategory, setSelectedCategory] = useState<Category>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showPriority, setShowPriority] = useState<Priority | 'all'>('all')

  // Load priorities from localStorage on mount
  useEffect(() => {
    const savedPriorities = localStorage.getItem('questionPriorities')
    if (savedPriorities) {
      const priorities = JSON.parse(savedPriorities)
      setQuestions(prev => prev.map(q => ({
        ...q,
        priority: priorities[q.id] || null
      })))
    }
  }, [])

  // Save priorities to localStorage when they change
  useEffect(() => {
    const priorities = questions.reduce((acc, q) => {
      if (q.priority) acc[q.id] = q.priority
      return acc
    }, {} as Record<number, Priority>)
    localStorage.setItem('questionPriorities', JSON.stringify(priorities))
  }, [questions])

  const updatePriority = (id: number, priority: Priority) => {
    setQuestions(prev => prev.map(q => 
      q.id === id ? { ...q, priority } : q
    ))
  }

  const filteredQuestions = questions.filter(q => {
    const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = showPriority === 'all' || q.priority === showPriority
    
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
    
    const aPriority = a.priority || 'null'
    const bPriority = b.priority || 'null'
    
    return priorityOrder[aPriority] - priorityOrder[bPriority]
  })

  const getCategoryCount = (category: string) => {
    if (category === 'all') {
      return questions.length;
    }
    return questions.filter(q => q.category === category).length
  }

  const getPriorityCount = (priority: Priority | 'all') => {
    if (priority === 'all') return questions.length
    return questions.filter(q => q.priority === priority).length
  }
  console.log('sortedQuestions ==>', sortedQuestions.map(q=>q.id));
  console.log('FilteredQuestions ==>', filteredQuestions);
  
  
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Interview Preparation</h1>
          <div className="page-navigation">
            <button 
              onClick={() => setCurrentPage('interview')}
              className={`nav-btn ${currentPage === 'interview' ? 'active' : ''}`}
            >
              📚 Interview Q&A
            </button>
            <button 
              onClick={() => setCurrentPage('playground')}
              className={`nav-btn ${currentPage === 'playground' ? 'active' : ''}`}
            >
              💻 DSA Playground
            </button>
            <button 
              onClick={() => setCurrentPage('markdown')}
              className={`nav-btn ${currentPage === 'markdown' ? 'active' : ''}`}
            >
              📝 React LLD (Markdown)
            </button>
            {/* <button 
              onClick={() => setCurrentPage('backend')}
              className={`nav-btn ${currentPage === 'backend' ? 'active' : ''}`}
            >
              ⚙️ Backend Interview
            </button> */}
          </div>
        </div>
      </header>

      {currentPage === 'interview' ? (
        <>
          {/* Search Bar with Priority Filter */}
          <div className="search-section">
            <div className="search-container-with-filter">
              <input
                type="text"
                placeholder="🔍 Search questions or answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input-top"
                aria-label="Search questions"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="clear-search-btn"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
              
              {/* Priority Filter - Right Side */}
              <div className="priority-filter-inline">
                <label htmlFor="priority-select">Filter by Priority:</label>
                <select 
                  id="priority-select"
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

          <div className="controls-section">
            <div className="filter-controls">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                getCategoryCount={getCategoryCount}
              />
            </div>
          </div>

      <main className="questions-container">
        <div className="questions-grid">
          {sortedQuestions.map(question => (
            <QuestionCard
              key={question.id}
              question={question}
              onUpdatePriority={updatePriority}
            />
          ))}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="no-results">
            <p>No questions found matching your criteria.</p>
            <button 
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
                setShowPriority('all')
              }}
              className="clear-filters-btn"
            >
              Clear Filters
            </button>
          </div>
        )}
          </main>
        </>
      ) : currentPage === 'markdown' ? (
        <MarkdownQuestionViewer searchTerm={searchTerm} onSearchChange={setSearchTerm} section="lld" />
      ) : currentPage === 'backend' ? (
        <MarkdownQuestionViewer searchTerm={searchTerm} onSearchChange={setSearchTerm} section="backend" />
      ) : (
        <DSAPlayground searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      )}

      <footer className="app-footer">
        {currentPage === 'interview' ? (
          <>
            <p>💡 Tip: Mark questions with priority to focus your preparation</p>
            <p>Your progress is automatically saved</p>
          </>
        ) : (
          <p>💻 Practice coding solutions and copy code snippets for offline study</p>
        )}
      </footer>
    </div>
  )
}

export default App
