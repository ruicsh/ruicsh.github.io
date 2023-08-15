import Collections from "./collections";
import DisplayOptions from "./display-options";
import styles from "./index.module.scss";

interface IProps {
  display?: string;
  onChangeDisplay: (newDisplay?: string) => void;
}

function BooksNavigation(props: IProps) {
  const { display, onChangeDisplay } = props;

  return (
    <nav className={styles.root}>
      <Collections display={display} />
      <DisplayOptions onChange={onChangeDisplay} />
    </nav>
  );
}

export default BooksNavigation;
