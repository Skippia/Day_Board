import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import routes from 'virtual:generated-pages'

import '@unocss/reset/tailwind.css'
import 'uno.css'

import './assets/styles/base.scss'
import './assets/styles/ui.scss'

const app = createApp(App)

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

app.use(router).use(createPinia())

app.config.errorHandler = (err, instance, info) => {
    console.error(err, instance, info)
}
app.mount('#app')
