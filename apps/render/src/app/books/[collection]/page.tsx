import Books from "src/components/books";
import { getBooks, getCategories, getCollectionMeta } from "src/data/books";

export const metadata = {
  title: "Books: Wishlist | ruicsh",
};

interface IParams {
  collection: IBooksCollection;
}

interface IProps {
  params: IParams;
}

async function BookCollectionPage(props: IProps) {
  const { params } = props;
  const { collection } = params;
  const books = await getBooks({ collection, page: 1 });
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

export async function generateStaticParams() {
  const collections = ["wishlist", "queue", "read"] as IBooksCollection[];

  return collections.map((collection) => ({ collection }));
}

export default BookCollectionPage;
