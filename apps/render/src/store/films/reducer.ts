import type { IAction, IFilmsState } from "./types";

export function reducer(state: IFilmsState, action: IAction) {
	const { type, payload } = action;

	switch (type) {
		case "SET_COLLECTION": {
			const { collection } = payload;
			return { ...state, collection, page: 1 };
		}

		case "SET_FILMS": {
			const { films } = payload;
			return { ...state, films, isFilmsLoading: false };
		}

		case "TOGGLE_GENRE": {
			const genre = payload.genre.toLowerCase();

			const genres = [...state.genres];
			const index = genres.indexOf(genre);
			if (index === -1) {
				genres.push(genre);
			} else {
				genres.splice(index, 1);
			}

			return { ...state, genres };
		}

		default: {
			return state;
		}
	}
}
