import { cuid } from "@ruicsh/helpers";
import { cmsdb } from "@ruicsh/services";
import type { Knex } from "knex";
import slugify from "slugify";

interface IRegisterBookGenreArgs {
  bookId: string;
  genre: string;
  db: Knex;
}

async function registerBookGenre(args: IRegisterBookGenreArgs) {
  const { bookId, genre, db = cmsdb } = args;
  const slug = slugify(genre.trim(), { lower: true });
  let { id: genreId } =
    (await db("genre").where({ slug }).select("id").first()) || {};

  if (!genreId) {
    genreId = cuid();
    await db("genre").insert({
      id: genreId,
      slug,
      label: genre.trim(),
      type: "books",
    });
  }

  await db("book_genres").insert({ bookId, genreId });
}

export async function saveBook(book: IBookToSave, db: Knex = cmsdb) {
  const { genres, ...restOfBook } = book;
  const bookToSave = { ...restOfBook, id: book.id || cuid() };

  const [{ id: bookId }] = await db("book")
    .insert(bookToSave)
    .onConflict("sourceUrl")
    .merge()
    .returning("id");

  await db("book_genres").where({ bookId }).del();

  for await (const genre of genres?.split(";") || []) {
    await registerBookGenre({ bookId, genre, db });
  }
}
