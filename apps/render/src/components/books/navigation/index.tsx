import Collections from "./collections";
import DisplayOptions from "./display-options";
import Categories from "./categories";
import styles from "./index.module.scss";

interface IProps {
  categories: ICategory[];
}

function BooksNavigation(props: IProps) {
  const { categories } = props;

  return (
    <nav className={styles.root}>
      <Collections />
      <DisplayOptions />
      <Categories categories={categories} />
    </nav>
  );
}

export default BooksNavigation;
