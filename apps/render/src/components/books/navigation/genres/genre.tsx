import Button from "src/library/button";
import Checkbox from "src/library/input/checkbox";
import { useBooksStore } from "src/store/books";

import styles from "./genre.module.scss";

interface IProps {
  genre: IBookGenre;
}

function CategoryOption(props: IProps) {
  const { genre } = props;
  const { slug, label } = genre;
  const activeGenres = useBooksStore((state) => state.genres);
  const isActive = activeGenres.includes(slug);

  const onToggleGenre = (activeGenre: string) => {
    useBooksStore.getState().toggleActiveGenre(activeGenre);
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

export default CategoryOption;
