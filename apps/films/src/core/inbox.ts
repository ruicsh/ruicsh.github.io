/* eslint-disable unicorn/prefer-logical-operator-over-ternary */
import { Readable } from "node:stream";

import { parse } from "csv-parse";

export async function getFilmsFromInbox() {
	const uri = new URL("https://raw.githubusercontent.com");
	uri.pathname = "/ruicsh/ruicsh.github.io/inbox/films.csv";
	const response = await fetch(uri.href);
	if (!response?.body) {
		throw new Error(`Can't find ${uri.href}`);
	}

	// @ts-expect-error needs ReadableStream<any> instead of ReadableStream<Uint8Array>
	const parser = Readable.fromWeb(response.body).pipe(
		parse({ columns: true, delimiter: ",", trim: true }),
	);

	const films = [];
	for await (const film of parser) {
		films.push({
			...film,
			rating: film.rating ? Number(film.rating) : undefined,
		});
	}

	return films as IFilmInInbox[];
}
