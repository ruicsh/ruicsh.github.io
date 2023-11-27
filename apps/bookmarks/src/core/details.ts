import { cmsdb, log } from "@ruicsh/services";
import fetchMetadata from "url-metadata";
import slugify from "slugify";

import { takeScreenshot } from "./screenshot";
import { getExcerpt } from "./excerpt";

export async function getBookmarkDetails(bookmarkOnInbox: IBookmarksOnInbox) {
  const { url, savedOnDate } = bookmarkOnInbox;
  const existing = await cmsdb("bookmark").where({ url }).first();
  if (existing) {
    return existing;
  }

  log.info(`Fetching bookmark details from ${url}`);

  const metadata = await fetchMetadata(url);
  const { title } = metadata as unknown as IPageMetadata;
  const slug = slugify(title, { lower: true, strict: true });
  await takeScreenshot({ url, filename: slug });
  const excerpt = await getExcerpt(url);

  const bookmark: IBookmark = {
    excerpt,
    savedOnDate,
    slug,
    title,
    url,
  };

  return bookmark;
}
