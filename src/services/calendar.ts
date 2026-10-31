import type { CalendarEvent, EventCategory } from '../types/calendar'

/**
 * Unescape special characters in ICS strings.
 */
function unescapeIcsText(text: string): string {
  return text
    .replace(/\\n/g, '\n')
    .replace(/\\N/g, '\n')
    .replace(/\\,/g, ',')
    .replace(/\\;/g, ';')
    .replace(/\\\\/g, '\\')
}

/**
 * Strip HTML tags and return plain text.
 */
export function stripHtml(raw: string): string {
  if (!raw) return ''
  if (typeof DOMParser !== 'undefined') {
    const doc = new DOMParser().parseFromString(raw, 'text/html')
    return (doc.body.textContent || '').trim()
  }
  return raw.replace(/<[^>]*>/g, '').trim()
}

function escapeHtmlText(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function escapeHtmlAttr(str: string): string {
  return escapeHtmlText(str).replace(/"/g, '&quot;')
}

const ALLOWED_TAGS = new Set([
  'b',
  'strong',
  'i',
  'em',
  'u',
  'p',
  'div',
  'ul',
  'ol',
  'li',
  'span',
  'blockquote',
  'sub',
  'sup',
])

const DROP_CONTENT_TAGS = new Set([
  'script',
  'style',
  'iframe',
  'object',
  'embed',
  'svg',
  'math',
  'form',
  'input',
  'button',
])

/**
 * Sanitize event description HTML (e.g., from Google Calendar ICS / API)
 * so anchor tags (`<a href="...">`) and basic formatting render safely.
 */
export function sanitizeEventHtml(raw: string): string {
  if (!raw) return ''

  // Decode entity-encoded HTML tags if the source double-encoded them
  let input = raw
  if (!/<[a-z!/]/i.test(input) && /&lt;[a-z!/]/i.test(input)) {
    input = input
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/&quot;/gi, '"')
      .replace(/&#39;/gi, "'")
      .replace(/&amp;/gi, '&')
  }

  if (typeof DOMParser === 'undefined') {
    return escapeHtmlText(input).replace(/\n/g, '<br />')
  }

  const doc = new DOMParser().parseFromString(input, 'text/html')

  const serializeNode = (node: Node): string => {
    if (node.nodeType === Node.TEXT_NODE) {
      return escapeHtmlText(node.textContent || '').replace(/\n/g, '<br />')
    }
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return ''
    }

    const el = node as Element
    const tag = el.tagName.toLowerCase()

    if (DROP_CONTENT_TAGS.has(tag)) {
      return ''
    }

    if (tag === 'br') {
      return '<br />'
    }

    const childrenHtml = Array.from(el.childNodes).map(serializeNode).join('')

    if (tag === 'a') {
      const href = (el.getAttribute('href') || '').trim()
      if (/^(https?:\/\/|mailto:|tel:|\/)/i.test(href)) {
        const label = childrenHtml || escapeHtmlText(href)
        return `<a href="${escapeHtmlAttr(href)}" target="_blank" rel="noopener noreferrer">${label}</a>`
      }
      return childrenHtml
    }

    if (ALLOWED_TAGS.has(tag)) {
      return `<${tag}>${childrenHtml}</${tag}>`
    }

    return childrenHtml
  }

  return Array.from(doc.body.childNodes).map(serializeNode).join('')
}

/**
 * Return the two-month date window [now, now + 2 months].
 */
export function getTwoMonthWindow(referenceDate: Date = new Date()): {
  start: Date
  end: Date
} {
  const start = new Date(referenceDate)
  const end = new Date(referenceDate)
  end.setMonth(end.getMonth() + 2)
  return { start, end }
}

/**
 * Convert a wall-clock date/time in an IANA timezone to an absolute Date.
 */
function zonedTimeToDate(dateStr: string, timeStr: string, timeZone: string): Date {
  const [y, mo, d] = dateStr.split('-').map(Number)
  const [h, mi, s] = (timeStr || '00:00:00').split(':').map(Number)
  const asUtc = Date.UTC(y, mo - 1, d, h || 0, mi || 0, s || 0)

  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hourCycle: 'h23',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }).formatToParts(new Date(asUtc))
    const get = (type: string) => Number(parts.find((p) => p.type === type)?.value)
    const zonedAsUtc = Date.UTC(
      get('year'),
      get('month') - 1,
      get('day'),
      get('hour'),
      get('minute'),
      get('second'),
    )
    return new Date(asUtc - (zonedAsUtc - asUtc))
  } catch {
    // Unknown timezone; treat as the viewer's local time
    return new Date(y, mo - 1, d, h || 0, mi || 0, s || 0)
  }
}

/**
 * Parses an ICS date string (either YYYYMMDD or YYYYMMDDTHHMMSS[Z]),
 * optionally with a TZID parameter prefix (e.g., DTSTART;TZID=America/Chicago:20261024T100000).
 */
function parseIcsDate(
  rawDateStr: string,
  defaultTz = 'America/Chicago',
): { date: Date; isAllDay: boolean } {
  const colonIdx = rawDateStr.indexOf(':')
  const meta = colonIdx >= 0 ? rawDateStr.substring(0, colonIdx) : ''
  const cleanStr = (colonIdx >= 0 ? rawDateStr.substring(colonIdx + 1) : rawDateStr).trim()

  const tzMatch = meta.match(/TZID=([^;:]+)/i)
  const tz = tzMatch ? tzMatch[1] : defaultTz

  // Date-only format: YYYYMMDD
  if ((cleanStr.length === 8 && !cleanStr.includes('T')) || /VALUE=DATE/i.test(meta)) {
    const year = parseInt(cleanStr.substring(0, 4), 10)
    const month = parseInt(cleanStr.substring(4, 6), 10) - 1
    const day = parseInt(cleanStr.substring(6, 8), 10)
    return { date: new Date(year, month, day), isAllDay: true }
  }

  // DateTime format: YYYYMMDDTHHMMSS[Z]
  const match = cleanStr.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(Z)?$/)
  if (match) {
    const [, y, mo, d, h, mi, s, isUtc] = match
    if (isUtc) {
      return {
        date: new Date(Date.UTC(+y, +mo - 1, +d, +h, +mi, +s)),
        isAllDay: false,
      }
    }
    if (tzMatch) {
      return {
        date: zonedTimeToDate(`${y}-${mo}-${d}`, `${h}:${mi}:${s}`, tz),
        isAllDay: false,
      }
    }
    return {
      date: new Date(+y, +mo - 1, +d, +h, +mi, +s),
      isAllDay: false,
    }
  }

  const fallback = new Date(cleanStr)
  return {
    date: isNaN(fallback.getTime()) ? new Date() : fallback,
    isAllDay: false,
  }
}

/**
 * Determine category from event title and description.
 */
function inferCategory(title: string, desc: string): EventCategory {
  const combined = `${title} ${stripHtml(desc)}`.toLowerCase()
  if (
    combined.includes('garden') ||
    combined.includes('preserve') ||
    combined.includes('harvest') ||
    combined.includes('compost')
  ) {
    return 'garden'
  }
  if (
    combined.includes('meeting') ||
    combined.includes('committee') ||
    combined.includes('council') ||
    combined.includes('board')
  ) {
    return 'meeting'
  }
  if (
    combined.includes('workshop') ||
    combined.includes('class') ||
    combined.includes('seed saving') ||
    combined.includes('bake')
  ) {
    return 'workshop'
  }
  if (
    combined.includes('swap') ||
    combined.includes('potluck') ||
    combined.includes('tasting') ||
    combined.includes('dinner') ||
    combined.includes('celebration')
  ) {
    return 'gathering'
  }
  return 'other'
}

const DAY_MAP: Record<string, number> = {
  SU: 0,
  MO: 1,
  TU: 2,
  WE: 3,
  TH: 4,
  FR: 5,
  SA: 6,
}

/**
 * Expand a recurring event's RRULE into start Dates up to windowEnd.
 */
function expandRruleDates(
  startDate: Date,
  rruleStr: string,
  windowEnd: Date,
  defaultTz: string,
): Date[] {
  const parts: Record<string, string> = {}
  for (const seg of rruleStr.split(';')) {
    const [k, v] = seg.split('=')
    if (k && v) {
      parts[k.trim().toUpperCase()] = v.trim().toUpperCase()
    }
  }

  const freq = parts['FREQ'] || ''
  const interval = parts['INTERVAL'] ? Math.max(1, parseInt(parts['INTERVAL'], 10)) : 1
  const maxCount = parts['COUNT'] ? parseInt(parts['COUNT'], 10) : 1000
  const untilDate = parts['UNTIL'] ? parseIcsDate(`UNTIL:${parts['UNTIL']}`, defaultTz).date : null

  const occurrences: Date[] = []
  let count = 0

  if (freq === 'DAILY') {
    const cursor = new Date(startDate)
    for (let step = 0; step < 1000 && count < maxCount; step++) {
      if (untilDate && cursor > untilDate) break
      if (cursor > windowEnd) break
      occurrences.push(new Date(cursor))
      count++
      cursor.setDate(cursor.getDate() + interval)
    }
  } else if (freq === 'WEEKLY') {
    const byDays: number[] = []
    if (parts['BYDAY']) {
      for (const code of parts['BYDAY'].split(',')) {
        const twoChar = code.trim().slice(-2)
        if (DAY_MAP[twoChar] !== undefined) {
          byDays.push(DAY_MAP[twoChar])
        }
      }
    }
    if (byDays.length === 0) {
      byDays.push(startDate.getDay())
    }
    byDays.sort((a, b) => a - b)

    const weekBase = new Date(startDate)
    weekBase.setDate(weekBase.getDate() - weekBase.getDay())

    outerWeekly: for (let week = 0; week < 500 && count < maxCount; week++) {
      const currentWeekStart = new Date(weekBase)
      currentWeekStart.setDate(weekBase.getDate() + week * interval * 7)
      if (currentWeekStart > windowEnd) break

      for (const dow of byDays) {
        const candidate = new Date(currentWeekStart)
        candidate.setDate(currentWeekStart.getDate() + dow)
        if (candidate < startDate) continue
        if (untilDate && candidate > untilDate) break outerWeekly
        count++
        if (count > maxCount) break outerWeekly
        if (candidate > windowEnd) break outerWeekly
        occurrences.push(candidate)
      }
    }
  } else if (freq === 'MONTHLY') {
    const byDay = parts['BYDAY'] || ''
    const byMonthDay = parts['BYMONTHDAY'] ? parseInt(parts['BYMONTHDAY'], 10) : null

    for (let mStep = 0; mStep < 240 && count < maxCount; mStep++) {
      const targetMonthDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth() + mStep * interval,
        1,
        startDate.getHours(),
        startDate.getMinutes(),
        startDate.getSeconds(),
      )
      if (targetMonthDate > windowEnd) break

      const year = targetMonthDate.getFullYear()
      const month = targetMonthDate.getMonth()
      const daysInMonth = new Date(year, month + 1, 0).getDate()

      let candidate: Date | null = null
      const byDayMatch = byDay.match(/^(-?\d+)([A-Z]{2})$/)
      if (byDayMatch && DAY_MAP[byDayMatch[2]] !== undefined) {
        const nth = parseInt(byDayMatch[1], 10)
        const targetDow = DAY_MAP[byDayMatch[2]]
        const matching: Date[] = []
        for (let d = 1; d <= daysInMonth; d++) {
          const test = new Date(
            year,
            month,
            d,
            startDate.getHours(),
            startDate.getMinutes(),
            startDate.getSeconds(),
          )
          if (test.getDay() === targetDow) {
            matching.push(test)
          }
        }
        if (nth > 0 && matching[nth - 1]) {
          candidate = matching[nth - 1]
        } else if (nth < 0 && matching[matching.length + nth]) {
          candidate = matching[matching.length + nth]
        }
      } else {
        const dayNum = byMonthDay ?? startDate.getDate()
        if (dayNum <= daysInMonth) {
          candidate = new Date(
            year,
            month,
            dayNum,
            startDate.getHours(),
            startDate.getMinutes(),
            startDate.getSeconds(),
          )
        }
      }

      if (!candidate || candidate < startDate) continue
      if (untilDate && candidate > untilDate) break
      count++
      if (count > maxCount) break
      if (candidate > windowEnd) break
      occurrences.push(candidate)
    }
  } else if (freq === 'YEARLY') {
    const cursor = new Date(startDate)
    for (let yStep = 0; yStep < 50 && count < maxCount; yStep++) {
      if (untilDate && cursor > untilDate) break
      if (cursor > windowEnd) break
      occurrences.push(new Date(cursor))
      count++
      cursor.setFullYear(cursor.getFullYear() + interval)
    }
  }

  return occurrences
}

/**
 * Parse an iCalendar (.ics) string into an array of structured CalendarEvent objects
 * within the next two months.
 */
export function parseIcs(icsData: string): CalendarEvent[] {
  // Unfold multi-line entries (lines starting with whitespace)
  const unfolded = icsData.replace(/\r\n[ \t]|\r[ \t]|\n[ \t]/g, '')
  const lines = unfolded.split(/\r\n|\r|\n/)

  let calTz = 'America/Chicago'
  for (const line of lines) {
    if (line.toUpperCase().startsWith('X-WR-TIMEZONE:')) {
      const tzVal = line.substring('X-WR-TIMEZONE:'.length).trim()
      if (tzVal) calTz = tzVal
      break
    }
  }

  const { start: windowStart, end: windowEnd } = getTwoMonthWindow()

  const events: CalendarEvent[] = []
  let inEvent = false
  let currentEvent: Record<string, string> = {}
  let currentExdates: number[] = []

  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed === 'BEGIN:VEVENT') {
      inEvent = true
      currentEvent = {}
      currentExdates = []
      continue
    }

    if (trimmed === 'END:VEVENT') {
      inEvent = false
      if (
        currentEvent['STATUS']?.toUpperCase() !== 'CANCELLED' &&
        currentEvent['SUMMARY'] &&
        currentEvent['DTSTART_RAW']
      ) {
        const { date: startDate, isAllDay } = parseIcsDate(currentEvent['DTSTART_RAW'], calTz)
        let endDate: Date
        if (currentEvent['DTEND_RAW']) {
          endDate = parseIcsDate(currentEvent['DTEND_RAW'], calTz).date
        } else if (isAllDay) {
          endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000)
        } else {
          endDate = new Date(startDate.getTime() + 60 * 60 * 1000)
        }

        const durationMs = Math.max(0, endDate.getTime() - startDate.getTime())
        const title = unescapeIcsText(currentEvent['SUMMARY'] || 'Untitled Event')
        const description = currentEvent['DESCRIPTION']
          ? unescapeIcsText(currentEvent['DESCRIPTION'])
          : undefined
        const location = currentEvent['LOCATION']
          ? unescapeIcsText(currentEvent['LOCATION'])
          : undefined
        const url = currentEvent['URL']
        const baseUid = currentEvent['UID'] || `event-${events.length}`
        const category = inferCategory(title, description || '')

        if (currentEvent['RRULE']) {
          const exSet = new Set(currentExdates)
          const occStarts = expandRruleDates(startDate, currentEvent['RRULE'], windowEnd, calTz)
          for (const occStart of occStarts) {
            if (exSet.has(Math.floor(occStart.getTime() / 1000))) continue
            const occEnd = new Date(occStart.getTime() + durationMs)
            if (occEnd >= windowStart && occStart <= windowEnd) {
              events.push({
                id: `${baseUid}-${occStart.getTime()}`,
                title,
                description,
                location,
                startDate: occStart,
                endDate: occEnd,
                isAllDay,
                category,
                url,
              })
            }
          }
        } else if (endDate >= windowStart && startDate <= windowEnd) {
          events.push({
            id: `${baseUid}-${startDate.getTime()}`,
            title,
            description,
            location,
            startDate,
            endDate,
            isAllDay,
            category,
            url,
          })
        }
      }
      currentEvent = {}
      currentExdates = []
      continue
    }

    if (inEvent) {
      const colonIndex = line.indexOf(':')
      if (colonIndex > 0) {
        const fullKey = line.substring(0, colonIndex).trim()
        const keyPart = fullKey.split(';')[0].toUpperCase().trim()
        const rawValue = line.substring(colonIndex + 1)
        if (keyPart === 'DTSTART') {
          currentEvent['DTSTART_RAW'] = line
        } else if (keyPart === 'DTEND') {
          currentEvent['DTEND_RAW'] = line
        } else if (keyPart === 'EXDATE') {
          for (const v of rawValue.split(',')) {
            const parsed = parseIcsDate(`${fullKey}:${v.trim()}`, calTz)
            currentExdates.push(Math.floor(parsed.date.getTime() / 1000))
          }
        } else {
          currentEvent[keyPart] = rawValue
        }
      }
    }
  }

  // Sort chronologically ascending
  return events.sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
}

/**
 * Fetch calendar events for the next two months via the Google Calendar v3 REST API.
 */
export async function fetchGoogleCalendarApi(
  apiKey: string,
  calendarId: string,
): Promise<CalendarEvent[]> {
  const { start: windowStart, end: windowEnd } = getTwoMonthWindow()
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
    calendarId,
  )}/events?key=${encodeURIComponent(
    apiKey,
  )}&timeMin=${windowStart.toISOString()}&timeMax=${windowEnd.toISOString()}&singleEvents=true&orderBy=startTime&maxResults=250`

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Google Calendar API responded with status ${res.status}`)
  }

  const data = await res.json()
  if (!Array.isArray(data.items)) {
    return []
  }

  interface GCalItem {
    id: string
    summary?: string
    description?: string
    location?: string
    start?: { dateTime?: string; date?: string }
    end?: { dateTime?: string; date?: string }
    htmlLink?: string
  }

  return (data.items as GCalItem[]).map((item) => {
    const isAllDay = !item.start?.dateTime && Boolean(item.start?.date)
    const startDate = new Date(item.start?.dateTime || item.start?.date || Date.now())
    const endDate = new Date(item.end?.dateTime || item.end?.date || startDate.getTime() + 3600000)
    const title = item.summary || 'Slow Food Chicago Event'
    const description = item.description
    const location = item.location

    return {
      id: item.id,
      title,
      description,
      location,
      startDate,
      endDate,
      isAllDay,
      category: inferCategory(title, description || ''),
      url: item.htmlLink,
    }
  })
}

/**
 * Fetch calendar events from an iCal (.ics) public feed.
 *
 * Google's iCal endpoint sends no CORS headers, so a direct browser fetch is
 * always blocked. We go through the same-origin `calendar-feed.php` proxy first
 * (served from /public in production, mirrored by a Vite middleware in dev),
 * then fall back to a public CORS proxy.
 */
export async function fetchIcsFeed(feedUrl: string): Promise<CalendarEvent[]> {
  // Try the same-origin proxy first
  try {
    const localRes = await fetch(
      `${import.meta.env.BASE_URL}calendar-feed.php?url=${encodeURIComponent(feedUrl)}`,
    )
    if (localRes.ok) {
      const text = await localRes.text()
      if (text.includes('BEGIN:VCALENDAR')) {
        return parseIcs(text)
      }
    }
  } catch {
    // Same-origin proxy unavailable, will try public CORS proxy below
  }

  // Attempt fetch via AllOrigins CORS proxy
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(feedUrl)}`
  const proxyRes = await fetch(proxyUrl)
  if (!proxyRes.ok) {
    throw new Error(`Could not fetch calendar feed (status ${proxyRes.status})`)
  }

  const icsText = await proxyRes.text()
  if (!icsText.includes('BEGIN:VCALENDAR')) {
    throw new Error('Feed response is not a valid iCalendar format')
  }

  return parseIcs(icsText)
}

/**
 * Fetch upcoming events for an Eventbrite organizer via the same-origin
 * `eventbrite-feed.php` proxy (Eventbrite pages/API are not CORS-accessible).
 */
export async function fetchEventbriteEvents(organizerId: string): Promise<CalendarEvent[]> {
  const res = await fetch(
    `${import.meta.env.BASE_URL}eventbrite-feed.php?organizer=${encodeURIComponent(organizerId)}`,
  )
  if (!res.ok) {
    throw new Error(`Eventbrite feed responded with status ${res.status}`)
  }

  interface EbEvent {
    id: string
    name?: string
    summary?: string
    url?: string
    start_date?: string
    start_time?: string
    end_date?: string
    end_time?: string
    timezone?: string
    is_online_event?: boolean
    is_cancelled?: boolean
    primary_venue?: {
      name?: string
      address?: { localized_address_display?: string }
    }
  }

  const data: unknown = await res.json()
  if (!Array.isArray(data)) return []

  const { start: windowStart, end: windowEnd } = getTwoMonthWindow()

  return (data as EbEvent[])
    .filter((ev) => ev.start_date && !ev.is_cancelled)
    .map((ev) => {
      const tz = ev.timezone || 'America/Chicago'
      const startDate = zonedTimeToDate(ev.start_date as string, ev.start_time || '00:00:00', tz)
      let endDate = ev.end_date
        ? zonedTimeToDate(ev.end_date, ev.end_time || '00:00:00', tz)
        : startDate
      // Eventbrite sometimes reports identical start/end; give it a sensible duration
      if (endDate.getTime() <= startDate.getTime()) {
        endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000)
      }

      const title = ev.name || 'Slow Food Chicago Event'
      const description = ev.summary || undefined
      const location = ev.is_online_event
        ? 'Online event'
        : [ev.primary_venue?.name, ev.primary_venue?.address?.localized_address_display]
            .filter(Boolean)
            .join(', ') || undefined

      return {
        id: `eventbrite-${ev.id}`,
        title,
        description,
        location,
        startDate,
        endDate,
        isAllDay: false,
        category: inferCategory(title, description || ''),
        url: ev.url,
      }
    })
    .filter((ev) => ev.endDate >= windowStart && ev.startDate <= windowEnd)
}

/**
 * Format a Date object to YYYYMMDDTHHMMSSZ for ICS / Google Calendar URLs.
 */
function formatDateToIcsUtc(d: Date): string {
  return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
}

/**
 * Generate a Google Calendar "Add Event" URL.
 */
export function createGoogleCalendarUrl(event: CalendarEvent): string {
  const startStr = formatDateToIcsUtc(event.startDate)
  const endStr = formatDateToIcsUtc(event.endDate)
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${startStr}/${endStr}`,
    details: event.description || '',
    location: event.location || '',
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

/**
 * Download a single event as a `.ics` file for importing into Apple Calendar, Outlook, etc.
 */
export function downloadEventIcs(event: CalendarEvent): void {
  const startStr = formatDateToIcsUtc(event.startDate)
  const endStr = formatDateToIcsUtc(event.endDate)
  const nowStr = formatDateToIcsUtc(new Date())

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Slow Food Chicago//Events Calendar//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${event.id}@slowfoodchicago.org`,
    `DTSTAMP:${nowStr}`,
    `DTSTART:${startStr}`,
    `DTEND:${endStr}`,
    `SUMMARY:${event.title.replace(/\n/g, ' ')}`,
    event.description ? `DESCRIPTION:${stripHtml(event.description).replace(/\n/g, '\\n')}` : '',
    event.location ? `LOCATION:${event.location.replace(/\n/g, ' ')}` : '',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .filter(Boolean)
    .join('\r\n')

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${event.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.ics`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Build the URL to subscribe directly to a Google Calendar in Google Calendar.
 */
export function getGoogleCalendarSubscribeUrl(calendarId: string): string {
  return `https://calendar.google.com/calendar/render?cid=${encodeURIComponent(calendarId)}`
}

/**
 * Build the Google Calendar embed iframe URL.
 */
export function getGoogleCalendarEmbedUrl(calendarId: string): string {
  return `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(
    calendarId,
  )}&ctz=America%2FChicago&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&color=%23DA2028`
}
