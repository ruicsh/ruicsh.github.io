import Books from "src/components/books";
import { getBooks, getCategories, getCollectionMeta } from "src/data/books";

export const metadata = {
  title: "Books: Wishlist | ruicsh",
};

interface IParams {
  slug: [IBooksCollection, "page", number];
}

interface IProps {
  params: IParams;
}

async function BooksCollectionPage(props: IProps) {
  const { params } = props;
  const [collection = "queue", , pageString] = params.slug || [];
  const page = Number(pageString || 1);
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
      page={page}
      totalItems={totalItems}
    />
  );
}

export async function generateStaticParams() {
  const collections = ["wishlist", "queue", "read"] as IBooksCollection[];

  const params = [] as IParams[];
  for await (const collection of collections) {
    const { numberOfPages } = await getCollectionMeta({ collection });

    new Array(numberOfPages).forEach((_, index) => {
      params.push({ slug: [collection, "page", index + 1] });
    });
  }

  return params;
}

export default BooksCollectionPage;
