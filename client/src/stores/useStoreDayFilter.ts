import { defineStore } from 'pinia'
import type { TActivator } from '~/hooks/useTrackDatePicker'

export const useStoreDayFilter = defineStore({
  id: 'day-filter',
  state: () => ({
    toggleActivators: [] as TActivator[],
    multiChosenDay: Function,
    multiCleanDay: Function,
  }),
  getters: {
    getToggleActivators: state => state.toggleActivators,
  },
  actions: {
    updateToggleActivators(toggleActivators: TActivator[]) {
      this.toggleActivators = toggleActivators
    },
  },
})
