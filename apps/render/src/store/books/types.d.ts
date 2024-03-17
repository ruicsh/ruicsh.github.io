export type IAction =
	| { type: "SET_COLLECTION"; payload: { collection: IBooksCollection } }
	| { type: "SET_BOOKS"; payload: { books: IBook[] } }
	| { type: "TOGGLE_GENRE"; payload: { genre: string } };

export type IBooksState = {
	books: IBook[];
	collection?: IBooksCollection;
	dispatch: (action: IAction) => IAction;
	genres: string[];
	isBooksLoading: boolean;
};

export type IPersistedBooksState = Pick<IBooksState, "collection"> & {
	genres?: string[];
};
