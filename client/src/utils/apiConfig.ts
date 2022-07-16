import axios from 'axios'
import { baseApiURL } from './constants'

const axiosDayApiInstance = axios.create({
    baseURL: baseApiURL,
})

export { axiosDayApiInstance }
