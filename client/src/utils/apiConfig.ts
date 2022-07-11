import axios from 'axios'

const axiosDayApiInstance = axios.create({
  baseURL: baseApiURL,
})

export { axiosDayApiInstance }
