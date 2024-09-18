import { fetch } from "@ruicsh/helpers";
import type { CheerioAPI } from "cheerio";

type IFetchBookArgs = {
	url: string;
};

class AbebooksScraper {
	async fetchBookPage(args: IFetchBookArgs) {
		const { url } = args;
		const $ = await fetch.html(url);
		const details = this.getBookDetails($);
		const cover = this.getCover($);

		return { ...details, cover };
	}

	private getBookDetails($: CheerioAPI) {
		const isbn = this.getIsbn($);
		const publisher = this.getPublisher($);

		return { ...isbn, publisher };
	}

	private getIsbn($: CheerioAPI) {
		const isbn10 = $('[data-csa-c-navigate-identifier^="ISBN10"]')
			.text()
			.trim();

		const isbn13 = $("[data-csa-c-navigate-identifier^='ISBN13']")
			.text()
			.trim();

		return { isbn10, isbn13 };
	}

	private getPublisher($: CheerioAPI) {
		const publisherTxt = $("#book-publisher").text().trim();
		const [publisher] = publisherTxt.split(",");

		return publisher.trim();
	}

	private getCover($: CheerioAPI) {
		const imageUrl = $("[itemprop=image]").attr("content");
		if (!imageUrl) {
			return;
		}

		return imageUrl;
	}
}

export default AbebooksScraper;
