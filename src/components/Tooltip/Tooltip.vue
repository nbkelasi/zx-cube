<template>
  <div class="zx-tooltip"
  ref="poperCountainerNode"
  v-on="outEvents"
  >
    <div
    class="zx-tooltip__trigger"
    ref="triggerNode"
    v-on="events"
    >
      <slot></slot>
    </div>
    <transition :name="transition">
      <div
      v-if="isOpen"
      class="zx-tooltip__popper"
      ref="popperNode"
      >
        <slot name="content">
          {{content}}
        </slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive, onUnmounted, computed } from "vue"
import { debounce } from 'lodash-es'
import { createPopper } from '@popperjs/core'
import type { Instance } from '@popperjs/core'
import type { TooltipProps, TooltipEmits, TooltipInstance } from "./types"
import useClickOutside from '../../hooks/useClickOutside'
defineOptions({
  name:'ZxTooltip'
})
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover',
  transition:'fade',
  openDelay: 0,
  closeDelay: 0,
})
const emits = defineEmits<TooltipEmits>()
// 属性
const isOpen = ref(false);
const popperNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
const poperCountainerNode = ref<HTMLElement>()
let poperInstance: Instance | null = null
let events: Record<string, unknown> = reactive({})
let outEvents: Record<string, unknown> = reactive({})
const popperOptions = computed(() => {
  return {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 9],
        },
      },
    ],
    ...props.popperOptions
  }
})
// 开关事件逻辑
const open = () => {
  isOpen.value = true
  emits("visible-change", true)
}
const close = () => {
  isOpen.value = false
  emits("visible-change", false)
}
const openDebounce = debounce(open, props.openDelay)
const closeDebounce = debounce(close, props.closeDelay)
// finally funciton
const openFinal = () => {
  closeDebounce.cancel()
  openDebounce()
}
const closeFinal = () => {
  openDebounce.cancel()
  closeDebounce()
}
const togglePopper = () => {
  if(isOpen.value){
    closeFinal()
  } else {
    openFinal()
  }
}
// 外部点击取消显示
useClickOutside(poperCountainerNode, () => {
  if(props.trigger === 'click' && isOpen.value && !props.manual){
    closeFinal()
  }
  if (isOpen.value) {
    emits('click-outside', true)
  }
})
// 事件绑定
const attachEvents = () => {
  if(props.trigger === 'hover') {
    events['mouseenter'] = openFinal
    outEvents['mouseleave'] = closeFinal

  } else if(props.trigger === 'click'){
    events['click'] = togglePopper
  }
}
if(!props.manual) {
  attachEvents()
}
// 监听属性
watch(() => props.manual, (isManual) => {
  if(isManual){
    events = {}
    outEvents = {}
  } else {
    attachEvents()
  }
})
watch(() => props.trigger, (newTrigger, oldTrigger) => {
  if(newTrigger !== oldTrigger) {
    // clear the events
    events = {}
    outEvents = {}
    attachEvents()
  }
})
watch(isOpen, (newVlaue) => {
  if(newVlaue) {
    if(triggerNode.value && popperNode.value){
      poperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value)
    } else {
      poperInstance?.destroy()
    }
  }
}, { flush: 'post'})
// 销毁实例
onUnmounted(() => {
  poperInstance?.destroy()
})
// 透传事件
defineExpose<TooltipInstance>({
  'show': openFinal,
  'hide': closeFinal
})
</script>

<style></style>
