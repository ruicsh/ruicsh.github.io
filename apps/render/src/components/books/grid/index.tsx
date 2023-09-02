import Book from "./card";
import Pagination from "./pagination";

import styles from "./index.module.scss";

interface IProps {
  books: IBook[];
  collection: IBooksCollection;
  numberOfPages: number;
  page: number;
  totalItems: number;
}

function BooksGrid(props: IProps) {
  const { books = [], collection, numberOfPages, page, totalItems } = props;

  return (
    <>
      <ul className={styles.root}>
        {books.map((book, i) => (
          <li key={book.title}>
            <Book book={book} order={i} />
          </li>
        ))}
      </ul>
      <Pagination
        collection={collection}
        numberOfPages={numberOfPages}
        page={page}
        totalItems={totalItems}
      />
    </>
  );
}

export default BooksGrid;
