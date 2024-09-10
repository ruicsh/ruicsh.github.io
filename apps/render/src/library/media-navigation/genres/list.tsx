import { useRef, type MouseEvent } from "react";
import { useClickOutside } from "src/hooks/use-click-outside";
import type { IGenre } from "src/library/media-navigation/types.d";

import { Genre } from "./item";

type IProps = {
	activeGenres: string[];
	genres: IGenre[];
	onTogglePopup: (event?: MouseEvent) => void;
	onToggleGenre: (activeGenre: string) => void;
};

export function GenresList(props: IProps) {
	const { activeGenres, genres, onTogglePopup, onToggleGenre } = props;

	const popupRef = useRef<HTMLUListElement>(null);

	useClickOutside({ elementRef: popupRef, onClickOutside: onTogglePopup });

	return (
		<ul
			className="absolute top-full z-10 w-[180px] border border-stone-300 bg-stone-100 shadow-lg"
			ref={popupRef}
			onMouseLeave={onTogglePopup}
		>
			{genres.map((genre) => (
				<Genre
					key={`nav-genre-option-${genre.slug}`}
					activeGenres={activeGenres}
					genre={genre}
					onToggleGenre={onToggleGenre}
				/>
			))}
		</ul>
	);
}
