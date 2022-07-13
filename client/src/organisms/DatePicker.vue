<script setup lang='ts'>
const storeDayFilter = useStoreDayFilter()
const toggleFilters = computed(() => storeDayFilter.getToggleFilters)

const currentMode = ref<'single' | 'multi'>('single')
const renderedElement = ref<HTMLElement>()

//* Flag whether the datepicker is loaded and helpers for datepicker (DOM fn-s & props)
const { isRenderedElement, getAmountDaysInCurrentMonth, switchNextMonth, switchPreviousMonth }
  = getDOMDatePicker(storeDayFilter)

//* Setting custom listener for datepicker (primary filter)
const { toggleFilter: primaryEdge, data: primaryEdgeDay } = useDateClickListener({
  activeClasses: ['bg-emerald-500/40'],
  condition: (e: MouseEvent) => {
    return !e.ctrlKey
  },
  primaryFilter: true,
  storeDayFilter,
})

//* Setting custom listener for datepicker (additional filter)
const { toggleFilter: additionalEdge, data: additionalEdgeDay } = useDateClickListener({
  activeClasses: ['bg-pink-500/40'],
  condition: (e: MouseEvent) => {
    return e.ctrlKey
  },
  primaryFilter: false,
  storeDayFilter,
})

//* Watch out for chaning edge day
watch([primaryEdgeDay, additionalEdgeDay], ([primaryEdgeDay, additionalEdgeDay]) => {
  if (currentMode.value === 'single')
    storeDayFilter.updateFilterDate([primaryEdgeDay])
  else if (currentMode.value === 'multi')
    storeDayFilter.updateFilterDate([primaryEdgeDay, additionalEdgeDay])
})

//* Configuring change day event (@click) depending on filters
const { changeDay } = useTrackDatePicker({ renderedElement, toggleFilters, storeDayFilter })

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
    storeDayFilter.updateToggleFilters([primaryEdge])
    //* Remove additional filter
    if (storeDayFilter.getToggleFilters[1].beforeRemove)
      storeDayFilter.getToggleFilters[1].beforeRemove()
  }

  else if (mode === 'multi') {
    //* Adding additional filter
    storeDayFilter.updateToggleFilters([primaryEdge, additionalEdge])
    //* Init additional filter
    if (storeDayFilter.getToggleFilters[1].init)
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
        :is-rendered-element="isRenderedElement"
        :get-amount-days-in-current-month="getAmountDaysInCurrentMonth" :change-day="changeDay"
        @updateStateRenderedEl="updateStateRenderedEl"
      />
    </div>

    <CalendarFilterMode :initial-current-mode="currentMode" @updateMode="updateFilterMode" />

    <CalendarStats
      :primary-edge-day="primaryEdgeDay" :additional-edge-day="additionalEdgeDay"
      :current-mode="currentMode"
    />
  </div>
</template>

<style lang='scss' scoped>
</style>
