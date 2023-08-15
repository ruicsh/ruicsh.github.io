import type { FirstDataRenderedEvent, ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import clsx from "clsx";

import { columnDefs, defaultColDef, components } from "./config";
import styles from "./index.module.scss";

function getColumnDefs(collection: IBooksCollection) {
  const newColumnDefs = JSON.parse(JSON.stringify(columnDefs)) as ColDef[];
  const showFields = [];

  if (collection === "read") {
    showFields.push("rating", "readOnDate");
  } else if (collection === "queue") {
    showFields.push("queuedOnDate");
  } else if (collection === "wishlist") {
    showFields.push("wishedOnDate");
  }

  for (const field of showFields) {
    const index = newColumnDefs.findIndex((column) => column.field === field);
    newColumnDefs[index].hide = false;
  }

  return newColumnDefs;
}

interface IProps {
  books: IBook[];
  collection: IBooksCollection;
}

function BooksTable(props: IProps) {
  const { books, collection } = props;
  const cls = clsx(styles.root, "ag-theme-alpine");

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
