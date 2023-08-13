import { log } from "@ruicsh/services";

import GoogleBooksApi from "src/services/google-books-api";
import AmazonScraper from "src/services/scrapers/amazon.co.uk";
import HiveScraper from "src/services/scrapers/hive.co.uk";
import PostscriptScraper from "src/services/scrapers/psbooks.co.uk";
import BlackwellsScraper from "src/services/scrapers/blackwells.co.uk";

async function getBookDetailsFromScraper(url: string) {
  const amazon = new AmazonScraper();
  const hive = new HiveScraper();
  const psbooks = new PostscriptScraper();
  const blackwells = new BlackwellsScraper();

  const parsed = new URL(url);
  let scrapedBook: Partial<IScrapedBookDetails> | null = null;

  if (/amazon/.test(parsed.hostname)) {
    scrapedBook = await amazon.fetchBookPage({ url });
  }
  if (/hive/.test(parsed.hostname)) {
    scrapedBook = await hive.fetchBookPage({ url });
  }
  if (/psbooks/.test(parsed.hostname)) {
    scrapedBook = await psbooks.fetchBookPage({ url });
  }
  if (/blackwells/.test(parsed.hostname)) {
    scrapedBook = await blackwells.fetchBookPage({ url });
  }

  return scrapedBook;
}

function getSlugFromUrl(url: string) {
  const parsed = new URL(url);

  if (/amazon/.test(parsed.hostname)) {
    const [, slug] = parsed.pathname.split("/");
    return slug;
  }
  if (/hive/.test(parsed.hostname)) {
    const [, , , slug] = parsed.pathname.split("/");
    return slug;
  }
  if (/psbooks/.test(parsed.hostname)) {
    const [, slug] = parsed.pathname.split("/");
    return slug;
  }
  if (/blackwells/.test(parsed.hostname)) {
    const [, , slug] = parsed.pathname.split("/");
    return slug;
  }

  return null;
}

export async function getBookDetails(url: string) {
  const slug = getSlugFromUrl(url);
  log.info(`Fetching book details from ${slug}`);

  const scrapedBook = await getBookDetailsFromScraper(url);
  if (!scrapedBook) {
    throw new Error(`Scraper not implemented: ${url}`);
  }

  if (!scrapedBook.isbn13 && !scrapedBook.isbn10) {
    throw new Error(`ISBN not found: ${url}`);
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
