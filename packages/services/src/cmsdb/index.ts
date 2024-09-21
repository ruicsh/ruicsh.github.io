import knex, { type Knex } from "knex";

import config from "../config";

const filename = process.env.VITEST_WORKER_ID
	? ":memory:"
	: config.get("cms.db.filename");

const dbConfig: Knex.Config = {
	client: "sqlite3",
	connection: { filename },
	useNullAsDefault: true,
};

export const cmsdb = knex(dbConfig);

export { resetDb } from "./reset";
