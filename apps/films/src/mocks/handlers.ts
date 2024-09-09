import path from "node:path";

import { replyWithFile } from "@ruicsh/local-dev";
import { http } from "msw";

export const handlers = [
	http.get(
		"https://raw.githubusercontent.com/ruicsh/ruicsh.github.io/inbox/films.csv",
		() => replyWithFile(path.join(import.meta.dirname, "__data__/films.csv")),
	),

	http.get("https://api.themoviedb.org/3/movie/286217", () =>
		replyWithFile(path.join(import.meta.dirname, "__data__/tmdb-movie.json")),
	),
];
