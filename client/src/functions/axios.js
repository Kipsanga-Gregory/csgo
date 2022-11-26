import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000',
})

const CancelToken = axios.CancelToken

export const source = CancelToken.source()

export default axiosInstance
