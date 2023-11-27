import fs from "node:fs/promises";
import path from "node:path";

import { type Knex } from "knex";

import { getBooks } from "src/data/books";

interface IArgs {
  cmsdb: Knex;
  staticDataDir: string;
}

export async function pressStaticBooks(args: IArgs) {
  const { staticDataDir } = args;
  const books = await getBooks();

  const basename = "books.json";
  const filePath = path.join(staticDataDir, basename);
  await fs.writeFile(filePath, JSON.stringify(books));
}
