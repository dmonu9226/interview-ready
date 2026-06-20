import { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { EditorView } from '@codemirror/view'

interface Question {
  id: number
  category: string
  question: string
  answer: string
  explanation?: string
  codeExample?: string
  videoUrl?: string
  priority: 'high' | 'medium' | 'low' | null
}

interface QuestionCardProps {
  question: Question
  onUpdatePriority: (id: number, priority: 'high' | 'medium' | 'low' | null) => void
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onUpdatePriority }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVideoExpanded, setIsVideoExpanded] = useState(false)

  // Helper function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : ''
  }

  const getPriorityColor = () => {
    switch (question.priority) {
      case 'high': return 'priority-high'
      case 'medium': return 'priority-medium'
      case 'low': return 'priority-low'
      default: return ''
    }
  }

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as 'high' | 'medium' | 'low' | null
    onUpdatePriority(question.id, value || null)
  }

  return (
    <div className={`question-card ${getPriorityColor()}`}>
      <div className="card-header-compact">
        <span className="category-badge">{question.category}</span>
        <h3 className="question-text-inline">{question.question}</h3>
        <div className="priority-wrapper">
          <span className="priority-label">Priority:</span>
          <select
            value={question.priority || ''}
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
          {/* Answer Section */}
          {question.answer && (
            <div className="answer-content">
              <h4>📝 Answer</h4>
              <div dangerouslySetInnerHTML={{ 
                __html: question.answer
                  .replace(/\\n/g, '<br/>')  // Handle escaped \n
                  .replace(/\n/g, '<br/>')   // Handle actual newlines
              }} />
            </div>
          )}
          
          {/* Explanation Section */}
          {question.explanation && (
            <div className="answer-content">
              <h4>💡 Explanation</h4>
              <div dangerouslySetInnerHTML={{ 
                __html: question.explanation
                  .replace(/\\n/g, '<br/>')  // Handle escaped \n
                  .replace(/\n/g, '<br/>')   // Handle actual newlines
              }} />
            </div>
          )}
          
          {question.codeExample && (
            <div className="code-example-section">
              <h4>💻 Code Example</h4>
              <div className="codemirror-wrapper">
                <CodeMirror
                  value={question.codeExample}
                  height="auto"
                  theme={oneDark}
                  extensions={[javascript(), EditorView.lineWrapping]}
                  basicSetup={{
                    lineNumbers: true,
                    highlightActiveLineGutter: true,
                    syntaxHighlighting: true,
                    bracketMatching: true,
                    closeBrackets: true,
                  }}
                  editable={false}
                  readOnly={true}
                />
              </div>
            </div>
          )}

          {/* Video Player Section - At Bottom */}
          {question.videoUrl && (
            <div className="video-section">
              <button
                onClick={() => setIsVideoExpanded(!isVideoExpanded)}
                className="video-toggle-btn"
                aria-expanded={isVideoExpanded}
              >
                🎥 Video Explanation {isVideoExpanded ? '▲' : '▼'}
              </button>
              
              {isVideoExpanded && (
                <div className="video-container">
                  <iframe
                    width="100%"
                    height="400"
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(question.videoUrl)}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default QuestionCard
