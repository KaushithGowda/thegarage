import { axiosPrivate } from '@/lib/api/axios'
import { useQuery } from '@tanstack/react-query'

export const useGetProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await axiosPrivate.get('/api/profile')
      return response.data
    },
  })
}
