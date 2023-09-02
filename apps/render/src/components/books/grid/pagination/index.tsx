import Items from "./items";
import Pages from "./pages";

import styles from "./index.module.scss";

interface IProps {
  collection: IBooksCollection;
  numberOfPages: number;
  page: number;
  totalItems: number;
}

function GridPagination(props: IProps) {
  const { collection, numberOfPages, page, totalItems } = props;

  return (
    <nav className={styles.root}>
      <Items page={page} totalItems={totalItems} />
      <Pages
        collection={collection}
        numberOfPages={numberOfPages}
        page={page}
      />
    </nav>
  );
}

export default GridPagination;
