import AmazonScraper from ".";

describe("blackwells scraper", () => {
  it("scrape blackwells book page", async () => {
    const scraper = new AmazonScraper();
    const url =
      "https://blackwells.co.uk/bookshop/product/A-History-of-Western-Philosophy-by-Bertrand-Russell/9780671201586";
    const actual = await scraper.fetchBookPage({ url });

    const expected = {
      cover: "https://blackwells.co.uk/jacket/500x500/9780671201586.webp",
      isbn10: undefined,
      isbn13: "9780671201586",
      publisher: "Simon & Schuster",
      publishedDate: "1986-01-01",
      pageCount: 895,
    };
    expect(actual).toStrictEqual(expected);
  });
});
