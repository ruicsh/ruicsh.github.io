/* eslint-disable unicorn/no-null */
import { type Knex } from "knex";

export async function initialize(knex: Knex) {
	const hasTable = await knex.schema.hasTable("film");
	if (hasTable) {
		return;
	}

	await knex.schema.createTable("film", async (t) => {
		t.string("id").primary();

		t.string("slug").notNullable().unique();
		t.string("title").notNullable();
		t.string("director");
		t.integer("year");
		t.float("rating").nullable();

		t.date("wishedOnDate").nullable().defaultTo(null);
		t.date("watchedOnDate").nullable().defaultTo(null);

		t.text("sourceUrl").unique();

		t.timestamp("createdAt").defaultTo(knex.fn.now());
	});
}
