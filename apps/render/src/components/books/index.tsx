"use client";

import { useSearchParams } from "next/navigation";

import Grid from "./grid";
import Navigation from "./navigation";
import Table from "./table";

interface IProps {
  books: IBook[];
  categories: ICategory[];
  collection: IBooksCollection;
  numberOfPages: number;
  page: number;
  totalItems: number;
}

function Books(props: IProps) {
  const { categories, collection, numberOfPages, page, totalItems } = props;
  const searchParams = useSearchParams();
  const display = searchParams.get("d") || undefined;
  const activeCategories = searchParams.get("c")?.split("|") || [];

  let { books } = props;
  if (activeCategories.length > 0) {
    books = props.books.filter((book) =>
      activeCategories.some((category) => book.categories?.includes(category))
    );
  }

  return (
    <>
      <Navigation categories={categories} />
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
