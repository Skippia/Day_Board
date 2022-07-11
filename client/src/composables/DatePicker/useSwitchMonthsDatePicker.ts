const useSwitchMonthsDatePicker = () => {
  const isRenderedComponent = ref(true)

  function switchPreviousMonth() {
    rerenderComponent()

    currentDate.month--

    if (currentDate.month < 0) {
      currentDate.month = 11
      currentDate.year--
    }
  }
  function switchNextMonth() {
    rerenderComponent()

    currentDate.month++

    if (currentDate.month > 11) {
      currentDate.month = 0
      currentDate.year++
    }
  }

  function rerenderComponent() {
    //* Rerender component manually
    isRenderedComponent.value = false
    nextTick(() => {
      isRenderedComponent.value = true
    })
  }
  const getAmountDaysInCurrentMonth = computed(() => new Date(currentDate.year, currentDate.month + 1, 0).getDate())

  return { isRenderedComponent, switchPreviousMonth, switchNextMonth, currentDate, getAmountDaysInCurrentMonth }
}

export { useSwitchMonthsDatePicker }
