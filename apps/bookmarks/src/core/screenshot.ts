import path from "node:path";
import { Readable } from "node:stream";

import { chromium, devices } from "playwright";
import { BunnyCdn } from "@ruicsh/services";
import sharp from "sharp";

const bunny = new BunnyCdn();

type IArgs = {
  url: string;
  filename: string;
};

export async function takeScreenshot(args: IArgs) {
  const { url, filename } = args;

  const browser = await chromium.launch();
  const context = await browser.newContext({
    ...devices["iPad Mini landscape"],
    locale: "en-GB",
  });

  const page = await context.newPage();
  await page.goto(url);
  const screenshot = await page.screenshot();
  await browser.close();

  const shot = Readable.from(screenshot);
  const src = shot.pipe(sharp());
  const buffer = await src
    .resize({ width: 260 })
    .jpeg({ progressive: true })
    .toBuffer();

  const basename = `${filename}.jpg`;
  const remoteFilePath = path.join("bookmarks/screenshots", basename);
  await bunny.put(remoteFilePath, buffer);

  return filename;
}
