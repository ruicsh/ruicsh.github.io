import Book from "src/components/books/card";

import styles from "./index.module.scss";

interface IProps {
  books: IBook[];
}

function BooksList(props: IProps) {
  const { books = [] } = props;

  return (
    <ul className={styles.root}>
      {books.map((book) => (
        <li key={book.title}>
          <Book book={book} />
        </li>
      ))}
    </ul>
  );
}

export default BooksList;
