import { server } from "src/mocks/server";

process.env.LOG_LEVEL = "silent";
process.env.TMDB_API_KEY = "test-api-key";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
