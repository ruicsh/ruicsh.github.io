import { type ColDef } from "ag-grid-community";

import RatingCellRenderer from "./rating-cell-renderer";

export const columnDefs: ColDef[] = [
  { field: "title" },
  { field: "authors" },
  { field: "rating", hide: true, cellRenderer: "ratingCellRenderer" },
  { field: "readOnDate", hide: true },
  { field: "queuedOnDate", hide: true },
  { field: "wishedOnDate", hide: true },
  { field: "subtitle" },
  { field: "description" },
  { field: "pageCount" },
  { field: "publisher" },
  { field: "publishedDate" },
];

export const defaultColDef: ColDef = {
  sortable: true,
  filter: true,
  floatingFilter: true,
};

export const components = {
  ratingCellRenderer: RatingCellRenderer,
};

export function getColumnDefs(collection: IBooksCollection) {
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
