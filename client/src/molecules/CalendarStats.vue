<script setup lang='ts'>
const props = defineProps<{
  primaryEdgeData: object
  additionalEdgeData: object
  currentMode: 'multi' | 'single'
}>()
</script>

<template>
  <div class="flex flex-col bg-gray-600/90 p-5 rounded w-90 mx-auto my-3">
    <p class="text-white text-xl">
      {{ primaryEdgeData }}
    </p>
    <p v-if="currentMode === 'multi'" class="text-white text-xl">
      {{ additionalEdgeData }}
    </p>
  </div>
</template>

<style lang='scss' scoped>

</style>
