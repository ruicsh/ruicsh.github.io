import Items from "./items";
import Pages from "./pages";

import styles from "./index.module.scss";

interface IProps {
  numberOfPages: number;
  page: number;
  totalItems: number;
}

function GridPagination(props: IProps) {
  const { numberOfPages, page, totalItems } = props;

  return (
    <nav className={styles.root}>
      <Items page={page} totalItems={totalItems} />
      <Pages numberOfPages={numberOfPages} page={page} />
    </nav>
  );
}

export default GridPagination;