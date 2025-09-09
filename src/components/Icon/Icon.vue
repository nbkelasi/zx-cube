<template>
  <i class="zx-icon" :class="{[`zx-icon--${type}`]: type}" :style="customStyles" v-bind="$attrs">
    <font-awesome-icon v-bind="filteredProps"></font-awesome-icon>
  </i>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { omit } from 'lodash-es'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { IconProps } from './types'
defineOptions({
  name: 'ZxIcon',
  // 手动禁止透传到font-awesome-icon
  inheritAttrs: false
})
const props = defineProps<IconProps>()
// omit 要使用computed,不然它只赋值一次，无法响应后面的动态修改
const filteredProps =computed(() => omit(props, ['type','color']))
const customStyles = computed(() => {
  return props.color ? {color: props.color } : {}
})
</script>
