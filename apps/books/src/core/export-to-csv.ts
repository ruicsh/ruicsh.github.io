import fs from "node:fs";

import { cmsdb, log } from "@ruicsh/services";

async function getCsvHeader() {
  const row = await cmsdb("book").select().limit(1).first();
  return Object.keys(row).join(",");
}

export async function exportToCsv() {
  log.info("Exporting to CSV...");

  const csv = fs.createWriteStream("shared/books.csv");
  csv.write(`${await getCsvHeader()}\n`);

  const stream = cmsdb("book").select().stream();
  for await (const data of stream) {
    const row = Object.values(data)
      .map((value) =>
        typeof value === "string" ? `"${value.replaceAll(/"/g, "“")}"` : value
      )
      .join(",");
    csv.write(`${row}\n`);
  }

  csv.close();
}
