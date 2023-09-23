import { useBooksStore } from "src/store/books";

import Genre from "./genre";

import styles from "./index.module.scss";

interface IProps {
  genres: IBookGenre[];
}

function Status(props: IProps) {
  const { genres } = props;
  const activeGenres = useBooksStore((state) => state.genres);

  return (
    <div className={styles.root}>
      {genres
        .filter((genre) => activeGenres.includes(genre.slug))
        .sort((a, b) => a.label.localeCompare(b.label))
        .map((genre) => (
          <Genre
            key={`nav-pillow-${genre.slug}`}
            className={styles.pillow}
            genre={genre}
          />
        ))}
    </div>
  );
}

export default Status;
