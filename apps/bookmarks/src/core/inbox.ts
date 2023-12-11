import { Readable } from "node:stream";

import { parse } from "csv-parse";

export async function getBookmarksFromInbox() {
	const uri = new URL("https://raw.githubusercontent.com");
	uri.pathname = "/ruicsh/ruicsh.github.io/inbox/bookmarks.csv";
	const response = await fetch(uri.href);
	if (!response?.body) {
		throw new Error(`Can't find ${uri.href}`);
	}

	// @ts-expect-error needs ReadableStream<any> instead of ReadableStream<Uint8Array>
	const parser = Readable.fromWeb(response.body).pipe(
		parse({ columns: true, delimiter: ",", trim: true }),
	);

	const bookmarks = [];
	for await (const bookmark of parser) {
		bookmarks.push({
			savedOnDate: bookmark.savedOnDate ? bookmark.savedOnDate : undefined,
			url: bookmark.url ? bookmark.url : undefined,
		});
	}

	return bookmarks as IBookmarksOnInbox[];
}
