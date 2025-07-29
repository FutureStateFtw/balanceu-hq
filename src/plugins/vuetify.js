// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

const vuetify = createVuetify({
  display: {
    mobileBreakpoint: 'sm',
    thresholds: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,  
      xxl: 2560, // This was 2561
    },
  },
  theme: {
    defaultTheme: 'customTheme', // Set your custom theme as the default
    themes: {
      customTheme: {
        dark: false, // Set to true for a dark theme
        colors: {
          // Dynamic theme colors (will be updated by theme store)
          primary: '#2E5984',
          secondary: '#4A90E2', 
          accent: '#87CEEB',
          success: '#4CAF50',
          warning: '#FF9800',
          error: '#F44336',
          info: '#2196F3'
        },
      },
    },
    variations: {
      colors: ['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info'],
      lighten: 1,
      darken: 1
    }
  },
})

// Make vuetify globally accessible for theme updates
window.vuetifyInstance = vuetify

export default vuetify


