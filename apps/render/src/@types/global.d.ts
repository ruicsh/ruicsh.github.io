interface IBook {
  cover: string;
  title: string;
  authors: string;
  pageCount: number;
  wishedOnDate?: string;
  queuedOnDate?: string;
  readOnDate?: string;
  rating?: number;
}
