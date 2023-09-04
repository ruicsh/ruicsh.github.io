import { setTimeout } from "node:timers/promises";

import { get } from "@ruicsh/helpers";
import { cmsdb, log } from "@ruicsh/services";
import sharp from "sharp";
import slugify from "slugify";

import GoogleBooksApi from "src/services/google-books-api";
import BookScraper from "src/services/scrapers";

import { getCoverColor } from "./get-cover-color";
import { resizeCover } from "./resize-cover";

export async function getBookDetails(book: IBookOnInbox) {
  const { sourceUrl } = book;
  const existing = await cmsdb("book").where({ sourceUrl }).first();
  if (existing) {
    return existing;
  }

  await setTimeout(1_000);
  const scraper = new BookScraper();
  const sourceSlug = scraper.getSlugFromUrl(sourceUrl);
  log.info(`Fetching book details from ${sourceSlug}`);

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
    slug: slugify(title, { lower: true }),
    subtitle,
    title,
  };

  if (!cover) return null;

  const remote = await get(cover);
  const src = remote.pipe(sharp());

  await resizeCover(bookDetails, src);
  bookDetails.coverColor = await getCoverColor(bookDetails);

  return bookDetails as IBookDetails;
}
