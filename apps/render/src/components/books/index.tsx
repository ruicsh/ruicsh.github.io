"use client";

import { useEffect } from "react";

import { useBooksStore } from "src/store/books";

import Grid from "./grid";
import Navigation from "./navigation";
import Table from "./table";

interface IProps {
  genres: IBookGenre[];
}

function Books(props: IProps) {
  const { genres } = props;
  const displayMode = useBooksStore((state) => state.displayMode || "grid");

  useEffect(() => {
    useBooksStore.getState().fetchBooks();
    useBooksStore.persist.rehydrate();
  }, []);

  return (
    <>
      <Navigation genres={genres} />
      {displayMode === "grid" && <Grid />}
      {displayMode === "table" && <Table />}
    </>
  );
}

export default Books;
