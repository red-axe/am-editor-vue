// windicss layers
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
// windicss utilities should be the last style import
import 'virtual:windi-utilities.css'
// windicss devtools support (dev only)
import 'virtual:windi-devtools'

import App from './App.vue'
import { createApp } from 'vue'
import router from './router'

const app = createApp(App).use(router)
app.mount('#app')
