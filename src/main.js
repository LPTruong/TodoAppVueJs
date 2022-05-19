import { createApp, VueElement } from 'vue'

import App from './App.vue'
import './components/TodoApp.css'
import routers from './router'
import store from './store/index'

const app = createApp(App)
app.use(routers)
app.use(store)
app.mount('#app')

