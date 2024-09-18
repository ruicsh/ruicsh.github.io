/* eslint-disable unicorn/prefer-logical-operator-over-ternary */
import { Readable } from "node:stream";

import { parse } from "csv-parse";

export async function getBooksFromInbox() {
	const uri = new URL("https://raw.githubusercontent.com");
	uri.pathname = "/ruicsh/ruicsh.github.io/inbox/books.csv";
	const response = await fetch(uri.href);
	if (!response?.body) {
		throw new Error(`Can't find ${uri.href}`);
	}

	// @ts-expect-error needs ReadableStream<any> instead of ReadableStream<Uint8Array>
	const parser = Readable.fromWeb(response.body).pipe(
		parse({
			columns: true,
			delimiter: ",",
			trim: true,
			relax_column_count: true,
		}),
	);

	const books = [];
	for await (const book of parser) {
		books.push({
			...book,
			isbn: book.isbn ? book.isbn : undefined,
			queuedOnDate: book.queuedOnDate ? book.queuedOnDate : undefined,
			wishedOnDate: book.wishedOnDate ? book.wishedOnDate : undefined,
			readOnDate: book.readOnDate ? book.readOnDate : undefined,
			rating: book.rating ? Number(book.rating) : undefined,
		});
	}

	return books as IBookInInbox[];
}
