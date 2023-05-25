/* eslint-disable @typescript-eslint/camelcase */
module.exports = {
  productionSourceMap: process.env.NODE_ENV !== 'production',
  pwa: {
    workboxPluginMode: 'GenerateSW',
    manifestPath: 'manifest.json',
    workboxOptions: {

    },
  },
  pluginOptions: {
    i18n: {
      locale: 'es-CL',
      fallbackLocale: 'es-CL',
      localeDir: 'locales',
      enableInSFC: false,
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true
    }
  }
};
