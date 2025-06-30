import './assets/main.css'

import Aura from '@primeuix/themes/aura'
import { ToastService } from 'primevue'
import PrimeVue from 'primevue/config'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { key, store } from './store'

const app = createApp(App).use(store, key).use(router)
app.use(ToastService).use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      cssLayer: {
        name: 'primevue',
        order: 'theme, base, primevue',
      },
    },
  },
})

app.mount('#app')
