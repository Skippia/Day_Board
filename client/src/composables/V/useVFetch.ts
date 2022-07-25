import { AxiosInstance, AxiosError } from 'axios'
import { IResponseError, TNetworkMethod } from '~/types/types'

//* TODO: refactor - use fetch doesn't have receive {} for get requests
const useVFetch = ({
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
        let responseData: unknown
        let error
        const resultUrl = additionalUrlParams ? `${url}${additionalUrlParams}` : url

        try {
            if (method === 'get') responseData = (await apiConfig.get(resultUrl, { ...additionalReqOptions }))?.data
            else if (method === 'post' && body) {
                responseData = (await apiConfig.post(resultUrl, { ...body }, { ...additionalReqOptions }))?.data
            } else if (method === 'put' && body) {
                responseData = (await apiConfig.put(resultUrl, { ...body }, { ...additionalReqOptions }))?.data
            }
        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                error = e.response.data as IResponseError
            }
        }

        return { data: responseData, error }
    }
}

export { useVFetch }
