const useChooseDatePicker = () => {
  // ? Constants
  const daysWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const months = ['January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const classesForChosenEl = ['outline', 'outline-2', 'outline-sky-500']

  // ? Initialization
  const chosenDay = ref<number>()
  const currentMonth = ref(new Date().getMonth())
  const currentYear = ref(new Date().getFullYear())
  const chosenMonth = ref(new Date().getMonth())
  const chosenYear = ref(new Date().getFullYear())

  const chosenDayEl = computed(() => findDayByChosenDay(chosenDay.value))

  function removeChosenDayClasses(target: Element) {
    classesForChosenEl.forEach(el => target.classList.remove(el))
  }
  function addChosenDayClasses(target: Element) {
    classesForChosenEl.forEach(el => target.classList.add(el))
  }
  function findDayByChosenDay(chosenDay: number | undefined) {
    if (chosenDay)
      return document.querySelector(`[data-day="${chosenDay}"]`)
  }
  function paintChosenDay() {
    if (chosenDayEl.value)
      addChosenDayClasses(chosenDayEl.value)
  }
  function paintOffChosenDay() {
    if (chosenDayEl.value)
      removeChosenDayClasses(chosenDayEl.value)
  }
  function updateDateAboutChosenDay(day: number) {
    chosenDay.value = day
    chosenMonth.value = currentMonth.value
    chosenYear.value = currentYear.value
  }

  onMounted(() => {
    // Initial painting current day
    chosenDay.value = new Date().getDate()

    paintChosenDay()
  })

  watchEffect(() => {
    // We already have changed current day
    if (chosenDay.value)
      paintChosenDay()
  })

  onUpdated(() => {
    if (chosenMonth.value === currentMonth.value && currentYear.value === chosenYear.value)
      paintChosenDay()
    else
      paintOffChosenDay()
  })
  const getAmountCurrentDays = $computed(() => new Date(currentYear.value, currentMonth.value + 1, 0).getDate())

  const changeDay = (e: Event) => {
    // 1. Remove paint from ex day
    paintOffChosenDay()
    // 2. Set new day
    updateDateAboutChosenDay(Number((e.target as HTMLElement).dataset.day))
  }

  const switchPreviousMonth = () => {
    currentMonth.value--

    if (currentMonth.value < 0) {
      currentMonth.value = 11
      currentYear.value--
    }
  }

  const switchNextMonth = () => {
    currentMonth.value++

    if (currentMonth.value > 11) {
      currentMonth.value = 0
      currentYear.value++
    }
  }

  return { switchPreviousMonth, switchNextMonth, currentMonth, currentYear, changeDay, getAmountCurrentDays, daysWeek, months }
}

export { useChooseDatePicker }
