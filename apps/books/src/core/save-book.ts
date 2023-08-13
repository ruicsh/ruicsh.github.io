import { cuid } from "@ruicsh/helpers";
import { cmsdb } from "@ruicsh/services";

export async function saveBook(book: IBookDetails) {
  const bookToSave = {
    ...book,
    id: cuid(),
  };

  await cmsdb("book").insert(bookToSave);
}
