import { setTimeout } from "node:timers/promises";

import { log, cmsdb } from "@ruicsh/services";

import GoogleBooksApi from "src/services/google-books-api";
import BookScraper from "src/services/scrapers";

export async function getBookDetails(book: IBookOnInbox) {
  const { sourceUrl } = book;
  const existing = await cmsdb("book").where({ sourceUrl }).first();
  if (existing) {
    return existing;
  }

  await setTimeout(1_000);
  const scraper = new BookScraper();
  const slug = scraper.getSlugFromUrl(sourceUrl);
  log.info(`Fetching book details from ${slug}`);

  const scrapedBook = await scraper.fetchBookPage({ url: sourceUrl });
  if (!scrapedBook) {
    throw new Error(`Scraper not implemented: ${sourceUrl}`);
  }

  if (!scrapedBook.isbn13 && !scrapedBook.isbn10) {
    throw new Error(`ISBN not found: ${sourceUrl}`);
  }

  const googleBooksApi = new GoogleBooksApi();
  const googleBook = await googleBooksApi.findVolumeInfo({
    isbn: (scrapedBook.isbn13 || scrapedBook.isbn10) as string,
  });
  if (!googleBook) {
    return undefined;
  }

  const { isbn10, isbn13, cover, publisher, publishedDate } = scrapedBook;
  const { title, subtitle, authors, description } = googleBook;

  const bookDetails: Partial<IBookDetails> = {
    authors: authors.join(", "),
    cover,
    description,
    isbn10,
    isbn13,
    pageCount: scrapedBook.pageCount || googleBook.pageCount,
    publishedDate,
    publisher,
    subtitle,
    title,
  };

  return bookDetails as IBookDetails;
}
