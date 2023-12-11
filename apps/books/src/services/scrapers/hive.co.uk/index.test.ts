import HiveScraper from ".";

describe("hive scraper", () => {
	it("scrape hive book page", async () => {
		const scraper = new HiveScraper();
		const url =
			"https://www.hive.co.uk/Product/Bobby-Fischer/Bobby-Fischer-Teaches-Chess/14448921";
		const actual = await scraper.fetchBookPage({ url });

		const expected = {
			cover: "https://hive.dmmserver.com/media/640/97805532/9780553263152.jpg",
			isbn10: undefined,
			isbn13: "9780553263152",
			pageCount: 352,
			publisher: "Random House USA Inc",
			publishedDate: "1982-07-01",
		};
		expect(actual).toStrictEqual(expected);
	});
});
