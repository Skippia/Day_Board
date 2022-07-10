<script setup lang='ts'>
const storeDay = useStoreDay()

//* Loading data for current month
storeDay.loadAllPageData()

//* Filtered data for current range date
const getFilteredDaysByDate = computed(() => storeDay.getFilteredDaysByDate)

const { filterDate, filterByDate } = useDateFilter()

//* Filtering by today
filterByDate(filterDate)
</script>

<template>
  <div class="w-full h-full text-black flex flex-col items-center bg-emerald-500/70">
    <p class="text-white/90">
      {{ getFilteredDaysByDate }}
    </p>
  </div>
</template>

<style lang='scss' scoped>
</style>
