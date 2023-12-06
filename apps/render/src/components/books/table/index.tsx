import { type FirstDataRenderedEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import clsx from "clsx";

import { useBooksStore } from "src/store/books";
import { selectBooks } from "src/store/books/selectors";

import { EmptyList } from "../empty";
import { components, defaultColDef, getColumnDefs } from "./config";

import styles from "./index.module.scss";

export function Table() {
  const cls = clsx(styles.root, "ag-theme-alpine");
  const collection = useBooksStore((state) => state.collection);
  const { books } = useBooksStore(selectBooks);

  const onFirstDataRendered = (event: FirstDataRenderedEvent) => {
    const { api } = event;
    api.autoSizeColumns(["title"]);
  };

  if (books.length === 0) {
    return <EmptyList />;
  }

  return (
    <div className={cls}>
      <AgGridReact
        columnDefs={getColumnDefs(collection)}
        components={components}
        defaultColDef={defaultColDef}
        onFirstDataRendered={onFirstDataRendered}
        pagination={true}
        paginationAutoPageSize={true}
        rowData={books}
      />
    </div>
  );
}
