export interface IBooksState {
  isBooksLoading: boolean;
  books: IBook[];
  fetchBooks: () => Promise<void>;

  collection: IBooksCollection;
  setCollection: (collection: IBooksCollection) => void;

  displayMode: IDisplayMode;
  setDisplayMode: (displayMode?: IDisplayMode) => void;

  page: number;
  setPage: (page: number) => void;

  activeGenres: string[];
  toggleActiveGenre: (activeGenre: string) => void;
}

export type IPersistedBooksState = Pick<
  IBooksState,
  "activeGenres" | "collection" | "displayMode" | "page"
>;
