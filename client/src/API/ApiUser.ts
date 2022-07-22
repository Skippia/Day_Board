import { AxiosInstance } from 'axios'
import { IResponse } from '~/types/types'

class ApiUser {
    apiConfig: AxiosInstance
    loadAllPageData: IResponse
    createDay: IResponse
    loadDaysByDate: IResponse

    constructor(apiConfig: AxiosInstance) {
        this.apiConfig = apiConfig
        this.loadAllPageData = useVFetch({
            url: '/get-days',
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
    }
}

const apiUser = new ApiUser(axiosDayApiInstance)

export { apiUser }
