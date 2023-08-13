import type { Knex } from "knex";

export async function initialize(knex: Knex) {
  const hasTable = await knex.schema.hasTable("book");
  if (hasTable) {
    return;
  }

  await knex.schema.createTable("book", async (t) => {
    t.string("id").primary();

    t.string("title").notNullable();
    t.string("authors");
    t.float("rating").nullable();

    t.date("readOnDate").nullable();
    t.date("queuedOnDate").nullable();
    t.date("wishedOnDate").nullable();

    t.string("isbn10");
    t.string("isbn13");
    t.string("cover");
    t.text("subtitle").nullable();
    t.text("description").nullable();
    t.integer("pageCount").nullable();
    t.date("publishedDate");
    t.string("publisher");

    t.text("sourceUrl").unique();

    t.timestamp("createdAt").defaultTo(knex.fn.now());
  });
}
