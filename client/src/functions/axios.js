import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_API,
})

const CancelToken = axios.CancelToken

export const source = CancelToken.source()

export default axiosInstance
