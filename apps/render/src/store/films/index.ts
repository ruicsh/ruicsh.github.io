import { create } from "zustand";
import { devtools, persist, redux } from "zustand/middleware";

import { initialState } from "./initial-state";
import { reducer } from "./reducer";
import { storageOptions } from "./storage";
import type { IFilmsState } from "./types.d";

export const useFilmsStore = create<IFilmsState>()(
	persist(devtools(redux(reducer, initialState)), storageOptions),
);

export function useDispatch() {
	return useFilmsStore((state) => state.dispatch);
}

export type { IAction } from "./types.d";
