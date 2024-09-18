import { getBooksFromInbox } from "./inbox";

describe("getBooksFromInbox", () => {
	it("downloads and parses from the remote inbox file", async () => {
		const actual = await getBooksFromInbox();

		const expected = {
			categories: "History",
			queuedOnDate: "2023-06-25",
			rating: undefined,
			readOnDate: undefined,
			sourceUrl:
				"https://www.amazon.co.uk/Making-Atomic-Bomb-Richard-Rhodes/dp/1471111237/ref=sr_1_1?crid=1NL10OHEZC9IA&keywords=the+making+of+the+atomic+bomb&qid=1691766139&sprefix=The+Making+of+the+Atomic+Bomb%2Caps%2C151&sr=8-1",
			wishedOnDate: undefined,
			isbn: undefined,
		};
		expect(actual).toHaveLength(91);
		expect(actual[0]).toStrictEqual(expected);
	});
});
