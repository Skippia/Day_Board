import { AxiosInstance } from 'axios'
import { IResponse } from '~/types/types'

class ApiService {
    apiConfig: AxiosInstance
    login: IResponse

    constructor(apiConfig: AxiosInstance) {
        this.apiConfig = apiConfig
        this.login = useVFetch({
            url: '/auth/log-in',
            method: 'post',
            apiConfig,
            additionalReqOptions: {
                withCredentials: true,
            },
        })
    }
}

const apiAuth = new ApiService(axiosDayApiInstance)

export { apiAuth }
