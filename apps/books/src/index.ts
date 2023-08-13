import { setTimeout } from "node:timers/promises";

import { cmsdbSchema } from "@ruicsh/cmsdb-schema";
import { cmsdb, log } from "@ruicsh/services";

import { exportToCsv } from "./core/export-to-csv";
import { getBookDetails } from "./core/get-book-details";
import { getBooksFromInbox } from "./core/get-books-from-inbox";
import { inboxDateField } from "./core/inbox-date-field";
import { saveBook } from "./core/save-book";

async function main() {
  await cmsdbSchema.initialize();

  const collections = ["read", "queue", "wishlist"] as IBookCollection[];
  for await (const collection of collections) {
    const books = await getBooksFromInbox({ collection });
    log.info(`Found ${books.length} books in ${collection} inbox`);

    for await (const book of books) {
      await setTimeout(1_000);
      const bookDetails = await getBookDetails(book.url);
      if (!bookDetails?.title) {
        log.info("... failed.");
        continue;
      }

      await saveBook({
        ...bookDetails,
        [inboxDateField[collection]]: book[inboxDateField[collection]],
        rating: book.rating,
        sourceUrl: book.url,
      });
    }

    log.info(`Done with collection: ${collection}`);
  }

  await exportToCsv();

  await cmsdb.destroy();
  log.info("Done.");
}

main();
