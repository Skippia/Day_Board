const useDatePicker = () => {
  //* Constants
  const daysWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const months = ['January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const currentDate = reactive({
    day: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  })

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
  const getAmountCurrentDays = computed(() => new Date(currentDate.year, currentDate.month + 1, 0).getDate())

  return { isRenderedComponent, switchPreviousMonth, switchNextMonth, currentDate, getAmountCurrentDays, daysWeek, months }
}

export { useDatePicker }
