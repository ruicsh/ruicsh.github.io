import { setTimeout } from "node:timers/promises";

import { fetch } from "@ruicsh/helpers";
import { cmsdb as db, log } from "@ruicsh/services";
import sharp from "sharp";
import slugify from "slugify";

import GoogleBooksApi from "src/services/google-books-api";
import BookScraper from "src/services/scrapers";

import { resizeCover } from "./cover";
import { getCoverColor } from "./cover-color";

export async function getBookDetails(book: IBookInInbox) {
	const { sourceUrl } = book;
	const existing = await db("book").where({ sourceUrl }).first();
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

	if (!scrapedBook.isbn13 && !scrapedBook.isbn10 && !book.isbn) {
		throw new Error(`ISBN not found: ${sourceUrl}`);
	}

	const googleBooksApi = new GoogleBooksApi();
	const isbn = (book.isbn ||
		scrapedBook.isbn13 ||
		scrapedBook.isbn10) as string;
	const googleBook = await googleBooksApi.findVolumeInfo({ isbn });
	if (!googleBook) {
		return;
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

	if (!cover) {
		return;
	}

	const remote = await fetch.stream(cover);
	const src = remote.pipe(sharp());

	await resizeCover(bookDetails, src);
	bookDetails.coverColor = await getCoverColor(bookDetails);

	return bookDetails as IBookDetails;
}
