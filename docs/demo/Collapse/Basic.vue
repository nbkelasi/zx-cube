<script setup>
    import { ref } from 'vue'
    import Collapse from '@/components/Collapse/Collapse.vue'
    import CollapseItem from '@/components/Collapse/CollapseItem.vue'
    const optionValue = ref(["a"]);
</script>

<template>
<Collapse v-model="optionValue">
      <CollapseItem name="a">
        <template #title>
          <b>this is title A</b>
        </template>
        <h1>headline title</h1>
        <div>this is content</div>
      </CollapseItem>
      <CollapseItem name="b">
        <template #title>
          <b>this is title B</b>
        </template>
        <div>this is bbb title</div>
      </CollapseItem>
      <CollapseItem name="c" disabled>
        <template #title>
          <b>this is title C</b>
        </template>
        <div>this is ccc title</div>
      </CollapseItem>
    </Collapse>
    {{ optionValue }}
</template>
