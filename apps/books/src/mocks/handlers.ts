import path from "node:path";

import { http } from "msw";

import { replyWithFile } from "./helpers";

export const handlers = [
  http.get(
    "https://raw.githubusercontent.com/ruicsh/ruicsh.github.io/inbox/books.csv",
    () => replyWithFile(path.join(__dirname, "__data__/books.csv"))
  ),

  http.get(/www\.amazon\.co\.uk\/book-1/, () =>
    replyWithFile(path.join(__dirname, "__data__/amazon-book.html"))
  ),

  http.get(/www\.amazon\.co\.uk\/book-2/, () =>
    replyWithFile(path.join(__dirname, "__data__/amazon-book-2.html"))
  ),

  http.get(/www\.hive\.co\.uk/, () =>
    replyWithFile(path.join(__dirname, "__data__/hive-book.html"))
  ),

  http.get(/www\.psbooks\.co\.uk/, () =>
    replyWithFile(path.join(__dirname, "__data__/psbooks-book.html"))
  ),

  http.get(/blackwells\.co\.uk/, () =>
    replyWithFile(path.join(__dirname, "__data__/blackwells-book.html"))
  ),

  http.get(/abebooks\.co\.uk/, () =>
    replyWithFile(path.join(__dirname, "__data__/abebooks-book.html"))
  ),
];
