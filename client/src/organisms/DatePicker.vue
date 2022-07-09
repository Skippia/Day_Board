<script setup lang='ts'>
const renderEl = ref<HTMLElement>()

const {
  isRenderedComponent, switchPreviousMonth, switchNextMonth, currentMonth,
  currentYear, changeDay, getAmountCurrentDays, daysWeek, months,
}
  = useChooseDatePicker(renderEl)
</script>

<template>
  <div class="flex flex-col items-center">
    <header class="w-full h-2em flex p-7 bg-dark-900/80 justify-between items-center">
      <div class="i-carbon:chevron-left arrow-toggler" @click="switchPreviousMonth" />
      <p class="text-white text-4xl">
        {{ months[currentMonth] }} {{ currentYear }}
      </p>
      <div class="i-carbon:chevron-right arrow-toggler" @click="switchNextMonth" />
    </header>
    <hr>
    <main class="flex flex-col p-4 w-full">
      <div class="flex justify-between">
        <p v-for="dayWeek in daysWeek" :key="dayWeek" class="text-black font-bold">
          {{ dayWeek }}
        </p>
      </div>
      <Transition name="list" appear mode="out-in">
        <div v-if="isRenderedComponent" ref="renderEl" class="data-row">
          <p v-for="day in getAmountCurrentDays" :key="day" class="data-el" :data-day="day" @click="changeDay">
            {{ day }}
          </p>
        </div>
      </Transition>
    </main>
  </div>
</template>

<style lang='scss' scoped>
.arrow-toggler {
  @apply text-4xl text-white/60 hover: text-white hover:scale-125 duration-300 hover:cursor-pointer;
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

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
