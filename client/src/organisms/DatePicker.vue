<script setup lang='ts'>
const renderEl = ref<HTMLElement>()
const currentMode = ref('single')
const storeDayFilter = useStoreDayFilter()

//* Flag whether the datepicker is loaded, current date (datapicker) and helpers for datepicker
const {
  isRenderedComponent, switchPreviousMonth, switchNextMonth,
  currentDate, getAmountCurrentDays, daysWeek, months,
}
  = useDatePicker()

//* Setting custom listener for datepicker (primary filter)
const {
  toggleActivator: primaryEdge,
  data: primaryEdgeData,
} = useDateClickListener({
  activeClasses: ['bg-emerald-500/40'],
  currentDate,
  condition: (e: MouseEvent) => {
    return !e.ctrlKey
  },
  primaryFilter: true,
})

//* Setting custom listener for datepicker (additional filter)
const {
  toggleActivator: additionalEdge,
  data: additionalEdgeData,
} = useDateClickListener({
  activeClasses: ['bg-pink-500/40'],
  currentDate,
  condition: (e: MouseEvent) => {
    return e.ctrlKey
  },
  primaryFilter: false,
})

//* Single mode switch on
storeDayFilter.updateToggleActivators([primaryEdge])

//* Configuring change day event (@click) depending on filters
const { changeDay }
  = useTrackDatePicker({
    renderEl,
    currentDate,
  })

watch(currentMode, (newMode) => {
  //* Primary filter is working always (by default)
  if (newMode === 'single') {
    //* Invoke appropriate before remove filter function
    storeDayFilter.getToggleActivators[1].beforeRemove()
    //* Remove additional filter
    storeDayFilter.updateToggleActivators([primaryEdge])
  }

  else if (newMode === 'multi') {
    //* Adding additional filter
    storeDayFilter.updateToggleActivators([primaryEdge, additionalEdge])
    //* Init additional filter
    storeDayFilter.getToggleActivators[1].init()
  }
})
</script>

<template>
  <div class="flex flex-col">
    <div class="flex flex-col items-center">
      <header class="w-full h-2em flex p-7 bg-dark-900/80 justify-between items-center">
        <div class="i-carbon:chevron-left arrow-toggler" @click="switchPreviousMonth" />
        <p class="text-white text-4xl">
          {{ months[currentDate.month] }} {{ currentDate.year }}
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

    <fieldset class="bg-light-400 flex w-full justify-around">
      <legend class="bg-gray-900/80 px-2 ml-2 rounded">
        Choose day mode
      </legend>
      <input id="single-mode" v-model="currentMode" class="hidden" value="single" name="mode" type="radio">
      <label
        :class="{ 'mode--active border-r-4': currentMode === 'single', 'mode--passive': currentMode !== 'single' }"
        class="toggle-label ml-2 rounded-l-2xl border-3 border-r-0" for="single-mode"
      >Single day</label>

      <input id="multi-mode" v-model="currentMode" class="hidden" value="multi" name="mode" type="radio">
      <label
        :class="{ 'mode--active border-l-4': currentMode === 'multi', 'mode--passive': currentMode !== 'multi' }"
        class="toggle-label mr-2 rounded-r-2xl border-3 border-l-0" for="multi-mode"
      >Multi day</label>
    </fieldset>

    <div class="flex flex-col bg-gray-600/90 p-5 rounded w-90 mx-auto my-3">
      <p class="text-white text-xl">
        {{ primaryEdgeData }}
      </p>
      <p v-if="currentMode === 'multi'" class="text-white text-xl">
        {{ additionalEdgeData }}
      </p>
    </div>
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

.toggle-label {
  @apply text-xl bg-light-50 text-black font-bold flex items-center justify-center w-full my-2 p-2 block text-center duration-300 transition-all;
}

.mode--active {
  @apply bg-sky-100/90 text-xl text-sky-600 border-sky-600;
}

.mode--passive {
  @apply opacity-20 hover: opacity-100 hover:scale-105 hover:cursor-pointer;
}
</style>
