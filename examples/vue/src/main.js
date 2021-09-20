import { createApp } from 'vue'
import 'highlight.js/styles/color-brewer.css'
import App from './App.vue'
import { DemoBlock } from '../../../src/components'

const app = createApp(App)
app.use(DemoBlock)
app.mount('#app')
