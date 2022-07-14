<script setup lang='ts'>
const storeDatePicker = useStoreDatePicker()
const toggleFilters = computed(() => storeDatePicker.getToggleFilters)

const currentMode = ref<'single' | 'multi'>('single')
const renderedElement = ref<HTMLElement>()

//* Load today
storeDatePicker.loadDaysByDate({ start: +new Date(), end: +new Date() })

//* Flag whether the datepicker is loaded and (DOM fn-s & props)
const { isRenderedElement, getAmountDaysInCurrentMonth, switchNextMonth, switchPreviousMonth }
  = useDOMDatePicker(storeDatePicker)

//* Setting custom listener for datepicker (primary filter)
const { toggleFilter: primaryEdge, data: primaryEdgeDay } = useDateClickListener({
  activeClasses: ['bg-emerald-500/40'],
  condition: (e: MouseEvent) => {
    return !e.ctrlKey
  },
  primaryFilter: true,
  storeDatePicker,
})

//* Setting custom listener for datepicker (additional filter)
const { toggleFilter: additionalEdge, data: additionalEdgeDay } = useDateClickListener({
  activeClasses: ['bg-pink-500/40'],
  condition: (e: MouseEvent) => {
    return e.ctrlKey
  },
  primaryFilter: false,
  storeDatePicker,
})

//* Configuring change day event (@click) depending on filters
const { changeDay } = useTrackDatePicker({ renderedElement, toggleFilters, storeDatePicker })

//* Tracking state of rerender component
function updateStateRenderedEl(renderedEl: HTMLElement | undefined) {
  return renderedElement.value = renderedEl
}

//* Tracking state of mode filter
function updateFilterMode(mode: 'single' | 'multi') {
  currentMode.value = mode
}

//* Single mode switch on
storeDatePicker.updateToggleFilters([primaryEdge])

watch(currentMode, (mode) => {
  //* Primary filter is working always (by default) [multi --> single]
  if (mode === 'single') {
    //* Invoke appropriate before remove filter function
    if (storeDatePicker.getToggleFilters[1].beforeRemove)
      storeDatePicker.getToggleFilters[1].beforeRemove()

    //* Remove additional filter
    storeDatePicker.updateToggleFilters([primaryEdge])
  }

  // [single --> multi]
  else if (mode === 'multi') {
    //* Adding additional filter
    storeDatePicker.updateToggleFilters([primaryEdge, additionalEdge])
    //* Init additional filter
    if (storeDatePicker.getToggleFilters[1].init)
      storeDatePicker.getToggleFilters[1].init()
  }
})

//* Watch out for changing edge day
watch([currentMode, primaryEdgeDay, additionalEdgeDay], ([currentMode, primaryEdgeDay, additionalEdgeDay]) => {
  if (currentMode === 'single')
    storeDatePicker.updateFilterDate([primaryEdgeDay])
  else if (currentMode === 'multi')
    storeDatePicker.updateFilterDate([primaryEdgeDay, additionalEdgeDay])
})
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
  </div>
</template>

<style lang='scss' scoped>
</style>
