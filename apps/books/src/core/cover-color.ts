import sharp from "sharp";

import { get, rgbToHex } from "@ruicsh/helpers";

export async function getCoverColor(bookDetails: Partial<IBookDetails>) {
	const { cover } = bookDetails;
	if (!cover) {
		return;
	}

	const remote = await get(cover);
	const { dominant } = await remote.pipe(sharp()).stats();

	return rgbToHex(dominant);
}
