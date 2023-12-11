import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import $ from "cheerio";

export async function getExcerpt(url: string) {
	const html = await fetch(url).then((res) => res.text());
	const doc = new JSDOM(html, { url });
	const reader = new Readability(doc.window.document);
	const article = reader.parse();
	if (!article) {
		return undefined;
	}

	const { content } = article;
	const excerpt = $(content).find(".page p:first-child").text();

	return excerpt;
}
