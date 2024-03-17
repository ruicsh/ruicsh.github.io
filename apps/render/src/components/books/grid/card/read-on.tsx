import { StarRating } from "src/library/star-rating";

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
			<p className="text-[.7rem] font-bold text-stone-600">
				Read on {df.format(new Date(readOnDate))}
			</p>
			<StarRating id="start-rating" value={rating} />
		</>
	);
}
