import { type ICellRendererParams } from "ag-grid-community";

import StarRating from "src/library/star-rating";

import styles from "./rating-cell-renderer.module.scss";

interface IProps extends ICellRendererParams {}

function RatingCellRenderer(props: IProps) {
  const { value } = props;

  return <StarRating className={styles.root} id="foobar" value={value} />;
}

export default RatingCellRenderer;
