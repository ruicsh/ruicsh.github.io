import path from "node:path";
import { setTimeout } from "node:timers/promises";

import config from "../config";

type IReqOptions = {
	searchParams?: Record<string, string>;
};

export class TMDB {
	#baseHref = "https://api.themoviedb.org/3";

	async getMovie(filmId: string) {
		return this._req(`/movie/${filmId}`, {
			searchParams: {
				append_to_response: "credits",
			},
		});
	}

	private async _req(command: string, options?: IReqOptions) {
		const accessToken = config.get("tmdb.accessToken");
		if (!accessToken) {
			throw new Error("TMDB Access Token not set");
		}

		const { searchParams = {} } = options || {};
		const uri = new URL(path.join(this.#baseHref, command));
		const sp = new URLSearchParams(searchParams);
		uri.search = sp.toString();

		await setTimeout(process.env.VITEST_WORKER_ID ? 0 : 1_000);

		const response = await fetch(uri.href, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		if (!response.ok) {
			throw new Error(`Failed to fetch ${uri.href}`);
		}

		return response.json();
	}
}
