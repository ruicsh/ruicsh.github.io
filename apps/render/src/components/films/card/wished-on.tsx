type IProps = {
	film: IFilm;
};

export function WishedOn(props: IProps) {
	const { film } = props;
	const { watchedOnDate, wishedOnDate } = film;
	if (watchedOnDate || !wishedOnDate) {
		return;
	}

	const df = new Intl.DateTimeFormat("en-GB", {
		dateStyle: "medium",
	});

	return (
		<p className="text-[.7rem] font-bold text-stone-600">
			Wished on {df.format(new Date(wishedOnDate))}
		</p>
	);
}
