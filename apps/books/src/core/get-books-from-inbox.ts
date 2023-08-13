import path from "node:path";

import csv from "csvtojson";

export async function getBooksFromInbox() {
  const filename = path.join(process.cwd(), `inbox/books.csv`);
  const data = await csv().fromFile(filename);

  const books = data.map((book) => ({
    ...book,
    queuedOnDate: book.queuedOnDate ? book.queuedOnDate : undefined,
    wishedOnDate: book.wishedOnDate ? book.wishedOnDate : undefined,
    readOnDate: book.readOnDate ? book.readOnDate : undefined,
    rating: book.rating ? Number(book.rating) : undefined,
  }));

  return books as IBookOnInbox[];
}
