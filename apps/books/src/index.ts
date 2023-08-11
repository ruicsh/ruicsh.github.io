import { setTimeout } from "node:timers/promises";

import GoogleBooksApi from "src/services/google-books-api";
import AmazonScraper from "src/services/amazon-scraper";

async function getBookDetails(url: string) {
  const amazonScraper = new AmazonScraper();
  const googleBooksApi = new GoogleBooksApi();

  await setTimeout(1_000);

  const amazonBook = await amazonScraper.fetchBookPage({ url });
  const volumeInfo = await googleBooksApi.findVolumeInfo({
    isbn: amazonBook.isbn13,
  });

  const {
    isbn13: isbn,
    cover,
    dimensions,
    publisher,
    publishedDate,
  } = amazonBook;
  const { title, subTitle, authors, description } = volumeInfo;

  return {
    isbn,
    cover,
    dimensions,
    title,
    subTitle,
    authors,
    publisher,
    publishedDate,
    description,
  } as IBookDetails;
}

async function main() {
  const url =
    "https://www.amazon.co.uk/War-World-Historys-Age-Hatred/dp/0141013826/ref=tmm_pap_swatch_0?_encoding=UTF8&qid=1691795300&sr=8-1";

  const bookDetails = await getBookDetails(url);

  console.log(bookDetails);
}

main();
