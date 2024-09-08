import { useRef, type MouseEvent } from "react";
import { useClickOutside } from "src/hooks/use-click-outside";

import { Genre } from "./item";

type IProps = {
	genres: IBookGenre[];
	onTogglePopup: (event?: MouseEvent) => void;
};

export function GenresList(props: IProps) {
	const { genres, onTogglePopup } = props;

	const popupRef = useRef<HTMLUListElement>(null);

	useClickOutside({ elementRef: popupRef, onClickOutside: onTogglePopup });

	return (
		<ul
			className="absolute top-full z-10 w-[180px] border border-stone-300 bg-stone-100 shadow-lg"
			ref={popupRef}
			onMouseLeave={onTogglePopup}
		>
			{genres.map((genre) => (
				<Genre key={`nav-genre-option-${genre.slug}`} genre={genre} />
			))}
		</ul>
	);
}
