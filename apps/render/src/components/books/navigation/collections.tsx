import Button from "src/library/button";
import { useBooksStore } from "src/store/books";

import styles from "./collections.module.scss";

function BookCollections() {
  const activeCollection = useBooksStore((state) => state.collection);

  const onClickOption = (collection: string) => () => {
    useBooksStore.getState().setCollection(collection as IBooksCollection);
  };

  return (
    <ul className={styles.root}>
      {[
        { value: "queue", label: "Queue" },
        { value: "read", label: "Read" },
        { value: "wishlist", label: "Wishlist" },
      ].map(({ value, label }) => (
        <li key={`books-nav-${value}`} className={styles.option}>
          <Button
            className={styles.button}
            onClick={onClickOption(value)}
            isActive={value === activeCollection}
          >
            {label}
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default BookCollections;
