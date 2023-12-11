import { type ICellRendererParams } from "ag-grid-community";

import { StarRating } from "src/library/star-rating";

import styles from "./rating-cell-renderer.module.scss";

export function RatingCellRenderer(props: ICellRendererParams) {
	const { value } = props;

	return <StarRating className={styles.root} id="foobar" value={value} />;
}
