import BooksList from "src/components/books/list";
import { getBooks } from "src/props/books";

async function Books() {
  const books = await getBooks();

  return <BooksList books={books} />;
}

export default Books;
