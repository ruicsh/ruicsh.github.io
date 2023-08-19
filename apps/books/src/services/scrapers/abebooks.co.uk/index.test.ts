import Scraper from ".";

describe("abebooks scraper", () => {
  it("scrape abebooks book page", async () => {
    const scraper = new Scraper();
    const url =
      "https://www.abebooks.co.uk/servlet/BookDetailsPL?bi=30968406467";
    const actual = await scraper.fetchBookPage({ url });

    const expected = {
      cover: "https://pictures.abebooks.com/isbn/9780708821817-uk.jpg",
      isbn10: "0708821812",
      isbn13: "9780708821817",
      publisher: "Time Warner Paperbacks",
    };
    expect(actual).toStrictEqual(expected);
  });
});
