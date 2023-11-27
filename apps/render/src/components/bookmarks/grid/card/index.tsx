import { Image } from "src/library/image";

import styles from "./index.module.scss";

interface IProps {
  bookmark: IBookmark;
  order: number;
}

export function Bookmark(props: IProps) {
  const { bookmark } = props;
  const { url, slug, title, host, excerpt, savedOnDate } = bookmark;

  const df = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
  });

  return (
    <a className={styles.root} href={url} target="_blank">
      <div className={styles.left}>
        <Image
          className={styles.screenshot}
          src={`/bookmarks/screenshots/${slug}.jpg`}
          // style={{ backgroundColor: coverColor }}
          alt={title}
        />
        <p className={styles.savedOnDate}>
          Saved on {df.format(new Date(savedOnDate))}
        </p>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.host}>{host}</p>
        <p className={styles.excerpt}>{excerpt}</p>
      </div>
    </a>
  );
}
