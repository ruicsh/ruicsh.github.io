"use client";

import { useSearchParams } from "next/navigation";

import Grid from "./grid";
import Navigation from "./navigation";
import Table from "./table";

interface IProps {
  books: IBook[];
  genres: IBookGenre[];
  collection: IBooksCollection;
  numberOfPages: number;
  page?: number;
  totalItems: number;
}

function Books(props: IProps) {
  const {
    books,
    genres,
    collection,
    numberOfPages,
    page = 1,
    totalItems,
  } = props;
  const searchParams = useSearchParams();
  const display = searchParams.get("d") || undefined;

  return (
    <>
      <Navigation genres={genres} />
      {!display && (
        <Grid
          books={books}
          collection={collection}
          numberOfPages={numberOfPages}
          page={page}
          totalItems={totalItems}
        />
      )}
      {display === "table" && <Table books={books} collection={collection} />}
    </>
  );
}

export default Books;
