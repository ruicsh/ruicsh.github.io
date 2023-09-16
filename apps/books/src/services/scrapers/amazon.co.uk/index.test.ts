import AmazonScraper from ".";

describe("amazon scraper", () => {
  it("scrape amazon book page from image gallery", async () => {
    const scraper = new AmazonScraper();
    const url = "https://www.amazon.co.uk/book-1";
    const actual = await scraper.fetchBookPage({ url });

    const expected = {
      cover: "https://m.media-amazon.com/images/I/81T6T0jBU9L.jpg",
      isbn10: "0241363152",
      isbn13: "9780241363157",
      publisher: "Penguin",
      publishedDate: "2019-06-13",
      pageCount: 704,
    };
    expect(actual).toStrictEqual(expected);
  });

  it("scrape amazon book page from image block", async () => {
    const scraper = new AmazonScraper();
    const url = "https://www.amazon.co.uk/book-2";
    const actual = await scraper.fetchBookPage({ url });

    const expected = {
      cover: "https://m.media-amazon.com/images/I/81PKUwQLQhL._SL1500_.jpg",
      isbn10: "0192802488",
      isbn13: "9780192802484",
      pageCount: 184,
      publishedDate: "2007-03-22",
      publisher: "OUP Oxford",
    };
    expect(actual).toStrictEqual(expected);
  });
});
