<template>
  <div
  class="zx-select"
  :class="{'is-disabled': disabled}"
  @click="toggleDropdown"
  @mouseenter="states.mouseHover = true"
  @mouseleave="states.mouseHover = false"
  >
    <Tooltip
      placement="bottom-start"
      ref="tooltipRef"
      :popperOptions="popperOptions"
      @click-outside="controlDropdown(false)"
      manual
    >
      <Input
        v-model="states.inputValue"
        ref="InputRef"
        :placeholder="filteredPlaceholder"
        :disabled="disabled"
        :readonly="!filterable || !isDropdownShow"
        @input="debounceOnFilter"
        @keydown="handleKeydown"
      >
        <template #suffix>
          <Icon
            icon="circle-xmark"
            v-if="showClearIcon"
            class="zx-input__clear"
            @mousedown="NOOP"
            @click="onClear"
          />
          <Icon
            icon="angle-down"
            v-else class="header-angle"
            :class="{'is-active': isDropdownShow}"
          />
        </template>
      </Input>
      <template #content>
        <div class="zx-select__loading" v-if="states.loading">loading <Icon icon="spinner" spin /></div>
        <div class="zx-select__nodata" v-else-if="filterable && filteredOptions.length === 0">no matching data</div>
        <ul class="zx-select__menu">
          <template v-for="(item, index) in filteredOptions" :key="index">
            <li
              class="zx-select__menu-item"
              :class="{
                'is-disabled': item.disabled,
                'is-selected': states.selectedOption?.value === item.value,
                'is-highlighted': states.highlightIndex === index
              }"
              :id="`selct-item-${item.value}`"
              @click.stop="itemSelect(item)"
            >
              <RenderVnode :vNode="renderLabel ? renderLabel(item) : item.label"/>
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import type { Ref } from 'vue'
import { isFunction, debounce } from 'lodash-es'
import type { SelectProps, SelectEmits, SelectOption, SelectStates } from './types'
import Tooltip from '../Tooltip/Tooltip.vue';
import Input from '../Input/Input.vue';
import Icon from '../Icon/Icon.vue';
import RenderVnode from '../Common/RenderVnode';
import type { TooltipInstance } from '../Tooltip/types'
import type { InputInstance } from '../Input/types'

const findOption = (value: string) => {
  const option = props.options.find(option => option.value === value)
  return option ? option : null
}
defineOptions({
  name: 'ZxSelect'
})
const props = withDefaults(defineProps<SelectProps>(), {
  options: () => []
})
const timeout = computed(() => props.remote ? 300 : 0)
const emits = defineEmits<SelectEmits>()
const tooltipRef = ref() as Ref<TooltipInstance>
const InputRef = ref() as Ref<InputInstance>
const initialOption = findOption(props.modelValue)
const states = reactive<SelectStates>({
  inputValue: initialOption ? initialOption.label : '',
  selectedOption: initialOption,
  mouseHover: false,
  loading: false,
  highlightIndex: -1
})
watch(() => props.modelValue,(val) => {
  const option = findOption(val)
  states.inputValue = option ? option.label : ''
  states.selectedOption = option
})
const isDropdownShow = ref(false)
const popperOptions: any = {
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 9],
      },
    },
    {
      name: "sameWidth",
      enabled: true,
      phase: "beforeWrite",
      requires: ["computeStyles"],
      fn: ({ state }: {state: any}) => {
        state.styles.popper.width = `${state.rects.reference.width}px`;
      }
    }
  ],
}
const filteredOptions = ref(props.options)
watch(() => props.options, (newOptions) => {
  filteredOptions.value = newOptions
})
const generateFilterOptions = async (searchValue: string) =>{
  if(!props.filterable) return
  if(props.filterMethod && isFunction(props.filterMethod)) {
    filteredOptions.value = props.filterMethod(searchValue)
  } else if(props.remote && props.remoteMethod && isFunction(props.remoteMethod)){
    states.loading = true
    try {
      filteredOptions.value = await props.remoteMethod(searchValue)
    } catch (e) {
      console.log(e);
      filteredOptions.value = []
    } finally {
      states.loading = false
    }
  } else {
    filteredOptions.value = props.options.filter(option => option.label.includes(searchValue))
  }
  states.highlightIndex = -1
}
const onFilter = () => {
  generateFilterOptions(states.inputValue)
}
const debounceOnFilter = debounce(() => {
  onFilter()
}, timeout.value)
const filteredPlaceholder = computed(() => {
  return (props.filterable && states.selectedOption && isDropdownShow.value)
  ? states.selectedOption.label : props.placeholder
})
const controlDropdown = (show: boolean) => {
  if(show) {
    // filter模式
    // 之前选择过对应的值
    if(props.filterable && states.selectedOption) {
      states.inputValue = ''
    }
    if(props.filterable) {
      generateFilterOptions(states.inputValue)
    }
    tooltipRef.value.show()
    states.highlightIndex = -1
  } else {
    tooltipRef.value.hide()
    //filter模式下 blur时回灌选项label
    if (props.filterable) {
      states.inputValue = states.selectedOption ? states.selectedOption.label : ''
    }
  }
  isDropdownShow.value = show
  emits('visible-change', show)
}
const handleKeydown = (e: KeyboardEvent) => {
  switch(e.key) {
    case 'Enter':
      if(!isDropdownShow.value) {
        controlDropdown(true)
      } else {
        if(states.highlightIndex > -1 && filteredOptions.value[states.highlightIndex]) {
          itemSelect(filteredOptions.value[states.highlightIndex])
        } else {
          controlDropdown(false)
        }
      }
      break
    case 'Escape':
      if(isDropdownShow.value) {
        controlDropdown(false)
      }
      break
    case 'ArrowUp':
    e.preventDefault()
      if (filteredOptions.value.length > 0){
        if(states.highlightIndex === -1 || states.highlightIndex === 0){
          states.highlightIndex = filteredOptions.value.length -1
        } else {
          // move up
          states.highlightIndex--
        }
      }
      break
    case 'ArrowDown':
      e.preventDefault()
      if (filteredOptions.value.length > 0){
        if(states.highlightIndex === -1 || states.highlightIndex === (filteredOptions.value.length -1)){
          states.highlightIndex = 0
        } else {
          // move up
          states.highlightIndex++
        }
      }
      break
    default:
      break
  }
}
const showClearIcon = computed(() => {
  // hover 上去
  // props.clearable 为 true
  // 必须要选择过选项
  return props.claerable && states.mouseHover && states.selectedOption && states.inputValue.trim() !== ''
})
const onClear = () => {
  states.selectedOption = null
  states.inputValue = ''
  emits('clear')
  emits('change', '')
  emits('update:modelValue', '')
}
const NOOP = () => {}
const toggleDropdown = () => {
  if(props.disabled) return
  if(isDropdownShow.value){
    controlDropdown(false)
  } else {
    controlDropdown(true)
  }
}
const itemSelect = (e: SelectOption) => {
  if(e.disabled) return
  states.inputValue = e.label
  states.selectedOption = e
  emits('change', e.value)
  emits('update:modelValue', e.value)
  controlDropdown(false)
  InputRef.value.ref.focus()
}

</script>
