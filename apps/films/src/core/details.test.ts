import { cmsdbSchema } from "@ruicsh/cmsdb-schema";
import { cmsdb, resetDb } from "@ruicsh/services";

import { getFilmDetails } from "./details";

vi.mock("sharp", () => ({}));

describe("getFilmDetails", () => {
	beforeAll(async () => {
		await cmsdbSchema.initialize(cmsdb);
	});

	afterEach(async () => {
		await resetDb(cmsdb);
	});

	afterAll(async () => {
		await cmsdb.destroy();
	});

	it("should fetch film details", async () => {
		const film = {
			genres: "Science fiction",
			sourceUrl: "https://www.themoviedb.org/movie/286217",
			watchedOnDate: "2024-09-08",
		};
		const actual = await getFilmDetails({ film });

		const expected = {
			director: "Ridley Scott",
			genres: "Science fiction",
			title: "The Martian",
			slug: "the-martian-2015",
			year: 2015,
			watchedOnDate: "2024-09-08",
			sourceUrl: "https://www.themoviedb.org/movie/286217",
		};
		expect(actual).toStrictEqual(expected);
	});
});
