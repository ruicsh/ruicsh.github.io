interface IBook {
  authors: string;
  description?: string;
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

type IBooksCollection = "read" | "queue" | "wishlist";
