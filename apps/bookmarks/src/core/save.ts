import { cuid } from "@ruicsh/helpers";
import { cmsdb } from "@ruicsh/services";
import { type Knex } from "knex";

export async function saveBookmark(bookmark: IBookmark, db: Knex = cmsdb) {
  const bookToSave = { ...bookmark, id: bookmark.id || cuid() };

  await db("bookmark")
    .insert(bookToSave)
    .onConflict("url")
    .merge()
    .returning("id");
}
