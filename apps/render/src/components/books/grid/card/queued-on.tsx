import styles from "./index.module.scss";

type IProps = {
	book: IBook;
};

export function QueuedOn(props: IProps) {
	const { book } = props;
	const { readOnDate, queuedOnDate } = book;
	if (readOnDate || !queuedOnDate) return null;

	const df = new Intl.DateTimeFormat("en-GB", {
		dateStyle: "medium",
	});

	return (
		<>
			<p className={styles.date}>
				Queued on {df.format(new Date(queuedOnDate))}
			</p>
		</>
	);
}
