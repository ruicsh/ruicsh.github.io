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
  id?: string;
  isbn10: string;
  isbn13: string;
  pageCount: number;
  publishedDate: string;
  publisher: string;
  rating?: number;
  slug?: string;
  sourceUrl: string;
  subtitle?: string;
  title: string;
}

interface IBookOnInbox {
  wishedOnDate?: string;
  queuedOnDate?: string;
  readOnDate?: string;
  rating?: number;
  sourceUrl: string;
}

type IBookToSave = IBookOnInbox & IBookDetails;

type IBookCollection = "read" | "queue" | "wishlist";
