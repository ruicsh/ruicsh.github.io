export type IAction =
	| { type: "SET_COLLECTION"; payload: { collection: string } }
	| { type: "SET_FILMS"; payload: { films: IFilm[] } }
	| { type: "TOGGLE_GENRE"; payload: { genre: string } };

export type IFilmsState = {
	films: IFilm[];
	collection?: string;
	dispatch: (action: IAction) => IAction;
	genres: string[];
	isFilmsLoading: boolean;
};

export type IPersistedFilmsState = Pick<IFilmsState, "collection"> & {
	genres?: string[];
};
