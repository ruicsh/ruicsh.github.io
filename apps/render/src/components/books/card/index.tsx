import Image from "src/library/image";

import ReadOn from "./read-on";
import styles from "./index.module.scss";

interface IProps {
  book: IBook;
}

function Book(props: IProps) {
  const { book } = props;
  const { cover, pages, title, author } = book;

  return (
    <article className={styles.root}>
      <div className={styles.coverWrapper}>
        <Image src={cover} alt="foobar" />
      </div>
      <div className={styles.metadata}>
        <h1>{title}</h1>
        <p>{author}</p>
        <p>{pages} pages</p>
        <ReadOn book={book} />
      </div>
    </article>
  );
}

export default Book;
