import { setTimeout } from "node:timers/promises";

import { get, rgbToHex } from "@ruicsh/helpers";
import { cmsdb, log } from "@ruicsh/services";
import sharp from "sharp";

export async function getCoverColor() {
  const books = await cmsdb("book")
    .select("id", "cover", "slug")
    .whereNotNull("cover")
    .orderBy("slug");

  for await (const book of books) {
    await setTimeout(500);

    const { id, cover, slug } = book;
    log.info(slug);

    const remote = await get(cover);
    const { dominant } = await remote.pipe(sharp()).stats();
    const coverColor = rgbToHex(dominant);

    await cmsdb("book").update({ coverColor }).where({ id });
  }

  await cmsdb.destroy();
}
