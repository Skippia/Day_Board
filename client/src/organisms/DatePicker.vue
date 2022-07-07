<script setup lang='ts'>
const { switchPreviousMonth, switchNextMonth, currentMonth, currentYear, changeDay, getAmountCurrentDays, daysWeek, months }
  = useChooseDatePicker()
</script>

<template>
  <div class="flex flex-col items-center">
    <header class="w-full h-2em flex bg-dark-900/80 justify-between items-center">
      <div class="i-carbon:chevron-left text-white text-3xl" @click="switchPreviousMonth" />
      {{ months[currentMonth] }} {{ currentYear }}
      <div class="i-carbon:chevron-right text-white text-3xl" @click="switchNextMonth" />
    </header>
    <hr>
    <main class="flex flex-col p-4">
      <div class="flex justify-between">
        <p v-for="day in daysWeek" :key="day" class="text-black font-bold">
          {{ day }}
        </p>
      </div>
      <div class="data-row">
        <p v-for="day in getAmountCurrentDays" :key="day" class="data-el" :data-day="day" @click="changeDay">
          {{ day }}
        </p>
      </div>
    </main>
  </div>
</template>

<style lang='scss' scoped>
.data-row {
  @apply flex flex-wrap;
  --gap: 0.5em;
  --columns: 7;
  gap: var(--gap);
}

.data-el {
  @apply flex text-black items-center justify-center rounded-[100%] p-4 transition-all;
  width: calc((100% / var(--columns)) - var(--gap) + (var(--gap) / var(--columns)));
}

.data-el:hover {
  background: rgba(22, 22, 22, 0.1);
  outline: thick double #32a1ce;
  cursor: pointer;
}
</style>
