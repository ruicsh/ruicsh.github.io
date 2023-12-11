import { StarRating } from "src/library/star-rating";

import styles from "./index.module.scss";

type IProps = {
	book: IBook;
};

export function ReadOn(props: IProps) {
	const { book } = props;
	const { readOnDate, rating } = book;
	if (!readOnDate) {
		return null;
	}

	const df = new Intl.DateTimeFormat("en-GB", {
		dateStyle: "medium",
	});

	return (
		<>
			<p className={styles.date}>Read on {df.format(new Date(readOnDate))}</p>
			<StarRating
				className={styles.starRating}
				id="start-rating"
				value={rating}
			/>
		</>
	);
}
