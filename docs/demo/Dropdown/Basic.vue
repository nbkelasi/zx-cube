<script setup>
import Dropdown from "@/components/Dropdown/Dropdown.vue";
import Button from '@/components/Button/Button.vue'
import {h} from "vue";
const opentions = [
  {key: 1, label: h('b','this is bold')},
  {key: 2, label: 'item2', disabled: true},
  {key: 3, label: 'item3', divided: true},
  {key: 4, label: 'item4'},
]
</script>

<template>
  <Dropdown
    :menu-options="opentions"
    placement="auto"
    trigger="click">
    <Button>下拉菜单</Button>
  </Dropdown>
</template>
