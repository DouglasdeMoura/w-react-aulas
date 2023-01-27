/* eslint-disable import/export */
import userEvent from '@testing-library/user-event'
import { type RenderOptions, render as rtlRender } from '@testing-library/react'
import { SWRConfig } from 'swr'
export * from '@testing-library/react'

export const render = (ui: React.ReactElement, options?: RenderOptions) => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <SWRConfig
      value={{
        suspense: true,
        fetcher: (url: string, init?: RequestInit) => {
          return fetch(`https://example.com${url}`, init)
            .then((res) => {
              if (!res.ok) {
                throw new Error(res.statusText)
              }

              return res.json()
            })
            .catch(console.error)
        },
      }}
    >
      {children}
    </SWRConfig>
  )

  return { user: userEvent.setup(), ...rtlRender(ui, { wrapper, ...options }) }
}
