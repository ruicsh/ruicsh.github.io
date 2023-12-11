import PostscriptScraper from ".";

describe("psbooks scraper", () => {
	it("scrape psbooks book page", async () => {
		const scraper = new PostscriptScraper();
		const url = "https://www.psbooks.co.uk/empire-new-9780141975542-1";
		const actual = await scraper.fetchBookPage({ url });

		const expected = {
			cover:
				"https://www.psbooks.co.uk/media/catalog/product/2/8/288760_2233f85070628bb271dac76c78bc5813.jpg?quality=80&fit=&bounds=&height=&width=",
			isbn10: undefined,
			isbn13: "9780141975542",
			pageCount: 422,
			publisher: "Penguin",
		};
		expect(actual).toStrictEqual(expected);
	});
});
