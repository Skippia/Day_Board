import { defineStore } from 'pinia'
import { apiUser } from '~/API/ApiUser'

const useStoreDay = defineStore('day', {
    state: () => ({
        allPageData: [] as object[],
    }),
    getters: {
        getCurrentPageData: (state) => state.allPageData,
    },
    actions: {
        async loadAllPageData() {
            const { data, error } = await apiUser.loadAllPageData({})

            if (!error) {
                //* Save all data
                this.$state.allPageData = data?.data || []
            }
        },
        async createDay({
            listTimes,
            listTasks,
            additionalUrlParams,
        }: {
            listTimes: string[]
            listTasks: string[]
            additionalUrlParams: string
        }) {
            const { data, error } = await apiUser.createDay({
                body: { listTimes, listTasks },
                additionalUrlParams,
            })

            if (!error) console.error(data)
        },
    },
})

export { useStoreDay }
