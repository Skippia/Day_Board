<script setup lang='ts'>
interface Props {
  name: string
  label: string
}
// @ts-expect-error it's really used
const props = defineProps<Props>()
</script>

<template>
  <label class="label-input" :for="name">{{ label }}</label>
</template>

<style lang='scss' scoped>
.label-input {
  @apply self-start text-gray-300 font-bold text-sm;
}
</style>
