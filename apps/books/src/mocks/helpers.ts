import fs from "node:fs/promises";

import { HttpResponse, HttpResponseInit } from "msw";

export async function replyWithFile(filename: string, init?: HttpResponseInit) {
  const content = await fs.readFile(filename);
  return new HttpResponse(content, init);
}
