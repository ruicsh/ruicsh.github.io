import { type IBooksState } from "./types.d";

// @ts-expect-error foobar
export const initialState: IBooksState = {
	collection: undefined,
	isBooksLoading: true,
	books: [],
	genres: [],
};
