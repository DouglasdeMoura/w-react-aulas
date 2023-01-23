import useSWRMutation from 'swr/mutation'

export const useUpdateTask = () =>
  useSWRMutation('/tasks', async (url, { arg }) => {
    await fetch(`${url}/${arg?.id}`, {
      method: 'POST',
      body: JSON.stringify(arg),
    })
  })
