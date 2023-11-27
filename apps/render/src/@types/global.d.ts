type IBooksCollection = "read" | "queue" | "wishlist";

type IDisplayMode = "grid" | "table";

interface IBook {
  authors: string;
  collection?: IBooksCollection;
  coverBlurDataUrl: string;
  coverColor: string;
  description?: string;
  genres?: string[];
  id?: string;
  pageCount: number;
  publishedDate?: string;
  queuedOnDate?: string;
  rating?: number;
  readOnDate?: string;
  slug: string;
  subtitle?: string;
  title: string;
  wishedOnDate?: string;
}

interface IBookGenre {
  label: string;
  slug: string;
}

interface IBookmark {
  slug: string;
  url: string;
  title: string;
  host: string;
  excerpt?: string;
  savedOnDate: string;
}
