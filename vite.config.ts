import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type Plugin } from 'vite'

/**
 * Dev-only stand-ins for public/calendar-feed.php and public/eventbrite-feed.php
 * (which run on the PHP host in production). They fetch the Google iCal feed and
 * Eventbrite organizer events server-side to avoid browser CORS.
 */
function calendarFeedDevProxy(): Plugin {
  return {
    name: 'calendar-feed-dev-proxy',
    configureServer(server) {
      server.middlewares.use('/calendar-feed.php', async (req: { url?: string }, res) => {
        try {
          const target = new URL(req.url ?? '', 'http://localhost').searchParams.get('url') ?? ''
          const u = new URL(target)
          if (
            u.protocol !== 'https:' ||
            u.hostname !== 'calendar.google.com' ||
            !u.pathname.startsWith('/calendar/ical/') ||
            !u.pathname.endsWith('.ics')
          ) {
            res.statusCode = 400
            res.end('Invalid calendar feed URL')
            return
          }
          const upstream = await fetch(u)
          const text = await upstream.text()
          if (!upstream.ok || !text.includes('BEGIN:VCALENDAR')) {
            res.statusCode = 502
            res.end('Could not fetch calendar feed')
            return
          }
          res.setHeader('Content-Type', 'text/calendar; charset=utf-8')
          res.end(text)
        } catch {
          res.statusCode = 400
          res.end('Invalid calendar feed URL')
        }
      })
      server.middlewares.use('/eventbrite-feed.php', async (req: { url?: string }, res) => {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        try {
          const organizer =
            new URL(req.url ?? '', 'http://localhost').searchParams.get('organizer') ?? ''
          if (!/^\d{5,20}$/.test(organizer)) {
            res.statusCode = 400
            res.end(JSON.stringify({ error: 'Invalid organizer id' }))
            return
          }
          const upstream = await fetch(`https://www.eventbrite.com/o/${organizer}`, {
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SlowFoodChicagoSite/1.0)' },
          })
          const html = await upstream.text()
          const match = html.match(/<script id="__NEXT_DATA__"[^>]*>(.*?)<\/script>/s)
          const events = match ? JSON.parse(match[1])?.props?.pageProps?.upcomingEvents : undefined
          if (!upstream.ok || !Array.isArray(events)) {
            res.statusCode = 502
            res.end(JSON.stringify({ error: 'Could not read Eventbrite events' }))
            return
          }
          res.end(JSON.stringify(events))
        } catch {
          res.statusCode = 502
          res.end(JSON.stringify({ error: 'Could not read Eventbrite events' }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), calendarFeedDevProxy()],
})
