import { server } from "src/mocks/server";

process.env.LOG_LEVEL = "silent";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
