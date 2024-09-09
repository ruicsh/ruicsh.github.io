import knex, { type Knex } from "knex";

const config: Knex.Config = {
	client: "sqlite3",
	connection: {
		filename: ":memory:",
	},
	useNullAsDefault: true,
};

export const cmsdb = knex(config);
