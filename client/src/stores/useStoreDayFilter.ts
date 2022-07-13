import { defineStore } from 'pinia'
import type { TFilter } from '~/types/types'

const todayMonth = {
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
}

const today = {
  ...todayMonth, day: new Date().getDate(),
}

export const useStoreDayFilter = defineStore({
  id: 'day-filter',
  state: () => ({
    toggleFilters: [] as TFilter[],
    currentDate: todayMonth,
    filterDate: [today],
  }),
  getters: {
    getToggleFilters: state => state.toggleFilters,
    getFilterDate: state => state.filterDate,
    getCurrentDate: state => state.currentDate,
  },
  actions: {
    updateToggleFilters(toggleFilters: TFilter[]) {
      this.toggleFilters = toggleFilters
    },
    updateFilterDate(filterDate: typeof today[]) {
      this.filterDate = filterDate
    },
    updateCurrentDate({ year, month }: { year?: number; month?: number }) {
      if (year)
        this.currentDate.year = year
      if (month)
        this.currentDate.month = month
    },

  },
})
