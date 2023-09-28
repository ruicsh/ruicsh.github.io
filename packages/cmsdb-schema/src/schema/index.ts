import { type Knex } from "knex";

import { cmsdb } from "../services/db";
import * as book from "./book";
import * as genre from "./genre";
import * as bookGenres from "./book_genres";

export async function initialize(knex: Knex = cmsdb) {
  await book.initialize(knex);
  await genre.initialize(knex);
  await bookGenres.initialize(knex);

  await cmsdb.destroy();
}
