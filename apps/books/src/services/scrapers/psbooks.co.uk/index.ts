import fletch from "@tuplo/fletcher";
import $, { type AnyNode, type Cheerio } from "cheerio";

type IFetchBookArgs = {
	url: string;
};

class PostscriptScraper {
	async fetchBookPage(args: IFetchBookArgs) {
		const { url } = args;
		const $page = await fletch.html(url);
		const details = this.#getBookDetails($page);
		const cover = this.#getCover($page);

		return { ...details, cover };
	}

	#getBookDetails($page: Cheerio<AnyNode>) {
		const $productInfo = $page.find(".product-information__details");

		const isbn = this.#getIsbn($productInfo);

		const pageCount = this.#getPageCount($productInfo);
		const publisher = this.#getValueForLabel($productInfo, "Publisher");

		return { ...isbn, publisher, pageCount };
	}

	#getPageCount($productInfo: Cheerio<AnyNode>) {
		const txt = this.#getValueForLabel($productInfo, "Pages");
		if (!txt) return undefined;

		const [, pageCount] = /(\d+)pp/.exec(txt) || [];

		return Number(pageCount);
	}

	#getIsbn($productInfo: Cheerio<AnyNode>) {
		const txt = this.#getValueForLabel($productInfo, "ISBN");
		if (!txt) return undefined;

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

	#getValueForLabel($productInfo: Cheerio<AnyNode>, label: string) {
		const rg = new RegExp(label, "i");
		const value = $productInfo
			.find("li")
			.toArray()
			.find((li) => {
				const $li = $(li);
				const labelTxt = $li.find(".label").text().trim();
				return rg.test(labelTxt);
			});
		if (!value) return undefined;

		const $value = $(value);

		return $value.find(".value").text().trim();
	}

	#getCover($page: Cheerio<AnyNode>) {
		const imageUrl = $page.find("[property=og:image]").attr("content");
		if (!imageUrl) return undefined;

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
