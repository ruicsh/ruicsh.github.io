/* eslint-disable unicorn/prefer-top-level-await */
import { cmsdbSchema } from "@ruicsh/cmsdb-schema";
import { cmsdb, log } from "@ruicsh/services";

import { getFilmDetails } from "./core/details";
import { getFilmsFromInbox } from "./core/inbox";
import { saveFilm } from "./core/save";

async function main() {
	await cmsdbSchema.initialize();

	const films = await getFilmsFromInbox();
	for await (const filmInInbox of films) {
		const filmDetails = await getFilmDetails({ film: filmInInbox });
		if (!filmDetails?.title) {
			log.info("... failed.");
			continue;
		}

		await saveFilm({ film: filmDetails });
	}

	await cmsdb.destroy();

	log.info("Done.");
}

main();
