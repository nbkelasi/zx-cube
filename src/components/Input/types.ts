
export interface InputProps {
  type?: string;
  modelValue: string;
  size?: 'large' | 'small';
  clearable?: boolean;
  showPassword?: boolean;
  disabled?: boolean;
  placeholder?: string;
  readonly?: boolean;
  autocomplete?: string;
  autofocus?: boolean;
  form?: string;
}

export interface InputEmits {
  'update:modelValue': [value: string];
  // input 的值有变化就触发
  input: [value: string];
  // input 的change的值改变了，并失去了focus
  change: [value: string];
  focus: [value: FocusEvent];
  blur: [value: FocusEvent];
  clear: [];
}

export interface InputInstance {
  ref: HTMLInputElement | HTMLTextAreaElement
}
