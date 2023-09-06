import Collections from "./collections";
import DisplayOptions from "./display-options";
import Genres from "./genres";
import styles from "./index.module.scss";

interface IProps {
  genres: IBookGenre[];
}

function BooksNavigation(props: IProps) {
  const { genres } = props;

  return (
    <nav className={styles.root}>
      <Collections />
      <DisplayOptions />
      <Genres genres={genres} />
    </nav>
  );
}

export default BooksNavigation;
