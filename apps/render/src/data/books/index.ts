import { cmsdb } from "@ruicsh/services";

export async function getBookCategories() {
  return cmsdb("book_categories")
    .innerJoin("category", { "book_categories.categoryId": "category.id" })
    .select("book_categories.bookId", "category.slug")
    .then((rows) =>
      rows.reduce((acc, row) => {
        const { bookId, slug } = row;
        acc[bookId] = acc[bookId] || [];
        acc[bookId].push(slug);
        return acc;
      })
    );
}

interface IGetBooksArgs {
  collection?: IBooksCollection;
}

export async function getBooks(args?: IGetBooksArgs) {
  const { collection } = args || ({} as IGetBooksArgs);

  const commonFields = [
    "id",
    "authors",
    "description",
    "pageCount",
    "publishedDate",
    "publisher",
    "slug",
    "subtitle",
    "title",
  ];

  let data: IBook[];
  if (collection === "read") {
    data = await cmsdb("book")
      .select([...commonFields, "readOnDate", "rating"])
      .whereNot({ readOnDate: "" })
      .orderBy("readOnDate", "desc");
  } else if (collection === "queue") {
    data = await cmsdb("book")
      .select([...commonFields, "queuedOnDate"])
      .whereNot({ queuedOnDate: "" })
      .andWhere({ readOnDate: "" })
      .orderBy("queuedOnDate", "desc");
  } else if (collection === "wishlist") {
    data = await cmsdb("book")
      .select([...commonFields, "wishedOnDate"])
      .whereNot({ wishedOnDate: "" })
      .andWhere({ queuedOnDate: "" })
      .andWhere({ readOnDate: "" })
      .orderBy("wishedOnDate", "desc");
  } else {
    data = await cmsdb("book")
      .select(commonFields)
      .orderBy("wishedOnDate", "desc")
      .orderBy("queuedOnDate", "desc")
      .orderBy("readOnDate", "desc");
  }

  const bookCategories = await getBookCategories();
  const books = [];
  for (const book of data) {
    const { id, ...restOnBook } = book;
    if (!id) continue;

    const fresh = { ...restOnBook, categories: bookCategories[id] || [] };
    books.push(fresh);
  }

  return books;
}

export async function getCategories() {
  return cmsdb("category").select("label", "slug").orderBy("label");
}
