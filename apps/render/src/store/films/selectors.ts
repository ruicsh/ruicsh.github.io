import { createSelector } from "reselect";

import type { IFilmsState } from "./types";

function getSortByField(collection?: string) {
	switch (collection) {
		case "read": {
			return "readOnDate";
		}
		case "queue": {
			return "queuedOnDate";
		}
		default: {
			return "wishedOnDate";
		}
	}
}

export const selectFilms = createSelector(
	(state: IFilmsState) => state.films,
	(state: IFilmsState) => state.genres,
	(state: IFilmsState) => state.collection,
	(state: IFilmsState) => state.isFilmsLoading,
	(films, activeGenres, collection, isFilmsLoading) => {
		const sortByField = getSortByField(collection) as keyof IFilm;

		const filteredFilms = films
			.filter((film) => film.collection === collection)
			.filter((film) => {
				const { genres = [] } = film;
				if (activeGenres.length === 0) {
					return true;
				}

				return genres.some((genre) => activeGenres.includes(genre));
			})
			.sort((a, b) => {
				const aValue = a[sortByField] as string;
				const bValue = b[sortByField] as string;
				return bValue.localeCompare(aValue);
			}) as IFilm[];

		const totalItems = filteredFilms.length;

		return {
			films: filteredFilms,
			isFilmsLoading,
			totalItems,
		};
	},
);
