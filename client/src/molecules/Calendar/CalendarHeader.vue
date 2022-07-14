<script setup lang='ts'>
import { months } from '~/utils/constants'
const props = defineProps<{
  switchPreviousMonth: (e: Event) => void
  switchNextMonth: (e: Event) => void
}>()

const storeDayFilter = useStoreDayFilter()
const getCurrentDate = computed(() => storeDayFilter.getCurrentDate)
</script>

<template>
  <header class="w-full h-2em flex p-7 bg-dark-900/80 justify-between items-center">
    <div class="i-carbon:chevron-left arrow-toggler" @click="switchPreviousMonth" />
    <p class="text-white text-4xl">
      {{ months[getCurrentDate.month] }} {{ getCurrentDate.year }}
    </p>
    <div class="i-carbon:chevron-right arrow-toggler" @click="switchNextMonth" />
  </header>
</template>

<style lang='scss' scoped>
.arrow-toggler {
  @apply text-4xl text-white/60 hover: text-white hover:scale-125 duration-300 hover:cursor-pointer;
}
</style>
