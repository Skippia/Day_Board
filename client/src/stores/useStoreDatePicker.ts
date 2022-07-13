import { defineStore } from 'pinia'
import type { IDate, TFilter } from '~/types/types'

const todayMonth = {
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
}

const today = {
  ...todayMonth, day: new Date().getDate(),
}

export const useStoreDatePicker = defineStore({
  id: 'day-picker',
  state: () => ({
    daysByDate: [] as object[],
    toggleFilters: [] as TFilter[],
    currentDate: todayMonth,
    filterDate: {
      start: today,
      end: today,
    },
  }),
  getters: {
    getDaysByDate: state => state.daysByDate,
    getToggleFilters: state => state.toggleFilters,
    getFilterDate: state => state.filterDate,
    getCurrentDate: state => state.currentDate,
  },
  actions: {
    updateToggleFilters(toggleFilters: TFilter[]) {
      this.toggleFilters = toggleFilters
    },
    updateFilterDate(filterDate: typeof today[]) {
      if (filterDate.length === 1) {
        this.$state.filterDate.start = this.$state.filterDate.end = filterDate[0]
      }
      else if (filterDate.length === 2) {
        this.$state.filterDate.start = filterDate[0]
        this.$state.filterDate.end = filterDate[1]
      }

      this.filterDataByDate()
    },
    updateCurrentDate({ year, month }: { year?: number; month?: number }) {
      if (year)
        this.currentDate.year = year
      if (month)
        this.currentDate.month = month
    },
    filterDataByDate(filterDate?: { start: IDate; end: IDate }) {
      console.log('...filtering...')
      let startDate = filterDate?.start
      let endDate = filterDate?.end

      if (!filterDate) {
        startDate = this.$state.filterDate.start
        endDate = this.$state.filterDate.end
      }

      //* Update data for current range days
      this.loadDaysByDate({
        start: +convertDate(startDate as IDate),
        end: +convertDate(endDate as IDate) + 86399999,
      })
    },
    async loadDaysByDate({ start, end }: { start: number; end: number }) {
      const additionalUrlParams = `?startDate=${start}&endDate=${end}`
      console.log(additionalUrlParams)

      const { data, error } = await apiService.loadDaysByDate(
        {
          additionalUrlParams,
        })

      if (!error)
        this.$state.daysByDate = data?.data
    },
  },
})
