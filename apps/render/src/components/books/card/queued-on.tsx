type IProps = {
	book: IBook;
};

export function QueuedOn(props: IProps) {
	const { book } = props;
	const { readOnDate, queuedOnDate } = book;

	if (readOnDate || !queuedOnDate) {
		return;
	}

	const df = new Intl.DateTimeFormat("en-GB", {
		dateStyle: "medium",
	});

	return (
		<p className="text-[.7rem] text-stone-600">
			Queued on {df.format(new Date(queuedOnDate))}
		</p>
	);
}
