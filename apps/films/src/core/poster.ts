import path from "node:path";

import { fetch } from "@ruicsh/helpers";
import sharp from "sharp";
import { BunnyCdn } from "@ruicsh/services";

const bunny = new BunnyCdn();

export async function getPoster(slug: string, movie: ITmdbMovieDetails) {
	if (process.env.VITEST_WORKER_ID) {
		return;
	}

	const { poster_path } = movie;
	if (!poster_path) {
		return;
	}

	const uri = new URL("https://image.tmdb.org");
	uri.pathname = path.join("/t/p/w1280", poster_path);

	const remote = await fetch.stream(uri.href);
	const src = remote.pipe(sharp());

	const buffer = await src
		.resize({ width: 640 })
		.jpeg({ progressive: true })
		.toBuffer();

	const basename = `${slug}.jpg`;
	const remoteFilePath = path.join("films/posters", basename);
	await bunny.put(remoteFilePath, buffer);
}
