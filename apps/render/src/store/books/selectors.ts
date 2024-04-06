import { createSelector } from "reselect";

import { type IBooksState } from "./types.d";

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

export const selectBooks = createSelector(
	(state: IBooksState) => state.books,
	(state: IBooksState) => state.genres,
	(state: IBooksState) => state.collection,
	(state: IBooksState) => state.isBooksLoading,
	(books, activeGenres, collection, isBooksLoading) => {
		const sortByField = getSortByField(collection) as keyof IBook;

		const filteredBooks = books
			.filter((book) => book.collection === collection)
			.filter((book) => {
				const { genres = [] } = book;
				if (activeGenres.length === 0) {
					return true;
				}

				return genres.some((genre) => activeGenres.includes(genre));
			})
			.sort((a, b) => {
				const aValue = a[sortByField] as string;
				const bValue = b[sortByField] as string;
				return bValue.localeCompare(aValue);
			}) as IBook[];

		const totalItems = filteredBooks.length;

		return {
			books: filteredBooks,
			isBooksLoading,
			totalItems,
		};
	},
);
