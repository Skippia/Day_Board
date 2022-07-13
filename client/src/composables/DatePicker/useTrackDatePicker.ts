import type { Ref } from 'vue'
import type { TFilter } from '~/types/types'

const useTrackDatePicker = ({ renderedElement, toggleFilters, storeDatePicker }:
{
  renderedElement: Ref<HTMLElement | undefined>
  toggleFilters: Ref<TFilter[]>
  storeDatePicker: ReturnType<typeof useStoreDatePicker>
}) => {
  const getCurrentDate = computed(() => storeDatePicker.getCurrentDate)
  watch(renderedElement, (renderStatus) => {
    //* If element was rerendered
    if (renderStatus) {
      //* Check if we back to month where we choose day
      toggleFilters.value.forEach(toggleFilter => toggleFilter.restoreChosenDay(getCurrentDate.value))
    }
  })

  const changeDay = (e: MouseEvent) => {
    toggleFilters.value.forEach((toggleFilter) => {
      if (toggleFilter.condition(e))
        toggleFilter.run(e)
    })
  }

  return { changeDay }
}

export { useTrackDatePicker }
