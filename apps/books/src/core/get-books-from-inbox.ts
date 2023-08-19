import { Readable } from "node:stream";

import csv from "csvtojson";

export async function getBooksFromInbox() {
  const url = new URL("https://raw.githubusercontent.com");
  url.pathname = "/ruicsh/ruicsh.github.io/inbox/books.csv";
  const response = await fetch(url.href);
  if (!response?.body) {
    throw new Error(`Can't find ${url.href}`);
  }

  // @ts-expect-error needs ReadableStream<any> instead of ReadableStream<Uint8Array>
  const stream = Readable.fromWeb(response.body);

  const books = await csv()
    .fromStream(stream)
    .subscribe((book) => ({
      ...book,
      queuedOnDate: book.queuedOnDate ? book.queuedOnDate : undefined,
      wishedOnDate: book.wishedOnDate ? book.wishedOnDate : undefined,
      readOnDate: book.readOnDate ? book.readOnDate : undefined,
      rating: book.rating ? Number(book.rating) : undefined,
    }));

  return books as IBookOnInbox[];
}
