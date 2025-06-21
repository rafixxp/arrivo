import { createApp } from 'vue'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import router from './router'
import App from './App.vue'

createApp(App).use(router).mount('#app')
