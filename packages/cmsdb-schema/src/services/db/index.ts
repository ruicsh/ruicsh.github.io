import knex, { type Knex } from "knex";

import config from "../../config";

const dbConfig: Knex.Config = {
	client: "sqlite3",
	connection: {
		filename: config.get("cms.db.filename"),
	},
	useNullAsDefault: true,
};

export const cmsdb = knex(dbConfig);
