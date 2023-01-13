import React from 'react'
import ReactDOM from 'react-dom/client'
import { SWRConfig } from 'swr'
import App from './App'

if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./mocks/browser')
  worker.start()
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SWRConfig value={{
      suspense: true,
      fetcher: (url: string, init?: RequestInit) => fetch(url, init).then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText)
        }
    
        return res.json()
      }),
    }}>
      <App />
    </SWRConfig>
  </React.StrictMode>,
)
