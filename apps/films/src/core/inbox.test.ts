import { getFilmsFromInbox } from "./inbox";

describe("getFilmsFromInbox", () => {
	it("downloads and parses from the remote inbox file", async () => {
		const actual = await getFilmsFromInbox();

		const expected = {
			genres: "Science fiction",
			rating: 4,
			sourceUrl:
				"https://www.themoviedb.org/movie/286217-the-martian?language=en-GB",
			watchedOnDate: "2024-09-08",
			wishedOnDate: "",
		};
		expect(actual).toHaveLength(1);
		expect(actual[0]).toStrictEqual(expected);
	});
});
