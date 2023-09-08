import Loader from "src/library/loader";
import { useBooksStore } from "src/store/books";
import { selectBooks } from "src/store/books/selectors";

import Book from "./card";
import Pagination from "./pagination";

import styles from "./index.module.scss";

function BooksGrid() {
  const page = useBooksStore((state) => state.page);
  const { books, isBooksLoading, numberOfPages, totalItems } =
    useBooksStore(selectBooks);

  if (isBooksLoading) {
    return <Loader className={styles.root} />;
  }

  return (
    <>
      <ul className={styles.list}>
        {books.map((book, i) => (
          <li key={book.title}>
            <Book book={book} order={i} />
          </li>
        ))}
      </ul>
      <Pagination
        numberOfPages={numberOfPages}
        page={page}
        totalItems={totalItems}
      />
    </>
  );
}

export default BooksGrid;
