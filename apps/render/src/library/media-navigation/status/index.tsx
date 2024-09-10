"use client";

import { Genre } from "./item";
import type { IGenre } from "../types.d";

type IProps = {
	activeGenres: string[];
	genres: IGenre[];
	onToggleGenre: (activeGenre: string) => void;
};

export function Status(props: IProps) {
	const { activeGenres, genres, onToggleGenre } = props;

	return (
		<div className="flex gap-1">
			{genres
				.filter((genre) => activeGenres.includes(genre.slug))
				.sort((a, b) => a.label.localeCompare(b.label))
				.map((genre) => (
					<Genre
						key={`nav-pillow-${genre.slug}`}
						genre={genre}
						onToggleGenre={onToggleGenre}
					/>
				))}
		</div>
	);
}
