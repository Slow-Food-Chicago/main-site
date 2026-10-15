import { ArrowUpRight, Calendar as CalendarIcon, ExternalLink } from 'lucide-react'
import { getGoogleCalendarEmbedUrl, getGoogleCalendarSubscribeUrl } from '../../services/calendar'

interface CalendarEmbedProps {
  calendarId: string
}

export default function CalendarEmbed({ calendarId }: CalendarEmbedProps) {
  const embedUrl = getGoogleCalendarEmbedUrl(calendarId)
  const subscribeUrl = getGoogleCalendarSubscribeUrl(calendarId)
  const googleCalWebUrl = `https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent(
    calendarId,
  )}`

  return (
    <div className="calendar-embed-container">
      <div className="calendar-embed-header">
        <div className="calendar-embed-header-left">
          <CalendarIcon size={18} style={{ color: 'var(--snail-red)' }} />
          <span>Interactive Google Calendar View</span>
        </div>
        <div className="calendar-embed-header-actions">
          <a
            href={subscribeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="calendar-embed-link"
          >
            <span>+ Subscribe to Calendar</span>
            <ArrowUpRight size={13} />
          </a>
          <a
            href={googleCalWebUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="calendar-embed-link"
          >
            <span>Open in Google Calendar</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      <div className="calendar-embed-frame-wrap">
        <iframe
          src={embedUrl}
          title="Slow Food Chicago Google Calendar"
          className="calendar-embed-iframe"
          loading="lazy"
        />
      </div>

      <div className="calendar-embed-footer">
        <p>
          Viewing live Google Calendar feed for <code>{calendarId}</code>. You can switch to the
          monthly, weekly, or agenda tabs inside the calendar view above.
        </p>
      </div>
    </div>
  )
}
