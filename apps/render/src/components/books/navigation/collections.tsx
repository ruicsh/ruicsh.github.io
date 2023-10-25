import { Button } from "src/library/button";
import { useBooksStore, useDispatch } from "src/store/books";

import styles from "./collections.module.scss";

export function Collections() {
  const activeCollection = useBooksStore((state) => state.collection);
  const dispatch = useDispatch();

  const onClickOption = (collection: IBooksCollection) => () => {
    dispatch({ type: "SET_COLLECTION", payload: { collection } });
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
            onClick={onClickOption(value as IBooksCollection)}
            isActive={value === activeCollection}
          >
            {label}
          </Button>
        </li>
      ))}
    </ul>
  );
}
