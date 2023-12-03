import { Image } from "src/library/image";

import { Popup } from "./popup";
import { QueuedOn } from "./queued-on";
import { ReadOn } from "./read-on";
import { WishedOn } from "./wished-on";

import styles from "./index.module.scss";

type IProps = {
  book: IBook;
  order: number;
};

export function Book(props: IProps) {
  const { book, order } = props;
  const { slug, pageCount, publishedDate, title, authors, coverColor } = book;

  const df = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
  });

  return (
    <article className={styles.root}>
      <div className={styles.coverWrapper}>
        <Image
          src={`/books/covers/${slug}.jpg`}
          style={{ backgroundColor: coverColor }}
          alt={title}
        />
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
