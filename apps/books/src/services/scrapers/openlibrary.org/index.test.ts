import PostscriptScraper from ".";

describe("openlibrary scraper", () => {
	it("scrape openlibrary book page", async () => {
		const scraper = new PostscriptScraper();
		const url = "https://openlibrary.org/books/OL49646674M/The_Terminal_Beach";
		const actual = await scraper.fetchBookPage({ url });

		const expected = {
			cover: "https://covers.openlibrary.org/b/id/14429611-L.jpg",
			isbn10: "0140024999",
			publisher: "Penguin Books",
			publishedDate: "1974",
		};
		expect(actual).toStrictEqual(expected);
	});
});
