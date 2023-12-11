import knex, { type Knex } from "knex";

const config: Knex.Config = {
	client: "sqlite3",
	connection: {
		filename: ":memory:",
	},
	useNullAsDefault: true,
};

export async function reset(k: Knex) {
	await k("book").truncate();
	await k("book_genres").truncate();
	await k("genre").truncate();
}

export const cmsdb = knex(config);
