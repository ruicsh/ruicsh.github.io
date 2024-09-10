import { server } from "src/mocks/server";

process.env.LOG_LEVEL = "silent";
process.env.TMDB_ACCESS_TOKEN = "test-access-token";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
