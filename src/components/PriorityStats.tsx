interface PriorityStatsProps {
  total: number
  high: number
  medium: number
  low: number
  unmarked: number
}

const PriorityStats: React.FC<PriorityStatsProps> = ({ total, high, medium, low, unmarked }) => {
  return (
    <div className="priority-stats">
      <div className="stat-item">
        <span className="stat-number">{total}</span>
        <span className="stat-label">Total Questions</span>
      </div>
      <div className="stat-item stat-high">
        <span className="stat-number">{high}</span>
        <span className="stat-label">High Priority</span>
      </div>
      <div className="stat-item stat-medium">
        <span className="stat-number">{medium}</span>
        <span className="stat-label">Medium Priority</span>
      </div>
      <div className="stat-item stat-low">
        <span className="stat-number">{low}</span>
        <span className="stat-label">Low Priority</span>
      </div>
      <div className="stat-item stat-unmarked">
        <span className="stat-number">{unmarked}</span>
        <span className="stat-label">Unmarked</span>
      </div>
    </div>
  )
}

export default PriorityStats
