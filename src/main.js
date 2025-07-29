import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css' // Update to './globals.css' if you use that name

const app = createApp(App)
app.use(router)
app.mount('#app')