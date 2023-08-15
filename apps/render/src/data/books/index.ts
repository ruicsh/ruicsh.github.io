import { cmsdb } from "@ruicsh/services";

interface IGetBooksArgs {
  collection?: IBooksCollection;
}

export async function getBooks(args?: IGetBooksArgs) {
  const { collection } = args || ({} as IGetBooksArgs);

  const commonFields = [
    "authors",
    "cover",
    "description",
    "pageCount",
    "publishedDate",
    "publisher",
    "subtitle",
    "title",
  ];

  let books: IBook[];
  if (collection === "read") {
    books = await cmsdb("book")
      .select([...commonFields, "readOnDate", "rating"])
      .whereNot({ readOnDate: "" })
      .orderBy("readOnDate", "desc");
  } else if (collection === "queue") {
    books = await cmsdb("book")
      .select([...commonFields, "queuedOnDate"])
      .whereNot({ queuedOnDate: "" })
      .andWhere({ readOnDate: "" })
      .orderBy("queuedOnDate", "desc");
  } else if (collection === "wishlist") {
    books = await cmsdb("book")
      .select([...commonFields, "wishedOnDate"])
      .whereNot({ wishedOnDate: "" })
      .andWhere({ queuedOnDate: "" })
      .andWhere({ readOnDate: "" })
      .orderBy("wishedOnDate", "desc");
  } else {
    books = await cmsdb("book")
      .select(commonFields)
      .orderBy("wishedOnDate", "desc")
      .orderBy("queuedOnDate", "desc")
      .orderBy("readOnDate", "desc");
  }

  return books;
}
