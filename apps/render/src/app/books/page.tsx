import Books from "src/components/books";
import { getBooks } from "src/data/books";

async function BooksPage() {
  const books = await getBooks();

  return <Books books={books} />;
}

export default BooksPage;
