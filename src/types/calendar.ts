export type EventCategory = 'gathering' | 'garden' | 'meeting' | 'workshop' | 'other'

export type TimeFilter = 'two-months' | 'upcoming' | 'past' | 'all'

export interface CalendarEvent {
  id: string
  title: string
  description?: string
  location?: string
  startDate: Date
  endDate: Date
  isAllDay: boolean
  category: EventCategory
  url?: string
}

export type FeedSource = 'google-api' | 'google-ics' | 'custom-ics' | 'eventbrite' | 'sample'

export interface FeedSyncState {
  source: FeedSource
  status: 'idle' | 'loading' | 'success' | 'error'
  lastSynced?: Date
  errorMessage?: string
  calendarId?: string
  icsUrl?: string
  /** True when events from the Eventbrite organizer were merged into the list */
  includesEventbrite?: boolean
}
