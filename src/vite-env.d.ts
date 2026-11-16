/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_CALENDAR_API_KEY?: string
  readonly VITE_SHOW_SLACK?: string
  readonly VITE_ENABLE_SLACK?: string

  // New Relic Browser Monitoring (Browser Token method)
  readonly VITE_NEW_RELIC_BROWSER_TOKEN?: string
  readonly VITE_NEW_RELIC_LICENSE_KEY?: string
  readonly VITE_NEW_RELIC_APPLICATION_ID?: string
  readonly VITE_NEW_RELIC_ACCOUNT_ID?: string
  readonly VITE_NEW_RELIC_TRUST_KEY?: string
  readonly VITE_NEW_RELIC_AGENT_ID?: string
  readonly VITE_NEW_RELIC_REGION?: 'us' | 'eu' | string
  readonly VITE_NEW_RELIC_BEACON?: string
  readonly VITE_NEW_RELIC_ERROR_BEACON?: string
  readonly VITE_NEW_RELIC_DISTRIBUTED_TRACING?: string
  readonly VITE_NEW_RELIC_COOKIES_ENABLED?: string
  readonly VITE_NEW_RELIC_DEBUG?: string
  readonly VITE_NEW_RELIC_ENABLED?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.JPG' {
  const src: string
  export default src
}

declare module '*.PNG' {
  const src: string
  export default src
}

declare module '*.JPEG' {
  const src: string
  export default src
}
