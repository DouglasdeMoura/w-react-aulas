import { fetch } from 'cross-fetch'
import * as matchers from 'vitest-dom/matchers'
import { afterAll, afterEach, beforeAll, expect } from 'vitest'

import { server } from '../src/mocks/server'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

global.fetch = fetch

expect.extend(matchers)
