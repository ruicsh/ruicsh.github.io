import { StarRating } from "src/library/star-rating";

type IProps = {
	film: IFilm;
};

export function WatchedOn(props: IProps) {
	const { film } = props;
	const { watchedOnDate, rating } = film;
	if (!watchedOnDate) {
		return;
	}

	const df = new Intl.DateTimeFormat("en-GB", {
		dateStyle: "medium",
	});

	return (
		<>
			<p className="text-[.7rem] text-stone-600">
				Watched on {df.format(new Date(watchedOnDate))}
			</p>
			<StarRating id="start-rating" value={rating} />
		</>
	);
}
