import { create } from "zustand";
import { devtools, persist, redux } from "zustand/middleware";

import { type IBooksState } from "./types.d";
import { initialState } from "./initial-state";
import { reducer } from "./reducer";
import { storageOptions } from "./storage";

export const useBooksStore = create<IBooksState>()(
	persist(devtools(redux(reducer, initialState)), storageOptions),
);

export function useDispatch() {
	return useBooksStore((state) => state.dispatch);
}
