import Collections from "./collections";
import DisplayOptions from "./display-options";
import styles from "./index.module.scss";

interface IProps {
  onChangeDisplay: (newDisplay: string) => void;
}

function BooksNavigation(props: IProps) {
  const { onChangeDisplay } = props;

  return (
    <nav className={styles.root}>
      <Collections />
      <DisplayOptions onChange={onChangeDisplay} />
    </nav>
  );
}

export default BooksNavigation;
