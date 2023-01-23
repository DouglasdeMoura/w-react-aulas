import useSWRMutation from 'swr/mutation'

export const useDeleteTask = () =>
  useSWRMutation('/tasks', async (url, { arg }) => {
    await fetch(`${url}/${arg?.id}`, {
      method: 'DELETE',
      body: JSON.stringify(arg),
    })
  })
