import type { Knex } from "knex";

import { cmsdb } from "../services/db";
import * as book from "./book";
import * as category from "./category";
import * as bookCategories from "./book_categories";

export async function initialize(knex: Knex = cmsdb) {
  await book.initialize(knex);
  await category.initialize(knex);
  await bookCategories.initialize(knex);

  await cmsdb.destroy();
}
