import { cuid } from "@ruicsh/helpers";
import { cmsdb } from "@ruicsh/services";
import type { Knex } from "knex";
import slugify from "slugify";

interface IRegisterBookCategoryArgs {
  bookId: string;
  category: string;
  db: Knex;
}

async function registerBookCategory(args: IRegisterBookCategoryArgs) {
  const { bookId, category, db = cmsdb } = args;
  const slug = slugify(category.trim(), { lower: true });
  let { id: categoryId } =
    (await db("category").where({ slug }).select("id").first()) || {};

  if (!categoryId) {
    categoryId = cuid();
    await db("category").insert({
      id: categoryId,
      slug,
      label: category.trim(),
      type: "books",
    });
  }

  await db("book_categories").insert({ bookId, categoryId });
}

export async function saveBook(book: IBookToSave, db: Knex = cmsdb) {
  const { categories, ...restOfBook } = book;
  const bookToSave = { ...restOfBook, id: book.id || cuid() };

  const [{ id: bookId }] = await db("book")
    .insert(bookToSave)
    .onConflict("sourceUrl")
    .merge()
    .returning("id");

  await db("book_categories").where({ bookId }).del();

  for await (const category of categories?.split(";") || []) {
    await registerBookCategory({ bookId, category, db });
  }
}
