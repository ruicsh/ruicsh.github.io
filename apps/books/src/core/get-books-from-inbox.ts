import fs from "node:fs/promises";
import path from "node:path";

import { cmsdb } from "@ruicsh/services";

import { inboxDateField } from "./inbox-date-field";

interface IGetBooksFromInboxArgs {
  collection: IBookCollection;
}

export async function getBooksFromInbox(args: IGetBooksFromInboxArgs) {
  const { collection } = args;

  const filename = `${collection}.txt`;
  const booksInboxFile = path.join(process.cwd(), `inbox/books/${filename}`);
  const booksInbox = await fs.readFile(booksInboxFile, "utf-8");

  const data = booksInbox
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      let date;
      let url;
      let rating;

      if (collection === "read") {
        [rating, date, url] = line.split(" ");
      } else {
        [date, url] = line.split(" ");
      }

      return { [inboxDateField[collection]]: date, url, rating };
    });

  const fresh = [];
  for await (const book of data) {
    const exists = await cmsdb("book").where({ sourceUrl: book.url }).first();
    if (!exists) {
      fresh.push(book);
    }
  }

  return fresh;
}
