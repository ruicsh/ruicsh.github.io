import { type IAction, type IBooksState } from "./types";

export function reducer(state: IBooksState, action: IAction) {
	const { type, payload } = action;

	switch (type) {
		case "SET_COLLECTION": {
			const { collection } = payload;
			return { ...state, collection, page: 1 };
		}

		case "SET_BOOKS": {
			const { books } = payload;
			return { ...state, books, isBooksLoading: false };
		}

		case "TOGGLE_GENRE": {
			const genre = payload.genre.toLowerCase();

			const genres = Array.from(state.genres);
			const index = genres.indexOf(genre);
			if (index > -1) {
				genres.splice(index, 1);
			} else {
				genres.push(genre);
			}

			return { ...state, genres };
		}

		default: {
			return state;
		}
	}
}
