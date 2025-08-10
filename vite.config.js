import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'development' ? '/' : './',
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
    // This part is critical
    {
      name: 'spa-fallback',
      apply: 'build',
      generateBundle(_, bundle) {
        if (bundle['index.html']) {
          bundle['404.html'] = { ...bundle['index.html'] }
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 8080,
  },
})
