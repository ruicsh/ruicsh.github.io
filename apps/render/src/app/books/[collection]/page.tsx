import Books from "src/components/books";
import { getBooks } from "src/data/books";

export const metadata = {
  title: "Books: Wishlist | ruicsh",
};

interface IProps {
  params: { collection: IBooksCollection };
}

async function BooksCollectionPage(props: IProps) {
  const { params } = props;
  const { collection } = params;
  const books = await getBooks({ collection });

  return <Books books={books} />;
}

export function generateStaticParams() {
  return ["all", "wishlist", "queue", "read"].map((collection) => ({
    params: {
      collection,
    },
  }));
}

export default BooksCollectionPage;
