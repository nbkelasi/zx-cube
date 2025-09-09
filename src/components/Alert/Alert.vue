<template>
  <transition name="fade-up">
    <div
    v-show="visible"
    class="zx-alert"
    :class="{
      [`zx-alert--${type}`]: type,
      [`is-${theme}`]: theme,
    }"
    >
      <div class="zx-alert__content">
        <span class="zx-alert__title" :class="{ 'is-description': description }">{{ title }}</span>
        <p v-if="description" class="zx-alert__description">{{ description }}</p>
        <template v-if="closable">
          <div v-if="closeText" class="zx-alert__close" @click="close">{{ closeText }}</div>
          <Icon v-else icon="xmark" class="zx-alert__close zx-alert__icon" @click="close"></Icon>
        </template>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { AlertEmits, AlertProps } from './types'
import Icon from '../Icon/Icon.vue';

defineOptions({
  name: 'ZxAlert'
})
withDefaults(defineProps<AlertProps>(), {
  type: 'info',
  theme: 'light',
  closable: true
})
const emit = defineEmits<AlertEmits>()
const visible = ref(true)

const close = (e: Event) => {
  visible.value = false
  emit('close', e)
}

</script>
