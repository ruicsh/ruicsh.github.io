/* eslint-disable unicorn/prefer-top-level-await */
import fs from "node:fs/promises";
import path from "node:path";

import { cmsdb } from "@ruicsh/services";

import { pressStaticBooks } from "./books";
import { pressStaticFilms } from "./films";

async function main() {
	const staticDataDir = path.resolve("public/static/data");
	const stat = await fs.stat(staticDataDir).catch(() => {});
	if (!stat) {
		fs.mkdir(staticDataDir, { recursive: true });
	}

	await pressStaticBooks({ staticDataDir, cmsdb });
	await pressStaticFilms({ staticDataDir, cmsdb });

	await cmsdb.destroy();
}

main();
