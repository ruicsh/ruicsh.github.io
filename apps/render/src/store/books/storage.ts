import {
  createJSONStorage,
  type PersistOptions,
  type StateStorage,
} from "zustand/middleware";

import { compress, decompress } from "src/lib/compress";

import { type IBooksState, type IPersistedBooksState } from "./books.d";

function getUrlSearch() {
  return window.location.search.slice(1);
}

const storage: StateStorage = {
  async getItem(key: string) {
    const sp = new URLSearchParams(getUrlSearch());
    const compressed = sp.get(key) ?? "";

    const decompressed = await decompress(compressed);
    const state = JSON.parse(decompressed || "{}");

    return state;
  },
  async setItem(key: string, newValue: string) {
    const jsonStr = JSON.stringify(newValue);
    const compressed = await compress(jsonStr);

    const sp = new URLSearchParams({ [key]: compressed });
    const qs = sp.toString();
    window.history.replaceState(null, "", `?${qs}`);
  },
  removeItem(key: string) {
    const sp = new URLSearchParams(getUrlSearch());
    sp.delete(key);
    const qs = sp.toString();
    window.location.search = qs;
  },
};

export const storageOptions: PersistOptions<IBooksState, IPersistedBooksState> =
  {
    name: "books",
    partialize: (state) => ({
      activeGenres: state.activeGenres,
      collection: state.collection,
      displayMode: state.displayMode,
      page: state.page,
    }),
    skipHydration: true,
    storage: createJSONStorage(() => storage),
  };
