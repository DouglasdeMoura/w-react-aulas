import useSWRMutation from 'swr/mutation'
import { api } from '../utils/fetcher'

export const useUpdateTask = () =>
  useSWRMutation('/tasks', (url, { arg }) => api.post(`${url}/${arg?.id}`, arg))
