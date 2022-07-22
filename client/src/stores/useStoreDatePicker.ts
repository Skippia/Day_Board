import { defineStore } from 'pinia'
import { apiUser } from '~/API/ApiUser'
import type { IDate, IFilter, ITask } from '~/types/types'

const todayMonth = {
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
}

const today = Date.now()

export const useStoreDatePicker = defineStore({
    id: 'day-picker',
    state: () => ({
        daysByDate: [] as { listTasks: string[]; completedTasks: ITask[] }[],
        toggleFilters: [] as IFilter[],
        currentDate: todayMonth,
        filterDate: {
            start: today,
            end: today,
        },
    }),
    getters: {
        getDaysByDate: (state) => state.daysByDate,
        getToggleFilters: (state) => state.toggleFilters,
        getFilterDate: (state) => state.filterDate,
        getCurrentDate: (state) => state.currentDate,
    },
    actions: {
        updateToggleFilters(toggleFilters: IFilter[]) {
            this.toggleFilters = toggleFilters
        },
        updateFilterDate(filterDate: IDate[]) {
            if (filterDate.length === 1) {
                this.$state.filterDate.start = this.$state.filterDate.end = +DATE.convertDate(filterDate[0])
            } else if (filterDate.length === 2) {
                const startTempTimestamp = +DATE.convertDate(filterDate[0])
                const endTempTimestamp = +DATE.convertDate(filterDate[1])

                this.$state.filterDate.start = Math.min(startTempTimestamp, endTempTimestamp)
                this.$state.filterDate.end = Math.max(startTempTimestamp, endTempTimestamp)
            }

            this.filterDataByDate()
        },
        updateCurrentDate({ year, month }: { year?: number; month?: number }) {
            if (year) this.currentDate.year = year
            if (month) this.currentDate.month = month
        },
        filterDataByDate(filterDate?: { start: number; end: number }) {
            console.log('...filtering...')
            let startDate = filterDate?.start
            let endDate = filterDate?.end

            if (!filterDate) {
                startDate = this.$state.filterDate.start
                endDate = this.$state.filterDate.end
            }

            //* Update data for current range days
            // TODO: live validation
            this.loadDaysByDate({
                start: startDate as number,
                end: endDate as number,
            })
        },
        async loadDaysByDate({ start, end }: { start: number; end: number }) {
            const trueStartDate = DATE.getStartDate(start)
            const trueEndDate = DATE.getEndDate(end)

            const additionalUrlParams = `?startDate=${trueStartDate}&endDate=${trueEndDate}`
            console.log('Additional:', additionalUrlParams)

            const { data, error } = await apiUser.loadDaysByDate({
                additionalUrlParams,
            })

            if (!error)
                this.$state.daysByDate = DATE.sortByDateAsc(data?.data) as {
                    date: Date
                    listTasks: string[]
                    completedTasks: ITask[]
                }[]
        },
    },
})
