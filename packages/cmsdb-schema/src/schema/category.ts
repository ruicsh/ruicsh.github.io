import type { Knex } from "knex";

export async function initialize(knex: Knex) {
  const hasTable = await knex.schema.hasTable("category");
  if (hasTable) {
    return;
  }

  await knex.schema.createTable("category", async (t) => {
    t.string("id").primary();

    t.string("slug").notNullable().unique();
    t.string("label").notNullable();
    t.enum("type", ["books"]).notNullable();

    t.timestamp("createdAt").defaultTo(knex.fn.now());
  });
}
