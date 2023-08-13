import csv from "csvtojson";

interface IGetBooksArgs {
  collection?: "read" | "queue" | "wishlist";
}

export async function getBooks(args?: IGetBooksArgs) {
  const { collection } = args || ({} as IGetBooksArgs);

  const data = (await csv().fromFile("./shared/books.csv")) as IBook[];

  let books: IBook[];
  if (collection === "read") {
    books = data
      .filter((book) => book.readOnDate)
      .sort((a, b) => b.readOnDate!.localeCompare(a.readOnDate!));
  } else if (collection === "queue") {
    books = data
      .filter((book) => book.queuedOnDate)
      .filter((book) => !book.readOnDate)
      .sort((a, b) => b.queuedOnDate!.localeCompare(a.queuedOnDate!));
  } else if (collection === "wishlist") {
    books = data
      .filter((book) => !book.queuedOnDate)
      .filter((book) => !book.readOnDate)
      .filter((book) => book.wishedOnDate)
      .sort((a, b) => b.queuedOnDate!.localeCompare(a.wishedOnDate!));
  } else {
    books = data.sort((a, b) => {
      const aDate = a.readOnDate || a.queuedOnDate || a.wishedOnDate;
      const bDate = b.readOnDate || b.queuedOnDate || b.wishedOnDate;
      return bDate!.localeCompare(aDate!);
    });
  }

  return books;
}
