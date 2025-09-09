import type { App } from 'vue'
import Switch from '@/components/Switch/Switch.vue'

Switch.install = (app: App) => {
  app.component(Switch.name || 'ZxSwitch', Switch)
}

export default Switch

export * from './types'
