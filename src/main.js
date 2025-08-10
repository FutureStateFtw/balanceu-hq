// Components
import App from './App.vue'

// Styles
import './assets/liquid-glass-std.css'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)
registerPlugins(app)

app.mount('#app')
