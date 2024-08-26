import { fetch } from "@ruicsh/helpers";
import type { Cheerio, CheerioAPI } from "cheerio";
import type { Element } from "domhandler";

type IFetchBookArgs = {
	url: string;
};

class PostscriptScraper {
	async fetchBookPage(args: IFetchBookArgs) {
		const { url } = args;
		const $ = await fetch.html(url);
		const details = this.#getBookDetails($);
		const cover = this.#getCover($);

		return { ...details, cover };
	}

	#getBookDetails($: CheerioAPI) {
		const $productInfo = $(".product-information__details");

		const isbn = this.#getIsbn($, $productInfo);

		const pageCount = this.#getPageCount($, $productInfo);
		const publisher = this.#getValueForLabel($, $productInfo, "Publisher");

		return { ...isbn, publisher, pageCount };
	}

	#getPageCount($: CheerioAPI, $productInfo: Cheerio<Element>) {
		const txt = this.#getValueForLabel($, $productInfo, "Pages");
		if (!txt) {
			return;
		}

		const [, pageCount] = /(\d+)pp/.exec(txt) || [];

		return Number(pageCount);
	}

	#getIsbn($: CheerioAPI, $productInfo: Cheerio<Element>) {
		const txt = this.#getValueForLabel($, $productInfo, "ISBN");
		if (!txt) {
			return;
		}

		let isbn10;
		let isbn13;
		if (txt.length === 13) {
			isbn13 = txt;
		}
		if (txt.length === 10) {
			isbn10 = txt;
		}

		return { isbn10, isbn13 };
	}

	#getValueForLabel(
		$: CheerioAPI,
		$productInfo: Cheerio<Element>,
		label: string,
	) {
		const rg = new RegExp(label, "i");
		const value = $productInfo
			.find("li")
			.toArray()
			.find((li) => {
				const $li = $(li);
				const labelTxt = $li.find(".label").text().trim();
				return rg.test(labelTxt);
			});
		if (!value) {
			return;
		}

		const $value = $(value);

		return $value.find(".value").text().trim();
	}

	#getCover($: CheerioAPI) {
		const imageUrl = $("[property=og:image]").attr("content");
		if (!imageUrl) {
			return;
		}

		const url = new URL(imageUrl);
		const sp = new URLSearchParams({
			quality: "80",
			fit: "",
			bounds: "",
			height: "",
			width: "",
		});
		url.search = sp.toString();

		return url.href;
	}
}

export default PostscriptScraper;
