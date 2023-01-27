export const fetcher = (url: string, init?: RequestInit) =>
  fetch(`https://api.example.com${url}`, init)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }

      return res.json()
    })
    .catch(console.error)
