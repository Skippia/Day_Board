import axios from 'axios'

const apiDeskDay = axios.create({
  baseURL: baseApiURL,
})

export { apiDeskDay }
