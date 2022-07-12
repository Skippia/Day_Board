export function getDOMDatePicker(storeDayFilter: ReturnType<typeof useStoreDayFilter>) {
  const isRenderedElement = ref(true)
  const getCurrentDate = computed(() => storeDayFilter.getCurrentDate)

  function switchPreviousMonth() {
    rerenderComponent()

    storeDayFilter.updateCurrentDate({ month: getCurrentDate.value.month - 1 })

    if (getCurrentDate.value.month < 0)
      storeDayFilter.updateCurrentDate({ month: 11, year: getCurrentDate.value.year - 1 })
  }
  function switchNextMonth() {
    rerenderComponent()

    storeDayFilter.updateCurrentDate({ month: getCurrentDate.value.month + 1 })

    if (getCurrentDate.value.month > 11)
      storeDayFilter.updateCurrentDate({ month: 0, year: getCurrentDate.value.year + 1 })
  }

  function rerenderComponent() {
  //* Rerender component manually
    isRenderedElement.value = false
    nextTick(() => {
      isRenderedElement.value = true
    })
  }
  const getAmountDaysInCurrentMonth
  = computed(() => new Date(getCurrentDate.value.year, getCurrentDate.value.month + 1, 0).getDate())

  return { isRenderedElement, switchPreviousMonth, switchNextMonth, getAmountDaysInCurrentMonth }
}
