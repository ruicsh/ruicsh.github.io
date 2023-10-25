"use client";

import { useEffect } from "react";

import { useBooksStore, useDispatch } from "src/store/books";

import { Grid } from "./grid";
import { Navigation } from "./navigation";
import { Table } from "./table";

interface IProps {
  genres: IBookGenre[];
}

export function Books(props: IProps) {
  const { genres } = props;
  const dispatch = useDispatch();
  const displayMode = useBooksStore((state) => state.displayMode || "grid");

  useEffect(() => {
    fetch("/static/data/books.json")
      .then((response) => response.json())
      .then((books) => dispatch({ type: "SET_BOOKS", payload: { books } }));
  }, []);

  useEffect(() => {
    useBooksStore.persist.rehydrate();

    const onPopState = () => useBooksStore.persist.rehydrate();
    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  return (
    <>
      <Navigation genres={genres} />
      {displayMode === "grid" && <Grid />}
      {displayMode === "table" && <Table />}
    </>
  );
}
