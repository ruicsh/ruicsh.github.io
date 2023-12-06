import { cmsdb } from "@ruicsh/services";
import { type Knex } from "knex";

export const ITEMS_PER_PAGE = 18;

export async function getBookGenres() {
  return cmsdb("book_genres")
    .innerJoin("genre", { "book_genres.genreId": "genre.id" })
    .select("book_genres.bookId", "genre.slug")
    .then((rows) =>
      rows.reduce((acc, row) => {
        const { bookId, slug } = row;
        acc[bookId] = acc[bookId] || [];
        acc[bookId].push(slug);
        return acc;
      })
    );
}

function getCollection(book: IBook): IBooksCollection {
  const { readOnDate, queuedOnDate } = book;
  if (readOnDate) return "read";
  if (queuedOnDate) return "queue";

  return "wishlist";
}

type IGetBooksArgs = {
  db?: Knex;
  collection: IBooksCollection;
  page?: number;
};

export async function getBooks(args?: IGetBooksArgs) {
  const { collection, page, db = cmsdb } = args || ({} as IGetBooksArgs);

  const offset = page ? (page - 1) * ITEMS_PER_PAGE : 0;
  const limit = page ? ITEMS_PER_PAGE : -1;

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
    "coverColor",
    "wishedOnDate",
    "queuedOnDate",
    "readOnDate",
    "rating",
  ];

  let data: IBook[];
  if (collection === "read") {
    data = await db("book")
      .select([...commonFields, "readOnDate", "rating"])
      .whereNotNull("readOnDate")
      .orderBy("readOnDate", "desc")
      .limit(limit)
      .offset(offset);
  } else if (collection === "queue") {
    data = await db("book")
      .select([...commonFields, "queuedOnDate"])
      .whereNotNull("queuedOnDate")
      .whereNull("readOnDate")
      .orderBy("queuedOnDate", "desc")
      .limit(limit)
      .offset(offset);
  } else if (collection === "wishlist") {
    data = await db("book")
      .select([...commonFields, "wishedOnDate"])
      .whereNotNull("wishedOnDate")
      .whereNull("queuedOnDate")
      .whereNull("readOnDate")
      .orderBy("wishedOnDate", "desc")
      .limit(limit)
      .offset(offset);
  } else {
    data = await db("book")
      .select(commonFields)
      .orderBy("wishedOnDate", "desc")
      .orderBy("queuedOnDate", "desc")
      .orderBy("readOnDate", "desc")
      .limit(limit)
      .offset(offset);
  }

  const bookGenres = await getBookGenres();
  const books = [];
  for (const book of data) {
    const { id, description, ...restOnBook } = book;
    if (!id) continue;

    const fresh = {
      ...restOnBook,
      description: (description || "").split(" ").slice(0, 70).join(" "),
      collection: getCollection(book),
      genres: bookGenres[id] || [],
    };
    books.push(fresh);
  }

  return books;
}

type IGetCollectionMetaArgs = {
  collection: IBooksCollection;
};

export async function getCollectionMeta(args: IGetCollectionMetaArgs) {
  const { collection } = args;
  const books = await getBooks({ collection });

  const { length: totalItems } = books;
  const numberOfPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return { totalItems, numberOfPages };
}

export async function getGenres() {
  return cmsdb("genre").select("label", "slug").orderBy("label");
}
