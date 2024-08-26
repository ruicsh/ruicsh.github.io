import { fetch } from "@ruicsh/helpers";
import type { Cheerio, CheerioAPI } from "cheerio";
import * as df from "date-fns";
import type { Element } from "domhandler";

type IFetchBookArgs = {
	url: string;
};

class HiveScraper {
	async fetchBookPage(args: IFetchBookArgs) {
		const { url } = args;
		const $ = await fetch.html(url);
		const details = this.#getBookDetails($);
		const cover = this.#getCover($);

		return { ...details, cover };
	}

	#getBookDetails($: CheerioAPI) {
		const $productInfo = $(".productInfoWrapGrid .productInfo");

		const pageCount = this.#getPageCount($productInfo);
		const publisher = this.#getPublisher($productInfo);
		const publishedDate = this.#getPublishedDate($productInfo);
		const isbn = this.#getIsbn($productInfo);

		return { pageCount: Number(pageCount), publisher, publishedDate, ...isbn };
	}

	#getPageCount($productInfo: Cheerio<Element>) {
		const txt = $productInfo.find("[itemProp=numberOfPages]").text();
		const [, pageCount] = /(\d+) pages/.exec(txt) || [];

		return Number(pageCount);
	}

	#getPublisher($productInfo: Cheerio<Element>) {
		return $productInfo.find("[itemProp=publisher]").text().trim();
	}

	#getPublishedDate($productInfo: Cheerio<Element>) {
		const txt = $productInfo.find("[itemProp=datePublished]").text();
		const date = df.parse(txt, "dd/MM/yyyy", new Date());

		return date.toISOString().slice(0, 10);
	}

	#getIsbn($productInfo: Cheerio<Element>) {
		let isbn10;
		let isbn13;
		const txt = $productInfo.find("[itemProp=isbn]").text().trim();
		if (txt.length === 13) {
			isbn13 = txt;
		}
		if (txt.length === 10) {
			isbn10 = txt;
		}

		return { isbn10, isbn13 };
	}

	#getCover($: CheerioAPI) {
		const imageUrl = $("[name=twitter:image]").attr("content");
		if (!imageUrl) {
			return;
		}

		const url = new URL(imageUrl);
		const parts = url.pathname.split("/");
		parts[2] = "640";
		url.pathname = parts.join("/");

		return url.href;
	}
}

export default HiveScraper;
