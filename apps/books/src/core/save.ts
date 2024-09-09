import { cuid } from "@ruicsh/helpers";
import { cmsdb } from "@ruicsh/services";
import { type Knex } from "knex";
import slugify from "slugify";

type IRegisterBookGenreArgs = {
	bookId: string;
	genre: string;
	db: Knex;
};

async function registerBookGenre(args: IRegisterBookGenreArgs) {
	const { bookId, genre, db = cmsdb } = args;
	const slug = slugify(genre.trim(), { lower: true });

	const record = await db("genre")
		.where({ slug, type: "books" })
		.select("id")
		.first();
	let { id: genreId } = record || {};

	if (!genreId) {
		genreId = cuid();
		await db("genre").insert({
			id: genreId,
			slug,
			label: genre.trim(),
			type: "books",
		});
	}

	await db("book_genres").insert({ bookId, genreId });
}

export async function saveBook(book: IBookToSave, db: Knex = cmsdb) {
	const { genres, ...restOfBook } = book;
	const bookToSave = { ...restOfBook, id: book.id || cuid() };

	const [{ id: bookId }] = await db("book")
		.insert(bookToSave)
		.onConflict("sourceUrl")
		.merge()
		.returning("id");

	await db("book_genres").where({ bookId }).del();

	for await (const genre of genres?.split(";") || []) {
		if (genre.trim().length === 0) continue;

		await registerBookGenre({ bookId, genre, db });
	}
}
