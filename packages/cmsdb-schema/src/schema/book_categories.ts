import type { Knex } from "knex";

export async function initialize(knex: Knex) {
  const hasTable = await knex.schema.hasTable("book_categories");
  if (hasTable) {
    return;
  }

  await knex.schema.createTable("book_categories", async (t) => {
    t.string("bookId").index();
    t.string("categoryId").index();

    t.primary(["bookId", "categoryId"]);
  });
}
