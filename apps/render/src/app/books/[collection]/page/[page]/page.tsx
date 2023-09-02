import Books from "src/components/books";
import { getBooks, getCategories, getCollectionMeta } from "src/data/books";

export const metadata = {
  title: "Books: Wishlist | ruicsh",
};

interface IParams {
  collection: IBooksCollection;
  page: string;
}

interface IProps {
  params: IParams;
}

async function BookCollectionPagedPage(props: IProps) {
  const { params } = props;
  const { collection } = params;
  const page = Number(params.page || 1);
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

    new Array(numberOfPages).fill(null).forEach((_, index) => {
      params.push({ collection, page: `${index + 1}` });
    });
  }

  return params;
}

export default BookCollectionPagedPage;
