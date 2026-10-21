import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  CalendarDays,
  Calendar as CalendarIcon,
  ArrowUpRight,
  ExternalLink,
  Search,
} from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import CtaSection from '../components/ui/CtaSection'
import EventCard from '../components/calendar/EventCard'
import CalendarEmbed from '../components/calendar/CalendarEmbed'
import CalendarControls from '../components/calendar/CalendarControls'

import type { CalendarEvent, EventCategory, FeedSyncState } from '../types/calendar'
import {
  fetchGoogleCalendarApi,
  fetchIcsFeed,
  fetchEventbriteEvents,
  getGoogleCalendarSubscribeUrl,
  getTwoMonthWindow,
  stripHtml,
} from '../services/calendar'
import {
  DEFAULT_GOOGLE_CALENDAR_ID,
  GOOGLE_CALENDAR_API_KEY,
  GOOGLE_CALENDAR_ICS_URL,
  EVENTBRITE_URL,
  EVENTBRITE_ORGANIZER_ID,
  SLACK_INVITE_URL,
  CONTACT_EMAIL,
} from '../data/constants'

export default function CalendarPage() {

  // Events & Sync State
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [isRefreshing, setIsRefreshing] = useState(true)
  const [syncState, setSyncState] = useState<FeedSyncState>({
    source: 'google-ics',
    status: 'idle'
  })

  // UI state
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list')
  const [selectedCategory, setSelectedCategory] = useState<'all' | EventCategory>('all')
  const [timeFilter, setTimeFilter] = useState<'upcoming' | 'all' | 'past'>('upcoming')
  const [searchQuery, setSearchQuery] = useState('')

  // Primary feed synchronization routine
  const syncCalendarFeed = useCallback(
    async (targetCalId: string, targetIcs: string, targetApi: string) => {
      // (callers set isRefreshing before invoking; it is cleared in `finally` below)

      // Google Calendar: REST API v3 if a key is supplied, otherwise the iCal feed
      const loadGoogleEvents = async (): Promise<{
        events: CalendarEvent[]
        source: FeedSyncState['source']
        icsUrl?: string
      } | null> => {
        // 1. If an API key and calendarId are supplied, try Google Calendar REST API v3
        if (targetApi && targetCalId) {
          try {
            const apiEvents = await fetchGoogleCalendarApi(targetApi, targetCalId)
            if (apiEvents.length > 0) {
              return { events: apiEvents, source: 'google-api' }
            }
          } catch (err) {
            console.warn('Google Calendar API fetch error, falling back:', err)
          }
        }

        // 2. If a custom or default ICS URL is provided, try parsing it
        const feedToTry =
          targetIcs ||
          `https://calendar.google.com/calendar/ical/${encodeURIComponent(
            targetCalId,
          )}/public/basic.ics`

        try {
          const icsEvents = await fetchIcsFeed(feedToTry)
          if (icsEvents.length > 0) {
            return {
              events: icsEvents,
              source: targetIcs ? 'custom-ics' : 'google-ics',
              icsUrl: feedToTry,
            }
          }
        } catch (err) {
          console.warn('Google Calendar ICS fetch error:', err)
        }

        return null
      }

      // Eventbrite: upcoming events for the organizer (non-fatal if unavailable)
      const loadEventbriteEvents = async (): Promise<CalendarEvent[]> => {
        try {
          return await fetchEventbriteEvents(EVENTBRITE_ORGANIZER_ID)
        } catch (err) {
          console.warn('Eventbrite fetch error:', err)
          return []
        }
      }

      try {
        const [google, eventbriteEvents] = await Promise.all([
          loadGoogleEvents(),
          loadEventbriteEvents(),
        ])

        // Merge, skipping Eventbrite events already present in the Google calendar
        const eventKey = (ev: CalendarEvent) =>
          `${ev.title.trim().toLowerCase()}|${Math.floor(ev.startDate.getTime() / 60000)}`
        const googleEvents = google?.events ?? []
        const seen = new Set(googleEvents.map(eventKey))
        const merged = [
          ...googleEvents,
          ...eventbriteEvents.filter((ev) => !seen.has(eventKey(ev))),
        ]

        if (merged.length > 0) {
          setEvents(merged)
          setSyncState({
            source: google?.source ?? 'eventbrite',
            status: 'success',
            lastSynced: new Date(),
            calendarId: targetCalId,
            icsUrl: google?.icsUrl,
            includesEventbrite: eventbriteEvents.length > 0,
          })
        }

        // 3. Fallback to curated Slow Food Chicago events
        // setEvents(sampleEvents)
        // setSyncState({
        //   source: 'sample',
        //   status: 'idle',
        //   lastSynced: new Date(),
        //   calendarId: targetCalId,
        // })
        // setIsRefreshing(false)
      } finally {
        setIsRefreshing(false)
      }
    },
    [],
  )

  // Initial sync on mount
  useEffect(() => {
    syncCalendarFeed(DEFAULT_GOOGLE_CALENDAR_ID, GOOGLE_CALENDAR_ICS_URL, GOOGLE_CALENDAR_API_KEY)
  }, [syncCalendarFeed])

  // Manual refresh from the controls bar
  const handleRefresh = () => {
    setIsRefreshing(true)
    syncCalendarFeed(DEFAULT_GOOGLE_CALENDAR_ID, GOOGLE_CALENDAR_ICS_URL, GOOGLE_CALENDAR_API_KEY)
  }

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    const { start: now, end: twoMonthsOut } = getTwoMonthWindow()

    return events
      .filter((ev) => {
        // Category filter
        if (selectedCategory !== 'all' && ev.category !== selectedCategory) {
          return false
        }

        // Time filter (upcoming events within the next two months)
        if (timeFilter === 'upcoming' && (ev.endDate < now || ev.startDate > twoMonthsOut)) {
          return false
        }
        if (timeFilter === 'past' && ev.endDate >= now) {
          return false
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase()
          const inTitle = ev.title.toLowerCase().includes(q)
          const inDesc = stripHtml(ev.description || '').toLowerCase().includes(q)
          const inLoc = (ev.location || '').toLowerCase().includes(q)
          if (!inTitle && !inDesc && !inLoc) return false
        }

        return true
      })
      .sort((a, b) => {
        // Chronological order for upcoming/all; Reverse for past
        if (timeFilter === 'past') {
          return b.startDate.getTime() - a.startDate.getTime()
        }
        return a.startDate.getTime() - b.startDate.getTime()
      })
  }, [events, selectedCategory, timeFilter, searchQuery])

  const subscribeUrl = getGoogleCalendarSubscribeUrl(DEFAULT_GOOGLE_CALENDAR_ID)

  return (
    <div className="calendar-page">

      {/* Hero */}
      <PageHero
        kickerTag="Gatherings &amp; Workdays"
        kickerText="Events Calendar"
        title={
          <>
            Pull up a chair. <em>Come to an event.</em>
          </>
        }
        description="From garden workdays and farm tours to hands-on fermentation workshops and panel discussions—our events are where real relationships and a better food system are built."
        asideIcon={CalendarDays}
        asideColor="var(--snail-red)"
        actions={
          <>
            <a
              href={subscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary"
            >
              + Subscribe to Calendar <ArrowUpRight size={16} />
            </a>
            <a
              href={EVENTBRITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-white"
            >
              Eventbrite Tickets <ExternalLink size={15} />
            </a>
          </>
        }
      />

      {/* Sync Status Banner */}
      <div className="calendar-sync-banner">
        <div className="calendar-sync-banner-inner">
          <div className="calendar-sync-status">
            <span
              className={`calendar-sync-dot ${
                syncState.source === 'sample'
                  ? 'is-fallback'
                  : syncState.status === 'error'
                  ? 'is-error'
                  : ''
              }`}
            />
            {syncState.source === 'google-api' && (
              <span>Synced live via Google Calendar API ({DEFAULT_GOOGLE_CALENDAR_ID})</span>
            )}
            {syncState.source === 'google-ics' && (
              <span>Synced live via Google Calendar iCal Feed ({DEFAULT_GOOGLE_CALENDAR_ID})</span>
            )}
            {syncState.source === 'custom-ics' && (
              <span>Synced live via custom iCal feed</span>
            )}
            {syncState.source === 'eventbrite' && (
              <span>Synced live via Eventbrite</span>
            )}
            {syncState.source !== 'eventbrite' && syncState.includesEventbrite && (
              <span>+ Eventbrite</span>
            )}
          </div>

          <div className="calendar-sync-quick-actions">
            <span style={{ color: 'var(--snail-sand)' }}>|</span>
            <a
              href={subscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="calendar-quick-link"
            >
              <CalendarIcon size={13} />
              <span>Subscribe on Google Calendar ↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Controls & Search */}
      <div className="calendar-controls-section">
        <CalendarControls
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          timeFilter={timeFilter}
          onTimeFilterChange={setTimeFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
        />
      </div>

      {/* Events Presentation */}
      <section className="calendar-events-section">
        {viewMode === 'calendar' ? (
          <CalendarEmbed calendarId={DEFAULT_GOOGLE_CALENDAR_ID} />
        ) : (
          <div className="calendar-events-list">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="calendar-empty">
                <Search size={32} className="calendar-empty-icon" />
                <h4 className="calendar-empty-title">No events found</h4>
                <p className="calendar-empty-desc">
                  {searchQuery
                    ? `No events matching "${searchQuery}". Try clearing your search or switching filters.`
                    : 'There are no events matching your current filter criteria.'}
                </p>
                <button
                  type="button"
                  className="button button-white"
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                    setTimeFilter('all')
                  }}
                >
                  Reset all filters
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* CTA */}
      <CtaSection
        kickerTag="Join the community"
        kickerText="Have an idea?"
        heading={
          <>
            Hosting a gathering or <em>want to partner?</em>
          </>
        }
        description="Slow Food Chicago is always eager to co-host workshops, farm tours, seed swaps, and communal dinners. Reach out by email or connect with us on Slack to discuss collaborating."
        actions={
          <>
            <a
              className="button button-white"
              href={SLACK_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join our Slack <ArrowUpRight size={16} />
            </a>
            <a className="button button-white" href={`mailto:${CONTACT_EMAIL}`}>
              Say hello <ArrowUpRight size={16} />
            </a>
            <a
              className="button button-white"
              href={EVENTBRITE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Eventbrite Calendar <ExternalLink size={15} />
            </a>
          </>
        }
      />
    </div>
  )
}
