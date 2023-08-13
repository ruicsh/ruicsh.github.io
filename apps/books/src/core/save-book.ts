import type { Knex } from "knex";
import { cuid } from "@ruicsh/helpers";
import { cmsdb } from "@ruicsh/services";

export async function saveBook(book: IBookToSave, db: Knex = cmsdb) {
  const bookToSave = { ...book, id: book.id || cuid() };
  await db("book").insert(bookToSave).onConflict("sourceUrl").merge();
}
