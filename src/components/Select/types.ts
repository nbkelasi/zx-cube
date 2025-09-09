import type { VNode } from "vue";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export type RenderLabelFunc = (options: SelectOption) => VNode;
export type CustomFilterFunc = (vlaue: string) => SelectOption[]
export type CustomFilterRemoteFunc = (vlaue: string) => Promise<SelectOption[]>


export interface SelectProps {
  modelValue: string;
  options?: SelectOption[];
  placeholder: string;
  disabled?: boolean;
  claerable?: boolean;
  renderLabel?: RenderLabelFunc;
  filterable?: boolean;
  filterMethod?: CustomFilterFunc;
  remote?: boolean;
  remoteMethod?: CustomFilterRemoteFunc;
}

export interface SelectStates {
  inputValue: string;
  selectedOption: null | SelectOption;
  mouseHover: boolean;
  loading: boolean;
  highlightIndex: number;
}



export interface SelectEmits {
  change: [value: string];
  'update:modelValue': [value: string];
  'visible-change': [value: boolean];
  'clear': [];
}
