import { Bookmark } from "./card";

import styles from "./index.module.scss";

interface IProps {
  bookmarks: IBookmark[];
}

export function BookmarksGrid(props: IProps) {
  const { bookmarks = [] } = props;

  return (
    <ul className={styles.list}>
      {bookmarks.map((bk, i) => (
        <li key={bk.slug}>
          <Bookmark bookmark={bk} order={i} />
        </li>
      ))}
    </ul>
  );
}
