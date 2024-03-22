import "@/styles/common.scss"
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import {lazyLoadPlugin} from '@/directives/directivesPlugin.js';
import {componentsPlugin} from "@/components/componentsPluging.js";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(lazyLoadPlugin)
app.use(componentsPlugin)
app.mount('#app')

