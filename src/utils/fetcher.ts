const fetcher = (url: string, init?: RequestInit) =>
  fetch(`https://api.example.com${url}`, init)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }

      return res.json()
    })
    .catch(console.error)

const mutate =
  (method: 'POST' | 'DELETE' | 'PUT' | 'PATCH') => (url: string, body: any) =>
    fetcher(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

export const api = {
  get: fetcher,
  post: mutate('POST'),
  delete: mutate('DELETE'),
  put: mutate('PUT'),
  patch: mutate('PATCH'),
}
