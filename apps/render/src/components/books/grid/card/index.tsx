import Image from "src/library/image";

import QueuedOn from "./queued-on";
import ReadOn from "./read-on";
import WishedOn from "./wished-on";
import Popup from "./popup";

import styles from "./index.module.scss";

interface IProps {
  book: IBook;
  order: number;
}

function Book(props: IProps) {
  const { book, order } = props;
  const { cover, pageCount, publishedDate, title, authors } = book;

  const df = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
  });

  return (
    <article className={styles.root}>
      <div className={styles.coverWrapper}>
        <Image src={cover} alt="foobar" />
      </div>
      <div className={styles.metadata}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.authors}>{authors}</p>
        <p className={styles.meta}>
          {[
            publishedDate && df.format(new Date(publishedDate)),
            pageCount && `${pageCount} pages`,
          ].join(", ")}
        </p>
        <ReadOn book={book} />
        <QueuedOn book={book} />
        <WishedOn book={book} />
      </div>
      <Popup book={book} order={order} />
    </article>
  );
}

export default Book;
