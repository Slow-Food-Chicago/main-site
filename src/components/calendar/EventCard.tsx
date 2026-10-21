import { useState } from 'react'
import { Calendar, Clock, MapPin, ArrowUpRight, Download, ChevronDown, ChevronUp } from 'lucide-react'
import type { CalendarEvent, EventCategory } from '../../types/calendar'
import {
  createGoogleCalendarUrl,
  downloadEventIcs,
  sanitizeEventHtml,
  stripHtml,
} from '../../services/calendar'

interface EventCardProps {
  event: CalendarEvent
}

const categoryStyles: Record<EventCategory, { bg: string; text: string; label: string }> = {
  garden: {
    bg: 'var(--snail-forest-light)',
    text: 'var(--snail-forest-dark)',
    label: 'Garden Workday',
  },
  gathering: {
    bg: 'var(--snail-red-light)',
    text: 'var(--snail-red-dark)',
    label: 'Community Gathering',
  },
  workshop: {
    bg: 'var(--snail-orange-light)',
    text: 'var(--snail-orange-dark)',
    label: 'Workshop & Tasting',
  },
  meeting: {
    bg: '#EEF3F0',
    text: '#3D5A46',
    label: 'Meeting',
  },
  other: {
    bg: 'var(--snail-sand-light)',
    text: 'var(--snail-charcoal)',
    label: 'Event',
  },
}

export default function EventCard({ event }: EventCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const cat = categoryStyles[event.category] || categoryStyles.other

  // Format date components for badge
  const monthStr = event.startDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
  const dayStr = event.startDate.getDate()
  const weekdayStr = event.startDate.toLocaleDateString('en-US', { weekday: 'short' })

  // Format time range
  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })

  const timeString = event.isAllDay
    ? 'All Day'
    : `${timeFormatter.format(event.startDate)} – ${timeFormatter.format(event.endDate)}`

  const dateFullString = event.startDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const googleCalUrl = createGoogleCalendarUrl(event)

  return (
    <article className="event-card">
      {/* Date badge */}
      <div className="event-card-date-badge" aria-hidden="true">
        <span className="event-card-date-month">{monthStr}</span>
        <span className="event-card-date-day">{dayStr}</span>
        <span className="event-card-date-weekday">{weekdayStr}</span>
      </div>

      {/* Main info */}
      <div className="event-card-content">
        <div className="event-card-meta">
          <span
            className="event-card-category"
            style={{ background: cat.bg, color: cat.text }}
          >
            {cat.label}
          </span>
          <span className="event-card-time">
            <Clock size={13} /> {timeString}
          </span>
        </div>

        <h3 className="event-card-title">{event.title}</h3>

        <div className="event-card-submeta">
          <div className="event-card-detail">
            <Calendar size={14} className="event-detail-icon" />
            <span>{dateFullString}</span>
          </div>
          {event.location && (
            <div className="event-card-detail">
              <MapPin size={14} className="event-detail-icon" />
              <span>{event.location}</span>
            </div>
          )}
        </div>

        {event.description && (
          <div className="event-card-desc-wrap">
            <div
              className={`event-card-desc ${isExpanded ? 'is-expanded' : 'is-collapsed'}`}
              dangerouslySetInnerHTML={{ __html: sanitizeEventHtml(event.description) }}
            />
            {stripHtml(event.description).length > 150 && (
              <button
                type="button"
                className="event-expand-btn"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <>
                    Show less <ChevronUp size={13} />
                  </>
                ) : (
                  <>
                    Read more <ChevronDown size={13} />
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {/* Action bar */}
        <div className="event-card-actions">
          <a
            href={googleCalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="event-btn event-btn-primary"
            title="Add event to your Google Calendar"
          >
            <span>+ Google Calendar</span>
            <ArrowUpRight size={13} />
          </a>

          <button
            type="button"
            onClick={() => downloadEventIcs(event)}
            className="event-btn event-btn-secondary"
            title="Download iCal .ics file"
          >
            <Download size={13} />
            <span>iCal (.ics)</span>
          </button>

          {event.url && (
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="event-btn event-btn-ghost"
            >
              <span>Event Details</span>
              <ArrowUpRight size={13} />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
