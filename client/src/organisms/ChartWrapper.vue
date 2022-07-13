<script setup lang='ts'>
const storeDatePicker = useStoreDatePicker()

//* Filtered data for current range date
const getDaysByDate = computed(() => storeDatePicker.getDaysByDate)
</script>

<template>
  <div class="w-full h-full text-black flex flex-col items-center bg-emerald-500/70">
    <p class="text-white/90">
      {{ getDaysByDate }}
    </p>
  </div>
</template>

<style lang='scss' scoped>
</style>
