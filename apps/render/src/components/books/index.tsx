"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";

import Grid from "./grid";
import Table from "./table";
import Navigation from "./navigation";

interface IProps {
  books: IBook[];
  collection: IBooksCollection;
}

function Books(props: IProps) {
  const { books, collection } = props;
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [display, setDisplay] = useState<string | undefined>(
    searchParams.get("display") || undefined
  );

  const onChangeDisplay = (newDisplay?: string) => {
    let href = pathname;
    if (newDisplay) {
      href += `?display=${newDisplay}`;
    }
    router.push(href);
    setDisplay(newDisplay);
  };

  return (
    <>
      <Navigation display={display} onChangeDisplay={onChangeDisplay} />
      {!display && <Grid books={books} />}
      {display === "table" && <Table books={books} collection={collection} />}
    </>
  );
}

export default Books;
