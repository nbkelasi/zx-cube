<template>
  <div
  class="zx-input"
  :class="{
    [`zx-input--${type}`]: type,
    [`zx-input--${size}`]: size,
    'is-disabled': disabled,
    'is-prepend': $slots.prepend,
    'is-append': $slots.append,
    'is-prefix': $slots.prefix,
    'is-suffix': $slots.suffix,
    'is-focus': isFocus
  }"
  >
   <!-- input -->
   <template v-if="type !== 'textarea'">
    <!-- prepend slot -->
     <div v-if="$slots.prepend" class="zx-input__prepend">
      <slot name="prepend"></slot>
     </div>
     <div class="zx-input__wrapper">
        <!-- prefix slot -->
        <span v-if="$slots.prefix" class="zx-input__prefix">
          <slot name="prefix"></slot>
        </span>
        <input
        class="zx-input__inner"
        :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
        v-bind="attrs"
        ref="inputRef"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :form="form"
        v-model="innerValue"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        >
        <!-- suffix slot -->
         <span v-if="$slots.suffix || showClear || showPasswordArea" class="zx-input__suffix" @click="keepFocus">
          <slot name="suffix"></slot>
          <Icon
          icon="circle-xmark"
          v-if="showClear"
          class="zx-input__clear"
          @click="clear"
          @mousedown.prevent="NOOP"
          />
          <Icon
          icon="eye"
          v-if="showPasswordArea && passwordVisible"
          class="zx-input__password"
          @click="togglePasswordVisible"
          />
          <Icon
          icon="eye-slash"
          v-if="showPasswordArea && !passwordVisible"
          class="zx-input__password-slash"
          @click="togglePasswordVisible"
          />
         </span>
     </div>
     <!-- append slot -->
      <div v-if="$slots.append" class="zx-input__append">
        <slot name="append"></slot>
      </div>
   </template>
   <!-- textarea -->
    <template v-else>
      <textarea
      class="zx-textarea__wrapper"
      v-bind="attrs"
      ref="inputRef"
      :disabled="disabled"
      :readonly="readonly"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :autofocus="autofocus"
      :form="form"
      v-model="innerValue"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      >
      </textarea>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, useAttrs, nextTick } from 'vue'
import type { Ref } from 'vue'
import type { InputProps, InputEmits } from './types'
import Icon from '../Icon/Icon.vue'

defineOptions({
  name: 'ZxInput',
  inheritAttrs: false
})

const props = withDefaults(defineProps<InputProps>(),{
  type: 'text',
  autocomplete: 'off'
})
const emits = defineEmits<InputEmits>()
const attrs = useAttrs()
const innerValue = ref(props.modelValue)
const isFocus = ref(false)
const passwordVisible = ref(false)
const inputRef = ref() as Ref<HTMLInputElement>

const NOOP = () =>{}
const showClear = computed(() =>
  props.clearable && !props.disabled && !!innerValue.value && isFocus.value
)
const showPasswordArea = computed(() =>
  props.showPassword && !props.disabled && !!innerValue.value
)
const togglePasswordVisible = () =>{
  passwordVisible.value = !passwordVisible.value
}
const keepFocus = async() => {
  await nextTick()
  inputRef.value.focus()
}
const handleInput = () => {
  emits('update:modelValue', innerValue.value)
  emits('input', innerValue.value)
}
const handleChange = () => {
  emits('change', innerValue.value)
}
const handleFocus = (event: FocusEvent) => {
  isFocus.value = true
  emits('focus', event)
}
const handleBlur = (event: FocusEvent) => {
  isFocus.value = false
  emits('blur', event)
}
const clear = () => {
  innerValue.value = ''
  emits('update:modelValue', '')
  emits('clear')
  emits('input', '')
  emits('change', '')
}
watch(() => props.modelValue, (newValue) => {
  innerValue.value = newValue
})

defineExpose({
  ref: inputRef
})
</script>
