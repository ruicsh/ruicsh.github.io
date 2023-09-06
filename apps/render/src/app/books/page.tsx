import Books from "src/components/books";
import { getBooks, getGenres, getCollectionMeta } from "src/data/books";

export const metadata = {
  title: "Books: Wishlist | ruicsh",
};

async function BooksPage() {
  const collection = "queue";
  const page = 1;
  const books = await getBooks({ collection, page });
  const meta = await getCollectionMeta({ collection });
  const { numberOfPages, totalItems } = meta;
  const genres = await getGenres();

  return (
    <Books
      books={books}
      genres={genres}
      collection={collection}
      numberOfPages={numberOfPages}
      totalItems={totalItems}
    />
  );
}

export default BooksPage;
