import { defineStore } from 'pinia'
import { v4 } from 'uuid'

export const useStoreConstructor = defineStore({
    id: 'day-constructor',
    state: () => ({
        currentListTasks: [
            { name: 'Tomato 1-st', id: v4() },
            { name: 'English Walk', id: v4() },
            { name: 'Write down dream', id: v4() },
            { name: 'English grammar1', id: v4() },
            { name: 'Wake up at 08:00', id: v4() },
            { name: 'English grammar2', id: v4() },
            { name: 'Tomato 2-st', id: v4() },
        ],
        currentTimeSeparator: null as string | null,
        currentStartTimeDay: null as string | null,
        currentEndTimeDay: null as string | null,
        defaultDayTemplate: {
            listTimes: [] as string[],
            listTasks: [] as string[],
        },
    }),
    getters: {
        getCurrentListTasks: (state) => state.currentListTasks,
        getCurrentTimeSeparator: (state) => state.currentTimeSeparator,
        getCurrentStartTimeDay: (state) => state.currentStartTimeDay,
        getCurrentEndTimeDay: (state) => state.currentEndTimeDay,
        getDefaultDayTemplate: (state) => state.defaultDayTemplate,
    },
    actions: {
        updateCurrentListTasks({ value, add }: { value: string; add: boolean }) {
            if (add) {
                const id = v4()
                this.$state.currentListTasks.push({ name: value, id })
            } else if (!add) {
                const deleteIndex = this.currentListTasks.findIndex((el) => el.name === value)
                if (deleteIndex !== -1) this.$state.currentListTasks.splice(deleteIndex, 1)
            }
            this.updateDefaultDayTemplate()
        },
        updateCurrentTimeSeparator(newTimeSeparator: string | null) {
            this.currentTimeSeparator = newTimeSeparator
            this.updateDefaultDayTemplate()
        },
        updateCurrentStartTimeDay(newStartTimeDay: string | null) {
            this.currentStartTimeDay = newStartTimeDay
            this.updateDefaultDayTemplate()
        },
        updateCurrentEndTimeDay(newEndTimeDay: string | null) {
            this.currentEndTimeDay = newEndTimeDay
            this.updateDefaultDayTemplate()
        },
        updateDefaultDayTemplate() {
            const currentStartTimeDay = Number(this.$state.currentStartTimeDay)
            const currentEndTimeDay = Number(this.$state.currentEndTimeDay)
            const timeSeparator = Number(this.$state.currentTimeSeparator)
            const listTasks = this.$state.currentListTasks.map((el) => el.name)

            if (!listTasks || !currentStartTimeDay || !currentEndTimeDay || !timeSeparator) return

            const listTimes = DATE.createTimeSchedule(currentStartTimeDay, currentEndTimeDay, timeSeparator)

            this.$state.defaultDayTemplate = {
                listTasks: listTasks,
                listTimes: listTimes,
            }
        },
    },
})
