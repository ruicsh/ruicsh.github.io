import fs from "node:fs/promises";
import path from "node:path";

import { cmsdb } from "@ruicsh/services";

import { pressStaticBooks } from "./books";

const staticDataDir = path.join(process.cwd(), "/public/static/data");
const stat = await fs.stat(staticDataDir).catch(() => {});
if (!stat) {
	fs.mkdir(staticDataDir, { recursive: true });
}

await pressStaticBooks({ staticDataDir, cmsdb });

await cmsdb.destroy();
