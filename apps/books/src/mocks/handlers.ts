import fs from "node:fs";
import path from "node:path";

import { rest } from "msw";

export const handlers = [
  rest.get(/www\.amazon\.co\.uk/, async (req, res, ctx) => {
    const filePath = path.join(__dirname, "__data__/amazon-book.html");
    const html = await fs.promises.readFile(filePath, "utf8");

    return res(ctx.status(200), ctx.text(html));
  }),
];
