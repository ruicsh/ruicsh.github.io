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
		<p className="text-[.7rem] font-bold text-stone-600">
			Wished on {df.format(new Date(wishedOnDate))}
		</p>
	);
}
