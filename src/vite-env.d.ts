/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_CALENDAR_API_KEY?: string
  readonly VITE_SHOW_SLACK?: string
  readonly VITE_ENABLE_SLACK?: string
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
