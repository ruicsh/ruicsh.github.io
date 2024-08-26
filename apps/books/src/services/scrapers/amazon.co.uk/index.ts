import vm from "node:vm";

import { fetch } from "@ruicsh/helpers";
import type { CheerioAPI } from "cheerio";

type IPageMediaData = {
	audibleData: undefined;
	data: {
		imageGalleryData: {
			mainUrl: string;
		}[];
	};
};

type IPageImageBlock = {
	data: {
		colorImages: {
			initial: [
				{
					hiRes: string;
					variant: string;
				},
			];
		};
	};
};

type IFetchBookArgs = {
	url: string;
};

class AmazonScraper {
	async fetchBookPage(args: IFetchBookArgs) {
		const { url } = args;
		const $ = await fetch.html(url);
		const details = this.#getBookDetails($);
		const cover = this.#getCover($);

		return { ...details, cover };
	}

	#getCover($: CheerioAPI) {
		const fromImageBlock = this.#getCoverFromImageBlock($);
		const fromImageGallery = this.#getCoverFromImageGalleryData($);

		return fromImageBlock || fromImageGallery;
	}

	#getCoverFromImageBlock($: CheerioAPI) {
		const script = $("script:contains('ImageBlockATF')").html();

		const lines = script?.split("\n") ?? [];
		const startIndex = lines.findIndex((line) => /var data/i.test(line));
		const endIndex = lines.findIndex((line) =>
			/dp60InLastPositionUnrolledImageBlock/.test(line),
		);

		const src = lines.slice(startIndex, endIndex).join("\n");
		try {
			const code = new vm.Script(`${src}}`);

			const sandbox = {};
			vm.createContext(sandbox);
			code.runInContext(sandbox);
			const { data } = sandbox as IPageImageBlock;
			const { colorImages } = data;
			const main = colorImages.initial.find((i) => i.variant === "MAIN");

			return main?.hiRes;
		} catch {
			return;
		}
	}

	#getCoverFromImageGalleryData($: CheerioAPI) {
		const script = $("script:contains('imageGalleryData')").html();

		const lines = script?.split("\n") ?? [];
		const startIndex = lines.findIndex((line) => /var data/i.test(line));
		const endIndex = lines.findIndex((line) => /return data/i.test(line));
		const src = lines.slice(startIndex, endIndex).join("\n");

		try {
			const code = new vm.Script(src);
			const sandbox = { audibleData: undefined };
			vm.createContext(sandbox);
			code.runInContext(sandbox);
			const { data } = sandbox as IPageMediaData;
			const [imageGalleryData] = data?.imageGalleryData || [];

			return imageGalleryData?.mainUrl;
		} catch {
			return;
		}
	}

	#getBookDetails($: CheerioAPI) {
		const info = $("#rich_product_information [role='listitem']").toArray();

		const details = {} as IScrapedBookDetails;
		for (const item of info) {
			const $item = $(item);
			const label = $item.find(".rpi-attribute-label span").text().trim();
			const value = $item.find(".rpi-attribute-value span").text().trim();

			if (/Publisher/.test(label)) {
				details.publisher = value;
			}

			if (/Print length/.test(label)) {
				const [, pageCount] = /(\d+)/.exec(value) ?? [];
				details.pageCount = Number(pageCount);
			}

			if (/Publication date/.test(label)) {
				const publishedDate = new Date(value);
				details.publishedDate = publishedDate.toISOString().slice(0, 10);
			}

			if (/ISBN-10/.test(label)) {
				details.isbn10 = value;
			}

			if (/ISBN-13/.test(label)) {
				details.isbn13 = value.replaceAll(/\D/g, "");
			}
		}

		return details;
	}
}

export default AmazonScraper;
