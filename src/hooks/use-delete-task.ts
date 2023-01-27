import useSWRMutation from 'swr/mutation'
import { api } from '../utils/fetcher'

export const useDeleteTask = () =>
  useSWRMutation('/tasks', async (url, { arg }) =>
    api.delete(`${url}/${arg?.id}`, arg),
  )
