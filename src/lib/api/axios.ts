import axios from 'axios'
import { config } from '../../constants'
import { useAuthStore } from '@/store/useAuthStore'

// Public axios instance (no auth headers)
export const axiosPublic = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Private axios instance (with auth headers)
export const axiosPrivate = axios.create({
  baseURL: config.apiBaseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const setupAxiosAuthInterceptor = () => {
  axiosPrivate.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  })
}
