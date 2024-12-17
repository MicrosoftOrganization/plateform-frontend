import axios from 'axios'
import cookie from 'js-cookie'
import { API_BASE_URL } from '@/store/constants/api'


const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true // Ensure cookies are sent with requests
})

axiosInstance.interceptors.request.use(
  config => {
    const token = cookie.get('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default axiosInstance
