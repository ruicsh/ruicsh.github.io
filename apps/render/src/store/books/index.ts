import { create } from "zustand";
import { persist, redux, devtools } from "zustand/middleware";

import { type IBooksState } from "./books.d";
import { initialState, reducer } from "./reducer";
import { storageOptions } from "./storage";

export const useBooksStore = create<IBooksState>()(
  persist(devtools(redux(reducer, initialState)), storageOptions)
);

export function useDispatch() {
  return useBooksStore((state) => state.dispatch);
}
