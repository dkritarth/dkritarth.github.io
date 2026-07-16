/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LOCAL_HUB_PORT?: string;
  readonly VITE_LOCAL_NOTEBOOK_PORT?: string;
  readonly VITE_LOCAL_PORTFOLIO_PORT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** ISO timestamp of the last git commit, injected at build time (see vite.config.ts). */
declare const __LAST_UPDATED__: string;
