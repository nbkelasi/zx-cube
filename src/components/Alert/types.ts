export type AlertType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type AlertTheme = 'light' | 'dark'

export interface AlertProps {
  type?: AlertType
  theme?: AlertTheme
  title?: string,
  description?: string
  closable?: boolean
  closeText?: string
}

export interface AlertEmits {
  close: [value: Event]
}
