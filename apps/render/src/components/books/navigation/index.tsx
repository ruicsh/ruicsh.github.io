import { Collections } from "./collections";
import { DisplayMode } from "./display-mode";
import { Genres } from "./genres";
import { Status } from "./status";

import styles from "./index.module.scss";

interface IProps {
  genres: IBookGenre[];
}

export function Navigation(props: IProps) {
  const { genres } = props;

  return (
    <nav className={styles.root}>
      <Collections />
      <DisplayMode />
      <div className={styles.footer}>
        <Genres genres={genres} />
        <Status genres={genres} />
      </div>
    </nav>
  );
}
