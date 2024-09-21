import { setTimeout } from "node:timers/promises";

import { cmsdb, log, TMDB } from "@ruicsh/services";
import slugify from "slugify";

import { getPoster } from "./poster";

function getTmdbIdFromUrl(url: string) {
	const uri = new URL(url);
	const [, tmdbId] = /movie\/(\d+)/.exec(uri.pathname) || [];

	return tmdbId;
}

function getDetails(movie: ITmdbMovieDetails) {
	const { title, release_date, credits } = movie;
	const { crew = [] } = credits || {};

	const date = new Date(release_date);
	const year = date.getFullYear();
	const slug = slugify([title, year].join(" "), { lower: true });
	const director = crew
		.filter(
			(person: ITmdbCrew) =>
				person.job === "Director" && person.department === "Directing",
		)
		.map((person: ITmdbCrew) => person.name)
		.join(", ");

	return {
		slug,
		year: date.getFullYear(),
		title,
		director,
	};
}

type IArgs = {
	film: IFilmInInbox;
};

export async function getFilmDetails(args: IArgs) {
	const { film } = args;

	const { sourceUrl } = film;
	const existing = await cmsdb("film").where({ sourceUrl }).first();
	if (existing) {
		return existing;
	}

	await setTimeout(1_000);
	const tmdbId = getTmdbIdFromUrl(sourceUrl);
	log.info(`Fetching film details for ${tmdbId}`);
	const tmdb = new TMDB();
	const movie = await tmdb.getMovie(tmdbId);
	const details = getDetails(movie);

	await getPoster(details.slug, movie);

	return { ...film, ...details };
}
