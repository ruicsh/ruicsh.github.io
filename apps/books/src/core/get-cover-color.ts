import sharp from "sharp";

import { get } from "src/helpers/get";
import { rgbToHex } from "src/helpers/rgb-to-hex";

export async function getCoverColor(bookDetails: Partial<IBookDetails>) {
  const { cover } = bookDetails;
  if (!cover) return undefined;

  const remote = await get(cover);
  const { dominant } = await remote.pipe(sharp()).stats();

  return rgbToHex(dominant);
}
