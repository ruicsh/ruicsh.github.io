import fs from "node:fs";

import { HttpResponse, HttpResponseInit } from "msw";

export function replyWithFile(filename: string, init?: HttpResponseInit) {
  return new HttpResponse(fs.readFileSync(filename), init);
}
