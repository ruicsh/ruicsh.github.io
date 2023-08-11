import BooksList from "src/components/books/list";
import { getBooks } from "src/props/books";

export const metadata = {
  title: "Books: Queue | ruicsh",
};

async function Books() {
  const books = await getBooks({ collection: "queue" });

  return <BooksList books={books} />;
}

export default Books;
