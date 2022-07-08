<script setup lang='ts'>
const {
  switchPreviousMonth, switchNextMonth, currentMonth,
  currentYear, changeDay, getAmountCurrentDays, daysWeek, months,
}
  = useChooseDatePicker()
</script>

<template>
  <div class="flex flex-col items-center">
    <header class="w-full h-2em flex p-7 bg-dark-900/80 justify-between items-center">
      <div class="i-carbon:chevron-left arrow-toggler" @click="switchPreviousMonth" />
      <p class="text-white text-4xl">
        {{ months[currentMonth] }} {{ currentYear }}
      </p>
      <div
        class="i-carbon:chevron-right arrow-toggler"
        @click="switchNextMonth"
      />
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
.arrow-toggler {
  @apply text-4xl text-white/60 hover:text-white hover:scale-125 duration-300 hover:cursor-pointer;
}

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
