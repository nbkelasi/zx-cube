import type { App } from 'vue'
import Form from '@/components/Form/Form.vue'
import FormItem from '@/components/Form/FormItem.vue'
Form.install = (app: App) => {
  app.component(Form.name || 'ZxForm', Form)
}
FormItem.install = (app: App) => {
  app.component(FormItem.name || 'ZxFormItem', FormItem)
}
export default Form
export {
  FormItem
}
export * from './types'
