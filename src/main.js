import "@/styles/common.scss"
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import {lazyLoadPlugin} from '@/directives/directivesPlugin.js';
import {componentsPlugin} from "@/components/componentsPluging.js";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(lazyLoadPlugin)
app.use(componentsPlugin)
app.mount('#app')

