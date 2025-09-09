import type { Ref, InjectionKey } from 'vue'
export type NameType = string | number

export interface CollapseProps {
  modelValue: NameType[];
  accordion?: boolean;
}

export interface CollapseItemProps {
  name: NameType;
  title?: string;
  disabled?: boolean;
}

export interface CollapseContext {
  activeNames: Ref<NameType[]>;
  handleItemClick: (name: NameType) => void;
}

// export interface CollapseEmits {
//   (e:'update:modelValue',values:NameType[]) : void;
//   (e:'change', values: NameType[]) : void;
// }
// 新版写法
export interface CollapseEmits {
  'update:modelValue': [values: NameType[]]
  change: [values: NameType[]]
}

export const collapseContextKey: InjectionKey<CollapseContext> = Symbol('collapseContextKey')
