import 'vitest-dom/extend-expect'
import * as matchers from 'vitest-dom/matchers'
import { afterAll, afterEach, beforeAll, expect } from 'vitest'

import { server } from '../src/mocks/server'

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

expect.extend(matchers)
