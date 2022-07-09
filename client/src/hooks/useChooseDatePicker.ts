import type { Ref } from 'vue'

const useChooseDatePicker = (renderEl: Ref<HTMLElement | undefined>) => {
  // ? Constants
  const daysWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const months = ['January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const classesForChosenEl = ['outline-active-day']

  // ? Initialization
  const chosenDay = ref(new Date().getDate())
  const currentMonth = ref(new Date().getMonth())
  const currentYear = ref(new Date().getFullYear())
  const chosenMonth = ref(new Date().getMonth())
  const chosenYear = ref(new Date().getFullYear())
  const isRenderedComponent = ref(true)
  const chosenDayEl = ref<HTMLElement | undefined>()

  const isChosenMonth = computed(() => chosenMonth.value === currentMonth.value && currentYear.value === chosenYear.value)
  const dayIsChosen = (el: HTMLElement) => classesForChosenEl.every(currentClass => el.classList.contains(currentClass))
  const getAmountCurrentDays = computed(() => new Date(currentYear.value, currentMonth.value + 1, 0).getDate())

  function chooseDayEl(chosenDay: number) {
    const target = document.querySelector(`[data-day="${chosenDay}"]`)
    if (target)
      chosenDayEl.value = target as HTMLElement
  }
  function removeChosenDayClasses(target: Element) {
    classesForChosenEl.forEach(el => target.classList.remove(el))
  }
  function addChosenDayClasses(target: Element) {
    classesForChosenEl.forEach(el => target.classList.add(el))
  }
  function paintChosenDay() {
    if (chosenDayEl.value)
      addChosenDayClasses(chosenDayEl.value)
  }
  function paintOffChosenDay() {
    if (chosenDayEl.value && dayIsChosen(chosenDayEl.value))
      removeChosenDayClasses(chosenDayEl.value)
  }
  function updateDateAboutChosenDay(day: number) {
    chosenDay.value = day
    chosenMonth.value = currentMonth.value
    chosenYear.value = currentYear.value
  }
  function switchPreviousMonth() {
    currentMonth.value--

    if (currentMonth.value < 0) {
      currentMonth.value = 11
      currentYear.value--
    }
  }
  function switchNextMonth() {
    currentMonth.value++

    if (currentMonth.value > 11) {
      currentMonth.value = 0
      currentYear.value++
    }
  }

  watch(renderEl, (renderDone) => {
    //* If we back to month where we choose day
    if (renderDone && isChosenMonth.value) {
      //* Find chosen day
      chooseDayEl(chosenDay.value!)
      //* Draw chosen day
      paintChosenDay()
    }
  })

  onUpdated(() => {
    //* Rerender component manually
    isRenderedComponent.value = false
    nextTick(() => {
      isRenderedComponent.value = true
    })
  })

  const changeDay = (e: Event) => {
    // 1. Remove paint from ex day
    paintOffChosenDay()
    // 2. Set new date
    updateDateAboutChosenDay(Number((e.target as HTMLElement).dataset.day))
    // 3. Update chosen day
    chooseDayEl(chosenDay.value!)
    // 4. Paint new day
    paintChosenDay()
  }

  return { isRenderedComponent, switchPreviousMonth, switchNextMonth, currentMonth, currentYear, changeDay, getAmountCurrentDays, daysWeek, months }
}

export { useChooseDatePicker }
