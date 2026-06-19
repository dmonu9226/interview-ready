interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
  getCategoryCount: (category: string) => number
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  getCategoryCount
}) => {
  return (
    <div className="category-filter">
      <label>Filter by Category:</label>
      <div className="category-buttons">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
          >
            {category === 'all' ? 'All' : category}
            <span className="count">({getCategoryCount(category)})</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryFilter
