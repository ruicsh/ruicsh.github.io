import fs from "node:fs";
import path from "node:path";

import { cmsdb } from "@ruicsh/services";

import { pressStaticBooks } from "./books";

async function main() {
  const staticDataDir = path.join(process.cwd(), "/public/static/data");
  if (!fs.existsSync(staticDataDir)) {
    fs.mkdirSync(staticDataDir);
  }

  await pressStaticBooks({ staticDataDir, cmsdb });

  await cmsdb.destroy();
}

main();
