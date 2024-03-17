import { useBooksStore } from "src/store/books";

import { Genre } from "./item";

// import styles from "./index.module.scss";

type IProps = {
	genres: IBookGenre[];
};

export function Status(props: IProps) {
	const { genres } = props;

	const activeGenres = useBooksStore((state) => state.genres);

	return (
		<div className="flex gap-1">
			{genres
				.filter((genre) => activeGenres.includes(genre.slug))
				.sort((a, b) => a.label.localeCompare(b.label))
				.map((genre) => (
					<Genre key={`nav-pillow-${genre.slug}`} genre={genre} />
				))}
		</div>
	);
}
