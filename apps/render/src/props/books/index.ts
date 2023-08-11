import data from "./books.json";

interface IGetBooksArgs {
  collection?: "read" | "queue" | "wishlist";
}

export async function getBooks(args?: IGetBooksArgs) {
  const { collection } = args || ({} as IGetBooksArgs);

  let books: IBook[];
  if (collection === "read") {
    books = data
      .filter((book) => book.readOnDate)
      .sort((a, b) => b.readOnDate!.localeCompare(a.readOnDate!));
  } else if (collection === "queue") {
    books = (data as IBook[])
      .filter((book) => book.ownedOnDate)
      .filter((book) => !book.readOnDate)
      .sort((a, b) => b.ownedOnDate!.localeCompare(a.ownedOnDate!));
  } else if (collection === "wishlist") {
    books = (data as IBook[])
      .filter((book) => book.wishedOnDate)
      .filter((book) => !book.ownedOnDate)
      .filter((book) => !book.readOnDate)
      .sort((a, b) => b.ownedOnDate!.localeCompare(a.wishedOnDate!));
  } else {
    books = data.sort((a, b) => {
      const aDate = a.readOnDate || a.ownedOnDate || a.wishedOnDate;
      const bDate = b.readOnDate || b.ownedOnDate || b.wishedOnDate;
      return bDate!.localeCompare(aDate!);
    });
  }

  return books;
}
