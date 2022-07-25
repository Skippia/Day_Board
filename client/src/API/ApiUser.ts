import { AxiosInstance } from 'axios'
import { IResponse } from '~/types/types'

class ApiUser {
    apiConfig: AxiosInstance
    loadAllDays: IResponse
    createDay: IResponse
    loadDaysByDate: IResponse
    loadDefaultDayTemplate: IResponse
    createDefaultDayTemplate: IResponse

    constructor(apiConfig: AxiosInstance) {
        this.apiConfig = apiConfig
        this.loadAllDays = useVFetch({
            url: '/get-days',
            method: 'get',
            apiConfig,
            additionalReqOptions: {
                withCredentials: true,
            },
        })
        this.loadDefaultDayTemplate = useVFetch({
            url: '/get-default-day-template',
            method: 'get',
            apiConfig,
            additionalReqOptions: {
                withCredentials: true,
            },
        })
        this.createDay = useVFetch({
            url: '/create-day',
            method: 'post',
            apiConfig,
            additionalReqOptions: {
                withCredentials: true,
            },
        })
        this.loadDaysByDate = useVFetch({
            url: '/get-days-by-date',
            method: 'get',
            apiConfig,
            additionalReqOptions: {
                withCredentials: true,
            },
        })
        this.createDefaultDayTemplate = useVFetch({
            url: '/create-default-day-template',
            method: 'put',
            apiConfig,
            additionalReqOptions: {
                withCredentials: true,
            },
        })
    }
}

const apiUser = new ApiUser(axiosDayApiInstance)

export { apiUser }
