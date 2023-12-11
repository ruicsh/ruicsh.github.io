import styles from "./index.module.scss";

type IProps = {
	book: IBook;
};

export function WishedOn(props: IProps) {
	const { book } = props;
	const { readOnDate, queuedOnDate, wishedOnDate } = book;
	if (readOnDate || queuedOnDate || !wishedOnDate) return null;

	const df = new Intl.DateTimeFormat("en-GB", {
		dateStyle: "medium",
	});

	return (
		<>
			<p className={styles.date}>
				Wished on {df.format(new Date(wishedOnDate))}
			</p>
		</>
	);
}
