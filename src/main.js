import '@/shared/styles/main.css'

import { createApp } from 'vue'

import App from '@/app/App.vue'
import { pinia } from '@/app/providers/pinia'
import router from '@/app/router'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
