import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  CalendarDays,
  Calendar as CalendarIcon,
  ArrowUpRight,
  ExternalLink,
  SlidersHorizontal,
  Search,
} from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import CtaSection from '../components/ui/CtaSection'
import EventCard from '../components/calendar/EventCard'
import CalendarEmbed from '../components/calendar/CalendarEmbed'
import CalendarControls from '../components/calendar/CalendarControls'
import FeedConfigModal from '../components/calendar/FeedConfigModal'
import '../components/calendar/calendar.css'

import type { CalendarEvent, EventCategory, FeedSyncState } from '../types/calendar'
import {
  fetchGoogleCalendarApi,
  fetchIcsFeed,
  getGoogleCalendarSubscribeUrl,
} from '../services/calendar'
import {
  DEFAULT_GOOGLE_CALENDAR_ID,
  GOOGLE_CALENDAR_API_KEY,
  GOOGLE_CALENDAR_ICS_URL,
  EVENTBRITE_URL,
  SLACK_INVITE_URL,
  CONTACT_EMAIL,
} from '../data/constants'
import { sampleEvents } from '../data/sample-events'

export default function CalendarPage() {
  // Feed credentials (stored in localStorage with fallback to constants)
  const [calendarId, setCalendarId] = useState<string>(() => {
    return localStorage.getItem('sfc_calendar_id') || DEFAULT_GOOGLE_CALENDAR_ID
  })
  const [icsUrl, setIcsUrl] = useState<string>(() => {
    return localStorage.getItem('sfc_calendar_ics_url') || GOOGLE_CALENDAR_ICS_URL
  })
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('sfc_calendar_api_key') || GOOGLE_CALENDAR_API_KEY
  })

  // Events & Sync State
  const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [syncState, setSyncState] = useState<FeedSyncState>({
    source: 'sample',
    status: 'idle',
    calendarId,
  })

  // UI state
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list')
  const [selectedCategory, setSelectedCategory] = useState<'all' | EventCategory>('all')
  const [timeFilter, setTimeFilter] = useState<'upcoming' | 'all' | 'past'>('upcoming')
  const [searchQuery, setSearchQuery] = useState('')
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false)

  // Primary feed synchronization routine
  const syncCalendarFeed = useCallback(
    async (targetCalId: string, targetIcs: string, targetApi: string) => {
      setIsRefreshing(true)

      // 1. If an API key and calendarId are supplied, try Google Calendar REST API v3
      if (targetApi && targetCalId) {
        try {
          const apiEvents = await fetchGoogleCalendarApi(targetApi, targetCalId)
          if (apiEvents.length > 0) {
            setEvents(apiEvents)
            setSyncState({
              source: 'google-api',
              status: 'success',
              lastSynced: new Date(),
              calendarId: targetCalId,
            })
            setIsRefreshing(false)
            return
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
          setEvents(icsEvents)
          setSyncState({
            source: targetIcs ? 'custom-ics' : 'google-ics',
            status: 'success',
            lastSynced: new Date(),
            calendarId: targetCalId,
            icsUrl: feedToTry,
          })
          setIsRefreshing(false)
          return
        }
      } catch (err) {
        console.warn('Google Calendar ICS fetch error, displaying curated fallback events:', err)
      }

      // 3. Fallback to curated Slow Food Chicago events
      setEvents(sampleEvents)
      setSyncState({
        source: 'sample',
        status: 'idle',
        lastSynced: new Date(),
        calendarId: targetCalId,
      })
      setIsRefreshing(false)
    },
    [],
  )

  // Initial sync on mount
  useEffect(() => {
    syncCalendarFeed(calendarId, icsUrl, apiKey)
  }, [calendarId, icsUrl, apiKey, syncCalendarFeed])

  // Save new feed credentials from modal
  const handleSaveFeedSettings = (settings: {
    calendarId: string
    icsUrl: string
    apiKey: string
  }) => {
    const newCalId = settings.calendarId || DEFAULT_GOOGLE_CALENDAR_ID
    setCalendarId(newCalId)
    setIcsUrl(settings.icsUrl)
    setApiKey(settings.apiKey)

    localStorage.setItem('sfc_calendar_id', newCalId)
    localStorage.setItem('sfc_calendar_ics_url', settings.icsUrl)
    localStorage.setItem('sfc_calendar_api_key', settings.apiKey)

    syncCalendarFeed(newCalId, settings.icsUrl, settings.apiKey)
  }

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    const now = new Date()

    return events
      .filter((ev) => {
        // Category filter
        if (selectedCategory !== 'all' && ev.category !== selectedCategory) {
          return false
        }

        // Time filter
        if (timeFilter === 'upcoming' && ev.endDate < now) {
          return false
        }
        if (timeFilter === 'past' && ev.endDate >= now) {
          return false
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase()
          const inTitle = ev.title.toLowerCase().includes(q)
          const inDesc = (ev.description || '').toLowerCase().includes(q)
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

  const subscribeUrl = getGoogleCalendarSubscribeUrl(calendarId)

  return (
    <div className="calendar-page">
      {/* Feed Settings Modal */}
      <FeedConfigModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        currentCalendarId={calendarId}
        currentIcsUrl={icsUrl}
        currentApiKey={apiKey}
        onSave={handleSaveFeedSettings}
      />

      {/* Hero */}
      <PageHero
        kickerTag="Gatherings &amp; Workdays"
        kickerText="Events Calendar"
        title={
          <>
            Pull up a chair. <em>Come to an event.</em>
          </>
        }
        description="From garden workdays and community pantry swaps to hands-on fermentation workshops and panel discussions—our events are where real relationships and a better food system are built."
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
              <span>Synced live via Google Calendar API ({calendarId})</span>
            )}
            {syncState.source === 'google-ics' && (
              <span>Synced live via Google Calendar iCal Feed ({calendarId})</span>
            )}
            {syncState.source === 'custom-ics' && (
              <span>Synced live via custom iCal feed</span>
            )}
            {syncState.source === 'sample' && (
              <span>
                Displaying curated Slow Food Chicago schedule (Live feed ready for{' '}
                <code>{calendarId}</code>)
              </span>
            )}
          </div>

          <div className="calendar-sync-quick-actions">
            <button
              type="button"
              className="calendar-quick-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              onClick={() => setIsConfigModalOpen(true)}
            >
              <SlidersHorizontal size={13} />
              <span>Configure Feed Source</span>
            </button>
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
          onRefresh={() => syncCalendarFeed(calendarId, icsUrl, apiKey)}
          isRefreshing={isRefreshing}
          onOpenFeedSettings={() => setIsConfigModalOpen(true)}
        />
      </div>

      {/* Events Presentation */}
      <section className="calendar-events-section">
        {viewMode === 'calendar' ? (
          <CalendarEmbed calendarId={calendarId} />
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
