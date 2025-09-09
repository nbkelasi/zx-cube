<template>
  <div
  class="zx-collapse"
  >
  <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, watch } from 'vue'
import type { NameType, CollapseProps, CollapseEmits } from './types'
import { collapseContextKey } from './types'
defineOptions({
  name: 'ZxCollapse'
})
const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()
// 初始值是关闭的
const activeNames = ref<NameType[]>(props.modelValue)
// 修复动态修改optionValue activeNames不随着变
watch( () => props.modelValue,()=>{
  activeNames.value = props.modelValue
})

if(props.accordion && activeNames.value.length > 1){
  console.warn('accordion mode should only have one active item');
}

// 处理点击逻辑
const handleItemClick = (item: NameType) =>{
  let _activeNames = [...activeNames.value]
  if(props.accordion) {
    _activeNames = [ activeNames.value[0] === item ? '' : item ]
    activeNames.value = _activeNames
  } else {
    const index = _activeNames.indexOf(item)
    if(index > -1){
      // 如果存在，则删除
      _activeNames.splice(index,1)
      activeNames.value = _activeNames
    } else {
      // 不存在则，插入
      _activeNames.push(item);
      activeNames.value = _activeNames
    }
  }
  emits('update:modelValue', _activeNames)
  emits('change', _activeNames)
}
// 数据注入
provide(collapseContextKey, {
  activeNames,
  handleItemClick
})
</script>
