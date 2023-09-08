import { type FirstDataRenderedEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import clsx from "clsx";

import { useBooksStore } from "src/store/books";
import { selectBooks } from "src/store/books/selectors";

import { components, defaultColDef, getColumnDefs } from "./config";
import styles from "./index.module.scss";

function BooksTable() {
  const cls = clsx(styles.root, "ag-theme-alpine");
  const collection = useBooksStore((state) => state.collection);
  const { books } = useBooksStore(selectBooks);

  const onFirstDataRendered = (event: FirstDataRenderedEvent) => {
    const { columnApi } = event;
    columnApi.autoSizeColumns(["title"]);
  };

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

export default BooksTable;
