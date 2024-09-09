import { type Knex } from "knex";

export async function initialize(knex: Knex) {
	const hasTable = await knex.schema.hasTable("film_genres");
	if (hasTable) {
		return;
	}

	await knex.schema.createTable("film_genres", async (t) => {
		t.string("filmId").index();
		t.string("genreId").index();

		t.primary(["filmId", "genreId"]);
	});
}
