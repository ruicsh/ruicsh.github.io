import path from "node:path";

import { BunnyCdn } from "@ruicsh/services";
import { type Sharp } from "sharp";

const bunny = new BunnyCdn();

export async function resizeCover(
  bookDetails: Partial<IBookDetails>,
  src: Sharp
) {
  const { cover, slug } = bookDetails;
  if (!cover || !slug) return null;

  const basename = `${slug}.jpg`;
  const remoteFilePath = path.join("books/covers", basename);

  const buffer = await src
    .resize({ width: 640 })
    .jpeg({ progressive: true })
    .toBuffer();
  await bunny.put(remoteFilePath, buffer);

  return basename;
}
