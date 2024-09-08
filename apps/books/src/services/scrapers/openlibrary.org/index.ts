import { fetch } from "@ruicsh/helpers";

type IFetchBookArgs = {
	url: string;
};

class OpenLibraryScraper {
	async fetchBookPage(args: IFetchBookArgs) {
		const [, bookId] = new URL(args.url).pathname
			.split("/")
			.slice(0, -1)
			.filter(Boolean);

		const uri = new URL(`https://openlibrary.org`);
		uri.pathname = `/works/${bookId}.json`;
		const data = await fetch.json(uri.href);

		const {
			covers = [],
			isbn_10 = [],
			publish_date,
			publishers = [],
		} = data as Record<string, string | string[]>;

		const isbn10 = isbn_10[0];
		const publisher = [...publishers].join(", ");
		const publishedDate = publish_date as string;
		const details = { isbn10, publishedDate, publisher };

		if (covers.length === 0) {
			return details;
		}

		// https://covers.openlibrary.org/b/id/14429611-L.jpg
		const coverUri = new URL(`https://covers.openlibrary.org`);
		coverUri.pathname = `/b/id/${covers[0]}-L.jpg`;
		const cover = coverUri.href;

		return { ...details, cover };
	}
}

export default OpenLibraryScraper;
