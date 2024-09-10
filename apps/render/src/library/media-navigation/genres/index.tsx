"use client";

import { useState, type MouseEvent } from "react";

import { Button } from "src/library/button";
import type { IGenre } from "src/library/media-navigation/types.d";

import { GenresList } from "./list";

type IProps = {
	activeGenres: string[];
	genres: IGenre[];
	onToggleGenre: (activeGenre: string) => void;
};

export function Genres(props: IProps) {
	const { activeGenres, genres, onToggleGenre } = props;
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
				className="px-2 py-1 text-[.7rem] uppercase hover:bg-stone-100"
			>
				Genres
			</Button>
			{isPopupOpen && (
				<GenresList
					activeGenres={activeGenres}
					genres={genres}
					onTogglePopup={onTogglePopup}
					onToggleGenre={onToggleGenre}
				/>
			)}
		</div>
	);
}
