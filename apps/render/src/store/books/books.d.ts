export type IAction =
  | { type: "SET_COLLECTION"; payload: { collection: IBooksCollection } }
  | { type: "SET_DISPLAY_MODE"; payload: { displayMode: IDisplayMode } }
  | { type: "SET_BOOKS"; payload: { books: IBook[] } }
  | { type: "SET_PAGE"; payload: { page: number } }
  | { type: "TOGGLE_GENRE"; payload: { genre: string } };

export interface IBooksState {
  books: IBook[];
  collection?: IBooksCollection;
  dispatch: (action: IAction) => IAction;
  displayMode: IDisplayMode;
  genres: string[];
  isBooksLoading: boolean;
  page: number;
}

export interface IPersistedBooksState
  extends Pick<IBooksState, "collection" | "displayMode" | "page"> {
  genres?: string[];
}
