import { Search, RefreshCw, LayoutList, CalendarDays, SlidersHorizontal } from 'lucide-react'
import type { EventCategory } from '../../types/calendar'

interface CalendarControlsProps {
  viewMode: 'list' | 'calendar'
  onViewModeChange: (mode: 'list' | 'calendar') => void
  selectedCategory: 'all' | EventCategory
  onCategoryChange: (cat: 'all' | EventCategory) => void
  timeFilter: 'upcoming' | 'all' | 'past'
  onTimeFilterChange: (filter: 'upcoming' | 'all' | 'past') => void
  searchQuery: string
  onSearchChange: (q: string) => void
  onRefresh: () => void
  isRefreshing: boolean
}

const categories: { key: 'all' | EventCategory; label: string }[] = [
  { key: 'all', label: 'All Events' },
  { key: 'garden', label: 'Garden' },
  { key: 'gathering', label: 'Gatherings' },
  { key: 'workshop', label: 'Workshops' },
  { key: 'meeting', label: 'Meetings' },
]

export default function CalendarControls({
  viewMode,
  onViewModeChange,
  selectedCategory,
  onCategoryChange,
  timeFilter,
  onTimeFilterChange,
  searchQuery,
  onSearchChange,
  onRefresh,
  isRefreshing,
}: CalendarControlsProps) {
  return (
    <div className="calendar-controls">
      <div className="calendar-controls-top">
        {/* View Toggle */}
        <div className="calendar-view-toggle">
          <button
            type="button"
            className={`calendar-toggle-btn ${viewMode === 'list' ? 'is-active' : ''}`}
            onClick={() => onViewModeChange('list')}
          >
            <LayoutList size={15} />
            <span>Event List</span>
          </button>
          <button
            type="button"
            className={`calendar-toggle-btn ${viewMode === 'calendar' ? 'is-active' : ''}`}
            onClick={() => onViewModeChange('calendar')}
          >
            <CalendarDays size={15} />
            <span>Calendar View</span>
          </button>
        </div>

        {/* Search bar & Refresh */}
        <div className="calendar-controls-search-row">
          <div className="calendar-search-box">
            <Search size={15} className="calendar-search-icon" />
            <input
              type="text"
              placeholder="Search events by keyword or neighborhood..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="calendar-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="calendar-search-clear"
                onClick={() => onSearchChange('')}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          <button
            type="button"
            className="calendar-refresh-btn"
            onClick={onRefresh}
            disabled={isRefreshing}
            title="Sync with Google Calendar feed"
          >
            <RefreshCw size={14} className={isRefreshing ? 'is-spinning' : ''} />
            <span>{isRefreshing ? 'Syncing...' : 'Sync'}</span>
          </button>
        </div>
      </div>

      {/* Filter pills (visible in list mode) */}
      {viewMode === 'list' && (
        <div className="calendar-controls-filters">
          <div className="calendar-filter-group">
            <span className="calendar-filter-label">Category:</span>
            <div className="calendar-filter-pills">
              {categories.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  className={`calendar-pill ${selectedCategory === c.key ? 'is-selected' : ''}`}
                  onClick={() => onCategoryChange(c.key)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="calendar-filter-group">
            <span className="calendar-filter-label">Show:</span>
            <div className="calendar-filter-pills">
              <button
                type="button"
                className={`calendar-pill ${timeFilter === 'upcoming' ? 'is-selected' : ''}`}
                onClick={() => onTimeFilterChange('upcoming')}
              >
                Upcoming
              </button>
              <button
                type="button"
                className={`calendar-pill ${timeFilter === 'past' ? 'is-selected' : ''}`}
                onClick={() => onTimeFilterChange('past')}
              >
                Past
              </button>
              <button
                type="button"
                className={`calendar-pill ${timeFilter === 'all' ? 'is-selected' : ''}`}
                onClick={() => onTimeFilterChange('all')}
              >
                All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
