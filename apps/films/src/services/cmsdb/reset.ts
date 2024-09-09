import { type Knex } from "knex";

export async function reset(knex: Knex) {
	await knex("book_genres").truncate();
	await knex("book").truncate();
	await knex("film_genres").truncate();
	await knex("film").truncate();
	await knex("genre").truncate();
}
