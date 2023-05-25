import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueI18n from '@intlify/vite-plugin-vue-i18n'

import {
  injectHtml
} from 'vite-plugin-html';

process.env.TARGET = process.env.TARGET || 'web';
const isCordova = process.env.TARGET === 'cordova';

const SRC_DIR = path.resolve(__dirname, './src');
const VIEWS_DIR = path.resolve(__dirname, './src/views');
const COMPONENTS_DIR = path.resolve(__dirname, './src/components');
const ASSETS_DIR = path.resolve(__dirname, './src/assets');
const ANIMATIONS_DIR = path.resolve(__dirname, './src/assets/animations');
const PUBLIC_DIR = path.resolve(__dirname, './public');
const BUILD_DIR = path.resolve(
  __dirname,
  isCordova ? './cordova/www' : './www',
);

export default defineConfig({
  plugins: [
    vue(),
    // vueI18n({
    //   compositionOnly: false,
    //   include: path.resolve(__dirname, './src/locales/**')
    // }),
    injectHtml({
      injectData: {
        TARGET: process.env.TARGET,
      },
    }),
  ],
  root: SRC_DIR,
  base: '',
  publicDir: PUBLIC_DIR,
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    outDir: BUILD_DIR,
    assetsInlineLimit: 0,
    emptyOutDir: true,
    chunkSizeWarningLimit: 1024,
  },
  resolve: {
    alias: {
      '@': SRC_DIR,
      '@views': VIEWS_DIR,
      '@components': COMPONENTS_DIR,
      '@assets': ASSETS_DIR,
      '@animations': ANIMATIONS_DIR,
      // 'vue-i18n': 'vue-i18n/dist/vue-i18n.esm-bundler.js',
    },
  },
  server: {
    host: true,
    // https: {
    //   key: fs.readFileSync('./.cert/key.pem'),
    //   cert: fs.readFileSync('./.cert/cert.pem'),
    // },
  },

});