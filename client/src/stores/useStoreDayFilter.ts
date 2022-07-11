import { defineStore } from 'pinia'
import type { TFilter } from '~/types/types'

export const useStoreDayFilter = defineStore({
  id: 'day-filter',
  state: () => ({
    toggleFilters: [] as TFilter[],
    filterDate: [currentDate],
  }),
  getters: {
    getToggleFilters: state => state.toggleFilters,
    getFilterDate: state => state.filterDate,
  },
  actions: {
    updateToggleFilters(toggleFilters: TFilter[]) {
      this.toggleFilters = toggleFilters
    },
    updateFilterDate(filterDate: typeof currentDate[]) {
      this.filterDate = filterDate
    },
  },
})
