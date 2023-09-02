import Books from "src/components/books";
import { getBooks, getCategories, getCollectionMeta } from "src/data/books";

export const metadata = {
  title: "Books: Wishlist | ruicsh",
};

async function BooksPage() {
  const collection = "queue";
  const page = 1;
  const books = await getBooks({ collection, page });
  const meta = await getCollectionMeta({ collection });
  const { numberOfPages, totalItems } = meta;
  const categories = await getCategories();

  return (
    <Books
      books={books}
      categories={categories}
      collection={collection}
      numberOfPages={numberOfPages}
      totalItems={totalItems}
    />
  );
}

export default BooksPage;
