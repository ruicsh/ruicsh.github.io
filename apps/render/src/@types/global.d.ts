interface IBook {
  id?: string;
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
  categories?: string[];
  coverColor: string;
  coverBlurDataUrl: string;
}

interface ICategory {
  label: string;
  slug: string;
}

type IBooksCollection = "read" | "queue" | "wishlist";
