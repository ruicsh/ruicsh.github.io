import got from "got";
import * as cheerio from "cheerio";

export const fetch = {
	html: async (url: string) => {
		const response = await got(url);
		const $ = cheerio.load(response.body);
		return $;
	},
	json: async (url: string) => {
		const response = await got(url, { responseType: "json" });
		return response.body;
	},
};
