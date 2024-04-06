import fletch from "@tuplo/fletcher";
import { type AnyNode, type Cheerio } from "cheerio";

type IFetchBookArgs = {
	url: string;
};

class AbebooksScraper {
	async fetchBookPage(args: IFetchBookArgs) {
		const { url } = args;
		const $page = await fletch.html(url);
		const details = this.#getBookDetails($page);
		const cover = this.#getCover($page);

		return { ...details, cover };
	}

	#getBookDetails($page: Cheerio<AnyNode>) {
		const isbn = this.#getIsbn($page);
		const publisher = this.#getPublisher($page);

		return { ...isbn, publisher };
	}

	#getIsbn($page: Cheerio<AnyNode>) {
		const isbn10 = $page
			.find('[data-csa-c-navigate-identifier^="ISBN10"]')
			.text()
			.trim();

		const isbn13 = $page
			.find("[data-csa-c-navigate-identifier^='ISBN13']")
			.text()
			.trim();

		return { isbn10, isbn13 };
	}

	#getPublisher($page: Cheerio<AnyNode>) {
		const publisherTxt = $page.find("#book-publisher").text().trim();
		const [publisher] = publisherTxt.split(",");

		return publisher.trim();
	}

	#getCover($page: Cheerio<AnyNode>) {
		const imageUrl = $page.find("[itemprop=image]").attr("content");
		if (!imageUrl) {
			return;
		}

		return imageUrl;
	}
}

export default AbebooksScraper;
