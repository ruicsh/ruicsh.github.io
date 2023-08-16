import { type IncomingMessage } from "node:http";
import https from "node:https";
import path from "node:path";

import { BunnyCdn } from "@ruicsh/services";
import sharp from "sharp";

const bunny = new BunnyCdn();

async function get(url: string): Promise<IncomingMessage> {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve(res);
    });
  });
}

export async function resizeCover(book: Partial<IBookDetails>) {
  const { cover, slug } = book;
  if (!cover || !slug) return null;

  const basename = `${slug}.jpg`;
  const remoteFilePath = path.join("books/covers", basename);

  const response = await fetch(cover);
  if (!response?.body) {
    throw new Error(`Can't find ${cover}`);
  }

  const remote = await get(cover);
  const src = remote.pipe(sharp());
  const buffer = await src.resize({ width: 640 }).toBuffer();
  await bunny.put(remoteFilePath, buffer);

  return basename;
}
