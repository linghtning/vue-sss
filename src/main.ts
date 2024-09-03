import '@/design/index.less'

import 'virtual:svg-icons-register'

import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'
import { registerGlobComp } from '@/components/registerGlobComp'
import { setupGlobDirectives } from '@/directives'
import { setupLibrary } from '@/logics/setupLibrary'

import 'virtual:uno.css' // uno.css

function bootstrap() {
  const app = createApp(App)

  setupStore(app)

  setupRouter(app)

  registerGlobComp(app)

  setupGlobDirectives(app)

  setupLibrary()

  app.mount('#app')
}

bootstrap()
