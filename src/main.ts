import '@fontsource/special-elite/latin-400.css'
import '@fontsource/special-elite/latin-ext-400.css'
import '@fontsource/ibm-plex-sans/latin-400.css'
import '@fontsource/ibm-plex-sans/latin-500.css'
import '@fontsource/ibm-plex-sans/latin-600.css'
import '@fontsource/ibm-plex-sans/latin-ext-400.css'
import '@fontsource/ibm-plex-sans/latin-ext-500.css'
import '@fontsource/ibm-plex-sans/latin-ext-600.css'
import '@fontsource/ibm-plex-mono/latin-400.css'
import '@fontsource/ibm-plex-mono/latin-500.css'
import '@fontsource/ibm-plex-mono/latin-ext-400.css'
import '@fontsource/ibm-plex-mono/latin-ext-500.css'

import { inject } from '@vercel/analytics'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import './style.css'

inject()

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
