import { defineStore } from 'pinia'

const useStoreDay = defineStore('day', {
  state: () => ({
    allPageData: [] as object[],
    filtersDaysByDate: [] as object[],
  }),
  getters: {
    getCurrentPageData: state => state.allPageData,
    getFilteredDaysByDate: state => state.filtersDaysByDate,
  },
  actions: {
    async loadAllPageData() {
      const { data, error } = await apiService.loadAllPageData({})

      if (!error) {
        this.$state.allPageData = data.data
        this.$state.filtersDaysByDate = data.data
      }
    },
    async createDay(
      { listTimes, listTasks, additionalUrlParams }:
      { listTimes: string[]; listTasks: string[]; additionalUrlParams: string }) {
      const { data, error } = await apiService.createDay(
        {
          body: { listTimes, listTasks },
          additionalUrlParams,
        })

      if (!error)
        console.error(data)
    },
    async filterDaysByDate({ startDate, endDate }: { startDate: number; endDate: number }) {
      const additionalUrlParams = `?startDate=${startDate}&endDate=${endDate}`

      const { data, error } = await apiService.filterDaysByDate(
        {
          additionalUrlParams,
        })

      if (!error)
        this.$state.filtersDaysByDate = data.data
    },

  },
})

export { useStoreDay }
