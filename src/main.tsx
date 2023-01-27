import { Container, MantineProvider } from '@mantine/core'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { SWRConfig } from 'swr'
import App from './App'
import { api } from './utils/fetcher'

if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./mocks/browser')
  worker.start()
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <SWRConfig value={{ suspense: true, fetcher: api.get }}>
        <Container>
          <App />
        </Container>
      </SWRConfig>
    </MantineProvider>
  </React.StrictMode>,
)
