import fs from "node:fs/promises";
import path from "node:path";

import type { Knex } from "knex";

import { getFilms } from "src/data/films";

type IArgs = {
	cmsdb: Knex;
	staticDataDir: string;
};

export async function pressStaticFilms(args: IArgs) {
	const { staticDataDir } = args;
	const films = await getFilms();

	const basename = "films.json";
	const filePath = path.join(staticDataDir, basename);
	await fs.writeFile(filePath, JSON.stringify(films));
}
