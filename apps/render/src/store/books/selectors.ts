import { createSelector } from "reselect";

import { type IBooksState } from "./books.d";

const ITEMS_PER_PAGE = 18;

function getSortByField(collection: string) {
  switch (collection) {
    case "read":
      return "readOnDate";
    case "queue":
      return "queuedOnDate";
    default:
      return "wishedOnDate";
  }
}

export const selectBooks = createSelector(
  (state: IBooksState) => state.books,
  (state: IBooksState) => state.activeGenres,
  (state: IBooksState) => state.page,
  (state: IBooksState) => state.collection,
  (state: IBooksState) => state.displayMode,
  (state: IBooksState) => state.isBooksLoading,
  (books, activeGenres, page, collection, displayMode, isBooksLoading) => {
    const sortByField = getSortByField(collection) as keyof IBook;
    const start = displayMode === "grid" ? (page - 1) * ITEMS_PER_PAGE : 0;
    const end = displayMode === "grid" ? start + ITEMS_PER_PAGE : books.length;

    const filteredBooks = books
      .filter((book) => book.collection === collection)
      .filter((book) => {
        const { genres = [] } = book;
        if (activeGenres.length === 0) {
          return true;
        }

        return genres.some((genre) => activeGenres.includes(genre));
      })
      .sort((a, b) => {
        const aValue = a[sortByField] as string;
        const bValue = b[sortByField] as string;
        return bValue.localeCompare(aValue);
      });

    const totalItems = filteredBooks.length;
    const numberOfPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    return {
      books: filteredBooks.slice(start, end),
      isBooksLoading,
      numberOfPages,
      totalItems,
    };
  }
);
