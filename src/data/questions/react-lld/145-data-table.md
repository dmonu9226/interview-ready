---
id: 145
category: React LLD
priority: null
tags: [data-table, filtering, sorting, pagination, performance]
---

# How would you build a filterable and sortable data table?

## Quick Answer

Use controlled state for filters, sort configuration, and pagination. Implement client-side filtering/sorting for small datasets (<10k rows) or server-side for large datasets. Modularize into TableHeader, TableRow, Pagination components. Use useMemo for expensive computations and virtualization (react-window) for rendering thousands of rows efficiently.

## Detailed Explanation

### Architecture Overview

#### Component Structure
```
DataTable/
├── DataTable.tsx          # Main container
├── TableHeader.tsx        # Sortable column headers
├── TableRow.tsx           # Individual row
├── FilterBar.tsx          # Search and filters
├── Pagination.tsx         # Page navigation
└── types.ts               # TypeScript definitions
```

### Data Flow Strategy

**Client-Side Processing (Small Datasets):**
- Fetch all data once
- Filter, sort, paginate in memory
- Fast UX, no additional API calls
- Memory intensive for large datasets

**Server-Side Processing (Large Datasets):**
- Send filter/sort/page params to API
- Backend returns paginated results
- Efficient for millions of rows
- More network requests

### State Management

Key states to track:
1. **filters**: Object with column-value pairs
2. **sortConfig**: { key: string, direction: 'asc' | 'desc' }
3. **currentPage**: Number (1-indexed)
4. **pageSize**: Number (rows per page)
5. **searchQuery**: Global search string
6. **selectedRows**: Set of selected row IDs

### Performance Optimization Techniques

#### 1. Memoization
```typescript
const filteredData = useMemo(() => {
  return data.filter(row => /* filter logic */);
}, [data, filters]);
```

#### 2. Virtualization
For 1000+ rows, use `react-window` or `react-virtualized`:
- Only render visible rows
- Reduces DOM nodes dramatically
- Smooth scrolling performance

#### 3. Debounced Search
```typescript
const debouncedSearch = useDebounce(searchQuery, 300);
```
Prevents filtering on every keystroke

#### 4. Web Workers
Offload heavy sorting/filtering to background thread

### Sorting Implementation

**Multi-column sorting:**
- Primary sort: Column A
- Secondary sort: Column B (when A values are equal)
- Store array of sort configs

**Stable sorting:**
- Preserve original order for equal values
- Use index as tiebreaker

### Filtering Strategies

**Column-specific filters:**
- Text input for string columns
- Range slider for numbers
- Dropdown for enums/categories
- Date picker for dates

**Global search:**
- Search across all columns
- Highlight matching text
- Case-insensitive by default

### Accessibility

- Proper `<table>`, `<thead>`, `<tbody>` semantics
- `aria-sort` for sortable columns
- Keyboard navigation through cells
- Screen reader announcements for sort changes
- Focus management for filters

## Code Example

```typescript
import React, { useState, useMemo, useCallback } from 'react';
import './DataTable.css';

interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  render?: (value: any, row: T) => React.ReactNode;
}

interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  onRowClick?: (row: T) => void;
  enableSelection?: boolean;
}

function DataTable<T extends Record<string, any>>({
  data,
  columns,
  pageSize = 10,
  onRowClick,
  enableSelection = false,
}: DataTableProps<T>) {
  // State
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [filters, setFilters] = useState<Partial<Record<keyof T, string>>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  // Filter data
  const filteredData = useMemo(() => {
    let result = [...data];

    // Apply global search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(row =>
        Object.values(row).some(value =>
          String(value).toLowerCase().includes(query)
        )
      );
    }

    // Apply column filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter(row =>
          String(row[key]).toLowerCase().includes(value.toLowerCase())
        );
      }
    });

    return result;
  }, [data, searchQuery, filters]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  // Handlers
  const handleSort = useCallback((key: keyof T) => {
    setSortConfig(current => {
      if (!current || current.key !== key) {
        return { key: String(key), direction: 'asc' };
      }
      if (current.direction === 'asc') {
        return { key: String(key), direction: 'desc' };
      }
      return null;
    });
  }, []);

  const handleFilterChange = useCallback((key: keyof T, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page
  }, []);

  const handleSelectRow = useCallback((index: number) => {
    setSelectedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
    } else {
      const allIndices = paginatedData.map((_, idx) => 
        (currentPage - 1) * pageSize + idx
      );
      setSelectedRows(new Set(allIndices));
    }
  }, [paginatedData, currentPage, pageSize, selectedRows]);

  return (
    <div className="data-table-container">
      {/* Search Bar */}
      <div className="table-controls">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="search-input"
        />
        
        {/* Column Filters */}
        <div className="column-filters">
          {columns.map(col => col.filterable && (
            <input
              key={String(col.key)}
              type="text"
              placeholder={`Filter ${col.label}`}
              value={filters[col.key] || ''}
              onChange={e => handleFilterChange(col.key, e.target.value)}
              className="filter-input"
            />
          ))}
        </div>
      </div>

      {/* Table */}
      <table className="data-table">
        <thead>
          <tr>
            {enableSelection && (
              <th>
                <input
                  type="checkbox"
                  checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
            )}
            {columns.map(col => (
              <th
                key={String(col.key)}
                style={{ width: col.width }}
                onClick={() => col.sortable && handleSort(col.key)}
                className={col.sortable ? 'sortable' : ''}
              >
                {col.label}
                {sortConfig?.key === String(col.key) && (
                  <span className="sort-indicator">
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => {
            const globalIndex = (currentPage - 1) * pageSize + rowIndex;
            return (
              <tr
                key={globalIndex}
                onClick={() => onRowClick?.(row)}
                className={`${onRowClick ? 'clickable' : ''} ${selectedRows.has(globalIndex) ? 'selected' : ''}`}
              >
                {enableSelection && (
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.has(globalIndex)}
                      onChange={() => handleSelectRow(globalIndex)}
                      onClick={e => e.stopPropagation()}
                    />
                  </td>
                )}
                {columns.map(col => (
                  <td key={String(col.key)}>
                    {col.render 
                      ? col.render(row[col.key], row)
                      : row[col.key]
                    }
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        
        <span>
          Page {currentPage} of {totalPages || 1}
        </span>
        
        <button
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>

      {/* Results Info */}
      <div className="results-info">
        Showing {paginatedData.length} of {filteredData.length} results
        {selectedRows.size > 0 && ` (${selectedRows.size} selected)`}
      </div>
    </div>
  );
}

// Usage Example
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

function UserTable() {
  const columns: Column<User>[] = [
    { key: 'name', label: 'Name', sortable: true, filterable: true },
    { key: 'email', label: 'Email', sortable: true, filterable: true },
    { 
      key: 'role', 
      label: 'Role', 
      sortable: true, 
      filterable: true,
      render: (value) => <span className={`badge badge-${value}`}>{value}</span>
    },
    { key: 'status', label: 'Status', sortable: true, filterable: true },
    { key: 'lastLogin', label: 'Last Login', sortable: true },
  ];

  const users: User[] = [
    // ... user data
  ];

  return (
    <DataTable
      data={users}
      columns={columns}
      pageSize={10}
      enableSelection={true}
      onRowClick={(user) => console.log('Clicked:', user)}
    />
  );
}

export default DataTable;
```

## Common Interview Follow-ups

1. **How to handle 100,000+ rows?**
   - Server-side pagination and filtering
   - Virtual scrolling with react-window
   - Infinite scroll instead of pagination
   - Web Workers for client-side processing

2. **How to export table data?**
   - Convert to CSV format
   - Create Blob and trigger download
   - Use libraries like react-csv or xlsx

3. **How to implement resizable columns?**
   - Track column widths in state
   - Add drag handles between headers
   - Update widths on drag end
   - Persist preferences in localStorage

4. **How to support dark mode?**
   - CSS variables for colors
   - Toggle class on root element
   - Use theme context for dynamic theming
