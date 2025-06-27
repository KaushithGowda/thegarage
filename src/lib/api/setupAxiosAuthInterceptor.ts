import { axiosPrivate } from './axios'
import { useAuthStore } from '@/store/useAuthStore'

export const setupAxiosAuthInterceptor = () => {
  axiosPrivate.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  })
}