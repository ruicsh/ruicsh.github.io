import { type Knex } from "knex";

import { cmsdb } from "../services/db";
import * as book from "./book";
import * as bookGenres from "./book-genres";
import * as film from "./film";
import * as filmGenres from "./film-genres";
import * as genre from "./genre";

export async function initialize(knex: Knex = cmsdb) {
	await book.initialize(knex);
	await bookGenres.initialize(knex);
	await film.initialize(knex);
	await filmGenres.initialize(knex);
	await genre.initialize(knex);

	await cmsdb.destroy();
}
