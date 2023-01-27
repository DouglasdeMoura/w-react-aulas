/* eslint-disable import/export */
import userEvent from '@testing-library/user-event'
import { type RenderOptions, render as rtlRender } from '@testing-library/react'
import { SWRConfig } from 'swr'
import { api } from './fetcher'
export * from '@testing-library/react'

export const render = (ui: React.ReactElement, options?: RenderOptions) => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <SWRConfig value={{ suspense: true, fetcher: api.get }}>
      {children}
    </SWRConfig>
  )

  return { user: userEvent.setup(), ...rtlRender(ui, { wrapper, ...options }) }
}
