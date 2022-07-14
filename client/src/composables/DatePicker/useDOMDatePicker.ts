// ? Imperative shell

export function useDOMDatePicker(storeDatePicker: ReturnType<typeof useStoreDatePicker>) {
  const isRenderedElement = ref(true)
  const getCurrentDate = computed(() => storeDatePicker.getCurrentDate)

  function switchPreviousMonth() {
    rerenderComponent()

    storeDatePicker.updateCurrentDate({ month: getCurrentDate.value.month - 1 })

    if (getCurrentDate.value.month < 0)
      storeDatePicker.updateCurrentDate({ month: 11, year: getCurrentDate.value.year - 1 })
  }
  function switchNextMonth() {
    rerenderComponent()

    storeDatePicker.updateCurrentDate({ month: getCurrentDate.value.month + 1 })

    if (getCurrentDate.value.month > 11)
      storeDatePicker.updateCurrentDate({ month: 0, year: getCurrentDate.value.year + 1 })
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
