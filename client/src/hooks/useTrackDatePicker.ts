import type { Ref } from 'vue'
interface TFilter {
  run: (e: MouseEvent) => void
  condition: (e: MouseEvent) => boolean
  restoreChosenDay: (currentDate: { month: number; year: number }) => void
  init: () => void
  beforeRemove: () => void
}

const storeDayFilter = useStoreDayFilter()

const useTrackDatePicker
  = ({ renderedElement }: {
    renderedElement: Ref<HTMLElement | undefined>
  }) => {
    watch(renderedElement, (renderStatus) => {
      //* If element was rerendered
      if (renderStatus) {
        //* Check if we back to month where we choose day
        const toggleFilters = storeDayFilter.getToggleFilters
        toggleFilters.forEach(toggleFilter => toggleFilter.restoreChosenDay(currentDate))
      }
    })

    const changeDay = (e: MouseEvent) => {
      const toggleFilters = storeDayFilter.getToggleFilters
      toggleFilters.forEach((toggleFilter) => {
        if (toggleFilter.condition(e))
          toggleFilter.run(e)
      })
    }

    return { changeDay }
  }

export { useTrackDatePicker, TFilter }
