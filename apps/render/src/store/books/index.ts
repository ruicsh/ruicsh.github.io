import { create } from "zustand";

import { type IBooksState } from "./books.d";

export const useBooksStore = create<IBooksState>()((set) => ({
  collection: "queue",
  setCollection: (collection: IBooksCollection) => set({ collection }),

  displayMode: "grid",
  setDisplayMode: (displayMode?: IDisplayMode) => set({ displayMode }),

  page: 1,
  setPage: (page: number) => set({ page }),

  isBooksLoading: true,
  books: [],
  fetchBooks: async () => {
    const response = await fetch("/static/data/books.json");
    const books = await response.json();
    set({ books, isBooksLoading: false });
  },

  activeGenres: [],
  toggleActiveGenre: (activeGenre: string) =>
    set((state) => {
      const genres = Array.from(state.activeGenres);
      const index = genres.indexOf(activeGenre);
      if (index > -1) {
        genres.splice(index, 1);
      } else {
        genres.push(activeGenre);
      }

      return { activeGenres: genres, page: 1 };
    }),
}));
