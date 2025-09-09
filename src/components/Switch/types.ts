export type SwitchValueType = boolean | string | number

export interface SwtichProps {
  modelValue: SwitchValueType;
  disabled?: boolean;
  activeText?: string;
  inactiveText?: string;
  activeValue?: SwitchValueType;
  inactiveValue?: SwitchValueType;
  name?: string;
  id?: string;
  size?: 'small' | 'large';
}

export interface SwtichEmits {
  change: [value: SwitchValueType];
  'update:modelValue': [value: SwitchValueType];
}
