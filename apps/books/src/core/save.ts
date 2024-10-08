import { cuid } from "@ruicsh/helpers";
import { cmsdb as db } from "@ruicsh/services";
import slugify from "slugify";

type IRegisterBookGenreArgs = {
	bookId: string;
	genre: string;
};

async function registerBookGenre(args: IRegisterBookGenreArgs) {
	const { bookId, genre } = args;
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

export async function saveBook(book: IBookToSave) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { genres, isbn, ...restOfBook } = book;
	const bookToSave = { ...restOfBook, id: book.id || cuid() };

	const [{ id: bookId }] = await db("book")
		.insert(bookToSave)
		.onConflict("sourceUrl")
		.merge()
		.returning("id");

	await db("book_genres").where({ bookId }).del();

	for await (const genre of genres?.split(";") || []) {
		if (genre.trim().length === 0) {
			continue;
		}

		await registerBookGenre({ bookId, genre });
	}
}
