import type { Knex } from "knex";

export async function initialize(knex: Knex) {
  const hasTable = await knex.schema.hasTable("book_genres");
  if (hasTable) {
    return;
  }

  await knex.schema.createTable("book_genres", async (t) => {
    t.string("bookId").index();
    t.string("genreId").index();

    t.primary(["bookId", "genreId"]);
  });
}
