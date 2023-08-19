import { cmsdbSchema } from "@ruicsh/cmsdb-schema";
import { cmsdb, log } from "@ruicsh/services";

import { getBookDetails } from "./core/get-book-details";
import { getBooksFromInbox } from "./core/get-books-from-inbox";
import { saveBook } from "./core/save-book";

async function main() {
  await cmsdbSchema.initialize();

  const books = await getBooksFromInbox();
  for await (const bookOnInbox of books) {
    const bookDetails = await getBookDetails(bookOnInbox);
    if (!bookDetails?.title) {
      log.info("... failed.");
      continue;
    }

    await saveBook({ ...bookDetails, ...bookOnInbox });
  }

  await cmsdb.destroy();

  log.info("Done.");
}

main().then(() => {
  process.exit(0);
});
