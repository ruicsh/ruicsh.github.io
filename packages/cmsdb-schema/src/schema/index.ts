import { type Knex } from "knex";

import { cmsdb } from "../services/db";
import * as book from "./book";
import * as bookGenres from "./book_genres";
import * as bookmark from "./bookmark";
import * as genre from "./genre";

export async function initialize(knex: Knex = cmsdb) {
	await book.initialize(knex);
	await genre.initialize(knex);
	await bookGenres.initialize(knex);
	await bookmark.initialize(knex);

	await cmsdb.destroy();
}
