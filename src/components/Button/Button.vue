<template>
  <button
  ref="_ref"
  class="zx-button"
  :class="{
    [`zx-button--${type}`]: type,
    [`zx-button--${size}`]: size,
    'is-plain': plain,
    'is-round': round,
    'is-circle': circle,
    'is-disable': disabled,
    'is-loading': loading
  }"
  :disabled="disabled || loading"
  :autofocus="autofocus"
  :type="nativeType"
  >
  <Icon icon="spinner" spin v-if="loading"></Icon>
  <Icon :icon="icon" v-if="icon"></Icon>
  <span v-if="hasSlotContent()"><slot></slot></span>
  </button>
</template>

<script setup lang = "ts">
import { ref, useSlots } from 'vue'
import type { ButtonProps } from './types'
import Icon from '../Icon/Icon.vue'
defineOptions({
  name: 'ZxButton',
})

withDefaults(defineProps<ButtonProps>(),{
  nativeType: 'button',
})
const slots = useSlots()
const hasSlotContent = (): boolean => {
  return !!slots.default && slots.default().length > 0
}
const _ref = ref<HTMLButtonElement>()
defineExpose({
  ref : _ref,
})
</script>
