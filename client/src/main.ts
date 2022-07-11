import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import routes from '~pages'

import '@unocss/reset/tailwind.css'
import 'uno.css'

import './assets/styles/base.scss'
import './assets/styles/ui.scss'

const app = createApp(App)

const components = [
  {
    name: 'AuthSignUp', path: 'organisms/Auth/AuthSignUp',
  },
  {
    name: 'AuthLogIn', path: 'organisms/Auth/AuthLogIn',
  },
]

// ! Dynamic imports for Tab component
components.forEach((component) => {
  app.component(component.name, defineAsyncComponent(() =>
    import(/* @vite-ignore */`./${component.path}.vue`),
  ))
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

app
  .use(router)
  .use(createPinia())

app.mount('#app')

