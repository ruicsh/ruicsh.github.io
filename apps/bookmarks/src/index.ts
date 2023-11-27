import { cmsdbSchema } from "@ruicsh/cmsdb-schema";
import { cmsdb, log } from "@ruicsh/services";

import { getBookmarksFromInbox } from "./core/inbox";
import { getBookmarkDetails } from "./core/details";
import { saveBookmark } from "./core/save";

async function main() {
  await cmsdbSchema.initialize();

  const bookmarks = await getBookmarksFromInbox();
  for await (const bk of bookmarks) {
    const details = await getBookmarkDetails(bk);
    if (!details?.title) {
      log.info("... failed.");
      continue;
    }

    await saveBookmark({ ...details });
  }

  await cmsdb.destroy();

  log.info("Done.");
}

main();
