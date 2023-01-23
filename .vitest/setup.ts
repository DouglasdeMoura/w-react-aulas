import { afterAll, afterEach, beforeAll } from "vitest";

import { server } from "../src/mocks/server";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
