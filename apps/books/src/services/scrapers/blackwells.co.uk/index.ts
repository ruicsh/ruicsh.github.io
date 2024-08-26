import { fetch } from "@ruicsh/helpers";
import type { Cheerio, CheerioAPI } from "cheerio";
import * as df from "date-fns";
import type { Element } from "domhandler";

type IFetchBookArgs = {
	url: string;
};

class BlackwellsScraper {
	async fetchBookPage(args: IFetchBookArgs) {
		const { url } = args;
		const $ = await fetch.html(url);
		const details = this.#getBookDetails($);
		const cover = this.#getCover(details.isbn13 || details.isbn10 || "");

		return { ...details, cover };
	}

	#getBookDetails($: CheerioAPI) {
		const $productInfo = $(".product-detail");

		const isbn = this.#getIsbn($productInfo);
		const pageCount = this.#getPageCount($productInfo);
		const publisher = this.#getPublisher($productInfo);
		const publishedDate = this.#getPublishedDate($productInfo);

		return { ...isbn, pageCount, publisher, publishedDate };
	}

	#getPageCount($productInfo: Cheerio<Element>) {
		const txt = $productInfo.find("[itemprop=numberOfPages]").text().trim();
		if (!txt) {
			return;
		}

		return Number(txt);
	}

	#getPublisher($productInfo: Cheerio<Element>) {
		const txt = $productInfo.find("[itemprop=publisher]").text().trim();
		if (!txt) {
			return;
		}

		return txt;
	}

	#getPublishedDate($productInfo: Cheerio<Element>) {
		const txt = $productInfo.find("[itemProp=datePublished]").text();
		const date = df.parse(txt, "dd MMM yyyy", new Date());

		return date.toISOString().slice(0, 10);
	}

	#getIsbn($productInfo: Cheerio<Element>) {
		let isbn10;
		let isbn13;
		const txt = $productInfo.find("[itemprop=isbn]").text().trim();
		if (txt.length === 13) {
			isbn13 = txt;
		}
		if (txt.length === 10) {
			isbn10 = txt;
		}

		return { isbn10, isbn13 };
	}

	#getCover(isbn: string) {
		const url = new URL("https://blackwells.co.uk");
		url.pathname = `/jacket/500x500/${isbn}.webp`;

		return url.href;
	}
}

export default BlackwellsScraper;
