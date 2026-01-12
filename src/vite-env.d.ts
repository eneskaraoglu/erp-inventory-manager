/// <reference types="vite/client" />

// TypeScript definitions for Vite environment variables
// Like application.properties type definitions in Java

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
