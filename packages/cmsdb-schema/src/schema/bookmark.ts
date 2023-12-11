import { type Knex } from "knex";

export async function initialize(knex: Knex) {
	const hasTable = await knex.schema.hasTable("bookmark");
	if (hasTable) {
		return;
	}

	await knex.schema.createTable("bookmark", async (t) => {
		t.string("id").primary();

		t.string("slug");
		t.string("url").unique();
		t.string("title").notNullable();
		t.string("excerpt");
		t.string("savedOnDate").notNullable();

		t.timestamp("createdAt").defaultTo(knex.fn.now());
	});
}
