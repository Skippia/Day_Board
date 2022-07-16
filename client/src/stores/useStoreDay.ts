import { defineStore } from 'pinia'

const useStoreDay = defineStore('day', {
    state: () => ({
        allPageData: [] as object[],
    }),
    getters: {
        getCurrentPageData: (state) => state.allPageData,
    },
    actions: {
        async loadAllPageData() {
            const { data, error } = await apiService.loadAllPageData({})

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
            const { data, error } = await apiService.createDay({
                body: { listTimes, listTasks },
                additionalUrlParams,
            })

            if (!error) console.error(data)
        },
    },
})

export { useStoreDay }
