import { type Knex } from "knex";

export async function initialize(knex: Knex) {
	const hasTable = await knex.schema.hasTable("genre");
	if (hasTable) {
		return;
	}

	await knex.schema.createTable("genre", async (t) => {
		t.string("id").primary();

		t.string("slug").notNullable();
		t.string("label").notNullable();
		t.enum("type", ["books", "films"]).notNullable();

		t.timestamp("createdAt").defaultTo(knex.fn.now());

		t.unique(["slug", "type"]);
	});
}
