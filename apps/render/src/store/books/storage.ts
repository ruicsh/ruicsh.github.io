import {
  createJSONStorage,
  type PersistOptions,
  type StateStorage,
} from "zustand/middleware";

import { type IBooksState, type IPersistedBooksState } from "./books.d";
import { initialState } from "./reducer";

const storage: StateStorage = {
  getItem: () => {
    const sp = new URLSearchParams(window.location.search);
    const state = Object.fromEntries(sp.entries());
    const genres = state.genres?.trim()?.split(",");
    const freshState = { state: { ...state, genres }, version: 0 };

    return JSON.stringify(freshState);
  },
  setItem: (_, newValue: string) => {
    const { state } = JSON.parse(newValue);
    const sp = new URLSearchParams(state);
    if (sp.toString() !== window.location.search.slice(1)) {
      window.history.pushState(null, "", `?${sp.toString()}`);
    }
  },
  removeItem: (key: string) => {
    const sp = new URLSearchParams(window.location.search);
    sp.delete(key);
    const qs = sp.toString();
    window.location.search = qs;
  },
};

export const storageOptions: PersistOptions<IBooksState, IPersistedBooksState> =
  {
    name: "books",
    merge: (persistedState, currentState) => {
      const { dispatch } = currentState;

      if (Object.keys(persistedState || {}).length === 0) {
        return { ...initialState, collection: "queue", dispatch };
      }

      return { ...currentState, ...(persistedState || {}) };
    },
    partialize: (state) => {
      const { books, isBooksLoading, genres, ...restOfState } = state;

      return {
        ...restOfState,
        genres: genres.length ? genres : undefined,
      };
    },
    skipHydration: true,
    storage: createJSONStorage(() => storage),
  };
