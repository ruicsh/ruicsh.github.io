import path from "node:path";

import { replyWithFile } from "@ruicsh/helpers";
import { http } from "msw";

export const handlers = [
	http.get(
		"https://raw.githubusercontent.com/ruicsh/ruicsh.github.io/inbox/bookmarks.csv",
		() => replyWithFile(path.join(__dirname, "__data__/bookmarks.csv")),
	),
];
