import { type IAction, type IBooksState } from "./books.d";

export function reducer(state: IBooksState, action: IAction) {
  const { type } = action;

  switch (type) {
    case "SET_COLLECTION": {
      const { collection } = action.payload;
      return { ...state, collection, page: 1 };
    }
    case "SET_DISPLAY_MODE": {
      const { displayMode } = action.payload;
      return { ...state, displayMode };
    }
    case "SET_BOOKS": {
      const { books } = action.payload;
      return { ...state, books, isBooksLoading: false };
    }
    case "SET_PAGE": {
      const { page } = action.payload;
      return { ...state, page };
    }
    case "TOGGLE_GENRE": {
      const { genre } = action.payload;
      const genres = Array.from(state.genres);
      const index = genres.indexOf(genre);
      if (index > -1) {
        genres.splice(index, 1);
      } else {
        genres.push(genre);
      }

      return { ...state, genres, page: 1 };
    }
    default:
      return state;
  }
}
