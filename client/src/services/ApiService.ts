import type { AxiosInstance } from 'axios'

type TNetworkMethod = 'get' | 'post' | 'patch' | 'delete'

const useFetch = ({ url, method, apiConfig }: { url: string; method: TNetworkMethod; apiConfig: AxiosInstance }) => {
  return async (body?: object) => {
    let data
    let error
    try {
      if (method === 'get')
        data = await apiConfig.get(url)

      else if (method === 'post' && body)
        data = await apiConfig.post(url, { ...body })

      data = data?.data
    }
    catch (e: any) {
      error = e?.response?.data?.message
    }
    return { data, error }
  }
}
class ApiService {
  apiConfig: AxiosInstance
  login: Function
  constructor(apiConfig: AxiosInstance) {
    this.apiConfig = apiConfig
    this.login = useFetch({ url: '/auth/log-in', method: 'post', apiConfig })
  }
}

const apiDeskDayService = new ApiService(apiDeskDay)

export { apiDeskDayService }
