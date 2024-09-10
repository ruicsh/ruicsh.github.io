import { cmsdb } from "@ruicsh/services";
import type { Knex } from "knex";

export const ITEMS_PER_PAGE = 18;

export async function getFilmGenres() {
	const records = await cmsdb("film_genres")
		.innerJoin("genre", { "film_genres.genreId": "genre.id" })
		.select("film_genres.filmId", "genre.slug");

	const filmGenres = {} as { [key: string]: string[] };
	for await (const record of records) {
		const { filmId, slug } = record;
		filmGenres[filmId] = filmGenres[filmId] || [];
		filmGenres[filmId].push(slug);
	}

	return filmGenres;
}

function getCollection(film: IFilm) {
	const { watchedOnDate } = film;
	if (watchedOnDate) {
		return "watched";
	}

	return "wishlist";
}

type IGetFilmsArgs = {
	db?: Knex;
	collection: string;
	page?: number;
};

export async function getFilms(args?: IGetFilmsArgs) {
	const { collection, page, db = cmsdb } = args || ({} as IGetFilmsArgs);

	const offset = page ? (page - 1) * ITEMS_PER_PAGE : 0;
	const limit = page ? ITEMS_PER_PAGE : -1;

	const commonFields = [
		"director",
		"id",
		"rating",
		"slug",
		"title",
		"year",
		"watchedOnDate",
		"wishedOnDate",
	];

	let data: IFilm[];
	switch (collection) {
		case "watched": {
			data = await db("film")
				.select([...commonFields, "watchedOnDate", "rating"])
				.whereNotNull("watchedOnDate")
				.orderBy("wishedOnDate", "desc")
				.limit(limit)
				.offset(offset);
			break;
		}
		case "wishlist": {
			data = await db("film")
				.select([...commonFields, "wishedOnDate"])
				.whereNotNull("wishedOnDate")
				.whereNull("watchedOnDate")
				.orderBy("wishedOnDate", "desc")
				.limit(limit)
				.offset(offset);
			break;
		}
		default: {
			data = await db("film")
				.select(commonFields)
				.orderBy("wishedOnDate", "desc")
				.orderBy("watchedOnDate", "desc")
				.limit(limit)
				.offset(offset);
			break;
		}
	}

	const filmGenres = await getFilmGenres();
	const films = [];
	for (const film of data) {
		const { id, ...restOfFilm } = film;
		if (!id) {
			continue;
		}

		const fresh = {
			...restOfFilm,
			collection: getCollection(film),
			genres: filmGenres[id] || [],
		};
		films.push(fresh);
	}

	return films;
}

export async function getGenres() {
	return cmsdb("genre")
		.where({ type: "films" })
		.select("label", "slug")
		.orderBy("label");
}
