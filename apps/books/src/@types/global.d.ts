interface IScrapedBookDetails {
  cover: string;
  isbn10: string;
  isbn13: string;
  pageCount: number;
  publishedDate: string;
  publisher: string;
}

interface IBookDetails {
  authors: string;
  cover: string;
  description: string;
  isbn10: string;
  isbn13: string;
  pageCount: number;
  publishedDate: string;
  publisher: string;
  subtitle?: string;
  title: string;
  rating?: string;
  sourceUrl: string;
}

type IBookCollection = "read" | "queue" | "wishlist";
