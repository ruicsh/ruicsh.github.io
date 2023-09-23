import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";

import { type IBooksState } from "./books.d";
import { storageOptions } from "./storage";

const booksStore: StateCreator<IBooksState> = (set) => ({
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

  genres: [],
  toggleActiveGenre: (activeGenre: string) =>
    set((state) => {
      const genres = Array.from(state.genres);
      const index = genres.indexOf(activeGenre);
      if (index > -1) {
        genres.splice(index, 1);
      } else {
        genres.push(activeGenre);
      }

      return { genres, page: 1 };
    }),
});

export const useBooksStore = create<IBooksState>()(
  persist(booksStore, storageOptions)
);
