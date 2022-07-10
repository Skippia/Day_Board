import type { Ref } from 'vue'
interface TActivator {
  run: (e: MouseEvent) => void
  condition: (e: MouseEvent) => boolean
  restoreChosenDay: (currentDate: { month: number; year: number }) => void
  init: () => void
  beforeRemove: () => void
}

const storeDayFilter = useStoreDayFilter()

const useTrackDatePicker
  = ({ renderEl, currentDate }: {
    renderEl: Ref<HTMLElement | undefined>
    currentDate: { month: number; year: number }
  }) => {
    watch(renderEl, (renderStatus) => {
      //* If element was rerendered
      if (renderStatus) {
        //* Check if we back to month where we choose day
        const toggleActivators = storeDayFilter.getToggleActivators
        toggleActivators.forEach(toggleActivator => toggleActivator.restoreChosenDay(currentDate))
      }
    })

    const changeDay = (e: MouseEvent) => {
      const toggleActivators = storeDayFilter.getToggleActivators
      toggleActivators.forEach((toggleActivator) => {
        if (toggleActivator.condition(e))
          toggleActivator.run(e)
      })
    }

    return { changeDay }
  }

export { useTrackDatePicker, TActivator }
