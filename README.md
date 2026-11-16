# Slow Food Chicago - Main Site

Slow Food Chicago's main landing site built with React 19, TypeScript, Vite, and Tailwind CSS.

## Getting Started

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build & Typecheck
```bash
npm run typecheck
npm run lint
npm run build
```

---

## New Relic Browser Monitoring (React SPA)

This site is instrumented using the **New Relic Browser Agent** via the **Browser Token method** following the [New Relic Browser Monitoring Best Practices Guide](https://docs.newrelic.com/docs/new-relic-solutions/best-practices-guides/full-stack-observability/browser-monitoring-best-practices-guide/).

### Features:
* **Single-Page Application (SPA) Monitoring**: Tracks soft navigations and virtual page views via React Router (`TelemetryRouteTracker`).
* **Modal Click Tracking**: Automatically records custom `modal_open` PageActions for leadership bios (`MemberModal`), garden harvest crops (`CropModal`), and the garden photo gallery lightbox.
* **Core Web Vitals**: Measures LCP (Largest Contentful Paint), INP (Interaction to Next Paint), CLS (Cumulative Layout Shift), and page load timing.
* **Distributed Tracing**: Automatically propagates W3C `traceparent` headers across outgoing AJAX and Fetch requests.
* **JavaScript Error Tracking**: Captures uncaught frontend exceptions and unhandled promise rejections.
* **Page Actions & Custom Attributes**: Provides helpers for tracking custom user actions and business events.
* **Safe Client Bundle Ingestion**: Uses New Relic's public browser monitoring key (`NRJS-...`) and reports directly to New Relic's browser ingestion beacons (`bam.nr-data.net`) without requiring backend proxies or exposing sensitive admin keys.

### Configuration (`.env`)

Copy `.env.example` to `.env` and fill in your New Relic Browser Application parameters:

```bash
# New Relic Browser Token / Key (starts with NRJS-...)
VITE_NEW_RELIC_BROWSER_TOKEN=NRJS-your_browser_token_here

# Application ID from New Relic Browser settings
VITE_NEW_RELIC_APPLICATION_ID=your_application_id_here

# Account ID from New Relic
VITE_NEW_RELIC_ACCOUNT_ID=your_account_id_here

# Optional: Set to true to view agent initialization logs in browser console
VITE_NEW_RELIC_DEBUG=true
```

---

## New Relic Dashboard (Page Views & Modal Interactions)

A ready-to-import dashboard definition is provided in [newrelic-dashboard.json](file:///Users/slowfood/Documents/GitHub/main-site/newrelic-dashboard.json).

### Dashboard Widgets Include:
1. **Page Views Over Time (Timeseries)**: Frequency of user navigations to each route (`/`, `/leadership`, `/initiatives`, `/events`, etc.).
2. **Modal Clicks Over Time (Timeseries)**: Frequency and volume of modal opens over time by modal type (`MemberModal`, `CropModal`, `PhotoLightbox`).
3. **Modal Clicks by Type (Pie Chart)**: Proportion of member bio clicks vs. garden crop clicks vs. photo lightbox opens.
4. **Top Clicked Leadership Bios (Bar Chart)**: Ranking of which board member bios are opened most frequently.
5. **Top Clicked Garden Crops (Bar Chart)**: Ranking of which crop modals are clicked most frequently in the preSERVE Garden.
6. **Page Views vs. Modal Clicks Trend (Area Chart)**: Correlated volume of general page browsing vs. deeper modal engagement.
7. **Recent Modal Interaction Stream (Table)**: Real-time event log of recent modal clicks, items inspected, and parent pages.
8. **Average Route Duration (Line Chart)**: Performance and rendering latency across routes.

### How to Import the Dashboard into New Relic:

#### Method 1: New Relic Web UI (Instant)
1. Go to [one.newrelic.com](https://one.newrelic.com) and navigate to **Dashboards**.
2. Click **Import dashboard** in the top-right corner.
3. Paste the contents of [newrelic-dashboard.json](file:///Users/slowfood/Documents/GitHub/main-site/newrelic-dashboard.json).
4. Click **Import dashboard**.

#### Method 2: New Relic CLI
```bash
newrelic entity dashboard create --dashboard-file newrelic-dashboard.json
```

---

### Manual Tracking Helpers

You can import telemetry helper methods anywhere in the application from `src/telemetry`:

```typescript
import { noticeError, addPageAction, setCustomAttribute } from './telemetry'

// Report caught errors:
try {
  doSomethingRisky()
} catch (error) {
  noticeError(error as Error, { feature: 'calendar_sync' })
}

// Track custom user interactions (PageAction):
addPageAction('newsletter_subscribed', { location: 'footer' })

// Attach custom attributes to subsequent traces & errors:
setCustomAttribute('user_type', 'volunteer')
```
