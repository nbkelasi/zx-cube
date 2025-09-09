<script setup>
import ZxAlert from '@/components/Alert/Alert.vue';


</script>

<template>
  <ZxAlert title="this is Alert define" type="primary"></ZxAlert>
  <ZxAlert title="this is Alert define" type="success"></ZxAlert>
  <ZxAlert title="this is Alert define" type="warning"></ZxAlert>
  <ZxAlert title="this is Alert define" type="danger"></ZxAlert>
  <ZxAlert title="this is Alert define" ></ZxAlert>
</template>

<style scoped>
.zx-alert {
  margin-bottom: 20px;
}
.zx-alert:last-child {
  margin-bottom: 0;
}
</style>
