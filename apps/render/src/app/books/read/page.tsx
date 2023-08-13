import BooksList from "src/components/books/list";
import { getBooks } from "src/data/books";

export const metadata = {
  title: "Books: Read | ruicsh",
};

async function Books() {
  const books = await getBooks({ collection: "read" });

  return <BooksList books={books} />;
}

export default Books;
