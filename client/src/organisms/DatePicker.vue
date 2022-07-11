<script setup lang='ts'>
const storeDayFilter = useStoreDayFilter()
const toggleFilters = computed(() => storeDayFilter.getToggleFilters)

const currentMode = ref<'single' | 'multi'>('single')
const renderedElement = ref<HTMLElement>()

//* Flag whether the datepicker is loaded and helpers for datepicker
const {
  isRenderedComponent, switchPreviousMonth, switchNextMonth, getAmountDaysInCurrentMonth,
}
  = useSwitchMonthsDatePicker()

//* Setting custom listener for datepicker (primary filter)
const {
  toggleFilter: primaryEdge,
  data: primaryEdgeData,
} = useDateClickListener({
  activeClasses: ['bg-emerald-500/40'],
  condition: (e: MouseEvent) => {
    return !e.ctrlKey
  },
  primaryFilter: true,
})

//* Setting custom listener for datepicker (additional filter)
const {
  toggleFilter: additionalEdge,
  data: additionalEdgeData,
} = useDateClickListener({
  activeClasses: ['bg-pink-500/40'],
  condition: (e: MouseEvent) => {
    return e.ctrlKey
  },
  primaryFilter: false,
})

//* Watch out for edge data and changing of mode
watch([currentMode, primaryEdgeData, additionalEdgeData], ([currentMode, primaryEdgeData, additionalEdgeData]) => {
  if (currentMode === 'single')
    storeDayFilter.updateFilterDate([primaryEdgeData])
  else if (currentMode === 'multi')
    storeDayFilter.updateFilterDate([primaryEdgeData, additionalEdgeData])
})

//* Configuring change day event (@click) depending on filters
const { changeDay } = useTrackDatePicker({ renderedElement, toggleFilters })

//* Tracking state of rerender component
function updateStateRenderedEl(renderedEl: HTMLElement | undefined) {
  return renderedElement.value = renderedEl
}

//* Tracking state of mode filter
function updateFilterMode(mode: 'single' | 'multi') {
  currentMode.value = mode
  //* Primary filter is working always (by default)
  if (mode === 'single') {
    //* Invoke appropriate before remove filter function
    storeDayFilter.getToggleFilters[1].beforeRemove()
    //* Remove additional filter
    storeDayFilter.updateToggleFilters([primaryEdge])
  }

  else if (mode === 'multi') {
    //* Adding additional filter
    storeDayFilter.updateToggleFilters([primaryEdge, additionalEdge])
    //* Init additional filter
    storeDayFilter.getToggleFilters[1].init()
  }
}

//* Single mode switch on
storeDayFilter.updateToggleFilters([primaryEdge])
</script>

<template>
  <div class="flex flex-col">
    <div class="flex flex-col items-center">
      <CalendarHeader :switch-previous-month="switchPreviousMonth" :switch-next-month="switchNextMonth" />
      <hr>
      <CalendarBody
        :is-rendered-component="isRenderedComponent"
        :get-amount-days-in-current-month="getAmountDaysInCurrentMonth" :change-day="changeDay"
        @updateStateRenderedEl="updateStateRenderedEl"
      />
    </div>

    <FilterMode :initial-current-mode="currentMode" @updateMode="updateFilterMode" />

    <CalendarStats
      :primary-edge-data="primaryEdgeData" :additional-edge-data="additionalEdgeData"
      :current-mode="currentMode"
    />
  </div>
</template>

<style lang='scss' scoped>
</style>
