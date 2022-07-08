const useChooseDatePicker = () => {
  // ? Constants
  const daysWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const months = ['January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const classesForChosenEl = ['outline-active-day']

  // ? Initialization
  const chosenDay = ref<number>()
  const currentMonth = ref(new Date().getMonth())
  const currentYear = ref(new Date().getFullYear())
  const chosenMonth = ref(new Date().getMonth())
  const chosenYear = ref(new Date().getFullYear())

  const chosenDayEl = computed(() => findDayElByChosenDay(chosenDay.value))
  const isExactlyMonth = computed(() =>
    chosenMonth.value === currentMonth.value && currentYear.value === chosenYear.value)

  const elIsActive = (el: HTMLElement) =>
    classesForChosenEl.every(currentClass => el.classList.contains(currentClass))

  function removeChosenDayClasses(target: Element) {
    classesForChosenEl.forEach(el => target.classList.remove(el))
  }
  function addChosenDayClasses(target: Element) {
    classesForChosenEl.forEach(el => target.classList.add(el))
  }
  function findDayElByChosenDay(chosenDay: number | undefined) {
    if (chosenDay)
      return document.querySelector(`[data-day="${chosenDay}"]`)
  }
  function paintChosenDay() {
    if (chosenDayEl.value)
      addChosenDayClasses(chosenDayEl.value)
  }
  function paintOffChosenDay() {
    if (chosenDayEl.value && chosenDayEl.value.classList.contains('outline-active-day'))
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

  watch(chosenDay, () => {
    paintChosenDay()
  })

  onUpdated(() => {
    if (isExactlyMonth.value)
      paintChosenDay()
    else
      paintOffChosenDay()
  })
  const getAmountCurrentDays = $computed(() => new Date(currentYear.value, currentMonth.value + 1, 0).getDate())

  const changeDay = (e: Event) => {
    if (elIsActive(e.target as HTMLElement) && isExactlyMonth.value)
      return

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
