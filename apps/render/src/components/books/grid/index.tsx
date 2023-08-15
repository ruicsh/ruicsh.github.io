import Book from "./card";
import styles from "./index.module.scss";

interface IProps {
  books: IBook[];
}

function BooksGrid(props: IProps) {
  const { books = [] } = props;

  return (
    <>
      <ul className={styles.root}>
        {books.map((book, i) => (
          <li key={book.title}>
            <Book book={book} order={i} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default BooksGrid;
