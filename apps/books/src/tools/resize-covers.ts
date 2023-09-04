import path from "node:path";
import { setTimeout } from "node:timers/promises";

import { get } from "@ruicsh/helpers";
import { BunnyCdn, cmsdb, log } from "@ruicsh/services";
import sharp from "sharp";

const bunny = new BunnyCdn();

export async function resizeCovers() {
  const books = await cmsdb("book")
    .select("slug", "cover")
    .whereNotNull("cover")
    .orderBy("slug");

  for await (const book of books) {
    await setTimeout(500);

    const { cover, slug } = book;
    log.info(slug);
    const basename = `${slug}.jpg`;
    const remoteFilePath = path.join("books/covers", basename);

    const remote = await get(cover);
    const src = remote.pipe(sharp());
    const buffer = await src
      .resize({ width: 320 })
      .jpeg({ progressive: true })
      .toBuffer();
    await bunny.put(remoteFilePath, buffer);
  }

  await cmsdb.destroy();
}
