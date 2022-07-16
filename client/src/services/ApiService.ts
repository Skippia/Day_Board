import type { AxiosInstance } from 'axios'
import type { TNetworkMethod } from '~/types/types'

const useFetch = ({
    url,
    method,
    apiConfig,
    additionalReqOptions,
}: {
    url: string
    method: TNetworkMethod
    apiConfig: AxiosInstance
    additionalReqOptions?: object
}) => {
    return async ({ body, additionalUrlParams }: { body?: object; additionalUrlParams?: string }) => {
        let data
        let error
        const resultUrl = additionalUrlParams ? `${url}${additionalUrlParams}` : url

        try {
            if (method === 'get') data = await apiConfig.get(resultUrl, { ...additionalReqOptions })
            else if (method === 'post' && body)
                data = await apiConfig.post(resultUrl, { ...body }, { ...additionalReqOptions })

            data = data?.data
        } catch (e: any) {
            error = e?.response?.data?.message
        }
        return { data, error }
    }
}

class ApiService {
    apiConfig: AxiosInstance
    login: Function
    loadAllPageData: Function
    createDay: Function
    loadDaysByDate: Function

    constructor(apiConfig: AxiosInstance) {
        this.apiConfig = apiConfig
        this.login = useFetch({
            url: '/auth/log-in',
            method: 'post',
            apiConfig,
            additionalReqOptions: {
                withCredentials: true,
            },
        })
        this.loadAllPageData = useFetch({
            url: '/get-days',
            method: 'get',
            apiConfig,
            additionalReqOptions: {
                withCredentials: true,
            },
        })
        this.createDay = useFetch({
            url: '/create-day',
            method: 'post',
            apiConfig,
            additionalReqOptions: {
                withCredentials: true,
            },
        })
        this.loadDaysByDate = useFetch({
            url: '/get-days-by-date',
            method: 'get',
            apiConfig,
            additionalReqOptions: {
                withCredentials: true,
            },
        })
    }
}

const apiService = new ApiService(axiosDayApiInstance)

export { apiService }
