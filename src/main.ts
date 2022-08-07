import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import './assets/css/index.less'
import { setupStore } from '@/store/index'

setupStore()
createApp(App).use(router).use(store).mount('#app')
