const useDateClickListener = (
  { activeClasses, currentDate, condition, primaryFilter }:
  {
    activeClasses: string[]
    currentDate: { day: number; month: number; year: number }
    condition: (e: MouseEvent) => boolean
    primaryFilter: boolean
  }) => {
  // ? Initialization

  //* Start values equal today date
  const chosenDate = reactive({
    day: currentDate.day,
    month: currentDate.month,
    year: currentDate.year,
  })
  const chosenDayEl = ref<HTMLElement>()

  //* Remove style from chosen day
  function disactivate(target: HTMLElement) {
    activeClasses.forEach(el => target.classList.remove(el))
  }

  //* Apply style for chosen day
  function activate(target: HTMLElement) {
    activeClasses.forEach(el => target.classList.add(el))
  }

  function saveDateAboutChosenDay(day: number) {
    chosenDate.day = day
    chosenDate.month = currentDate.month
    chosenDate.year = currentDate.year
  }

  //* Set new day element for chosen day
  function initDayElement(day: number) {
    const target = document.querySelector(`[data-day="${day}"]`)
    if (target)
      chosenDayEl.value = target as HTMLElement
  }
  onMounted(() => {
    //* Set today day as chosen day
    initDayElement(chosenDate.day)
  })

  function compareDate(currentDate: { month: number; year: number }, chosenDate: { day: number; month: number; year: number }) {
    return currentDate.month === chosenDate.month && currentDate.year === chosenDate.year
  }
  const restoreChosenDayFabric = (chosenDate: { day: number; month: number; year: number }) => (
    currentDate: { month: number; year: number }) => {
    // It's our month
    if (compareDate(currentDate, chosenDate)) {
      // Init day
      initDayElement(chosenDate.day)
      // Paint this day
      activate(chosenDayEl.value as HTMLElement)
    }
  }
  const initFabric = (primaryFilter: boolean) => {
    if (primaryFilter)
      return () => { }

    return function () {
      // @ts-expect-error works fine
      this.restoreChosenDay(currentDate)
    }
  }
  const beforeRemoveFabric = (primaryFilter: boolean) => {
    if (primaryFilter)
      return () => { }

    return function () {
      disactivate(chosenDayEl.value as HTMLElement)
    }
  }

  const restoreChosenDay = restoreChosenDayFabric(chosenDate)
  const init = initFabric(primaryFilter)
  const beforeRemove = beforeRemoveFabric(primaryFilter)

  const toggleActivator = {
    run(e: MouseEvent) {
      // 1. Remove paint from ex day
      disactivate(chosenDayEl.value as HTMLElement)
      // 2. Set new active day
      const target = e.target as HTMLElement
      saveDateAboutChosenDay(+target.dataset.day!)

      initDayElement(chosenDate.day)
      // 3. Paint new day
      activate(target)
    },
    condition(e: MouseEvent) {
      return condition(e)
    },
    restoreChosenDay,
    init,
    beforeRemove,
  }

  return { toggleActivator, data: chosenDate }
}

export { useDateClickListener }

