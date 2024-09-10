import type { IFilmsState } from "./types";

// @ts-expect-error foobar
export const initialState: IFilmsState = {
	collection: undefined,
	isFilmsLoading: true,
	films: [],
	genres: [],
};
