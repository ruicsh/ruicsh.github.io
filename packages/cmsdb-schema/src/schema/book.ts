import type { Knex } from "knex";

export async function initialize(knex: Knex) {
  const hasTable = await knex.schema.hasTable("book");
  if (hasTable) {
    return;
  }

  await knex.schema.createTable("book", async (t) => {
    t.text("id").primary();

    t.text("title");
    t.text("authors");
    t.float("rating").nullable();

    t.date("readOnDate").nullable();
    t.date("queuedOnDate").nullable();
    t.date("wishedOnDate").nullable();

    t.text("isbn10");
    t.text("isbn13");
    t.text("cover");
    t.text("subtitle").nullable();
    t.text("description").nullable();
    t.integer("pageCount").nullable();
    t.text("publishedDate");
    t.text("publisher");

    t.text("sourceUrl");

    t.timestamp("createdAt").defaultTo(knex.fn.now());
  });
}
