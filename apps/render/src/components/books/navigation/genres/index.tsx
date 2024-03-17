import { useState, type MouseEvent } from "react";

import { Button } from "src/library/button";

import { GenresList } from "./list";

type IProps = {
	genres: IBookGenre[];
};

export function Genres(props: IProps) {
	const { genres } = props;
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const onTogglePopup = (event?: MouseEvent) => {
		event?.preventDefault();

		setIsPopupOpen((oldState) => !oldState);
	};

	return (
		<div className="relative flex">
			<Button
				onClick={onTogglePopup}
				aria-selected={isPopupOpen}
				className="px-2 py-1 text-[.7rem] uppercase hover:bg-neutral-100"
			>
				Genres
			</Button>
			{isPopupOpen && (
				<GenresList genres={genres} onTogglePopup={onTogglePopup} />
			)}
		</div>
	);
}
