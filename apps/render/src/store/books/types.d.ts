export type IAction =
	| { type: "SET_COLLECTION"; payload: { collection: string } }
	| { type: "SET_BOOKS"; payload: { books: IBook[] } }
	| { type: "TOGGLE_GENRE"; payload: { genre: string } };

export type IBooksState = {
	books: IBook[];
	collection?: string;
	dispatch: (action: IAction) => IAction;
	genres: string[];
	isBooksLoading: boolean;
};

export type IPersistedBooksState = Pick<IBooksState, "collection"> & {
	genres?: string[];
};
