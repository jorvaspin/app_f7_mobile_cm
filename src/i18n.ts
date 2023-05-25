import { createI18n } from 'vue-i18n';
import esCL from './locales/es-CL.json';
import enUS from './locales/en-US.json';

console.log('VITE_VUE_APP_I18N_LOCALE', import.meta.env.VITE_VUE_APP_I18N_LOCALE);
console.log('VITE_VUE_APP_I18N_FALLBACK_LOCALE', import.meta.env.VITE_VUE_APP_I18N_FALLBACK_LOCALE);
export default createI18n({
    locale: import.meta.env.VITE_VUE_APP_I18N_LOCALE || 'en-US',
    fallbackLocale: import.meta.env.VITE_VUE_APP_I18N_FALLBACK_LOCALE || 'en-US',
    messages: {
      'es-CL': esCL,
      'en-US': enUS
    },
})