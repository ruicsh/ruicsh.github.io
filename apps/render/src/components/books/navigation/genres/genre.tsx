import { Button } from "src/library/button";
import { Checkbox } from "src/library/input/checkbox";
import { useBooksStore, useDispatch } from "src/store/books";

import styles from "./genre.module.scss";

type IProps = {
  genre: IBookGenre;
};

export function Genre(props: IProps) {
  const { genre } = props;
  const { slug, label } = genre;
  const activeGenres = useBooksStore((state) => state.genres);
  const isActive = activeGenres.includes(slug);
  const dispatch = useDispatch();

  const onToggleGenre = (activeGenre: string) => {
    dispatch({ type: "TOGGLE_GENRE", payload: { genre: activeGenre } });
  };

  return (
    <li className={styles.root}>
      <Button
        className={styles.button}
        onClick={() => onToggleGenre(slug)}
        isActive={isActive}
      >
        <Checkbox checked={isActive} />
        <span>{label}</span>
      </Button>
    </li>
  );
}
