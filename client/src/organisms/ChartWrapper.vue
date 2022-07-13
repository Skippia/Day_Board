<script setup lang='ts'>
import RadarChart from '~/organisms/V/RadarChart.vue'
const storeDatePicker = useStoreDatePicker()

//* Filtered data for current range date
const getDaysByDate = computed(() => storeDatePicker.getDaysByDate)
</script>

<template>
  <div class="w-full h-full text-black flex flex-col items-center grad">
    <p class="text-white/90">
      <!-- {{ getDaysByDate }} -->
    </p>
    <RadarChart />
  </div>
</template>

<style lang='scss' scoped>
.grad {
background-image: linear-gradient(to right top, #051937, #222840, #38394a, #4b4b54, #5e5e5e);
  // background-image: linear-gradient(to right top, #272c2d, #353f41, #445455, #546969, #647f7e, #637e7c, #627c7a, #617b78, #4e6261, #3c4b4a, #2a3434, #1a1f1f);
}
</style>
