import { cuid } from "@ruicsh/helpers";
import { cmsdb } from "@ruicsh/services";
import type { Knex } from "knex";
import slugify from "slugify";

type IRegisterFilmGenreArgs = {
	filmId: string;
	genre: string;
	db: Knex;
};

async function registerFilmGenre(args: IRegisterFilmGenreArgs) {
	const { filmId, genre, db = cmsdb } = args;
	const slug = slugify(genre.trim(), { lower: true });

	const record = await db("genre")
		.where({ slug, type: "films" })
		.select("id")
		.first();
	let { id: genreId } = record || {};

	if (!genreId) {
		genreId = cuid();
		await db("genre").insert({
			id: genreId,
			slug,
			label: genre.trim(),
			type: "films",
		});
	}

	await db("film_genres").insert({ filmId, genreId });
}

type IArgs = {
	film: IFilm;
	db?: Knex;
};

export async function saveFilm(args: IArgs) {
	const { film, db = cmsdb } = args;
	const { genres, ...restOfFilm } = film;
	const filmToSave = { ...restOfFilm, id: film.id || cuid() };

	const [{ id: filmId }] = await db("film")
		.insert(filmToSave)
		.onConflict("sourceUrl")
		.merge()
		.returning("id");

	await db("film_genres").where({ filmId }).del();

	for await (const genre of genres?.split(";") || []) {
		if (genre.trim().length === 0) {
			continue;
		}

		await registerFilmGenre({ filmId, genre, db });
	}
}
