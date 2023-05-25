interface ImportMetaEnv {
    readonly VITE_VUE_APP_I18N_LOCALE: string
    readonly VITE_VUE_APP_I18N_FALLBACK_LOCALE: string
    readonly VITE_BASE_URL_DEVELOPMENT: string
    readonly VITE_BASE_URL_PRODUCTION: string
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
