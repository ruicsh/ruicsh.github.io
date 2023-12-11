import { type IBooksState } from "./books.d";

// @ts-expect-error foobar
export const initialState: IBooksState = {
	collection: undefined,
	displayMode: "grid",
	page: 1,
	isBooksLoading: true,
	books: [],
	genres: [],
};
