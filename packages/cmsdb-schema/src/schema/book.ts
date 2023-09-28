import { type Knex } from "knex";

export async function initialize(knex: Knex) {
  const hasTable = await knex.schema.hasTable("book");
  if (hasTable) {
    return;
  }

  await knex.schema.createTable("book", async (t) => {
    t.string("id").primary();

    t.string("slug");
    t.string("title").notNullable();
    t.string("authors");
    t.float("rating").nullable();

    t.date("readOnDate").nullable().defaultTo(null);
    t.date("queuedOnDate").nullable().defaultTo(null);
    t.date("wishedOnDate").nullable().defaultTo(null);

    t.string("isbn10", 13);
    t.string("isbn13", 13);
    t.string("cover");
    t.string("coverColor", 8).nullable().defaultTo(null);
    t.text("subtitle").nullable().defaultTo(null);
    t.text("description").nullable().defaultTo(null);
    t.integer("pageCount").nullable().defaultTo(null);
    t.date("publishedDate");
    t.string("publisher");

    t.text("sourceUrl").unique();

    t.timestamp("createdAt").defaultTo(knex.fn.now());
  });
}
