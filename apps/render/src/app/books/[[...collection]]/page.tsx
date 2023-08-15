import Books from "src/components/books";
import { getBooks } from "src/data/books";

export const metadata = {
  title: "Books: Wishlist | ruicsh",
};

interface IProps {
  params: { collection: IBooksCollection[] };
}

async function BooksCollectionPage(props: IProps) {
  const { params } = props;
  const [collection] = params.collection || [];
  const books = await getBooks({ collection });

  return <Books books={books} collection={collection} />;
}

export function generateStaticParams() {
  return ["", "wishlist", "queue", "read"].map((collection) => ({
    collection: [collection],
  }));
}

export default BooksCollectionPage;
