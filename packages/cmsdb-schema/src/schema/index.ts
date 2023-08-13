import type { Knex } from "knex";

import { cmsdb } from "../services/db";
import * as book from "./book";

export async function initialize(knex: Knex = cmsdb) {
  await book.initialize(knex);

  await cmsdb.destroy();
}
