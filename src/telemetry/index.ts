import { BrowserAgent } from '@newrelic/browser-agent'

let agentInstance: BrowserAgent | null = null
let isInitialized = false

/**
 * Global interface augmentation for window.newrelic if injected directly
 * or exposed by the agent.
 */
declare global {
  interface Window {
    newrelic?: {
      noticeError: (error: Error | string, customAttributes?: Record<string, unknown>) => void
      addPageAction: (name: string, customAttributes?: Record<string, unknown>) => void
      setCustomAttribute: (name: string, value: string | number | boolean) => void
      setUserId: (userId: string) => void
      setPageViewName: (name: string, host?: string) => void
      interaction: () => {
        setName: (name: string) => void
        setAttribute: (name: string, value: unknown) => void
        save: () => void
        end: () => void
      }
      recordCustomEvent: (eventType: string, attributes?: Record<string, unknown>) => void
    }
    NREUM?: Record<string, unknown>
  }
}

/**
 * Initializes the New Relic Browser Agent using the browser token method.
 *
 * Implements the official New Relic Browser Monitoring Best Practices for SPAs:
 * - Uses the Browser SPA loader with soft navigation tracking.
 * - Captures Core Web Vitals (LCP, INP, CLS, etc.).
 * - Automatically instruments AJAX/Fetch and injects W3C tracecontext headers for distributed tracing.
 * - Safe for client bundles: uses the public Browser Ingest Token (NRJS-...), not account admin keys.
 */
export function initTelemetry(): BrowserAgent | null {
  if (isInitialized) {
    return agentInstance
  }

  // Ensure this only executes in a browser environment
  if (typeof window === 'undefined') {
    return null
  }

  // Global kill-switch
  if (import.meta.env.VITE_NEW_RELIC_ENABLED === 'false') {
    return null
  }

  // 1. If New Relic snippet was already loaded in <head> (e.g. copy/paste method), reuse it
  if (window.newrelic && typeof window.newrelic.noticeError === 'function') {
    isInitialized = true
    return null
  }

  // 2. Resolve credentials from environment variables
  const browserToken =
    import.meta.env.VITE_NEW_RELIC_BROWSER_TOKEN ||
    import.meta.env.VITE_NEW_RELIC_LICENSE_KEY ||
    ''

  const applicationId = import.meta.env.VITE_NEW_RELIC_APPLICATION_ID || ''
  const accountId = import.meta.env.VITE_NEW_RELIC_ACCOUNT_ID || ''
  const trustKey = import.meta.env.VITE_NEW_RELIC_TRUST_KEY || accountId
  const agentId = import.meta.env.VITE_NEW_RELIC_AGENT_ID || applicationId
  const isDebug = import.meta.env.VITE_NEW_RELIC_DEBUG === 'true'

  // If no browser token or application ID is supplied, skip initialization gracefully
  if (!browserToken || !applicationId) {
    if (isDebug || import.meta.env.DEV) {
      console.info(
        '[New Relic] Browser monitoring inactive: VITE_NEW_RELIC_BROWSER_TOKEN or VITE_NEW_RELIC_APPLICATION_ID not configured.'
      )
    }
    return null
  }

  const region = (import.meta.env.VITE_NEW_RELIC_REGION || 'us').toLowerCase()
  const isEu = region === 'eu'
  const defaultBeacon = isEu ? 'bam.eu01.nr-data.net' : 'bam.nr-data.net'
  const beacon = import.meta.env.VITE_NEW_RELIC_BEACON || defaultBeacon
  const errorBeacon = import.meta.env.VITE_NEW_RELIC_ERROR_BEACON || defaultBeacon

  try {
    const options = {
      init: {
        distributed_tracing: {
          enabled: import.meta.env.VITE_NEW_RELIC_DISTRIBUTED_TRACING !== 'false',
          cors_use_newrelic_header: true,
          cors_use_tracecontext_headers: true,
          allowed_origins: [
            window.location.origin,
            'https://dev.slowfoodchicago.org',
            'https://slowfoodchicago.org',
          ],
        },
        privacy: {
          cookies_enabled: import.meta.env.VITE_NEW_RELIC_COOKIES_ENABLED !== 'false',
        },
        ajax: {
          deny_list: ['bam.nr-data.net', 'bam.eu01.nr-data.net'],
        },
        soft_navigations: {
          enabled: true,
        },
        page_view_timing: {
          enabled: true,
        },
      },
      info: {
        beacon,
        errorBeacon,
        licenseKey: browserToken,
        applicationID: applicationId,
        sa: 1,
      },
      loader_config: {
        accountID: accountId,
        trustKey,
        agentID: agentId,
        licenseKey: browserToken,
        applicationID: applicationId,
      },
    }

    agentInstance = new BrowserAgent(options)
    isInitialized = true

    if (isDebug) {
      console.info(
        `[New Relic] Browser Agent initialized for App ID: ${applicationId} (Beacon: ${beacon})`
      )
    }

    return agentInstance
  } catch (error) {
    console.error('[New Relic] Error initializing Browser Agent:', error)
    return null
  }
}

/**
 * Access the active New Relic API, either from the instantiated agent or window.newrelic.
 */
export function getNewRelic() {
  if (typeof window !== 'undefined' && window.newrelic) {
    return window.newrelic
  }
  return agentInstance || null
}

/**
 * Sets the current route / page view name in New Relic for SPA monitoring.
 */
export function setPageViewName(name: string, host?: string): void {
  const nr = getNewRelic()
  if (nr && typeof nr.setPageViewName === 'function') {
    nr.setPageViewName(name, host)
  }
}

/**
 * Sets a custom attribute attached to all subsequent events and errors.
 */
export function setCustomAttribute(name: string, value: string | number | boolean): void {
  const nr = getNewRelic()
  if (nr && typeof nr.setCustomAttribute === 'function') {
    nr.setCustomAttribute(name, value)
  }
}

/**
 * Records a custom user action event in New Relic Browser (PageAction).
 */
export function addPageAction(
  name: string,
  customAttributes?: Record<string, string | number | boolean>
): void {
  const nr = getNewRelic()
  if (nr && typeof nr.addPageAction === 'function') {
    nr.addPageAction(name, customAttributes)
  }
}

/**
 * Reports a caught JavaScript error or exception to New Relic.
 */
export function noticeError(
  error: Error | string,
  customAttributes?: Record<string, string | number | boolean>
): void {
  const nr = getNewRelic()
  if (nr && typeof nr.noticeError === 'function') {
    nr.noticeError(error, customAttributes)
  } else {
    console.error('[New Relic noticeError]', error, customAttributes)
  }
}

/**
 * Sets the user identifier for user session tracking.
 */
export function setUserId(userId: string): void {
  const nr = getNewRelic()
  if (nr && typeof nr.setUserId === 'function') {
    nr.setUserId(userId)
  }
}
